export type CourseLevel = "iniciante" | "intermediario" | "avancado";

export type CourseModule = {
  title: string;
  lessons: { title: string; summary: string; practice: string }[];
};

export type CourseContent = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  price: string;
  free?: boolean;
  duration: string;
  outcome: string;
  hero: string;
  modules: CourseModule[];
  checklist: string[];
  finalProject: string;
};

const apresentacao: CourseContent = {
  id: "teste-apresentacao-pro",
  title: "Curso Teste • Apresentação Bonita do Zero",
  subtitle: "Aprenda a montar uma apresentação com aparência limpa, fala organizada e slides que ajudam em vez de atrapalhar.",
  category: "Escola",
  level: "iniciante",
  price: "Grátis",
  free: true,
  duration: "45 min",
  outcome: "Criar uma apresentação de 6 slides com capa, roteiro, visual limpo e conclusão pronta para apresentar.",
  hero: "🎤",
  modules: [
    { title: "Módulo 1 • Planejamento antes do slide", lessons: [
      { title: "Defina a mensagem principal", summary: "Antes de abrir qualquer editor, responda: qual é a ideia que a pessoa precisa entender no final? Uma apresentação boa não é cheia de texto; ela tem uma mensagem clara. Exemplo: em vez de 'vou falar sobre meio ambiente', use 'pequenas atitudes reduzem lixo e ajudam a cidade'.", practice: "Escreva uma frase principal para o seu tema começando com: 'No final, quero que entendam que...'" },
      { title: "Organize começo, meio e fim", summary: "A estrutura mais segura é: abertura com tema, desenvolvimento com 3 pontos e conclusão com resumo. Isso evita travar e deixa a apresentação fácil de seguir.", practice: "Divida seu tema em 3 partes: introdução, 3 pontos principais e conclusão." },
      { title: "Transforme texto em tópicos", summary: "Slide não é folha de caderno. O slide deve mostrar palavras-chave; a explicação fica na sua fala. Use frases curtas e deixe espaço vazio.", practice: "Pegue um parágrafo e reduza para no máximo 5 tópicos curtos." },
    ]},
    { title: "Módulo 2 • Visual que parece profissional", lessons: [
      { title: "Fonte, tamanho e contraste", summary: "Use fonte grande para título, texto menor para apoio e contraste forte. Se o fundo é escuro, texto claro. Se o fundo é claro, texto escuro. O erro mais comum é usar letra pequena demais.", practice: "Crie uma capa com título grande, subtítulo curto e contraste forte." },
      { title: "Imagens com função", summary: "Imagem bonita não basta. Ela precisa explicar, emocionar ou reforçar o assunto. Evite usar muitas imagens pequenas no mesmo slide.", practice: "Escolha uma imagem para seu tema e escreva uma legenda explicando por que ela faz sentido." },
      { title: "Regra do slide limpo", summary: "Um slide limpo tem poucos elementos, bom espaçamento e foco. Se tudo chama atenção, nada chama atenção. Use no máximo 2 fontes e 2 cores principais.", practice: "Revise um slide e remova tudo que não ajuda a explicar." },
    ]},
    { title: "Módulo 3 • Fala e entrega", lessons: [
      { title: "Roteiro de fala simples", summary: "Para não ler o slide inteiro, prepare uma fala curta para cada slide: o que é, por que importa e exemplo. Isso deixa a apresentação natural.", practice: "Escreva 3 frases de fala para o slide de introdução." },
      { title: "Como não travar", summary: "Treine em voz alta uma vez, depois grave um áudio curto. Não precisa decorar tudo; precisa entender a ordem. Se esquecer, volte para o tópico do slide.", practice: "Grave 30 segundos explicando um slide sem ler tudo." },
      { title: "Conclusão forte", summary: "A conclusão deve retomar a ideia principal e fechar com uma frase de impacto. Evite terminar com 'é isso'. Finalize com resumo + agradecimento.", practice: "Escreva uma conclusão com: 'Concluindo...' + resumo + agradecimento." },
    ]},
  ],
  checklist: ["Mensagem principal clara", "Slides com pouco texto", "Capa organizada", "Imagens úteis", "Roteiro de fala pronto", "Conclusão curta"],
  finalProject: "Criar uma apresentação de 6 slides: capa, introdução, 3 pontos principais e conclusão.",
};

