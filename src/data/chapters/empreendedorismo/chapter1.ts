import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const empreendedorismoChapter1: CourseChapter = {
  id: "empreendedor-cap-1",
  title: "Primeira Venda Simples",
  subtitle: "Transforme habilidade em dinheiro",
  order: 1,
  workplaceScenario: "Você quer ganhar dinheiro, mas não tem empresa. Você precisa usar algo simples que você sabe fazer e vender para alguém real.",
  chapterDeliverable: "Criar uma oferta simples e divulgar",
  successCriteria: [
    "Oferta clara",
    "Mensagem simples",
    "Preço definido",
    "Divulgação feita"
  ],
  lessons: [
    lesson(
      "Escolher o que vender",
      "Você não começa com empresa. Você começa com algo simples que resolve problema.",
      "Liste 5 coisas que você pode fazer e escolher 1 para vender."
    ),
    lesson(
      "Criar oferta",
      "Oferta não é só falar o que você faz. É explicar o benefício.",
      "Crie uma mensagem de venda com problema + solução + preço."
    ),
    lesson(
      "Divulgação real",
      "Se ninguém vê, ninguém compra. Você precisa divulgar.",
      "Poste no WhatsApp ou fale com alguém oferecendo o serviço."
    )
  ]
};
