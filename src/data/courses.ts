export type CourseLevel = "iniciante" | "intermediario" | "avancado";

export type CourseModule = {
  title: string;
  lessons: {
    title: string;
    summary: string;
    practice: string;
  }[];
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

export const professionalCourses: CourseContent[] = [
  {
    id: "teste-apresentacao-pro",
    title: "Curso Teste • Apresentação Bonita do Zero",
    subtitle: "Curso gratuito para você ver o layout real da sala de aula premium.",
    category: "Escola",
    level: "iniciante",
    price: "Grátis",
    free: true,
    duration: "35 min",
    outcome: "Criar uma apresentação simples, bonita e organizada sem ficar perdido.",
    hero: "🎤",
    modules: [
      {
        title: "Módulo 1 • Estrutura que salva qualquer apresentação",
        lessons: [
          { title: "Começo, meio e fim", summary: "Você aprende a separar a apresentação em abertura, explicação e conclusão.", practice: "Escreva 3 frases: uma para começar, uma para explicar e uma para concluir." },
          { title: "Como não lotar o slide", summary: "A regra é simples: slide guia, você explica. Pouco texto e palavras-chave.", practice: "Pegue um parágrafo grande e reduza para 5 palavras-chave." },
        ],
      },
      {
        title: "Módulo 2 • Visual bonito sem exagero",
        lessons: [
          { title: "Fonte, contraste e espaçamento", summary: "Aprenda o básico que faz um slide parecer limpo e profissional.", practice: "Monte uma capa com título grande, subtítulo curto e bastante espaço vazio." },
          { title: "Imagem que ajuda", summary: "Imagem só entra quando explica o tema ou deixa o slide mais claro.", practice: "Escolha 1 imagem e escreva uma legenda curta explicando por que ela está ali." },
        ],
      },
      {
        title: "Módulo 3 • Fala e entrega",
        lessons: [
          { title: "Roteiro de fala", summary: "Você aprende a falar sem ler tudo do slide.", practice: "Grave um áudio de 30 segundos explicando o slide de introdução." },
          { title: "Checklist final", summary: "Revise se a apresentação tem clareza, ordem e conclusão.", practice: "Use o checklist e marque o que precisa melhorar." },
        ],
      },
    ],
    checklist: ["Título claro", "Pouco texto", "Visual limpo", "Exemplo no meio", "Conclusão curta"],
    finalProject: "Criar uma apresentação de 6 slides sobre um tema escolar e baixar o material de apoio.",
  },
  {
    id: "informatica-zero-iniciante",
    title: "Informática do Zero • Iniciante",
    subtitle: "Aprenda computador, arquivos, internet e organização digital sem complicação.",
    category: "Informática",
    level: "iniciante",
    price: "R$ 1,00",
    duration: "1h 20min",
    outcome: "Usar computador/celular com mais segurança para estudar e trabalhar.",
    hero: "💻",
    modules: [
      { title: "Módulo 1 • Base digital", lessons: [
        { title: "O que são arquivos e pastas", summary: "Entenda onde ficam documentos, imagens e downloads.", practice: "Crie uma pasta para estudos e organize 3 arquivos nela." },
        { title: "Navegador e pesquisa", summary: "Aprenda a pesquisar melhor sem cair em sites confusos.", practice: "Pesquise um tema e salve 2 links úteis." },
      ]},
      { title: "Módulo 2 • Organização", lessons: [
        { title: "Downloads e anexos", summary: "Saiba baixar, encontrar e enviar arquivos.", practice: "Baixe um PDF e envie como anexo para você mesmo." },
        { title: "E-mail básico", summary: "Crie mensagens claras, assunto correto e anexos.", practice: "Escreva um e-mail pedindo uma informação de forma educada." },
      ]},
      { title: "Módulo 3 • Uso prático", lessons: [
        { title: "Rotina digital simples", summary: "Monte uma rotina para estudar e achar arquivos rápido.", practice: "Crie uma lista de 5 tarefas digitais da semana." },
        { title: "Erros comuns", summary: "Evite apagar arquivos, perder senhas e baixar coisas erradas.", practice: "Revise seu celular/computador e apague arquivos inúteis." },
      ]},
    ],
    checklist: ["Pasta organizada", "Downloads localizados", "E-mail com assunto", "Links salvos", "Arquivos nomeados"],
    finalProject: "Organizar uma pasta de estudos com arquivos, links e um e-mail pronto.",
  },
  {
    id: "powerpoint-pro-intermediario",
    title: "PowerPoint Profissional • Intermediário",
    subtitle: "Slides bonitos, claros e com cara de apresentação séria.",
    category: "Escola",
    level: "intermediario",
    price: "R$ 5,00",
    duration: "1h 40min",
    outcome: "Criar slides melhores para trabalhos, seminários e reuniões.",
    hero: "📊",
    modules: [
      { title: "Módulo 1 • Estrutura", lessons: [
        { title: "Roteiro antes do design", summary: "Organize a ideia antes de abrir o PowerPoint.", practice: "Escreva 6 títulos de slides para um tema." },
        { title: "Hierarquia visual", summary: "Título, subtítulo e texto precisam ter ordem clara.", practice: "Reorganize um slide bagunçado em 3 blocos." },
      ]},
      { title: "Módulo 2 • Design limpo", lessons: [
        { title: "Cores e contraste", summary: "Use cores sem deixar o slide cansativo.", practice: "Monte uma paleta com 2 cores principais." },
        { title: "Imagens e ícones", summary: "Use elementos visuais que ajudam a entender.", practice: "Troque 3 frases por ícones ou imagens úteis." },
      ]},
      { title: "Módulo 3 • Apresentação", lessons: [
        { title: "Como apresentar sem ler", summary: "Use o slide como guia, não como texto completo.", practice: "Treine 1 slide falando sem ler." },
        { title: "Finalização forte", summary: "Aprenda a fechar com resumo e conclusão.", practice: "Escreva uma conclusão em 3 linhas." },
      ]},
    ],
    checklist: ["Roteiro claro", "Pouco texto", "Contraste bom", "Imagens úteis", "Conclusão forte"],
    finalProject: "Criar uma apresentação de 8 slides com capa, introdução, desenvolvimento e conclusão.",
  },
  {
    id: "canva-design-avancado",
    title: "Canva e Design • Avançado",
    subtitle: "Crie artes, posts, capas e materiais com aparência profissional.",
    category: "Design",
    level: "avancado",
    price: "R$ 10,00",
    duration: "2h",
    outcome: "Criar peças visuais para escola, divulgação e pequenos serviços.",
    hero: "🎨",
    modules: [
      { title: "Módulo 1 • Base visual", lessons: [
        { title: "Composição", summary: "Aprenda a distribuir elementos sem poluir.", practice: "Crie uma capa com título, imagem e botão visual." },
        { title: "Tipografia", summary: "Escolha fontes que combinam e mantêm leitura.", practice: "Teste 2 combinações de fonte para um post." },
      ]},
      { title: "Módulo 2 • Peças reais", lessons: [
        { title: "Post de divulgação", summary: "Monte um post com chamada, benefício e ação.", practice: "Crie um post vendendo um serviço simples." },
        { title: "Cartaz escolar", summary: "Faça cartaz organizado com título e blocos de informação.", practice: "Crie um cartaz sobre meio ambiente." },
      ]},
      { title: "Módulo 3 • Entrega profissional", lessons: [
        { title: "Exportação correta", summary: "Saiba baixar em PNG, PDF e formatos úteis.", practice: "Exporte uma arte em PNG e PDF." },
        { title: "Como cobrar por artes", summary: "Entenda valor, revisão e prazo.", practice: "Monte uma tabela simples de preços." },
      ]},
    ],
    checklist: ["Visual limpo", "Fonte legível", "Cores consistentes", "Chamada clara", "Arquivo exportado certo"],
    finalProject: "Criar um pacote com 1 post, 1 capa e 1 cartaz pronto para entregar.",
  },
];

export function findCourse(id?: string | null, title?: string | null) {
  return professionalCourses.find((course) => course.id === id) || professionalCourses.find((course) => course.title === title) || professionalCourses.find((course) => title && course.title.toLowerCase().includes(title.toLowerCase().split(" • ")[0]));
}
