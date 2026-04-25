import { Sparkles, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-2 text-lg font-bold mb-4">
            <Sparkles className="h-5 w-5" />
            <span>Kairós Studio</span>
          </div>

          {/* Description */}
          <p className="text-zinc-400 text-sm max-w-md mb-6">
            Transformando ideias em experiências digitais únicas. 
            Sites, aplicativos e soluções que impulsionam seu negócio.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white hover:bg-zinc-900"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white hover:bg-zinc-900"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 transition-all hover:border-zinc-600 hover:text-white hover:bg-zinc-900"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-zinc-500 text-xs">
            © {currentYear} Kairós Studio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
