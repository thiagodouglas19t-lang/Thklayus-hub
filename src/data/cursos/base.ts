import type { CourseContent, CourseLesson, CourseLevel } from "./tipos";

export function aula(title: string, summary: string, practice: string): CourseLesson {
  return { title, summary, practice };
}

export function cursoPratico(params: {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  price: string;
  duration: string;
  outcome: string;
  hero: string;
  free?: boolean;
  focus: string;
  project: string;
}): CourseContent {
  const { id, title, subtitle, category, level, price, duration, outcome, hero, free, focus, project } = params;

  return {
    id,
    title,
    subtitle,
    category,
    level,
    price,
    duration,
    outcome,
    hero,
    free,
    modules: [
      {
        title: "Módulo 1 • Entenda o objetivo",
        lessons: [
          aula("O que você vai fazer", `Antes de estudar ${focus}, você precisa saber o resultado final.`, `Escreva: Quero aprender ${focus} para...`),
          aula("Erro comum", "Começar sem direção faz você travar.", "Liste 3 erros que você quer evitar."),
          aula("Primeira ação", "Faça uma versão simples primeiro.", "Crie algo simples em 10 minutos."),
        ],
      },
      {
        title: "Módulo 2 • Base prática",
        lessons: [
          aula("Entenda o básico", `O básico de ${focus} precisa ser simples e útil.`, "Explique com suas palavras."),
          aula("Exemplo", "Exemplos ajudam a entender rápido.", "Crie um exemplo real."),
          aula("Teste", "Veja se está claro.", "Revise o que fez."),
        ],
      },
      {
        title: "Módulo 3 • Execução",
        lessons: [
          aula("Divida etapas", "Divida em partes pequenas.", "Crie 5 passos."),
          aula("Faça", "Execute sem perfeição.", "Finalize uma versão."),
          aula("Revise", "Melhore o que fez.", "Corrija 3 erros."),
        ],
      },
      {
        title: "Módulo 4 • Qualidade",
        lessons: [
          aula("Organização", "Deixe limpo e claro.", "Organize melhor."),
          aula("Evite erros", "Corte exageros.", "Revise tudo."),
          aula("Checklist", "Use checklist.", "Crie um checklist."),
        ],
      },
      {
        title: "Módulo 5 • Final",
        lessons: [
          aula("Versão final", "Monte tudo.", "Finalize projeto."),
          aula("Explique", "Mostre o que fez.", "Explique seu projeto."),
          aula("Melhoria", "Sempre evolua.", "Anote melhoria."),
        ],
      },
    ],
    checklist: [
      "Entendi o objetivo",
      "Fiz na prática",
      "Revisei",
      "Organizei",
      "Finalizei",
    ],
    finalProject: project,
  };
}
