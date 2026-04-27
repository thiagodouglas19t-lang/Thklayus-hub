import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const canvaBasicoChapter1: CourseChapter = {
  id: "canva-cap-1",
  title: "Primeira Arte de Cliente",
  subtitle: "Você recebeu uma demanda simples e precisa entregar algo bonito",
  order: 1,
  workplaceScenario: "Uma pessoa pediu uma arte para divulgar um serviço no WhatsApp. Ela não sabe explicar direito, mas precisa de algo limpo, legível e confiável.",
  chapterDeliverable: "Criar uma arte de divulgação pronta para WhatsApp",
  successCriteria: [
    "Texto principal fácil de ler",
    "Informações essenciais visíveis",
    "Cores sem poluição visual",
    "Arquivo exportado em formato correto"
  ],
  lessons: [
    lesson(
      "Entender o pedido",
      "Antes de abrir o Canva, você precisa entender a mensagem da arte. Quem vai ver? O que precisa ser vendido? Qual ação a pessoa deve tomar?",
      "Crie um briefing simples com: objetivo, público, informação principal, contato e prazo."
    ),
    lesson(
      "Montar a arte sem bagunça",
      "Uma arte boa não precisa ter muita coisa. Ela precisa ter hierarquia: título forte, benefício claro, informação de contato e espaço para respirar.",
      "No Canva, escolha um modelo simples e substitua texto, cores e imagem para divulgar um serviço fictício."
    ),
    lesson(
      "Revisar como profissional",
      "Antes de entregar, revise se o texto está legível no celular, se não tem erro e se a informação importante aparece primeiro.",
      "Faça uma revisão de 5 pontos e exporte a arte em PNG."
    )
  ]
};
