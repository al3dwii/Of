// src/components/ProgressPanel.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = { id: string; text: string };

export default function ProgressPanel({
  items,
  speed = 32,             // 👈 ms per character (raise to 45–80 for slower)
  thinking = false,        // 👈 show blinking dots when waiting
  stickThreshold = 24,     // px from bottom to keep autoscrolling
  sanitize = true,         // remove stray "undefined" & collapse blank lines
  labelWhileThinking = "thinking", // small helper label
}: {
  items: Item[];
  speed?: number;
  thinking?: boolean;
  stickThreshold?: number;
  sanitize?: boolean;
  labelWhileThinking?: string;
}) {
  // Build the full transcript
  const fullRaw = useMemo(
    () => items.map(i => (i?.text ?? "")).join("\n\n"),
    [items]
  );
  const full = useMemo(() => {
    if (!sanitize) return fullRaw;
    return fullRaw
      .replace(/\bundefined\b/gi, "") // scrub literal "undefined"
      .replace(/\n{3,}/g, "\n\n");    // collapse excessive spacing
  }, [fullRaw, sanitize]);

  const [typed, setTyped] = useState<string>("");
  const idxRef = useRef(0);
  const typeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // spinner (blinking dots)
  const frames = ["", ".", "..", "..."];
  const [spinIdx, setSpinIdx] = useState(0);
  const spinTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // scroll-to-bottom helpers
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollParentRef = useRef<HTMLElement | null>(null);

  // find nearest scrollable ancestor once
  useEffect(() => {
    if (!bottomRef.current) return;
    let el = bottomRef.current.parentElement as HTMLElement | null;
    while (el) {
      const s = window.getComputedStyle(el);
      if (/(auto|scroll)/i.test(s.overflowY)) { scrollParentRef.current = el; break; }
      el = el.parentElement as HTMLElement | null;
    }
  }, []);

  // typewriter
  useEffect(() => {
    // new/shorter transcript → reset
    if (idxRef.current > full.length) {
      idxRef.current = 0;
      setTyped("");
    }
    if (typeTimerRef.current) clearInterval(typeTimerRef.current);

    typeTimerRef.current = setInterval(() => {
      if (idxRef.current < full.length) {
        setTyped(t => t + full.charAt(idxRef.current));
        idxRef.current += 1;
      } else {
        clearInterval(typeTimerRef.current!);
        typeTimerRef.current = null;
      }
    }, Math.max(1, speed));

    return () => { if (typeTimerRef.current) clearInterval(typeTimerRef.current); };
  }, [full, speed]);

  // blink while waiting (only when we’ve finished typing the current buffer)
  const shouldBlink = thinking && idxRef.current >= full.length;
  useEffect(() => {
    if (shouldBlink) {
      if (spinTimerRef.current) clearInterval(spinTimerRef.current);
      setSpinIdx(0);
      spinTimerRef.current = setInterval(
        () => setSpinIdx(i => (i + 1) % frames.length),
        400 // blink speed
      );
      return () => { if (spinTimerRef.current) clearInterval(spinTimerRef.current); };
    } else {
      if (spinTimerRef.current) { clearInterval(spinTimerRef.current); spinTimerRef.current = null; }
      setSpinIdx(0);
    }
  }, [shouldBlink]);

  // keep view pinned to bottom while typing (only if user is near bottom)
  useEffect(() => {
    const parent = scrollParentRef.current;
    if (!parent) {
      bottomRef.current?.scrollIntoView({ block: "end" });
      return;
    }
    const distanceFromBottom = parent.scrollHeight - parent.scrollTop - parent.clientHeight;
    const isNearBottom = distanceFromBottom <= stickThreshold;
    if (isNearBottom) parent.scrollTop = parent.scrollHeight;
  }, [typed, spinIdx, stickThreshold]);

  const trailer = shouldBlink ? `\n\n${labelWhileThinking}${frames[spinIdx]}` : "";

  return (
    <div className="rounded-lg bg-black/70">
      <pre aria-live="polite" className="whitespace-pre-wrap text-xs leading-5 p-3">
        {(typed || "—") + trailer}
      </pre>
      <div ref={bottomRef} />
    </div>
  );
}

// "use client";
// import { useEffect, useMemo, useRef, useState } from "react";

// type Item = { id: string; text: string };

// export default function ProgressPanel({
//   items,
//   speed = 8,                 // ms per char
//   stickThreshold = 24,       // px from bottom to keep autoscrolling
// }: {
//   items: Item[];
//   speed?: number;
//   stickThreshold?: number;
// }) {
//   const [typed, setTyped] = useState<string>("");

//   const full = useMemo(() => items.map((i) => i.text).join("\n\n"), [items]);

//   const bottomRef = useRef<HTMLDivElement | null>(null);
//   const scrollParentRef = useRef<HTMLElement | null>(null);
//   const idxRef = useRef(0);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // find nearest scrollable ancestor once
//   useEffect(() => {
//     if (!bottomRef.current) return;
//     let el: HTMLElement | null = bottomRef.current.parentElement as HTMLElement | null;
//     while (el) {
//       const s = window.getComputedStyle(el);
//       if (/(auto|scroll)/i.test(s.overflowY)) {
//         scrollParentRef.current = el;
//         break;
//       }
//       el = el.parentElement as HTMLElement | null;
//     }
//   }, []);

//   // (re)start typing whenever "full" changes
//   useEffect(() => {
//     // reset if we've started a new transcript
//     if (idxRef.current > full.length) {
//       idxRef.current = 0;
//       setTyped("");
//     }
//     if (timerRef.current) clearInterval(timerRef.current);

//     timerRef.current = setInterval(() => {
//       if (idxRef.current < full.length) {
//         setTyped((t) => t + full[idxRef.current]);
//         idxRef.current += 1;
//       } else {
//         clearInterval(timerRef.current!);
//         timerRef.current = null;
//       }
//     }, speed);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [full, speed]);

//   // keep view pinned to bottom while typing (only if already near bottom)
//   useEffect(() => {
//     const parent = scrollParentRef.current;
//     if (!parent) {
//       // fallback: let the browser choose the scrollable ancestor
//       bottomRef.current?.scrollIntoView({ block: "end" /* behavior: 'auto' */ });
//       return;
//     }
//     const distanceFromBottom = parent.scrollHeight - parent.scrollTop - parent.clientHeight;
//     const isNearBottom = distanceFromBottom <= stickThreshold;
//     if (isNearBottom) {
//       parent.scrollTop = parent.scrollHeight; // jump to bottom (fast, no jitter)
//     }
//   }, [typed, stickThreshold]);

//   return (
//     <div className="rounded-lg bg-black/70">
//       <pre
//         aria-live="polite"
//         className="whitespace-pre-wrap text-xs leading-5 p-3"
//       >
//         {typed || "—"}
//       </pre>
//       {/* sentinel used for scrollIntoView / measuring */}
//       <div ref={bottomRef} />
//     </div>
//   );
// }
