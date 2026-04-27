import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const sitesClientesChapter1: CourseChapter = {
  id: "sites-cap-1",
  title: "Site Premium Nível Empresa",
  subtitle: "Crie uma landing page com cara de marca grande, copy forte, visual premium e entrega profissional",
  order: 1,
  workplaceScenario: "Uma empresa quer um site que pareça caro, confiável e moderno. O site precisa apresentar a marca, explicar o valor, mostrar serviços, gerar confiança e levar o visitante para uma ação clara.",
  chapterDeliverable: "Criar o plano completo de uma landing page premium com estrutura, copy, seções, identidade visual e proposta de entrega",
  successCriteria: [
    "Hero section com promessa forte",
    "Seções organizadas para conversão",
    "Copy clara com benefício e prova",
    "Visual premium com paleta, fonte e espaçamento",
    "Entrega pronta para virar portfólio ou proposta comercial"
  ],
  lessons: [
    lesson(
      "Briefing nível empresa",
      "Um site premium começa antes do design. Você precisa entender objetivo, público, posicionamento, tom de voz, diferencial, oferta e ação principal. Sem briefing, o site vira só uma página bonita sem estratégia.",
      "Crie um briefing com: nome da marca, público, promessa, serviço principal, diferencial, prova de confiança, CTA e estilo visual desejado."
    ),
    lesson(
      "Arquitetura de conversão",
      "Uma landing page premium precisa conduzir o visitante. A ordem ideal é: hero forte, problema, solução, benefícios, processo, prova, oferta, FAQ e CTA final.",
      "Monte a estrutura completa da página com pelo menos 8 seções e escreva o objetivo de cada seção."
    ),
    lesson(
      "Copy que vende sem parecer golpe",
      "Texto premium é direto, elegante e confiável. Ele não promete milagre. Ele mostra problema, benefício, prova e próximo passo com clareza.",
      "Escreva a copy principal: título, subtítulo, 3 benefícios, 1 seção de prova, FAQ e chamada final para contato."
    ),
    lesson(
      "Direção visual premium",
      "Visual caro não é encher de efeito. É usar contraste, espaço, hierarquia, fonte boa, imagens certas e consistência. Preto, branco e uma cor de destaque já conseguem parecer premium.",
      "Defina paleta, fontes, estilo de botões, tipo de imagem, espaçamento e referência visual da página."
    ),
    lesson(
      "Entrega profissional",
      "A entrega precisa parecer projeto de empresa: documento organizado, estrutura da página, textos finais, referências visuais e próximos passos. Isso aumenta o valor percebido do serviço.",
      "Organize tudo em um documento chamado projeto-site-premium e escreva uma mensagem de entrega para o cliente."
    )
  ]
};
