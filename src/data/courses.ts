import { assistenteAdministrativo } from "./cursos/assistenteAdministrativo";
import { informaticaProfissional } from "./cursos/informaticaProfissional";
import { designCanvaBasico } from "./cursos/designCanvaBasico";
import {
  atendimentoCliente,
  desenvolvedorSistemas,
  desenvolvedorWebsites,
  empreendedorismoDigital,
  iaNaPratica,
  officeProfissional,
  oratoriaProfissional,
} from "./cursos/baseCursos";
import { apisNaPratica } from "./cursos/apisNaPratica";
import { siteNivelEmpresa } from "./cursos/siteNivelEmpresa";
import { iaFerramentasPrompts } from "./cursos/iaFerramentasPrompts";
import type { CourseContent, Curso } from "./courseTypes";
import { applyChapterArchitecture } from "./chapterRegistry";

const chavePixAleatoria = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";

const baseCourses: CourseContent[] = [
  iaNaPratica,
  iaFerramentasPrompts,
  apisNaPratica,
  siteNivelEmpresa,
  desenvolvedorWebsites,
  desenvolvedorSistemas,
  assistenteAdministrativo,
  informaticaProfissional,
  officeProfissional,
  designCanvaBasico,
  oratoriaProfissional,
  empreendedorismoDigital,
  atendimentoCliente,
];

export const professionalCourses: CourseContent[] = applyChapterArchitecture(baseCourses);

export const cursos: Curso[] = professionalCourses.map((course, index) => ({
  id: index + 1,
  titulo: course.title,
  descricao: course.subtitle,
  preco: course.price,
  aulas: course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0),
  nivel: course.level,
  categoria: course.category,
  tipo: course.free ? "Grátis" : "Pago",
  selo: course.free ? "Essencial" : index < 4 ? "Popular" : "Pro",
  resultado: course.outcome,
  pixCode: chavePixAleatoria,
}));

export const categorias = ["Todos", "Grátis", "Pagos", ...Array.from(new Set(professionalCourses.map((curso) => curso.category)))];

export const trilhas = [
  { nome: "Formação em Tecnologia", desc: "IA, APIs, websites, sistemas e criação de soluções digitais.", cursos: ["IA na Prática", "IA, Ferramentas e Prompts Profissionais", "APIs na Prática", "Criar Site Nível Empresa", "Qualificação Técnica em Desenvolvedor de Websites", "Qualificação Técnica em Desenvolvedor de Sistemas"], icon: "💻" },
  { nome: "Formação Administrativa", desc: "Informática, atendimento, documentos, organização e rotina profissional.", cursos: ["Assistente Administrativo Básico", "Informática Profissional do Zero", "Pacote Office Profissional"], icon: "🏢" },
  { nome: "Criação e Serviços Digitais", desc: "Design, apresentações, precificação e venda de serviços simples.", cursos: ["Canva Básico: Crie Artes Pelo Celular", "Empreendedorismo e Serviços Digitais"], icon: "🚀" },
  { nome: "Atendimento e Suporte", desc: "Atendimento ao cliente, tickets, pedidos e fechamento profissional.", cursos: ["Atendimento ao Cliente e Suporte"], icon: "🎧" },
];

export function modulosDoCurso(curso: CourseContent | Curso) {
  if ("modules" in curso) return curso.modules.map((modulo) => modulo.title);
  return [
    "Boas-vindas e plano de estudos",
    `Fundamentos de ${curso.titulo}`,
    "Aulas práticas guiadas",
    "Exercícios profissionais",
    `Projeto final: ${curso.resultado}`,
    "Checklist final e certificado",
  ];
}

export * from "./courseTypes";
