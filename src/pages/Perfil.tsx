import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Thread = { id: string; type: string; title: string; status: string; created_at?: string };

export default function Perfil() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { carregar(); }, []);

  async function carregar() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setLoading(false); return; }
    setEmail(userData.user.email ?? "");
    const { data } = await supabase.from("chat_threads").select("id,type,title,status,created_at").eq("user_id", userData.user.id).order("created_at", { ascending: false });
    setItems((data ?? []) as Thread[]);
    setLoading(false);
  }

  const compras = items.filter(i => i.type === "purchase").length;
  const pedidos = items.filter(i => i.type === "order").length;
  const tickets = items.filter(i => i.type === "ticket").length;
  const ativos = items.filter(i => !["fechado", "pedido finalizado", "compra finalizada", "compra recusada"].includes(i.status)).length;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.22),transparent_35%),#050505] p-6 md:p-8">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-200">Meu painel</span>
        <h2 className="mt-5 text-4xl font-black md:text-5xl">Perfil</h2>
        <p className="mt-2 max-w-2xl text-zinc-400">Acompanhe suas compras, pedidos, tickets e histórico dentro do THKLAYUS.</p>
        <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">{email || "Usuário"}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-5"><p className="text-3xl font-black">{compras}</p><p className="text-sm text-zinc-500">Compras</p></div>
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-5"><p className="text-3xl font-black">{pedidos}</p><p className="text-sm text-zinc-500">Pedidos</p></div>
        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-5"><p className="text-3xl font-black">{tickets}</p><p className="text-sm text-zinc-500">Tickets</p></div>
        <div className="rounded-3xl border border-emerald-900 bg-emerald-950/20 p-5"><p className="text-3xl font-black">{ativos}</p><p className="text-sm text-emerald-200">Em andamento</p></div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-black">Histórico</h3>
          <button onClick={carregar} className="rounded-xl border border-white/10 px-4 py-2 text-sm font-black text-zinc-300">Atualizar</button>
        </div>
        <div className="mt-5 space-y-3">
          {loading ? <p className="text-zinc-500">Carregando...</p> : items.length === 0 ? <p className="text-zinc-500">Nenhum histórico ainda.</p> : items.map(item => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black p-4">
              <p className="text-xs font-black uppercase text-zinc-500">{item.type}</p>
              <p className="mt-1 font-black">{item.title}</p>
              <p className="mt-2 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{item.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
