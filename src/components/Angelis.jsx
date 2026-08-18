import { ArrowUpRight, ChefHat, AtSign, CalendarCheck } from "lucide-react";
import Reveal from "./Reveal";
import { angelis } from "../data/content";

export default function Angelis() {
  return (
    <section id="angelis" className="bg-blue-500 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <Reveal className="inline-flex items-center gap-2 bg-navy-950/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-navy-950">
              <CalendarCheck size={14} /> Todo sábado
            </Reveal>
            <Reveal delay={80} as="h2" className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-paper-0 md:text-4xl">
              {angelis.tagline}
            </Reveal>
            <Reveal delay={160} as="p" className="mt-5 max-w-lg text-base leading-relaxed text-paper-0/85 md:text-lg">
              {angelis.description}
            </Reveal>
            <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
              <a
                href={angelis.volunteerForm}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-navy-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-paper-0 transition hover:bg-navy-800"
              >
                Seja um voluntário
                <ArrowUpRight size={16} />
              </a>
              <a
                href={angelis.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-navy-950/30 px-7 py-4 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:border-navy-950"
              >
                <AtSign size={16} /> angelisrefeitorio
              </a>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-px border border-navy-950/15 bg-navy-950/15">
            <Reveal delay={100} className="col-span-2 bg-paper-0 p-6">
              <p className="font-display text-4xl font-semibold text-blue-500">{angelis.mealsServed}</p>
              <p className="mt-1 text-sm font-medium text-navy-950/70">{angelis.mealsLabel}</p>
            </Reveal>
            <Reveal delay={180} className="bg-navy-950/10 p-6 text-paper-0">
              <p className="font-display text-2xl font-semibold">{angelis.weeklyKids}</p>
              <p className="mt-1 text-sm font-medium">{angelis.weeklyLabel}</p>
            </Reveal>
            <Reveal delay={240} className="bg-navy-950/10 p-6 text-paper-0">
              <ChefHat size={22} />
              <p className="mt-3 text-sm font-medium">Presença, escuta e amor</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
