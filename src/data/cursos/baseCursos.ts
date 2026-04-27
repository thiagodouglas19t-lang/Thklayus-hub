import { CourseContent, lesson } from "../courseTypes";

const criarCurso = (course: CourseContent) => course;

export const officeProfissional = criarCurso({
  id: "office-profissional",
  title: "Pacote Office Profissional",
  subtitle: "Word, PowerPoint e Excel para trabalhos escolares, currículo, apresentações, relatórios e rotina profissional.",
  category: "Informática",
  level: "intermediario",
  duration: "45h",
  price: "R$ 49,90",
  hero: "📊",
  outcome: "Produzir documentos, apresentações e planilhas com aparência profissional e aplicação real.",
  modules: [
    { title: "Word e documentos", lessons: [
      lesson("Estrutura profissional", "Capa, títulos, subtítulos, parágrafos, listas e organização visual.", "Crie um documento com capa, índice simples e seções."),
      lesson("Formatação limpa", "Fontes, espaçamento, margens, alinhamento e exportação correta.", "Reformate um texto bagunçado deixando ele profissional."),
      lesson("Modelos reutilizáveis", "Como criar modelos para trabalhos, propostas e relatórios.", "Monte um modelo de relatório que você possa reutilizar."),
    ]},
    { title: "PowerPoint profissional", lessons: [
      lesson("Slides com hierarquia", "Como criar slides com título forte, pouco texto e foco visual.", "Transforme um texto grande em 6 slides objetivos."),
      lesson("Design de apresentação", "Cores, fontes, imagens, ícones e alinhamento sem exagero.", "Crie um slide antes/depois melhorando o visual."),
      lesson("Roteiro de fala", "Como apresentar sem ler tudo e conduzir uma explicação clara.", "Escreva notas de fala para 3 slides."),
    ]},
    { title: "Excel e planilhas", lessons: [
      lesson("Tabelas úteis", "Organize dados com colunas, filtros, formatos e cálculos simples.", "Monte uma planilha de controle de vendas ou gastos."),
      lesson("Fórmulas essenciais", "Soma, média, mínimo, máximo, porcentagem e status.", "Adicione fórmulas em uma tabela com pelo menos 10 linhas."),
      lesson("Relatório com dados", "Como ler uma planilha e transformar em decisão.", "Escreva um pequeno relatório com base nos números da planilha."),
    ]},
    { title: "Projeto integrado", lessons: [
      lesson("Trabalho completo", "Junte documento, slides e planilha em uma entrega única.", "Crie um projeto com relatório, apresentação e tabela de apoio."),
      lesson("Apresentação final", "Como revisar, exportar e apresentar o material com clareza.", "Finalize os arquivos e prepare a entrega final."),
    ]},
  ],
  checklist: ["Crio documentos profissionais", "Monto apresentações organizadas", "Faço planilhas com fórmulas", "Exporto arquivos corretamente", "Entrego um projeto completo"],
  finalProject: "Criar um pacote com relatório em Word, apresentação em PowerPoint e planilha de apoio no Excel/Sheets.",
});

export const designCanvaProfissional = criarCurso({
  id: "design-canva-profissional",
  title: "Design no Canva Profissional",
  subtitle: "Crie artes, posts, apresentações, convites, materiais de divulgação e peças simples para vender como serviço.",
  category: "Design",
  level: "iniciante",
  duration: "38h",
  price: "R$ 44,90",
  hero: "🎨",
  outcome: "Criar peças visuais limpas e vendáveis usando Canva, com organização, identidade visual e entrega profissional.",
  modules: [
    { title: "Fundamentos do visual", lessons: [
      lesson("Design sem complicação", "Entenda alinhamento, contraste, espaço, hierarquia e consistência visual.", "Escolha uma arte ruim e anote 3 coisas que podem melhorar."),
      lesson("Cores e fontes", "Como combinar cores e fontes sem deixar a arte poluída.", "Crie uma paleta simples com 3 cores e 2 fontes."),
      lesson("Referências e identidade", "Como buscar inspiração sem copiar e criar um padrão visual.", "Monte um mini guia visual para uma marca fictícia."),
    ]},
    { title: "Peças para redes sociais", lessons: [
      lesson("Post informativo", "Estrutura de título, subtítulo, imagem e chamada para ação.", "Crie um post ensinando uma dica simples."),
      lesson("Post de venda", "Como mostrar produto, preço, benefício e contato com clareza.", "Monte um post vendendo um serviço digital."),
      lesson("Carrossel simples", "Organização de sequência, capa, conteúdo e fechamento.", "Crie um carrossel de 5 páginas sobre um tema."),
    ]},
    { title: "Materiais profissionais", lessons: [
      lesson("Apresentações no Canva", "Slides bonitos com pouco texto, boa leitura e visual consistente.", "Crie uma apresentação de 6 slides."),
      lesson("Convites e banners", "Formato, informação principal, data, local, contato e exportação.", "Monte um convite ou banner para evento fictício."),
      lesson("Entrega para cliente", "Como nomear arquivos, enviar prévia, exportar em PNG/PDF e organizar revisão.", "Simule uma entrega com arquivo final e mensagem profissional."),
    ]},
    { title: "Portfólio e venda", lessons: [
      lesson("Montando portfólio", "Escolha as melhores peças e organize para mostrar seu trabalho.", "Separe 5 artes e descreva cada uma em uma linha."),
      lesson("Projeto final de design", "Crie um kit visual completo para uma marca fictícia.", "Monte logo simples, post, banner e apresentação curta."),
    ]},
  ],
  checklist: ["Entendo hierarquia visual", "Crio posts organizados", "Crio apresentações no Canva", "Sei exportar arquivos", "Tenho peças para portfólio"],
  finalProject: "Criar um kit visual com paleta, post, banner, convite/apresentação e entrega organizada para cliente fictício.",
});

