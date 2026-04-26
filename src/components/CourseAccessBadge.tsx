type CourseAccessBadgeProps = {
  unlocked: boolean;
};

export default function CourseAccessBadge({ unlocked }: CourseAccessBadgeProps) {
  return (
    <span
      className={`rounded-full border px-4 py-2 text-xs font-black ${
        unlocked
          ? "border-emerald-700 bg-emerald-500/10 text-emerald-300"
          : "border-amber-800 bg-amber-500/10 text-amber-200"
      }`}
    >
      {unlocked ? "Liberado" : "Bloqueado"}
    </span>
  );
}
