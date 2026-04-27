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

  const acoes = [
    { title: "Formações", text: "Veja a trilha completa de cursos.", icon: "◈", page: "cursos" },
    { title: "Meus cursos", text: resumoEstudo ? `Continue ${resumoEstudo.course.title}.` : "Acompanhe progresso e materiais.", icon: "▣", page: "estudo" },
    { title: "Suporte", text: "Comprovante, dúvidas e atendimento.", icon: "◇", page: "suporte" },
  ];

  const diferenciais = [
    ["Grade real", "Módulos, práticas e projeto final."],
    ["Acesso seguro", "Liberação manual conferida pelo ADM."],
    ["Área do aluno", "Progresso, material e certificado."],
  ];

  const fluxo = ["Escolha", "Pague", "Envie", "ADM libera", "Estude"];

  return (
    <div className="space-y-5 md:space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:rounded-[2.6rem] md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.34),transparent_34%),radial-gradient(circle_at_95%_15%,rgba(56,189,248,0.20),transparent_32%),radial-gradient(circle_at_70%_100%,rgba(16,185,129,0.12),transparent_32%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-200">THKLAYUS HUB</span>
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200">AprendaJá</span>
            </div>
            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.01] tracking-[-0.06em] md:text-6xl">Cursos profissionais, estudo organizado e acesso controlado.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">Formações com módulos, prática, projeto final e suporte interno. Sem promessa falsa: o foco é aprender e evoluir com processo.</p>
            {resumoEstudo && (
              <div className="mt-5 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Continuar de onde parou</p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white md:text-xl">{resumoEstudo.course.title}</h3>
                    <p className="mt-1 text-sm text-emerald-50/70">{resumoEstudo.aula ? `Última aula: ${resumoEstudo.aula}` : `${resumoEstudo.done}/${resumoEstudo.total} aulas concluídas`}</p>
                  </div>
                  <span className="rounded-2xl bg-white px-4 py-2 text-sm font-black text-black">{resumoEstudo.percent}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-300" style={{ width: `${resumoEstudo.percent}%` }} /></div>
              </div>
            )}
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">Ver formações</button>
              <button onClick={() => setPage("estudo")} className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 font-black text-white transition hover:border-blue-400/40 hover:bg-blue-500/10 active:scale-95">{resumoEstudo ? "Continuar agora" : "Meus cursos"}</button>
              <button onClick={() => setPage("suporte")} className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-6 py-4 font-black text-violet-100 transition hover:bg-violet-500/20 active:scale-95">Suporte</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {[[`${professionalCourses.length}`, "formações"], [`${totalAulas}`, "aulas"], [`${totalHoras}h`, "carga somada"], ["ADM", "liberação"]].map(([valor, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-xl shadow-black/30 backdrop-blur-xl md:p-5">
                <p className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-black text-transparent md:text-4xl">{valor}</p>
                <p className="mt-1 text-xs font-bold text-zinc-500 md:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3 md:gap-4">
        {acoes.map((item) => (
          <button key={item.title} onClick={() => setPage(item.page)} className="group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] p-4 text-left shadow-xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/40 active:scale-[0.99] md:rounded-[2rem] md:p-5">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/12 to-violet-500/8 opacity-80 transition group-hover:opacity-100" />
            <div className="relative flex items-center gap-4 md:block">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black/50 text-xl font-black text-blue-200 shadow-lg shadow-black/30 md:h-12 md:w-12">{item.icon}</div>
              <div>
                <h3 className="text-xl font-black tracking-[-0.02em] md:mt-5 md:text-2xl">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-zinc-400 md:mt-2">{item.text}</p>
              </div>
            </div>
          </button>
        ))}
      </section>

      <section className="grid gap-3 md:grid-cols-3 md:gap-4">
        {diferenciais.map(([title, text]) => (
          <div key={title} className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4 shadow-xl shadow-black/20 md:rounded-[2rem] md:p-5">
            <h3 className="text-lg font-black text-white md:text-xl">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Vitrine</p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Trilha principal de tecnologia</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">IA, prompts, APIs e criação de sites profissionais com conteúdo prático e honesto.</p>
          </div>
          <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black shadow-lg shadow-blue-500/20 transition active:scale-95">Ver catálogo</button>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {populares.map((course) => (
            <button key={course.id} onClick={() => setPage("cursos")} className="group overflow-hidden rounded-3xl border border-white/10 bg-black/45 text-left transition hover:-translate-y-1 hover:border-blue-300/40 active:scale-[0.99]">
              <div className="bg-white p-4 text-black">
                <p className="text-4xl transition group-hover:scale-110">{course.hero}</p>
                <p className="mt-3 break-all text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">ID: {course.id}</p>
                <h4 className="mt-2 text-lg font-black leading-tight">{course.title}</h4>
              </div>
              <div className="p-4">
                <p className="text-sm text-zinc-400">{course.category} • {course.duration}</p>
                <p className="mt-2 text-xl font-black text-emerald-200">{course.price}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-2xl shadow-black/30 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Como funciona</p>
        <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Compra simples, acesso controlado</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {fluxo.map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-black p-4 md:rounded-3xl">
              <p className="text-[10px] font-black text-zinc-500 md:text-xs">PASSO {index + 1}</p>
              <p className="mt-2 text-sm font-black text-white">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-blue-500/10 md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black tracking-[-0.03em]">Compra e liberação organizadas</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">Use o ID do curso no ADM. Exemplo atual: <b>{cursoExemplo?.id}</b>. Depois da aprovação, o aluno acessa em Meus Cursos.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setPage("cursos")} className="rounded-2xl bg-black px-5 py-3 font-black text-white">Ver IDs</button>
            <button onClick={() => setPage("chat")} className="rounded-2xl border border-zinc-300 px-5 py-3 font-black">Ver chat</button>
          </div>
        </div>
      </section>
    </div>
  );
}
