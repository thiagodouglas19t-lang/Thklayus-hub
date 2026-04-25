import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";

import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import Estudo from "./pages/Estudo";
import Pedidos from "./pages/Pedidos";
import Suporte from "./pages/Suporte";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

type Page = "home" | "cursos" | "estudo" | "pedidos" | "suporte" | "admin";

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

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  function renderPage() {
    if (!user && page !== "home" && page !== "cursos") {
      return <Login onLoginSuccess={loadUser} />;
    }

    if (page === "home") return <Home />;
    if (page === "cursos") return <Cursos />;
    if (page === "estudo") return <Estudo />;
    if (page === "pedidos") return <Pedidos />;
    if (page === "suporte") return <Suporte />;
    if (page === "admin") return <Admin />;

    return <Home />;
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center">
          <h1 className="text-2xl font-black tracking-[0.25em]">THKLAYUS</h1>
          <p className="mt-2 text-sm text-zinc-500">Carregando app...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar page={page} setPage={setPage} userEmail={user?.email} onLogout={logout} />

      {user && (
        <div className="border-b border-zinc-900 bg-zinc-950 px-4 py-2 text-center text-xs text-zinc-500">
          Logado como: {user.email}
        </div>
      )}

      <section className="mx-auto max-w-6xl px-4 py-8">{renderPage()}</section>

      <button
        onClick={() =>
          window.open(
            "https://wa.me/5585992686478?text=Olá! Quero falar com o dev do THKLAYUS.",
            "_blank"
          )
        }
        className="fixed bottom-5 right-5 rounded-full bg-white px-5 py-3 text-sm font-black text-black shadow-2xl transition hover:scale-105"
      >
        WhatsApp
      </button>
    </main>
  );
}
