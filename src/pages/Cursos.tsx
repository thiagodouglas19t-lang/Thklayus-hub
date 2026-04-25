type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
};

const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Curso de Slides Escolares",
    descricao: "Aprenda a criar apresentações bonitas e organizadas.",
    preco: "R$ 9,90",
    aulas: 8,
    nivel: "Iniciante",
  },
  {
    id: 2,
    titulo: "Curso de Trabalhos Escolares",
    descricao: "Aprenda a montar trabalhos escolares do jeito certo.",
    preco: "R$ 14,90",
    aulas: 10,
    nivel: "Básico",
  },
  {
    id: 3,
    titulo: "Curso de Design Simples",
    descricao: "Crie artes simples para posts, capas e banners.",
    preco: "R$ 7,90",
    aulas: 6,
    nivel: "Rápido",
  },
];

export default function Cursos() {
  return (
    <div>
      <h2 className="text-3xl font-black">Cursos</h2>
      <p className="mt-2 text-zinc-400">
        Cursos baratos com pagamento por Pix.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {cursos.map((curso) => (
          <div
            key={curso.id}
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
          >
            <p className="text-xs font-black uppercase text-zinc-500">
              {curso.nivel} • {curso.aulas} aulas
            </p>

            <h3 className="mt-3 text-2xl font-black">{curso.titulo}</h3>

            <p className="mt-3 text-sm text-zinc-400">{curso.descricao}</p>

            <p className="mt-6 text-3xl font-black">{curso.preco}</p>

            <button className="mt-5 w-full rounded-2xl bg-white py-3 font-black text-black">
              Comprar curso
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
