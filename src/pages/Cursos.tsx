import { useState } from "react";
import CourseCard from "../components/CourseCard";
import ModalPix from "../components/ModalPix";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  pixCode: string;
};

const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Curso de Slides Escolares",
    descricao: "Aprenda a criar apresentações bonitas, organizadas e rápidas para trabalhos escolares.",
    preco: "R$ 9,90",
    aulas: 8,
    nivel: "Iniciante",
    pixCode: "COLE_AQUI_O_PIX_COPIA_E_COLA_DO_CURSO_DE_SLIDES",
  },
  {
    id: 2,
    titulo: "Curso de Trabalhos Escolares",
    descricao: "Monte trabalhos com capa, organização, texto limpo e estrutura fácil de entender.",
    preco: "R$ 14,90",
    aulas: 10,
    nivel: "Básico",
    pixCode: "COLE_AQUI_O_PIX_COPIA_E_COLA_DO_CURSO_DE_TRABALHOS",
  },
  {
    id: 3,
    titulo: "Curso de Design Simples",
    descricao: "Crie artes simples para posts, capas, banners e entregas rápidas sem complicação.",
    preco: "R$ 7,90",
    aulas: 6,
    nivel: "Rápido",
    pixCode: "COLE_AQUI_O_PIX_COPIA_E_COLA_DO_CURSO_DE_DESIGN",
  },
];

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  return (
    <div>
      <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 md:p-8">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">
          Cursos baratos
        </span>

        <h2 className="mt-5 text-4xl font-black md:text-5xl">Cursos do THKLAYUS</h2>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Escolha um curso, pague pelo Pix com valor fixo, envie o comprovante e aguarde a liberação.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {cursos.map((curso) => (
          <CourseCard
            key={curso.id}
            titulo={curso.titulo}
            descricao={curso.descricao}
            preco={curso.preco}
            nivel={curso.nivel}
            aulas={curso.aulas}
            onComprar={() => setCursoSelecionado(curso)}
          />
        ))}
      </div>

      <ModalPix
        open={Boolean(cursoSelecionado)}
        onClose={() => setCursoSelecionado(null)}
        titulo={cursoSelecionado?.titulo ?? ""}
        preco={cursoSelecionado?.preco ?? ""}
        pixCode={cursoSelecionado?.pixCode ?? ""}
      />
    </div>
  );
}
