export const appConfig = {
  brand: {
    name: "AprendaJá",
    company: "THKLAYUS",
    subtitle: "Grátis e rápido",
    tagline: "Resolva tarefas rápidas com modelos gratuitos.",
  },

  product: {
    currentDirection: "hub-gratuito-utilidade-rapida",
    promise: "Entrar travado, escolher uma situação, copiar uma base gratuita e adaptar.",
    mainUserAction: "Resolver grátis",
    secondaryUserAction: "Ver modelos grátis",
    monetizationMode: "free_first",
    avoid: [
      "parecer loja de curso",
      "parecer que tudo é pago",
      "mostrar páginas demais de uma vez",
      "encher a tela com opções sem prioridade",
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
        title: "Ajuda opcional",
        description: "Só pedir apoio extra quando o modelo gratuito não for suficiente.",
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
      { id: "gratis", label: "Ideias", icon: "💡" },
      { id: "estudo", label: "Meus", icon: "□" },
      { id: "admin", label: "ADM", icon: "♛" },
    ],
  },

  navigation: {
    primaryAction: "Resolver grátis",
    modelsAction: "Ver modelos grátis",
    helpAction: "Ajuda opcional",
    accountAction: "Meus itens",
  },

  home: {
    eyebrow: "Grátis para escola, WhatsApp, trabalho e organização",
    title: "Resolva uma tarefa sem pagar e sem começar do zero.",
    subtitle:
      "Escolha uma situação, pegue uma base gratuita e adapte com suas palavras. O app serve para mensagem, apresentação, checklist, divulgação, resumo e ideia rápida.",
    primaryAction: "Resolver grátis",
    helper: "Primeiro o usuário resolve de graça. Ajuda extra só aparece como opção secundária.",
    powerTitle: "O app é gratuito primeiro.",
    powerText:
      "O foco principal é entregar valor grátis: abrir, copiar, adaptar e sair com algo pronto. Serviços e extras não devem dominar a experiência.",
    feelingTitle: "Simples, leve e útil.",
    feelingText:
      "A pessoa entende o app em poucos segundos e usa sem sentir que caiu em uma loja.",
    features: [
      {
        title: "Grátis de verdade",
        desc: "O usuário consegue resolver tarefas sem comprar nada.",
        icon: "⚡",
      },
      {
        title: "Modelos úteis",
        desc: "Conteúdo pronto para adaptar, não texto gigante sem direção.",
        icon: "◇",
      },
      {
        title: "Ajuda discreta",
        desc: "Serviços ficam como opção secundária, não como foco da tela.",
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
    helpCta: "Preciso de ajuda extra",
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
    extrasTitle: "Extras opcionais",
    paidExtrasLabel: "Opcional",
  },

  services: {
    enabled: false,
    title: "Ajuda extra opcional.",
    subtitle: "Aparece só quando o usuário realmente precisar de apoio além dos modelos grátis.",
    primaryAction: "Pedir ajuda extra",
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
