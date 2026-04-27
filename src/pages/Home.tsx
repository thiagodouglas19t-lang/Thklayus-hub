import { useMemo } from "react";
import { professionalCourses } from "../data/courses";

const prioridadeHome = ["ia-na-pratica", "ia-ferramentas-prompts", "apis-na-pratica", "site-nivel-empresa"];
const PROGRESS_KEY = "thklayus_course_progress_v1";
const LAST_LESSON_KEY = "thklayus_last_lesson_v1";

type ProgressMap = Record<string, string[]>;
type LastLessonMap = Record<string, { moduleIndex: number; lessonIndex: number }>;

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function countLessons(course: (typeof professionalCourses)[number]) {
  return course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0);
}

export default function Home({ setPage }: any) {
  const populares = prioridadeHome.map((id) => professionalCourses.find((course) => course.id === id)).filter(Boolean).slice(0, 4) as typeof professionalCourses;
  const cursoExemplo = professionalCourses[0];
  const totalAulas = professionalCourses.reduce((sum, course) => sum + countLessons(course), 0);
  const totalHoras = professionalCourses.reduce((sum, course) => {
    const horas = course.duration.match(/(\d+)h/)?.[1];
    return sum + (horas ? Number(horas) : 0);
  }, 0);

  const resumoEstudo = useMemo(() => {
    const progress = readJson<ProgressMap>(PROGRESS_KEY, {});
    const lastLessons = readJson<LastLessonMap>(LAST_LESSON_KEY, {});
    return professionalCourses
      .map((course) => {
        const total = countLessons(course);
        const done = Math.min(progress[course.id]?.length ?? 0, total);
        const percent = total > 0 ? Math.round((done / total) * 100) : 0;
        const last = lastLessons[course.id];
        const modulo = last ? course.modules[last.moduleIndex] : undefined;
        const aula = modulo ? modulo.lessons[last.lessonIndex] : undefined;
        return { course, total, done, percent, aula: aula?.title };
      })
      .filter((item) => item.done > 0)
      .sort((a, b) => b.done - a.done)[0] ?? null;
  }, []);

  const fluxo = [
    ["Escolha", "Catálogo"],
    ["Pague", "PIX"],
    ["Envie", "Comprovante"],
    ["Liberação", "ADM confere"],
    ["Estude", "Área do aluno"],
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-[#050507] p-5 shadow-2xl shadow-black/50 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(124,58,237,0.30),transparent_34%),radial-gradient(circle_at_95%_10%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_65%_100%,rgba(16,185,129,0.13),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="relative grid gap-7 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-100">AprendaJá</span>
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200">THKLAYUS</span>
            </div>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.01] tracking-[-0.065em] md:text-6xl">Plataforma de cursos para aprender, praticar e evoluir.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">Cursos com módulos, exercícios, projeto final e acesso controlado. Uma experiência simples para vender, liberar e estudar sem bagunça.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">Explorar cursos</button>
              <button onClick={() => setPage("estudo")} className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 font-black text-white transition hover:border-blue-400/40 hover:bg-blue-500/10 active:scale-95">{resumoEstudo ? "Continuar agora" : "Meus cursos"}</button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
            {resumoEstudo ? (
              <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Continuar de onde parou</p>
                <h3 className="mt-2 text-xl font-black text-white">{resumoEstudo.course.title}</h3>
                <p className="mt-1 text-sm leading-6 text-emerald-50/70">{resumoEstudo.aula ? `Última aula: ${resumoEstudo.aula}` : `${resumoEstudo.done}/${resumoEstudo.total} aulas concluídas`}</p>
                <div className="mt-4 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${resumoEstudo.percent}%` }} /></div><span className="text-sm font-black text-white">{resumoEstudo.percent}%</span></div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">Comece pela trilha principal</p>
                <h3 className="mt-2 text-xl font-black text-white">IA, prompts, APIs e sites</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">Uma sequência prática para quem quer aprender tecnologia e criar projetos digitais.</p>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[[`${professionalCourses.length}`, "formações"], [`${totalAulas}`, "aulas"], [`${totalHoras}h`, "carga"], ["ADM", "liberação"]].map(([valor, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-2xl font-black text-white md:text-3xl">{valor}</p>
                  <p className="mt-1 text-xs font-bold text-zinc-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {[["Formações", "Catálogo completo com grade e projeto final.", "◈", "cursos"], ["Área do aluno", "Progresso, materiais e certificados.", "▣", "estudo"], ["Suporte", "Comprovantes, dúvidas e atendimento.", "◇", "suporte"]].map(([title, text, icon, page]) => (
          <button key={title} onClick={() => setPage(page)} className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-5 text-left shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/40 active:scale-[0.99]">
            <div className="relative flex items-center gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/50 text-xl font-black text-blue-200">{icon}</div>
              <div><h3 className="text-xl font-black">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{text}</p></div>
            </div>
          </button>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Vitrine</p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Trilha principal de tecnologia</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Cursos práticos para aprender IA, prompts, APIs e criação de sites com identidade própria do AprendaJá.</p>
          </div>
          <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black shadow-lg shadow-blue-500/20 transition active:scale-95">Ver catálogo</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {populares.map((course) => (
            <button key={course.id} onClick={() => setPage("cursos")} className="group overflow-hidden rounded-3xl border border-white/10 bg-black/45 text-left transition hover:-translate-y-1 hover:border-blue-300/40 active:scale-[0.99]">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3"><p className="text-4xl transition group-hover:scale-110">{course.hero}</p><span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">{course.category}</span></div>
                <h4 className="mt-4 min-h-14 text-lg font-black leading-tight text-white">{course.title}</h4>
                <p className="mt-2 text-sm text-zinc-500">{course.duration}</p>
                <p className="mt-3 text-xl font-black text-emerald-200">{course.price}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-2xl shadow-black/30 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Como funciona</p>
        <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Compra simples, acesso controlado</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500">Processo manual para manter controle: o ADM confere o comprovante e libera o acesso.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {fluxo.map(([title, subtitle], index) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-black p-4 md:rounded-3xl">
              <p className="text-[10px] font-black text-zinc-500 md:text-xs">PASSO {index + 1}</p>
              <p className="mt-2 text-sm font-black text-white">{title}</p>
              <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-blue-500/10 md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black tracking-[-0.03em]">Gestão organizada para vender sem bagunça</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">Use o ID do curso no ADM. Exemplo atual: <b>{cursoExemplo?.id}</b>. Depois da aprovação, o aluno acessa em Meus Cursos.</p>
          </div>
          <button onClick={() => setPage("cursos")} className="rounded-2xl bg-black px-5 py-3 font-black text-white">Ver cursos</button>
        </div>
      </section>
    </div>
  );
}
