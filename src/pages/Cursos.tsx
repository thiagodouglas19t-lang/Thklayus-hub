import { useMemo, useState } from "react";
import ModalPix from "../components/ModalPix";
import { professionalCourses, type CourseContent } from "../data/courses";

const chavePix = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";
const levelLabel: Record<string, string> = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };
const categoryStyle: Record<string, string> = {
  Tecnologia: "border-cyan-300/30 bg-cyan-500/10 text-cyan-100",
  "Inteligência Artificial": "border-violet-300/30 bg-violet-500/10 text-violet-100",
  Informática: "border-blue-300/30 bg-blue-500/10 text-blue-100",
  Design: "border-pink-300/30 bg-pink-500/10 text-pink-100",
  Comunicação: "border-amber-300/30 bg-amber-500/10 text-amber-100",
  Negócios: "border-emerald-300/30 bg-emerald-500/10 text-emerald-100",
  Atendimento: "border-sky-300/30 bg-sky-500/10 text-sky-100",
};

function aulasDoCurso(course: CourseContent) { return course.modules.reduce((sum, module) => sum + module.lessons.length, 0); }
function duracaoPrincipal(course: CourseContent) { return course.duration.includes("•") ? course.duration.split("•")[0].trim() : course.duration; }
function principaisModulos(course: CourseContent) { return course.modules.slice(0, 6).map((modulo) => modulo.title.replace(/^Módulo\s*\d+\s*[—-]\s*/i, "")); }
function tagClass(course: CourseContent) { return categoryStyle[course.category] ?? "border-white/10 bg-white/[0.04] text-zinc-300"; }
function abrirEstudoGratis(course: CourseContent) { if (!course.free) return false; window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "estudo" })); return true; }
function promessa(course: CourseContent) {
  if (course.free) return "Comece grátis, conheça a plataforma e estude no seu ritmo.";
  if (course.price.includes("1,00") || course.price.includes("4,90") || course.price.includes("5,90") || course.price.includes("7,90") || course.price.includes("9,90")) return "Curso barato, direto e com entrega prática para começar sem medo.";
  return "Curso livre guiado com explicação, prática, projeto final e certificado de conclusão.";
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
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050507] p-6 shadow-2xl shadow-black/50 md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.24),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(124,58,237,0.18),transparent_36%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="rounded-full border border-emerald-300/25 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">Curso livre guiado</span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">Aprenda sozinho pelo celular, com aula completa e prática real.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">Sem promessa falsa, sem professor particular e sem enrolação. Cada curso tem explicação, exemplos, passo a passo, erros comuns, exercício, projeto final e Certificado de Conclusão — Curso Livre.</p>
            <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => comprarOuAcessar(cursoDestaque)} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-emerald-500/20 transition hover:scale-[1.03] active:scale-95">Ver curso destaque</button><button onClick={() => setCursoDetalhes(cursoDestaque)} className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 font-black text-white transition hover:border-emerald-300/40">O que recebe</button></div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-emerald-300/20 bg-emerald-950/30 shadow-2xl shadow-emerald-500/10">
            <div className="relative p-5"><div className="absolute right-5 top-5 text-6xl">{cursoDestaque.hero}</div><p className="inline-flex rounded-full border border-emerald-200/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-emerald-100">Mais vendável</p><h3 className="mt-5 max-w-[78%] text-3xl font-black leading-tight text-white">{cursoDestaque.title}</h3><p className="mt-4 text-sm leading-6 text-emerald-50/75">{cursoDestaque.subtitle}</p></div>
            <div className="grid grid-cols-[1fr_130px] gap-4 border-t border-white/10 p-5"><div><p className="text-xs font-black uppercase tracking-widest text-emerald-200">Projeto final</p><p className="mt-2 text-sm leading-6 text-white/85">{cursoDestaque.finalProject}</p></div><div className="rounded-[1.4rem] bg-white p-4 text-center text-emerald-950"><p className="text-xs font-black uppercase">Preço</p><p className="mt-2 text-2xl font-black">{cursoDestaque.price}</p></div></div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-blue-300/20 bg-blue-500/5 p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Transparência</p>
        <h3 className="mt-2 text-2xl font-black text-white">O que você compra aqui</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="font-black text-emerald-200">Você recebe</p><p className="mt-2 text-sm leading-6 text-zinc-300">Curso livre guiado, aulas completas em texto, exemplos, atividades, projeto final, material e certificado ao concluir 100%.</p></div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="font-black text-amber-200">Não prometemos</p><p className="mt-2 text-sm leading-6 text-zinc-300">Diploma técnico, reconhecimento oficial regulamentado, professor particular, emprego garantido ou resultado impossível.</p></div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">{[["Aula completa", "Explicação, exemplo, passo a passo e erros."], ["Prática real", "Toda aula gera uma pequena entrega."], ["Projeto final", "Cada curso termina com uma entrega concreta."], ["Certificado livre", "Liberado só com 100% das aulas concluídas."]].map(([title, text]) => <div key={title} className="rounded-3xl border border-white/10 bg-black/35 p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>)}</section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl"><div className="grid gap-3 lg:grid-cols-[1fr_auto]"><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, categoria ou ID do curso..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-blue-300/40" /><div className="flex gap-2 overflow-x-auto">{categorias.map((item) => <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item}</button>)}</div></div></section>
      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Catálogo AprendaJá</p><h2 className="mt-2 text-3xl font-black text-white">Escolha seu próximo curso</h2></div><p className="text-sm font-bold text-zinc-500">{cursosFiltrados.length} encontrados</p></div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cursosFiltrados.map((course) => (
          <article key={course.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-2 hover:border-emerald-300/35 hover:shadow-emerald-500/10">
            <div className="relative bg-[radial-gradient(circle_at_20%_0%,rgba(34,197,94,0.16),transparent_35%),linear-gradient(135deg,#020617,#061827)] p-5 text-white">
              <div className="absolute right-4 top-4 text-5xl opacity-90 transition duration-300 group-hover:scale-110">{course.hero}</div>
              <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${tagClass(course)}`}>{course.free ? "Comece grátis" : course.category}</p>
              <h3 className="mt-4 max-w-[82%] text-3xl font-black leading-tight">{course.title.replace("Qualificação Técnica em ", "")}</h3>
              <p className="mt-3 max-w-[88%] text-sm leading-6 text-zinc-300">{promessa(course)}</p>
            </div>
            <div className="grid grid-cols-[1fr_118px] gap-4 p-5">
              <div><p className="text-xs font-black uppercase tracking-widest text-emerald-200">Inclui</p><div className="mt-3 space-y-1 text-sm font-semibold text-white/90">{principaisModulos(course).slice(0, 4).map((item) => <p key={item}>• {item}</p>)}</div></div>
              <div className="overflow-hidden rounded-[1.3rem] bg-white text-center text-black"><div className="bg-black px-2 py-2 text-xs font-black uppercase tracking-widest text-white">Valor</div><div className="p-3"><p className="text-xl font-black leading-none">{course.price}</p><p className="mt-2 text-[11px] font-black text-zinc-600">{duracaoPrincipal(course)}</p></div></div>
            </div>
            <div className="border-t border-white/10 p-5">
              <div className="flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{levelLabel[course.level]}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{aulasDoCurso(course)} aulas</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">Projeto final</span><span className="rounded-full border border-blue-300/20 px-3 py-1 text-xs font-black text-blue-200">Curso livre</span></div>
              <p className="mt-4 text-xs font-black uppercase tracking-widest text-zinc-500">Resultado</p><p className="mt-2 text-sm leading-6 text-zinc-400">{areasAtuacao(course)}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[0.75fr_1.25fr]"><button onClick={() => setCursoDetalhes(course)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black text-white transition active:scale-95">Ver detalhes</button><button onClick={() => comprarOuAcessar(course)} className={`rounded-2xl px-4 py-3 font-black shadow-lg transition active:scale-95 ${course.free ? "bg-emerald-400 text-black shadow-emerald-500/20" : "bg-white text-black shadow-white/10"}`}>{course.free ? "Começar grátis" : "Garantir acesso"}</button></div>
            </div>
          </article>
        ))}
      </div>

      {cursosFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum curso encontrado com esse filtro.</div>}
      {cursoDetalhes && <div className="fixed inset-0 z-[80] grid place-items-end bg-black/75 p-3 backdrop-blur-sm md:place-items-center"><div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl"><div className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_0%,rgba(34,197,94,0.22),transparent_32%),linear-gradient(135deg,#020617,#061827)] p-6 md:p-8"><button onClick={() => setCursoDetalhes(null)} className="absolute right-4 top-4 rounded-2xl border border-white/15 bg-black/25 px-4 py-2 font-black text-white">X</button><p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-100/80">Detalhes do curso livre</p><h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">{cursoDetalhes.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">{cursoDetalhes.subtitle}</p><div className="mt-6 grid gap-3 sm:grid-cols-4"><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-zinc-500">Aulas</p><p className="text-2xl font-black text-white">{aulasDoCurso(cursoDetalhes)}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-zinc-500">Nível</p><p className="text-2xl font-black text-white">{levelLabel[cursoDetalhes.level]}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-zinc-500">Duração</p><p className="text-2xl font-black text-white">{duracaoPrincipal(cursoDetalhes)}</p></div><div className="rounded-2xl bg-white p-4 text-black"><p className="text-xs font-black">Investimento</p><p className="text-2xl font-black">{cursoDetalhes.price}</p></div></div></div><div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-7"><section><h3 className="text-2xl font-black text-white">O que você aprende</h3><p className="mt-3 rounded-2xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-zinc-300">{cursoDetalhes.outcome}</p><h3 className="mt-6 text-2xl font-black text-white">Grade curricular</h3><div className="mt-3 space-y-3">{cursoDetalhes.modules.map((modulo, index) => <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Módulo {index + 1}</p><h4 className="mt-1 font-black text-white">{modulo.title}</h4><p className="mt-2 text-sm text-zinc-400">{modulo.lessons.length} aulas com explicação e prática</p></div>)}</div></section><aside className="space-y-4"><div className="rounded-[2rem] border border-white/10 bg-white p-5 text-black"><p className="text-xs font-black uppercase tracking-widest">Transparência</p><p className="mt-3 text-sm font-black leading-6">Curso livre guiado. Não é diploma técnico, não possui reconhecimento oficial regulamentado e não inclui professor particular.</p></div><div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-5 text-sm text-amber-100"><p className="font-black">Projeto final</p><p className="mt-2 leading-6">{cursoDetalhes.finalProject}</p></div><div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-xs font-black uppercase tracking-widest text-zinc-500">Checklist profissional</p><div className="mt-3 space-y-2">{cursoDetalhes.checklist.map((item) => <p key={item} className="text-sm text-zinc-300">✓ {item}</p>)}</div></div><button onClick={() => { comprarOuAcessar(cursoDetalhes); setCursoDetalhes(null); }} className={`w-full rounded-2xl px-5 py-4 text-lg font-black ${cursoDetalhes.free ? "bg-emerald-400 text-black" : "bg-white text-black"}`}>{cursoDetalhes.free ? "Começar grátis" : "Garantir acesso"}</button><button onClick={() => setCursoDetalhes(null)} className="w-full rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Voltar ao catálogo</button></aside></div></div></div>}
      <ModalPix open={Boolean(cursoSelecionado && !cursoSelecionado.free)} onClose={() => setCursoSelecionado(null)} cursoId={cursoSelecionado?.id ?? ""} titulo={cursoSelecionado?.title ?? ""} preco={cursoSelecionado?.price ?? ""} pixCode={chavePix} />
    </div>
  );
}
