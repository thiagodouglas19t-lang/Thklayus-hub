import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Curso = {
  id: string;
  course_id?: string | null;
  course_title: string;
  status: string;
};

const aulasBase = [
  "Boas-vindas e como usar o curso",
  "Conceitos principais explicados do zero",
  "Passo a passo prático",
  "Exemplo real para copiar e adaptar",
  "Checklist final e próximos passos",
];

function materialDoCurso(titulo: string) {
  const nome = titulo || "Curso THKLAYUS";
  return {
    resumo: `Material inicial de ${nome}. Use este curso para aprender o básico, praticar e aplicar em situações reais.`,
    checklist: [
      "Assista/Leia a aula 1 antes de pular etapas",
      "Faça o exemplo prático",
      "Anote dúvidas para mandar no chat",
      "Use o checklist final antes de concluir",
    ],
    projeto: `Projeto final: crie uma entrega simples usando o que aprendeu em ${nome}.`,
  };
}

export default function Estudo() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selecionado, setSelecionado] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

  const liberados = useMemo(() => cursos.filter((curso) => curso.status === "compra aprovada"), [cursos]);
  const pendentes = useMemo(() => cursos.filter((curso) => curso.status !== "compra aprovada"), [cursos]);
  const material = materialDoCurso(selecionado?.course_title || "");

  useEffect(() => {
    loadCursos();
  }, []);

  async function loadCursos() {
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
      .eq("type", "purchase")
      .order("created_at", { ascending: false });

    setCursos((data ?? []) as Curso[]);
    setLoading(false);
  }

  function copiarMaterial() {
    if (!selecionado) return;
    const texto = `${selecionado.course_title}\n\n${material.resumo}\n\nAulas:\n${aulasBase.map((aula, i) => `${i + 1}. ${aula}`).join("\n")}\n\nChecklist:\n${material.checklist.map((item) => `- ${item}`).join("\n")}\n\n${material.projeto}`;
    navigator.clipboard.writeText(texto);
    alert("Material copiado!");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6">
        <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-4 py-2 text-xs font-black uppercase text-emerald-300">Entrega automática</span>
        <h2 className="mt-5 text-4xl font-black">Área de Estudo</h2>
        <p className="mt-2 text-zinc-400">Quando o ADM aprova a compra, o curso aparece aqui automaticamente.</p>
        <button onClick={loadCursos} className="mt-4 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">Atualizar meus cursos</button>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">Carregando cursos...</div>
      ) : cursos.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">Nenhuma compra encontrada ainda.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-4">
            <h3 className="text-xl font-black">Meus cursos</h3>
            <p className="mt-1 text-sm text-zinc-500">Liberados: {liberados.length} • Pendentes: {pendentes.length}</p>

            <div className="mt-4 space-y-3">
              {cursos.map((curso) => {
                const ativo = selecionado?.id === curso.id;
                const liberado = curso.status === "compra aprovada";
                return (
                  <button key={curso.id} onClick={() => liberado ? setSelecionado(curso) : null} className={`w-full rounded-2xl border p-4 text-left ${ativo ? "border-white bg-white text-black" : "border-zinc-800 bg-black text-white"} ${!liberado ? "opacity-60" : ""}`}>
                    <p className="font-black">{curso.course_title}</p>
                    <p className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-black ${liberado ? "border-emerald-700 text-emerald-300" : "border-amber-800 text-amber-200"}`}>{liberado ? "liberado" : curso.status}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[2rem] border border-zinc-800 bg-zinc-950 p-5">
            {!selecionado ? (
              <div className="flex min-h-96 flex-col items-center justify-center text-center text-zinc-500">
                <p className="text-5xl">🎓</p>
                <p className="mt-3 font-bold">Selecione um curso liberado</p>
                <p className="mt-1 text-sm">Cursos em análise aparecem na lista, mas só abrem depois da aprovação.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-black uppercase text-emerald-300">Curso liberado</p>
                  <h3 className="mt-1 text-3xl font-black">{selecionado.course_title}</h3>
                  <p className="mt-2 text-zinc-400">{material.resumo}</p>
                </div>

                <div className="grid gap-3">
                  {aulasBase.map((aula, index) => (
                    <div key={aula} className="rounded-2xl border border-zinc-800 bg-black p-4">
                      <p className="text-xs font-black uppercase text-zinc-500">Aula {index + 1}</p>
                      <h4 className="mt-1 font-black">{aula}</h4>
                      <p className="mt-2 text-sm text-zinc-400">Conteúdo liberado automaticamente após aprovação do pagamento.</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                    <h4 className="font-black">Checklist</h4>
                    <div className="mt-3 space-y-2">
                      {material.checklist.map((item) => <p key={item} className="text-sm text-zinc-400">✅ {item}</p>)}
                    </div>
                  </div>
                  <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                    <h4 className="font-black">Projeto final</h4>
                    <p className="mt-3 text-sm text-zinc-400">{material.projeto}</p>
                  </div>
                </div>

                <button onClick={copiarMaterial} className="w-full rounded-2xl bg-white py-3 font-black text-black">Copiar material do curso</button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
