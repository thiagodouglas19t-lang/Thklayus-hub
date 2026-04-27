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
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40">
      <div className="border-b border-white/10 bg-[#f4f4f0] p-5 text-black md:p-7">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
          Módulo {currentLesson.moduleIndex + 1} • Aula {currentLesson.lessonIndex + 1} de {totalLessons}
        </p>
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-6xl">{currentLesson.lesson.title}</h2>
        <p className="mt-3 text-sm font-semibold text-zinc-600">{currentLesson.modulo.title}</p>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-200">
          <div className="h-full rounded-full bg-black transition-all" style={{ width: `${progressPercent}%` }} />
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

      <div className="grid gap-3 border-t border-white/10 p-4 md:grid-cols-3 md:p-6">
        <button
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300 disabled:opacity-40"
        >
          Anterior
        </button>
        <button
          onClick={onToggleDone}
          className={`rounded-2xl px-5 py-4 font-black ${currentDone ? "bg-emerald-400 text-black" : "bg-white text-black"}`}
        >
          {currentDone ? "Concluída ✓" : "Marcar concluída"}
        </button>
        <button
          onClick={onNext}
          className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-5 py-4 font-black text-blue-100"
        >
          {currentIndex >= totalLessons - 1 ? "Finalizar" : "Próxima aula"}
        </button>
      </div>
    </article>
  );
}
