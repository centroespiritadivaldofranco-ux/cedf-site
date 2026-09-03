import { MapPin, Clock3, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import Reveal from "./Reveal";
import { location, thursdaySchedule } from "../data/content";

export default function Localizacao() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`;
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(location.mapsQuery)}&output=embed`;

  return (
    <section id="contato" className="border-t border-navy-950/15 bg-paper-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          Venha nos visitar
        </Reveal>
        <Reveal delay={80} as="h2" className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
          Estamos de portas abertas para você
        </Reveal>

        <div className="mt-12 grid gap-px border border-navy-950/15 bg-navy-950/15 md:grid-cols-[1fr_1.2fr]">
          <Reveal delay={140} className="flex flex-col divide-y divide-navy-950/15 bg-paper-50">
            <div className="p-6">
              <MapPin className="text-blue-500" size={22} />
              <p className="mt-3 text-sm font-bold text-navy-950">Endereço</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-950/70">{location.address}</p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-500 hover:text-navy-950"
              >
                Ver rota no mapa <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="p-6">
              <Clock3 className="text-blue-500" size={22} />
              <p className="mt-3 text-sm font-bold text-navy-950">Quintas-feiras</p>
              <ul className="mt-3 flex flex-col gap-3">
                {thursdaySchedule.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="w-12 flex-shrink-0 text-sm font-bold text-blue-500">{item.time}</span>
                    <span>
                      <span className="block text-sm font-semibold text-navy-950">{item.title}</span>
                      <span className="block text-xs leading-relaxed text-navy-950/60">{item.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={location.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between bg-navy-950 p-6 text-paper-0 transition hover:bg-blue-500"
            >
              <span className="flex items-center gap-3">
                <InstagramIcon size={20} />
                <span className="text-sm font-bold">@centroespiritadivaldofranco</span>
              </span>
              <ArrowUpRight size={16} />
            </a>
          </Reveal>

          <Reveal delay={200} className="overflow-hidden">
            <iframe
              title="Mapa de localização do Centro Espírita Divaldo Franco"
              src={mapsEmbed}
              className="h-full min-h-[360px] w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
