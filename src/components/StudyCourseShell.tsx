import type { CourseContent, CourseLesson } from "../data/courseTypes";
import IntegratedLessonWorkspace from "./IntegratedLessonWorkspace";

type FlatLesson = {
  modulo: { title: string; lessons: CourseLesson[] };
  lesson: CourseLesson;
  moduleIndex: number;
  lessonIndex: number;
  key: string;
};

type StudyCourseShellProps = {
  course: CourseContent;
  currentLesson: FlatLesson;
  nextLesson?: FlatLesson | null;
  currentIndex: number;
  totalLessons: number;
  currentDone: boolean;
  progressPercent: number;
  onPrevious: () => void;
  onToggleDone: () => void;
  onNext: () => void;
};

export default function StudyCourseShell({
  course,
  currentLesson,
  nextLesson,
  currentIndex,
  totalLessons,
  currentDone,
  progressPercent,
  onPrevious,
  onToggleDone,
  onNext,
}: StudyCourseShellProps) {
  const safeProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <article className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#050507] shadow-2xl shadow-black/50">
      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_15%_0%,rgba(214,179,106,0.22),transparent_32%),radial-gradient(circle_at_95%_10%,rgba(124,58,237,0.14),transparent_30%),linear-gradient(135deg,#0b0b10,#000)] p-5 text-white md:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]" />

        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="rounded-full border border-[#d6b36a]/25 bg-[#d6b36a]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#f6df9b]">
              Módulo {currentLesson.moduleIndex + 1} • Aula {currentLesson.lessonIndex + 1} de {totalLessons}
            </p>
            <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400">
              {safeProgress}% completo
            </p>
          </div>

          <h2 className="mt-5 max-w-4xl text-3xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">
            {currentLesson.lesson.title}
          </h2>

          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-zinc-400 md:text-base">
            {currentLesson.modulo.title}
          </p>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d6b36a] via-white to-[#d6b36a] transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>
      </div>

      <IntegratedLessonWorkspace
        course={course}
        lesson={currentLesson.lesson}
        moduleTitle={currentLesson.modulo.title}
        moduleIndex={currentLesson.moduleIndex}
        lessonIndex={currentLesson.lessonIndex}
        totalModules={course.modules.length}
        moduleLessonsCount={currentLesson.modulo.lessons.length}
        nextLessonTitle={nextLesson?.lesson.title}
      />

      <div className="grid gap-3 border-t border-white/10 bg-black/35 p-4 md:grid-cols-3 md:p-6">
        <button
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-black text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>
        <button
          onClick={onToggleDone}
          className={`rounded-2xl px-5 py-4 font-black shadow-lg transition active:scale-[0.98] ${
            currentDone
              ? "bg-emerald-400 text-black shadow-emerald-500/20"
              : "bg-white text-black shadow-white/10"
          }`}
        >
          {currentDone ? "Concluída ✓" : "Marcar concluída"}
        </button>
        <button
          onClick={onNext}
          className="rounded-2xl border border-[#d6b36a]/30 bg-[#d6b36a]/10 px-5 py-4 font-black text-[#f6df9b] transition hover:border-[#d6b36a]/50 hover:bg-[#d6b36a]/15 active:scale-[0.98]"
        >
          {currentIndex >= totalLessons - 1 ? "Finalizar" : "Próxima aula"}
        </button>
      </div>
    </article>
  );
}
