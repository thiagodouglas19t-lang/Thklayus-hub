type Page =
  | "home"
  | "cursos"
  | "gratis"
  | "estudo"
  | "pedidos"
  | "suporte"
  | "chat"
  | "admin"
  | "resolver"
  | "perfil"
  | "sobre";

type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
  userEmail?: string | null;
  onLogout?: () => void;
};

const menu: { label: string; short: string; value: Page; icon: string }[] = [
  { label: "Início", short: "Início", value: "home", icon: "⌂" },
  { label: "Cursos", short: "Cursos", value: "cursos", icon: "◈" },
  { label: "Estudo", short: "Estudo", value: "estudo", icon: "▣" },
  { label: "Pedidos", short: "Pedidos", value: "pedidos", icon: "✦" },
  { label: "Tickets", short: "Tickets", value: "suporte", icon: "◇" },
  { label: "Chat", short: "Chat", value: "chat", icon: "●" },
  { label: "Perfil", short: "Perfil", value: "perfil", icon: "◌" },
  { label: "Sobre", short: "Sobre", value: "sobre", icon: "ℹ" },
  { label: "Grátis", short: "Grátis", value: "gratis", icon: "✧" },
  { label: "Resolver", short: "Resolver", value: "resolver", icon: "⚡" },
  { label: "Admin", short: "Admin", value: "admin", icon: "♛" },
];

export default function Navbar({ page, setPage, userEmail, onLogout }: NavbarProps) {
  function Item(item: (typeof menu)[number], mobile = false) {
    const active = page === item.value;

    return (
      <button
        key={`${item.value}-${mobile ? "mobile" : "desktop"}`}
        onClick={() => setPage(item.value)}
        className={
          mobile
            ? `flex min-w-[64px] flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-black transition active:scale-95 ${
                active ? "bg-white text-black shadow-lg shadow-blue-500/20" : "text-zinc-500"
              }`
            : `group whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${
                active
                  ? "bg-white text-black shadow-[0_0_28px_rgba(59,130,246,0.28)]"
                  : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-white"
              }`
        }
      >
        {mobile ? (
          <>
            <span className="text-base leading-none">{item.icon}</span>
            <span className="mt-1">{item.short}</span>
          </>
        ) : (
          <span className="flex items-center gap-2">
            <span className={active ? "text-black" : "text-blue-300 group-hover:text-blue-200"}>{item.icon}</span>
            {item.label}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_30%)]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left active:scale-95">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600 via-blue-500 to-sky-300 text-lg font-black text-white shadow-lg shadow-blue-500/20">
              A
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-xl font-black tracking-[0.16em] text-transparent md:text-2xl">AprendaJá</h1>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">THKLAYUS</p>
            </div>
          </button>

          <nav className="hidden max-w-[720px] gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl shadow-black/50 lg:flex">
            {menu.map((item) => Item(item))}
          </nav>

          <div className="flex items-center gap-2">
            {userEmail ? (
              <>
                <button onClick={() => setPage("perfil")} className="hidden max-w-44 truncate rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-zinc-400 md:block">
                  {userEmail}
                </button>
                <button onClick={onLogout} className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition hover:bg-red-500/20 active:scale-95">
                  Sair
                </button>
              </>
            ) : (
              <button onClick={() => setPage("gratis")} className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">
                Explorar
              </button>
            )}
          </div>
        </div>
      </header>

      <nav className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-xl -translate-x-1/2 gap-1 overflow-x-auto rounded-[1.7rem] border border-white/10 bg-black/85 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl lg:hidden">
        {menu.slice(0, 8).map((item) => Item(item, true))}
      </nav>
    </>
  );
}
