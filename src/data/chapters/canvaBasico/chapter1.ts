import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const canvaBasicoChapter1: CourseChapter = {
  id: "canva-cap-1",
  title: "Primeira Arte de Cliente",
  subtitle: "Você recebeu uma demanda simples e precisa entregar algo bonito, legível e confiável",
  order: 1,
  workplaceScenario: "Uma pessoa pediu uma arte para divulgar um serviço no WhatsApp. Ela não sabe explicar direito o que quer, mas precisa de uma peça visual que pareça profissional, passe confiança e faça alguém entender a oferta rapidamente.",
  chapterDeliverable: "Criar uma arte de divulgação pronta para WhatsApp, com briefing, hierarquia visual, revisão e exportação correta",
  successCriteria: [
    "Texto principal fácil de ler no celular",
    "Informações essenciais visíveis sem poluição",
    "Cores e fontes combinando com a mensagem",
    "Arte revisada antes da entrega",
    "Arquivo exportado em formato correto"
  ],
  lessons: [
    lesson(
      "Entender o pedido",
      `Antes de abrir o Canva, você precisa entender o que a arte precisa comunicar. Muita gente começa escolhendo modelo bonito, mas isso é um erro. Uma arte bonita que não explica nada não vende, não informa e não passa confiança.\n\nQuando um cliente pede uma arte, normalmente ele fala pouco: \"faz uma divulgação aí\". Seu trabalho é transformar esse pedido vago em um briefing claro. Briefing é uma lista de respostas que guia a criação. Ele evita que você faça uma arte aleatória.\n\nVocê precisa saber: qual é o serviço, quem deve ver a arte, qual informação é mais importante, qual contato deve aparecer e qual ação a pessoa deve tomar. Por exemplo, uma arte de manicure não deve focar só em \"unhas bonitas\". Ela pode destacar horário, localização, benefício e contato.\n\nSe você entende o pedido antes, a arte fica mais objetiva. Se você não entende, você fica trocando cor, fonte e imagem sem saber o motivo.`,
      `Crie um briefing simples com:\n1. Nome do serviço\n2. Público que vai ver a arte\n3. Informação principal\n4. Benefício para o cliente\n5. Preço ou chamada, se tiver\n6. Contato\n7. Prazo\n8. Estilo desejado\n\nDepois escreva em uma frase: \"Essa arte precisa fazer a pessoa entender que...\"`
    ),
    lesson(
      "Montar a arte sem bagunça",
      `Uma arte boa não precisa ter mil elementos. Na maioria das vezes, o problema de uma arte feia é excesso: texto demais, cor demais, fonte demais, imagem demais. O visual profissional nasce da escolha do que é mais importante.\n\nA primeira coisa é hierarquia. Hierarquia é decidir o que a pessoa deve ler primeiro, segundo e terceiro. O título precisa ser forte. O benefício precisa ser claro. O contato precisa estar visível. O resto é apoio.\n\nExemplo ruim: colocar preço, telefone, foto, 5 frases, 3 fontes e 4 cores tudo brigando na tela. Exemplo melhor: título grande, frase curta de benefício, imagem limpa e botão ou contato destacado.\n\nNo Canva, escolha um modelo simples e mexa com intenção. Trocar cor só porque ficou bonita não basta. A cor precisa combinar com o tipo de serviço. Uma arte de luxo pode usar preto, branco e dourado. Uma arte infantil pode usar cores mais leves. Uma arte de tecnologia pode usar fundo escuro e azul ou roxo.`,
      `No Canva, crie uma arte com:\n1. Título principal grande\n2. Subtítulo curto\n3. Uma imagem ou elemento visual\n4. Benefício claro\n5. Contato visível\n6. No máximo duas fontes\n7. No máximo três cores principais\n\nDepois olhe a arte de longe no celular e veja se ainda dá para entender.`
    ),
    lesson(
      "Revisar como profissional",
      `Revisão é o que separa amador de profissional. Muita gente entrega a arte assim que termina de montar. O problema é que a pessoa só percebe erro depois que já enviou: texto torto, telefone errado, cor ruim, informação faltando ou arquivo com qualidade baixa.\n\nUm profissional revisa antes. Ele confere se a arte está legível no celular, se o título chama atenção, se o contato está correto, se não tem erro de português e se a informação principal aparece primeiro.\n\nTambém precisa conferir exportação. PNG costuma ser bom para arte de WhatsApp e Instagram. PDF pode ser melhor para impressão ou documento. JPG pode servir, mas pode perder qualidade em alguns casos.\n\nA entrega também importa. Não mande só \"pronto\". Mande uma mensagem organizada, explicando que a arte está anexada e pedindo confirmação se precisa de ajuste. Isso aumenta o valor do seu trabalho.`,
      `Faça uma revisão de 7 pontos:\n1. Título legível\n2. Texto sem erro\n3. Contato correto\n4. Cores combinando\n5. Espaçamento bom\n6. Informação principal clara\n7. Arquivo exportado em PNG\n\nDepois escreva uma mensagem de entrega profissional para enviar junto com a arte.`
    )
  ]
};
