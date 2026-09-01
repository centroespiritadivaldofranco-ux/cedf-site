import { useState } from "react";
import { ChevronDown, Volume2, Square, Loader2 } from "lucide-react";
import { CATEGORIES } from "../data/psicografias";

function formatDate(iso) {
  if (!iso) return "Data não informada";
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export default function PsicografiaCard({ letter, speakingId, loadingId, onSpeak, onStop, supported }) {
  const [open, setOpen] = useState(false);
  const isSpeaking = speakingId === letter.id;
  const isLoading = loadingId === letter.id;

  return (
    <div className="border border-navy-950/15 bg-paper-0">
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-block bg-blue-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-950">
            {CATEGORIES[letter.category]}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-navy-950">{letter.name}</h3>
          <p className="mt-1 text-xs font-medium text-navy-950/50">{formatDate(letter.date)}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-950/70">
            {open ? letter.content : letter.excerpt}
          </p>
        </div>

        <div className="flex flex-shrink-0 gap-2 sm:flex-col">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center gap-1.5 border border-navy-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-navy-950 transition hover:bg-navy-950 hover:text-paper-0"
          >
            {open ? "Fechar" : "Ler carta"}
            <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
          </button>

          {supported && (
            <button
              type="button"
              disabled={isLoading}
              onClick={() =>
                isSpeaking
                  ? onStop()
                  : onSpeak(letter.id, `Carta para ${letter.name}. ${letter.content}`)
              }
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition disabled:opacity-60 ${
                isSpeaking
                  ? "bg-blue-500 text-paper-0"
                  : "bg-navy-950 text-paper-0 hover:bg-blue-500"
              }`}
            >
              {isLoading ? (
                <Loader2 size={13} className="animate-spin" />
              ) : isSpeaking ? (
                <Square size={13} />
              ) : (
                <Volume2 size={14} />
              )}
              {isLoading ? "Gerando..." : isSpeaking ? "Parar" : "Ouvir"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
