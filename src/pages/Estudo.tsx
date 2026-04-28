import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { professionalCourses } from "../data/courses";
import CertificateCard from "../components/CertificateCard";
import LessonVisual from "../components/LessonVisual";

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
  liberado_em?: string | null;
  origem?: string | null;
};

type View = "catalog" | "course";
type Course = (typeof professionalCourses)[number];
type ProgressMap = Record<string, string[]>;
type ActiveLesson = { moduleIndex: number; lessonIndex: number };

const STORAGE_KEY = "aprendaja_course_progress_v1";
const LAST_LESSON_KEY = "aprendaja_last_lesson_v1";

const levelLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

function countLessons(course: Course) {
  return course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0);
}

function normalize(text?: string | null) {
  return (text ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function lessonKey(courseId: string, moduleIndex: number, lessonIndex: number) {
  return `${courseId}:${moduleIndex}:${lessonIndex}`;
}

function readProgress(): ProgressMap {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function readLastLesson(): Record<string, ActiveLesson> {
  try {
    const saved = localStorage.getItem(LAST_LESSON_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function flatLessons(course: Course) {
  return course.modules.flatMap((modulo, moduleIndex) =>
    modulo.lessons.map((lesson, lessonIndex) => ({
      modulo,
      lesson,
      moduleIndex,
      lessonIndex,
      key: lessonKey(course.id, moduleIndex, lessonIndex),
    }))
  );
}

function clampLesson(course: Course, saved?: ActiveLesson): ActiveLesson {
  const list = flatLessons(course);
  if (!saved) return { moduleIndex: 0, lessonIndex: 0 };
  const exists = list.some(
    (item) => item.moduleIndex === saved.moduleIndex && item.lessonIndex === saved.lessonIndex
  );
  return exists ? saved : { moduleIndex: 0, lessonIndex: 0 };
}

export default function Estudo() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [acessosManuais, setAcessosManuais] = useState<AcessoManual[]>([]);
  const [selecionado, setSelecionado] = useState<Course>(professionalCourses[0]);
  const [view, setView] = useState<View>("catalog");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [progress, setProgress] = useState<ProgressMap>(() => readProgress());
  const [lastLesson, setLastLesson] = useState<Record<string, ActiveLesson>>(() => readLastLesson());
  const [activeLesson, setActiveLesson] = useState<ActiveLesson>({ moduleIndex: 0, lessonIndex: 0 });
  const [showLessons, setShowLessons] = useState(false);

  const liberadas = useMemo(
    () => compras.filter((item) => normalize(item.status) === "compra aprovada"),
    [compras]
  );

  const manualKeys = useMemo(
    () =>
      new Set(
        acessosManuais
          .flatMap((item) => [normalize(item.produto_id), normalize(item.course_title)])
          .filter(Boolean)
      ),
    [acessosManuais]
  );

  const totalAulas = countLessons(selecionado);
  const concluidasSelecionado = Math.min(progress[selecionado.id]?.length ?? 0, totalAulas);
  const porcentagemSelecionado = totalAulas > 0 ? Math.round((concluidasSelecionado / totalAulas) * 100) : 0;
  const lessonList = useMemo(() => flatLessons(selecionado), [selecionado]);
  const currentIndex = lessonList.findIndex(
    (item) => item.moduleIndex === activeLesson.moduleIndex && item.lessonIndex === activeLesson.lessonIndex
  );
  const currentLesson = lessonList[Math.max(0, currentIndex)] ?? lessonList[0];
  const currentDone = currentLesson ? progress[selecionado.id]?.includes(currentLesson.key) ?? false : false;

  const categorias = useMemo(
    () => ["Todos", "Liberados", "Bloqueados", ...Array.from(new Set(professionalCourses.map((course) => course.category)))],
    []
  );

  function temAcesso(courseId: string, title: string, free?: boolean) {
    if (free) return true;
    const id = normalize(courseId);
    const nome = normalize(title);
    if (manualKeys.has(id) || manualKeys.has(nome)) return true;
    return liberadas.some((compra) => normalize(compra.course_id) === id || normalize(compra.course_title) === nome);
  }

  const cursosOrdenados = useMemo(
    () =>
      [...professionalCourses].sort(
        (a, b) => Number(temAcesso(b.id, b.title, b.free)) - Number(temAcesso(a.id, a.title, a.free))
      ),
    [liberadas, manualKeys]
  );

  const cursosFiltrados = useMemo(() => {
    const busca = normalize(query);
    return cursosOrdenados.filter((course) => {
      const acesso = temAcesso(course.id, course.title, course.free);
      const combinaCategoria =
        categoria === "Todos" ||
        (categoria === "Liberados" && acesso) ||
        (categoria === "Bloqueados" && !acesso) ||
        course.category === categoria;
      const combinaBusca =
        !busca || normalize(`${course.id} ${course.title} ${course.subtitle} ${course.category} ${course.level}`).includes(busca);
      return combinaCategoria && combinaBusca;
    });
  }, [categoria, query, cursosOrdenados]);

  useEffect(() => {
    carregarCompras();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(LAST_LESSON_KEY, JSON.stringify(lastLesson));
  }, [lastLesson]);

  async function carregarCompras() {
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
      .select("id,produto_id,course_title,liberado_em,origem")
      .eq("user_id", userData.user.id);
    setCompras((comprasData ?? []) as Compra[]);
    setAcessosManuais((acessosData ?? []) as AcessoManual[]);
    setLoading(false);
  }

  function motivoAcesso(course: Course) {
    if (course.free) return "Curso grátis";
    if (manualKeys.has(normalize(course.id)) || manualKeys.has(normalize(course.title))) return "Liberado pelo ADM";
    const compraAprovada = liberadas.some(
      (compra) => normalize(compra.course_id) === normalize(course.id) || normalize(compra.course_title) === normalize(course.title)
    );
    return compraAprovada ? "Compra aprovada" : "Bloqueado";
  }

  function getCourseProgress(course: Course) {
    const total = countLessons(course);
    const done = Math.min(progress[course.id]?.length ?? 0, total);
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }

  function setLesson(moduleIndex: number, lessonIndex: number) {
    const next = { moduleIndex, lessonIndex };
    setActiveLesson(next);
    setShowLessons(false);
    setLastLesson((current) => ({ ...current, [selecionado.id]: next }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleLesson(courseId: string, key: string) {
    setProgress((current) => {
      const currentCourse = current[courseId] ?? [];
      const alreadyDone = currentCourse.includes(key);
      const nextCourse = alreadyDone ? currentCourse.filter((item) => item !== key) : [...currentCourse, key];
      return { ...current, [courseId]: nextCourse };
    });
  }

  function concluirEProxima() {
    if (!currentLesson) return;
    if (!currentDone) toggleLesson(selecionado.id, currentLesson.key);
    if (currentIndex < lessonList.length - 1) {
      const next = lessonList[currentIndex + 1];
      setLesson(next.moduleIndex, next.lessonIndex);
    }
  }

  function abrirCurso(course: Course) {
    if (!temAcesso(course.id, course.title, course.free)) {
      alert("Curso aguardando liberação. Envie o comprovante e espere o ADM aprovar o acesso.");
      return;
    }
    setSelecionado(course);
    setActiveLesson(clampLesson(course, lastLesson[course.id]));
    setView("course");
    setShowLessons(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function baixarMaterial() {
    const texto = `${selecionado.title}\nID: ${selecionado.id}\n\n${selecionado.subtitle}\n\nObjetivo:\n${selecionado.outcome}\n\n${selecionado.modules
      .map(
        (modulo) => `${modulo.title}\n${modulo.lessons
          .map((aula, i) => `Aula ${i + 1}: ${aula.title}\n${aula.summary}\n\nPrática:\n${aula.practice}`)
          .join("\n\n")}`
      )
      .join("\n\n")}\n\nChecklist:\n${selecionado.checklist.map((item) => `- ${item}`).join("\n")}\n\nProjeto final:\n${selecionado.finalProject}\n\nMaterial privado AprendaJá Cursos Livres.`;
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selecionado.id}-material.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const LessonPanel = () => (
    <div className="space-y-3">
      {selecionado.modules.map((modulo, moduloIndex) => (
        <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-3">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Módulo {moduloIndex + 1}</p>
          <p className="mt-1 text-sm font-black text-zinc-200">{modulo.title}</p>
          <div className="mt-3 space-y-2">
            {modulo.lessons.map((aula, aulaIndex) => {
              const key = lessonKey(selecionado.id, moduloIndex, aulaIndex);
              const done = progress[selecionado.id]?.includes(key) ?? false;
              const active = activeLesson.moduleIndex === moduloIndex && activeLesson.lessonIndex === aulaIndex;
              return (
                <button
                  key={aula.title}
                  onClick={() => setLesson(moduloIndex, aulaIndex)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${
                    active ? "border-white bg-white text-black" : "border-white/10 bg-zinc-950 text-zinc-400"
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[10px] font-black ${
                      done ? "bg-emerald-400 text-black" : active ? "bg-black text-white" : "bg-white/10 text-zinc-500"
                    }`}
                  >
                    {done ? "✓" : aulaIndex + 1}
                  </span>
                  <span className="line-clamp-1">{aula.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  if (view === "course") {
    const nextLesson = currentIndex < lessonList.length - 1 ? lessonList[currentIndex + 1] : null;
    return (
      <div className="space-y-4 pb-28">
        <section className="sticky top-[76px] z-30 rounded-[1.5rem] border border-white/10 bg-black/90 p-3 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-2">
            <button onClick={() => setView("catalog")} className="rounded-2xl border border-white/10 px-3 py-3 text-xs font-black text-zinc-300">←</button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-white">{selecionado.title}</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${porcentagemSelecionado}%` }} />
              </div>
            </div>
            <button onClick={() => setShowLessons(true)} className="rounded-2xl border border-white/10 px-3 py-3 text-xs font-black text-zinc-300 lg:hidden">Aulas</button>
            <span className="rounded-2xl bg-white px-3 py-3 text-xs font-black text-black">{porcentagemSelecionado}%</span>
          </div>
        </section>

        {showLessons && (
          <div className="fixed inset-0 z-[90] bg-black/80 p-3 backdrop-blur-xl lg:hidden">
            <div className="mx-auto max-h-[92vh] max-w-lg overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-black">Aulas do curso</h3>
                <button onClick={() => setShowLessons(false)} className="rounded-2xl bg-white px-4 py-2 font-black text-black">Fechar</button>
              </div>
              <LessonPanel />
            </div>
          </div>
        )}

        <main className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-4 lg:sticky lg:top-40 lg:block lg:max-h-[72vh] lg:overflow-y-auto">
            <div className="rounded-[1.5rem] bg-white p-5 text-black">
              <p className="text-5xl">{selecionado.hero}</p>
              <p className="mt-4 break-all text-xs font-black uppercase tracking-[0.18em] text-zinc-500">ID: {selecionado.id}</p>
              <h1 className="mt-2 text-2xl font-black leading-tight">{selecionado.title}</h1>
              <p className="mt-2 text-sm font-semibold leading-6 text-zinc-700">{selecionado.subtitle}</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-[10px] text-zinc-500">Duração</p><p className="text-sm font-black">{selecionado.duration}</p></div>
              <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-[10px] text-zinc-500">Aulas</p><p className="text-sm font-black">{concluidasSelecionado}/{totalAulas}</p></div>
              <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-[10px] text-zinc-500">Nível</p><p className="text-sm font-black">{levelLabel[selecionado.level]}</p></div>
            </div>
            <div className="mt-4 grid gap-2"><button onClick={baixarMaterial} className="w-full rounded-2xl bg-white px-5 py-3 font-black text-black">Baixar material</button></div>
            <div className="mt-4"><CertificateCard courseId={selecionado.id} courseTitle={selecionado.title} duration={selecionado.duration} totalLessons={totalAulas} completedLessons={concluidasSelecionado} finalProject={selecionado.finalProject} /></div>
            <h3 className="mt-6 text-lg font-black text-white">Aulas</h3>
            <div className="mt-3"><LessonPanel /></div>
          </aside>

          <section className="space-y-4">
            <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-4 lg:hidden">
              <div className="flex items-start gap-3">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl">{selecionado.hero}</div>
                <div className="min-w-0">
                  <p className="break-all text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">ID: {selecionado.id}</p>
                  <h1 className="mt-1 text-xl font-black leading-tight">{selecionado.title}</h1>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">{selecionado.duration} • {levelLabel[selecionado.level]} • {concluidasSelecionado}/{totalAulas} aulas</p>
                </div>
              </div>
            </div>

            <CertificateCard courseId={selecionado.id} courseTitle={selecionado.title} duration={selecionado.duration} totalLessons={totalAulas} completedLessons={concluidasSelecionado} finalProject={selecionado.finalProject} />

            {porcentagemSelecionado === 100 && (
              <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 p-5">
                <p className="text-4xl">🏆</p>
                <h2 className="mt-3 text-2xl font-black text-emerald-100">Curso concluído!</h2>
                <p className="mt-2 text-sm text-emerald-100/70">Certificado de Conclusão — Curso Livre liberado acima.</p>
              </div>
            )}

            {currentLesson && (
              <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
                <div className="border-b border-white/10 bg-white p-5 text-black md:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Módulo {currentLesson.moduleIndex + 1} • Aula {currentLesson.lessonIndex + 1} de {lessonList.length}</p>
                  <h2 className="mt-3 text-3xl font-black leading-tight md:text-6xl">{currentLesson.lesson.title}</h2>
                  <p className="mt-3 text-sm font-semibold text-zinc-600">{currentLesson.modulo.title}</p>
                </div>
                <div className="grid gap-3 p-4 md:p-6">
                  <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">📖 Explicação</p>
                    <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-zinc-200">{currentLesson.lesson.summary}</p>
                  </section>

                  <LessonVisual courseId={selecionado.id} lessonTitle={currentLesson.lesson.title} />

                  <div className="grid gap-3 md:grid-cols-2">
                    <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">🧪 Exemplo prático</p>
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-300">{currentLesson.lesson.example ?? "Exemplo prático disponível na explicação da aula."}</p>
                    </section>
                    <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">🎯 Resultado esperado</p>
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-300">{currentLesson.lesson.expectedResult ?? "Ao final desta aula, você deve conseguir aplicar o conteúdo em uma entrega simples."}</p>
                    </section>
                  </div>

                  <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">🧭 Passo a passo</p>
                    <ol className="mt-4 space-y-3">
                      {(currentLesson.lesson.steps ?? ["Leia a explicação com calma.", "Observe o exemplo prático.", "Faça a atividade proposta.", "Revise sua entrega antes de concluir."]).map((step, index) => (
                        <li key={step} className="flex gap-3 text-sm leading-7 text-zinc-300">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-white text-xs font-black text-black">{index + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </section>

                  <section className="rounded-[1.5rem] border border-red-400/20 bg-red-500/5 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-red-200">⚠️ Erros comuns</p>
                    <div className="mt-4 space-y-3">
                      {(currentLesson.lesson.commonMistakes ?? ["Pular a prática e apenas ler a aula. Evite isso fazendo a atividade proposta.", "Copiar sem entender. Evite isso explicando com suas palavras o que você fez."]).map((mistake) => (
                        <p key={mistake} className="text-sm leading-7 text-red-50/80">• {mistake}</p>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/5 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">✅ Exercício prático</p>
                    <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-emerald-50/85">{currentLesson.lesson.exercise ?? currentLesson.lesson.practice}</p>
                  </section>

                  <div className="grid gap-3 md:grid-cols-2">
                    <button onClick={() => toggleLesson(selecionado.id, currentLesson.key)} className={`rounded-2xl px-5 py-4 font-black transition active:scale-95 ${currentDone ? "border border-emerald-400/30 bg-emerald-500/10 text-emerald-100" : "bg-white text-black"}`}>{currentDone ? "Aula concluída ✓" : "Marcar como concluída"}</button>
                    <button onClick={concluirEProxima} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-black text-white transition hover:border-blue-300/40 active:scale-95">{nextLesson ? "Concluir e ir para próxima" : "Concluir curso"}</button>
                  </div>

                  {nextLesson && <button onClick={() => setLesson(nextLesson.moduleIndex, nextLesson.lessonIndex)} className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-left font-black text-zinc-300 transition hover:border-white/30">Próxima aula: {nextLesson.lesson.title}</button>}
                </div>
              </article>
            )}
          </section>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-2xl font-black text-white">Carregando seus cursos...</p>
        <p className="mt-2 text-sm text-zinc-500">Verificando compras e acessos liberados.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28">
      <section className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),rgba(255,255,255,0.035)] p-6 md:p-8">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-200">Área do aluno</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">Meus cursos</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">Acesse cursos liberados, acompanhe seu progresso e conclua 100% das aulas para gerar o Certificado de Conclusão — Curso Livre.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar curso..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-blue-300/40" />
        <div className="flex gap-2 overflow-x-auto">
          {categorias.map((item) => (
            <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400"}`}>{item}</button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cursosFiltrados.map((course) => {
          const acesso = temAcesso(course.id, course.title, course.free);
          const courseProgress = getCourseProgress(course);
          return (
            <article key={course.id} className="rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-xl shadow-black/30">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-4xl">{course.hero}</p>
                  <h2 className="mt-3 text-2xl font-black text-white">{course.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{course.subtitle}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-black ${acesso ? "bg-emerald-400 text-black" : "bg-white/10 text-zinc-400"}`}>{motivoAcesso(course)}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${courseProgress.percent}%` }} /></div>
              <p className="mt-2 text-xs font-bold text-zinc-500">{courseProgress.done}/{courseProgress.total} aulas • {courseProgress.percent}%</p>
              <button onClick={() => abrirCurso(course)} className={`mt-5 w-full rounded-2xl px-5 py-4 font-black transition active:scale-95 ${acesso ? "bg-white text-black" : "border border-white/10 text-zinc-500"}`}>{acesso ? "Continuar curso" : "Aguardando liberação"}</button>
            </article>
          );
        })}
      </section>

      {cursosFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum curso encontrado.</div>}
    </div>
  );
}
