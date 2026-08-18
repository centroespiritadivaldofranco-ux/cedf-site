import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Reveal from "../components/Reveal";
import PsicografiaCard from "../components/PsicografiaCard";
import { useSpeech } from "../hooks/useSpeech";
import { psicografias, CATEGORIES } from "../data/psicografias";

const filters = [
  { id: "todas", label: "Todas" },
  { id: "pessoa", label: CATEGORIES.pessoa },
  { id: "mentor", label: CATEGORIES.mentor },
];

export default function Psicografias() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("todas");
  const { speakingId, speak, stop, supported } = useSpeech();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return psicografias.filter((letter) => {
      const matchesFilter = filter === "todas" || letter.category === filter;
      const matchesQuery = !q || letter.name.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <main className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          Psicografia
        </Reveal>
        <Reveal delay={80} as="h1" className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-navy-950 md:text-5xl">
          Cartas e mensagens recebidas em nossa Casa
        </Reveal>
        <Reveal delay={140} as="p" className="mt-5 max-w-2xl text-base leading-relaxed text-navy-950/70 md:text-lg">
          Algumas cartas psicografadas chegam endereçadas a pessoas queridas; outras trazem
          orientação de mentores espirituais da Casa. Busque pelo nome de quem você procura, ou
          filtre por tipo. Você também pode ouvir cada carta em voz alta.
        </Reveal>

        <Reveal delay={200} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy-950/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar pelo nome do seu ente querido"
              className="w-full border border-navy-950/25 bg-paper-0 py-3.5 pl-11 pr-4 text-sm text-navy-950 placeholder:text-navy-950/40 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition ${
                  filter === f.id
                    ? "bg-navy-950 text-paper-0"
                    : "border border-navy-950/25 text-navy-950/70 hover:border-navy-950"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4">
          {results.length === 0 && (
            <p className="border border-dashed border-navy-950/25 p-8 text-center text-sm text-navy-950/60">
              Nenhuma carta encontrada com esse nome. Tente buscar de outro jeito, ou entre em
              contato conosco pelo Instagram.
            </p>
          )}
          {results.map((letter, i) => (
            <Reveal key={letter.id} delay={i * 60}>
              <PsicografiaCard
                letter={letter}
                speakingId={speakingId}
                onSpeak={speak}
                onStop={stop}
                supported={supported}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
