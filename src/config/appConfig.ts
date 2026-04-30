export const appConfig = {
  brand: {
    name: "AprendaJá",
    company: "THKLAYUS",
    subtitle: "Hub gratuito",
    tagline: "Resolva tarefas rápidas com modelos prontos.",
  },

  header: {
    enabled: true,
    showBrand: true,
    showSubtitle: true,
    showLogout: true,
    showLoggedEmailBar: false,
    loggedEmailLabel: "Logado como",
    logoutLabel: "Sair",
  },

  bottomNav: {
    enabled: true,
    showAdminTab: true,
    safeBottomPadding: "pb-28",
    items: [
      { id: "home", label: "Início", icon: "⌂" },
      { id: "pedidos", label: "Serviços", icon: "✦" },
      { id: "chat", label: "Suporte", icon: "●" },
      { id: "cursos", label: "Modelos", icon: "◇" },
      { id: "estudo", label: "Meus", icon: "□" },
      { id: "admin", label: "ADM", icon: "♛" },
    ],
  },

  navigation: {
    primaryAction: "Resolver agora",
    modelsAction: "Ver modelos",
  },

  home: {
    eyebrow: "Para rua, escola e trabalho",
    title: "Resolva uma tarefa em poucos segundos.",
    subtitle:
      "Abra, escolha o que precisa e pegue uma base pronta para adaptar. Serve para mensagem, apresentação, checklist, divulgação e ideias quando você trava.",
    primaryAction: "Resolver agora",
    helper: "Sem manual. Sem enrolação. Escolha uma tarefa e comece.",
    powerTitle: "Poder de tempo",
    powerText:
      "O AprendaJá não tenta fazer mil coisas. Ele te ajuda a sair do zero rápido quando você precisa escrever, organizar ou começar algo.",
    feelingTitle: "Feche o app mais aliviado.",
    feelingText:
      "A missão é simples: você entra travado, pega uma base, adapta e sai com algo pronto para usar.",
    features: [
      {
        title: "Funciona no improviso",
        desc: "Use na fila, na escola, em casa ou antes de uma reunião.",
        icon: "⚡",
      },
      {
        title: "Começa em segundos",
        desc: "Sem cadastro gigante e sem tutorial complicado para entender.",
        icon: "◈",
      },
      {
        title: "Dá direção",
        desc: "Você ganha uma base clara para adaptar ao seu caso.",
        icon: "✍️",
      },
    ],
    categories: [
      "Responder mensagem",
      "Começar apresentação",
      "Organizar tarefa",
      "Montar checklist",
      "Divulgar algo",
      "Ter ideia quando travar",
    ],
    categoryHint: "Abrir uma base pronta para adaptar.",
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
      resultTemplates: [
        "3 ideias de post sobre {topic}",
        "Uma frase curta para divulgar {topic}",
        "Um checklist simples para organizar {topic}",
        "Uma mensagem de WhatsApp explicando {topic}",
      ],
    },
    daily: {
      eyebrow: "Conteúdo do dia",
      title: "Ideia de conteúdo",
      category: "Criatividade",
      text: "Poste uma lista com 5 coisas que você faria diferente se começasse seu projeto hoje.",
      copyLabel: "Copiar",
      shareLabel: "Compartilhar",
    },
    streak: {
      enabled: true,
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
      eyebrow: "Novidades futuras",
      title: "Espaço reservado",
      description: "Este espaço será usado apenas quando fizer sentido para a experiência.",
      placeholder: "Conteúdo futuro",
    },
    sharing: {
      enabled: false,
      showAfterVisits: 3,
      eyebrow: "Convite leve",
      title: "Compartilhe se o app ajudou",
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

  models: {
    title: "Modelos prontos para adaptar",
    subtitle: "Use bases simples para começar tarefas sem pensar do zero.",
    paidExtrasLabel: "Extra opcional",
  },

  services: {
    enabled: true,
    title: "Peça ajuda quando precisar.",
    subtitle: "Serviços são apoio extra. O foco principal continua sendo modelos grátis.",
    primaryAction: "Enviar pedido",
  },

  admin: {
    enabled: true,
    showCourseQuality: true,
    showManualRelease: true,
    showQueue: true,
    showHiddenFilter: true,
    qualityTitle: "Validação de qualidade dos conteúdos",
    manualReleaseTitle: "Liberar item manualmente",
    queueTitle: "Fila de atendimento",
  },
};

export type AppConfig = typeof appConfig;
