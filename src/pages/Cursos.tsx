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

function aulasDoCurso(course: CourseContent) {
  return course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
}

function cargaHoraria(course: CourseContent) {
  const match = course.duration.match(/(\d+)h/);
  return match ? `${match[1]} horas` : course.duration.includes("meses") ? course.duration : course.duration;
}

function duracaoPrincipal(course: CourseContent) {
  if (course.duration.includes("•")) return course.duration.split("•")[0].trim();
  return course.duration;
}

function principaisModulos(course: CourseContent) {
  return course.modules.slice(0, 6).map((modulo) => modulo.title.replace(/^Módulo\s*\d+\s*[—-]\s*/i, ""));
}

function areasAtuacao(course: CourseContent) {
  if (course.id === "desenvolvedor-sistemas") return "Sistemas de gestão, cadastros internos, painéis administrativos, controle de pedidos, relatórios e soluções digitais para pequenos negócios.";
  if (course.id === "desenvolvedor-websites") return "Criação de sites institucionais, landing pages, portfólios, páginas de venda, manutenção de sites e presença digital para empresas.";
  if (course.id === "ia-na-pratica") return "Automação de tarefas, criação de conteúdo, marketing, vendas, atendimento, gestão de processos e produtividade com inteligência artificial.";
  return course.outcome;
}

function tagClass(course: CourseContent) {
  return categoryStyle[course.category] ?? "border-white/10 bg-white/[0.04] text-zinc-300";
}

