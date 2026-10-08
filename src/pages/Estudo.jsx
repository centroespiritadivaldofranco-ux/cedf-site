import { Download, ExternalLink } from "lucide-react";
import Reveal from "../components/Reveal";
import { grupos, PAGINA_FEB } from "../data/estudo";

const registrarCliqueEstudo = (local) => window.gtag?.("event", "clique_estudo", { local });

export default function Estudo() {
  return (
    <main className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          Material de estudo
        </Reveal>
        <Reveal delay={80} as="h1" className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-navy-950 md:text-5xl">
          Para estudar e <span className="text-blue-500">consultar sempre</span>
        </Reveal>
        <Reveal delay={140} as="p" className="mt-5 max-w-2xl text-base leading-relaxed text-navy-950/70 md:text-lg">
          Uma seleção de documentos e livretos em PDF, publicados pela Federação Espírita Brasileira
          (FEB), para consulta e download gratuitos. Os arquivos abrem no site da FEB.
        </Reveal>

        <div className="mt-14 space-y-16">
          {grupos.map((grupo) => (
            <section key={grupo.id}>
              <Reveal as="h2" className="font-display text-2xl font-semibold tracking-tight text-navy-950 md:text-3xl">
                {grupo.titulo}
              </Reveal>
              <Reveal delay={60} as="p" className="mt-2 max-w-2xl text-base leading-relaxed text-navy-950/65">
                {grupo.descricao}
              </Reveal>
              <ul className="mt-6 divide-y divide-navy-950/15 border-y border-navy-950/15">
                {grupo.itens.map((item) => (
                  <li key={item.link}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => registrarCliqueEstudo(item.titulo)}
                      className="group flex items-center justify-between gap-6 py-4 text-navy-950 transition hover:text-blue-500"
                    >
                      <span className="text-base font-medium md:text-lg">{item.titulo}</span>
                      <span className="flex flex-shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-950/55 group-hover:text-blue-500">
                        PDF <Download size={16} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <Reveal className="mt-12 text-center text-sm text-navy-950/60">
          Material de autoria da FEB. Para ver todos os documentos e outros conteúdos, visite{" "}
          <a href={PAGINA_FEB} target="_blank" rel="noreferrer" onClick={() => registrarCliqueEstudo("pagina_feb")}
            className="inline-flex items-center gap-1 font-semibold text-blue-500 underline-offset-4 hover:underline">
            a página da FEB <ExternalLink size={13} />
          </a>
        </Reveal>
      </div>
    </main>
  );
}
