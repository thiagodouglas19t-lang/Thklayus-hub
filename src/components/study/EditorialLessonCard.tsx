type LessonCardProps = {
  title: string;
  moduleTitle: string;
  summary: string;
  practice: string;
  next?: string | null;
  outcome: string;
};

export default function EditorialLessonCard({
  title,
  moduleTitle,
  summary,
  practice,
  next,
  outcome,
}: LessonCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#050507] shadow-2xl shadow-black/50">
      {/* Header editorial */}
      <div className="border-b border-white/10 bg-gradient-to-br from-[#0a0a0f] to-black p-6 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#d6b36a]">
          {moduleTitle}
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight text-white md:text-6xl">
          {title}
        </h1>
        <div className="mt-4 h-[1px] w-24 bg-[#d6b36a]/40" />
      </div>

      {/* Conteúdo */}
      <div className="space-y-6 p-5 md:p-8">
        <section className="max-w-3xl">
          <p className="text-lg leading-9 text-zinc-200 first-letter:mr-2 first-letter:text-5xl first-letter:font-black first-letter:text-[#d6b36a]">
            {summary}
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              Prática
            </p>
            <p className="mt-3 text-sm leading-7 text-emerald-50/90">
              {practice}
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-blue-400/20 bg-blue-500/10 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">
              Próximo passo
            </p>
            <p className="mt-3 text-sm leading-7 text-blue-50/90">
              {next || "Finalize o projeto e avance."}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#d6b36a]/30 bg-[#d6b36a]/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#d6b36a]">
            Resultado esperado
          </p>
          <p className="mt-3 text-sm leading-7 text-zinc-200">
            {outcome}
          </p>
        </div>
      </div>
    </article>
  );
}
