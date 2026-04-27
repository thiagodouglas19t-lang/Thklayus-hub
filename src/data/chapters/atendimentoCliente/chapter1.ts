import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const atendimentoClienteChapter1: CourseChapter = {
  id: "atendimento-cap-1",
  title: "Primeiro Atendimento Real",
  subtitle: "Transforme mensagem bagunçada em atendimento profissional",
  order: 1,
  workplaceScenario: "Um cliente mandou uma mensagem confusa reclamando que não recebeu retorno. Ele está impaciente e você precisa responder sem discutir, coletar informações e organizar o próximo passo.",
  chapterDeliverable: "Criar um atendimento completo com saudação, pergunta, status e próximo passo",
  successCriteria: [
    "Resposta educada mesmo com cliente irritado",
    "Perguntas objetivas para entender o problema",
    "Status claro do atendimento",
    "Próximo passo informado sem enrolação"
  ],
  lessons: [
    lesson(
      "Resposta que acalma",
      "No atendimento real, a primeira resposta precisa reduzir tensão. Você reconhece o problema, mostra que vai ajudar e evita discutir com o cliente.",
      "Escreva uma resposta para um cliente irritado usando: saudação, reconhecimento, pedido de informação e próximo passo."
    ),
    lesson(
      "Coleta de informações",
      "Sem informação, não existe solução. O atendente bom sabe perguntar pouco, mas perguntar certo.",
      "Crie 6 perguntas essenciais para abrir um ticket de suporte ou pedido."
    ),
    lesson(
      "Status do atendimento",
      "Cliente fica mais calmo quando sabe em que etapa está. Use status como: recebido, em análise, aguardando cliente, resolvido e fechado.",
      "Classifique 5 atendimentos fictícios usando status e escreva uma resposta curta para cada um."
    )
  ]
};
