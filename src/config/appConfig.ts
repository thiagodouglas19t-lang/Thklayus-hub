export const appConfig = {
  brand: {
    name: "Drafta",
    company: "THKLAYUS",
    subtitle: "Bases prontas",
    tagline: "Bases prontas para resolver tarefas em segundos.",
  },

  product: {
    currentDirection: "templates-rapidos-estudante-freela",
    promise: "Entrar, escolher uma base e copiar em segundos.",
    mainUserAction: "Ver modelos",
    secondaryUserAction: "Pedir pronto",
    monetizationMode: "templates_first_optional_services",
    monthGoal: {
      enabled: true,
      target: "R$ 1.000 em 30 dias",
      strategy: "templates úteis geram confiança; pedidos prontos aparecem como extra opcional",
      focus: "vender entregas pequenas e rápidas, sem curso e sem certificado",
    },
    avoid: ["parecer loja de curso", "mostrar certificado", "parecer que tudo é pago", "vender coisa difícil de entregar", "prometer resultado impossível", "forçar cadastro antes do usuário entender valor"],
    pillars: [
      { title: "Modelos prontos", description: "Copiar modelos úteis organizados por situação real.", page: "cursos" },
      { title: "Draftar tarefa", description: "Gerar base para mensagem, resumo, apresentação e checklist.", page: "resolver" },
      { title: "Pedido pronto", description: "Pedir slide, resumo, arte ou apresentação pronta quando quiser economizar tempo.", page: "pedidos" },
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
      { id: "cursos", label: "Modelos", icon: "◇" },
      { id: "resolver", label: "Draftar", icon: "✦" },
      { id: "pedidos", label: "Pedir", icon: "⚡" },
      { id: "admin", label: "Dono", icon: "♛" },
    ],
  },

  navigation: { primaryAction: "Ver modelos", modelsAction: "Ver modelos", helpAction: "Pedir pronto", accountAction: "Meus itens" },

  home: {
    eyebrow: "Sem IA • sem curso • rápido",
    title: "Copie uma base pronta. Resolva em segundos.",
    subtitle: "Drafta é para estudante e freelancer que não quer começar do zero: mensagem, resumo, proposta, cobrança, preço e apresentação.",
    primaryAction: "Ver modelos",
    helper: "Não é curso. Não é certificado. É uma ferramenta para copiar, adaptar e seguir.",
    powerTitle: "O que dá pra fazer aqui?",
    powerText: "Você escolhe sua situação, copia uma base pronta e adapta com suas palavras.",
    feelingTitle: "Entendeu em 5 segundos.",
    feelingText: "Primeiro vem utilidade. Se quiser economizar tempo, você pode pedir pronto depois.",
    features: [
      { title: "Modelos com vibe", desc: "Simples, formal ou direto para copiar sem parecer robô.", icon: "◇" },
      { title: "Draftar rápido", desc: "Bases prontas para mensagem, resumo, apresentação e proposta.", icon: "✦" },
      { title: "Pedido opcional", desc: "Se quiser algo pronto, peça sem sair do app.", icon: "⚡" },
    ],
    categories: ["Cobrar cliente", "Mensagem para professor", "Proposta de serviço", "Resumo escolar", "Calcular preço", "Roteiro de apresentação"],
    categoryHint: "Cada botão leva para um modelo claro e rápido.",
  },

  resolver: {
    title: "Draftar tarefa",
    subtitle: "Gere uma base simples para copiar e adaptar sem pagar.",
    inputLabel: "Tema ou situação",
    inputPlaceholder: "Ex: trabalho de escola sobre tecnologia",
    copyLabel: "Copiar",
    copiedLabel: "Copiado!",
    helpCta: "Quero isso pronto",
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
      resultTemplates: ["3 ideias de post sobre {topic}", "Uma frase curta para divulgar {topic}", "Um checklist simples para organizar {topic}", "Uma mensagem de WhatsApp explicando {topic}"],
    },
    daily: { eyebrow: "Ideia do dia", title: "Ideia de conteúdo", category: "Criatividade", text: "Poste uma lista com 5 coisas que você faria diferente se começasse seu projeto hoje.", copyLabel: "Copiar", shareLabel: "Compartilhar" },
    streak: { enabled: true, eyebrow: "Voltar todo dia", title: "Sequência diária", text: "Cada visita conta no seu aparelho. Volte para pegar uma ideia nova quando precisar.", items: ["Abra quando travar em uma tarefa pequena.", "Adapte os modelos com suas palavras.", "Compartilhe só se o app realmente te ajudou.", "Conteúdo simples ganha quando é útil e rápido."] },
    ads: { enabled: false, eyebrow: "Novidades futuras", title: "Espaço reservado", description: "Este espaço será usado apenas quando fizer sentido para a experiência.", placeholder: "Conteúdo futuro" },
    sharing: {
      enabled: true,
      showAfterVisits: 3,
      eyebrow: "Convite leve",
      title: "Compartilhe se o app ajudou",
      messages: [
        { title: "Manda para alguém que precisa", text: "Achei o Drafta, um app simples pra copiar bases prontas de mensagem, resumo, proposta e cobrança. Testa aí e me fala se presta 😄" },
        { title: "Divulgação leve", text: "Tô apoiando um projeto pequeno e gratuito. Se puder, entra e compartilha com alguém. Isso ajuda demais." },
        { title: "Status pronto", text: "Projeto gratuito novo no ar 🚀 Drafta: bases prontas para resolver tarefas em segundos." },
      ],
    },
  },

  models: { title: "Modelos prontos para adaptar", subtitle: "Use bases simples para começar tarefas sem pensar do zero.", quickTitle: "Modelos rápidos", extrasTitle: "Serviços rápidos", paidExtrasLabel: "Opcional" },

  services: {
    enabled: true,
    title: "Quer que eu faça pronto pra você?",
    subtitle: "Peça um slide, resumo, arte ou apresentação pronta. O Drafta continua gratuito; isso é só para quem quer economizar tempo.",
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
    queueTitle: "Fila de atendimento",
  },
};

export type AppConfig = typeof appConfig;
