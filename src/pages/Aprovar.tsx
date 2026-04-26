import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Compra = {
  id: string;
  produto_id: string | null;
  status: string;
  created_at: string;
};

export default function Aprovar() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [aproving, setAproving] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("compras")
      .select("id, produto_id, status, created_at")
      .eq("status", "pendente")
      .order("created_at", { ascending: false })
      .limit(20);

    setCompras(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function aprovar(id: string) {
    try {
      setAproving(id);

      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/aprovar-compra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ compra_id: id }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Erro ao aprovar");

      await load();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setAproving(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-black text-white">Aprovar Compras</h1>

      {loading ? (
        <p className="text-zinc-400 mt-4">Carregando...</p>
      ) : compras.length === 0 ? (
        <p className="text-zinc-400 mt-4">Nenhuma compra pendente.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {compras.map((c) => (
            <div key={c.id} className="rounded-2xl border border-white/10 p-4">
              <p className="text-sm text-zinc-400">Produto: {c.produto_id}</p>
              <p className="text-xs text-zinc-500">ID: {c.id}</p>

              <button
                onClick={() => aprovar(c.id)}
                disabled={aproving === c.id}
                className="mt-3 rounded-xl bg-green-500 px-4 py-2 font-black text-black"
              >
                {aproving === c.id ? "Aprovando..." : "Aprovar"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
