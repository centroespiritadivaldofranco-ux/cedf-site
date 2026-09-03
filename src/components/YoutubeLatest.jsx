import { useEffect, useState } from "react";
import { YoutubeIcon } from "./BrandIcons";
import Reveal from "./Reveal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";
const CHANNEL_URL = "https://www.youtube.com/@centroespiritadivaldofranco";

export default function YoutubeLatest() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/api/youtube/latest`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setVideo(data || null);
      })
      .catch(() => {
        if (!cancelled) setVideo(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // YouTube ainda não conectado (ou sem vídeos) — não mostra nada, sem quebrar o layout.
  if (!video) return null;

  return (
    <section id="videos" className="bg-paper-50 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="text-center">
          <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
            Nosso canal
          </Reveal>
          <Reveal delay={80} as="h2" className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-navy-950 md:text-4xl">
            Último vídeo publicado
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-10 aspect-video w-full overflow-hidden bg-navy-950 shadow-lg">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Reveal>

        <Reveal delay={180} className="mt-6 text-center">
          <p className="font-display text-lg font-semibold text-navy-950">{video.title}</p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-blue-500 transition hover:text-blue-600"
          >
            <YoutubeIcon size={16} /> Ver mais vídeos no canal
          </a>
        </Reveal>
      </div>
    </section>
  );
}
