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

function makeCourse(id: string, title: string, category: string, level: CourseLevel, price: string, hero: string, focus: string, duration = "1h 30min", free = false): CourseContent {
  return {
    id, title, category, level, price, hero, duration, free,
    subtitle: `Aprenda ${focus} com aulas práticas, checklist e projeto final.`,
    outcome: `Sair com uma base real para aplicar ${focus} em estudo, trabalho ou serviço.`,
    modules: [
      { title: "Módulo 1 • Fundamentos", lessons: [
        { title: `O que é ${focus}`, summary: `Entenda a base de ${focus} sem complicação.`, practice: `Escreva uma explicação simples sobre ${focus}.` },
        { title: "Erros comuns", summary: "Veja o que iniciantes fazem errado e como evitar.", practice: "Liste 3 erros e como corrigir cada um." },
        { title: "Ferramentas e preparação", summary: "Organize o ambiente antes de começar.", practice: "Monte um checklist do que você precisa para praticar." },
      ]},
      { title: "Módulo 2 • Prática guiada", lessons: [
        { title: "Passo a passo", summary: "Aprenda um processo simples para executar com segurança.", practice: "Faça uma versão simples seguindo o passo a passo." },
        { title: "Exemplo bom vs ruim", summary: "Compare resultados e entenda o que muda qualidade.", practice: "Melhore um exemplo ruim usando as regras aprendidas." },
        { title: "Checklist de qualidade", summary: "Use critérios claros antes de entregar algo.", practice: "Avalie seu resultado com nota de 0 a 10." },
      ]},
      { title: "Módulo 3 • Aplicação profissional", lessons: [
        { title: "Projeto real", summary: "Crie algo que pode ser usado de verdade.", practice: "Produza uma entrega final simples." },
        { title: "Revisão e melhoria", summary: "Aprenda a lapidar antes de mostrar para alguém.", practice: "Revise e melhore 3 pontos do projeto." },
        { title: "Como apresentar ou vender", summary: "Mostre valor de forma clara e direta.", practice: "Escreva uma mensagem oferecendo seu resultado." },
      ]},
    ],
    checklist: ["Entendi a base", "Fiz a prática", "Revisei o resultado", "Concluí o projeto", "Sei explicar o que fiz"],
    finalProject: `Criar um projeto final aplicando ${focus} e baixar o material de apoio.`,
  };
}

export const professionalCourses: CourseContent[] = [
  makeCourse("teste-apresentacao-pro", "Curso Teste • Apresentação Bonita do Zero", "Escola", "iniciante", "Grátis", "🎤", "apresentações bonitas", "35 min", true),
  makeCourse("informatica-zero-iniciante", "Informática do Zero • Iniciante", "Informática", "iniciante", "R$ 1,00", "💻", "informática básica"),
  makeCourse("logica-iniciante", "Lógica para Iniciantes", "Tecnologia", "iniciante", "R$ 1,00", "🧠", "raciocínio lógico"),
  makeCourse("formacao-profissional", "Formação Profissional Completa", "Carreira", "intermediario", "R$ 5,00", "💼", "postura profissional, currículo e atendimento", "2h"),
  makeCourse("design-social-media", "Design para Social Media", "Design", "intermediario", "R$ 5,00", "🎨", "design para posts e divulgação"),
  makeCourse("sobrancelha-design", "Design de Sobrancelha • Iniciante", "Beleza", "iniciante", "R$ 5,00", "✨", "noções de design de sobrancelha com foco em atendimento e organização", "1h 20min"),
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
