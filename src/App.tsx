import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import { canAccessInternalPanel } from "./lib/roles";

import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import Gratis from "./pages/Gratis";
import Estudo from "./pages/EstudoComAcesso";
import Pedidos from "./pages/Pedidos";
import Suporte from "./pages/Suporte";
import Admin from "./pages/Admin";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Resolver from "./pages/Resolver";
import Perfil from "./pages/Perfil";
import Sobre from "./pages/Sobre";
import Pagamento from "./pages/Pagamento";
import Livros from "./pages/Livros";
import Navbar from "./components/Navbar";

export type Page = "home" | "cursos" | "gratis" | "livros" | "estudo" | "pedidos" | "suporte" | "chat" | "admin" | "resolver" | "perfil" | "sobre" | "pagamento";

const validPages: Page[] = ["home", "cursos", "gratis", "livros", "estudo", "pedidos", "suporte", "chat", "admin", "resolver", "perfil", "sobre", "pagamento"];

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setPage("home");
  }

  useEffect(() => {
    loadUser();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function openPage(event: Event) {
      const customEvent = event as CustomEvent<Page>;
      const nextPage = customEvent.detail;
      if (validPages.includes(nextPage)) setPage(nextPage);
    }

    window.addEventListener("thklayus-open-page", openPage);
    return () => window.removeEventListener("thklayus-open-page", openPage);
  }, []);

  function renderPage() {
    const publicPages: Page[] = ["home", "cursos", "gratis", "livros", "resolver", "sobre", "pagamento"];

    if (!user && !publicPages.includes(page)) return <Login onLoginSuccess={loadUser} />;
    if (page === "admin" && !canAccessInternalPanel(user?.email)) return <Home setPage={setPage} />;
    if (page === "home") return <Home setPage={setPage} />;
    if (page === "cursos") return <Cursos />;
    if (page === "gratis") return <Gratis />;
    if (page === "livros") return <Livros />;
    if (page === "resolver") return <Resolver />;
    if (page === "perfil") return <Perfil />;
    if (page === "sobre") return <Sobre />;
    if (page === "pagamento") return <Pagamento />;
    if (page === "estudo") return <Estudo />;
    if (page === "pedidos") return <Pedidos />;
    if (page === "suporte") return <Suporte />;
    if (page === "chat") return <Chat />;
    if (page === "admin") return <Admin />;
    return <Home setPage={setPage} />;
  }

  if (loading) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(124,58,237,0.28),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.18),transparent_35%)]" />
        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-blue-500/10 backdrop-blur-2xl">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-violet-600 via-blue-500 to-sky-300 text-sm font-black tracking-[-0.08em] shadow-lg shadow-blue-500/30">THK</div>
          <h1 className="mt-5 bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-3xl font-black tracking-[0.16em] text-transparent">AprendaJá</h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">THKLAYUS • Carregando app...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(124,58,237,0.20),transparent_32%),radial-gradient(circle_at_90%_15%,rgba(56,189,248,0.16),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_18%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-10">
        <Navbar page={page} setPage={setPage} userEmail={user?.email} onLogout={logout} />

        {user && (
          <div className="border-b border-white/10 bg-black/45 px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-500 backdrop-blur-xl">
            Logado como: <span className="normal-case tracking-normal text-zinc-300">{user.email}</span>
          </div>
        )}

        <section className="mx-auto max-w-7xl px-4 pb-28 pt-6 md:px-6 md:pb-10 md:pt-8">{renderPage()}</section>
      </div>
    </main>
  );
}
