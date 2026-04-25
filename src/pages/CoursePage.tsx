import { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2, Circle, Clock, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '../context/UserContext';
import type { Course, Lesson } from '../types';

interface CoursePageProps {
  course: Course;
  onBack: () => void;
}

export function CoursePage({ course, onBack }: CoursePageProps) {
  const { user, startCourse, completeLesson, isLessonCompleted, getCourseProgress } = useUser();
  const [expandedModules, setExpandedModules] = useState<string[]>(
    course.modules.map(m => m.id) // All expanded by default
  );
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const progress = getCourseProgress(course.id);
  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = progress?.completedLessons.length || 0;
  const percentComplete = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleStartCourse = () => {
    if (user?.name) {
      startCourse(course.id);
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (user?.name && !progress) {
      startCourse(course.id);
    }
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (user?.name) {
      completeLesson(course.id, lessonId);
    }
  };

  // Find next incomplete lesson
  const findNextLesson = (): Lesson | null => {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!isLessonCompleted(course.id, lesson.id)) {
          return lesson;
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para cursos
        </button>

        {/* Course Header */}
        <div className="mb-8">
          {/* Cover */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
            <img
              src={course.cover}
              alt={course.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-zinc-400">{course.description}</p>
            </div>
            
            {nextLesson && user?.name && (
              <button
                onClick={() => handleLessonClick(nextLesson)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium transition-all hover:bg-zinc-200 active:scale-[0.98] flex-shrink-0"
              >
                <Play className="h-4 w-4" />
                {progress ? 'Continuar' : 'Começar'}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 mb-6">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>{course.lessonsCount} aulas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              course.level === 'iniciante' 
                ? 'bg-emerald-500/10 text-emerald-500'
                : course.level === 'intermediário'
                ? 'bg-amber-500/10 text-amber-500'
                : 'bg-rose-500/10 text-rose-500'
            }`}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </span>
          </div>

          {/* Progress Bar */}
          {progress && (
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-zinc-400">Progresso do curso</span>
                <span className="text-white font-medium">{completedCount} de {totalLessons} aulas</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Conteúdo do curso</h2>
          
          {course.modules.map((module, moduleIndex) => {
            const isExpanded = expandedModules.includes(module.id);
            const completedInModule = module.lessons.filter(l => 
              isLessonCompleted(course.id, l.id)
            ).length;

            return (
              <div 
                key={module.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-sm font-medium text-white">
                      {moduleIndex + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-white">{module.title}</h3>
                      <p className="text-sm text-zinc-400">
                        {completedInModule}/{module.lessons.length} aulas concluídas
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  )}
                </button>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="border-t border-zinc-800">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = isLessonCompleted(course.id, lesson.id);
                      const isSelected = selectedLesson?.id === lesson.id;

                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-4 p-4 pl-6 border-b border-zinc-800/50 last:border-b-0 transition-colors ${
                            isSelected ? 'bg-zinc-800/50' : 'hover:bg-zinc-900/50'
                          }`}
                        >
                          {/* Completion Status */}
                          <button
                            onClick={() => handleCompleteLesson(lesson.id)}
                            className={`flex-shrink-0 transition-colors ${
                              isCompleted ? 'text-emerald-500' : 'text-zinc-600 hover:text-zinc-400'
                            }`}
                            disabled={!user?.name}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </button>

                          {/* Lesson Info */}
                          <button
                            onClick={() => handleLessonClick(lesson)}
                            className="flex-grow text-left"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-zinc-500">{moduleIndex + 1}.{lessonIndex + 1}</span>
                              <span className={`text-sm ${isCompleted ? 'text-zinc-400' : 'text-white'}`}>
                                {lesson.title}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">{lesson.description}</p>
                          </button>

                          {/* Duration */}
                          <span className="text-xs text-zinc-500 flex-shrink-0">{lesson.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Lesson Modal/Preview */}
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-semibold text-white mb-2">{selectedLesson.title}</h3>
              <p className="text-zinc-400 mb-4">{selectedLesson.description}</p>
              <p className="text-sm text-zinc-500 mb-6">Duração: {selectedLesson.duration}</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleCompleteLesson(selectedLesson.id);
                    setSelectedLesson(null);
                  }}
                  className="flex-grow py-3 rounded-xl bg-white text-black font-medium transition-all hover:bg-zinc-200 active:scale-[0.98]"
                >
                  {isLessonCompleted(course.id, selectedLesson.id) ? 'Marcar como não concluída' : 'Marcar como concluída'}
                </button>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="px-6 py-3 rounded-xl border border-zinc-700 text-white font-medium transition-all hover:bg-zinc-900 active:scale-[0.98]"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No User Warning */}
        {!user?.name && (
          <div className="mt-8 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
            <p className="text-amber-500 mb-2 font-medium">Para salvar seu progresso</p>
            <p className="text-zinc-400 text-sm">
              Informe seu nome na página inicial para acompanhar seu progresso nos cursos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
