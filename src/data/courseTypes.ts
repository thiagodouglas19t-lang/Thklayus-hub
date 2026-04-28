export type CourseLevel = "iniciante" | "intermediario" | "avancado";

export type CourseLesson = {
  title: string;
  summary: string;
  practice: string;
  explanation?: string;
  example?: string;
  steps?: string[];
  commonMistakes?: string[];
  exercise?: string;
  expectedResult?: string;
};

export type CourseModule = {
  title: string;
  lessons: CourseLesson[];
};

export type CourseContent = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  duration: string;
  price: string;
  free?: boolean;
  hero: string;
  outcome: string;
  modules: CourseModule[];
  checklist: string[];
  finalProject: string;
};

export type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  categoria: string;
  tipo: "Grátis" | "Pago";
  selo: "Popular" | "Novo" | "Essencial" | "Pro";
  resultado: string;
  pixCode: string;
};

export const lesson = (title: string, summary: string, practice: string): CourseLesson => ({
  title,
  summary,
  practice,
  explanation: summary,
  example: "Exemplo prático: use esta aula em uma situação real do seu estudo, trabalho ou projeto pessoal. Pegue o que foi explicado e aplique em uma tarefa pequena, como criar um arquivo, montar uma lista, organizar uma mensagem, revisar uma arte ou testar uma ideia.",
  steps: [
    "Leia a explicação da aula com calma.",
    "Observe o exemplo prático e compare com algo da sua rotina.",
    "Faça a prática proposta sem pular etapas.",
    "Revise o resultado e ajuste o que ficou confuso.",
  ],
  commonMistakes: [
    "Ler rápido demais e não aplicar nada. Evite isso fazendo a prática logo após a explicação.",
    "Copiar um modelo sem entender o motivo. Evite isso adaptando o exemplo para sua realidade.",
  ],
  exercise: practice,
  expectedResult: "Depois desta aula, você deve conseguir aplicar o conteúdo em uma entrega simples e explicar com suas palavras o que fez.",
});

export const fullLesson = (
  title: string,
  explanation: string,
  example: string,
  steps: string[],
  commonMistakes: string[],
  exercise: string,
  expectedResult: string
): CourseLesson => ({
  title,
  summary: explanation,
  practice: exercise,
  explanation,
  example,
  steps,
  commonMistakes,
  exercise,
  expectedResult,
});
