import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { professionalCourses } from "../data/courses";

type Compra = { id: string; course_id?: string | null; course_title?: string | null; status: string };
type AcessoManual = { id: string; produto_id: string; course_title?: string | null; liberado_em?: string | null; origem?: string | null };
type View = "catalog" | "course";
type Course = (typeof professionalCourses)[number];
type ProgressMap = Record<string, string[]>;
type ActiveLesson = { moduleIndex: number; lessonIndex: number };

const STORAGE_KEY = "thklayus_course_progress_v1";
const LAST_LESSON_KEY = "thklayus_last_lesson_v1";
const levelLabel: Record<string, string> = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };

function countLessons(course: Course) { return course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0); }
function normalize(text?: string | null) { return (text ?? "").toLowerCase().trim(); }
function lessonKey(courseId: string, moduleIndex: number, lessonIndex: number) { return `${courseId}:${moduleIndex}:${lessonIndex}`; }
function readProgress(): ProgressMap { try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : {}; } catch { return {}; } }
function readLastLesson(): Record<string, ActiveLesson> { try { const saved = localStorage.getItem(LAST_LESSON_KEY); return saved ? JSON.parse(saved) : {}; } catch { return {}; } }
function flatLessons(course: Course) { return course.modules.flatMap((modulo, moduleIndex) => modulo.lessons.map((lesson, lessonIndex) => ({ modulo, lesson, moduleIndex, lessonIndex, key: lessonKey(course.id, moduleIndex, lessonIndex) }))); }

