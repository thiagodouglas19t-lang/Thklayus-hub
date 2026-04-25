import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Curso = {
  id: string;
  course_title: string;
  status: string;
};

export default function Estudo() {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    loadCursos();
  }, []);

  async function loadCursos() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { data } = await supabase
      .from("chat_threads")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("type", "purchase");

    if (!data) return;

    setCursos(data.map((item) => ({
      id: item.id,
      course_title: item.course_title,
      status: item.status,
    })));
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-[2rem] p-6">
        <h2 className="text-4xl font-black">Área de Estudo</h2>
        <p className="mt-2 text-zinc-400">Seus cursos liberados aparecem aqui automaticamente após aprovação.</p>
      </div>

      <div className="space-y-4">
        {cursos.length === 0 ? (
          <p className="text-zinc-500">Nenhum curso ainda.</p>
        ) : (
          cursos.map((curso) => (
            <div key={curso.id} className="pro-card rounded-3xl p-6">
              <h3 className="text-xl font-black">{curso.course_title}</h3>

              <p className="mt-2 text-sm text-zinc-500">Status: {curso.status}</p>

              {curso.status === "compra aprovada" ? (
                <button className="pro-button mt-4 rounded-2xl px-5 py-3 font-black">
                  Continuar aula
                </button>
              ) : (
                <p className="mt-4 text-sm text-zinc-400">
                  Aguardando aprovação do pagamento.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
