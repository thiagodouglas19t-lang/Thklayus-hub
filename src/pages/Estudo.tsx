import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { professionalCourses } from "../data/courses";

type Compra = {
  id: string;
  course_id?: string | null;
  course_title?: string | null;
  status: string;
};

export default function Estudo() {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [selecionado, setSelecionado] = useState(professionalCourses[0]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-emerald-950/30 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative">
          <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-4 py-2 text-xs font-black uppercase text-emerald-300">Cursos premium</span>
          <h2 className="mt-5 text-4xl font-black md:text-5xl">Área de Estudo</h2>
          <p className="mt-2 max-w-2xl text-zinc-400">Teste grátis liberado. Cursos pagos só abrem para a conta que comprou e foi aprovada.</p>
          <button onClick={carregarCompras} className="mt-5 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">Atualizar acessos</button>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-4">
          <h3 className="text-xl font-black">Catálogo de cursos</h3>
          <p className="mt-1 text-sm text-zinc-500">Grátis + cursos comprados</p>
          {loading && <p className="mt-3 text-sm text-zinc-500">Verificando compras...</p>}

          <div className="mt-4 space-y-3">
            {professionalCourses.map((course) => {
              const acesso = temAcesso(course.id, course.title, course.free);
              const ativo = selecionado.id === course.id;
              return (
                <button
                  key={course.id}
                  onClick={() => acesso ? setSelecionado(course) : alert("Curso bloqueado. Compre e aguarde aprovação para acessar.")}
                  className={`w-full rounded-[1.5rem] border p-4 text-left transition ${ativo ? "border-white bg-white text-black" : "border-zinc-800 bg-black text-white hover:border-zinc-600"} ${!acesso ? "opacity-60" : ""}`}
                >
                  <p className="text-2xl">{course.hero}</p>
                  <p className="mt-2 font-black">{course.title}</p>
                  <p className="mt-1 text-xs opacity-70">{course.category} • {course.level} • {course.duration}</p>
                  <p className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-black ${acesso ? "border-emerald-700 text-emerald-300" : "border-amber-800 text-amber-200"}`}>{acesso ? course.price === "Grátis" ? "grátis liberado" : "liberado" : course.price}</p>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-zinc-950">
          <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-black via-zinc-950 to-emerald-950/30 p-6 md:p-10">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="relative text-center">
              <p className="text-6xl">{selecionado.hero}</p>
              <p className="mt-4 text-xs font-black uppercase tracking-widest text-emerald-300">{selecionado.category} • {selecionado.level}</p>
              <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{selecionado.title}</h1>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">{selecionado.subtitle}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <span className="rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">⏱️ {selecionado.duration}</span>
                <span className="rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">💰 {selecionado.price}</span>
                <button onClick={baixarMaterial} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Baixar material</button>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-5 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                <p className="text-xs font-black uppercase text-zinc-500">Resultado esperado</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{selecionado.outcome}</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                <p className="text-xs font-black uppercase text-zinc-500">Projeto final</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{selecionado.finalProject}</p>
              </div>
            </div>

            {selecionado.modules.map((modulo, moduloIndex) => (
              <section key={modulo.title} className="rounded-[2rem] border border-zinc-800 bg-black p-5">
                <p className="text-xs font-black uppercase text-emerald-300">Módulo {moduloIndex + 1}</p>
                <h2 className="mt-1 text-2xl font-black">{modulo.title}</h2>
                <div className="mt-5 grid gap-3">
                  {modulo.lessons.map((aula, aulaIndex) => (
                    <div key={aula.title} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <p className="text-xs font-black uppercase text-zinc-500">Aula {aulaIndex + 1}</p>
                      <h3 className="mt-1 font-black">{aula.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{aula.summary}</p>
                      <p className="mt-3 rounded-xl border border-emerald-900 bg-emerald-950/20 p-3 text-sm text-emerald-100">Prática: {aula.practice}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-[2rem] border border-zinc-800 bg-black p-5">
              <h2 className="text-2xl font-black">Checklist de conclusão</h2>
              <div className="mt-4 grid gap-2 md:grid-cols-2">
                {selecionado.checklist.map((item) => <p key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">✅ {item}</p>)}
              </div>
            </section>
          </div>
        </main>
      </section>
    </div>
  );
}
