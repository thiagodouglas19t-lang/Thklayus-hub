import { getLessonVisual } from "../data/lessonVisuals";

type Props = {
  courseId: string;
  lessonTitle: string;
};

export default function LessonVisual({ courseId, lessonTitle }: Props) {
  const visual = getLessonVisual(courseId, lessonTitle);

  if (!visual) return null;

  return (
    <div className="mt-4 rounded-2xl border border-blue-300/20 bg-blue-500/5 p-4">
      <h4 className="font-black text-blue-200">{visual.title}</h4>
      <p className="text-sm text-zinc-300 mt-1">{visual.description}</p>

      <ul className="mt-3 space-y-1 text-sm">
        {visual.items.map((item, i) => (
          <li key={i} className="text-zinc-200">• {item}</li>
        ))}
      </ul>
    </div>
  );
}
