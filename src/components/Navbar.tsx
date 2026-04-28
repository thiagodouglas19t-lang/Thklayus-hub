import { canAccessInternalPanel, getUserRole } from "../lib/roles";

export type Page =
  | "home"
  | "cursos"
  | "gratis"
  | "livros"
  | "ajuda"
  | "estudo"
  | "pedidos"
  | "suporte"
  | "chat"
  | "admin"
  | "resolver"
  | "perfil"
  | "sobre"
  | "pagamento";

type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
  userEmail?: string | null;
  onLogout?: () => void;
};

type MenuItem = { label: string; short: string; value: Page; icon: string; internal?: boolean };

const menu: MenuItem[] = [
  { label: "Início", short: "Início", value: "home", icon: "⌂" },
  { label: "Serviços", short: "Serviços", value: "pedidos", icon: "✦" },
  { label: "Suporte", short: "Suporte", value: "chat", icon: "💬" },
  { label: "Materiais", short: "Materiais", value: "cursos", icon: "◈" },
  { label: "Meus Itens", short: "Meus", value: "estudo", icon: "▣" },
  { label: "Ajuda", short: "Ajuda", value: "ajuda", icon: "?" },
  { label: "Livros", short: "Livros", value: "livros", icon: "📚" },
  { label: "Sobre", short: "Sobre", value: "sobre", icon: "ℹ" },
  { label: "Painel ADM", short: "ADM", value: "admin", icon: "♛", internal: true },
];

const mobileBase: MenuItem[] = [
  { label: "Início", short: "Início", value: "home", icon: "⌂" },
  { label: "Serviços", short: "Serviços", value: "pedidos", icon: "✦" },
  { label: "Suporte", short: "Suporte", value: "chat", icon: "💬" },
  { label: "Materiais", short: "Materiais", value: "cursos", icon: "◈" },
  { label: "Meus Itens", short: "Meus", value: "estudo", icon: "▣" },
];

function AppLogo() {
  return (
    <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-400 via-white to-amber-200 text-black shadow-lg shadow-violet-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_80%_90%,rgba(124,58,237,0.35),transparent_38%)]" />
      <span className="relative text-xl font-black">T</span>
      <span className="absolute bottom-2 h-1 w-5 rounded-full bg-black/80" />
    </div>
  );
}

export default function Navbar({ page, setPage, userEmail, onLogout }: NavbarProps) {
  const internal = canAccessInternalPanel(userEmail);
  const role = getUserRole(userEmail);
  const visibleMenu = menu.filter((item) => !item.internal || internal);
  const mobileMenu = internal
    ? [mobileBase[0], mobileBase[1], mobileBase[2], mobileBase[3], mobileBase[4], { label: "Painel ADM", short: "ADM", value: "admin" as Page, icon: "♛", internal: true }]
    : mobileBase;

  function Item(item: MenuItem, mobile = false) {
    const active = page === item.value || (item.value === "chat" && page === "suporte");
    const isAdmin = Boolean(item.internal);
    return (
      <button key={`${item.value}-${mobile ? "mobile" : "desktop"}`} onClick={() => setPage(item.value)} className={mobile ? `flex flex-1 flex-col items-center justify-center rounded-2xl px-1 py-2 text-[10px] font-black transition active:scale-95 ${active ? "bg-white text-black shadow-lg shadow-violet-500/20" : isAdmin ? "text-amber-200" : "text-zinc-500"}` : `group whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${active ? "bg-white text-black shadow-[0_0_28px_rgba(124,58,237,0.22)]" : isAdmin ? "border border-amber-400/25 bg-amber-500/10 text-amber-100 hover:border-amber-300/50 hover:bg-amber-500/15" : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"}`}>
        {mobile ? <><span className="text-base leading-none">{item.icon}</span><span className="mt-1">{item.short}</span></> : <span className="flex items-center gap-2"><span className={active ? "text-black" : isAdmin ? "text-amber-200" : "text-violet-300 group-hover:text-violet-200"}>{item.icon}</span>{item.label}</span>}
      </button>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.10),transparent_30%)]" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left active:scale-95">
            <AppLogo />
            <div><h1 className="bg-gradient-to-r from-white via-violet-100 to-amber-200 bg-clip-text text-xl font-black tracking-[0.08em] text-transparent md:text-2xl">THKLAYUS</h1><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Serviços Digitais</p></div>
          </button>
          <nav className="hidden max-w-[860px] gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl shadow-black/50 lg:flex">{visibleMenu.map((item) => Item(item))}</nav>
          <div className="flex items-center gap-2">
            {userEmail ? <><button onClick={() => setPage(internal ? "admin" : "perfil")} className={`hidden max-w-48 truncate rounded-2xl border px-4 py-2 text-xs font-bold md:block ${internal ? "border-amber-400/20 bg-amber-500/10 text-amber-100" : "border-white/10 bg-white/[0.04] text-zinc-400"}`}>{internal ? `${role === "dev" ? "Dono" : "ADM"} • ${userEmail}` : userEmail}</button><button onClick={onLogout} className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 transition hover:bg-red-500/20 active:scale-95">Sair</button></> : <><button onClick={() => setPage("login")} className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-black shadow-lg shadow-violet-500/20 transition hover:scale-[1.03] active:scale-95">Entrar</button><button onClick={() => setPage("pedidos")} className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-zinc-200 transition hover:bg-white/[0.08] md:block">Pedir serviço</button></>}
          </div>
        </div>
      </header>
      <nav className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-2xl -translate-x-1/2 gap-1 rounded-[1.7rem] border border-white/10 bg-black/85 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl lg:hidden">{mobileMenu.map((item) => Item(item, true))}</nav>
    </>
  );
}
