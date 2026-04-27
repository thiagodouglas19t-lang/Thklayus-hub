import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const officeProfissionalChapter1: CourseChapter = {
  id: "office-cap-1",
  title: "Entrega Corporativa Completa",
  subtitle: "Você precisa entregar documento, slides e planilha como se fosse para uma empresa",
  order: 1,
  workplaceScenario: "Um cliente pediu um pacote simples: um relatório em documento, uma apresentação curta e uma planilha de controle. Ele quer algo organizado, bonito e fácil de entender.",
  chapterDeliverable: "Criar um pacote Office com relatório, slides e planilha de apoio",
  successCriteria: [
    "Documento com título, seções e conclusão",
    "Slides com pouco texto e boa leitura",
    "Planilha com colunas, status e cálculo simples",
    "Arquivos nomeados e prontos para envio"
  ],
  lessons: [
    lesson("Relatório que parece profissional", "Um relatório bom não é só texto. Ele tem estrutura, título forte, seções, tópicos e conclusão clara.", "Crie um relatório de 1 página sobre um serviço fictício com título, problema, solução e conclusão."),
    lesson("Slides executivos", "Slides servem para apoiar a fala, não para jogar texto gigante na tela. Use título, pontos curtos e visual limpo.", "Transforme o relatório em 5 slides objetivos."),
    lesson("Planilha de controle", "Toda empresa usa controle: pedidos, gastos, clientes, tarefas ou vendas. Uma planilha simples já mostra organização.", "Crie uma planilha com data, item, valor, status e total."),
    lesson("Entrega final", "A entrega precisa parecer organizada antes mesmo da pessoa abrir os arquivos.", "Nomeie os arquivos corretamente e escreva uma mensagem profissional de envio.")
  ]
};
