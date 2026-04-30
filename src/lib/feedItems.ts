export type FeedCategory = "Hoje" | "WhatsApp" | "Escola" | "Trabalho" | "Organização" | "Ideias";

export type FeedItem = {
  id: string;
  category: FeedCategory;
  title: string;
  description: string;
  content: string;
  tags: string[];
};

export const feedCategories: FeedCategory[] = ["Hoje", "WhatsApp", "Escola", "Trabalho", "Organização", "Ideias"];

export const feedItems: FeedItem[] = [
  {
    id: "msg-desculpa",
    category: "WhatsApp",
    title: "Pedir desculpa sem enrolar",
    description: "Mensagem curta para quando você errou ou atrasou.",
    content: "Oi! Desculpa pelo ocorrido. Eu reconheço que poderia ter feito melhor e vou me organizar para isso não acontecer de novo. Obrigado por entender.",
    tags: ["mensagem", "desculpa", "whatsapp"],
  },
  {
    id: "msg-cobranca",
    category: "WhatsApp",
    title: "Cobrança educada",
    description: "Cobrar sem parecer grosso.",
    content: "Oi! Tudo bem? Passando só para lembrar daquele valor pendente. Quando puder, me manda uma previsão para eu conseguir me organizar também.",
    tags: ["cobrança", "dinheiro", "whatsapp"],
  },
  {
    id: "professor-duvida",
    category: "Escola",
    title: "Mensagem para professor",
    description: "Pedir orientação de forma educada.",
    content: "Olá, professor(a). Tudo bem? Estou entrando em contato para tirar uma dúvida sobre a atividade. Quando puder, poderia me orientar? Obrigado(a).",
    tags: ["escola", "professor", "atividade"],
  },
  {
    id: "apresentacao-base",
    category: "Escola",
    title: "Estrutura de apresentação",
    description: "Começo, meio e fim para slide/trabalho.",
    content: "1. Abertura: apresente o tema em uma frase simples.\n2. Contexto: explique por que isso importa.\n3. Pontos principais: mostre 3 ideias importantes.\n4. Exemplo: use uma situação fácil de entender.\n5. Fechamento: finalize com uma conclusão curta.",
    tags: ["slide", "apresentação", "trabalho"],
  },
  {
    id: "checklist-dia",
    category: "Organização",
    title: "Checklist para destravar o dia",
    description: "Lista simples para organizar qualquer tarefa.",
    content: "□ Escolher 1 tarefa principal\n□ Separar o que é obrigatório\n□ Fazer a primeira ação pequena\n□ Remover distrações por 20 minutos\n□ Revisar o que foi feito\n□ Definir o próximo passo",
    tags: ["checklist", "rotina", "organização"],
  },
  {
    id: "ideia-post",
    category: "Ideias",
    title: "Ideia rápida de post",
    description: "Formato simples para postar algo útil.",
    content: "Poste um antes/depois:\n\nAntes: eu travava tentando começar.\nDepois: pego uma base pronta, adapto e sigo.\n\nPergunta final: qual tarefa você mais enrola para começar?",
    tags: ["post", "status", "conteúdo"],
  },
  {
    id: "email-formal",
    category: "Trabalho",
    title: "E-mail formal simples",
    description: "Modelo limpo para pedir ou alinhar algo.",
    content: "Assunto: Alinhamento\n\nOlá, tudo bem?\n\nEstou entrando em contato para alinhar essa situação de forma clara e objetiva. Quando puder, poderia me retornar com uma orientação?\n\nAtenciosamente,\n[Seu nome]",
    tags: ["email", "trabalho", "formal"],
  },
  {
    id: "roteiro-reuniao",
    category: "Trabalho",
    title: "Roteiro de reunião curta",
    description: "Para não chegar perdido em reunião.",
    content: "1. Objetivo da reunião\n2. O que já foi feito\n3. O que está travando\n4. Decisão necessária\n5. Próxima ação com responsável e prazo",
    tags: ["reunião", "trabalho", "roteiro"],
  },
  {
    id: "convite-simples",
    category: "WhatsApp",
    title: "Convite simples",
    description: "Chamar alguém sem texto grande.",
    content: "Oi! Tudo bem? Vou fazer algo simples e queria te chamar. Se puder ir, vai ser muito massa. Me avisa depois?",
    tags: ["convite", "whatsapp", "evento"],
  },
  {
    id: "nome-projeto",
    category: "Ideias",
    title: "Ideias de nome para projeto",
    description: "Um jeito rápido de pensar nomes.",
    content: "Tente nomes curtos com 2 ideias juntas:\n\n1. Luz + ação\n2. Tempo + foco\n3. Simples + rápido\n4. Ideia + começo\n5. Mente + prática\n\nRegra: se a pessoa não consegue lembrar, o nome é complicado demais.",
    tags: ["nome", "projeto", "marca"],
  },
];

export function getTodayItems() {
  const day = new Date().getDate();
  return feedItems.filter((_, index) => (index + day) % 2 === 0).slice(0, 6);
}
