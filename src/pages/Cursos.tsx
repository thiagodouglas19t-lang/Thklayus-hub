import { useMemo, useState } from "react";
import ModalPix from "../components/ModalPix";
import { professionalCourses, type CourseContent } from "../data/courses";

const chavePix = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";
const levelLabel: Record<string, string> = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };
const categoryStyle: Record<string, string> = {
  Tecnologia: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  "Inteligência Artificial": "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Informática: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Design: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Comunicação: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Negócios: "border-violet-300/25 bg-violet-500/10 text-violet-100",
  Atendimento: "border-violet-300/25 bg-violet-500/10 text-violet-100",
};

function aulasDoCurso(course: CourseContent) { return course.modules.reduce((sum, module) => sum + module.lessons.length, 0); }
function duracaoPrincipal(course: CourseContent) { return course.duration.includes("•") ? course.duration.split("•")[0].trim() : course.duration; }
function principaisModulos(course: CourseContent) { return course.modules.slice(0, 4).map((modulo) => modulo.title.replace(/^Módulo\s*\d+\s*[—-]\s*/i, "")); }
function tagClass(course: CourseContent) { return categoryStyle[course.category] ?? "border-violet-300/25 bg-violet-500/10 text-violet-100"; }
function abrirEstudoGratis(course: CourseContent) { if (!course.free) return false; window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "estudo" })); return true; }
function promessa(course: CourseContent) {
  if (course.free) return "Modelo grátis para começar agora e testar a plataforma.";
  if (course.price.includes("1,00") || course.price.includes("4,90") || course.price.includes("5,90") || course.price.includes("7,90") || course.price.includes("9,90")) return "Material extra simples para quem quiser ir além.";
  return "Conteúdo extra guiado com explicação, prática e estrutura pronta.";
}
function areasAtuacao(course: CourseContent) {
  if (course.id === "desenvolvedor-sistemas") return "Sistemas, painéis, cadastros, relatórios e soluções digitais.";
  if (course.id === "desenvolvedor-websites") return "Sites institucionais, landing pages, páginas de venda e portfólios.";
  if (course.id === "ia-na-pratica") return "Produtividade, conteúdo, atendimento, vendas e automação com IA.";
  return course.outcome;
}

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<CourseContent | null>(null);
  const [cursoDetalhes, setCursoDetalhes] = useState<CourseContent | null>(null);
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const cursoDestaque = professionalCourses.find((course) => course.id === "canva-para-vender") ?? professionalCourses[0];
  const categorias = useMemo(() => ["Todos", "Grátis", ...Array.from(new Set(professionalCourses.map((course) => course.category)))], []);
  const cursosFiltrados = useMemo(() => { const termo = busca.toLowerCase().trim(); return professionalCourses.filter((course) => { const matchCategoria = categoria === "Todos" || (categoria === "Grátis" && course.free) || course.category === categoria; const matchBusca = !termo || `${course.id} ${course.title} ${course.subtitle} ${course.category} ${course.level}`.toLowerCase().includes(termo); return matchCategoria && matchBusca; }); }, [categoria, busca]);
  function comprarOuAcessar(course: CourseContent) { if (abrirEstudoGratis(course)) return; setCursoSelecionado(course); }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#030006] px-6 py-10 text-center shadow-2xl shadow-violet-950/30 md:px-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_85%_45%,rgba(255,255,255,0.07),transparent_26%)]" />
        <div className="relative mx-auto max-w-4xl">
          <div className="flex justify-center"><span className="rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">Biblioteca de modelos</span></div>
          <h2 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.08em] text-white md:text-7xl">Modelos prontos para copiar e adaptar.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">Encontre estruturas para apresentação, textos, organização, artes e ideias. Cursos ficam como extras secundários para quem quiser se aprofundar.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><button onClick={() => document.getElementById("modelos-lista")?.scrollIntoView({ behavior: "smooth" })} className="w-full rounded-3xl bg-white px-8 py-5 text-lg font-black text-black shadow-2xl shadow-violet-500/30 transition hover:scale-[1.03] active:scale-95 sm:w-auto">Ver modelos</button><button onClick={() => window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "gratis" }))} className="w-full rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-5 text-lg font-black text-zinc-200 transition hover:border-violet-300/35 hover:bg-violet-500/10 active:scale-95 sm:w-auto">Feed grátis</button></div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[["Copiar", "Pegue uma estrutura pronta e use como base."], ["Adaptar", "Troque tema, nome, prazo e detalhes."], ["Aprofundar", "Extras ficam disponíveis só se você quiser."]].map(([title, text]) => <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-xl shadow-black/20"><h3 className="text-2xl font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>)}
      </section>

      <section id="modelos-lista" className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]"><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar modelo, tema ou categoria..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/40" /><div className="flex gap-2 overflow-x-auto pb-1">{categorias.map((item) => <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item}</button>)}</div></div>
      </section>
      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300">Modelos e extras</p><h2 className="mt-2 text-3xl font-black text-white">Escolha uma base para começar</h2></div><p className="text-sm font-bold text-zinc-500">{cursosFiltrados.length} itens</p></div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cursosFiltrados.map((course) => (
          <article key={course.id} className="group overflow-hidden rounded-[2.3rem] border border-white/10 bg-[#07070a] shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-2 hover:border-violet-300/35 hover:shadow-violet-500/10">
            <div className="relative bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.18),transparent_35%),linear-gradient(135deg,#06020f,#0b1220)] p-5 text-white">
              <div className="absolute right-4 top-4 text-5xl opacity-90 transition duration-300 group-hover:scale-110">{course.hero}</div>
              <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${tagClass(course)}`}>{course.free ? "Grátis" : "Extra"}</p>
              <h3 className="mt-4 max-w-[82%] text-3xl font-black leading-tight">{course.title.replace("Qualificação Técnica em ", "")}</h3>
              <p className="mt-3 max-w-[88%] text-sm leading-6 text-zinc-300">{promessa(course)}</p>
            </div>
            <div className="p-5">
              <p className="text-xs font-black uppercase tracking-widest text-violet-200">Base incluída</p>
              <div className="mt-3 space-y-1 text-sm font-semibold text-white/90">{principaisModulos(course).slice(0, 4).map((item) => <p key={item}>• {item}</p>)}</div>
              <div className="mt-4 flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{levelLabel[course.level]}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{aulasDoCurso(course)} partes</span><span className="rounded-full border border-violet-300/20 px-3 py-1 text-xs font-black text-violet-200">Modelo</span>{!course.free && <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-400">Extra opcional</span>}</div>
              <p className="mt-4 text-xs font-black uppercase tracking-widest text-zinc-500">Serve para</p><p className="mt-2 text-sm leading-6 text-zinc-400">{areasAtuacao(course)}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-[0.75fr_1.25fr]"><button onClick={() => setCursoDetalhes(course)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black text-white transition active:scale-95">Ver detalhes</button><button onClick={() => comprarOuAcessar(course)} className={`rounded-2xl px-4 py-3 font-black shadow-lg transition active:scale-95 ${course.free ? "bg-violet-300 text-black shadow-violet-500/20" : "bg-white text-black shadow-white/10"}`}>{course.free ? "Abrir grátis" : "Acessar extra"}</button></div>
            </div>
          </article>
        ))}
      </div>

      {cursosFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum modelo encontrado com esse filtro.</div>}
      {cursoDetalhes && <div className="fixed inset-0 z-[80] grid place-items-end bg-black/75 p-3 backdrop-blur-sm md:place-items-center"><div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl"><div className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,0.22),transparent_32%),linear-gradient(135deg,#05010d,#0b1220)] p-6 md:p-8"><button onClick={() => setCursoDetalhes(null)} className="absolute right-4 top-4 rounded-2xl border border-white/15 bg-black/25 px-4 py-2 font-black text-white">X</button><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-100/80">Detalhes do modelo</p><h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">{cursoDetalhes.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">{cursoDetalhes.subtitle}</p><div className="mt-6 grid gap-3 sm:grid-cols-4"><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-zinc-500">Partes</p><p className="text-2xl font-black text-white">{aulasDoCurso(cursoDetalhes)}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-zinc-500">Nível</p><p className="text-2xl font-black text-white">{levelLabel[cursoDetalhes.level]}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-zinc-500">Tempo</p><p className="text-2xl font-black text-white">{duracaoPrincipal(cursoDetalhes)}</p></div><div className="rounded-2xl bg-white p-4 text-black"><p className="text-xs font-black">Tipo</p><p className="text-2xl font-black">{cursoDetalhes.free ? "Grátis" : "Extra"}</p></div></div></div><div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-7"><section><h3 className="text-2xl font-black text-white">Para que serve</h3><p className="mt-3 rounded-2xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-zinc-300">{cursoDetalhes.outcome}</p><h3 className="mt-6 text-2xl font-black text-white">Estrutura</h3><div className="mt-3 space-y-3">{cursoDetalhes.modules.map((modulo, index) => <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Parte {index + 1}</p><h4 className="mt-1 font-black text-white">{modulo.title}</h4><p className="mt-2 text-sm text-zinc-400">{modulo.lessons.length} blocos com explicação e prática</p></div>)}</div></section><aside className="space-y-4"><div className="rounded-[2rem] border border-white/10 bg-white p-5 text-black"><p className="text-xs font-black uppercase tracking-widest">Observação</p><p className="mt-3 text-sm font-black leading-6">Os extras são secundários. A área principal do app continua sendo gratuita e focada em modelos rápidos.</p></div><div className="rounded-[2rem] border border-violet-400/20 bg-violet-500/10 p-5 text-sm text-violet-100"><p className="font-black">Entrega final</p><p className="mt-2 leading-6">{cursoDetalhes.finalProject}</p></div><div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-xs font-black uppercase tracking-widest text-zinc-500">Checklist</p><div className="mt-3 space-y-2">{cursoDetalhes.checklist.map((item) => <p key={item} className="text-sm text-zinc-300">✓ {item}</p>)}</div></div><button onClick={() => { comprarOuAcessar(cursoDetalhes); setCursoDetalhes(null); }} className={`w-full rounded-2xl px-5 py-4 text-lg font-black ${cursoDetalhes.free ? "bg-violet-300 text-black" : "bg-white text-black"}`}>{cursoDetalhes.free ? "Abrir grátis" : "Acessar extra"}</button><button onClick={() => setCursoDetalhes(null)} className="w-full rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Voltar</button></aside></div></div></div>}
      <ModalPix open={Boolean(cursoSelecionado && !cursoSelecionado.free)} onClose={() => setCursoSelecionado(null)} cursoId={cursoSelecionado?.id ?? ""} titulo={cursoSelecionado?.title ?? ""} preco={cursoSelecionado?.price ?? ""} pixCode={chavePix} />
    </div>
  );
}
