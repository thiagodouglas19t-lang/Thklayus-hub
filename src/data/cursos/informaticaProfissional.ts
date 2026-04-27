import { CourseContent, lesson } from "../courseTypes";

export const informaticaProfissional: CourseContent = {
  id: "informatica-profissional",
  title: "Informática Profissional do Zero",
  subtitle: "Formação gratuita para dominar computador, internet, e-mail, arquivos, documentos, planilhas, apresentações e segurança digital com prática real.",
  category: "Informática",
  level: "iniciante",
  duration: "42h",
  price: "Grátis",
  free: true,
  hero: "💻",
  outcome: "Usar ferramentas digitais com segurança e autonomia para estudar, trabalhar, enviar documentos, organizar arquivos, criar apresentações, montar planilhas e entregar tarefas com padrão profissional.",
  modules: [
    {
      title: "Módulo 1 — Base digital e organização",
      lessons: [
        lesson("Computador, celular e rotina digital", "Entenda como computador, celular, navegador, arquivos e contas trabalham juntos no dia a dia. O objetivo é parar de usar tecnologia no improviso e começar a usar com organização.", "Liste 10 tarefas digitais que você faz hoje e separe em: estudo, trabalho, documentos, comunicação e lazer."),
        lesson("Pastas, arquivos e nomes corretos", "Aprenda a criar pastas, renomear arquivos, separar documentos, imagens, PDFs e downloads. Organização digital evita perda de arquivo e passa profissionalismo.", "Crie uma estrutura de pastas: Documentos, Estudos, Trabalhos, Imagens, PDFs e Comprovantes."),
        lesson("Downloads, anexos e tipos de arquivo", "Entenda diferenças entre PDF, DOCX, XLSX, PPTX, PNG, JPG e ZIP. Aprenda onde os arquivos ficam salvos e como encontrar depois.", "Baixe ou crie 5 arquivos de tipos diferentes e coloque cada um na pasta correta."),
      ],
    },
    {
      title: "Módulo 2 — Internet, pesquisa e segurança",
      lessons: [
        lesson("Navegador profissional", "Use abas, favoritos, histórico, downloads e configurações básicas do navegador sem se perder. Aprenda a reconhecer sites confiáveis e evitar cliques perigosos.", "Crie uma pasta de favoritos com 5 sites úteis para estudo, trabalho e produtividade."),
        lesson("Pesquisa eficiente no Google", "Aprenda a pesquisar com palavras-chave, comparar fontes e encontrar respostas melhores sem cair em conteúdo duvidoso.", "Pesquise um tema e salve 3 fontes confiáveis explicando por que escolheu cada uma."),
        lesson("Senhas, golpes e proteção de conta", "Aprenda boas práticas para senha forte, verificação em duas etapas, cuidado com links suspeitos e proteção de dados pessoais.", "Monte uma checklist de segurança com 10 cuidados antes de clicar, baixar ou enviar dados."),
      ],
    },
    {
      title: "Módulo 3 — E-mail e comunicação profissional",
      lessons: [
        lesson("E-mail do jeito certo", "Aprenda assunto claro, saudação, mensagem objetiva, assinatura, anexos e resposta profissional.", "Escreva um e-mail para enviar um trabalho ou documento com assunto, corpo e anexo descrito."),
        lesson("Anexar, responder e organizar caixa de entrada", "Aprenda a anexar arquivos, responder sem bagunça, encaminhar mensagens e organizar e-mails importantes.", "Crie 3 modelos de e-mail: envio de documento, pedido de informação e resposta educada."),
        lesson("Comunicação digital sem parecer amador", "Entenda como escrever mensagens claras em WhatsApp, chat de suporte, e-mail e formulários sem confusão.", "Reescreva 5 mensagens informais em formato profissional e objetivo."),
      ],
    },
    {
      title: "Módulo 4 — Documentos e PDFs",
      lessons: [
        lesson("Documento bem formatado", "Aprenda título, subtítulo, parágrafo, listas, alinhamento, espaçamento, cabeçalho simples e leitura limpa.", "Crie um documento de 1 página com título, introdução, tópicos e conclusão."),
        lesson("Trabalho escolar ou relatório simples", "Aprenda a montar capa, sumário simples, seções e referências básicas para entregar um trabalho organizado.", "Monte um relatório curto com capa, 3 seções e conclusão."),
        lesson("PDF profissional", "Aprenda a salvar em PDF, nomear corretamente, revisar antes de enviar e evitar arquivos bagunçados.", "Transforme seu documento em PDF e salve com nome padrão: nome-tema-data.pdf."),
      ],
    },
    {
      title: "Módulo 5 — Apresentações profissionais",
      lessons: [
        lesson("Slides limpos e objetivos", "Aprenda a evitar slides poluídos, usar pouco texto, criar títulos fortes e organizar a explicação.", "Crie 5 slides sobre um tema simples usando título, imagem e poucos tópicos."),
        lesson("Design básico para apresentação", "Use contraste, alinhamento, espaçamento, imagens e cores de forma simples para deixar a apresentação mais bonita.", "Melhore os 5 slides criando padrão de cor, fonte e espaçamento."),
        lesson("Roteiro de fala", "Aprenda a apresentar sem ler tudo no slide. Crie roteiro curto para explicar cada parte com segurança.", "Escreva uma fala de 30 segundos para cada slide criado."),
      ],
    },
    {
      title: "Módulo 6 — Planilhas básicas para vida e trabalho",
      lessons: [
        lesson("Tabela organizada", "Aprenda colunas, linhas, títulos, filtros e formatação para deixar uma planilha legível.", "Crie uma planilha de controle com data, descrição, categoria, valor e status."),
        lesson("Soma, média e porcentagem", "Aprenda cálculos básicos úteis para gastos, notas, estoque, pedidos e organização pessoal.", "Crie uma planilha de gastos com soma total, média e porcentagem por categoria."),
        lesson("Controle simples de tarefas", "Use planilha para acompanhar atividades, prazos, responsáveis e status.", "Monte uma planilha de tarefas com status: pendente, em andamento e concluído."),
      ],
    },
    {
      title: "Módulo 7 — Nuvem, compartilhamento e entrega",
      lessons: [
        lesson("Drive e pastas na nuvem", "Aprenda a salvar arquivos na nuvem, organizar pastas, recuperar documentos e acessar de outro aparelho.", "Crie uma pasta na nuvem com subpastas para documento, planilha, apresentação e comprovantes."),
        lesson("Compartilhar com permissão correta", "Entenda visualização, comentário, edição e riscos de deixar arquivo aberto para qualquer pessoa.", "Compartilhe uma pasta fictícia em modo visualização e escreva uma mensagem de envio."),
        lesson("Compactar e entregar arquivos", "Aprenda quando usar ZIP, quando enviar PDF e como montar um pacote de entrega organizado.", "Prepare um pacote final com arquivos nomeados e uma mensagem de entrega profissional."),
      ],
    },
    {
      title: "Módulo 8 — Projeto final: Kit Digital Profissional",
      lessons: [
        lesson("Montando o kit digital", "Crie um pacote com documento formatado, apresentação, planilha, PDF e pasta organizada na nuvem.", "Monte seu Kit Digital Profissional com todos os arquivos criados durante o curso."),
        lesson("Revisão profissional", "Revise nomes, aparência, organização, permissões, ortografia e clareza antes de entregar.", "Use a checklist final e corrija qualquer arquivo bagunçado antes da entrega."),
        lesson("Entrega e apresentação do projeto", "Aprenda a explicar o que você fez, por que organizou daquele jeito e como isso mostra suas habilidades digitais.", "Escreva uma mensagem final apresentando seu kit e o link da pasta organizada."),
      ],
    },
  ],
  checklist: [
    "Organizo arquivos, pastas e downloads",
    "Uso navegador e pesquisa com segurança",
    "Escrevo e-mails e mensagens profissionais",
    "Crio documentos bem formatados e salvo em PDF",
    "Monto apresentações limpas com roteiro de fala",
    "Faço planilhas básicas com soma, média e status",
    "Compartilho arquivos na nuvem com permissão correta",
    "Entrego um Kit Digital Profissional completo",
  ],
  finalProject: "Criar um Kit Digital Profissional com documento formatado, PDF, apresentação, planilha de controle, pasta organizada na nuvem, permissões corretas e mensagem de entrega.",
};
