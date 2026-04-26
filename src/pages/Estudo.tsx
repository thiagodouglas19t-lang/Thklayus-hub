import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type Curso = {
  id: string;
  course_id?: string | null;
  course_title: string;
  status: string;
};

type Modulo = {
  nome: string;
  aulas: string[];
};

function planoDoCurso(titulo: string) {
  const nome = titulo || "Curso THKLAYUS";
  const lower = nome.toLowerCase();

  let foco = "habilidade digital";
  if (lower.includes("powerpoint") || lower.includes("slide") || lower.includes("apresent")) foco = "apresentações profissionais";
  if (lower.includes("canva") || lower.includes("design") || lower.includes("arte")) foco = "design visual";
  if (lower.includes("excel") || lower.includes("financeira") || lower.includes("dinheiro")) foco = "organização com números";
  if (lower.includes("segurança") || lower.includes("golpe") || lower.includes("senha")) foco = "segurança digital";
  if (lower.includes("currículo") || lower.includes("emprego") || lower.includes("cliente")) foco = "carreira e atendimento";

  const modulos: Modulo[] = [
    {
      nome: "Módulo 1 • Fundamento profissional",
      aulas: [
        `O que é ${foco} e por que isso importa`,
        "Erros comuns de iniciantes",
        "Como organizar seu ambiente antes de começar",
      ],
    },
    {
      nome: "Módulo 2 • Prática guiada",
      aulas: [
        `Passo a passo para aplicar ${foco}`,
        "Exemplo ruim vs exemplo bom",
        "Checklist de qualidade antes de entregar",
      ],
    },
    {
      nome: "Módulo 3 • Aplicação real",
      aulas: [
        "Criando um projeto simples do zero",
        "Como revisar e melhorar o resultado",
        "Projeto final para provar que aprendeu",
      ],
    },
  ];

  return {
    foco,
    descricao: `${nome} é uma sala de estudo privada do THKLAYUS. O conteúdo foi montado para o aluno aprender com explicação simples, prática e entrega final.`,
    objetivo: `Ao final, o aluno deve conseguir aplicar ${foco} em uma situação real, com mais segurança e organização.`,
    modulos,
    checklist: [
      "Ler a aula inteira antes de copiar qualquer coisa",
      "Fazer o exercício de cada módulo",
      "Comparar seu resultado com o checklist de qualidade",
      "Mandar dúvida no chat se travar",
      "Finalizar o projeto final",
    ],
    exercicio: `Crie uma entrega simples usando ${foco}. Depois revise: clareza, organização, aparência e utilidade.`,
  };
}

function gerarTextoArquivo(curso: Curso) {
  const plano = planoDoCurso(curso.course_title);
  return `${curso.course_title}\nTHKLAYUS • Material privado do aluno\n\n${plano.descricao}\n\nObjetivo:\n${plano.objetivo}\n\n${plano.modulos
    .map((modulo) => `${modulo.nome}\n${modulo.aulas.map((aula, index) => `Aula ${index + 1}: ${aula}`).join("\n")}`)
    .join("\n\n")}\n\nChecklist:\n${plano.checklist.map((item) => `- ${item}`).join("\n")}\n\nExercício final:\n${plano.exercicio}\n\nAviso: este material é liberado somente para a conta que comprou o curso.`;
}

export default function Estudo() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [selecionado, setSelecionado] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);

  const liberados = useMemo(() => cursos.filter((curso) => curso.status === "compra aprovada"), [cursos]);
  const pendentes = useMemo(() => cursos.filter((curso) => curso.status !== "compra aprovada"), [cursos]);
  const plano = planoDoCurso(selecionado?.course_title || "");

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

  function baixarMaterial() {
    if (!selecionado) return;
    const blob = new Blob([gerarTextoArquivo(selecionado)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selecionado.course_title.replaceAll(" ", "-").toLowerCase()}-thklayus.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 via-black to-emerald-950/20 p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative">
          <span className="rounded-full border border-emerald-900 bg-emerald-950/30 px-4 py-2 text-xs font-black uppercase text-emerald-300">Sala privada</span>
          <h2 className="mt-5 text-4xl font-black md:text-5xl">Área de Estudo</h2>
          <p className="mt-2 max-w-2xl text-zinc-400">Cursos comprados ficam dentro da sua conta. Não existe link público para compartilhar.</p>
          <button onClick={loadCursos} className="mt-5 rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">Atualizar meus cursos</button>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-900 bg-amber-950/20 p-4 text-sm leading-6 text-amber-100">
        🔒 Acesso protegido: o curso só aparece para a conta que comprou e foi aprovada. O material baixado é gerado dentro do app, não por link público.
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
                  <button key={curso.id} onClick={() => liberado ? setSelecionado(curso) : null} className={`w-full rounded-[1.5rem] border p-4 text-left transition ${ativo ? "border-white bg-white text-black" : "border-zinc-800 bg-black text-white hover:border-zinc-600"} ${!liberado ? "opacity-60" : ""}`}>
                    <p className="text-xs font-black uppercase opacity-60">{liberado ? "Acesso liberado" : "Bloqueado"}</p>
                    <p className="mt-1 font-black">{curso.course_title}</p>
                    <p className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-black ${liberado ? "border-emerald-700 text-emerald-300" : "border-amber-800 text-amber-200"}`}>{liberado ? "entrar" : curso.status}</p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950">
            {!selecionado ? (
              <div className="flex min-h-96 flex-col items-center justify-center p-6 text-center text-zinc-500">
                <p className="text-5xl">🎓</p>
                <p className="mt-3 font-bold">Selecione um curso liberado</p>
                <p className="mt-1 text-sm">Cursos em análise aparecem na lista, mas só abrem depois da aprovação.</p>
              </div>
            ) : (
              <div>
                <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-black to-emerald-950/30 p-6 md:p-8">
                  <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
                  <div className="relative">
                    <p className="text-xs font-black uppercase text-emerald-300">Curso profissional liberado</p>
                    <h3 className="mt-2 text-3xl font-black md:text-5xl">{selecionado.course_title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">{plano.descricao}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button onClick={baixarMaterial} className="rounded-2xl bg-white px-5 py-3 font-black text-black">Baixar material</button>
                      <span className="rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-black text-zinc-300">🔒 Sem link público</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5 p-5 md:p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                      <p className="text-xs font-black uppercase text-zinc-500">Objetivo</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">{plano.objetivo}</p>
                    </div>
                    <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                      <p className="text-xs font-black uppercase text-zinc-500">Projeto final</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">{plano.exercicio}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plano.modulos.map((modulo, moduloIndex) => (
                      <div key={modulo.nome} className="rounded-3xl border border-zinc-800 bg-black p-5">
                        <p className="text-xs font-black uppercase text-emerald-300">Módulo {moduloIndex + 1}</p>
                        <h4 className="mt-1 text-xl font-black">{modulo.nome}</h4>
                        <div className="mt-4 grid gap-3">
                          {modulo.aulas.map((aula, aulaIndex) => (
                            <div key={aula} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                              <p className="text-xs font-black uppercase text-zinc-500">Aula {aulaIndex + 1}</p>
                              <p className="mt-1 font-bold">{aula}</p>
                              <p className="mt-2 text-sm leading-6 text-zinc-400">Estude a explicação, faça o exercício e avance para a próxima aula.</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-zinc-800 bg-black p-5">
                    <h4 className="text-xl font-black">Checklist de conclusão</h4>
                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      {plano.checklist.map((item) => <p key={item} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">✅ {item}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
