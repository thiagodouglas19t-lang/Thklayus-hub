import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { professionalCourses } from "../data/courses";

type Compra = {
  id: string;
  course_id?: string | null;
  course_title?: string | null;
  status: string;
};

type AcessoManual = {
  id: string;
  produto_id: string;
  course_title?: string | null;
};

type Kit = (typeof professionalCourses)[number];
type View = "catalog" | "kit";

function normalize(text?: string | null) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function buildKitItems(kit: Kit) {
  const fromLessons = kit.modules.flatMap((modulo) =>
    modulo.lessons.slice(0, 2).map((lesson) => ({
      title: lesson.title,
      text: lesson.summary,
      action: lesson.practice,
    }))
  );

  return [
    ...fromLessons,
    ...kit.checklist.slice(0, 4).map((item) => ({
      title: item,
      text: `Use isso como checklist rápido para: ${kit.title}.`,
      action: item,
    })),
  ].slice(0, 8);
}

export default function Estudo() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [acessosManuais, setAcessosManuais] = useState<AcessoManual[]>([]);
  const [selecionado, setSelecionado] = useState<Kit>(professionalCourses[0]);
  const [view, setView] = useState<View>("catalog");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [copied, setCopied] = useState<string | null>(null);

  const liberadas = useMemo(
    () => compras.filter((item) => normalize(item.status) === "compra aprovada"),
    [compras]
  );

  const manualKeys = useMemo(
    () => new Set(acessosManuais.flatMap((item) => [normalize(item.produto_id), normalize(item.course_title)]).filter(Boolean)),
    [acessosManuais]
  );

  const categorias = useMemo(
    () => ["Todos", "Disponíveis", "Extras", ...Array.from(new Set(professionalCourses.map((kit) => kit.category)))],
    []
  );

  function temAcesso(id: string, title: string, free?: boolean) {
    if (free) return true;
    const normalizedId = normalize(id);
    const normalizedTitle = normalize(title);
    if (manualKeys.has(normalizedId) || manualKeys.has(normalizedTitle)) return true;
    return liberadas.some((compra) => normalize(compra.course_id) === normalizedId || normalize(compra.course_title) === normalizedTitle);
  }

  function accessLabel(kit: Kit) {
    if (kit.free) return "Grátis";
    return temAcesso(kit.id, kit.title, kit.free) ? "Disponível" : "Extra";
  }

  const kitsOrdenados = useMemo(
    () => [...professionalCourses].sort((a, b) => Number(temAcesso(b.id, b.title, b.free)) - Number(temAcesso(a.id, a.title, a.free))),
    [liberadas, manualKeys]
  );

  const kitsFiltrados = useMemo(() => {
    const busca = normalize(query);
    return kitsOrdenados.filter((kit) => {
      const acesso = temAcesso(kit.id, kit.title, kit.free);
      const combinaCategoria =
        categoria === "Todos" ||
        (categoria === "Disponíveis" && acesso) ||
        (categoria === "Extras" && !acesso) ||
        kit.category === categoria;
      const combinaBusca = !busca || normalize(`${kit.id} ${kit.title} ${kit.subtitle} ${kit.category}`).includes(busca);
      return combinaCategoria && combinaBusca;
    });
  }, [categoria, query, kitsOrdenados]);

  const totalDisponiveis = kitsOrdenados.filter((kit) => temAcesso(kit.id, kit.title, kit.free)).length;
  const totalExtras = kitsOrdenados.length - totalDisponiveis;

  useEffect(() => {
    carregarAcessos();
  }, []);

  async function carregarAcessos() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setLoading(false);
      return;
    }

    const { data: comprasData } = await supabase
      .from("chat_threads")
      .select("id,course_id,course_title,status")
      .eq("user_id", userData.user.id)
      .eq("type", "purchase");

    const { data: acessosData } = await supabase
      .from("acessos_cursos")
      .select("id,produto_id,course_title")
      .eq("user_id", userData.user.id);

    setCompras((comprasData ?? []) as Compra[]);
    setAcessosManuais((acessosData ?? []) as AcessoManual[]);
    setLoading(false);
  }

  function abrirKit(kit: Kit) {
    if (!temAcesso(kit.id, kit.title, kit.free)) {
      alert("Esse kit é um extra. Peça liberação pelo suporte/pedidos.");
      return;
    }

    setSelecionado(kit);
    setView("kit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1600);
  }

  function baixarKit() {
    const items = buildKitItems(selecionado);
    const texto = `${selecionado.title}\n\n${selecionado.subtitle}\n\nO que vem nesse kit:\n${items
      .map((item, index) => `${index + 1}. ${item.title}\n${item.text}\n\nModelo/ação:\n${item.action}`)
      .join("\n\n---\n\n")}\n\nChecklist rápido:\n${selecionado.checklist.map((item) => `- ${item}`).join("\n")}\n\nAprendaJá — modelos prontos para tarefas rápidas.`;

    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selecionado.id}-kit-aprendaja.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-2xl font-black text-white">Carregando modelos...</p>
        <p className="mt-2 text-sm text-zinc-500">Verificando os kits disponíveis na sua conta.</p>
      </div>
    );
  }

  if (view === "kit") {
    const items = buildKitItems(selecionado);

    return (
      <div className="space-y-5 pb-28">
        <button onClick={() => setView("catalog")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black text-zinc-200">
          ← Voltar para modelos
        </button>

        <section className="relative overflow-hidden rounded-[2.7rem] border border-violet-300/15 bg-[#030006] p-6 shadow-2xl shadow-violet-950/25 md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(168,85,247,0.28),transparent_32%),radial-gradient(circle_at_90%_30%,rgba(255,255,255,0.06),transparent_28%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Kit pronto</span>
              <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-[-0.07em] text-white md:text-6xl">{selecionado.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-300">{selecionado.subtitle}</p>
            </div>
            <div className="text-7xl">{selecionado.hero}</div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          <button onClick={baixarKit} className="rounded-2xl bg-white px-5 py-4 font-black text-black">Baixar kit</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "resolver" }))} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-black text-white">Resolver com base</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "pedidos" }))} className="rounded-2xl border border-violet-300/20 bg-violet-500/10 px-5 py-4 font-black text-violet-100">Pedir pronto</button>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          {items.map((item, index) => {
            const content = `${item.title}\n\n${item.text}\n\n${item.action}`;
            const id = `${selecionado.id}-${index}`;
            return (
              <article key={id} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Modelo {index + 1}</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/50 p-4 text-sm leading-7 text-zinc-300">
                  {item.action}
                </div>
                <button onClick={() => copyText(id, content)} className="mt-4 w-full rounded-2xl bg-white px-5 py-3 font-black text-black">
                  {copied === id ? "Copiado!" : "Copiar modelo"}
                </button>
              </article>
            );
          })}
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] px-6 py-10 shadow-2xl shadow-violet-950/25 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_0%,rgba(168,85,247,0.32),transparent_34%),radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.20),transparent_30%),radial-gradient(circle_at_90%_50%,rgba(255,255,255,0.06),transparent_26%)]" />
        <div className="relative max-w-4xl">
          <span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Biblioteca rápida</span>
          <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">Modelos e kits para usar sem começar do zero.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300">Nada de curso. Aqui ficam bases prontas para currículo, apresentação, mensagem, organização, venda e tarefas rápidas.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-500">Disponíveis</p><p className="mt-1 text-3xl font-black text-white">{totalDisponiveis}</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-500">Extras</p><p className="mt-1 text-3xl font-black text-white">{totalExtras}</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><p className="text-sm text-zinc-500">Total</p><p className="mt-1 text-3xl font-black text-white">{professionalCourses.length}</p></div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar modelo, kit ou categoria..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/40" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categorias.map((item) => (
              <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400"}`}>{item}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kitsFiltrados.map((kit) => {
          const acesso = temAcesso(kit.id, kit.title, kit.free);
          const totalItems = buildKitItems(kit).length;
          return (
            <article key={kit.id} className="group overflow-hidden rounded-[2.1rem] border border-white/10 bg-[#07070a] shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-1 hover:border-violet-300/35">
              <div className="relative min-h-[210px] bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.18),transparent_35%),linear-gradient(135deg,#06020f,#0b1220)] p-5">
                <div className="absolute right-4 top-4 text-5xl opacity-90">{kit.hero}</div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${acesso ? "bg-violet-300 text-black" : "bg-white/10 text-zinc-400"}`}>{accessLabel(kit)}</span>
                <h2 className="mt-5 max-w-[82%] text-2xl font-black leading-tight text-white">{kit.title}</h2>
                <p className="mt-3 max-w-[92%] text-sm leading-6 text-zinc-400">{kit.subtitle}</p>
              </div>
              <div className="p-5">
                <p className="text-xs font-bold text-zinc-500">{totalItems} modelos prontos • {kit.category}</p>
                <button onClick={() => abrirKit(kit)} className={`mt-5 w-full rounded-2xl px-5 py-4 font-black transition active:scale-95 ${acesso ? "bg-white text-black" : "border border-white/10 text-zinc-500"}`}>{acesso ? "Usar kit" : "Pedir liberação"}</button>
              </div>
            </article>
          );
        })}
      </section>

      {kitsFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum modelo encontrado.</div>}
    </div>
  );
}
