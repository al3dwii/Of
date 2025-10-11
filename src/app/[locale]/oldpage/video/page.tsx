"use client";

import { useEffect, useRef, useState } from "react";
import { useSlidesJob } from "@/hooks/useSlidesJob";
import SlideCard from "@/components/SlideCard";
import type { CardTab } from "@/lib/types";

function EmptySlidesPanel({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white">
      {/* header */}
      <div className="px-4 py-3 border-b border-zinc-200 text-sm font-medium text-zinc-700">
        Slides Canvas
      </div>

      {/* centered body */}
      <div className="h-[calc(100vh-110px)] px-4 pb-4 flex items-center justify-center">
        <div className="text-center text-zinc-500">
          {/* simple inline icon */}
          <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10 opacity-40" aria-hidden="true">
            <path d="M4 5a2 2 0 0 1 2-2h8.586a2 2 0 0 1 1.414.586l3.414 3.414A2 2 0 0 1 20 8.414V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" fill="currentColor" />
            <path d="M14 3v3a2 2 0 0 0 2 2h3" fill="#fff" />
          </svg>
          <div className="mt-3 text-[15px] font-semibold">
            {label}
          </div>
          <div className="mt-1 text-xs opacity-70">
            {label === "Preview of Your Slides" ? "Generate Slides to see your preview here." : "اضغط «إنشاء الشرائح» لعرض المعاينة هنا."}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Page() {
  // Controls
  const [backendBase, setBackendBase] = useState("http://localhost:8000"); // or NEXT_PUBLIC_API_BASE
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [slidesCount, setSlidesCount] = useState(12);
  const fileRef = useRef<HTMLInputElement | null>(null);

  // Persist base
  useEffect(() => {
    const saved = localStorage.getItem("slides_backend_base");
    if (saved) setBackendBase(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("slides_backend_base", backendBase.trim());
  }, [backendBase]);

  const {
    status, logText, uiError,
    links, slides, cardTabs, codeByNo,
    start, cancel, ensureCodeFor, setCardTabs,
  } = useSlidesJob(backendBase);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      {/* top bar */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0e0f14]">
        <div className="mx-auto max-w-[1500px] px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-white/10 px-3 py-1.5">←</button>
            <div className="text-[15px] font-bold">توجيه السلوك الاجتماعي والعلاقات للمراهق</div>
          </div>
        </div>
      </div>

      {/* main grid */}
      <div className="mx-auto max-w-[1500px] px-5 py-5 grid grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="col-span-12 xl:col-span-4">
          {/* Artifacts */}
          <div>
            <div className="text-sm font-semibold mb-2">Artifacts</div>
            {links.length ? (
              <div className="flex flex-wrap gap-2">
                {links.map((l) => (
                  <a key={l.label} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm" href={l.href} target="_blank">
                    {l.label}
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-sm text-white/60">No artifacts yet.</div>
            )}
          </div>

          {/* Panel */}
          <div className="h-[calc(100vh-110px)] rounded-2xl border border-white/10 bg-[#12141b] flex flex-col overflow-hidden mt-3">
            {/* scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <div className="text-sm font-semibold mb-2">Progress</div>
                <pre className="whitespace-pre-wrap text-xs leading-5 rounded-lg bg-black/70 p-3">{logText || "—"}</pre>
              </div>
            </div>

            {/* controls */}
            <div className="p-4 border-t border-white/10">
              <label className="block text-xs text-white/60 mb-1">Backend base URL</label>
              <input
                className="w-full rounded-lg border border-white/10 bg-[#0f1115] px-3 py-2 text-sm outline-none"
                value={backendBase}
                onChange={(e) => setBackendBase(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Language</label>
                  <select
                    className="w-full rounded-lg border border-white/10 bg-[#0f1115] px-3 py-2 text-sm outline-none"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                  >
                    <option value="ar">Arabic (ar)</option>
                    <option value="en">English (en)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Slides count</label>
                  <input
                    type="number" min={3} max={30}
                    className="w-full rounded-lg border border-white/10 bg-[#0f1115] px-3 py-2 text-sm outline-none"
                    value={slidesCount}
                    onChange={(e) => setSlidesCount(parseInt(e.target.value || "12", 10))}
                  />
                </div>
              </div>

              <label className="block text-xs text-white/60 mt-3 mb-1">Prompt / Topic</label>
              <textarea
                className="w-full min-h-[90px] rounded-lg border border-white/10 bg-[#0f1115] px-3 py-2 text-sm outline-none"
                placeholder="اكتب موضوع العرض…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <label className="block text-xs text-white/60 mt-3 mb-1">Upload DOCX (optional)</label>
              <input ref={fileRef} type="file" accept=".docx" className="block w-full text-sm" />

              <div className="mt-3 flex items-center gap-2">
                <button
                  className="rounded-lg bg-white text-[#0f1115] px-3 py-2 text-sm font-semibold disabled:opacity-60"
                  onClick={() =>
                    start({
                      prompt,
                      language,
                      slidesCount,
                      file: fileRef.current?.files?.[0] ?? null,
                    })
                  }
                  disabled={status === "running"}
                >
                  Generate Slides
                </button>
                <button
                  className="rounded-lg border border-white/10 px-3 py-2 text-sm disabled:opacity-60"
                  onClick={cancel}
                  disabled={status !== "running"}
                >
                  Cancel
                </button>
                <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs">{status}</span>
              </div>

              {uiError && <div className="mt-2 text-xs text-red-300">{uiError}</div>}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {/* RIGHT */}
        <div className="col-span-12 xl:col-span-8">
          {slides.length === 0 ? (
            // Empty state → white card, centered preview, NO top buttons
            <EmptySlidesPanel label={language === "ar" ? "معاينة الشرائح" : "Preview of Your Slides"} />
          ) : (
            // Has slides → dark card with action buttons and the stack
            <div className="rounded-2xl border border-white/10 bg-[#12141b] p-5 flex flex-col">
              <div className="h-[calc(100vh-110px)] overflow-y-auto space-y-5 pr-1">
                {/* show buttons only when there are slides */}
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                    Save as Template
                  </button>
                  <button className="rounded-lg bg-white text-[#0f1115] px-3 py-1.5 text-sm font-semibold">
                    View &amp; Export
                  </button>
                </div>

                {slides.map((s, idx) => {
                  const tab = (cardTabs as any)[s.no] || "preview";
                  const total = slides.length;
                  return (
                    <SlideCard
                      key={s.no}
                      slide={s}
                      index={idx}
                      total={total}
                      tab={tab}
                      code={(codeByNo as any)[s.no]}
                      ensureCodeFor={ensureCodeFor}
                      onTab={(k) => {
                        (setCardTabs as any)((m: any) => ({ ...m, [s.no]: k }));
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

 
      </div>
    </div>
  );
}
