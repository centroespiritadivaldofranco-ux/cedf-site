import { useState } from "react";
import { HeartHandshake, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Reveal from "../components/Reveal";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export default function Oracoes() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (nomeCompleto.trim().length < 3) {
      setError("Informe o nome completo da pessoa.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/oracoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeCompleto: nomeCompleto.trim(), mensagem: mensagem.trim() || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível enviar. Tente novamente.");
      }
      setStatus("done");
    } catch (err) {
      setError(err.message || "Não foi possível enviar. Tente novamente.");
      setStatus("idle");
    }
  }

  return (
    <main className="pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <Reveal className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
          Prece Coletiva
        </Reveal>
        <Reveal delay={80} as="h1" className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-navy-950 md:text-5xl">
          Deixe um nome para orarmos com você
        </Reveal>
        <Reveal delay={140} as="p" className="mt-5 text-base leading-relaxed text-navy-950/70 md:text-lg">
          Durante nossos trabalhos espirituais, sintonizamos com as pessoas que precisam de
          oração e tratamento. Deixe o nome completo de quem você quer incluir — vale para você
          mesmo ou para alguém querido. Essas informações são usadas só internamente, para o
          trabalho da Casa.
        </Reveal>

        {status === "done" ? (
          <Reveal delay={200} className="mt-10 flex flex-col items-start gap-4 border border-blue-500/30 bg-blue-100 p-8">
            <CheckCircle2 className="text-blue-500" size={28} />
            <div>
              <p className="font-display text-xl font-semibold text-navy-950">Pedido recebido.</p>
              <p className="mt-2 text-sm leading-relaxed text-navy-950/70">
                Vamos incluir {nomeCompleto.trim().split(" ")[0]} em nossos próximos trabalhos.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setNomeCompleto("");
                setMensagem("");
                setStatus("idle");
              }}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-blue-500 hover:text-navy-950"
            >
              Enviar outro pedido <ArrowRight size={14} />
            </button>
          </Reveal>
        ) : (
          <Reveal delay={200} as="form" onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div>
              <label htmlFor="nomeCompleto" className="mb-2 block text-xs font-bold uppercase tracking-wide text-navy-950/70">
                Nome completo
              </label>
              <input
                id="nomeCompleto"
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                placeholder="Nome completo da pessoa que precisa de oração"
                className="w-full border border-navy-950/25 bg-paper-0 px-4 py-3.5 text-sm text-navy-950 placeholder:text-navy-950/40 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="mb-2 block text-xs font-bold uppercase tracking-wide text-navy-950/70">
                Quer compartilhar algo? (opcional)
              </label>
              <textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={4}
                placeholder="Se quiser, conte um pouco do que essa pessoa está vivendo"
                className="w-full resize-none border border-navy-950/25 bg-paper-0 px-4 py-3.5 text-sm text-navy-950 placeholder:text-navy-950/40 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 self-start bg-navy-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-paper-0 transition hover:bg-blue-500 disabled:opacity-60"
            >
              {status === "loading" ? "Enviando..." : "Enviar pedido"}
              <HeartHandshake size={16} />
            </button>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-navy-950/50">
              <ShieldCheck size={15} className="mt-0.5 flex-shrink-0" />
              Os dados enviados aqui são usados apenas internamente pela Casa, para os trabalhos
              espirituais, e não são compartilhados com terceiros — em conformidade com a LGPD
              (Lei Geral de Proteção de Dados).
            </p>
          </Reveal>
        )}
      </div>
    </main>
  );
}
