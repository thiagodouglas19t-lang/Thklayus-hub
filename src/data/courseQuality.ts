import { professionalCourses } from "./courses";

type Course = (typeof professionalCourses)[number];

type QualityIssue = {
  type: "erro" | "alerta";
  message: string;
};

export function countLessons(course: Course) {
  return course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0);
}

export function validateCourseQuality(course: Course): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const totalLessons = countLessons(course);

  if (!course.title || course.title.length < 6) issues.push({ type: "erro", message: "Título muito curto." });
  if (!course.subtitle || course.subtitle.length < 30) issues.push({ type: "alerta", message: "Descrição curta demais." });
  if (!course.finalProject || course.finalProject.length < 25) issues.push({ type: "erro", message: "Projeto final fraco ou ausente." });
  if (totalLessons < 5) issues.push({ type: "alerta", message: "Poucas aulas. Pode parecer raso." });

  course.modules.forEach((module, moduleIndex) => {
    if (!module.lessons.length) issues.push({ type: "erro", message: `Módulo ${moduleIndex + 1} sem aulas.` });

    module.lessons.forEach((lesson, lessonIndex) => {
      const label = `Módulo ${moduleIndex + 1}, aula ${lessonIndex + 1}`;
      const explanation = lesson.explanation || lesson.summary;
      const exercise = lesson.exercise || lesson.practice;

      if (!explanation || explanation.length < 180) issues.push({ type: "alerta", message: `${label}: explicação curta demais.` });
      if (!lesson.example || lesson.example.length < 80) issues.push({ type: "alerta", message: `${label}: exemplo prático fraco.` });
      if (!lesson.steps || lesson.steps.length < 3) issues.push({ type: "alerta", message: `${label}: precisa de passo a passo melhor.` });
      if (!lesson.commonMistakes || lesson.commonMistakes.length < 2) issues.push({ type: "alerta", message: `${label}: precisa de pelo menos 2 erros comuns.` });
      if (!exercise || exercise.length < 40) issues.push({ type: "alerta", message: `${label}: exercício simples demais.` });
      if (!lesson.expectedResult || lesson.expectedResult.length < 50) issues.push({ type: "alerta", message: `${label}: resultado esperado fraco.` });
    });
  });

  return issues;
}

export function getQualityScore(course: Course) {
  const issues = validateCourseQuality(course);
  const errors = issues.filter((issue) => issue.type === "erro").length;
  const warnings = issues.filter((issue) => issue.type === "alerta").length;
  const raw = 100 - errors * 25 - warnings * 6;
  const score = Math.max(0, Math.min(100, raw));

  if (score >= 90) return { score, label: "Excelente", color: "emerald" as const, issues };
  if (score >= 70) return { score, label: "Bom", color: "amber" as const, issues };
  return { score, label: "Precisa melhorar", color: "red" as const, issues };
}
