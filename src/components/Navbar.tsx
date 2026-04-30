import { appConfig } from "../config/appConfig";
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
  | "pagamento"
  | "login";

type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
  userEmail?: string | null;
  onLogout?: () => void;
};

type ConfigNavItem = {
  id: string;
  label: string;
  icon: string;
};

function AppLogo() {
  return (
    <img
      src="/logo-aprendaja.svg"
      alt="AprendaJá"
      className="h-11 w-11 rounded-2xl"
    />
  );
}

function toPage(id: string): Page {
  return id as Page;
}

export default function Navbar({ page, setPage, userEmail, onLogout }: NavbarProps) {
  const internal = canAccessInternalPanel(userEmail);
  const role = getUserRole(userEmail);

  const navItems = appConfig.bottomNav.items.filter((item: ConfigNavItem) => {
    if (item.id === "admin") {
      return appConfig.admin.enabled && appConfig.bottomNav.showAdminTab && internal;
    }

    return true;
  });

  function isActive(item: ConfigNavItem) {
    return page === item.id || (item.id === "chat" && page === "suporte");
  }

  function goTo(item: ConfigNavItem) {
    setPage(toPage(item.id));
  }

  function Item(item: ConfigNavItem, mobile = false) {
    const active = isActive(item);
    const isAdmin = item.id === "admin";

    if (mobile) {
      return (
        <button
          key={`${item.id}-mobile`}
          onClick={() => goTo(item)}
          className={`flex flex-1 flex-col items-center justify-center rounded-2xl px-1 py-2 text-[10px] font-black transition active:scale-95 ${
            active
              ? "bg-white text-black shadow-lg shadow-violet-500/20"
              : isAdmin
                ? "text-violet-200"
                : "text-zinc-500"
          }`}
        >
          <span className="text-base leading-none">{item.icon}</span>
          <span className="mt-1">{item.label}</span>
        </button>
      );
    }

    return (
      <button
        key={`${item.id}-desktop`}
        onClick={() => goTo(item)}
        className={`group whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${
          active
            ? "bg-white text-black shadow-[0_0_28px_rgba(124,58,237,0.22)]"
            : isAdmin
              ? "border border-violet-400/25 bg-violet-500/10 text-violet-100 hover:border-violet-300/50 hover:bg-violet-500/15"
              : "border border-white/10 bg-white/[0.04] text-zinc-300 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={
              active
                ? "text-black"
                : isAdmin
                  ? "text-violet-200"
                  : "text-violet-300 group-hover:text-violet-200"
            }
          >
            {item.icon}
          </span>
          {item.label}
        </span>
      </button>
    );
  }

  if (!appConfig.header.enabled) {
    return null;
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.10),transparent_30%)]" />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          {appConfig.header.showBrand && (
            <button
              onClick={() => setPage("home")}
              className="flex items-center gap-3 text-left active:scale-95"
            >
              <AppLogo />

              <div>
                <h1 className="bg-gradient-to-r from-white via-violet-100 to-violet-300 bg-clip-text text-xl font-black tracking-[0.08em] text-transparent md:text-2xl">
                  {appConfig.brand.company}
                </h1>

                {appConfig.header.showSubtitle && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    {appConfig.brand.subtitle}
                  </p>
                )}
              </div>
            </button>
          )}

          {appConfig.bottomNav.enabled && (
            <nav className="hidden max-w-[860px] gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-1.5 shadow-2xl shadow-black/50 lg:flex">
              {navItems.map((item) => Item(item))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {userEmail ? (
              <>
                {appConfig.header.showLoggedEmailBar && (
                  <button
                    onClick={() => setPage(internal ? "admin" : "perfil")}
                    className={`hidden max-w-48 truncate rounded-2xl border px-4 py-2 text-xs font-bold md:block ${
                      internal
                        ? "border-violet-400/20 bg-violet-500/10 text-violet-100"
                        : "border-white/10 bg-white/[0.04] text-zinc-400"
                    }`}
                  >
                    {internal
                      ? `${role === "dev" ? "Dono" : "ADM"} • ${userEmail}`
                      : `${appConfig.header.loggedEmailLabel}: ${userEmail}`}
                  </button>
                )}

                {appConfig.header.showLogout && (
                  <button
                    onClick={onLogout}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-zinc-200 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-100 active:scale-95"
                  >
                    {appConfig.header.logoutLabel}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => setPage("login")}
                  className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-black shadow-lg shadow-violet-500/20 transition hover:scale-[1.03] active:scale-95"
                >
                  Entrar
                </button>

                <button
                  onClick={() => setPage("gratis")}
                  className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-zinc-200 transition hover:bg-white/[0.08] md:block"
                >
                  Explorar grátis
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {appConfig.bottomNav.enabled && (
        <nav className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-24px)] max-w-2xl -translate-x-1/2 gap-1 rounded-[1.7rem] border border-white/10 bg-black/85 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl lg:hidden">
          {navItems.map((item) => Item(item, true))}
        </nav>
      )}
    </>
  );
}
