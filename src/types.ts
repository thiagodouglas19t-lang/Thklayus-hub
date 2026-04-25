export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  deliveryTime: string;
  status: 'popular' | 'novo' | 'disponível';
  features: string[];
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  cover: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
  lessonsCount: number;
  duration: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  description: string;
}

export interface UserProgress {
  courseId: string;
  completedLessons: string[];
  currentLessonId?: string;
  startedAt: string;
}

export interface User {
  name: string;
  email: string;
  progress: UserProgress[];
}
