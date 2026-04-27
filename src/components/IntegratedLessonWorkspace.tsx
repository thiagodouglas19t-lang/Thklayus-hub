import type { CourseContent, CourseLesson } from "../data/courseTypes";
import CourseWorkspace from "./CourseWorkspace";

type IntegratedLessonWorkspaceProps = {
  course: CourseContent;
  lesson: CourseLesson;
  moduleTitle: string;
  moduleIndex: number;
  lessonIndex: number;
  totalModules: number;
  moduleLessonsCount: number;
  nextLessonTitle?: string;
};

export default function IntegratedLessonWorkspace({
  course,
  lesson,
  moduleTitle,
  moduleIndex,
  lessonIndex,
  totalModules,
  moduleLessonsCount,
  nextLessonTitle,
}: IntegratedLessonWorkspaceProps) {
  return (
    <div className="grid gap-3 p-4 md:p-6">
      <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-300">📖 Briefing da aula</p>
        <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-zinc-200">{lesson.summary}</p>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-500/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">🧪 Job da aula</p>
          <p className="mt-4 text-sm leading-7 text-emerald-50/90">{lesson.practice}</p>
        </section>

        <section className="rounded-[1.5rem] border border-blue-400/20 bg-blue-500/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">🚀 Próximo passo</p>
          <p className="mt-4 text-sm leading-7 text-blue-50/90">
            {nextLessonTitle ? `Depois desta aula, siga para: ${nextLessonTitle}.` : "Finalize o projeto final e baixe seu certificado."}
          </p>
        </section>
      </div>

      <CourseWorkspace
        course={course}
        lesson={lesson}
        moduleTitle={moduleTitle}
        moduleIndex={moduleIndex}
        lessonIndex={lessonIndex}
        totalModules={totalModules}
        moduleLessonsCount={moduleLessonsCount}
      />
    </div>
  );
}
