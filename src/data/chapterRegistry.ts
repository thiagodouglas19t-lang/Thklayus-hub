import type { CourseContent, CourseModule, CourseLesson } from "./courseTypes";
import type { CourseChapterPack } from "./courseChapterTypes";
import { assistenteAdministrativoChapters } from "./chapters/assistenteAdministrativo";
import { canvaBasicoChapters } from "./chapters/canvaBasico";
import { completedCoursePacks } from "./chapters/completedCoursePacks";
import { atendimentoClienteChapter1 } from "./chapters/atendimentoCliente/chapter1";
import { oratoriaChapter1 } from "./chapters/oratoria/chapter1";
import { empreendedorismoChapter1 } from "./chapters/empreendedorismo/chapter1";
import { officeProfissionalChapter1 } from "./chapters/officeProfissional/chapter1";
import { iaNaPraticaChapter1 } from "./chapters/iaNaPratica/chapter1";

const chapterPacks: CourseChapterPack[] = [
  assistenteAdministrativoChapters,
  canvaBasicoChapters,
  { courseId: "suporte-atendimento-cliente", chapters: [atendimentoClienteChapter1] },
  { courseId: "apresentacao-oratoria-profissional", chapters: [oratoriaChapter1] },
  { courseId: "empreendedorismo-servicos-digitais", chapters: [empreendedorismoChapter1] },
  { courseId: "office-profissional", chapters: [officeProfissionalChapter1] },
  { courseId: "ia-na-pratica", chapters: [iaNaPraticaChapter1] },
  ...completedCoursePacks,
];

function expandLessonText(course: CourseContent, moduleTitle: string, lesson: CourseLesson, chapterDeliverable?: string): CourseLesson {
  const topic = lesson.title;
  const deliverable = chapterDeliverable || course.finalProject;

  return {
    ...lesson,
    summary: `${lesson.summary}\n\nNesta aula, o foco é transformar o assunto em uma ação prática. Não basta apenas ler e achar que entendeu. Você precisa observar o problema, entender o objetivo e produzir uma pequena entrega que prove que aprendeu.\n\nImagine uma situação real: alguém confia em você para resolver uma parte do trabalho. Essa pessoa não quer teoria solta; ela quer clareza, organização e um resultado que possa ser usado. Por isso, leia o conteúdo com atenção e pense em como aplicar no seu dia a dia, em estudos, atendimento, criação de materiais, organização ou prestação de serviço.\n\nPasso 1 — Entenda o contexto\nPergunte: qual problema esta aula resolve? Quem usaria isso? O que ficaria melhor depois de aplicar esta técnica? Escreva a resposta de forma simples, como se estivesse explicando para alguém que nunca viu o assunto.\n\nPasso 2 — Crie uma versão inicial\nFaça uma primeira tentativa sem buscar perfeição. O objetivo é sair do zero. Uma entrega simples, mas organizada, já vale mais do que ficar só planejando.\n\nPasso 3 — Revise como profissional\nDepois de criar, confira se está claro, útil e organizado. Veja se faltam informações, se o texto está confuso ou se a pessoa que receber isso conseguiria entender sem você explicar por fora.\n\nExemplo de aplicação\nNo curso ${course.title}, dentro de ${moduleTitle}, esta aula sobre ${topic} deve ajudar você a construir parte do resultado final: ${deliverable}. Pense nela como uma peça do seu portfólio, não como uma leitura qualquer.\n\nErro comum\nO erro mais comum é terminar a aula sem produzir nada. Se você só leu e clicou em concluir, o curso vira conteúdo vazio. Para realmente aprender, faça a prática, salve o resultado e melhore aos poucos.\n\nResumo da aula\nVocê aprendeu o conceito principal, viu como ele se conecta com uma situação real e agora precisa transformar isso em entrega prática. O avanço verdadeiro acontece quando você consegue mostrar o que fez.`,
    practice: `${lesson.practice}\n\nEntrega obrigatória: crie uma versão simples, mas completa, do que foi pedido. Depois revise usando este checklist: está claro? está organizado? tem começo, meio e fim? alguém conseguiria entender sem você explicar?\n\nDesafio extra: melhore sua entrega uma vez antes de marcar a aula como concluída.`,
  };
}

function chapterToModule(course: CourseContent, chapter: CourseChapterPack["chapters"][number]): CourseModule {
  return {
    title: `Capítulo ${chapter.order} — ${chapter.title}`,
    lessons: [
      expandLessonText(course, `Capítulo ${chapter.order} — ${chapter.title}`, {
        title: "Cenário de trabalho",
        summary: `${chapter.subtitle}\n\nCenário: ${chapter.workplaceScenario}\n\nEntregável do capítulo: ${chapter.chapterDeliverable}`,
        practice: `Leia o cenário e prepare seu ambiente de trabalho. Antes de avançar, entenda qual problema você precisa resolver: ${chapter.chapterDeliverable}`,
      }, chapter.chapterDeliverable),
      ...chapter.lessons.map((lesson) => expandLessonText(course, `Capítulo ${chapter.order} — ${chapter.title}`, lesson, chapter.chapterDeliverable)),
      expandLessonText(course, `Capítulo ${chapter.order} — ${chapter.title}`, {
        title: "Validação do capítulo",
        summary: `Agora você precisa validar se sua entrega está pronta para parecer trabalho real.\n\nCritérios de sucesso:\n${chapter.successCriteria.map((item) => `• ${item}`).join("\n")}`,
        practice: `Revise seu entregável: ${chapter.chapterDeliverable}. Marque como concluído apenas se ele atende aos critérios de sucesso.`,
      }, chapter.chapterDeliverable),
    ],
  };
}

function expandBasicCourse(course: CourseContent): CourseContent {
  return {
    ...course,
    modules: course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => expandLessonText(course, module.title, lesson)),
    })),
  };
}

export function applyChapterArchitecture(courses: CourseContent[]): CourseContent[] {
  return courses.map((course) => {
    const pack = chapterPacks.find((item) => item.courseId === course.id);
    if (!pack) return expandBasicCourse(course);

    return {
      ...course,
      subtitle: `${course.subtitle} Agora organizado em capítulos práticos com cenários de trabalho, entregáveis e validação.`,
      outcome: `${course.outcome} O aluno pratica em fluxo de trabalho real, com entregáveis por capítulo e checklist de qualidade.`,
      modules: pack.chapters.map((chapter) => chapterToModule(course, chapter)),
      checklist: Array.from(new Set([...course.checklist, ...pack.chapters.map((chapter) => chapter.chapterDeliverable)])),
      finalProject: `Montar um portfólio com os entregáveis dos capítulos: ${pack.chapters.map((chapter) => chapter.chapterDeliverable).join("; ")}.`,
    };
  });
}