export const oratoriaProfissional = criarCurso({
  id: "apresentacao-oratoria-profissional",
  title: "Oratória e Apresentação Profissional",
  subtitle: "Aprenda a montar roteiro, controlar nervosismo, falar com clareza e apresentar trabalhos, ideias ou projetos com confiança.",
  category: "Comunicação",
  level: "iniciante",
  duration: "32h",
  price: "R$ 34,90",
  hero: "🎤",
  outcome: "Apresentar ideias com clareza, postura e segurança em escola, trabalho, reuniões ou atendimento.",
  modules: [
    { title: "Controle do medo e preparação", lessons: [
      lesson("Por que a gente trava", "Entenda o nervosismo como reação normal e aprenda a transformar ansiedade em preparo.", "Grave um áudio de 30 segundos se apresentando."),
      lesson("Respiração e começo seguro", "Técnicas simples para acalmar o corpo antes de falar.", "Treine 3 respirações profundas e comece uma fala com uma frase curta."),
      lesson("Preparação antes da apresentação", "Como revisar tema, público, tempo e objetivo da fala.", "Crie uma checklist antes de apresentar um trabalho."),
    ]},
    { title: "Roteiro e clareza", lessons: [
      lesson("Começo, meio e fim", "Estruture uma apresentação com abertura, desenvolvimento e fechamento.", "Escreva um roteiro de 5 tópicos para um tema simples."),
      lesson("Falar sem enrolar", "Como explicar uma ideia em frases curtas e organizadas.", "Explique um tema em 3 frases."),
      lesson("História, exemplo e conclusão", "Use exemplos para deixar a fala mais fácil de entender.", "Inclua uma história curta em uma apresentação."),
    ]},
    { title: "Postura, voz e slides", lessons: [
      lesson("Voz e ritmo", "Volume, pausa, velocidade e entonação para não parecer robótico.", "Leia um texto curto variando ritmo e pausas."),
      lesson("Olhar e postura", "Como se posicionar, olhar para as pessoas e usar as mãos naturalmente.", "Grave 1 minuto em pé apresentando um tema."),
      lesson("Slides que ajudam", "Slides devem apoiar a fala, não virar texto gigante.", "Transforme um parágrafo em 3 slides com tópicos curtos."),
    ]},
    { title: "Projeto final", lessons: [
      lesson("Apresentação de 3 minutos", "Monte uma apresentação curta com roteiro, slides e fala treinada.", "Prepare uma apresentação de 3 minutos."),
      lesson("Autoavaliação", "Revise clareza, postura, tempo e segurança para melhorar na próxima.", "Assista sua gravação e anote 3 melhorias."),
    ]},
  ],
  checklist: ["Tenho roteiro claro", "Consigo começar sem travar tanto", "Uso slides com pouco texto", "Treinei postura e voz", "Gravei uma apresentação final"],
  finalProject: "Gravar uma apresentação de 3 minutos com roteiro, slides simples e autoavaliação final.",
});

