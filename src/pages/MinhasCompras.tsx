import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Compra = {
  id: string;
  type: "purchase" | "order" | "ticket";
  title: string;
  status: string;
  course_id?: string | null;
  course_title?: string | null;
  price?: string | null;
  total_price?: string | null;
  created_at?: string;
};

function normalize(value?: string | null) {
  return String(value ?? "").toLowerCase().trim();
}

function statusInfo(status: string) {
  const value = normalize(status);

  if (["compra aprovada", "compra finalizada", "pedido finalizado", "entregue"].includes(value)) {
    return {
      label: "Liberado",
      text: "Pagamento confirmado. Se for curso, o acesso já deve aparecer na Área de Estudo.",
      className: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    };
  }

  if (["compra recusada", "recusado"].includes(value)) {
    return {
      label: "Recusado",
      text: "O pagamento não foi confirmado. Fale com o suporte para revisar.",
      className: "border-red-400/20 bg-red-500/10 text-red-100",
    };
  }

  if (["em análise", "pendente", "aberto"].includes(value)) {
    return {
      label: "Em análise",
      text: "Aguardando o ADM conferir o comprovante e confirmar o Pix.",
      className: "border-amber-400/20 bg-amber-500/10 text-amber-100",
    };
  }

  return {
    label: status || "Pendente",
    text: "Acompanhe pelo chat ou fale com o suporte.",
    className: "border-blue-400/20 bg-blue-500/10 text-blue-100",
  };
}

function formatDate(value?: string) {
  if (!value) return "Sem data";

  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Sem data";
  }
}

export default function MinhasCompras() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    setErro("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setLoading(false);
      setErro("Entre na sua conta para ver suas compras.");
      return;
    }

    const { data, error } = await supabase
      .from("chat_threads")
      .select("id,type,title,status,course_id,course_title,price,total_price,created_at")
      .eq("user_id", userData.user.id)
      .in("type", ["purchase", "order"])
      .order("created_at", { ascending: false });

    if (error) {
      setErro("Erro ao carregar compras: " + error.message);
      setLoading(false);
      return;
    }

    setCompras((data ?? []) as Compra[]);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-300">Cliente</p>
        <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Minhas compras</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Acompanhe suas compras, pedidos e liberações. Quando o ADM aprovar o Pix, o curso aparece como liberado.
        </p>
        <button onClick={carregar} className="mt-5 rounded-2xl bg-white px-5 py-3 font-black text-black transition active:scale-95">
          Atualizar status
        </button>
      </section>

      {erro && <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-100">{erro}</div>}
      {loading && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-zinc-400">Carregando suas compras...</div>}

      {!loading && compras.length === 0 && (
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 text-center backdrop-blur-xl">
          <p className="text-5xl">◈</p>
          <h2 className="mt-4 text-2xl font-black text-white">Nenhuma compra ainda</h2>
          <p className="mt-2 text-zinc-400">Quando você registrar uma compra ou pedido, ele aparece aqui.</p>
        </section>
      )}

      <section className="grid gap-4">
        {compras.map((compra) => {
          const info = statusInfo(compra.status);
          const valor = compra.total_price || compra.price || "A combinar";

          return (
            <article key={compra.id} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/25 backdrop-blur-xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                    {compra.type === "purchase" ? "Compra" : "Pedido"} • {formatDate(compra.created_at)}
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">{compra.course_title || compra.title}</h2>
                  <p className="mt-1 text-sm text-zinc-400">Valor: <span className="font-bold text-blue-200">{valor}</span></p>
                  <p className="mt-1 text-xs text-zinc-600">ID: {compra.id}</p>
                </div>

                <div className={`rounded-2xl border px-4 py-3 text-sm font-black ${info.className}`}>
                  {info.label}
                </div>
              </div>

              <p className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm text-zinc-300">{info.text}</p>

              {normalize(compra.status) === "em análise" && (
                <p className="mt-3 text-xs text-zinc-500">
                  Dica: envie o comprovante no WhatsApp com esse ID para o ADM achar sua compra mais rápido.
                </p>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}