export default function Estudo() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [acessosManuais, setAcessosManuais] = useState<AcessoManual[]>([]);
  const [selecionado, setSelecionado] = useState(professionalCourses[0]);
  const [view, setView] = useState<View>("catalog");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [progress, setProgress] = useState<ProgressMap>(() => readProgress());
  const [lastLesson, setLastLesson] = useState<Record<string, ActiveLesson>>(() => readLastLesson());
  const [activeLesson, setActiveLesson] = useState<ActiveLesson>({ moduleIndex: 0, lessonIndex: 0 });
  const [showLessons, setShowLessons] = useState(false);

  const liberadas = useMemo(() => compras.filter((item) => normalize(item.status) === "compra aprovada"), [compras]);
  const manualIds = useMemo(() => new Set(acessosManuais.map((item) => String(item.produto_id))), [acessosManuais]);
  const totalAulas = countLessons(selecionado);
  const concluidasSelecionado = progress[selecionado.id]?.length ?? 0;
  const porcentagemSelecionado = totalAulas > 0 ? Math.round((concluidasSelecionado / totalAulas) * 100) : 0;
  const lessonList = useMemo(() => flatLessons(selecionado), [selecionado]);
  const currentIndex = lessonList.findIndex((item) => item.moduleIndex === activeLesson.moduleIndex && item.lessonIndex === activeLesson.lessonIndex);
  const currentLesson = lessonList[Math.max(0, currentIndex)] ?? lessonList[0];
  const currentDone = currentLesson ? progress[selecionado.id]?.includes(currentLesson.key) ?? false : false;
  const categorias = useMemo(() => ["Todos", "Liberados", "Bloqueados", ...Array.from(new Set(professionalCourses.map((course) => course.category)))], []);

  const cursosFiltrados = useMemo(() => {
    const busca = normalize(query);
    return professionalCourses.filter((course) => {
      const acesso = temAcesso(course.id, course.title, course.free);
      const combinaCategoria = categoria === "Todos" || (categoria === "Liberados" && acesso) || (categoria === "Bloqueados" && !acesso) || course.category === categoria;
      const combinaBusca = !busca || normalize(`${course.id} ${course.title} ${course.subtitle} ${course.category} ${course.level}`).includes(busca);
      return combinaCategoria && combinaBusca;
    });
  }, [categoria, query, compras, acessosManuais]);

  useEffect(() => { carregarCompras(); }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);
  useEffect(() => { localStorage.setItem(LAST_LESSON_KEY, JSON.stringify(lastLesson)); }, [lastLesson]);

  async function carregarCompras() {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setLoading(false); return; }
    const { data: comprasData } = await supabase.from("chat_threads").select("id,course_id,course_title,status").eq("user_id", userData.user.id).eq("type", "purchase");
    const { data: acessosData } = await supabase.from("acessos_cursos").select("id,produto_id,course_title,liberado_em,origem").eq("user_id", userData.user.id);
    setCompras((comprasData ?? []) as Compra[]);
    setAcessosManuais((acessosData ?? []) as AcessoManual[]);
    setLoading(false);
  }

  function temAcesso(courseId: string, title: string, free?: boolean) {
    if (free) return true;
    if (manualIds.has(courseId)) return true;
    return liberadas.some((compra) => compra.course_id === courseId || compra.course_title === title);
  }

  function motivoAcesso(course: Course) {
    if (course.free) return "Curso grátis";
    if (manualIds.has(course.id)) return "Liberado pelo ADM";
    if (liberadas.some((compra) => compra.course_id === course.id || compra.course_title === course.title)) return "Compra aprovada";
    return "Bloqueado";
  }

  function getCourseProgress(course: Course) {
    const total = countLessons(course);
    const done = progress[course.id]?.length ?? 0;
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
    if (!temAcesso(course.id, course.title, course.free)) { alert("Curso bloqueado. Compre ou peça liberação ao ADM."); return; }
    setSelecionado(course);
    const saved = lastLesson[course.id] ?? { moduleIndex: 0, lessonIndex: 0 };
    setActiveLesson(saved);
    setView("course");
    setShowLessons(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function baixarMaterial() {
    const texto = `${selecionado.title}\nID: ${selecionado.id}\n\n${selecionado.subtitle}\n\nObjetivo: ${selecionado.outcome}\n\n${selecionado.modules.map((modulo) => `${modulo.title}\n${modulo.lessons.map((aula, i) => `Aula ${i + 1}: ${aula.title}\n${aula.summary}\nPrática: ${aula.practice}`).join("\n\n")}`).join("\n\n")}\n\nChecklist:\n${selecionado.checklist.map((item) => `- ${item}`).join("\n")}\n\nProjeto final:\n${selecionado.finalProject}\n\nMaterial privado THKLAYUS.`;
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${selecionado.id}-material.txt`; a.click(); URL.revokeObjectURL(url);
  }

  function baixarCertificado() {
    if (porcentagemSelecionado < 100) { alert("Conclua todas as aulas para liberar o certificado."); return; }
    const data = new Date().toLocaleDateString("pt-BR");
    const codigo = `THK-${selecionado.id.toUpperCase()}-${Date.now().toString().slice(-6)}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Certificado</title><style>body{margin:0;font-family:Arial;background:#111;color:#111}.cert{margin:28px auto;padding:48px;max-width:900px;background:white;border:14px solid #111;text-align:center}.tag{letter-spacing:8px;font-weight:900;color:#555}.title{font-size:54px;font-weight:900;margin:28px 0}.course{font-size:34px;font-weight:900;margin:20px 0}.txt{font-size:18px;line-height:1.7;color:#444}.code{margin-top:36px;font-size:13px;color:#666}</style></head><body><div class="cert"><p class="tag">THKLAYUS • APRENDAJÁ</p><div class="title">CERTIFICADO</div><p class="txt">Certificamos que o aluno concluiu com êxito o curso:</p><div class="course">${selecionado.title}</div><p class="txt">Carga estimada: ${selecionado.duration} • Total de aulas: ${totalAulas}<br/>Data de conclusão: ${data}</p><p class="txt">Projeto final: ${selecionado.finalProject}</p><div class="code">Código: ${codigo}<br/>ID do curso: ${selecionado.id}</div></div></body></html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `certificado-${selecionado.id}.html`; a.click(); URL.revokeObjectURL(url);
  }

  const LessonPanel = () => <div className="space-y-3">{selecionado.modules.map((modulo, moduloIndex) => <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-3"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Módulo {moduloIndex + 1}</p><p className="mt-1 text-sm font-black text-zinc-200">{modulo.title}</p><div className="mt-3 space-y-2">{modulo.lessons.map((aula, aulaIndex) => { const key = lessonKey(selecionado.id, moduloIndex, aulaIndex); const done = progress[selecionado.id]?.includes(key) ?? false; const active = activeLesson.moduleIndex === moduloIndex && activeLesson.lessonIndex === aulaIndex; return <button key={aula.title} onClick={() => setLesson(moduloIndex, aulaIndex)} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${active ? "border-white bg-white text-black" : "border-white/10 bg-zinc-950 text-zinc-400"}`}><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[10px] font-black ${done ? "bg-emerald-400 text-black" : active ? "bg-black text-white" : "bg-white/10 text-zinc-500"}`}>{done ? "✓" : aulaIndex + 1}</span><span className="line-clamp-1">{aula.title}</span></button>; })}</div></div>)}</div>;

  if (view === "course") {
    const nextLesson = currentIndex < lessonList.length - 1 ? lessonList[currentIndex + 1] : null;
    return (
      <div className="space-y-4 pb-28">
        <section className="sticky top-[76px] z-30 rounded-[1.5rem] border border-white/10 bg-black/90 p-3 shadow-2xl shadow-black/60 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-2">
            <button onClick={() => setView("catalog")} className="rounded-2xl border border-white/10 px-3 py-3 text-xs font-black text-zinc-300">←</button>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-white">{selecionado.title}</p><div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${porcentagemSelecionado}%` }} /></div></div>
            <button onClick={() => setShowLessons(true)} className="rounded-2xl border border-white/10 px-3 py-3 text-xs font-black text-zinc-300 lg:hidden">Aulas</button>
            <span className="rounded-2xl bg-white px-3 py-3 text-xs font-black text-black">{porcentagemSelecionado}%</span>
          </div>
        </section>

        {showLessons && <div className="fixed inset-0 z-[90] bg-black/80 p-3 backdrop-blur-xl lg:hidden"><div className="mx-auto max-h-[92vh] max-w-lg overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 p-4"><div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black">Aulas do curso</h3><button onClick={() => setShowLessons(false)} className="rounded-2xl bg-white px-4 py-2 font-black text-black">Fechar</button></div><LessonPanel /></div></div>}

        <main className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="hidden rounded-[2rem] border border-white/10 bg-zinc-950 p-4 lg:sticky lg:top-40 lg:block lg:max-h-[72vh] lg:overflow-y-auto"><div className="rounded-[1.5rem] bg-white p-5 text-black"><p className="text-5xl">{selecionado.hero}</p><p className="mt-4 break-all text-xs font-black uppercase tracking-[0.18em] text-zinc-500">ID: {selecionado.id}</p><h1 className="mt-2 text-2xl font-black leading-tight">{selecionado.title}</h1><p className="mt-2 text-sm font-semibold leading-6 text-zinc-700">{selecionado.subtitle}</p></div><div className="mt-4 grid grid-cols-3 gap-2"><div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-[10px] text-zinc-500">Duração</p><p className="text-sm font-black">{selecionado.duration}</p></div><div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-[10px] text-zinc-500">Aulas</p><p className="text-sm font-black">{concluidasSelecionado}/{totalAulas}</p></div><div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-[10px] text-zinc-500">Nível</p><p className="text-sm font-black">{levelLabel[selecionado.level]}</p></div></div><div className="mt-4 grid gap-2"><button onClick={baixarMaterial} className="w-full rounded-2xl bg-white px-5 py-3 font-black text-black">Material</button><button onClick={baixarCertificado} className={`w-full rounded-2xl px-5 py-3 font-black ${porcentagemSelecionado === 100 ? "bg-emerald-400 text-black" : "border border-white/10 text-zinc-500"}`}>Certificado</button></div><h3 className="mt-6 text-lg font-black text-white">Aulas</h3><div className="mt-3"><LessonPanel /></div></aside>

          <section className="space-y-4">
            <div className="rounded-[2rem] border border-white/10 bg-zinc-950 p-4 lg:hidden"><div className="flex items-start gap-3"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl">{selecionado.hero}</div><div className="min-w-0"><p className="break-all text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">ID: {selecionado.id}</p><h1 className="mt-1 text-xl font-black leading-tight">{selecionado.title}</h1><p className="mt-1 text-xs leading-5 text-zinc-500">{selecionado.duration} • {levelLabel[selecionado.level]} • {concluidasSelecionado}/{totalAulas} aulas</p></div></div></div>
            {porcentagemSelecionado === 100 && <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 p-5"><p className="text-4xl">🏆</p><h2 className="mt-3 text-2xl font-black text-emerald-100">Curso concluído!</h2><p className="mt-2 text-sm text-emerald-100/70">Certificado liberado.</p><button onClick={baixarCertificado} className="mt-4 rounded-2xl bg-emerald-400 px-5 py-3 font-black text-black">Baixar certificado</button></div>}
            {currentLesson && <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40"><div className="border-b border-white/10 bg-white p-5 text-black md:p-7"><p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Módulo {currentLesson.moduleIndex + 1} • Aula {currentLesson.lessonIndex + 1} de {lessonList.length}</p><h2 className="mt-3 text-3xl font-black leading-tight md:text-6xl">{currentLesson.lesson.title}</h2><p className="mt-3 text-sm font-semibold text-zinc-600">{currentLesson.modulo.title}</p></div><div className="grid gap-3 p-4 md:p-6"><section className="rounded-[1.5rem] border border-white/10 bg-black p-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">📖 Explicação</p><p className="mt-4 whitespace-pre-wrap text-base leading-8 text-zinc-200">{currentLesson.lesson.summary}</p></section><div className="grid gap-3 md:grid-cols-2"><section className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">🧪 Prática guiada</p><p className="mt-4 text-sm leading-7 text-emerald-50/90">{currentLesson.lesson.practice}</p></section><section className="rounded-[1.5rem] border border-blue-400/20 bg-blue-500/10 p-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">🚀 Próximo passo</p><p className="mt-4 text-sm leading-7 text-blue-50/90">{nextLesson ? `Depois desta aula, siga para: ${nextLesson.lesson.title}.` : "Finalize o projeto final e baixe seu certificado."}</p></section></div><section className="rounded-[1.5rem] border border-amber-400/20 bg-amber-500/10 p-5"><p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">🎯 Resultado esperado</p><p className="mt-4 text-sm leading-7 text-amber-50/90">{selecionado.outcome}</p></section><div className="hidden gap-3 sm:grid sm:grid-cols-3"><button onClick={() => currentIndex > 0 && setLesson(lessonList[currentIndex - 1].moduleIndex, lessonList[currentIndex - 1].lessonIndex)} disabled={currentIndex <= 0} className="rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300 disabled:opacity-40">Anterior</button><button onClick={() => toggleLesson(selecionado.id, currentLesson.key)} className={`rounded-2xl px-5 py-4 font-black ${currentDone ? "bg-emerald-400 text-black" : "bg-white text-black"}`}>{currentDone ? "Concluída ✓" : "Marcar concluída"}</button><button onClick={concluirEProxima} className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-5 py-4 font-black text-blue-100">{currentIndex >= lessonList.length - 1 ? "Finalizar" : "Próxima aula"}</button></div></div></article>}
            <section className="grid gap-3 md:grid-cols-2"><div className="rounded-[1.6rem] border border-white/10 bg-black p-5"><p className="text-xs font-black uppercase tracking-widest text-zinc-500">Projeto final</p><p className="mt-3 text-sm leading-7 text-zinc-300">{selecionado.finalProject}</p></div><div className="rounded-[1.6rem] border border-white/10 bg-black p-5"><p className="text-xs font-black uppercase tracking-widest text-zinc-500">Checklist</p><div className="mt-3 space-y-2">{selecionado.checklist.map((item) => <p key={item} className="text-sm text-zinc-300">✓ {item}</p>)}</div></div></section>
          </section>
        </main>
        {currentLesson && <div className="fixed bottom-[92px] left-3 right-3 z-40 rounded-[1.5rem] border border-white/10 bg-black/90 p-2 shadow-2xl shadow-black/80 backdrop-blur-2xl lg:hidden"><div className="grid grid-cols-[0.8fr_1.25fr_1.25fr] gap-2"><button onClick={() => setShowLessons(true)} className="rounded-xl border border-white/10 px-3 py-3 text-xs font-black text-zinc-300">Aulas</button><button onClick={() => toggleLesson(selecionado.id, currentLesson.key)} className="rounded-xl bg-white px-3 py-3 text-xs font-black text-black">{currentDone ? "Feita ✓" : "Concluir"}</button><button onClick={concluirEProxima} className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-3 py-3 text-xs font-black text-blue-100">Próxima</button></div></div>}
      </div>
    );
  }

  const liberadosCount = professionalCourses.filter((course) => temAcesso(course.id, course.title, course.free)).length;
  const manuaisCount = professionalCourses.filter((course) => manualIds.has(course.id)).length;
  return <div className="space-y-6"><section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 p-6 md:p-8"><div className="relative"><span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-black uppercase text-zinc-400">Área do aluno</span><h2 className="mt-5 text-4xl font-black md:text-5xl">Meus cursos liberados</h2><p className="mt-2 max-w-2xl text-zinc-400">Cursos grátis, compras aprovadas e acessos liberados manualmente pelo ADM aparecem aqui.</p><div className="mt-6 grid gap-3 sm:grid-cols-4"><div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Cursos no app</p><p className="mt-1 text-2xl font-black">{professionalCourses.length}</p></div><div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Liberados</p><p className="mt-1 text-2xl font-black">{liberadosCount}</p></div><div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Manuais ADM</p><p className="mt-1 text-2xl font-black">{manuaisCount}</p></div><div className="rounded-3xl border border-white/10 bg-black p-4"><p className="text-xs font-bold text-zinc-500">Status</p><p className="mt-1 text-2xl font-black">{loading ? "Verificando" : "Pronto"}</p></div></div><button onClick={carregarCompras} className="mt-5 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300 transition hover:border-white/30 hover:bg-white/10">Atualizar acessos</button></div></section><section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-4 md:p-5"><div className="grid gap-3 md:grid-cols-[1fr_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar por nome ou ID do curso..." className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><button onClick={() => { setQuery(""); setCategoria("Todos"); }} className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-black text-zinc-300 transition hover:bg-white/10">Limpar filtros</button></div><div className="mt-4 flex gap-2 overflow-x-auto pb-1">{categorias.map((item) => <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${categoria === item ? "bg-white text-black" : "border border-zinc-800 bg-black text-zinc-400 hover:border-white/20"}`}>{item}</button>)}</div></section>{cursosFiltrados.length === 0 ? <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-8 text-center"><p className="text-5xl">🔎</p><h3 className="mt-4 text-2xl font-black">Nenhum curso encontrado</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">Tente pesquisar outro nome ou limpar os filtros.</p></section> : <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{cursosFiltrados.map((course) => { const acesso = temAcesso(course.id, course.title, course.free); const courseProgress = getCourseProgress(course); return <button key={course.id} onClick={() => abrirCurso(course)} className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-left transition hover:-translate-y-1 hover:border-white/30 ${!acesso ? "opacity-70" : ""}`}><div className="border-b border-white/10 bg-gradient-to-br from-white via-zinc-100 to-zinc-300 p-5 text-black"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">ID: {course.id}</p><h3 className="mt-3 text-2xl font-black leading-tight">{course.title}</h3></div><p className="text-5xl">{course.hero}</p></div></div><div className="space-y-4 p-5"><div className="flex flex-wrap gap-2"><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{course.category}</span><span className="rounded-full border border-white/10 px-3 py-1 text-xs font-black text-zinc-300">{levelLabel[course.level]}</span><span className={`rounded-full px-3 py-1 text-xs font-black ${acesso ? "bg-white text-black" : "border border-amber-800 text-amber-200"}`}>{motivoAcesso(course)}</span></div><p className="text-sm leading-6 text-zinc-400">{course.subtitle}</p><div><div className="mb-2 flex items-center justify-between text-xs font-black text-zinc-500"><span>Progresso</span><span>{courseProgress.done}/{courseProgress.total} • {courseProgress.percent}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${courseProgress.percent}%` }} /></div></div><div className="grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-xs text-zinc-500">Duração</p><p className="font-black">{course.duration}</p></div><div className="rounded-2xl border border-white/10 bg-black p-3"><p className="text-xs text-zinc-500">Preço</p><p className="font-black">{course.price}</p></div></div><div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4"><span className={`rounded-full px-4 py-2 text-xs font-black ${acesso ? "bg-white text-black" : "border border-amber-800 text-amber-200"}`}>{acesso ? (courseProgress.percent > 0 ? "Continuar" : "Começar") : "Bloqueado"}</span><span className="text-xs font-bold text-zinc-500">{acesso ? (courseProgress.percent === 100 ? "Concluído" : "Em andamento") : "Peça liberação"}</span></div></div></button>; })}</section>}</div>;
}
