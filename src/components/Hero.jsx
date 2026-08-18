import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="topo" className="bg-paper-50 pt-32 pb-0 md:pt-44">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          João Pessoa · PB
        </Reveal>

        <Reveal
          delay={80}
          as="h1"
          className="mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-tight text-navy-950 sm:text-6xl md:text-7xl"
        >
          Um lugar simples,
          <br />
          <span className="text-blue-500">acolhedor</span> e aberto a todos.
        </Reveal>

        <Reveal delay={160} className="mt-10 flex flex-col gap-8 border-t border-navy-950/15 pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-navy-950/70 md:text-lg">
            Somos uma casa espírita fundada em homenagem a Divaldo Franco. Aqui você encontra
            estudo, acolhimento, fraternidade e paz — venha como estiver.
          </p>
          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row">
            <a
              href="#atividades"
              className="group inline-flex items-center justify-center gap-2 bg-navy-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-paper-0 transition hover:bg-blue-500"
            >
              Conheça as atividades
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 border border-navy-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-navy-950 transition hover:border-blue-500 hover:text-blue-500"
            >
              Como chegar
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={220} className="mt-16 border-t border-navy-950/15">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-navy-950/15 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10">
          <div className="py-7 sm:pr-8">
            <p className="font-display text-3xl font-semibold text-navy-950">Quintas, 20h</p>
            <p className="mt-1 text-sm text-navy-950/60">Palestras públicas</p>
          </div>
          <div className="py-7 sm:px-8">
            <p className="font-display text-3xl font-semibold text-navy-950">~200</p>
            <p className="mt-1 text-sm text-navy-950/60">Crianças no Projeto Ângelis</p>
          </div>
          <div className="py-7 sm:pl-8">
            <p className="font-display text-3xl font-semibold text-navy-950">91,6 mil</p>
            <p className="mt-1 text-sm text-navy-950/60">Pessoas seguem no Instagram</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
