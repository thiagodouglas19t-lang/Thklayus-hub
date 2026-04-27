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
  subtitle: "Formação profissional para criar sistemas de gestão, aplicações internas, cadastros, painéis administrativos e soluções digitais para empresas.",
  category: "Tecnologia",
  level: "intermediario",
  duration: "12 meses • 338h",
  price: "R$ 89,90",
  hero: "🧩",
  outcome: "Sair com base real para planejar, documentar, programar e apresentar sistemas de gestão usando lógica, banco de dados, telas, autenticação e boas práticas.",
  modules: [
    { title: "Módulo 1 — Fundamentos de sistemas", lessons: [
      lesson("O que faz um desenvolvedor de sistemas", "Entenda o papel do profissional que cria soluções para empresas, lojas, escolas, escritórios e equipes internas.", "Liste 5 problemas reais que poderiam virar sistema: cadastro, pedido, estoque, financeiro ou atendimento."),
      lesson("Como um sistema é planejado", "Aprenda a transformar problema em requisitos, telas, dados e fluxos.", "Escreva o objetivo, público e funcionalidades de um sistema de gestão simples."),
      lesson("Ambiente profissional", "Organização de arquivos, editor, navegador, versionamento básico e rotina de estudo.", "Monte sua estrutura de pastas e checklist de ferramentas para estudar programação."),
    ]},
    { title: "Módulo 2 — Lógica de programação", lessons: [
      lesson("Algoritmos e raciocínio lógico", "Entrada, processamento, saída, sequência de passos e resolução de problemas.", "Escreva o algoritmo de cadastro de cliente com validação de nome, telefone e status."),
      lesson("Variáveis, tipos e operadores", "Como armazenar textos, números, valores booleanos, datas e cálculos.", "Modele os campos de um pedido: cliente, produto, quantidade, preço e total."),
      lesson("Condições e decisões", "Regras com if/else para aprovar, bloquear, calcular ou mostrar mensagens.", "Crie regras para pedido pendente, pago, cancelado e entregue."),
      lesson("Repetições e listas", "Como trabalhar com vários itens, somar valores e filtrar registros.", "Liste produtos de um pedido e calcule o valor total."),
    ]},
    { title: "Módulo 3 — Banco de dados SQL", lessons: [
      lesson("Modelagem de dados", "Tabelas, colunas, chaves e relacionamentos entre clientes, produtos e pedidos.", "Modele um banco com clientes, produtos, pedidos e itens do pedido."),
      lesson("Consultas SQL essenciais", "SELECT, WHERE, ORDER BY, INSERT, UPDATE e DELETE em exemplos práticos.", "Escreva consultas para listar clientes ativos, pedidos pendentes e produtos em estoque."),
      lesson("Relacionamentos e relatórios", "Como cruzar dados para criar visão de gestão.", "Planeje um relatório com total de pedidos por cliente e valor vendido no mês."),
      lesson("Segurança e integridade", "Noções de permissão, validação e cuidado com dados importantes.", "Crie regras de acesso para usuário comum, atendente e administrador."),
    ]},
    { title: "Módulo 4 — Desenvolvimento de aplicação", lessons: [
      lesson("Telas e componentes", "Organize interface em páginas, formulários, cards, tabelas e botões de ação.", "Desenhe as telas de login, dashboard, cadastro e listagem."),
      lesson("CRUD completo", "Criar, listar, editar e remover registros de forma segura e organizada.", "Monte o roteiro do CRUD de produtos com validação e confirmação."),
      lesson("Autenticação e perfis", "Entenda login, usuário, sessão, permissões e áreas protegidas.", "Defina quais telas cada perfil pode acessar."),
      lesson("Painel administrativo", "Métricas, filtros, status, botões e visão geral para decisão.", "Planeje um dashboard com pedidos, receita, clientes e pendências."),
    ]},
    { title: "Módulo 5 — Projeto profissional", lessons: [
      lesson("Sistema de gestão completo", "Junte requisitos, banco, telas, CRUD, permissões e painel em um projeto final.", "Crie o escopo de um sistema para loja, curso, escola ou serviço digital."),
      lesson("Testes e revisão", "Como revisar fluxo, validar botões, conferir dados e corrigir problemas antes de entregar.", "Crie uma checklist de testes para login, cadastro, edição, exclusão e relatório."),
      lesson("Documentação e apresentação", "Explique problema, solução, tecnologias, telas e próximos passos.", "Monte uma apresentação técnica do sistema final como se fosse para um cliente."),
    ]},
  ],
  checklist: ["Sei transformar problema em requisitos", "Entendo lógica de programação", "Modelo banco de dados SQL", "Planejo CRUD completo", "Entendo autenticação e permissões", "Crio painel administrativo", "Apresento projeto técnico"],
  finalProject: "Criar a documentação completa e o protótipo funcional de um sistema de gestão com banco SQL, CRUD, autenticação, painel administrativo, testes e apresentação final.",
});

