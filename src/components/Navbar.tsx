type Page =
  | "home"
  | "cursos"
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

export default function Navbar({
  page,
  setPage,
  userEmail,
  onLogout,
}: NavbarProps) {
  function Item(label: string, value: Page) {
    return (
      <button
        onClick={() => setPage(value)}
        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${
          page === value
            ? "bg-white text-black"
            : "border border-zinc-800 bg-zinc-950 text-zinc-300"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/90 px-4 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <button onClick={() => setPage("home")} className="text-left">
          <h1 className="text-xl font-black tracking-[0.25em]">THKLAYUS</h1>
          <p className="text-xs text-zinc-500">Cursos • Pedidos • Suporte</p>
        </button>

        <nav className="flex gap-2 overflow-x-auto">
          {Item("Home", "home")}
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
              <span className="text-xs text-zinc-500">{userEmail}</span>
              <button
                onClick={onLogout}
                className="rounded-full border border-zinc-800 px-4 py-2 text-sm font-bold text-zinc-300"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => setPage("pedidos")}
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-black"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
