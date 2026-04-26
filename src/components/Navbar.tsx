type Page =
  | "home"
  | "cursos"
  | "gratis"
  | "estudo"
  | "pedidos"
  | "suporte"
  | "chat"
  | "admin";

type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
  userEmail?: string | null;
  onLogout?: () => void;
};

export default function Navbar({ page, setPage, userEmail, onLogout }: NavbarProps) {
  function Item(label: string, value: Page) {
    return (
      <button
        onClick={() => setPage(value)}
        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition active:scale-95 ${
          page === value
            ? "bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300 text-black shadow-lg shadow-emerald-500/20"
            : "border border-white/10 bg-white/5 text-zinc-300 hover:border-emerald-400/60 hover:bg-emerald-400/10"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 px-4 py-4 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <button onClick={() => setPage("home")} className="text-left">
          <h1 className="bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-xl font-black tracking-[0.25em] text-transparent">THKLAYUS</h1>
          <p className="text-xs text-zinc-500">Cursos • Grátis • Suporte</p>
        </button>

        <nav className="flex gap-2 overflow-x-auto rounded-full border border-white/5 bg-white/[0.03] p-1">
          {Item("Home", "home")}
          {Item("Grátis", "gratis")}
          {Item("Cursos", "cursos")}
          {Item("Estudo", "estudo")}
          {Item("Pedidos", "pedidos")}
          {Item("Tickets", "suporte")}
          {Item("Chat", "chat")}
          {Item("Admin", "admin")}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {userEmail ? (
            <>
              <span className="max-w-40 truncate text-xs text-zinc-500">{userEmail}</span>
              <button onClick={onLogout} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-zinc-300">
                Sair
              </button>
            </>
          ) : (
            <button onClick={() => setPage("gratis")} className="rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 text-sm font-black text-black">
              Explorar grátis
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
