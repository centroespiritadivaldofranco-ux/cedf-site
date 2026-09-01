import { useEffect, useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import Wordmark from "./Wordmark";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#angelis", label: "Ângelis" },
  { href: "/#atividades", label: "Atividades" },
  { href: "/psicografias", label: "Psicografias" },
  { href: "/oracoes", label: "Prece" },
  { href: "/#contato", label: "Localização" },
];

const PORTAL_URL = "https://portal.cedf.com.br/";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? "border-navy-950/10 bg-paper-50/95 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
        <a href="/">
          <Wordmark size="sm" />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy-950 transition hover:text-blue-500"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/centroespiritadivaldofranco/"
            target="_blank"
            rel="noreferrer"
            className="bg-navy-950 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-paper-0 transition hover:bg-blue-500"
          >
            Fale conosco
          </a>

          <a
            href={PORTAL_URL}
            target="_blank"
            rel="noreferrer"
            title="Área exclusiva para membros e tesouraria"
            aria-label="Área exclusiva para membros e tesouraria"
            className="ml-1 flex h-8 w-8 items-center justify-center border border-navy-950/15 text-navy-950/40 transition hover:border-navy-950/40 hover:text-navy-950"
          >
            <LogIn size={15} />
          </a>
        </div>

        <button
          className="text-navy-950 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy-950/10 bg-paper-50 px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-navy-950"
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/centroespiritadivaldofranco/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 bg-navy-950 px-5 py-3 text-center text-sm font-bold uppercase tracking-wide text-paper-0"
            >
              Fale conosco
            </a>

            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 border-t border-navy-950/10 pt-4 text-xs font-medium text-navy-950/40"
            >
              <LogIn size={13} /> Área exclusiva para membros e tesouraria
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
