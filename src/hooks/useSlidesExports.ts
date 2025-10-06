"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeBase } from "@/lib/urls";
import { fetchArtifacts } from "@/lib/api";
import type { Artifacts, SlideLink } from "@/lib/types";

type ExportsMap = { pdf?: string; pptx?: string; html?: string };

function extractIds(log: string): { jobId?: string; projectId?: string } {
  let jobId: string | undefined;
  let projectId: string | undefined;

  // Friendly line the hook logs:  "Job started: job_xxx (project prj_xxx)"
  for (const m of log.matchAll(/Job started:\s*(job_[a-z0-9]+)\s*\(project\s*(prj_[a-z0-9]+)\)/gi)) {
    jobId = m[1]; projectId = m[2];
  }
  // JSON shards in the log:  "job_id": "job_xxx", "project_id": "prj_xxx"
  for (const m of log.matchAll(/"job_id"\s*:\s*"([^"]+)"/gi)) jobId = m[1] || jobId;
  for (const m of log.matchAll(/"project_id"\s*:\s*"([^"]+)"/gi)) projectId = m[1] || projectId;

  return { jobId, projectId };
}

export function useSlidesExports(opts: {
  backendBase: string;
  /** optional (we'll auto-extract from logText if not provided) */
  jobId?: string | null;
  projectId?: string | null;
  /** pass the logText from useSlidesJob to auto-extract ids */
  logText?: string;
  /** poll interval ms */
  interval?: number;
}) {
  const { backendBase, jobId: jobIdProp = null, projectId: projectIdProp = null, logText = "", interval = 2000 } = opts;

  const base = useMemo(() => normalizeBase(backendBase), [backendBase]);

  const [jobId, setJobId] = useState<string | null>(jobIdProp);
  const [projectId, setProjectId] = useState<string | null>(projectIdProp);
  const [exports, setExports] = useState<ExportsMap>({});
  const [slides, setSlides] = useState<SlideLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // accept controlled ids via props
  useEffect(() => { if (jobIdProp) setJobId(jobIdProp); }, [jobIdProp]);
  useEffect(() => { if (projectIdProp) setProjectId(projectIdProp); }, [projectIdProp]);

  // otherwise, mine them out of the dev log coming from useSlidesJob
  useEffect(() => {
    if (jobId) return;
    if (!logText) return;
    const ids = extractIds(logText);
    if (ids.jobId) setJobId(ids.jobId);
    if (ids.projectId) setProjectId(ids.projectId);
  }, [logText, jobId]);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!jobId) return;

    // Capture jobId in a const to help TypeScript narrow the type
    const currentJobId = jobId;

    async function tick() {
      try {
        setLoading(true);
        const art: Artifacts = await fetchArtifacts(base, currentJobId);

        setExports({
          pdf: art.exports?.pdf_url ? base + art.exports.pdf_url : undefined,
          pptx: art.exports?.pptx_url ? base + art.exports.pptx_url : undefined,
          html: art.exports?.html_zip_url ? base + art.exports.html_zip_url : undefined,
        });

        if (Array.isArray(art.slides) && art.slides.length) {
          setSlides(art.slides.map(s => ({ no: s.no, title: s.title || `Slide ${s.no}`, url: base + s.url })));
        }

        setError("");

        // stop polling once something is ready
        const done = !!art.exports?.pdf_url || !!art.exports?.pptx_url || (art.slides?.length ?? 0) > 0;
        if (done && pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      } catch (e: any) {
        setError(e?.message || "Failed to fetch artifacts");
      } finally {
        setLoading(false);
      }
    }

    tick();
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(tick, Math.max(800, interval));

    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [base, jobId, interval]);

  /** Open the viewer page in a new tab. Falls back to direct URLs if jobId missing. */
  const openViewer = () => {
    if (typeof window === "undefined") return;
    const qs = new URLSearchParams();
    qs.set("base", base);
    if (jobId) qs.set("job", jobId);
    if (!jobId) {
      // fallback: pass direct asset URLs (works for localhost)
      if (exports.pptx) qs.set("pptx", exports.pptx);
      if (exports.pdf) qs.set("pdf", exports.pdf);
      if (exports.html) qs.set("html", exports.html);
    }
    window.open(`/slides/view?${qs.toString()}`, "_blank", "noopener,noreferrer");
  };

  const ready = !!exports.pptx || !!exports.pdf || slides.length > 0;

  return { jobId, projectId, exports, slides, loading, error, ready, openViewer };
}
