import { ArrowRight, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";
import { livros, LOJA_URL } from "../data/livraria";

const registrarCliqueLivraria = (local) => window.gtag?.("event", "clique_livraria", { local });

export default function Livraria() {
  return (
    <main className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          Livraria do CEDF
        </Reveal>
        <Reveal delay={80} as="h1" className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-navy-950 md:text-5xl">
          Leituras que <span className="text-blue-500">acompanham o caminho</span>
        </Reveal>
        <Reveal delay={140} as="p" className="mt-5 max-w-2xl text-base leading-relaxed text-navy-950/70 md:text-lg">
          Na livraria virtual do Centro Espírita Divaldo Franco você encontra livros para
          inspirar, consolar e fazer pensar. Escolha o seu e receba em casa.
        </Reveal>

        <div className="mt-14 divide-y divide-navy-950/15 border-y border-navy-950/15">
          {livros.map((livro) => (
            <article key={livro.id} className="grid gap-10 py-12 md:grid-cols-[minmax(0,340px)_1fr] md:items-center md:gap-16">
              <Reveal>
                <a
                  href={livro.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => registrarCliqueLivraria("capa_" + livro.id)}
                  className="mx-auto block max-w-[300px] border border-navy-950/10 bg-paper-0 p-3 shadow-[0_18px_40px_-18px_rgba(10,14,42,0.35)] transition hover:-translate-y-1 md:max-w-none"
                >
                  <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} className="block h-auto w-full" loading="lazy" />
                </a>
              </Reveal>

              <div>
                <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                  {livro.genero}
                </Reveal>
                <Reveal delay={80} as="h2" className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
                  {livro.titulo}
                </Reveal>
                <Reveal delay={110} as="p" className="mt-2 font-display text-lg italic text-navy-950/70">{livro.subtitulo}</Reveal>
                <Reveal delay={125} as="p" className="mt-1 text-sm font-medium text-navy-950/55">{livro.autoria}</Reveal>
                {livro.sinopse.map((p, i) => (
                  <Reveal key={i} delay={140 + i * 40} as="p" className="mt-4 text-base leading-relaxed text-navy-950/70 md:text-lg">
                    {p}
                  </Reveal>
                ))}

                <Reveal delay={260} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <span className="font-display text-3xl font-semibold text-navy-950">{livro.preco}</span>
                  <a
                    href={livro.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => registrarCliqueLivraria("comprar_" + livro.id)}
                    className="inline-flex items-center gap-2 bg-navy-950 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-paper-0 transition hover:bg-blue-500"
                  >
                    Comprar na livraria <ArrowRight size={16} />
                  </a>
                </Reveal>

                <Reveal delay={300} as="p" className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-navy-950/55">
                  <ShieldCheck size={16} className="mt-0.5 flex-shrink-0 text-blue-500" />
                  A compra, o pagamento e o cálculo do frete são feitos na loja virtual do CEDF, em ambiente seguro.
                </Reveal>
              </div>
            </article>
          ))}
        </div>

        <Reveal className="mt-10 text-center text-sm text-navy-950/60">
          Quer ver a loja completa?{" "}
          <a href={LOJA_URL} target="_blank" rel="noreferrer" onClick={() => registrarCliqueLivraria("loja_completa")}
            className="font-semibold text-blue-500 underline-offset-4 hover:underline">
            Acesse a livraria virtual
          </a>
        </Reveal>
      </div>
    </main>
  );
}
