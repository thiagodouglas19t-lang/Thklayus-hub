import { useState } from "react";

type CursoComprado = {
  id: number;
  titulo: string;
  status: "aguardando" | "liberado";
};

export default function Estudo() {
  const [cursos] = useState<CursoComprado[]>([
    {
      id: 1,
      titulo: "Curso de Slides",
      status: "liberado",
    },
    {
      id: 2,
      titulo: "Curso de Trabalhos",
      status: "aguardando",
    },
  ]);

  return (
    <div>
      <h2 className="text-3xl font-black">Área de Estudo</h2>

      <div className="mt-6 space-y-4">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <h3 className="text-xl font-black">{curso.titulo}</h3>

            <p className="mt-2 text-sm text-zinc-500">
              Status: {curso.status}
            </p>

            {curso.status === "liberado" ? (
              <button className="mt-4 rounded-2xl bg-white px-5 py-3 font-black text-black">
                Continuar aula
              </button>
            ) : (
              <p className="mt-4 text-sm text-zinc-400">
                Aguardando liberação pelo ADM.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
