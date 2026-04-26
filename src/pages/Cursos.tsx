import { useMemo, useState } from "react";
import ModalPix from "../components/ModalPix";
import { professionalCourses, modulosDoCurso, type CourseContent } from "../data/courses";

const chavePix = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";
const levelLabel: Record<string, string> = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };

function aulasDoCurso(course: CourseContent) { return course.modules.reduce((sum, module) => sum + module.lessons.length, 0); }

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<CourseContent | null>(null);
  const [cursoDetalhes, setCursoDetalhes] = useState<CourseContent | null>(null);
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const cursoDestaque = professionalCourses.find((course) => course.id === "tecnico-eletronica") ?? professionalCourses[0];
  const categorias = useMemo(() => ["Todos", "Grátis", ...Array.from(new Set(professionalCourses.map((course) => course.category)))], []);

  const cursosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return professionalCourses.filter((course) => {
      const matchCategoria = categoria === "Todos" || (categoria === "Grátis" && course.free) || course.category === categoria;
      const matchBusca = !termo || `${course.id} ${course.title} ${course.subtitle} ${course.category} ${course.level}`.toLowerCase().includes(termo);
      return matchCategoria && matchBusca;
    });
  }, [categoria, busca]);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_70%_100%,rgba(16,185,129,0.16),transparent_32%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="rounded-full border border-blue-300/25 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">AprendaJá • catálogo unificado</span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">Cursos completos, com ID certo e acesso controlado.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">Agora a vitrine, área do aluno e ADM usam os mesmos cursos. Sem ID perdido, sem curso duplicado, sem bagunça.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[`${professionalCourses.length} cursos`, "IDs visíveis", "Aulas completas"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-center text-sm font-black text-zinc-200">{item}</div>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-xl shadow-blue-500/10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Curso destaque</p>
            <p className="mt-4 text-6xl">{cursoDestaque.hero}</p>
            <h3 className="mt-3 text-3xl font-black text-white">{cursoDestaque.title}</h3>
            <p className="mt-2 break-all text-xs font-black uppercase tracking-[0.14em] text-blue-200">ID: {cursoDestaque.id}</p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{cursoDestaque.subtitle}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-zinc-300">{aulasDoCurso(cursoDestaque)} aulas</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-zinc-300">{levelLabel[cursoDestaque.level]}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-zinc-300">{cursoDestaque.category}</span>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-4xl font-black text-emerald-200">{cursoDestaque.price}</p>
              <button onClick={() => setCursoDetalhes(cursoDestaque)} className="rounded-2xl bg-white px-5 py-3 font-black text-black transition active:scale-95">Ver detalhes</button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome, categoria ou ID do curso..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-blue-300/40" />
          <div className="flex gap-2 overflow-x-auto">{categorias.map((item) => <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item}</button>)}</div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[["ID visível", "Todo curso mostra o ID usado no ADM."], ["Conteúdo completo", "Módulos, aulas, prática e projeto final."], ["Mesmo sistema", "Catálogo e Meus Cursos usam a mesma base."], ["Liberação manual", "ADM libera por ID do usuário + ID do curso."]].map(([title, text]) => <div key={title} className="rounded-3xl border border-white/10 bg-black/35 p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>)}
      </section>

      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Catálogo</p><h2 className="mt-2 text-3xl font-black text-white">Cursos disponíveis</h2></div><p className="text-sm font-bold text-zinc-500">{cursosFiltrados.length} encontrados</p></div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cursosFiltrados.map((course) => (
          <article key={course.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:border-blue-300/40">
            <div className="bg-white p-5 text-black">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="break-all text-xs font-black uppercase tracking-[0.16em] text-zinc-500">ID: {course.id}</p>
                  <h3 className="mt-3 text-2xl font-black leading-tight">{course.title}</h3>
                </div>
                <p className="text-5xl">{course.hero}</p>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{course.category}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{levelLabel[course.level]}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{aulasDoCurso(course)} aulas</span>
                {course.free && <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">Grátis</span>}
              </div>
              <p className="min-h-16 text-sm leading-6 text-zinc-400">{course.subtitle}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-xs text-zinc-500">Duração</p><p className="font-black text-white">{course.duration}</p></div>
                <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-xs text-zinc-500">Preço</p><p className="font-black text-emerald-200">{course.price}</p></div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button onClick={() => setCursoDetalhes(course)} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black text-zinc-200 transition active:scale-95">Ver detalhes</button>
                <button onClick={() => setCursoSelecionado(course)} className="rounded-2xl bg-white px-4 py-3 font-black text-black transition active:scale-95">{course.free ? "Acessar grátis" : "Comprar"}</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {cursosFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum curso encontrado com esse filtro.</div>}

      {cursoDetalhes && (
        <div className="fixed inset-0 z-[80] grid place-items-end bg-black/75 p-3 backdrop-blur-sm md:place-items-center">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-2xl md:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Detalhes do curso</p><h2 className="mt-2 text-3xl font-black text-white">{cursoDetalhes.title}</h2><p className="mt-2 break-all text-xs font-black uppercase tracking-[0.16em] text-blue-200">ID: {cursoDetalhes.id}</p><p className="mt-3 text-zinc-400">{cursoDetalhes.subtitle}</p></div><button onClick={() => setCursoDetalhes(null)} className="rounded-2xl border border-white/10 px-4 py-2 font-black text-zinc-300">X</button></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs text-zinc-500">Aulas</p><p className="text-2xl font-black">{aulasDoCurso(cursoDetalhes)}</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs text-zinc-500">Nível</p><p className="text-2xl font-black">{levelLabel[cursoDetalhes.level]}</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs text-zinc-500">Preço</p><p className="text-2xl font-black text-emerald-200">{cursoDetalhes.price}</p></div></div>
            <h3 className="mt-6 text-xl font-black text-white">O que você vai aprender</h3><p className="mt-2 rounded-2xl border border-white/10 bg-black/35 p-4 text-sm leading-6 text-zinc-300">{cursoDetalhes.outcome}</p>
            <h3 className="mt-6 text-xl font-black text-white">Módulos</h3><div className="mt-3 space-y-3">{cursoDetalhes.modules.map((modulo, index) => <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Módulo {index + 1}</p><h4 className="mt-1 font-black text-white">{modulo.title}</h4><p className="mt-2 text-sm text-zinc-400">{modulo.lessons.length} aulas práticas</p></div>)}</div>
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100"><p className="font-black">Projeto final</p><p className="mt-1">{cursoDetalhes.finalProject}</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => { setCursoSelecionado(cursoDetalhes); setCursoDetalhes(null); }} className="rounded-2xl bg-white px-5 py-4 font-black text-black">{cursoDetalhes.free ? "Acessar grátis" : "Comprar agora"}</button><button onClick={() => setCursoDetalhes(null)} className="rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Voltar ao catálogo</button></div>
          </div>
        </div>
      )}

      <ModalPix open={Boolean(cursoSelecionado && !cursoSelecionado.free)} onClose={() => setCursoSelecionado(null)} cursoId={cursoSelecionado?.id ?? ""} titulo={cursoSelecionado?.title ?? ""} preco={cursoSelecionado?.price ?? ""} pixCode={chavePix} />
    </div>
  );
}
