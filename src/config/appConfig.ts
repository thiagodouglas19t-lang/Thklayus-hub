export const appConfig = {
  brand: {
    name: "AprendaJá",
    company: "THKLAYUS",
    subtitle: "Utilidade rápida",
    tagline: "Resolva tarefas rápidas com modelos prontos.",
  },

  product: {
    currentDirection: "hub-utilidade-rapida",
    promise: "Entrar travado, escolher uma situação, copiar uma base e adaptar.",
    mainUserAction: "Resolver agora",
    secondaryUserAction: "Ver modelos",
    avoid: [
      "parecer loja de curso",
      "mostrar páginas demais de uma vez",
      "encher a tela com opções sem prioridade",
      "forçar cadastro antes do usuário entender valor",
    ],
    pillars: [
      {
        title: "Resolver",
        description: "Gerar uma base rápida para apresentação, resumo, mensagem, ideia ou checklist.",
        page: "resolver",
      },
      {
        title: "Modelos",
        description: "Copiar modelos prontos organizados por situação real.",
        page: "cursos",
      },
      {
        title: "Ajuda",
        description: "Pedir apoio extra quando o modelo pronto não for suficiente.",
        page: "pedidos",
      },
      {
        title: "Meus itens",
        description: "Guardar acessos, conteúdos liberados e histórico do usuário.",
        page: "estudo",
      },
    ],
  },

  header: {
    enabled: true,
    showBrand: true,
    showSubtitle: true,
    showLogout: true,
    showLoggedEmailBar: false,
    loggedEmailLabel: "Logado como",
    logoutLabel: "Sair",
    loginLabel: "Entrar",
    freeExploreLabel: "Explorar grátis",
  },

  bottomNav: {
    enabled: true,
    showAdminTab: true,
    safeBottomPadding: "pb-28",
    items: [
      { id: "home", label: "Início", icon: "⌂" },
      { id: "resolver", label: "Resolver", icon: "✦" },
      { id: "cursos", label: "Modelos", icon: "◇" },
      { id: "pedidos", label: "Ajuda", icon: "●" },
      { id: "estudo", label: "Meus", icon: "□" },
      { id: "admin", label: "ADM", icon: "♛" },
    ],
  },

  navigation: {
    primaryAction: "Resolver agora",
    modelsAction: "Ver modelos",
    helpAction: "Pedir ajuda",
    accountAction: "Meus itens",
  },

  home: {
    eyebrow: "Para escola, WhatsApp, trabalho e organização",
    title: "Resolva uma tarefa sem começar do zero.",
    subtitle:
      "Escolha uma situação, pegue uma base pronta e adapte com suas palavras. O app serve para mensagem, apresentação, checklist, divulgação, resumo e ideia rápida.",
    primaryAction: "Resolver agora",
    helper: "Uma ação principal por vez. Primeiro resolva. Depois aprofunde se precisar.",
    powerTitle: "O app não é só de curso.",
    powerText:
      "Cursos e extras podem existir, mas a experiência principal é utilidade rápida: abrir, copiar, adaptar e sair com algo pronto.",
    feelingTitle: "Menos bagunça. Mais direção.",
    feelingText:
      "Tudo fica organizado em poucas áreas para o usuário entender o valor antes de comprar qualquer coisa.",
    features: [
      {
        title: "Começa rápido",
        desc: "O usuário vê valor antes de precisar criar conta ou pagar.",
        icon: "⚡",
      },
      {
        title: "Modelos úteis",
        desc: "Conteúdo pronto para adaptar, não texto gigante sem direção.",
        icon: "◇",
      },
      {
        title: "Ajuda opcional",
        desc: "Quando o modelo não basta, o usuário pode pedir suporte ou serviço extra.",
        icon: "✦",
      },
    ],
    categories: [
      "Responder mensagem",
      "Começar apresentação",
      "Fazer resumo",
      "Montar checklist",
      "Divulgar algo",
      "Ter ideia quando travar",
    ],
    categoryHint: "Cada botão leva para uma base pronta para adaptar.",
  },

  resolver: {
    title: "Resolver agora",
    subtitle: "Gere uma base simples para copiar e adaptar.",
    inputLabel: "Tema ou situação",
    inputPlaceholder: "Ex: trabalho de escola sobre tecnologia",
    copyLabel: "Copiar resultado",
    copiedLabel: "Copiado!",
    types: [
      { id: "apresentacao", name: "Apresentação", icon: "🎤" },
      { id: "resumo", name: "Resumo", icon: "📝" },
      { id: "ideias", name: "Ideias", icon: "💡" },
      { id: "roteiro", name: "Roteiro", icon: "🧭" },
    ],
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
    quickTitle: "Resolver rápido",
    extrasTitle: "Conteúdo extra para aprofundar",
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
