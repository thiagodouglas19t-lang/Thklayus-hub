import type { CourseLesson } from "./courseTypes";

export type CourseChapter = {
  id: string;
  title: string;
  subtitle: string;
  order: number;
  lessons: CourseLesson[];
  workplaceScenario: string;
  chapterDeliverable: string;
  successCriteria: string[];
};

export type CourseChapterPack = {
  courseId: string;
  chapters: CourseChapter[];
};
