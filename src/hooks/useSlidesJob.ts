"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildClientSlideHTML } from "@/lib/html";
import { fetchArtifacts, fetchStateJson, startSlidesJob, uploadDocx } from "@/lib/api";
import { normalizeBase } from "@/lib/urls";
import type {
  Artifacts,
  JobStatus,
  SlideLink,
  StartJobResponse,
  StateFile,
  CardTab,
} from "@/lib/types";

/** Progress item used by the UI for a narrative/typing experience */
type ProgressItem = {
  id: string;
  kind:
    | "tool.start"
    | "tool.end"
    | "tool.used"
    | "todos.init"
    | "todos.progress"
    | "narration"
    | "search.results"
    | "read.snippet"
    | "images.results"
    | "status"
    | "artifact"
    | "step"
    | "raw";
  text: string;
  meta?: any;
};

export function useSlidesJob(backendBase: string) {
  const [status, setStatus] = useState<JobStatus>("idle");
  const [logText, setLogText] = useState("");
  const [uiError, setUiError] = useState("");

  const [links, setLinks] = useState<{ label: string; href: string }[]>([]);
  const [slides, setSlides] = useState<SlideLink[]>([]);
  const [cardTabs, setCardTabs] = useState<Record<number, CardTab>>({});
  const [codeByNo, setCodeByNo] = useState<Record<number, string>>({});

  // Progress + typing stream
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [typedProgressText, setTypedProgressText] = useState<string>("");

  const sseRef = useRef<EventSource | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const objectUrlsRef = useRef<string[]>([]);
  const jobIdRef = useRef<string | null>(null);
  const projectIdRef = useRef<string | null>(null);

  // typing state
  const fullProgressRef = useRef<string>("");
  const typeIdxRef = useRef<number>(0);

  // helpers for cleaner output
  const lastJobStateRef = useRef<string>("");
  const lastLineRef = useRef<string>("");

  // Cleanup
  useEffect(() => {
    return () => {
      if (sseRef.current) sseRef.current.close();
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrlsRef.current = [];
    };
  }, []);

  /** Append to dev log */
  const log = (line: string, obj?: any) => {
    const time = new Date().toLocaleTimeString();
    setLogText(
      (t) =>
        t +
        `[${time}] ${line}\n` +
        (obj !== undefined ? JSON.stringify(obj, null, 2) + "\n" : "")
    );
  };
  const setBusy = (b: boolean) => setStatus(b ? "running" : "idle");

  /** Combine all progress items into a single string with spacing */
  const progressFullText = useMemo(
    () => progress.map((p) => p.text).join("\n\n"),
    [progress]
  );

  /** Manage typing when progress text grows */
  useEffect(() => {
    const full = progressFullText;
    if (full === fullProgressRef.current) return;

    fullProgressRef.current = full;
    // If we shortened (new job), reset typing
    if (typeIdxRef.current > full.length) {
      typeIdxRef.current = 0;
      setTypedProgressText("");
    }

    // (re)start typing timer
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    typingTimerRef.current = setInterval(() => {
      const fullNow = fullProgressRef.current;
      if (typeIdxRef.current < fullNow.length) {
        setTypedProgressText((t) => t + fullNow[typeIdxRef.current]);
        typeIdxRef.current += 1;
      } else {
        clearInterval(typingTimerRef.current!);
        typingTimerRef.current = null;
      }
    }, 8); // typing speed (ms per char)
  }, [progressFullText]);

  /** push with dedupe + no empty/undefined */
  const pushProgress = (item: Omit<ProgressItem, "id">) => {
    const text = (item.text ?? "").toString();
    if (!text.trim()) return;
    // prevent immediate duplicates
    if (text === lastLineRef.current) return;
    lastLineRef.current = text;
    setProgress((xs) => [...xs, { id: crypto.randomUUID(), ...item, text }]);
  };
  const pushText = (
    text: string | undefined | null,
    kind: ProgressItem["kind"] = "narration",
    meta?: any
  ) => pushProgress({ kind, text: (text ?? "").toString(), meta });

  /** icons for step status */
  const statusIcon = (s?: string) =>
    s === "succeeded" ? "✅" : s === "failed" ? "❌" : "⏳";

  /** choose best tool label */
  const formatToolName = (d: any) =>
    d?.op || d?.name || d?.tool || d?.node_id || "unknown";

  function projectIdFromArtifacts(art: Artifacts): string | null {
    if (art.project_id) return art.project_id;
    if (art.state_url) {
      const parts = art.state_url.split("/"); // ["", "artifacts", "<prj>", "state.json"]
      if (parts.length >= 4) return parts[2];
    }
    return null;
  }

  /** Normalize and render SSE events into progress items */
  function handleSse(evtType: string, payload: any) {
    const data = payload?.data ?? payload;

    const asStr = (v: any) =>
      typeof v === "string" ? v : v == null ? "" : JSON.stringify(v);

    switch (evtType) {
      /** JOB-LEVEL STATE (only on change) */
      case "status": {
        const st = data?.state || data?.status;
        if (st && st !== lastJobStateRef.current) {
          lastJobStateRef.current = st;
          if (st === "running") pushText(`Job — running`, "status");
          else if (st === "succeeded") pushText(`Job — ✅ succeeded`, "status");
          else if (st === "failed") {
            pushText(`Job — ❌ failed`, "status");
            const detail =
              data?.error?.detail ||
              data?.error?.message ||
              data?.error?.title ||
              "";
            if (detail) pushText(detail, "status");
          } else {
            pushText(`Job — ${st}`, "status");
          }
        }
        break;
      }

      /** NODE/STEP STATE (always show: includes tool name) */
      case "step":
      case "stage":
      case "progress": {
        const name = data?.name || data?.op || data?.node_id || "step";
        const st = data?.status || data?.state || "";
        // "io.fetch — started" / "io.fetch — ✅ succeeded" / "… — ❌ failed"
        const icon = statusIcon(st);
        pushText(`${name} — ${icon} ${st}`, "step");
        break;
      }

      /** TOOL INVOCATION (show proper name instead of Unknown Tool) */
      case "tool_used": {
        const label = formatToolName(data);
        pushText(`Using Tool\n| ${label}`, "tool.used");
        break;
      }

      /** ARTIFACTS */
      case "artifact":
      case "artifact.ready": {
        const kind = (data?.kind || "").toString().toUpperCase() || "ARTIFACT";
        const url = data?.url ? ` → ${data.url}` : "";
        pushText(`${kind} ready${url}`, "artifact");
        break;
      }

      /** RICH PARTIALS (research/read/images/etc.) */
      case "partial": {
        const t = data?.type;

        // Using Tool (rich tool start/end)
        if (t === "using_tool.start") {
          const label = data?.tool || data?.label || formatToolName(data);
          pushText(`Using Tool\n| ${label}`, "tool.start", data?.meta);

          const qs: string[] = Array.isArray(data?.meta?.queries)
            ? data.meta.queries
            : [];
          if (qs.length) pushText(qs.join("\n"), "search.results");
          return;
        }
        if (t === "using_tool.end") {
          pushText(`Done`, "tool.end");
          return;
        }

        // Todos
        if (t === "todos.init") {
          const items = Array.isArray(data?.items) ? data.items : [];
          const total = items.length;
          const lines = items
            .map((it: any) =>
              typeof it === "string" ? `• ${it}` : it?.text ? `• ${it.text}` : ""
            )
            .filter(Boolean)
            .join("\n");
          pushText(`Total: ${total} Todos${lines ? `\n${lines}` : ""}`, "todos.init");
          return;
        }
        if (t === "todos.progress") {
          const rem = data?.remaining;
          if (typeof rem === "number")
            pushText(`${rem} todos remaining`, "todos.progress");
          return;
        }

        // Narrative (“I'll help you…")
        if (t === "narration") {
          const text = data?.text || "";
          if (text) pushText(text, "narration");
          return;
        }

        // Search results
        if (t === "search.results") {
          const q = data?.query || "";
          const n = Array.isArray(data?.items) ? data.items.length : undefined;
          pushText(
            `Search${q ? ` • ${q}` : ""}${typeof n === "number" ? `\n${n} results` : ""}`,
            "search.results"
          );
          return;
        }

        // Reading snippet
        if (t === "read.snippet") {
          const u = data?.url || "";
          const title = data?.title || "";
          const excerpt = data?.excerpt || "";
          const text = ["Read", u, title, excerpt].filter(Boolean).join("\n");
          pushText(text, "read.snippet");
          return;
        }

        // Image search summary
        if (t === "images.results") {
          const n = Array.isArray(data?.images) ? data.images.length : undefined;
          pushText(`Image hits${typeof n === "number" ? `: ${n}` : ""}`, "images.results");
          return;
        }

        // Unknown partial type → keep compact
        pushText(`[partial:${asStr(t)}]`, "raw");
        return;
      }

      // Legacy/other streams — still show them compactly
      case "message":
      case "thinking":
      case "result":
      case "warning":
      case "error": {
        const text = `[${evtType}] ${asStr(data)}`;
        pushText(text, evtType === "error" ? "raw" : "narration");
        break;
      }

      default: {
        pushText(`[${evtType}] ${asStr(data)}`, "raw");
        break;
      }
    }
  }

  function startSSE(fullWatchUrl: string) {
    try {
      if (sseRef.current) sseRef.current.close();
      const ev = new EventSource(fullWatchUrl);
      sseRef.current = ev;

      ev.onopen = () => log("SSE connected");
      ev.onerror = () => log("SSE error (will retry/backoff if server supports it) …");

      // Subscribe to both new and legacy event names
      const EVENTS = [
        "status",
        "step",
        "stage",
        "progress",
        "partial",
        "tool_used",
        "artifact",
        "artifact.ready",
        "message",
        "thinking",
        "result",
        "warning",
        "error",
      ];

      EVENTS.forEach((t) =>
        ev.addEventListener(t, (e: any) => {
          let data: any = null;
          try {
            data = JSON.parse(e.data);
          } catch {
            data = e.data;
          }
          log(`event: ${t}`, data);
          handleSse(t, data);
        })
      );
    } catch (e: any) {
      log("SSE setup failed: " + e.message);
    }
  }

  async function renderArtifacts(base: string, art: Artifacts) {
    // Export links
    const L: { label: string; href: string }[] = [];
    if (art.exports?.pdf_url) L.push({ label: "PDF", href: base + art.exports.pdf_url });
    if (art.exports?.pptx_url) L.push({ label: "PPTX", href: base + art.exports.pptx_url });
    if (art.exports?.html_zip_url)
      L.push({ label: "HTML (zip)", href: base + art.exports.html_zip_url });
    setLinks(L);

    // Prefer server-rendered slides
    if (art.slides?.length) {
      const list: SlideLink[] = art.slides.map((s) => ({
        no: s.no,
        title: s.title || `Slide ${s.no}`,
        url: base + s.url,
      }));
      setSlides(list);
      setCardTabs(Object.fromEntries(list.map((s) => [s.no, "preview"])));
      return;
    }

    // Fallback: state.json → client render
    const st = await fetchStateJson<StateFile>(base, art.state_url || "");
    const prj = projectIdFromArtifacts(art);
    if (st && prj && Array.isArray(st.slides) && st.slides.length > 0) {
      const lang = st.language || "ar";

      // clear previous blobs
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrlsRef.current = [];

      const clientSlides: SlideLink[] = st.slides.map((s: any, i: number) => {
        const html = buildClientSlideHTML(s, lang, prj, base);
        const blob = new Blob([html], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        objectUrlsRef.current.push(url);
        return { no: i + 1, title: s.title || `Slide ${i + 1}`, url };
      });
      setSlides(clientSlides);
      setCardTabs(Object.fromEntries(clientSlides.map((s) => [s.no, "preview"])));
    }
  }

  function startPolling(base: string) {
    const tick = async () => {
      const jobId = jobIdRef.current;
      if (!jobId) return;
      try {
        const art = await fetchArtifacts(base, jobId);
        await renderArtifacts(base, art);

        const done =
          !!art.exports?.pdf_url ||
          !!art.exports?.pptx_url ||
          !!art.exports?.html_zip_url ||
          (Array.isArray(art.slides) && art.slides.length > 0);

        if (done) {
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
          setBusy(false);
          log("Artifacts ready.");
          if (sseRef.current) {
            sseRef.current.close();
            sseRef.current = null;
            log("SSE closed.");
          }
        }
      } catch (e: any) {
        log("Artifacts poll error: " + (e?.message || e));
      }
    };
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    pollTimerRef.current = setInterval(tick, 1500);
    tick();
  }

  async function ensureCodeFor(no: number, url: string) {
    if (codeByNo[no]) return;
    try {
      const html = await fetch(url).then((r) => r.text());
      setCodeByNo((m) => ({ ...m, [no]: html }));
    } catch {
      setCodeByNo((m) => ({ ...m, [no]: "" }));
    }
  }

  async function start(params: {
    prompt: string;
    language: "ar" | "en";
    slidesCount: number;
    file?: File | null;
  }) {
    const base = normalizeBase(backendBase);
    try {
      // Reset all UI state
      setBusy(true);
      setUiError("");
      setLogText("");
      setLinks([]);
      setSlides([]);
      setCardTabs({});
      setCodeByNo({});
      setProgress([]);
      setTypedProgressText("");
      fullProgressRef.current = "";
      typeIdxRef.current = 0;
      lastJobStateRef.current = "";
      lastLineRef.current = "";
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      jobIdRef.current = null;
      projectIdRef.current = null;

      // clear previous blobs
      objectUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      objectUrlsRef.current = [];

      // optional upload
      let upload: any = null;
      if (params.file) {
        log(`Uploading ${params.file.name}…`);
        upload = await uploadDocx(base, params.file);
        log("Upload OK", upload);
      }

      const inputs: any = {
        language: params.language || "ar",
        slides_count: Number.isFinite(params.slidesCount) ? params.slidesCount : 12,
      };
      const p = (params.prompt || "عرض تقديمي تجريبي").trim();

      if (upload) {
        inputs.project_id = upload.project_id;
        inputs.source = "docx";
        inputs.docx_url = upload.path;
      } else {
        inputs.source = "prompt";
        inputs.prompt = p;
        // Seed transcript when using prompt (optional)
        const firstLine =
          inputs.language === "en" ? `${inputs.slides_count} slides on ${p}` : `${inputs.slides_count} شرائح عن ${p}`;
        pushText(firstLine);
        pushText(
          inputs.language === "en"
            ? `I'll help you create a comprehensive ${inputs.slides_count}-slide presentation on ${p}. Let me start by planning the research and slide creation process.`
            : `سأساعدك في إنشاء عرض تقديمي شامل من ${inputs.slides_count} شرائح عن ${p}. سأبدأ بتخطيط عملية البحث وإنشاء الشرائح.`
        );
      }

      log("Starting job…", { inputs });
      const startResp: StartJobResponse = await startSlidesJob(base, inputs);
      jobIdRef.current = startResp.job_id;
      projectIdRef.current = startResp.project_id;
      log(`Job started: ${startResp.job_id} (project ${startResp.project_id})`);

      startSSE(base + startResp.watch);
      startPolling(base);
    } catch (e: any) {
      setUiError(e?.message || "Unknown error");
      log("ERROR: " + (e?.message || e));
      setBusy(false);
    }
  }

  function cancel() {
    if (sseRef.current) {
      sseRef.current.close();
      sseRef.current = null;
      log("SSE closed by user");
    }
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setBusy(false);
  }

  return {
    // state
    status,
    logText,
    uiError,
    links,
    slides,
    cardTabs,
    codeByNo,
    // progress
    progress, // structured items
    typedProgressText, // optional single <pre> string if you prefer
    // actions
    start,
    cancel,
    ensureCodeFor,
    setCardTabs,
  };
}
