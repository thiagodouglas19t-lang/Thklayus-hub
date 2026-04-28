export type LessonVisual = {
  courseId: string;
  lessonTitle: string;
  kind: "diagram" | "checklist" | "flow";
  title: string;
  description: string;
  items: string[];
};

export const lessonVisuals: LessonVisual[] = [
  {
    courseId: "canva-para-vender",
    lessonTitle: "Criando sua conta e entendendo a tela",
    kind: "diagram",
    title: "Mapa rápido da tela do Canva",
    description: "Use este mapa para não se perder quando abrir o editor.",
    items: ["Projetos: onde ficam suas artes salvas", "Modelos: ponto de partida para criar mais rápido", "Texto: títulos, preços e informações", "Elementos: formas, ícones e decorações", "Uploads: imagens próprias ou do cliente"]
  },
  {
    courseId: "canva-para-vender",
    lessonTitle: "Hierarquia visual simples",
    kind: "flow",
    title: "Ordem que o cliente deve enxergar",
    description: "A arte precisa guiar o olho da pessoa até a ação final.",
    items: ["1º Título principal", "2º Produto ou benefício", "3º Preço, data ou detalhe", "4º Contato ou chamada para ação"]
  },
  {
    courseId: "canva-para-vender",
    lessonTitle: "Checklist final",
    kind: "checklist",
    title: "Checklist antes de entregar uma arte",
    description: "Revise estes pontos antes de postar, vender ou mandar para cliente.",
    items: ["Texto principal legível", "Preço, data e contato corretos", "Nada cortado nas bordas", "Poucas fontes e cores", "Arquivo exportado em boa qualidade"]
  }
];

export function getLessonVisual(courseId: string, lessonTitle: string) {
  return lessonVisuals.find((visual) => visual.courseId === courseId && visual.lessonTitle === lessonTitle);
}
