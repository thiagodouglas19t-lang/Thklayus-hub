import { Play, Clock, BookOpen } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  progress?: number;
  onView: (course: Course) => void;
}

export function CourseCard({ course, progress, onView }: CourseCardProps) {
  const levelColors = {
    'iniciante': 'bg-emerald-500/10 text-emerald-500',
    'intermediário': 'bg-amber-500/10 text-amber-500',
    'avançado': 'bg-rose-500/10 text-rose-500',
  };

  const levelLabels = {
    'iniciante': 'Iniciante',
    'intermediário': 'Intermediário',
    'avançado': 'Avançado',
  };

  return (
    <div 
      className="group relative flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:scale-[1.02] cursor-pointer"
      onClick={() => onView(course)}
    >
      {/* Cover Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.cover}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
            {levelLabels[course.level]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2 flex-grow">{course.description}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessonsCount} aulas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Progress Bar (if started) */}
        {progress !== undefined && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-zinc-400">Progresso</span>
              <span className="text-white font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView(course);
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-medium text-sm transition-all hover:bg-zinc-200 active:scale-[0.98]"
        >
          {progress !== undefined && progress > 0 ? 'Continuar' : 'Ver curso'}
        </button>
      </div>
    </div>
  );
}
