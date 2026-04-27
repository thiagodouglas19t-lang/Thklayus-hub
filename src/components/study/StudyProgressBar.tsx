type StudyProgressBarProps = {
  title: string;
  percent: number;
  completedLessons: number;
  totalLessons: number;
  onBack: () => void;
  onOpenLessons: () => void;
};

export default function StudyProgressBar({
  title,
  percent,
  completedLessons,
  totalLessons,
  onBack,
  onOpenLessons,
}: StudyProgressBarProps) {
  const safePercent = Math.min(100, Math.max(0, percent));

  return (
    <section className="sticky top-[76px] z-30 overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/90 p-3 shadow-2xl shadow-black/70 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.16),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(124,58,237,0.12),transparent_28%)]" />
      <div className="relative flex items-center justify-between gap-2">
        <button
          onClick={onBack}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-black text-zinc-300 transition hover:border-[#d6b36a]/40 hover:text-white active:scale-95"
        >
          ←
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-xs font-black uppercase tracking-[0.18em] text-[#d6b36a]">AprendaJá • Aula</p>
            <p className="hidden text-[11px] font-black uppercase tracking-[0.14em] text-zinc-500 sm:block">
              {completedLessons}/{totalLessons} aulas
            </p>
          </div>
          <p className="mt-1 truncate text-sm font-black text-white">{title}</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d6b36a] via-white to-[#d6b36a] transition-all duration-500"
              style={{ width: `${safePercent}%` }}
            />
          </div>
        </div>

        <button
          onClick={onOpenLessons}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-xs font-black text-zinc-300 transition hover:border-[#d6b36a]/40 hover:text-white active:scale-95 lg:hidden"
        >
          Aulas
        </button>

        <span className="grid h-11 min-w-11 place-items-center rounded-2xl bg-white px-3 text-xs font-black text-black shadow-lg shadow-white/10">
          {safePercent}%
        </span>
      </div>
    </section>
  );
}