export const desenvolvedorWebsites = criarCurso({
  id: "desenvolvedor-websites",
  title: "Qualificação Técnica em Desenvolvedor de Websites",
  subtitle: "Formação profissional para criar sites institucionais, landing pages, portfólios, páginas de venda e projetos web com HTML, CSS, JavaScript e WordPress.",
  category: "Tecnologia",
  level: "iniciante",
  duration: "12 meses • 364h",
  price: "R$ 89,90",
  hero: "🌐",
  outcome: "Sair com base para criar, publicar e apresentar sites profissionais, com estrutura correta, visual responsivo, copy clara, formulário e proposta de entrega.",
  modules: [
    { title: "Módulo 1 — Fundamentos da web", lessons: [
      lesson("Como a internet entrega um site", "Entenda domínio, hospedagem, navegador, arquivos, imagens, links e publicação.", "Desenhe a estrutura de um site com home, sobre, serviços, portfólio e contato."),
      lesson("Planejamento de site", "Defina objetivo, público, seções, promessa e chamada para ação.", "Crie o briefing de um site para uma loja, profissional autônomo ou escola."),
      lesson("Organização profissional", "Arquivos, pastas, imagens, nomes, versões e preparação para entrega.", "Monte uma estrutura de projeto com assets, pages, styles e scripts."),
    ]},
    { title: "Módulo 2 — HTML profissional", lessons: [
      lesson("Estrutura de página", "Use header, main, section, footer, títulos, parágrafos, links e botões.", "Crie o HTML da primeira página de um negócio local."),
      lesson("Conteúdo que vende", "Organize título, subtítulo, benefícios, prova, oferta e contato.", "Transforme uma descrição simples em uma seção de venda clara."),
      lesson("Formulários e contato", "Campos, labels, botão, validações básicas e cuidado com informações.", "Crie um formulário de orçamento com nome, contato, serviço e mensagem."),
    ]},
    { title: "Módulo 3 — CSS, layout e responsividade", lessons: [
      lesson("Visual limpo", "Cores, tipografia, espaçamento, alinhamento e contraste.", "Melhore uma seção visualmente bagunçada aplicando hierarquia."),
      lesson("Layout responsivo", "Flex, grid, largura, quebra de colunas e adaptação para celular.", "Crie uma seção com cards que funcione no celular e no computador."),
      lesson("Componentes de interface", "Navbar, hero, cards, FAQ, depoimentos e rodapé.", "Monte 5 componentes reutilizáveis para sites de clientes."),
    ]},
    { title: "Módulo 4 — JavaScript e experiência", lessons: [
      lesson("Interações úteis", "Menus, modais, botões, acordeões e mensagens de confirmação.", "Crie um FAQ que abre e fecha respostas."),
      lesson("Validação de formulário", "Campos obrigatórios, mensagens de erro e envio organizado.", "Valide um formulário antes de enviar."),
      lesson("Performance básica", "Imagens leves, carregamento, organização e experiência no mobile.", "Crie uma checklist de performance para revisar antes de publicar."),
    ]},
    { title: "Módulo 5 — WordPress e ferramentas visuais", lessons: [
      lesson("WordPress na prática", "Páginas, temas, plugins, menus, posts e configurações básicas.", "Planeje um site WordPress para uma empresa pequena."),
      lesson("Design com ferramentas criativas", "Noções de banners, imagens, identidade visual e peças de apoio.", "Crie um banner principal para uma landing page."),
      lesson("Publicação e manutenção", "Backup, revisão, links, responsividade e ajustes de conteúdo.", "Crie um plano de manutenção mensal simples."),
    ]},
    { title: "Módulo 6 — Projeto profissional", lessons: [
      lesson("Site completo", "Planeje e monte um site profissional com páginas, seções, contato e CTA.", "Crie um site para uma empresa fictícia com home, serviços, sobre, portfólio e contato."),
      lesson("Portfólio e proposta comercial", "Transforme seu projeto em prova de habilidade e serviço vendável.", "Crie uma proposta de criação de site com escopo, prazo, preço e entrega."),
      lesson("Apresentação para cliente", "Explique decisões de design, funcionalidades e próximos passos.", "Grave ou escreva uma apresentação curta do site final."),
    ]},
  ],
  checklist: ["Planejo site com briefing", "Crio HTML estruturado", "Faço CSS responsivo", "Uso JavaScript em interações", "Entendo WordPress", "Publico com checklist", "Tenho portfólio e proposta"],
  finalProject: "Criar um site profissional completo para uma empresa fictícia, com páginas principais, versão mobile, formulário, proposta comercial e apresentação final.",
});

