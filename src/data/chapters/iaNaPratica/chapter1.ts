import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const iaNaPraticaChapter1: CourseChapter = {
  id: "ia-cap-1",
  title: "Automação Real com IA",
  subtitle: "Usando IA para resolver tarefas reais",
  order: 1,
  workplaceScenario: "Você precisa responder clientes, organizar tarefas e criar conteúdo mais rápido. Você decide usar IA para isso.",
  chapterDeliverable: "Criar um kit de prompts para automação de tarefas",
  successCriteria: [
    "Prompt para atendimento",
    "Prompt para organização",
    "Prompt para criação de conteúdo",
    "Checklist de validação"
  ],
  lessons: [
    lesson("IA no mundo real", "IA não é mágica. É ferramenta para acelerar trabalho repetitivo.", "Liste 5 tarefas que você faz que poderiam usar IA."),
    lesson("Prompt de atendimento", "Criar respostas rápidas para clientes economiza tempo.", "Crie um prompt para responder dúvidas frequentes."),
    lesson("Prompt de produtividade", "IA pode organizar tarefas e rotinas.", "Crie um prompt para planejar sua semana."),
    lesson("Validação", "Sempre revise respostas da IA.", "Crie uma checklist para validar respostas antes de usar."),
  ]
};
