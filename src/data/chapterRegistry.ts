import type { CourseContent, CourseModule } from "./courseTypes";
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

function chapterToModule(chapter: CourseChapterPack["chapters"][number]): CourseModule {
  return {
    title: `Capítulo ${chapter.order} — ${chapter.title}`,
    lessons: [
      {
        title: "Cenário de trabalho",
        summary: `${chapter.subtitle}\n\nCenário: ${chapter.workplaceScenario}\n\nEntregável do capítulo: ${chapter.chapterDeliverable}`,
        practice: `Leia o cenário e prepare seu ambiente de trabalho. Antes de avançar, entenda qual problema você precisa resolver: ${chapter.chapterDeliverable}`,
      },
      ...chapter.lessons,
      {
        title: "Validação do capítulo",
        summary: `Agora você precisa validar se sua entrega está pronta para parecer trabalho real.\n\nCritérios de sucesso:\n${chapter.successCriteria.map((item) => `• ${item}`).join("\n")}`,
        practice: `Revise seu entregável: ${chapter.chapterDeliverable}. Marque como concluído apenas se ele atende aos critérios de sucesso.`,
      },
    ],
  };
}

export function applyChapterArchitecture(courses: CourseContent[]): CourseContent[] {
  return courses.map((course) => {
    const pack = chapterPacks.find((item) => item.courseId === course.id);
    if (!pack) return course;

    return {
      ...course,
      subtitle: `${course.subtitle} Agora organizado em capítulos práticos com cenários de trabalho, entregáveis e validação.`,
      outcome: `${course.outcome} O aluno pratica em fluxo de trabalho real, com entregáveis por capítulo e checklist de qualidade.`,
      modules: pack.chapters.map(chapterToModule),
      checklist: Array.from(new Set([...course.checklist, ...pack.chapters.map((chapter) => chapter.chapterDeliverable)])),
      finalProject: `Montar um portfólio com os entregáveis dos capítulos: ${pack.chapters.map((chapter) => chapter.chapterDeliverable).join("; ")}.`,
    };
  });
}
