export const appConfig = {
  brand: {
    name: "AprendaJá",
    company: "THKLAYUS",
    subtitle: "Modelos prontos",
    tagline: "Resolva tarefas rápidas com modelos prontos.",
  },

  features: {
    enableTemplates: true,
    enableResolver: true,
    enableTickets: true,
    enableAdmin: true,
    enableServices: true,
    enableCourses: false,
    enablePayments: false,
    enableCertificates: false,
  },

  product: {
    currentDirection: "utilidade-rapida-modelos-pedidos",
    promise: "Entrar, escolher uma base e resolver uma tarefa em segundos.",
    mainUserAction: "Começar agora",
    secondaryUserAction: "Pedir ajuda",
    monetizationMode: "templates_first_optional_services",
    monthGoal: {
      enabled: true,
      target: "R$ 1.000 em 30 dias",
      strategy: "modelos úteis geram confiança; pedidos prontos entram como extra opcional",
      focus: "vender ajuda rápida, apresentações, resumos, artes simples e tarefas sob demanda",
    },
    avoid: [
      "parecer loja de curso",
      "mostrar certificado",
      "parecer que tudo é pago",
      "vender coisa difícil de entregar",
      "prometer resultado impossível",
      "forçar cadastro antes do usuário entender valor",
      "mostrar pagamento automático antes do app parecer confiável",
    ],
    pillars: [
      { title: "Modelos prontos", description: "Copiar bases úteis organizadas por situação real.", page: "modelos" },
      { title: "Resolver tarefa", description: "Gerar base para mensagem, resumo, apresentação, ideia e checklist.", page: "resolver" },
      { title: "Pedidos e suporte", description: "Pedir ajuda, slide, resumo, arte ou apresentação pronta quando quiser economizar tempo.", page: "pedidos" },
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
      { id: "modelos", label: "Modelos", icon: "◇" },
      { id: "resolver", label: "Resolver", icon: "✦" },
      { id: "pedidos", label: "Pedidos", icon: "⚡" },
      { id: "admin", label: "Dono", icon: "♛" },
    ],
  },

  navigation: {
    primaryAction: "Começar agora",
    modelsAction: "Ver modelos",
    helpAction: "Pedir ajuda",
    accountAction: "Meus itens",
  },

  home: {
    eyebrow: "Para escola, trabalho e tarefas rápidas",
    title: "Resolva tarefas rápidas com modelos prontos.",
    subtitle: "Escolha uma situação, copie uma base e adapte em segundos para escola, trabalho, mensagens ou organização.",
    primaryAction: "Começar agora",
    helper: "Sem curso. Sem enrolação. Só escolher, copiar, adaptar e usar.",
    powerTitle: "Mais úteis hoje",
    powerText: "Mensagem para professor, resumo escolar, roteiro de apresentação, proposta de serviço, cobrança educada e checklist.",
    feelingTitle: "Você não precisa começar do zero.",
    feelingText: "O AprendaJá te dá uma base pronta para você adaptar com suas palavras.",
    features: [
      { title: "Escola", desc: "Resumo, apresentação, roteiro e mensagem para professor.", icon: "🎓" },
      { title: "Trabalho", desc: "Proposta, cobrança educada e atendimento básico.", icon: "💼" },
      { title: "Organização", desc: "Checklist, ideias rápidas e plano simples para começar.", icon: "⚡" },
    ],
    categories: [
      "Mensagem para professor",
      "Resumo escolar",
      "Roteiro de apresentação",
      "Checklist rápido",
      "Proposta de serviço",
      "Cobrança educada",
    ],
    categoryHint: "Cada botão deve levar para um modelo claro, curto e útil.",
  },

  resolver: {
    title: "Resolver tarefa",
    subtitle: "Gere uma base simples para copiar, adaptar e usar sem pagar.",
    inputLabel: "Tema ou situação",
    inputPlaceholder: "Ex: apresentação sobre tecnologia na escola",
    copyLabel: "Copiar e usar",
    copiedLabel: "Copiado!",
    helpCta: "Quero ajuda com isso",
    types: [
      { id: "apresentacao", name: "Apresentação", icon: "🎤" },
      { id: "resumo", name: "Resumo", icon: "📝" },
      { id: "mensagem", name: "Mensagem", icon: "💬" },
      { id: "checklist", name: "Checklist", icon: "✅" },
    ],
  },

  freeArea: {
    generator: {
      eyebrow: "Gerador simples",
      title: "Gerar ideias para qualquer tema",
      helper: "Digite um tema e crie opções rápidas para adaptar.",
      inputPlaceholder: "Digite um tema...",
      actionLabel: "Gerar ideias",
      defaultTopic: "minha tarefa",
      tags: ["escola", "trabalho", "WhatsApp", "apresentação", "arte", "organização", "ideias", "família"],
      resultTemplates: [
        "3 ideias simples sobre {topic}",
        "Uma frase curta para explicar {topic}",
        "Um checklist simples para organizar {topic}",
        "Uma mensagem de WhatsApp explicando {topic}",
      ],
    },
    daily: {
      eyebrow: "Ideia do dia",
      title: "Ideia rápida",
      category: "Criatividade",
      text: "Pegue uma tarefa pequena que você está enrolando e transforme em 3 passos simples.",
      copyLabel: "Copiar",
      shareLabel: "Compartilhar",
    },
    streak: {
      enabled: true,
      eyebrow: "Voltar quando travar",
      title: "Uso rápido",
      text: "Use o AprendaJá quando precisar começar algo sem pensar do zero.",
      items: [
        "Abra quando travar em uma tarefa pequena.",
        "Adapte os modelos com suas palavras.",
        "Peça ajuda quando quiser algo mais pronto.",
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
      enabled: true,
      showAfterVisits: 3,
      eyebrow: "Convite leve",
      title: "Compartilhe se o app ajudou",
      messages: [
        { title: "Manda para alguém que precisa", text: "Achei o AprendaJá, um app simples para resolver tarefas rápidas com modelos prontos. Testa aí e me fala se presta 😄" },
        { title: "Divulgação leve", text: "Tô apoiando um projeto pequeno e gratuito. Se puder, entra e compartilha com alguém. Isso ajuda demais." },
        { title: "Status pronto", text: "Projeto gratuito novo no ar 🚀 AprendaJá: modelos prontos para tarefas rápidas." },
      ],
    },
  },

  models: {
    title: "Modelos prontos para adaptar",
    subtitle: "Use bases simples para começar tarefas sem pensar do zero.",
    quickTitle: "Modelos rápidos",
    extrasTitle: "Pedidos e suporte",
    paidExtrasLabel: "Opcional",
  },

  tickets: {
    enabled: true,
    title: "Pedidos e suporte",
    subtitle: "Peça ajuda, acompanhe seu pedido ou mande uma tarefa para ser feita.",
    primaryAction: "Abrir pedido",
    statuses: {
      open: "Aberto",
      review: "Em análise",
      answered: "Respondido",
      closed: "Fechado",
    },
    types: [
      "Ajuda com tarefa",
      "Resumo pronto",
      "Slides simples",
      "Arte simples",
      "Apresentação caprichada",
      "Suporte do app",
    ],
  },

  services: {
    enabled: true,
    title: "Quer que eu faça pronto pra você?",
    subtitle: "Peça um slide, resumo, arte ou apresentação pronta. O AprendaJá continua gratuito; isso é só para quem quer economizar tempo.",
    primaryAction: "Pedir agora",
    offers: [
      { title: "Resumo simples", price: "R$ 5", description: "Resumo organizado e pronto para adaptar." },
      { title: "Slides simples", price: "R$ 10", description: "Estrutura de apresentação com capa, tópicos e conclusão." },
      { title: "Apresentação caprichada", price: "R$ 15", description: "Texto + organização visual + roteiro de fala." },
      { title: "Arte simples", price: "R$ 10", description: "Imagem/post simples para divulgação." },
    ],
  },

  admin: {
    enabled: true,
    showCourseQuality: false,
    showManualRelease: true,
    showQueue: true,
    showHiddenFilter: true,
    qualityTitle: "Validação de qualidade",
    manualReleaseTitle: "Liberar item manualmente",
    queueTitle: "Fila de pedidos e suporte",
  },
};

export type AppConfig = typeof appConfig;