function abrirEstudoGratis(course: CourseContent) {
  if (!course.free) return false;
  window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "estudo" }));
  return true;
}

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<CourseContent | null>(null);
  const [cursoDetalhes, setCursoDetalhes] = useState<CourseContent | null>(null);
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");

  const cursoDestaque = professionalCourses.find((course) => course.id === "ia-na-pratica") ?? professionalCourses[0];

  const categorias = useMemo(() => ["Todos", "Grátis", ...Array.from(new Set(professionalCourses.map((course) => course.category)))], []);

  const cursosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return professionalCourses.filter((course) => {
      const matchCategoria = categoria === "Todos" || (categoria === "Grátis" && course.free) || course.category === categoria;
      const matchBusca = !termo || `${course.id} ${course.title} ${course.subtitle} ${course.category} ${course.level}`.toLowerCase().includes(termo);
      return matchCategoria && matchBusca;
    });
  }, [categoria, busca]);

  function comprarOuAcessar(course: CourseContent) {
    if (abrirEstudoGratis(course)) return;
    setCursoSelecionado(course);
  }

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_70%_100%,rgba(16,185,129,0.16),transparent_32%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="rounded-full border border-blue-300/25 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">AprendaJá • formações profissionalizantes</span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">Cursos com grade real, prática e projeto final.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">Escolha uma formação, confira a grade e compre pelo fluxo manual com liberação do ADM.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[`${professionalCourses.length} formações`, "Aulas práticas", "Certificado final"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-center text-sm font-black text-zinc-200">{item}</div>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#073750] shadow-2xl shadow-cyan-500/10 transition hover:-translate-y-1 hover:shadow-cyan-500/20">
            <div className="relative bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.35),transparent_35%),linear-gradient(135deg,#031d2a,#064d70)] p-5 text-white">
              <div className="absolute right-4 top-4 text-5xl opacity-90">{cursoDestaque.hero}</div>
              <p className="inline-flex rounded-full border border-cyan-200/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">Formação destaque</p>
              <h3 className="mt-4 max-w-[82%] text-3xl font-black leading-tight">{cursoDestaque.title}</h3>
            </div>
            <div className="bg-white p-5 text-[#06364d]"><p className="text-lg font-black leading-6">{cursoDestaque.subtitle}</p></div>
            <div className="grid grid-cols-[1fr_135px] gap-4 p-5">
              <div><p className="text-xs font-black uppercase tracking-widest text-cyan-200">Conteúdo</p><div className="mt-3 space-y-1 text-sm font-bold text-white/90">{principaisModulos(cursoDestaque).slice(0, 4).map((item) => <p key={item}>• {item}</p>)}</div></div>
              <div className="overflow-hidden rounded-[1.4rem] bg-white text-center text-[#06364d]"><div className="bg-[#052f44] px-2 py-2 text-xs font-black uppercase tracking-widest text-white">Duração</div><div className="p-3"><p className="text-3xl font-black">{duracaoPrincipal(cursoDestaque)}</p><p className="mt-1 text-xs font-black">{cargaHoraria(cursoDestaque)}</p></div></div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-white/10 p-5"><p className="text-3xl font-black text-white">{cursoDestaque.price}</p><button onClick={() => setCursoDetalhes(cursoDestaque)} className="rounded-2xl bg-white px-5 py-3 font-black text-[#052f44] transition active:scale-95">Ver detalhes</button></div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl"><div className="grid gap-3 lg:grid-cols-[1fr_auto]"><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, categoria ou ID do curso..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-blue-300/40" /><div className="flex gap-2 overflow-x-auto">{categorias.map((item) => <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item}</button>)}</div></div></section>
      <section className="grid gap-4 md:grid-cols-4">{[["Grade curricular", "Módulos organizados como formação."], ["Prática real", "Cada aula termina com exercício."], ["Projeto final", "O aluno sai com entrega pronta."], ["Liberação segura", "Compra manual aprovada pelo ADM."]].map(([title, text]) => <div key={title} className="rounded-3xl border border-white/10 bg-black/35 p-5 transition hover:-translate-y-1 hover:border-blue-300/30"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>)}</section>
      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Catálogo</p><h2 className="mt-2 text-3xl font-black text-white">Formações disponíveis</h2></div><p className="text-sm font-bold text-zinc-500">{cursosFiltrados.length} encontradas</p></div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cursosFiltrados.map((course) => (
          <article key={course.id} className="group overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#073750] shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan-200/60 hover:shadow-cyan-500/20">
            <div className="relative bg-[radial-gradient(circle_at_20%_0%,rgba(125,211,252,0.35),transparent_35%),linear-gradient(135deg,#031d2a,#064d70)] p-5 text-white">
              <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
              <div className="absolute right-4 top-4 text-5xl opacity-90 transition duration-300 group-hover:scale-110">{course.hero}</div>
              <p className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${tagClass(course)}`}>{course.category}</p>
              <h3 className="mt-4 max-w-[82%] text-3xl font-black leading-tight">{course.title.replace("Qualificação Técnica em ", "")}</h3>
            </div>
            <div className="bg-white p-5 text-[#06364d]"><p className="text-lg font-black leading-6">{course.subtitle}</p></div>
            <div className="grid grid-cols-[1fr_118px] gap-4 p-5">
              <div><p className="text-xs font-black uppercase tracking-widest text-cyan-200">Módulos principais</p><div className="mt-3 space-y-1 text-sm font-semibold text-white/90">{principaisModulos(course).slice(0, 5).map((item) => <p key={item}>• {item}</p>)}</div></div>
              <div className="overflow-hidden rounded-[1.3rem] bg-white text-center text-[#06364d] transition group-hover:-rotate-1 group-hover:scale-105"><div className="bg-[#03283a] px-2 py-2 text-xs font-black uppercase tracking-widest text-white">Duração</div><div className="p-3"><p className="text-2xl font-black leading-none">{duracaoPrincipal(course)}</p><p className="mt-2 text-[11px] font-black">{cargaHoraria(course)}</p></div></div>
            </div>
            <div className="border-t border-white/10 p-5">
              <div className="flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-cyan-100">{levelLabel[course.level]}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-cyan-100">{aulasDoCurso(course)} aulas</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-cyan-100">ID: {course.id}</span>{course.free && <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#06364d]">Grátis</span>}</div>
              <p className="mt-4 text-xs font-black uppercase tracking-widest text-cyan-200">Áreas de atuação</p><p className="mt-2 text-sm leading-6 text-cyan-50/80">{areasAtuacao(course)}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[0.85fr_1.15fr]"><button onClick={() => setCursoDetalhes(course)} className="rounded-2xl border border-cyan-200/20 bg-white/5 px-4 py-3 font-black text-white transition active:scale-95">Ver detalhes</button><button onClick={() => comprarOuAcessar(course)} className="rounded-2xl bg-white px-4 py-3 font-black text-[#06364d] shadow-lg shadow-cyan-300/10 transition active:scale-95">{course.free ? "Começar grátis" : "Garantir acesso"}</button></div>
            </div>
          </article>
        ))}
      </div>

      {cursosFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum curso encontrado com esse filtro.</div>}

      {cursoDetalhes && (
        <div className="fixed inset-0 z-[80] grid place-items-end bg-black/75 p-3 backdrop-blur-sm md:place-items-center"><div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl"><div className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_0%,rgba(14,165,233,0.35),transparent_32%),linear-gradient(135deg,#031d2a,#06364d)] p-6 md:p-8"><button onClick={() => setCursoDetalhes(null)} className="absolute right-4 top-4 rounded-2xl border border-white/15 bg-black/25 px-4 py-2 font-black text-white">X</button><p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100/80">Detalhes da formação</p><h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">{cursoDetalhes.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-cyan-50/80">{cursoDetalhes.subtitle}</p><div className="mt-6 grid gap-3 sm:grid-cols-4"><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-cyan-100/60">Aulas</p><p className="text-2xl font-black text-white">{aulasDoCurso(cursoDetalhes)}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-cyan-100/60">Nível</p><p className="text-2xl font-black text-white">{levelLabel[cursoDetalhes.level]}</p></div><div className="rounded-2xl border border-white/10 bg-black/30 p-4"><p className="text-xs text-cyan-100/60">Duração</p><p className="text-2xl font-black text-white">{duracaoPrincipal(cursoDetalhes)}</p></div><div className="rounded-2xl bg-white p-4 text-[#06364d]"><p className="text-xs font-black">Investimento</p><p className="text-2xl font-black">{cursoDetalhes.price}</p></div></div></div><div className="grid gap-6 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-7"><section><h3 className="text-2xl font-black text-white">O que essa formação desenvolve</h3><p className="mt-3 rounded-2xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-zinc-300">{cursoDetalhes.outcome}</p><h3 className="mt-6 text-2xl font-black text-white">Grade curricular</h3><div className="mt-3 space-y-3">{cursoDetalhes.modules.map((modulo, index) => <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-4 transition hover:border-cyan-300/30"><p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Módulo {index + 1}</p><h4 className="mt-1 font-black text-white">{modulo.title}</h4><p className="mt-2 text-sm text-zinc-400">{modulo.lessons.length} aulas práticas</p></div>)}</div></section><aside className="space-y-4"><div className="rounded-[2rem] border border-white/10 bg-white p-5 text-[#06364d]"><p className="text-xs font-black uppercase tracking-widest">Áreas que pode atuar</p><p className="mt-3 text-sm font-black leading-6">{areasAtuacao(cursoDetalhes)}</p></div><div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-5 text-sm text-amber-100"><p className="font-black">Projeto final</p><p className="mt-2 leading-6">{cursoDetalhes.finalProject}</p></div><div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-xs font-black uppercase tracking-widest text-zinc-500">Checklist profissional</p><div className="mt-3 space-y-2">{cursoDetalhes.checklist.map((item) => <p key={item} className="text-sm text-zinc-300">✓ {item}</p>)}</div></div><button onClick={() => { comprarOuAcessar(cursoDetalhes); setCursoDetalhes(null); }} className="w-full rounded-2xl bg-white px-5 py-4 text-lg font-black text-black">{cursoDetalhes.free ? "Começar grátis" : "Garantir acesso"}</button><button onClick={() => setCursoDetalhes(null)} className="w-full rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Voltar ao catálogo</button></aside></div></div></div>
      )}

      <ModalPix open={Boolean(cursoSelecionado && !cursoSelecionado.free)} onClose={() => setCursoSelecionado(null)} cursoId={cursoSelecionado?.id ?? ""} titulo={cursoSelecionado?.title ?? ""} preco={cursoSelecionado?.price ?? ""} pixCode={chavePix} />
    </div>
  );
}
