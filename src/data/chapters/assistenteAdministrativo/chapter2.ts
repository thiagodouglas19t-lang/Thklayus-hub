import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const assistenteAdminChapter2: CourseChapter = {
  id: "admin-cap-2",
  title: "Comunicação com Cliente",
  subtitle: "Responder mensagens como alguém confiável",
  order: 2,
  workplaceScenario: "Um cliente mandou mensagem pedindo informação, outro está com dúvida e outro está esperando retorno. Você precisa responder sem parecer perdido.",
  chapterDeliverable: "Criar um kit com 3 mensagens profissionais prontas",
  successCriteria: [
    "Mensagem clara e educada",
    "Resposta com próximo passo",
    "Sem gírias exageradas ou confusão"
  ],
  lessons: [
    lesson(
      "Mensagem profissional",
      "No trabalho, uma mensagem ruim passa insegurança. Uma mensagem boa mostra organização, educação e clareza.",
      "Reescreva uma mensagem informal como se fosse para um cliente real."
    ),
    lesson(
      "Pedido de informação",
      "Nem sempre o cliente explica tudo. Você precisa saber perguntar sem parecer chato.",
      "Crie 5 perguntas para entender melhor um pedido de serviço."
    ),
    lesson(
      "Confirmação e próximo passo",
      "Toda resposta profissional precisa orientar o que acontece depois.",
      "Crie uma mensagem confirmando recebimento e avisando o próximo passo."
    )
  ]
};
