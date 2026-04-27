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

export const desenvolvedorSistemas = criarCurso({
  id: "desenvolvedor-sistemas",
  title: "Qualificação Técnica em Desenvolvedor de Sistemas",
  subtitle: "Formação prática em lógica, banco de dados e programação para criar sistemas de gestão, cadastros, painéis e aplicações internas.",
  category: "Tecnologia",
  level: "intermediario",
  duration: "12 meses • 338h",
  price: "R$ 89,90",
  hero: "🧩",
  outcome: "Planejar, construir e apresentar um sistema simples com lógica, banco de dados, telas, autenticação e documentação básica.",
  modules: [
    { title: "Lógica de programação", lessons: [
      lesson("Algoritmos e raciocínio lógico", "Entenda entrada, processamento, saída e como quebrar problemas em passos.", "Escreva o algoritmo de um sistema de cadastro de clientes."),
      lesson("Variáveis, condições e repetições", "Aprenda a controlar fluxo de decisão e repetição em sistemas.", "Crie regras para aprovar ou bloquear um cadastro."),
      lesson("Funções e organização", "Separe responsabilidades para evitar código bagunçado.", "Divida um cadastro em funções de validar, salvar e listar."),
    ]},
    { title: "Banco de dados SQL", lessons: [
      lesson("Tabelas e relacionamentos", "Entenda registros, colunas, chaves e relações entre dados.", "Modele tabelas para clientes, pedidos e produtos."),
      lesson("Consultas essenciais", "Aprenda a buscar, filtrar, ordenar e cruzar informações.", "Escreva consultas para listar clientes ativos e pedidos pendentes."),
      lesson("Segurança dos dados", "Cuidados com acesso, validação e organização de informações.", "Crie regras simples de quem pode ver ou editar cada dado."),
    ]},
    { title: "Programação aplicada", lessons: [
      lesson("Estrutura de um sistema", "Entenda telas, rotas, componentes, estados e comunicação com dados.", "Desenhe o fluxo de um sistema de controle de pedidos."),
      lesson("CRUD completo", "Criar, listar, editar e remover registros de forma organizada.", "Monte o roteiro de um CRUD de produtos."),
      lesson("Painel administrativo", "Como mostrar métricas, status e ações para o gestor.", "Planeje um painel com total de clientes, pedidos e receita."),
    ]},
    { title: "Projeto final", lessons: [
      lesson("Sistema de gestão", "Junte lógica, banco, telas e painel em um projeto completo.", "Crie o escopo de um sistema para loja, escola ou serviço."),
      lesson("Documentação e apresentação", "Explique problema, solução, funcionalidades e próximos passos.", "Monte uma apresentação técnica do sistema final."),
    ]},
  ],
  checklist: ["Entendo lógica de programação", "Sei modelar banco SQL", "Planejo CRUD", "Crio painel administrativo", "Apresento projeto técnico"],
  finalProject: "Criar o protótipo/documentação de um sistema de gestão com cadastro, banco de dados, painel e apresentação final.",
});

export const desenvolvedorWebsites = criarCurso({
  id: "desenvolvedor-websites",
  title: "Qualificação Técnica em Desenvolvedor de Websites",
  subtitle: "Formação para criar sites profissionais com HTML, CSS, JavaScript, WordPress, noções de design e publicação online.",
  category: "Tecnologia",
  level: "iniciante",
  duration: "12 meses • 364h",
  price: "R$ 89,90",
  hero: "🌐",
  outcome: "Criar websites institucionais, páginas de venda e portfólios com estrutura, design responsivo e publicação organizada.",
  modules: [
    { title: "Fundamentos da web", lessons: [
      lesson("Como um site funciona", "Entenda domínio, hospedagem, navegador, páginas, arquivos e links.", "Desenhe a estrutura de um site com home, sobre, serviços e contato."),
      lesson("HTML profissional", "Crie a estrutura da página com títulos, seções, botões, imagens e formulários.", "Monte o HTML de uma página institucional simples."),
      lesson("CSS e responsividade", "Organize cores, espaçamento, tipografia e layout para celular e desktop.", "Crie uma versão mobile e desktop de uma seção de vendas."),
    ]},
    { title: "JavaScript e interação", lessons: [
      lesson("Interações básicas", "Use JavaScript para menus, botões, modais e validações simples.", "Crie um botão que abre uma seção de contato."),
      lesson("Formulários e validação", "Colete dados com cuidado e valide campos obrigatórios.", "Planeje um formulário de orçamento para cliente."),
      lesson("Componentes reutilizáveis", "Evite repetir código criando blocos reaproveitáveis.", "Liste componentes para cards, navbar, footer e depoimentos."),
    ]},
    { title: "WordPress, design e publicação", lessons: [
      lesson("WordPress na prática", "Entenda páginas, temas, plugins, menus e conteúdo.", "Planeje um site WordPress para uma loja pequena."),
      lesson("Design para sites", "Use hierarquia, contraste, imagens e chamadas para ação.", "Melhore a primeira dobra de uma página de serviço."),
      lesson("Publicação e entrega", "Checklist antes de entregar: links, textos, mobile, velocidade e contato.", "Crie uma checklist de entrega de site."),
    ]},
    { title: "Projeto final", lessons: [
      lesson("Site profissional", "Planeje e monte uma página completa para uma empresa fictícia.", "Crie um site com home, serviço, preço, contato e chamada para ação."),
      lesson("Portfólio e proposta", "Apresente o site como serviço vendável.", "Crie uma proposta simples para vender criação de site."),
    ]},
  ],
  checklist: ["Crio estrutura HTML", "Estilizo com CSS", "Uso interações JS", "Planejo site WordPress", "Entrego site com checklist"],
  finalProject: "Criar um site profissional completo para uma empresa fictícia, com proposta comercial e checklist de entrega.",
});