export const iaNaPratica = criarCurso({
  id: "ia-na-pratica",
  title: "IA na Prática",
  subtitle: "Formação aplicada para usar inteligência artificial em automação, criatividade, marketing, vendas, atendimento e gestão de tarefas reais.",
  category: "Inteligência Artificial",
  level: "iniciante",
  duration: "5 meses",
  price: "R$ 59,90",
  hero: "🤖",
  outcome: "Aplicar IA com responsabilidade para melhorar produtividade, criar materiais, organizar processos, apoiar vendas, atender clientes e montar um kit profissional de prompts.",
  modules: [
    { title: "Módulo 1 — Fundamentos de IA aplicada", lessons: [
      lesson("O que a IA faz na prática", "Entenda usos reais de IA em estudo, trabalho, atendimento, marketing, vendas e organização.", "Liste 10 tarefas repetitivas que poderiam receber ajuda de IA."),
      lesson("Como escrever bons prompts", "Use contexto, objetivo, formato, referência, limite e critério de qualidade.", "Crie prompts para resumo, roteiro, atendimento, venda e planejamento."),
      lesson("Revisão e responsabilidade", "Aprenda a conferir respostas, evitar erro, proteger dados e não depender cegamente da ferramenta.", "Crie uma checklist antes de usar IA em um trabalho real."),
    ]},
    { title: "Módulo 2 — Automação com IA", lessons: [
      lesson("Tarefas repetitivas", "Use IA para transformar processos bagunçados em passos claros.", "Monte um fluxo para responder dúvidas frequentes de clientes."),
      lesson("Modelos prontos", "Crie modelos de mensagem, contrato simples, checklist, briefing e relatório.", "Crie 5 modelos reutilizáveis para um serviço digital."),
      lesson("Rotina produtiva", "Organize semana, tarefas, prioridades e revisões com apoio de IA.", "Crie uma rotina semanal com blocos de estudo, trabalho e revisão."),
    ]},
    { title: "Módulo 3 — IA criativa", lessons: [
      lesson("Ideias e conteúdo", "Use IA para gerar ideias de posts, aulas, roteiros, títulos e campanhas.", "Gere 20 ideias de conteúdo para vender um curso ou serviço."),
      lesson("Roteiros e apresentações", "Transforme uma ideia solta em roteiro, slides e fala organizada.", "Crie roteiro de apresentação de 3 minutos sobre um tema profissional."),
      lesson("Design e direção criativa", "Como pedir conceitos visuais, paletas, estilo e estrutura de peças.", "Crie um briefing visual para uma campanha de divulgação."),
    ]},
    { title: "Módulo 4 — Marketing e vendas com IA", lessons: [
      lesson("Oferta e público-alvo", "Defina público, dor, desejo, benefício e promessa realista.", "Crie uma oferta para vender um curso ou serviço simples."),
      lesson("Copywriting com IA", "Crie textos de venda, chamadas, descrições e mensagens de follow-up.", "Escreva uma página simples de venda para uma formação."),
      lesson("Atendimento e fechamento", "Monte respostas para dúvidas, objeções, comprovante e pós-venda.", "Crie uma sequência de 3 mensagens para tirar dúvidas e fechar venda."),
    ]},
    { title: "Módulo 5 — Gestão com IA", lessons: [
      lesson("Relatórios e decisões", "Transforme dados simples em resumo, prioridade e plano de ação.", "Crie um relatório semanal de vendas fictícias com sugestões."),
      lesson("Organização de processos", "Documente o passo a passo de atendimento, entrega e suporte.", "Crie um processo padrão para receber, produzir e entregar um pedido."),
      lesson("Assistente virtual planejado", "Defina função, regras, tom, limites e respostas de um assistente.", "Escreva as instruções de um assistente de suporte para seu app."),
    ]},
    { title: "Módulo 6 — Projeto profissional", lessons: [
      lesson("Kit profissional de prompts", "Monte prompts para estudo, venda, marketing, atendimento, organização e criação.", "Organize 25 prompts por categoria com nome, objetivo e exemplo de uso."),
      lesson("Mini projeto com IA", "Escolha uma área e mostre como a IA melhora um processo real.", "Crie um mini projeto aplicando IA em marketing, vendas, gestão ou atendimento."),
      lesson("Apresentação final", "Explique problema, solução com IA, limites, resultado e próximos passos.", "Monte uma apresentação do seu projeto final de IA."),
    ]},
  ],
  checklist: ["Escrevo prompts profissionais", "Uso IA com responsabilidade", "Automatizo tarefas simples", "Crio conteúdo e campanhas", "Apoio vendas e atendimento", "Organizo processos", "Tenho kit profissional de prompts"],
  finalProject: "Criar um kit com 25 prompts profissionais e apresentar um mini projeto aplicando IA em uma rotina real de marketing, vendas, atendimento, gestão ou estudos.",
});
