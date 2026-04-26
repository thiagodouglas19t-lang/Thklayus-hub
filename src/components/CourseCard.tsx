type CourseCardProps = {
  titulo: string;
  descricao: string;
  preco: string;
  nivel: string;
  aulas: number;
  onComprar: () => void;
};

function iconByTitle(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("canva") || lower.includes("arte") || lower.includes("design")) return "🎨";
  if (lower.includes("excel") || lower.includes("financeira") || lower.includes("dinheiro")) return "💰";
  if (lower.includes("segurança") || lower.includes("golpe") || lower.includes("senha")) return "🛡️";
  if (lower.includes("slide") || lower.includes("powerpoint") || lower.includes("apresent")) return "📊";
  if (lower.includes("emprego") || lower.includes("currículo") || lower.includes("cliente")) return "💼";
  return "💻";
}

export default function CourseCard({ titulo, descricao, preco, nivel, aulas, onComprar }: CourseCardProps) {
  return (
    <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl transition hover:-translate-y-1 hover:border-emerald-400/50">
      <div className="relative min-h-44 overflow-hidden bg-gradient-to-br from-cyan-200 via-white to-violet-200 p-5 text-black">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/60 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-300/70 blur-2xl" />
        <div className="relative flex h-full flex-col justify-between rounded-3xl border border-black/10 bg-white/70 p-4 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <p className="text-5xl">{iconByTitle(titulo)}</p>
            <span className="rounded-full bg-black px-3 py-1 text-xs font-black text-white">{nivel}</span>
          </div>
          <h3 className="mt-6 text-2xl font-black leading-tight">{titulo}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-300">{aulas} aulas • acesso privado</p>
        <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{descricao}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-3xl font-black">{preco}</p>
          <button onClick={onComprar} className="rounded-2xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-5 py-3 font-black text-black transition active:scale-95">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
