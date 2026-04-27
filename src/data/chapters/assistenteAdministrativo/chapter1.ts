import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const assistenteAdminChapter1: CourseChapter = {
  id: "admin-cap-1",
  title: "Primeiro Dia no Escritório",
  subtitle: "Você acabou de entrar e precisa organizar tudo",
  order: 1,
  workplaceScenario: "Você foi contratado como assistente e recebeu arquivos bagunçados, mensagens não respondidas e tarefas acumuladas.",
  chapterDeliverable: "Organizar tarefas + criar lista funcional",
  successCriteria: [
    "Separar tarefas por prioridade",
    "Criar lista organizada",
    "Definir o que é urgente"
  ],
  lessons: [
    lesson(
      "Caos inicial",
      "Você recebeu várias tarefas sem organização. Seu trabalho é entender o que fazer primeiro.",
      "Liste todas tarefas e classifique em urgente, importante e depois"
    ),
    lesson(
      "Organização real",
      "Agora você precisa estruturar isso como alguém profissional faria.",
      "Crie uma lista clara com ordem de execução"
    )
  ]
};
