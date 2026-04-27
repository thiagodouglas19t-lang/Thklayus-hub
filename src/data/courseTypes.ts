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
  duration: string;
  price: string;
  free?: boolean;
  hero: string;
  outcome: string;
  modules: CourseModule[];
  checklist: string[];
  finalProject: string;
};

export type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  categoria: string;
  tipo: "Grátis" | "Pago";
  selo: "Popular" | "Novo" | "Essencial" | "Pro";
  resultado: string;
  pixCode: string;
};

export const lesson = (title: string, summary: string, practice: string): CourseLesson => ({
  title,
  summary,
  practice,
});
