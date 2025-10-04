"use client";

import { pad2 } from "@/lib/urls";
import type { CardTab, SlideLink } from "@/lib/types";

type Props = {
  slide: SlideLink;
  index: number;
  total: number;
  tab: CardTab;
  onTab: (tab: CardTab) => void;
  ensureCodeFor: (no: number, url: string) => Promise<void>;
  code?: string;
};

export default function SlideCard({ slide, index, total, tab, onTab, ensureCodeFor, code }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#12141b] overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-sm">
          <span className="rounded-full bg-white text-[#0f1115] px-2 py-0.5 text-xs font-bold">
            {pad2(slide.no)}
          </span>
          <span className="font-semibold">{slide.title || "Slide"}</span>
        </div>
        <div className="flex items-center gap-2">
          {(["preview", "code"] as const).map((k) => (
            <button
              key={k}
              className={`rounded-lg px-3 py-1.5 text-sm border ${
                tab === k ? "bg-white text-[#0f1115] border-white" : "border-white/10 bg-white/5 text-white"
              }`}
              onClick={async () => {
                onTab(k);
                if (k === "code") await ensureCodeFor(slide.no, slide.url);
              }}
            >
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
          <span className="ml-2 text-xs text-white/60">{index + 1} / {total}</span>
        </div>
      </div>

      {/* body */}
      <div className="p-4">
        {tab === "preview" && (
          <div className="rounded-lg overflow-hidden border border-white/10 bg-black">
            {/* fixed 16:9 area; card itself never scrolls */}
            <div className="aspect-video w-full">
              <iframe
                src={slide.url}
                title={`slide-${slide.no}`}
                className="w-full h-full block"
                // Avoid deprecated "scrolling" prop; hide internal scrollbars via CSS on same-origin slides
                onLoad={(e) => {
                  try {
                    const doc = (e.target as HTMLIFrameElement).contentDocument;
                    if (doc) {
                      (doc.documentElement as any).style.overflow = "hidden";
                      (doc.body as any).style.overflow = "hidden";
                    }
                  } catch {
                    // cross-origin: ignore
                  }
                }}
              />
            </div>
          </div>
        )}

        {tab === "code" && (
          <div className="rounded-lg border border-white/10 bg-black/60 p-4">
            <pre className="whitespace-pre-wrap text-xs leading-5">{code ?? "…"}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
