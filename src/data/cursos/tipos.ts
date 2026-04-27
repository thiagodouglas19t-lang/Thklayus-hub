export type CourseLevel = "iniciante" | "intermediario" | "avancado";

export type CourseLesson = {
  title: string;
  summary: string;
  practice: string;
};

export type CourseModule = {
  title: string;
  lessons: CourseLesson[];
};

export type CourseContent = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  price: string;
  free?: boolean;
  duration: string;
  outcome: string;
  hero: string;
  modules: CourseModule[];
  checklist: string[];
  finalProject: string;
};
