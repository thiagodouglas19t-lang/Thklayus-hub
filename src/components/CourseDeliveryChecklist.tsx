import { useEffect, useMemo, useState } from "react";

type CourseDeliveryChecklistProps = {
  courseId: string;
  items: string[];
};

type ChecklistProgress = Record<string, string[]>;

const STORAGE_KEY = "thklayus_delivery_checklist_v1";

function readChecklistProgress(): ChecklistProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function CourseDeliveryChecklist({ courseId, items }: CourseDeliveryChecklistProps) {
  const [progress, setProgress] = useState<ChecklistProgress>(() => readChecklistProgress());
  const checkedItems = progress[courseId] ?? [];
  const completed = Math.min(checkedItems.length, items.length);
  const percent = items.length > 0 ? Math.round((completed / items.length) * 100) : 0;

  const portfolioLevel = useMemo(() => {
    if (percent === 100) return "Portfólio pronto para apresentar";
    if (percent >= 70) return "Entrega quase pronta";
    if (percent >= 35) return "Execução em andamento";
    return "Comece pelos entregáveis principais";
  }, [percent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  function toggleItem(item: string) {
    setProgress((current) => {
      const currentItems = current[courseId] ?? [];
      const alreadyChecked = currentItems.includes(item);
      const nextItems = alreadyChecked ? currentItems.filter((savedItem) => savedItem !== item) : [...currentItems, item];
      return { ...current, [courseId]: nextItems };
    });
  }

  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-black p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Checklist de Entrega</p>
          <h3 className="mt-2 text-xl font-black text-white">Entregáveis do projeto</h3>
          <p className="mt-1 text-xs font-bold text-zinc-500">{portfolioLevel}</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-center text-black">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Progresso</p>
          <p className="text-2xl font-black">{percent}%</p>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <p className="mt-3 text-xs font-bold text-zinc-500">{completed}/{items.length} entregáveis concluídos</p>

      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const checked = checkedItems.includes(item);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggleItem(item)}
              className={`flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition active:scale-[0.99] ${
                checked ? "border-emerald-300/30 bg-emerald-500/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${checked ? "bg-emerald-400 text-black" : "bg-white/10 text-zinc-500"}`}>
                {checked ? "✓" : ""}
              </span>
              <span>
                <span className={`block text-sm font-bold leading-6 ${checked ? "text-emerald-50" : "text-zinc-300"}`}>{item}</span>
                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-600">Entregável de portfólio</span>
              </span>
            </button>
          );
        })}
      </div>

      {percent === 100 && (
        <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm font-bold leading-6 text-emerald-100">
          🏆 Projeto pronto. Agora você tem uma entrega para mostrar como prova de habilidade.
        </div>
      )}
    </div>
  );
}
