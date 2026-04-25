import { courses } from '../data/courses';
import { CourseCard } from '../components/CourseCard';
import { useUser } from '../context/UserContext';
import type { Course } from '../types';

interface CoursesProps {
  onSelectCourse: (course: Course) => void;
}

export function Courses({ onSelectCourse }: CoursesProps) {
  const { getCourseProgress } = useUser();

  const getProgress = (course: Course) => {
    const progress = getCourseProgress(course.id);
    if (!progress) return undefined;
    
    const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    return totalLessons > 0 ? (progress.completedLessons.length / totalLessons) * 100 : 0;
  };

  const beginnerCourses = courses.filter(c => c.level === 'iniciante');
  const intermediateCourses = courses.filter(c => c.level === 'intermediário' || c.level === 'avançado');

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Cursos</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-balance">
            Aprenda no seu ritmo com nossos cursos práticos. 
            Do básico ao avançado, tudo que você precisa para evoluir na área tech.
          </p>
        </div>

        {/* Beginner Courses */}
        {beginnerCourses.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-white">Para começar</h2>
              <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-500">
                Iniciante
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  progress={getProgress(course)}
                  onView={onSelectCourse}
                />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate/Advanced Courses */}
        {intermediateCourses.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-white">Próximo nível</h2>
              <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/10 text-amber-500">
                Intermediário+
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  progress={getProgress(course)}
                  onView={onSelectCourse}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
