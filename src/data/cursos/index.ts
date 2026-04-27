import { apresentacao } from "./apresentacao";
import { logica } from "./logica";
import { oratoria } from "./oratoria";
import { canva } from "./canva";
import { trabalhosEscolares } from "./trabalhosEscolares";
import { vendas } from "./vendas";
import { atendimento } from "./atendimento";
import { eletronica } from "./eletronica";

export const professionalCourses = [
  apresentacao,
  logica,
  oratoria,
  canva,
  trabalhosEscolares,
  vendas,
  atendimento,
  eletronica,
];

export const modulosDoCurso = professionalCourses.reduce((acc, course) => {
  acc[course.id] = course.modules;
  return acc;
}, {} as Record<string, any>);

export function getCourseById(id: string) {
  return professionalCourses.find((course) => course.id === id);
}

export * from "./tipos";
