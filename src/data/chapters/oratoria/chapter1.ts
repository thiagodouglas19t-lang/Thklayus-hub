import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const oratoriaChapter1: CourseChapter = {
  id: "oratoria-cap-1",
  title: "Apresentação que Prende Atenção",
  subtitle: "Você precisa explicar uma ideia e não pode travar",
  order: 1,
  workplaceScenario: "Você precisa apresentar uma ideia em uma reunião ou trabalho escolar. Se você falar mal, ninguém entende. Se falar bem, você se destaca.",
  chapterDeliverable: "Gravar uma explicação clara de 1 minuto",
  successCriteria: [
    "Começo direto ao ponto",
    "Explicação simples e organizada",
    "Sem travar ou falar rápido demais",
    "Final com conclusão clara"
  ],
  lessons: [
    lesson(
      "Estrutura da fala",
      "Toda fala boa tem começo, meio e fim. Se você pula isso, a pessoa não entende nada.",
      "Escreva uma explicação de 3 partes: introdução, explicação e conclusão."
    ),
    lesson(
      "Controle do nervosismo",
      "O nervosismo não some. Você aprende a controlar usando respiração e ritmo.",
      "Pratique falar devagar e grave um áudio curto explicando algo simples."
    ),
    lesson(
      "Entrega real",
      "Agora você precisa juntar tudo: estrutura + controle + clareza.",
      "Grave um áudio de 1 minuto explicando um tema e ouça para corrigir erros."
    )
  ]
};
