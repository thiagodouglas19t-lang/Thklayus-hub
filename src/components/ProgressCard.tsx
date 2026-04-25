import { Play, Clock, CheckCircle2 } from 'lucide-react';
import type { Course, UserProgress } from '../types';

interface ProgressCardProps {
  course: Course;
  progress: UserProgress;
  onContinue: (course: Course) => void;
}

export function ProgressCard({ course, progress, onContinue }: ProgressCardProps) {
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const percentComplete = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  // Find current lesson
  let currentLesson = null;
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (!progress.completedLessons.includes(lesson.id)) {
        currentLesson = lesson;
        break;
      }
    }
    if (currentLesson) break;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-950 transition-all hover:border-zinc-700 hover:bg-zinc-900/50">
      {/* Cover */}
      <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={course.cover}
          alt={course.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow min-w-0">
        <h3 className="text-lg font-semibold text-white mb-1 truncate">{course.title}</h3>
        
        {/* Progress Info */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{completedCount} de {totalLessons} aulas concluídas</span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-white to-zinc-300 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Current Lesson & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-auto">
          {currentLesson ? (
            <div className="flex items-center gap-2 text-sm text-zinc-400 flex-grow min-w-0">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Próxima: {currentLesson.title}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
              <span>Curso concluído!</span>
            </div>
          )}
          
          <button
            onClick={() => onContinue(course)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-medium text-sm transition-all hover:bg-zinc-200 active:scale-[0.98] flex-shrink-0"
          >
            <Play className="h-4 w-4" />
            {currentLesson ? 'Continuar' : 'Revisar'}
          </button>
        </div>
      </div>
    </div>
  );
}
