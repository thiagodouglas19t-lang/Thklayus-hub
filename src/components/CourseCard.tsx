type CourseCardProps = {
  titulo: string;
  descricao: string;
  preco: string;
  nivel: string;
  aulas: number;
  onComprar: () => void;
};

export default function CourseCard({
  titulo,
  descricao,
  preco,
  nivel,
  aulas,
  onComprar,
}: CourseCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:scale-[1.02]">
      <p className="text-xs font-black uppercase text-zinc-500">
        {nivel} • {aulas} aulas
      </p>

      <h3 className="mt-3 text-2xl font-black">{titulo}</h3>

      <p className="mt-3 text-sm text-zinc-400">
        {descricao}
      </p>

      <p className="mt-6 text-3xl font-black">
        {preco}
      </p>

      <button
        onClick={onComprar}
        className="mt-5 w-full rounded-2xl bg-white py-3 font-black text-black transition hover:opacity-90"
      >
        Comprar curso
      </button>
    </div>
  );
}
