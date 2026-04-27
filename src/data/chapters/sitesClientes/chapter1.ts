import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const sitesClientesChapter1: CourseChapter = {
  id: "sites-cap-1",
  title: "Site Simples para Cliente",
  subtitle: "Monte uma página que alguém realmente usaria para divulgar um serviço",
  order: 1,
  workplaceScenario: "Um pequeno negócio precisa de uma página simples com apresentação, serviços, preço inicial e contato. O objetivo não é inventar moda: é criar algo claro e confiável.",
  chapterDeliverable: "Criar o planejamento de uma landing page com seções, textos e chamada para contato",
  successCriteria: [
    "Objetivo do site definido",
    "Seções organizadas",
    "Texto simples e confiável",
    "Chamada para contato clara"
  ],
  lessons: [
    lesson("Briefing do cliente", "Antes de criar qualquer site, você precisa entender o negócio, o público e o que a pessoa quer receber pelo WhatsApp ou formulário.", "Crie um briefing com nome do negócio, público, serviços, diferencial e contato."),
    lesson("Estrutura da página", "Uma landing page simples precisa de começo forte, prova, serviços, chamada e contato. Sem isso, vira só uma página bonita que não vende.", "Monte a ordem das seções: topo, benefícios, serviços, prova, dúvidas e contato."),
    lesson("Texto que passa confiança", "O texto precisa ser direto. Explique o que a pessoa faz, para quem é e como contratar.", "Escreva os textos principais da página em linguagem simples."),
    lesson("Entrega para o cliente", "Mesmo sem programar, você pode entregar planejamento, texto e estrutura. Isso já vira serviço vendável.", "Organize o material em um documento chamado plano-do-site-cliente."),
  ],
};
