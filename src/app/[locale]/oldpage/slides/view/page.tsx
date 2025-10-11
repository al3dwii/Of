// app/slides/view/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchArtifacts } from "@/lib/api";
import { normalizeBase } from "@/lib/urls";
import type { Artifacts, SlideLink } from "@/lib/types";



function isPublicHTTPS(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    return u.protocol === "https:" && host !== "localhost" && host !== "127.0.0.1";
  } catch { return false; }
}

export default function SlidesViewerPage() {
  const search = useSearchParams();
  const router = useRouter();
  const base = normalizeBase(search.get("base") || "");
  const job = search.get("job") || "";

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");
  const [pptxUrl, setPptxUrl] = useState<string | undefined>();
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [htmlZipUrl, setHtmlZipUrl] = useState<string | undefined>();
  const [slides, setSlides] = useState<SlideLink[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const art: Artifacts = await fetchArtifacts(base, job);
        if (!alive) return;

        // absolute URLs for downloads
        const abs = (p?: string) => (p ? base + p : undefined);
        setPptxUrl(abs(art.exports?.pptx_url));
        setPdfUrl(abs(art.exports?.pdf_url));
        setHtmlZipUrl(abs(art.exports?.html_zip_url));

        if (Array.isArray(art.slides) && art.slides.length) {
          setSlides(
            art.slides.map(s => ({ no: s.no, title: s.title || `Slide ${s.no}`, url: base + s.url }))
          );
        } else {
          setSlides([]); // (optional: add client-render fallback if you want)
        }
      } catch (e: any) {
        setErr(e?.message || "Failed to load artifacts");
      } finally {
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [base, job]);

  const canOfficeEmbed = !!pptxUrl && isPublicHTTPS(pptxUrl);

  // share (copy current URL)
  const [copied, setCopied] = useState(false);
  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  // keyboard nav for HTML viewer
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!slides.length) return;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "j") setIdx(i => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft"  || e.key.toLowerCase() === "k") setIdx(i => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  return (
    <div className="flex h-screen w-screen flex-col bg-[#0b1220] text-white">
      {/* Top bar */}
      <div className="flex-none border-b border-white/10 bg-[#0f172a]">
        <div className="mx-auto max-w-[1400px] px-4 py-3 flex items-center gap-2">
          <div className="text-sm font-semibold">Slides — View & Export</div>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
              onClick={() => router.push("/slides")}
              title="Back to editor"
            >
              Edit
            </button>
            <button
              onClick={onShare}
              className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
              title="Copy link"
            >
              {copied ? "Copied ✓" : "Share"}
            </button>
            <div className="flex items-center gap-2">
              {pdfUrl && (
                <a className="rounded-md bg-white text-[#0f1115] px-3 py-1.5 text-sm font-semibold"
                   href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  Download PDF
                </a>
              )}
              {pptxUrl && (
                <a className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
                   href={pptxUrl} target="_blank" rel="noopener noreferrer">
                  Download PPTX
                </a>
              )}
              {htmlZipUrl && (
                <a className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm"
                   href={htmlZipUrl} target="_blank" rel="noopener noreferrer">
                  HTML Zip
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="h-full grid place-items-center text-white/70">Loading…</div>
        ) : err ? (
          <div className="h-full grid place-items-center text-red-300">{err}</div>
        ) : canOfficeEmbed ? (
          // Office Online viewer (only for public HTTPS PPTX)
          <iframe
            title="PowerPoint"
            className="w-full h-full border-0"
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptxUrl!)}`}
            allowFullScreen
          />
        ) : slides.length ? (
          // Built-in HTML slides viewer (works on localhost/offline)
          <div className="h-full w-full flex flex-col">
            <div className="flex-none px-4 py-2 text-xs text-white/70">
              Slide {idx + 1} / {slides.length} — {slides[idx]?.title || ""}
            </div>
            <div className="flex-1 min-h-0">
              <iframe
                key={slides[idx].url}
                className="w-full h-full border-0 bg-black"
                src={slides[idx].url}
              />
            </div>
            <div className="flex-none px-4 py-3 flex items-center justify-between border-t border-white/10 bg-[#0f172a]">
              <button
                onClick={() => setIdx(i => Math.max(i - 1, 0))}
                className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm disabled:opacity-50"
                disabled={idx === 0}
              >
                ← Prev
              </button>
              <div className="text-xs text-white/70">Use ←/→ or J/K</div>
              <button
                onClick={() => setIdx(i => Math.min(i + 1, slides.length - 1))}
                className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-sm disabled:opacity-50"
                disabled={idx === slides.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full grid place-items-center text-white/70">
            No embeddable PPTX and no server-rendered slides were found for this job.
          </div>
        )}
      </div>
    </div>
  );
}
