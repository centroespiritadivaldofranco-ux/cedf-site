import { quotes } from "../data/content";

export default function FrasesMarquee() {
  const doubled = [...quotes, ...quotes];

  return (
    <div className="overflow-hidden border-y border-navy-950/15 bg-paper-100 py-5">
      <div className="flex w-max animate-marquee gap-10">
        {doubled.map((q, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-base font-medium text-navy-950/70 md:text-lg"
          >
            {q}
            <span className="text-blue-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
