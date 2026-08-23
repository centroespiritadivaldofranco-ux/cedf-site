import { Mic2, Sparkles, Home, BookOpen, PenLine, HeartHandshake, HeartPulse, Flame, Hand, ChefHat, Clock, ArrowRight, Play } from "lucide-react";
import Reveal from "./Reveal";
import InstagramEmbed from "./InstagramEmbed";
import { activities } from "../data/content";

const icons = { Mic2, Sparkles, Home, BookOpen, PenLine, HeartHandshake, HeartPulse, Flame, Hand, ChefHat };
const evangelhoReel = activities.find((a) => a.reelUrl)?.reelUrl;

export default function Atividades() {
  return (
    <section id="atividades" className="bg-navy-950 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="max-w-xl">
          <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
            Nossas atividades
          </Reveal>
          <Reveal delay={80} as="h2" className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-paper-0 md:text-4xl">
            Para todo momento da sua busca
          </Reveal>
          <Reveal delay={140} as="p" className="mt-4 text-base leading-relaxed text-paper-0/60">
            Palestra, estudo, mediunidade ou apenas uma conversa — escolha o caminho que faz
            sentido pra você agora.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-paper-0/10 bg-paper-0/10 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((a, i) => {
            const Icon = icons[a.icon];
            const Tag = a.href ? "a" : "div";
            return (
              <Reveal
                key={a.title}
                delay={(i % 3) * 80}
                as={Tag}
                {...(a.href ? { href: a.href } : {})}
                className="group flex flex-col bg-navy-950 p-7 transition hover:bg-navy-900"
              >
                <Icon className="text-blue-400" size={22} />
                <h3 className="mt-5 font-display text-lg font-semibold text-paper-0">{a.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-blue-300">
                  <Clock size={12} /> {a.schedule}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-paper-0/55">{a.description}</p>
                {a.href && (
                  <span className="mt-4 flex items-center gap-1.5 text-sm font-bold text-blue-400 transition group-hover:gap-2.5">
                    {a.ctaLabel || "Saiba mais"} <ArrowRight size={14} />
                  </span>
                )}
              </Reveal>
            );
          })}
        </div>

        {evangelhoReel && (
          <Reveal delay={100} className="mt-16 border-t border-paper-0/10 pt-16">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center bg-blue-500/15 text-blue-400">
                <Play size={20} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-paper-0">
                Não sabe por onde começar?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-0/60">
                Veja um passo a passo bem didático de como fazer o Evangelho no Lar com a
                família.
              </p>
            </div>
            <div className="mt-8">
              <InstagramEmbed url={evangelhoReel} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
