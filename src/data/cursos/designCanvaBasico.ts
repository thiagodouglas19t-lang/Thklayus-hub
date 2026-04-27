import { CourseContent, lesson } from "../courseTypes";

export const designCanvaBasico: CourseContent = {
  id: "design-canva-profissional",
  title: "Canva Básico: Crie Artes Pelo Celular",
  subtitle:
    "Curso rápido para aprender a criar artes simples no Canva: posts, convites, status, capas e divulgações bonitas pelo celular.",
  category: "Design",
  level: "iniciante",
  duration: "4h • curso rápido",
  price: "R$ 14,90",
  hero: "🎨",
  outcome:
    "Criar artes simples e bonitas no Canva, salvar corretamente e usar para divulgar produtos, serviços, trabalhos ou eventos.",
  modules: [
    {
      title: "Começando no Canva",
      lessons: [
        lesson(
          "O que é o Canva",
          "Entenda para que serve o Canva e como ele ajuda a criar artes mesmo sem saber design.",
          "Abra o Canva e escolha 3 modelos que você gostaria de usar."
        ),
        lesson(
          "Escolhendo modelos prontos",
          "Aprenda a procurar modelos para post, convite, apresentação, status e divulgação.",
          "Escolha um modelo pronto e troque o texto principal."
        ),
      ],
    },
    {
      title: "Criando uma arte bonita",
      lessons: [
        lesson(
          "Texto, imagem e cor",
          "Aprenda a trocar texto, imagem, fundo e cores sem deixar a arte bagunçada.",
          "Crie uma arte simples divulgando um produto ou serviço fictício."
        ),
        lesson(
          "Erros que deixam a arte feia",
          "Veja erros comuns: texto demais, cor ruim, fonte difícil e falta de espaço.",
          "Pegue uma arte sua ou modelo pronto e melhore 3 coisas nela."
        ),
      ],
    },
    {
      title: "Artes úteis para vender ou divulgar",
      lessons: [
        lesson(
          "Post para WhatsApp e Instagram",
          "Crie uma arte simples para postar no status, grupo ou feed.",
          "Monte um post divulgando um curso, serviço ou produto."
        ),
        lesson(
          "Convite e capa simples",
          "Aprenda a criar convite, capa ou imagem de apresentação sem complicar.",
          "Crie um convite ou capa com título, data/informação e contato."
        ),
      ],
    },
    {
      title: "Salvando e entregando",
      lessons: [
        lesson(
          "Como baixar a arte",
          "Aprenda a salvar em PNG, JPG ou PDF e enviar pelo WhatsApp.",
          "Baixe sua arte e envie como se fosse para um cliente."
        ),
        lesson(
          "Projeto final",
          "Crie um mini kit com 3 artes simples usando o que aprendeu.",
          "Faça 1 post, 1 convite/capa e 1 arte de divulgação."
        ),
      ],
    },
  ],
  checklist: [
    "Sei escolher modelo no Canva",
    "Consigo trocar texto, imagem e cores",
    "Crio arte para WhatsApp ou Instagram",
    "Sei baixar e enviar a arte",
    "Tenho 3 artes simples prontas",
  ],
  finalProject:
    "Criar um mini kit com 3 artes: uma divulgação, um convite/capa e um post para WhatsApp ou Instagram.",
};
