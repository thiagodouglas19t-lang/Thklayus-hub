export type ToolCategory = "mensagem" | "organizar" | "ideia" | "formal" | "calculo" | "rotina";

export type ToolDefinition = {
  id: string;
  category: ToolCategory;
  title: string;
  description: string;
  examples: string[];
  keywords: string[];
};

export type ToolResult = {
  tool: ToolDefinition;
  input: string;
  title: string;
  output: string;
  actions: string[];
};

export const tools: ToolDefinition[] = [
  {
    id: "mensagem-desculpa",
    category: "mensagem",
    title: "Mensagem de desculpa",
    description: "Cria uma mensagem curta para pedir desculpa sem parecer falso.",
    examples: ["desculpa atraso", "pedir desculpa professor", "desculpa para amigo"],
    keywords: ["desculpa", "perdão", "atraso", "erro", "faltei", "vacilei"],
  },
  {
    id: "mensagem-cobranca",
    category: "mensagem",
    title: "Cobrança educada",
    description: "Mensagem firme e educada para cobrar alguém.",
    examples: ["cobrar dívida", "cobrar pagamento", "lembrar valor pendente"],
    keywords: ["cobrar", "cobrança", "dívida", "divida", "pagamento", "valor", "pendente"],
  },
  {
    id: "mensagem-professor",
    category: "mensagem",
    title: "Mensagem para professor",
    description: "Pedido claro para professor, escola ou curso.",
    examples: ["mensagem para professor", "pedir prazo", "tirar dúvida"],
    keywords: ["professor", "escola", "atividade", "trabalho", "prazo", "dúvida", "duvida"],
  },
  {
    id: "checklist",
    category: "organizar",
    title: "Checklist universal",
    description: "Transforma qualquer tarefa em lista prática.",
    examples: ["checklist viagem", "lista mercado", "tarefas de hoje"],
    keywords: ["checklist", "lista", "viagem", "mercado", "compras", "tarefa", "tarefas", "organizar"],
  },
  {
    id: "apresentacao",
    category: "organizar",
    title: "Estrutura de apresentação",
    description: "Cria começo, meio e fim para apresentação ou slide.",
    examples: ["apresentação sobre água", "estrutura de slide", "trabalho escolar"],
    keywords: ["apresentação", "apresentacao", "slide", "slides", "seminário", "seminario", "tema"],
  },
  {
    id: "ideias",
    category: "ideia",
    title: "Gerador de ideias",
    description: "Cria ideias rápidas para post, status, projeto ou conteúdo.",
    examples: ["ideias para status", "nome de projeto", "legenda instagram"],
    keywords: ["ideia", "ideias", "nome", "legenda", "status", "post", "hashtag", "bio"],
  },
  {
    id: "email",
    category: "formal",
    title: "E-mail pronto",
    description: "Modelo de e-mail formal ou simples.",
    examples: ["email para cliente", "email formal", "email pedindo informação"],
    keywords: ["email", "e-mail", "cliente", "formal", "informação", "informacao"],
  },
  {
    id: "rotina",
    category: "rotina",
    title: "Rotina simples",
    description: "Organiza estudo, limpeza, autocuidado ou dia a dia.",
    examples: ["rotina de estudos", "limpeza da casa", "autocuidado"],
    keywords: ["rotina", "estudo", "estudos", "limpeza", "autocuidado", "prazo", "boletos"],
  },
];

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

export function findTool(input: string) {
  const text = normalize(input);
  const found = tools.find((tool) => tool.keywords.some((keyword) => text.includes(normalize(keyword))));
  return found ?? tools[0];
}

function topic(input: string) {
  return input.trim() || "isso";
}

function messageTemplate(input: string, type: string) {
  const assunto = topic(input);
  if (type === "mensagem-desculpa") {
    return `Oi! Quero pedir desculpa por ${assunto}.\n\nReconheço que poderia ter feito melhor e vou me organizar para isso não acontecer de novo. Obrigado por entender.`;
  }
  if (type === "mensagem-cobranca") {
    return `Oi! Tudo bem? Passando para lembrar sobre ${assunto}.\n\nQuando puder, me manda uma previsão para eu conseguir me organizar também.`;
  }
  if (type === "mensagem-professor") {
    return `Olá, professor(a). Tudo bem?\n\nEstou entrando em contato sobre ${assunto}. Poderia me orientar quando tiver um tempo? Obrigado(a).`;
  }
  return `Oi! Tudo bem? Passando para falar sobre ${assunto}.\n\nQueria resolver isso de forma simples e clara. Me responde quando puder?`;
}

function checklistTemplate(input: string) {
  const assunto = topic(input);
  return `Checklist: ${assunto}\n\n□ Entender o que precisa ser feito\n□ Separar o que é obrigatório\n□ Definir a primeira ação\n□ Conferir prazo, local ou limite\n□ Fazer a parte principal\n□ Revisar antes de finalizar\n□ Copiar, salvar ou compartilhar`;
}

function presentationTemplate(input: string) {
  const assunto = topic(input);
  return `Estrutura de apresentação: ${assunto}\n\n1. Abertura\nApresente o tema em uma frase simples.\n\n2. Contexto\nExplique por que isso importa.\n\n3. Pontos principais\nMostre 3 ideias importantes.\n\n4. Exemplo\nUse uma situação fácil de entender.\n\n5. Fechamento\nFinalize com uma conclusão curta.\n\nFrase inicial:\nHoje vou falar sobre ${assunto}. Esse tema é importante porque aparece no nosso dia a dia e ajuda a entender melhor o assunto.`;
}

function ideasTemplate(input: string) {
  const assunto = topic(input);
  return `Ideias rápidas: ${assunto}\n\n1. Transforme em checklist\n2. Faça um antes e depois\n3. Crie uma frase curta para postar\n4. Explique com um exemplo real\n5. Separe em começo, meio e fim\n6. Crie uma pergunta para gerar conversa\n7. Faça uma versão mais simples para WhatsApp`;
}

function emailTemplate(input: string) {
  const assunto = topic(input);
  return `Assunto: ${assunto}\n\nOlá, tudo bem?\n\nEstou entrando em contato sobre ${assunto}. Gostaria de alinhar essa situação de forma clara e objetiva.\n\nFico no aguardo do seu retorno.\n\nAtenciosamente,\n[Seu nome]`;
}

function routineTemplate(input: string) {
  const assunto = topic(input);
  return `Rotina simples: ${assunto}\n\nManhã:\n□ Fazer a tarefa mais importante\n□ Separar o que será usado\n\nTarde:\n□ Resolver pendências pequenas\n□ Revisar o progresso\n\nNoite:\n□ Organizar o próximo dia\n□ Separar 10 minutos para descanso\n\nRegra: comece pelo mais fácil para ganhar ritmo.`;
}

export function generateToolResult(input: string): ToolResult {
  const tool = findTool(input);
  let output = "";

  if (tool.id.startsWith("mensagem")) output = messageTemplate(input, tool.id);
  else if (tool.id === "checklist") output = checklistTemplate(input);
  else if (tool.id === "apresentacao") output = presentationTemplate(input);
  else if (tool.id === "ideias") output = ideasTemplate(input);
  else if (tool.id === "email") output = emailTemplate(input);
  else if (tool.id === "rotina") output = routineTemplate(input);
  else output = checklistTemplate(input);

  return {
    tool,
    input,
    title: tool.title,
    output,
    actions: ["Copiar", "Compartilhar", "Gerar outro"],
  };
}