export const iaNaPratica = criarCurso({
  id: "ia-na-pratica",
  title: "IA na Prática",
  subtitle: "Aprenda a aplicar inteligência artificial em automações, criatividade, marketing, vendas e gestão sem depender de programação avançada.",
  category: "Inteligência Artificial",
  level: "iniciante",
  duration: "5 meses",
  price: "R$ 59,90",
  hero: "🤖",
  outcome: "Usar IA de forma prática para criar conteúdo, organizar processos, melhorar atendimento, apoiar vendas e automatizar tarefas simples.",
  modules: [
    { title: "Fundamentos de IA aplicada", lessons: [
      lesson("O que a IA faz na prática", "Entenda usos reais de IA em estudos, trabalho, atendimento, marketing e organização.", "Liste 5 tarefas repetitivas que poderiam receber ajuda de IA."),
      lesson("Prompts profissionais", "Aprenda a pedir com contexto, objetivo, formato e critérios.", "Crie 3 prompts: resumo, roteiro e atendimento."),
      lesson("Limites e responsabilidade", "Como revisar respostas, evitar dependência e proteger dados sensíveis.", "Crie uma checklist antes de usar IA em trabalho real."),
    ]},
    { title: "Automação e gestão com IA", lessons: [
      lesson("Automação de tarefas", "Use IA para criar listas, modelos, respostas e processos repetíveis.", "Monte um fluxo de atendimento com mensagens prontas."),
      lesson("Gestão com IA", "Organize tarefas, calendário, metas, relatórios e decisões simples.", "Crie um plano semanal de trabalho com apoio de IA."),
      lesson("Assistentes virtuais", "Planeje um assistente para suporte, estudo ou vendas.", "Escreva as regras de um assistente de atendimento."),
    ]},
    { title: "Criatividade, marketing e vendas", lessons: [
      lesson("IA criativa", "Crie ideias de posts, roteiros, títulos, descrições e campanhas.", "Gere uma campanha de 5 posts para um curso."),
      lesson("Marketing com IA", "Use IA para público-alvo, oferta, copy e calendário de conteúdo.", "Crie uma oferta com benefício, prova e chamada para ação."),
      lesson("Vendas com IA", "Monte mensagens de venda, atendimento e follow-up com clareza.", "Crie uma sequência de 3 mensagens para vender um serviço."),
    ]},
    { title: "Projeto final", lessons: [
      lesson("Sistema pessoal com IA", "Monte um kit de prompts para estudar, vender, atender e organizar tarefas.", "Organize 10 prompts úteis por categoria."),
      lesson("Aplicação prática", "Escolha uma área e mostre como a IA melhora o processo.", "Apresente um mini projeto usando IA em marketing, vendas ou gestão."),
    ]},
  ],
  checklist: ["Crio prompts melhores", "Uso IA com responsabilidade", "Automatizo tarefas simples", "Aplico IA em marketing", "Tenho kit de prompts profissional"],
  finalProject: "Criar um kit de prompts e um mini projeto aplicando IA em uma rotina real de estudo, atendimento, marketing, vendas ou gestão.",
});