const logica: CourseContent = {
  id: "logica-iniciante",
  title: "Lógica para Iniciantes",
  subtitle: "Treine raciocínio, organização de pensamento e resolução de problemas sem precisar saber programar.",
  category: "Tecnologia",
  level: "iniciante",
  price: "R$ 1,00",
  duration: "1h 10min",
  outcome: "Pensar em passos, condições e soluções simples para problemas do dia a dia e tecnologia.",
  hero: "🧠",
  modules: [
    { title: "Módulo 1 • Pensar em passos", lessons: [
      { title: "O que é lógica", summary: "Lógica é organizar uma sequência de ideias para chegar a um resultado. Ela aparece quando você segue uma receita, resolve uma conta, monta uma rotina ou cria um app.", practice: "Escreva o passo a passo para acordar, se arrumar e sair de casa." },
      { title: "Entrada, processo e saída", summary: "Todo problema tem algo que entra, uma ação e um resultado. Exemplo: entrada = tema; processo = organizar ideias; saída = apresentação pronta.", practice: "Escolha um problema e separe entrada, processo e saída." },
      { title: "Quebrando problemas grandes", summary: "Problema grande assusta. Divida em partes pequenas. Em vez de 'fazer trabalho', pense: pesquisar, resumir, montar slide, revisar e apresentar.", practice: "Divida uma tarefa grande em 5 tarefas pequenas." },
    ]},
    { title: "Módulo 2 • Condições e decisões", lessons: [
      { title: "Se isso, então aquilo", summary: "Condições ajudam a decidir. Exemplo: se o comprovante foi confirmado, libera curso; se não foi, mantém em análise.", practice: "Crie 5 regras usando 'se... então...'" },
      { title: "Prioridade", summary: "Nem tudo tem a mesma importância. Lógica também é decidir o que fazer primeiro, o que pode esperar e o que impede o resto.", practice: "Liste 5 tarefas e coloque em ordem de prioridade." },
      { title: "Testando resultado", summary: "Uma solução precisa ser testada. Se falhar, você ajusta. Isso é pensamento lógico aplicado.", practice: "Pegue uma regra sua e pense em 2 situações onde ela pode falhar." },
    ]},
    { title: "Módulo 3 • Aplicação prática", lessons: [
      { title: "Fluxo de app", summary: "Apps funcionam com fluxo: usuário clica, sistema verifica, mostra resultado. Entender fluxo ajuda a criar ideias melhores.", practice: "Desenhe o fluxo de compra de um curso em 5 passos." },
      { title: "Checklist lógico", summary: "Checklist evita erro porque força conferir cada etapa. É uma ferramenta de lógica simples.", practice: "Crie um checklist para entregar um trabalho escolar." },
      { title: "Melhorando uma solução", summary: "Depois de resolver, pergunte: dá para simplificar? dá para deixar mais seguro? dá para deixar mais rápido?", practice: "Melhore um processo seu usando essas 3 perguntas." },
    ]},
  ],
  checklist: ["Sei dividir problema", "Entendo entrada/processo/saída", "Criei condições", "Montei fluxo", "Testei solução"],
  finalProject: "Criar um fluxo lógico para resolver um problema real, como compra, estudo ou atendimento.",
};

function makeCourse(id: string, title: string, category: string, level: CourseLevel, price: string, hero: string, focus: string, duration = "1h 30min", free = false): CourseContent {
  return {
    id, title, category, level, price, hero, duration, free,
    subtitle: `Aprenda ${focus} com explicação prática, exemplos e projeto final.`,
    outcome: `Aplicar ${focus} em uma situação real com mais segurança e organização.`,
    modules: [
      { title: "Módulo 1 • Base real", lessons: [
        { title: `Entendendo ${focus}`, summary: `Você vai entender para que serve ${focus}, onde isso aparece na prática e como começar do jeito certo. A ideia é sair da teoria solta e enxergar uso real.`, practice: `Escreva 3 situações onde ${focus} pode ser usado.` },
        { title: "Erros que atrapalham", summary: "A maioria das pessoas erra por pular etapas, copiar sem entender ou entregar sem revisar. Aqui você aprende a evitar isso.", practice: "Liste 3 erros comuns e escreva como evitar cada um." },
        { title: "Preparação profissional", summary: "Antes de fazer qualquer entrega, organize objetivo, prazo, materiais e padrão de qualidade. Isso melhora o resultado e evita retrabalho.", practice: "Monte um checklist de preparação com 5 itens." },
      ]},
      { title: "Módulo 2 • Execução guiada", lessons: [
        { title: "Processo simples", summary: "Use um processo fixo: entender pedido, planejar, produzir, revisar e entregar. Esse método serve para estudo, design, atendimento e serviços.", practice: "Aplique esse processo em uma tarefa pequena." },
        { title: "Exemplo analisado", summary: "Compare uma entrega fraca com uma boa: clareza, organização, visual, utilidade e acabamento. Qualidade aparece nos detalhes.", practice: "Melhore uma entrega simples usando esses critérios." },
        { title: "Revisão antes da entrega", summary: "Revisar é parte do trabalho. Confira erro, visual, objetivo e se a pessoa vai entender sem você explicar demais.", practice: "Revise seu resultado e corrija 3 pontos." },
      ]},
      { title: "Módulo 3 • Resultado final", lessons: [
        { title: "Criando o projeto", summary: "Agora você transforma o aprendizado em uma entrega real. O objetivo é criar algo pequeno, mas bem feito.", practice: "Produza uma entrega final simples sobre o tema do curso." },
        { title: "Como apresentar", summary: "Explique o que fez, por que fez e como a pessoa pode usar. Isso aumenta percepção de valor.", practice: "Escreva uma mensagem apresentando seu projeto final." },
        { title: "Como evoluir", summary: "Depois do básico, melhore velocidade, acabamento e confiança. O segredo é repetir com revisão.", practice: "Defina 3 coisas para melhorar na próxima entrega." },
      ]},
    ],
    checklist: ["Entendi o objetivo", "Pratiquei", "Revisei", "Concluí projeto", "Sei explicar o resultado"],
    finalProject: `Criar uma entrega prática usando ${focus} e revisar antes de finalizar.`,
  };
}

