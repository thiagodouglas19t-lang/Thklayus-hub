export const appConfig = {
  brand: {
    name: "AprendaJá",
    company: "THKLAYUS Hub",
    tagline: "Resolva tarefas rápidas com modelos prontos.",
  },
  navigation: {
    primaryAction: "Resolver agora",
    modelsAction: "Ver modelos",
  },
  freeArea: {
    generator: {
      eyebrow: "Gerador simples",
      title: "Gerar ideias para qualquer tema",
      helper: "Digite um tema e crie opções rápidas para adaptar.",
      inputPlaceholder: "Digite um tema...",
      actionLabel: "Gerar ideias",
      defaultTopic: "meu projeto",
      tags: ["escola", "dinheiro", "status", "WhatsApp", "apresentação", "arte", "organização", "família"],
    },
    daily: {
      eyebrow: "Conteúdo do dia",
      title: "Ideia de conteúdo",
      category: "Criatividade",
      text: "Poste uma lista com 5 coisas que você faria diferente se começasse seu projeto hoje.",
    },
    streak: {
      eyebrow: "Voltar todo dia",
      title: "Sequência diária",
      text: "Cada visita conta no seu aparelho. Volte para pegar uma ideia nova quando precisar.",
      items: [
        "Abra quando travar em uma tarefa pequena.",
        "Adapte os modelos com suas palavras.",
        "Compartilhe só se o app realmente te ajudou.",
        "Conteúdo simples ganha quando é útil e rápido.",
      ],
    },
    ads: {
      enabled: false,
      title: "Novidades futuras",
      description: "Este espaço será usado apenas quando fizer sentido para a experiência.",
    },
    sharing: {
      enabled: false,
      title: "Convite leve",
      messages: [
        {
          title: "Manda para alguém que precisa",
          text: "Achei um app grátis com modelos e ideias para resolver tarefas rápidas. Testa aí e me fala se presta 😄",
        },
        {
          title: "Divulgação leve",
          text: "Tô apoiando um projeto pequeno. Se puder, entra e compartilha com alguém. Isso ajuda demais.",
        },
        {
          title: "Status pronto",
          text: "Projeto novo no ar 🚀 tem modelos e ideias rápidas para o dia a dia.",
        },
      ],
    },
  },
};

export type AppConfig = typeof appConfig;
