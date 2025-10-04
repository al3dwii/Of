"use client";

import { useEffect, useRef, useState } from "react";
import { useSlidesJob } from "@/hooks/useSlidesJob";
import SlideCard from "@/components/SlideCard";
import type { CardTab } from "@/lib/types";

type HideKey = "backend" | "language" | "slidesCount" | "prompt" | "upload" | "buttons";
type Preset = {
  backendBaseUrl: string;
  language: "ar" | "en";
  slidesCount: number;
  prompt: string;
  hideControls?: HideKey[];
};

type Props = { preset?: Preset };

export default function SlidesWidget({ preset }: Props) {
  const [backendBase, setBackendBase] = useState(preset?.backendBaseUrl ?? "http://localhost:8000");
  const [prompt, setPrompt] = useState(preset?.prompt ?? "");
  const [language, setLanguage] = useState<"ar" | "en">(preset?.language ?? "ar");
  const [slidesCount, setSlidesCount] = useState(preset?.slidesCount ?? 12);
  const hide = new Set(preset?.hideControls ?? []);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { status, logText, uiError, links, slides, cardTabs, codeByNo, start, cancel, ensureCodeFor, setCardTabs } =
    useSlidesJob(backendBase);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      {/* top actions & artifacts */}
      {links.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank"
               className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-700">
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* controls (respect hideControls) */}
      <div className="grid grid-cols-12 gap-4 mb-5">
        {!hide.has("backend") && (
          <div className="col-span-12 md:col-span-6">
            <label className="block text-xs text-zinc-500 mb-1">Backend base URL</label>
            <input className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                   value={backendBase} onChange={(e) => setBackendBase(e.target.value)} />
          </div>
        )}
        {!hide.has("language") && (
          <div className="col-span-6 md:col-span-3">
            <label className="block text-xs text-zinc-500 mb-1">Language</label>
            <select className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                    value={language} onChange={(e) => setLanguage(e.target.value as any)}>
              <option value="ar">Arabic (ar)</option>
              <option value="en">English (en)</option>
            </select>
          </div>
        )}
        {!hide.has("slidesCount") && (
          <div className="col-span-6 md:col-span-3">
            <label className="block text-xs text-zinc-500 mb-1">Slides count</label>
            <input type="number" min={3} max={30}
                   className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                   value={slidesCount}
                   onChange={(e) => setSlidesCount(parseInt(e.target.value || "12", 10))} />
          </div>
        )}
        {!hide.has("prompt") && (
          <div className="col-span-12">
            <label className="block text-xs text-zinc-500 mb-1">Prompt / Topic</label>
            <textarea className="w-full min-h-[90px] rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm"
                      placeholder="اكتب موضوع العرض…"
                      value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          </div>
        )}
        {!hide.has("upload") && (
          <div className="col-span-12">
            <label className="block text-xs text-zinc-500 mb-1">Upload DOCX (optional)</label>
            <input ref={fileRef} type="file" accept=".docx" className="block w-full text-sm" />
          </div>
        )}
      </div>

      {!hide.has("buttons") && (
        <div className="mb-6 flex items-center gap-2">
          <button
            className="rounded-lg bg-zinc-900 text-white px-3 py-2 text-sm font-semibold disabled:opacity-60"
            onClick={() => start({ prompt, language, slidesCount, file: fileRef.current?.files?.[0] ?? null })}
            disabled={status === "running"}
          >
            Generate Slides
          </button>
          <button className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm disabled:opacity-60"
                  onClick={cancel} disabled={status !== "running"}>
            Cancel
          </button>
          <span className="ml-auto rounded-full border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-600">
            {status}
          </span>
        </div>
      )}

      {/* stack */}
      {slides.length === 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center text-zinc-500">
          <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8 opacity-40" aria-hidden="true">
            <path d="M4 5a2 2 0 0 1 2-2h8.586a2 2 0 0 1 1.414.586l3.414 3.414A2 2 0 0 1 20 8.414V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" fill="currentColor" />
            <path d="M14 3v3a2 2 0 0 0 2 2h3" fill="#fff" />
          </svg>
          <div className="mt-2 text-sm">{language === "ar" ? "معاينة الشرائح" : "Preview of Your Slides"}</div>
        </div>
      ) : (
        <div className="space-y-5">
          {slides.map((s, idx) => {
            const tab: CardTab = (cardTabs as any)[s.no] || "preview";
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
                onTab={(k) => (setCardTabs as any)((m: any) => ({ ...m, [s.no]: k }))}
              />
            );
          })}
        </div>
      )}

      {/* optional: progress + errors */}
      {(uiError || logText) && (
        <div className="mt-6">
          {uiError && <div className="mb-2 text-sm text-red-600">{uiError}</div>}
          <pre className="whitespace-pre-wrap text-xs leading-5 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-zinc-700">
            {logText || "—"}
          </pre>
        </div>
      )}
    </div>
  );
}