export const professionalCourses: CourseContent[] = [
  apresentacao,
  logica,
  makeCourse("informatica-zero-iniciante", "Informática do Zero • Iniciante", "Informática", "iniciante", "R$ 1,00", "💻", "informática básica"),
  makeCourse("formacao-profissional", "Formação Profissional Completa", "Carreira", "intermediario", "R$ 5,00", "💼", "postura profissional, currículo e atendimento", "2h"),
  makeCourse("design-social-media", "Design para Social Media", "Design", "intermediario", "R$ 5,00", "🎨", "design para posts e divulgação"),
  makeCourse("sobrancelha-design", "Design de Sobrancelha • Iniciante", "Beleza", "iniciante", "R$ 5,00", "✨", "noções de design de sobrancelha, atendimento e organização", "1h 20min"),
  makeCourse("powerpoint-pro", "PowerPoint Profissional", "Escola", "intermediario", "R$ 5,00", "📊", "slides profissionais"),
  makeCourse("canva-avancado", "Canva e Design • Avançado", "Design", "avancado", "R$ 10,00", "🎨", "criação visual avançada", "2h"),
  makeCourse("excel-pratico", "Excel para Vida Real", "Informática", "intermediario", "R$ 5,00", "📈", "planilhas úteis e controle financeiro"),
  makeCourse("seguranca-digital", "Segurança Digital e Anti-Golpes", "Segurança", "intermediario", "R$ 5,00", "🛡️", "proteção de contas e identificação de golpes"),
  makeCourse("capcut-basico", "CapCut Básico para Vídeos", "Criação", "iniciante", "R$ 5,00", "🎬", "edição simples de vídeos"),
  makeCourse("mini-negocio-digital", "Mini Negócio Digital", "Dinheiro", "avancado", "R$ 10,00", "🚀", "serviços digitais e venda online", "2h 10min"),
  makeCourse("atendimento-cliente", "Atendimento ao Cliente", "Carreira", "iniciante", "R$ 1,00", "🤝", "respostas profissionais e suporte"),
  makeCourse("resumo-escolar", "Resumo Escolar Inteligente", "Escola", "iniciante", "R$ 1,00", "📝", "resumos claros e estudo rápido"),
  makeCourse("mapa-mental", "Mapas Mentais Bonitos", "Escola", "intermediario", "R$ 5,00", "🗺️", "mapas mentais para estudar e apresentar"),
  makeCourse("precificacao-servicos", "Precificação de Serviços", "Dinheiro", "intermediario", "R$ 5,00", "💰", "cobrança por artes, slides e trabalhos"),
  makeCourse("organizacao-rotina", "Organização de Rotina", "Produtividade", "iniciante", "R$ 1,00", "⏱️", "rotina, foco e tarefas"),
  makeCourse("google-drive", "Google Drive e Docs", "Informática", "iniciante", "R$ 1,00", "☁️", "Drive, Docs e compartilhamento"),
  makeCourse("email-profissional", "E-mail Profissional", "Carreira", "iniciante", "R$ 1,00", "📧", "mensagens, anexos e comunicação formal"),
  makeCourse("artes-vender", "Artes para Vender", "Design", "avancado", "R$ 10,00", "🖼️", "criação de artes simples para clientes"),
];

export function findCourse(id?: string | null, title?: string | null) {
  return professionalCourses.find((course) => course.id === id) || professionalCourses.find((course) => course.title === title) || professionalCourses.find((course) => title && course.title.toLowerCase().includes(title.toLowerCase().split(" • ")[0]));
}
