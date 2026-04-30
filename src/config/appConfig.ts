export const appConfig = {
  brand: {
    name: "AprendaJá",
    company: "THKLAYUS",
    subtitle: "Grátis e rápido",
    tagline: "Resolva tarefas rápidas com modelos gratuitos.",
  },

  product: {
    currentDirection: "hub-gratuito-com-servicos-simples",
    promise: "Entrar travado, resolver de graça e pedir ajuda paga só quando precisar.",
    mainUserAction: "Resolver grátis",
    secondaryUserAction: "Pedir trabalho pronto",
    monetizationMode: "free_first_with_simple_services",
    monthGoal: {
      enabled: true,
      target: "R$ 1.000 em 30 dias",
      strategy: "modelos grátis puxam usuários; serviços simples convertem pedidos rápidos",
      focus: "vender entregas pequenas e rápidas, não curso grande",
    },
    avoid: [
      "parecer loja de curso",
      "parecer que tudo é pago",
      "vender coisa difícil de entregar",
      "prometer resultado impossível",
      "forçar cadastro antes do usuário entender valor",
    ],
    pillars: [
      {
        title: "Resolver grátis",
        description: "Gerar uma base rápida para apresentação, resumo, mensagem, ideia ou checklist.",
        page: "resolver",
      },
      {
        title: "Modelos grátis",
        description: "Copiar modelos prontos organizados por situação real.",
        page: "cursos",
      },
      {
        title: "Trabalho pronto",
        description: "Pedir slide, resumo, arte ou apresentação pronta quando precisar de algo melhor.",
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
      { id: "resolver", label: "Grátis", icon: "✦" },
      { id: "cursos", label: "Modelos", icon: "◇" },
      { id: "pedidos", label: "Pedir", icon: "⚡" },
      { id: "estudo", label: "Meus", icon: "□" },
      { id: "admin", label: "ADM", icon: "♛" },
    ],
  },

  navigation: {
    primaryAction: "Resolver grátis",
    modelsAction: "Ver modelos grátis",
    helpAction: "Pedir trabalho pronto",
    accountAction: "Meus itens",
  },

  home: {
    eyebrow: "Grátis para escola, WhatsApp, trabalho e organização",
    title: "Resolva de graça. Se quiser melhor, peça pronto.",
    subtitle:
      "Use modelos gratuitos para começar rápido. Se precisar de slide, resumo, arte ou apresentação mais caprichada, peça um trabalho pronto pelo app.",
    primaryAction: "Resolver grátis",
    helper: "Primeiro o usuário recebe valor grátis. Depois, se quiser economizar tempo, pode pedir ajuda paga.",
    powerTitle: "Grátis primeiro, serviço depois.",
    powerText:
      "O app atrai pessoas com utilidade gratuita e converte pedidos simples para quem quer algo pronto, bonito e entregue com mais cuidado.",
    feelingTitle: "Rápido de entender. Fácil de comprar.",
    feelingText:
      "Nada de curso gigante agora. A meta é vender entregas pequenas: slides, resumos, artes e organização de trabalhos.",
    features: [
      {
        title: "Grátis de verdade",
        desc: "O usuário consegue resolver tarefas sem comprar nada.",
        icon: "⚡",
      },
      {
        title: "Trabalho pronto",
        desc: "Quem quiser algo melhor pode pedir slide, resumo, arte ou apresentação.",
        icon: "📦",
      },
      {
        title: "Entrega simples",
        desc: "Foco em pedidos pequenos para vender rápido e entregar sem travar.",
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
    categoryHint: "Cada botão abre uma base gratuita para adaptar.",
  },

  resolver: {
    title: "Resolver grátis",
    subtitle: "Gere uma base simples para copiar e adaptar sem pagar.",
    inputLabel: "Tema ou situação",
    inputPlaceholder: "Ex: trabalho de escola sobre tecnologia",
    copyLabel: "Copiar grátis",
    copiedLabel: "Copiado!",
    helpCta: "Quero esse trabalho pronto",
    types: [
      { id: "apresentacao", name: "Apresentação", icon: "🎤" },
      { id: "resumo", name: "Resumo", icon: "📝" },
      { id: "ideias", name: "Ideias", icon: "💡" },
      { id: "roteiro", name: "Roteiro", icon: "🧭" },
    ],
  },

  freeArea: {
    generator: {
      eyebrow: "Gerador grátis",
      title: "Gerar ideias para qualquer tema",
      helper: "Digite um tema e crie opções rápidas para adaptar.",
      inputPlaceholder: "Digite um tema...",
      actionLabel: "Gerar ideias grátis",
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
      eyebrow: "Conteúdo grátis do dia",
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
      enabled: true,
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
          text: "Tô apoiando um projeto pequeno e gratuito. Se puder, entra e compartilha com alguém. Isso ajuda demais.",
        },
        {
          title: "Status pronto",
          text: "Projeto gratuito novo no ar 🚀 tem modelos e ideias rápidas para o dia a dia.",
        },
      ],
    },
  },

  models: {
    title: "Modelos gratuitos para adaptar",
    subtitle: "Use bases simples para começar tarefas sem pensar do zero.",
    quickTitle: "Resolver rápido grátis",
    extrasTitle: "Serviços rápidos",
    paidExtrasLabel: "Opcional",
  },

  services: {
    enabled: true,
    title: "Quer que eu faça pronto pra você?",
    subtitle: "Peça um slide, resumo, arte ou apresentação pronta. A parte grátis continua liberada; isso é só para quem quer economizar tempo.",
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
