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

export default function Estudo() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [selecionado, setSelecionado] = useState(professionalCourses[0]);
  const [view, setView] = useState<View>("catalog");
  const [loading, setLoading] = useState(true);
  const totalAulas = selecionado.modules.reduce((total, modulo) => total + modulo.lessons.length, 0);

  const liberadas = useMemo(() => compras.filter((item) => item.status === "compra aprovada"), [compras]);

  useEffect(() => {
    carregarCompras();
  }, []);

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

  function abrirCurso(course: (typeof professionalCourses)[number]) {
    const acesso = temAcesso(course.id, course.title, course.free);
    if (!acesso) {
      alert("Curso bloqueado. Compre e aguarde aprovação para acessar.");
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
        <button onClick={() => setView("catalog")} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-zinc-300">
          ← Voltar para cursos
        </button>

        <main className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 shadow-2xl">
          <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-100 via-white to-violet-100 p-6 text-black md:p-10">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-300/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-300/60 blur-3xl" />

            <div className="relative mx-auto max-w-4xl text-center">
              <p className="text-7xl md:text-8xl">{selecionado.hero}</p>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.35em] text-zinc-600">{selecionado.category} • {selecionado.level}</p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-7xl">{selecionado.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-700 md:text-lg">{selecionado.subtitle}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Duração</p><p className="font-black">{selecionado.duration}</p></div>
                <div className="rounded-3xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Aulas</p><p className="font-black">{totalAulas}</p></div>
                <div className="rounded-3xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Acesso</p><p className="font-black">Privado</p></div>
              </div>
              <button onClick={baixarMaterial} className="mt-5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 px-6 py-3 font-black text-black">Baixar material</button>
            </div>
          </div>

          <div className="space-y-6 p-4 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-cyan-900/50 bg-cyan-950/20 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Resultado esperado</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{selecionado.outcome}</p>
              </div>
              <div className="rounded-[2rem] border border-violet-900/50 bg-violet-950/20 p-5">
                <p className="text-xs font-black uppercase tracking-widest text-violet-300">Projeto final</p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{selecionado.finalProject}</p>
              </div>
            </div>

            {selecionado.modules.map((modulo, moduloIndex) => (
              <section key={modulo.title} className="overflow-hidden rounded-[2rem] border border-white/10 bg-black">
                <div className="border-b border-white/10 bg-gradient-to-r from-emerald-950/40 via-black to-cyan-950/30 p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Módulo {moduloIndex + 1}</p>
                  <h2 className="mt-2 text-2xl font-black md:text-3xl">{modulo.title}</h2>
                </div>

                <div className="grid gap-4 p-4 md:p-5">
                  {modulo.lessons.map((aula, aulaIndex) => (
                    <article key={aula.title} className="rounded-[1.5rem] border border-white/10 bg-zinc-950 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase text-zinc-500">Aula {aulaIndex + 1}</p>
                          <h3 className="mt-2 text-2xl font-black">{aula.title}</h3>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-black">Leitura + prática</span>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                        <div className="rounded-2xl border border-white/10 bg-black p-4">
                          <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Explicação</p>
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-zinc-300">{aula.summary}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-900/70 bg-emerald-950/20 p-4">
                          <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Prática guiada</p>
                          <p className="mt-3 text-sm leading-7 text-emerald-100">{aula.practice}</p>
                        </div>
                      </div>
                    </article>
                  ))}
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
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-black to-emerald-950/30 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative">
          <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-4 py-2 text-xs font-black uppercase text-emerald-300">Vitrine de cursos</span>
          <h2 className="mt-5 text-4xl font-black md:text-5xl">Escolha seu curso</h2>
          <p className="mt-2 max-w-2xl text-zinc-400">Clique em um curso liberado para abrir a página própria dele. O curso gratuito fica liberado para teste.</p>
          <button onClick={carregarCompras} className="mt-5 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">Atualizar acessos</button>
          {loading && <p className="mt-3 text-sm text-zinc-500">Verificando compras...</p>}
        </div>
      </section>

      <section className="grid gap-6">
        {professionalCourses.map((course) => {
          const acesso = temAcesso(course.id, course.title, course.free);
          return (
            <button key={course.id} onClick={() => abrirCurso(course)} className={`group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 text-left transition hover:-translate-y-1 hover:border-cyan-300/60 ${!acesso ? "opacity-60" : ""}`}>
              <div className="aspect-[16/9] bg-gradient-to-br from-cyan-100 via-white to-violet-200 p-5 text-black md:p-10">
                <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-black/10 bg-white/70 p-5 shadow-2xl backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">THKLAYUS COURSE</p>
                      <h3 className="mt-3 max-w-xl text-3xl font-black leading-tight md:text-5xl">{course.title}</h3>
                    </div>
                    <p className="text-5xl md:text-7xl">{course.hero}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Nível</p><p className="font-black">{course.level}</p></div>
                    <div className="rounded-2xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Tempo</p><p className="font-black">{course.duration}</p></div>
                    <div className="rounded-2xl bg-black p-4 text-white"><p className="text-xs text-zinc-400">Preço</p><p className="font-black">{course.price}</p></div>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{course.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{course.subtitle}</p>
                  </div>
                  <span className={`rounded-full border px-4 py-2 text-xs font-black ${acesso ? "border-emerald-700 text-emerald-300" : "border-amber-800 text-amber-200"}`}>{acesso ? "Abrir curso" : "Bloqueado"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
