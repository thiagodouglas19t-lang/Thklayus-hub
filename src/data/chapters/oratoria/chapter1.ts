import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const oratoriaChapter1: CourseChapter = {
  id: "oratoria-cap-1",
  title: "Apresentação que Prende Atenção",
  subtitle: "Você precisa explicar uma ideia com clareza, sem travar e sem parecer perdido",
  order: 1,
  workplaceScenario: "Você precisa apresentar uma ideia em uma reunião, trabalho escolar, venda ou conversa importante. Se você fala de forma bagunçada, a pessoa não entende. Se você organiza a fala, passa confiança e aumenta sua chance de ser levado a sério.",
  chapterDeliverable: "Gravar uma explicação clara de 1 minuto com começo, desenvolvimento, conclusão e autoavaliação",
  successCriteria: [
    "Começo direto ao ponto",
    "Ideia organizada em partes simples",
    "Ritmo controlado sem falar rápido demais",
    "Exemplo usado para facilitar entendimento",
    "Final com conclusão clara"
  ],
  lessons: [
    lesson(
      "Estrutura da fala",
      `Toda fala boa tem caminho. Quando a pessoa começa a falar sem estrutura, ela se perde, repete a mesma coisa e termina sem conclusão. Isso acontece porque a mente tenta organizar a ideia ao mesmo tempo em que a boca está falando.\n\nA solução é simples: antes de falar, organize a mensagem em três partes. Primeiro, diga sobre o que você vai falar. Depois, explique a ideia principal. Por fim, conclua com o que a pessoa precisa entender ou fazer.\n\nExemplo ruim: \"Então, tipo assim, eu acho que esse negócio é importante porque tem várias coisas e também ajuda bastante...\".\n\nExemplo melhor: \"Vou explicar por que um bom atendimento melhora a confiança do cliente. Primeiro, ele reduz confusão. Segundo, ele mostra organização. Por fim, aumenta a chance da pessoa comprar de novo.\"\n\nPerceba que a segunda fala parece mais segura, mesmo sendo simples. A estrutura não deixa você depender da memória. Ela cria trilho para a fala seguir.`,
      `Escolha um tema simples e escreva uma fala em 3 partes:\n1. Abertura: \"Vou explicar...\"\n2. Desenvolvimento: dois ou três pontos principais\n3. Conclusão: o que a pessoa deve entender\n\nDepois leia em voz alta e corte frases repetidas.`
    ),
    lesson(
      "Controle do nervosismo",
      `O nervosismo não significa que você é incapaz. Ele é uma reação do corpo quando você sente pressão. O coração acelera, a mente corre, a voz pode falhar e você tenta falar rápido para acabar logo. O problema é que falar rápido aumenta a chance de travar.\n\nO controle começa antes da fala. Respire fundo, solte o ar devagar e comece com uma frase curta. Você não precisa começar perfeito. Precisa começar controlado.\n\nUma técnica simples é usar pausas. Pausa não é erro. Pausa passa segurança. Quem fala bem não joga todas as palavras de uma vez. A pessoa fala uma ideia, pausa, continua.\n\nExemplo: em vez de dizer tudo correndo, fale assim: \"Hoje eu vou apresentar uma ideia simples. [pausa] Ela ajuda a organizar melhor o atendimento. [pausa] E pode evitar confusão com clientes.\"\n\nA pausa dá tempo para você pensar e para a outra pessoa entender.`,
      `Grave um áudio curto com 30 segundos. Antes de gravar:\n1. Respire fundo 3 vezes\n2. Escreva a primeira frase\n3. Fale devagar\n4. Use pelo menos 3 pausas\n\nDepois escute e marque: falei rápido? repeti palavras? deixei a ideia clara?`
    ),
    lesson(
      "Exemplo que prende atenção",
      `Uma fala fica mais fácil de entender quando você usa exemplo. Sem exemplo, a pessoa pode até ouvir, mas não visualiza. Com exemplo, ela entende rápido.\n\nSe você fala \"organização é importante\", isso é muito genérico. Mas se você fala \"imagine um cliente pagando um curso e ninguém sabe se o comprovante foi analisado\", agora a pessoa entende o problema.\n\nExemplo transforma ideia abstrata em situação real. Ele também mostra que você sabe aplicar o que está falando. Em apresentação, reunião ou venda, isso aumenta muito sua força.\n\nA fórmula é: ideia + exemplo + conclusão.\n\nIdeia: atendimento precisa ter status.\nExemplo: cliente enviou comprovante e fica sem resposta.\nConclusão: se o status aparece como em análise, a pessoa fica mais tranquila.`,
      `Pegue sua fala anterior e adicione um exemplo real. Use esta estrutura:\n1. Minha ideia principal é...\n2. Um exemplo disso é...\n3. Por isso, a conclusão é...\n\nDepois grave novamente e compare com a primeira versão.`
    ),
    lesson(
      "Entrega real",
      `Agora você precisa juntar tudo: estrutura, controle, pausa, exemplo e conclusão. O objetivo não é falar como apresentador famoso. O objetivo é fazer a pessoa entender você sem esforço.\n\nUma apresentação de 1 minuto precisa ser curta e forte. Se você tenta colocar muita coisa, fica confuso. Escolha uma ideia só. Explique bem. Use um exemplo. Termine com uma conclusão.\n\nDepois de gravar, faça autoavaliação. Não se julgue como \"ficou horrível\" ou \"ficou bom\". Avalie pontos concretos: comecei claro? falei rápido? usei exemplo? terminei bem?\n\nMelhorar comunicação é repetição com correção. Cada gravação mostra um detalhe para ajustar.`,
      `Grave uma explicação de 1 minuto sobre um tema útil. A fala precisa ter:\n1. Abertura clara\n2. Dois pontos principais\n3. Um exemplo real\n4. Pausas\n5. Conclusão final\n\nDepois escreva uma autoavaliação com 3 pontos bons e 3 pontos para melhorar.`
    )
  ]
};
