import { useState } from "react";
import { ArrowUpRight, ChefHat, CalendarCheck, Copy, Check, Heart, Repeat } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import AngelisFeed from "./AngelisFeed";
import { angelis } from "../data/content";

export default function Angelis() {
  const [copied, setCopied] = useState(false);

  function copyPixKey() {
    navigator.clipboard.writeText(angelis.pixKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
                <InstagramIcon size={16} /> angelisrefeitorio
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

        <Reveal delay={120} className="mt-16 grid gap-4 border-t border-navy-950/15 pt-16 sm:grid-cols-2">
          <div className="bg-paper-0 p-6">
            <Heart className="text-blue-500" size={22} />
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-navy-950/60">Doação pontual</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">Chave Pix</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-950/70">
              Qualquer valor ajuda a manter o refeitório funcionando todo sábado.
            </p>
            <button
              type="button"
              onClick={copyPixKey}
              className="mt-4 flex w-full items-center justify-between gap-2 border border-navy-950/20 bg-blue-100 px-4 py-3 text-left transition hover:border-navy-950/40"
            >
              <code className="truncate text-sm font-medium text-navy-950">{angelis.pixKey}</code>
              <span className="flex flex-shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy-950/70">
                {copied ? (
                  <>
                    <Check size={14} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copiar
                  </>
                )}
              </span>
            </button>
          </div>

          <div className="bg-paper-0 p-6">
            <Repeat className="text-blue-500" size={22} />
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-navy-950/60">Doação mensal recorrente</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-navy-950">Clubinho Ângelis</h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-950/70">
              Escolhe um valor e ele é debitado automaticamente todo mês — sem precisar lembrar.
            </p>
            <a
              href={angelis.clubinhoUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-navy-950 px-6 py-3 text-sm font-bold uppercase tracking-wide text-paper-0 transition hover:bg-navy-800"
            >
              Quero fazer parte
              <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>

        <AngelisFeed />
      </div>
    </section>
  );
}
