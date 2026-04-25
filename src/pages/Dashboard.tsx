import { BookOpen, Trophy, Clock, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { courses } from '../data/courses';
import { ProgressCard } from '../components/ProgressCard';
import type { Course } from '../types';

interface DashboardProps {
  onSelectCourse: (course: Course) => void;
  onNavigate: (page: string) => void;
}

export function Dashboard({ onSelectCourse, onNavigate }: DashboardProps) {
  const { user } = useUser();

  // Get courses with progress
  const coursesWithProgress = user?.progress
    .map(progress => {
      const course = courses.find(c => c.id === progress.courseId);
      return course ? { course, progress } : null;
    })
    .filter(Boolean) as { course: Course; progress: typeof user.progress[0] }[] | undefined;

  // Calculate stats
  const totalCoursesStarted = coursesWithProgress?.length || 0;
  const totalLessonsCompleted = user?.progress.reduce((acc, p) => acc + p.completedLessons.length, 0) || 0;
  
  const completedCourses = coursesWithProgress?.filter(({ course, progress }) => {
    const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    return progress.completedLessons.length >= totalLessons;
  }).length || 0;

  const stats = [
    { icon: BookOpen, label: 'Cursos iniciados', value: totalCoursesStarted },
    { icon: Trophy, label: 'Cursos concluídos', value: completedCourses },
    { icon: Clock, label: 'Aulas assistidas', value: totalLessonsCompleted },
  ];

  if (!user?.name) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-12 rounded-2xl border border-zinc-800 bg-zinc-950">
            <BookOpen className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Área de Estudos</h1>
            <p className="text-zinc-400 mb-6">
              Informe seu nome na página inicial para acessar sua área de estudos personalizada.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl bg-white text-black font-medium transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              Ir para Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-zinc-400">Continue de onde parou ou explore novos cursos.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-950"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-zinc-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Courses in Progress */}
        {coursesWithProgress && coursesWithProgress.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-white mb-6">Meus Cursos</h2>
            <div className="space-y-4">
              {coursesWithProgress.map(({ course, progress }) => (
                <ProgressCard
                  key={course.id}
                  course={course}
                  progress={progress}
                  onContinue={onSelectCourse}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="text-center py-16">
            <div className="max-w-md mx-auto">
              <BookOpen className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">Nenhum curso iniciado</h2>
              <p className="text-zinc-400 mb-6">
                Explore nossos cursos e comece sua jornada de aprendizado hoje mesmo!
              </p>
              <button
                onClick={() => onNavigate('courses')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium transition-all hover:bg-zinc-200 active:scale-[0.98]"
              >
                Explorar cursos
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
