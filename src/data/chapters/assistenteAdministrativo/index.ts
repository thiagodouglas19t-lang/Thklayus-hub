import { CourseChapterPack } from "../../courseChapterTypes";
import { assistenteAdminChapter1 } from "./chapter1";
import { assistenteAdminChapter2 } from "./chapter2";

export const assistenteAdministrativoChapters: CourseChapterPack = {
  courseId: "assistente-administrativo-digital",
  chapters: [assistenteAdminChapter1, assistenteAdminChapter2].sort((a, b) => a.order - b.order)
};
