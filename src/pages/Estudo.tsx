import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { professionalCourses } from "../data/courses";

type Compra = {
  id: string;
  course_id?: string | null;
  course_title?: string | null;
  status: string;
};

type View = "catalog" | "course";
type Course = (typeof professionalCourses)[number];
type ProgressMap = Record<string, string[]>;

const STORAGE_KEY = "thklayus_course_progress_v1";

const levelLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

function countLessons(course: Course) {
  return course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0);
}

function normalize(text?: string | null) {
  return (text ?? "").toLowerCase().trim();
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

export default function Estudo() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [selecionado, setSelecionado] = useState(professionalCourses[0]);
  const [view, setView] = useState<View>("catalog");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [progress, setProgress] = useState<ProgressMap>(() => readProgress());

  const liberadas = useMemo(() => compras.filter((item) => item.status === "compra aprovada"), [compras]);
  const totalAulas = countLessons(selecionado);
  const concluidasSelecionado = progress[selecionado.id]?.length ?? 0;
  const porcentagemSelecionado = totalAulas > 0 ? Math.round((concluidasSelecionado / totalAulas) * 100) : 0;

  const categorias = useMemo(() => {
    return ["Todos", ...Array.from(new Set(professionalCourses.map((course) => course.category)))];
  }, []);

  const cursosFiltrados = useMemo(() => {
    const busca = normalize(query);

    return professionalCourses.filter((course) => {
      const combinaCategoria = categoria === "Todos" || course.category === categoria;
      const combinaBusca = !busca || normalize(`${course.title} ${course.subtitle} ${course.category} ${course.level}`).includes(busca);
      return combinaCategoria && combinaBusca;
    });
  }, [categoria, query]);

  useEffect(() => {
    carregarCompras();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  async function carregarCompras() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("chat_threads")
      .select("id,course_id,course_title,status")
      .eq("user_id", userData.user.id)
      .eq("type", "purchase");

    setCompras((data ?? []) as Compra[]);
    setLoading(false);
  }

  function temAcesso(courseId: string, title: string, free?: boolean) {
    if (free) return true;
    return liberadas.some((compra) => compra.course_id === courseId || compra.course_title === title);
  }

  function getCourseProgress(course: Course) {
    const total = countLessons(course);
    const done = progress[course.id]?.length ?? 0;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, percent };
  }

  function toggleLesson(courseId: string, key: string) {
    setProgress((current) => {
      const currentCourse = current[courseId] ?? [];
      const alreadyDone = currentCourse.includes(key);
      const nextCourse = alreadyDone ? currentCourse.filter((item) => item !== key) : [...currentCourse, key];
      return { ...current, [courseId]: nextCourse };
    });
  }

  function abrirCurso(course: Course) {
    const acesso = temAcesso(course.id, course.title, course.free);
    if (!acesso) {
      alert("Curso bloqueado. Compre o curso e aguarde a aprovação do ADM para acessar.");
      return;
    }
    setSelecionado(course);
    setView("course");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function baixarMaterial() {
    const texto = `${selecionado.title}\n\n${selecionado.subtitle}\n\nObjetivo: ${selecionado.outcome}\n\n${selecionado.modules
      .map((modulo) => `${modulo.title}\n${modulo.lessons.map((aula, i) => `Aula ${i + 1}: ${aula.title}\n${aula.summary}\nPrática: ${aula.practice}`).join("\n\n")}`)
      .join("\n\n")}\n\nChecklist:\n${selecionado.checklist.map((item) => `- ${item}`).join("\n")}\n\nProjeto final:\n${selecionado.finalProject}\n\nMaterial privado THKLAYUS.`;
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selecionado.id}-material.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (view === "course") {
    return (
      <div className="space-y-6">
        <button onClick={() => setView("catalog")} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-white/30 hover:bg-white/10">
          ← Voltar para meus cursos
        </button>

        <main className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/50">
          <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-white via-zinc-100 to-zinc-300 p-6 text-black md:p-10">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />

            <div className="relative mx-auto max-w-4xl text-center">
              <p className="text-7xl md:text-8xl">{selecionado.hero}</p>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.35em] text-zinc-600">{selecionado.category} • {levelLabel[selecionado.level]}</p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-7xl">{selecionado.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-700 md:text-lg">{selecionado.subtitle}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Duração</p><p className="font-black">{selecionado.duration}</p></div>
                <div className="rounded-3xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Aulas</p><p className="font-black">{concluidasSelecionado}/{totalAulas}</p></div>
                <div className="rounded-3xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Progresso</p><p className="font-black">{porcentagemSelecionado}%</p></div>
              </div>
              <div className="mx-auto mt-5 h-3 max-w-xl overflow-hidden rounded-full bg-black/20">
                <div className="h-full rounded-full bg-black transition-all" style={{ width: `${porcentagemSelecionado}%` }} />
              </div>
              <button onClick={baixarMaterial} className="mt-5 rounded-full bg-black px-6 py-3 font-black text-white transition hover:scale-[1.02]">Baixar material do curso</button>
            </div>
          </div>

          <div className="space-y-6 p-4 md:p-8">
            {porcentagemSelecionado === 100 && (
              <section className="rounded-[2rem] border border-white/10 bg-white p-5 text-black md:p-6">
                <p className="text-4xl">🏆</p>
                <h2 className="mt-3 text-2xl font-black">Curso concluído!</h2>
                <p className="mt-2 text-sm font-semibold text-zinc-700">Você marcou todas as aulas como concluídas. Futuramente podemos liberar certificado nessa parte.</p>
              </section>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-black p-5">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Resultado esperado</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{selecionado.outcome}</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-black p-5">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Projeto final</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{selecionado.finalProject}</p>
              </div>
            </div>

            {selecionado.modules.map((modulo, moduloIndex) => (
              <section key={modulo.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                <div className="border-b border-white/10 bg-zinc-950 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Módulo {moduloIndex + 1}</p>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">{modulo.title}</h2>
                </div>

                <div className="grid gap-4 p-4 md:p-5">
                  {modulo.lessons.map((aula, aulaIndex) => {
                    const key = lessonKey(selecionado.id, moduloIndex, aulaIndex);
                    const done = progress[selecionado.id]?.includes(key) ?? false;

                    return (
                      <article key={aula.title} className={`rounded-[1.5rem] border p-5 transition ${done ? "border-white/30 bg-white/[0.06]" : "border-white/10 bg-zinc-950"}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-black uppercase text-zinc-500">Aula {aulaIndex + 1}</p>
                            <h3 className="mt-2 text-2xl font-black">{aula.title}</h3>
                          </div>
                          <button onClick={() => toggleLesson(selecionado.id, key)} className={`rounded-full px-4 py-2 text-xs font-black transition ${done ? "bg-white text-black" : "border border-white/10 text-zinc-300 hover:bg-white/10"}`}>
                            {done ? "Concluída ✓" : "Marcar como concluída"}
                          </button>
                        </div>

                        <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                          <div className="rounded-2xl border border-white/10 bg-black p-4">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Explicação</p>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-300">{aula.summary}</p>
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Prática guiada</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-200">{aula.practice}</p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}

            <section className="rounded-[2rem] border border-white/10 bg-black p-5 md:p-6">
              <h2 className="text-2xl font-black">Checklist de conclusão</h2>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {selecionado.checklist.map((item) => (
                  <p key={item} className="rounded-2xl border border-white/10 bg-zinc-950 p-3 text-sm text-zinc-300">✅ {item}</p>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase text-zinc-400">Área do aluno</span>
          <h2 className="mt-5 text-4xl font-black md:text-5xl">Meus cursos</h2>
          <p className="mt-2 max-w-2xl text-zinc-400">Seus cursos ficam organizados aqui. O conteúdo continua salvo no GitHub, simples de editar e rápido de atualizar.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Cursos no app</p><p className="mt-1 text-2xl font-black">{professionalCourses.length}</p></div>
            <div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Liberados</p><p className="mt-1 text-2xl font-black">{professionalCourses.filter((course) => temAcesso(course.id, course.title, course.free)).length}</p></div>
            <div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Status</p><p className="mt-1 text-2xl font-black">{loading ? "Verificando" : "Pronto"}</p></div>
          </div>

          <button onClick={carregarCompras} className="mt-5 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-white/30 hover:bg-white/10">Atualizar acessos</button>
          {loading && <p className="mt-3 text-sm text-zinc-500">Verificando compras aprovadas...</p>}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-4 md:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar curso..."
            className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-white/30"
          />
          <button onClick={() => { setQuery(""); setCategoria("Todos"); }} className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-zinc-300 transition hover:bg-white/10">Limpar filtros</button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categorias.map((item) => (
            <button
              key={item}
              onClick={() => setCategoria(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${categoria === item ? "bg-white text-black" : "border border-zinc-800 bg-black text-zinc-400 hover:border-white/20"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {cursosFiltrados.length === 0 ? (
        <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8 text-center">
          <p className="text-5xl">🔎</p>
          <h3 className="mt-4 text-2xl font-black">Nenhum curso encontrado</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">Tente pesquisar outro nome ou limpar os filtros para ver todos os cursos.</p>
        </section>
      ) : (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cursosFiltrados.map((course) => {
            const acesso = temAcesso(course.id, course.title, course.free);
            const courseProgress = getCourseProgress(course);
            return (
              <button key={course.id} onClick={() => abrirCurso(course)} className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-left transition hover:-translate-y-1 hover:border-white/30 ${!acesso ? "opacity-70" : ""}`}>
                <div className="border-b border-white/10 bg-gradient-to-br from-white via-zinc-100 to-zinc-300 p-5 text-black">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">THKLAYUS COURSE</p>
                      <h3 className="mt-3 text-2xl font-black leading-tight">{course.title}</h3>
                    </div>
                    <p className="text-5xl">{course.hero}</p>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{course.category}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{levelLabel[course.level]}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{courseProgress.total} aulas</span>
                  </div>

                  <p className="text-sm leading-6 text-zinc-400">{course.subtitle}</p>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs font-black text-zinc-500">
                      <span>Progresso</span>
                      <span>{courseProgress.done}/{courseProgress.total} • {courseProgress.percent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-white transition-all" style={{ width: `${courseProgress.percent}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-xs text-zinc-500">Duração</p><p className="font-black">{course.duration}</p></div>
                    <div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-xs text-zinc-500">Preço</p><p className="font-black">{course.price}</p></div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className={`rounded-full px-4 py-2 text-xs font-black ${acesso ? "bg-white text-black" : "border border-amber-800 text-amber-200"}`}>{acesso ? "Continuar" : "Bloqueado"}</span>
                    <span className="text-xs font-bold text-zinc-500">{acesso ? (courseProgress.percent === 100 ? "Concluído" : "Em andamento") : "Aguardando compra"}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </section>
      )}
    </div>
  );
}
