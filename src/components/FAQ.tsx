type QA = { q: string; a: string };

export default function FAQ({
  items,
  heading = "FAQ",
  dir = "ltr",
}: {
  items: QA[];
  heading?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <section className="my-10" dir={dir}>
      <h2 className="text-xl font-semibold mb-4">{heading}</h2>
      <dl className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="border border-white/10 rounded-lg p-4 bg-black/20">
            <dt className="font-medium">{it.q}</dt>
            <dd className="opacity-80 mt-2">{it.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
