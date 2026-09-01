import { AtSign } from "lucide-react";
import Wordmark from "./Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-paper-0/10 bg-navy-950 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left md:px-10">
        <a href="/">
          <Wordmark tone="light" size="sm" />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-paper-0/60">
          <a href="/#sobre" className="hover:text-blue-400">Sobre</a>
          <a href="/#angelis" className="hover:text-blue-400">Ângelis</a>
          <a href="/#atividades" className="hover:text-blue-400">Atividades</a>
          <a href="/psicografias" className="hover:text-blue-400">Psicografias</a>
          <a href="/oracoes" className="hover:text-blue-400">Prece</a>
          <a href="/#contato" className="hover:text-blue-400">Localização</a>
        </div>

        <a
          href="https://www.instagram.com/centroespiritadivaldofranco/"
          target="_blank"
          rel="noreferrer"
          className="flex h-9 w-9 items-center justify-center border border-paper-0/20 text-paper-0 transition hover:border-blue-400 hover:text-blue-400"
          aria-label="Instagram"
        >
          <AtSign size={16} />
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-paper-0/40">
        © {new Date().getFullYear()} Centro Espírita Divaldo Franco · João Pessoa/PB
      </p>
    </footer>
  );
}
