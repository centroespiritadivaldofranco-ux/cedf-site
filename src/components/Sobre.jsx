import { HandHeart, Users2, BookHeart } from "lucide-react";
import Reveal from "./Reveal";

const values = [
  {
    icon: HandHeart,
    title: "Caridade",
    text: "O bem que fazemos é o que fica. Servimos sem esperar nada em troca.",
  },
  {
    icon: BookHeart,
    title: "Estudo",
    text: "Aprofundamos a Doutrina Espírita com seriedade, à luz do Evangelho.",
  },
  {
    icon: Users2,
    title: "Acolhimento",
    text: "Toda pessoa é bem-vinda aqui, do jeito que ela é, no momento em que chega.",
  },
];

export default function Sobre() {
  return (
    <section id="sobre" className="border-t border-navy-950/15 bg-paper-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          <div>
            <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
              Quem somos
            </Reveal>
            <Reveal delay={80} as="h2" className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
              Uma casa espírita fundada em homenagem a{" "}
              <span className="text-blue-500">Divaldo Franco</span>
            </Reveal>
            <Reveal delay={160} as="p" className="mt-5 text-base leading-relaxed text-navy-950/70 md:text-lg">
              Nascemos do desejo de espalhar a Doutrina Espírita aliada ao amor pelo próximo.
              Não representamos nem somos representados por Divaldo Franco — o nome é uma
              homenagem à sua vida de dedicação à caridade e ao estudo.
            </Reveal>
            <Reveal delay={190} as="p" className="mt-4 text-base leading-relaxed text-navy-950/70 md:text-lg">
              Seguimos o Espiritismo segundo a codificação de Allan Kardec, tendo o Evangelho
              como guia para o nosso agir.
            </Reveal>
            <Reveal delay={220} as="p" className="mt-4 text-base leading-relaxed text-navy-950/70 md:text-lg">
              Se você tem vontade de conhecer uma casa espírita, venha nos visitar. É um lugar
              simples, acolhedor, aberto a todos que desejam amor, fraternidade e paz.
            </Reveal>
          </div>

          <div className="divide-y divide-navy-950/15 border-y border-navy-950/15 md:border-y-0">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 100}
                className="flex items-start gap-4 py-6"
              >
                <v.icon className="mt-0.5 flex-shrink-0 text-blue-500" size={24} />
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-950">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-950/65">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
