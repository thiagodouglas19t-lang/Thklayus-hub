import type { CourseContent } from "../courseTypes";
import { lesson } from "../courseTypes";

const checklistPadrao = [
  "Aulas curtas e diretas",
  "Exercícios práticos",
  "Projeto final simples",
  "Certificado de conclusão",
];

export const canvaParaVender: CourseContent = {
  id: "canva-para-vender",
  title: "Canva para Vender Artes Simples",
  subtitle: "Aprenda a criar artes bonitas pelo celular e montar seus primeiros modelos para vender.",
  category: "Design",
  level: "iniciante",
  duration: "2h • 12 aulas",
  price: "R$ 7,90",
  hero: "🎨",
  outcome: "Você aprende a criar posts, convites, banners simples e modelos prontos para oferecer como serviço.",
  modules: [
    {
      title: "Módulo 1 — Começando no Canva",
      lessons: [
        lesson("Criando sua conta e entendendo a tela", "Conheça os menus principais e aprenda onde ficam modelos, textos, imagens e elementos.", "Abra o Canva e crie uma pasta chamada Artes para vender."),
        lesson("Como escolher um modelo sem copiar feio", "Entenda como usar templates como base e mudar cores, textos e elementos para ficar original.", "Pegue um template e altere cores, fontes e imagens."),
        lesson("Tamanho certo para cada arte", "Veja tamanhos comuns para post, story, status, convite e banner.", "Crie um post quadrado e um story com o mesmo tema."),
      ],
    },
    {
      title: "Módulo 2 — Criando artes que chamam atenção",
      lessons: [
        lesson("Hierarquia visual simples", "Aprenda a deixar o texto principal maior e as informações secundárias menores.", "Crie uma arte de promoção com título, preço e chamada."),
        lesson("Cores e fontes sem bagunça", "Use poucas cores e no máximo duas fontes para deixar a arte profissional.", "Monte uma paleta com 3 cores e refaça uma arte antiga."),
        lesson("Como deixar a arte mais limpa", "Aprenda a remover excesso de informação e criar espaço visual.", "Pegue uma arte carregada e simplifique."),
      ],
    },
    {
      title: "Módulo 3 — Vendendo seu serviço",
      lessons: [
        lesson("Montando pacote barato", "Crie ofertas simples como 3 artes por preço fechado para vender mais fácil.", "Monte uma tabela com 3 pacotes de artes."),
        lesson("Como mostrar portfólio no WhatsApp", "Organize exemplos em imagens e textos curtos para mandar para clientes.", "Crie 5 artes de exemplo e salve em uma pasta."),
        lesson("Mensagem pronta para oferecer", "Use uma abordagem simples sem parecer spam.", "Escreva uma mensagem de venda curta para enviar para conhecidos."),
      ],
    },
    {
      title: "Módulo 4 — Projeto final e certificado",
      lessons: [
        lesson("Criando seu mini portfólio", "Monte 5 artes com estilos diferentes para provar sua capacidade.", "Entregue 5 artes: post, story, convite, promoção e capa."),
        lesson("Checklist final", "Revise se suas artes estão legíveis, bonitas e com informação clara.", "Use o checklist antes de salvar."),
        lesson("Certificado", "Ao concluir as aulas e o projeto, você recebe certificado de conclusão.", "Finalize o projeto e marque o curso como concluído."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar um mini portfólio com 5 artes prontas para vender.",
};

export const apresentacaoEscolar: CourseContent = {
  id: "apresentacao-escolar",
  title: "Apresentações Escolares Bonitas",
  subtitle: "Aprenda a fazer slides organizados para trabalhos de escola sem deixar tudo poluído.",
  category: "Design",
  level: "iniciante",
  duration: "1h30 • 10 aulas",
  price: "R$ 5,90",
  hero: "📚",
  outcome: "Você cria apresentações mais bonitas, claras e fáceis de explicar em sala ou online.",
  modules: [
    {
      title: "Módulo 1 — Estrutura da apresentação",
      lessons: [
        lesson("Capa, introdução e conclusão", "Entenda a ordem básica de uma apresentação escolar.", "Crie uma estrutura com 6 slides."),
        lesson("Como dividir o conteúdo", "Aprenda a separar textos grandes em partes menores.", "Transforme um texto em tópicos curtos."),
        lesson("O que não colocar no slide", "Evite parágrafos enormes e excesso de imagem.", "Revise um slide e corte informações desnecessárias."),
      ],
    },
    {
      title: "Módulo 2 — Visual bonito e simples",
      lessons: [
        lesson("Escolhendo tema e cores", "Use uma identidade visual simples para todos os slides.", "Defina 2 cores e uma fonte."),
        lesson("Imagens que ajudam", "Escolha imagens que explicam o assunto em vez de enfeitar demais.", "Adicione uma imagem útil em 3 slides."),
        lesson("Como alinhar tudo", "Aprenda alinhamento básico para parecer profissional.", "Organize textos e imagens com margem."),
      ],
    },
    {
      title: "Módulo 3 — Apresentando melhor",
      lessons: [
        lesson("Como falar sem ler tudo", "Use o slide como guia, não como texto completo.", "Treine explicar um slide em 30 segundos."),
        lesson("Dividindo fala em grupo", "Organize quem fala cada parte para evitar confusão.", "Monte uma lista com nomes e slides."),
      ],
    },
    {
      title: "Módulo 4 — Projeto final e certificado",
      lessons: [
        lesson("Criando apresentação completa", "Monte uma apresentação de 6 a 8 slides com capa, tópicos e conclusão.", "Finalize uma apresentação escolar pronta."),
        lesson("Certificado", "Ao concluir o projeto final, o certificado fica disponível.", "Revise e conclua o curso."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar uma apresentação escolar completa com 6 a 8 slides.",
};

export const whatsappVendas: CourseContent = {
  id: "whatsapp-vendas-basico",
  title: "Venda pelo WhatsApp do Zero",
  subtitle: "Aprenda a organizar atendimento, mensagem, catálogo simples e fechamento sem enrolação.",
  category: "Negócios",
  level: "iniciante",
  duration: "2h • 11 aulas",
  price: "R$ 9,90",
  hero: "💬",
  outcome: "Você monta uma abordagem simples para vender serviços ou produtos pelo WhatsApp com mais confiança.",
  modules: [
    {
      title: "Módulo 1 — Preparando seu WhatsApp",
      lessons: [
        lesson("Perfil que passa confiança", "Veja como nome, foto, descrição e status ajudam na venda.", "Arrume sua bio e crie uma mensagem de boas-vindas."),
        lesson("Catálogo simples", "Organize seus serviços em pacotes fáceis de entender.", "Crie 3 pacotes com nome, preço e entrega."),
        lesson("Resposta rápida", "Prepare mensagens prontas para não travar quando alguém chamar.", "Escreva 5 respostas rápidas."),
      ],
    },
    {
      title: "Módulo 2 — Conversa que vende",
      lessons: [
        lesson("Como chamar sem parecer chato", "Aprenda abordagem educada para oferecer algo.", "Escreva uma mensagem para família/amigos."),
        lesson("Perguntas certas", "Descubra o que o cliente precisa antes de falar preço.", "Monte 5 perguntas de atendimento."),
        lesson("Mostrando valor", "Explique resultado, prazo e benefício antes de cobrar.", "Reescreva uma oferta usando benefício."),
      ],
    },
    {
      title: "Módulo 3 — Fechamento e pós-venda",
      lessons: [
        lesson("Como mandar preço", "Aprenda a apresentar preço com clareza e opções.", "Crie uma mensagem com 2 opções de pacote."),
        lesson("Comprovante e entrega", "Organize pagamento, prazo e confirmação.", "Crie um checklist de pedido."),
        lesson("Pós-venda simples", "Peça feedback e indicação sem forçar.", "Escreva uma mensagem de pós-venda."),
      ],
    },
    {
      title: "Módulo 4 — Projeto final e certificado",
      lessons: [
        lesson("Seu funil simples", "Monte o caminho: mensagem, atendimento, preço, pagamento e entrega.", "Crie seu roteiro completo de venda."),
        lesson("Certificado", "Certificado liberado ao concluir aulas e projeto final.", "Finalize o roteiro e marque como concluído."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar um roteiro completo de venda pelo WhatsApp com pacotes e mensagens prontas.",
};

export const curriculoPrimeiroEmprego: CourseContent = {
  id: "curriculo-primeiro-emprego",
  title: "Currículo para Primeiro Emprego",
  subtitle: "Aprenda a montar um currículo simples, bonito e honesto mesmo sem experiência.",
  category: "Negócios",
  level: "iniciante",
  duration: "1h • 8 aulas",
  price: "R$ 4,90",
  hero: "🧾",
  outcome: "Você sai com um currículo organizado e pronto para enviar por PDF ou imprimir.",
  modules: [
    {
      title: "Módulo 1 — O que colocar no currículo",
      lessons: [
        lesson("Dados certos", "Aprenda quais dados colocar e quais evitar.", "Liste seus dados principais de contato."),
        lesson("Objetivo profissional", "Crie um objetivo simples para primeiro emprego.", "Escreva 3 versões de objetivo."),
        lesson("Formação e cursos", "Organize escola, cursos livres e habilidades.", "Liste seus estudos e cursos."),
      ],
    },
    {
      title: "Módulo 2 — Como deixar profissional",
      lessons: [
        lesson("Modelo limpo", "Evite currículo colorido demais e difícil de ler.", "Escolha um modelo simples."),
        lesson("Habilidades importantes", "Inclua habilidades reais como informática, atendimento e organização.", "Escolha 6 habilidades verdadeiras."),
        lesson("Revisão final", "Corrija erros de português, excesso de informação e layout.", "Revise seu currículo com checklist."),
      ],
    },
    {
      title: "Módulo 3 — Enviando do jeito certo",
      lessons: [
        lesson("PDF e nome do arquivo", "Salve o currículo com nome profissional.", "Exporte o arquivo em PDF."),
        lesson("Certificado", "Ao finalizar seu currículo, o certificado do curso é liberado.", "Conclua e baixe seu currículo."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar um currículo completo para primeiro emprego em PDF.",
};

export const cursosBaratos: CourseContent[] = [
  curriculoPrimeiroEmprego,
  apresentacaoEscolar,
  canvaParaVender,
  whatsappVendas,
];