export const empreendedorismoDigital = criarCurso({
  id: "empreendedorismo-servicos-digitais",
  title: "Empreendedorismo e Serviços Digitais",
  subtitle: "Aprenda a transformar slides, artes, documentos e suporte em serviços simples para vender com organização.",
  category: "Negócios",
  level: "intermediario",
  duration: "42h",
  price: "R$ 59,90",
  hero: "🚀",
  outcome: "Montar uma oferta de serviço digital, definir preço, atender clientes e entregar com processo profissional.",
  modules: [
    { title: "Escolha do serviço", lessons: [
      lesson("O que vender no começo", "Ideias simples: slides, artes, documentos, apresentações, suporte básico e organização digital.", "Escolha 3 serviços que você conseguiria entregar hoje."),
      lesson("Oferta clara", "Como explicar o que você faz, para quem é e qual resultado entrega.", "Escreva uma oferta em uma frase."),
      lesson("Limites do serviço", "O que está incluso, o que não está, prazo, alterações e responsabilidade.", "Crie uma lista de regras para seu serviço."),
    ]},
    { title: "Preço e atendimento", lessons: [
      lesson("Como cobrar", "Preço por complexidade, tempo, urgência e valor percebido.", "Crie 3 pacotes: básico, padrão e completo."),
      lesson("Mensagem de atendimento", "Como responder cliente, coletar briefing e evitar confusão.", "Crie uma mensagem para receber pedido de arte ou slide."),
      lesson("Pagamento e confirmação", "Como registrar pedido, status, comprovante e liberação de entrega.", "Monte um checklist de pedido pago e pedido pendente."),
    ]},
    { title: "Produção e entrega", lessons: [
      lesson("Briefing simples", "Perguntas essenciais antes de começar qualquer serviço.", "Crie um formulário com 8 perguntas para clientes."),
      lesson("Organização do processo", "Fila de pedidos, prazo, revisão e versão final.", "Monte um quadro com status: novo, em produção, revisão, entregue."),
      lesson("Entrega profissional", "Como enviar arquivo final, explicar uso e pedir avaliação.", "Escreva uma mensagem de entrega final."),
    ]},
    { title: "Projeto de negócio", lessons: [
      lesson("Mini portfólio", "Como mostrar exemplos do que você faz para gerar confiança.", "Monte 5 exemplos de serviço."),
      lesson("Plano de 7 dias", "Ações simples para divulgar, atender e fechar os primeiros pedidos.", "Crie um plano de divulgação de 7 dias."),
    ]},
  ],
  checklist: ["Escolhi meu serviço", "Tenho tabela de preços", "Tenho mensagem de atendimento", "Tenho processo de entrega", "Tenho mini portfólio"],
  finalProject: "Criar uma oferta completa de serviço digital com pacotes, briefing, mensagem de atendimento, processo e mini portfólio.",
});

export const atendimentoCliente = criarCurso({
  id: "suporte-atendimento-cliente",
  title: "Atendimento ao Cliente e Suporte",
  subtitle: "Formação para responder clientes, abrir tickets, organizar pedidos, acompanhar problemas e finalizar atendimentos com qualidade.",
  category: "Atendimento",
  level: "iniciante",
  duration: "34h",
  price: "R$ 34,90",
  hero: "🎧",
  outcome: "Atender clientes com educação, clareza, registro correto e solução organizada.",
  modules: [
    { title: "Base do atendimento", lessons: [
      lesson("Atender não é só responder", "Entenda escuta, clareza, registro e acompanhamento.", "Escreva uma resposta educada para um cliente irritado sem discutir."),
      lesson("Coleta de informações", "Como perguntar o necessário para entender o problema.", "Crie 6 perguntas para abrir um ticket de suporte."),
      lesson("Tom de voz profissional", "Como ser direto sem ser seco e educado sem enrolar.", "Reescreva uma mensagem fria deixando ela mais profissional."),
    ]},
    { title: "Tickets e pedidos", lessons: [
      lesson("Status de atendimento", "Novo, em análise, aguardando cliente, resolvido e fechado.", "Classifique 5 exemplos de atendimento por status."),
      lesson("Organização de pedidos", "Como registrar pedido, prazo, responsável e observações.", "Monte uma tabela de pedidos com status."),
      lesson("Prioridade", "Como identificar urgência, impacto e ordem de atendimento.", "Organize 5 tickets por prioridade."),
    ]},
    { title: "Resolução e fechamento", lessons: [
      lesson("Resposta com solução", "Explique o que foi feito, o que falta e qual o próximo passo.", "Escreva uma resposta final para um ticket resolvido."),
      lesson("Quando pedir ajuda", "Como escalar para ADM/dev sem bagunçar o atendimento.", "Crie uma mensagem de repasse para um desenvolvedor."),
      lesson("Fechamento correto", "Confirmação, agradecimento, avaliação e registro final.", "Crie uma mensagem de encerramento de atendimento."),
    ]},
    { title: "Simulação final", lessons: [
      lesson("Caso completo", "Abra, acompanhe e feche um atendimento fictício.", "Simule um ticket desde a abertura até o fechamento."),
      lesson("Relatório de suporte", "Transforme atendimentos em informações para melhorar o serviço.", "Escreva um relatório com problemas comuns e sugestões."),
    ]},
  ],
  checklist: ["Sei abrir ticket", "Sei coletar informações", "Sei definir prioridade", "Sei responder com clareza", "Sei fechar atendimento"],
  finalProject: "Simular um atendimento completo com abertura de ticket, perguntas, status, solução, fechamento e relatório final.",
});
