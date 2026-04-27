export type CourseLevel = "iniciante" | "intermediario" | "avancado";

export type CourseLesson = {
  title: string;
  summary: string;
  practice: string;
};

export type CourseModule = {
  title: string;
  lessons: CourseLesson[];
};

export type CourseContent = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  duration: string;
  price: string;
  free?: boolean;
  hero: string;
  outcome: string;
  modules: CourseModule[];
  checklist: string[];
  finalProject: string;
};

export type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  categoria: string;
  tipo: "Grátis" | "Pago";
  selo: "Popular" | "Novo" | "Essencial" | "Pro";
  resultado: string;
  pixCode: string;
};

const chavePixAleatoria = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";

const lesson = (title: string, summary: string, practice: string): CourseLesson => ({ title, summary, practice });

export const professionalCourses: CourseContent[] = [
  {
    id: "assistente-administrativo-digital",
    title: "Assistente Administrativo Digital",
    subtitle: "Formação prática para trabalhar com documentos, atendimento, organização, planilhas, e-mail e rotina administrativa.",
    category: "Administração",
    level: "iniciante",
    duration: "40h",
    price: "R$ 39,90",
    hero: "🏢",
    outcome: "Atuar em rotinas administrativas básicas com organização, comunicação profissional e domínio de ferramentas digitais.",
    modules: [
      {
        title: "Fundamentos da rotina administrativa",
        lessons: [
          lesson("O papel do assistente administrativo", "Você aprende o que um assistente faz no dia a dia: organizar informações, atender pessoas, controlar documentos e apoiar processos internos.", "Liste 5 tarefas administrativas que uma empresa pequena precisa controlar toda semana."),
          lesson("Organização profissional de tarefas", "Como separar demandas urgentes, importantes e recorrentes sem se perder.", "Monte uma lista de tarefas com prioridade alta, média e baixa."),
          lesson("Postura profissional", "Comunicação, pontualidade, cuidado com dados e responsabilidade no ambiente de trabalho.", "Escreva 3 atitudes que passam confiança para um cliente ou gestor."),
        ],
      },
      {
        title: "Documentos, e-mail e atendimento",
        lessons: [
          lesson("Documentos básicos", "Como criar documentos simples, comunicados, recibos, propostas e registros internos.", "Crie um modelo de comunicado interno com título, data, mensagem e assinatura."),
          lesson("E-mail profissional", "Estrutura de assunto, saudação, mensagem objetiva, anexos e encerramento.", "Escreva um e-mail confirmando o recebimento de um pedido."),
          lesson("Atendimento inicial", "Como receber uma solicitação, coletar informações e encaminhar corretamente.", "Crie uma mensagem padrão para receber pedidos de suporte ou orçamento."),
        ],
      },
      {
        title: "Planilhas e controles simples",
        lessons: [
          lesson("Controle de clientes", "Como organizar nome, contato, status, data e observações em uma planilha.", "Monte uma tabela com 5 clientes fictícios e status de atendimento."),
          lesson("Controle de pagamentos", "Entradas, pendências, vencimentos e observações sem complicar.", "Crie uma tabela de pagamentos com pago, pendente e atrasado."),
          lesson("Relatório simples", "Como transformar dados em um resumo claro para tomada de decisão.", "Escreva um relatório de 5 linhas sobre os dados da sua tabela."),
        ],
      },
      {
        title: "Projeto profissional",
        lessons: [
          lesson("Montando um kit administrativo", "Junte modelos de e-mail, tabela de clientes, tabela de pagamentos e checklist de atendimento.", "Organize todos os modelos criados nas aulas anteriores."),
          lesson("Revisão e entrega", "Como revisar erros, deixar o material claro e apresentar como um mini portfólio.", "Faça uma revisão final e destaque o que você sabe fazer."),
        ],
      },
    ],
    checklist: ["Sei organizar tarefas por prioridade", "Sei criar documentos simples", "Sei responder e-mails profissionais", "Sei montar planilhas básicas", "Tenho um kit administrativo pronto"],
    finalProject: "Criar um kit administrativo com comunicado, e-mail profissional, tabela de clientes, tabela de pagamentos e checklist de atendimento.",
  },
  {
    id: "informatica-profissional",
    title: "Informática Profissional do Zero",
    subtitle: "Aprenda computador, arquivos, internet, e-mail, documentos, apresentações e segurança digital para estudo e trabalho.",
    category: "Informática",
    level: "iniciante",
    duration: "36h",
    price: "Grátis",
    free: true,
    hero: "💻",
    outcome: "Usar computador e ferramentas digitais com segurança para estudar, trabalhar e resolver tarefas do dia a dia.",
    modules: [
      {
        title: "Base digital",
        lessons: [
          lesson("Computador, celular e arquivos", "Entenda pastas, downloads, documentos, imagens, PDFs e organização básica.", "Crie uma estrutura de pastas para estudos, documentos e imagens."),
          lesson("Navegador e pesquisa", "Como pesquisar melhor, abrir abas, baixar arquivos e evitar páginas suspeitas.", "Pesquise um tema e salve 3 links confiáveis em uma lista."),
          lesson("Contas e senhas", "Boas práticas para criar senhas fortes, proteger contas e evitar perda de acesso.", "Crie uma checklist de segurança para suas contas principais."),
        ],
      },
      {
        title: "Ferramentas essenciais",
        lessons: [
          lesson("Documentos de texto", "Como escrever, formatar títulos, usar listas e salvar em PDF.", "Crie um documento com capa simples, título e texto organizado."),
          lesson("Apresentações", "Como montar slides limpos, com pouco texto e visual organizado.", "Monte 5 slides sobre um tema escolar ou profissional."),
          lesson("Planilhas básicas", "Tabelas, soma, média, filtros e controle simples de informações.", "Crie uma planilha de gastos ou notas com soma e média."),
        ],
      },
      {
        title: "Internet profissional",
        lessons: [
          lesson("E-mail na prática", "Enviar, responder, anexar arquivos, organizar caixa de entrada e usar assunto correto.", "Envie um modelo de e-mail profissional para um professor ou cliente fictício."),
          lesson("Drive e nuvem", "Salvar, organizar, compartilhar arquivos e controlar permissões.", "Crie uma pasta na nuvem e organize documentos por categoria."),
          lesson("PDF e documentos", "Juntar, converter, compactar e enviar PDFs de forma organizada.", "Transforme um documento em PDF e escreva uma mensagem de envio."),
        ],
      },
      {
        title: "Projeto final",
        lessons: [
          lesson("Kit digital pessoal", "Crie documento, apresentação, planilha e pasta organizada para provar suas habilidades.", "Monte seu kit digital com os arquivos feitos no curso."),
          lesson("Checklist de revisão", "Revise nomes de arquivos, aparência, organização e segurança antes de entregar.", "Faça a revisão final do seu kit e marque o que está pronto."),
        ],
      },
    ],
    checklist: ["Organizo arquivos e pastas", "Uso navegador com segurança", "Crio documentos e PDFs", "Monto slides simples", "Faço planilhas básicas"],
    finalProject: "Criar um kit digital com documento formatado, apresentação, planilha simples e pasta organizada na nuvem.",
  },
  {
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
      {
        title: "Word e documentos",
        lessons: [
          lesson("Estrutura profissional", "Capa, títulos, subtítulos, parágrafos, listas e organização visual.", "Crie um documento com capa, índice simples e seções."),
          lesson("Formatação limpa", "Fontes, espaçamento, margens, alinhamento e exportação correta.", "Reformate um texto bagunçado deixando ele profissional."),
          lesson("Modelos reutilizáveis", "Como criar modelos para trabalhos, propostas e relatórios.", "Monte um modelo de relatório que você possa reutilizar."),
        ],
      },
      {
        title: "PowerPoint profissional",
        lessons: [
          lesson("Slides com hierarquia", "Como criar slides com título forte, pouco texto e foco visual.", "Transforme um texto grande em 6 slides objetivos."),
          lesson("Design de apresentação", "Cores, fontes, imagens, ícones e alinhamento sem exagero.", "Crie um slide antes/depois melhorando o visual."),
          lesson("Roteiro de fala", "Como apresentar sem ler tudo e conduzir uma explicação clara.", "Escreva notas de fala para 3 slides."),
        ],
      },
      {
        title: "Excel e planilhas",
        lessons: [
          lesson("Tabelas úteis", "Organize dados com colunas, filtros, formatos e cálculos simples.", "Monte uma planilha de controle de vendas ou gastos."),
          lesson("Fórmulas essenciais", "Soma, média, mínimo, máximo, porcentagem e status.", "Adicione fórmulas em uma tabela com pelo menos 10 linhas."),
          lesson("Relatório com dados", "Como ler uma planilha e transformar em decisão.", "Escreva um pequeno relatório com base nos números da planilha."),
        ],
      },
      {
        title: "Projeto integrado",
        lessons: [
          lesson("Trabalho completo", "Junte documento, slides e planilha em uma entrega única.", "Crie um projeto com relatório, apresentação e tabela de apoio."),
          lesson("Apresentação final", "Como revisar, exportar e apresentar o material com clareza.", "Finalize os arquivos e prepare a entrega final."),
        ],
      },
    ],
    checklist: ["Crio documentos profissionais", "Monto apresentações organizadas", "Faço planilhas com fórmulas", "Exporto arquivos corretamente", "Entrego um projeto completo"],
    finalProject: "Criar um pacote com relatório em Word, apresentação em PowerPoint e planilha de apoio no Excel/Sheets.",
  },
  {
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
      {
        title: "Fundamentos do visual",
        lessons: [
          lesson("Design sem complicação", "Entenda alinhamento, contraste, espaço, hierarquia e consistência visual.", "Escolha uma arte ruim e anote 3 coisas que podem melhorar."),
          lesson("Cores e fontes", "Como combinar cores e fontes sem deixar a arte poluída.", "Crie uma paleta simples com 3 cores e 2 fontes."),
          lesson("Referências e identidade", "Como buscar inspiração sem copiar e criar um padrão visual.", "Monte um mini guia visual para uma marca fictícia."),
        ],
      },
      {
        title: "Peças para redes sociais",
        lessons: [
          lesson("Post informativo", "Estrutura de título, subtítulo, imagem e chamada para ação.", "Crie um post ensinando uma dica simples."),
          lesson("Post de venda", "Como mostrar produto, preço, benefício e contato com clareza.", "Monte um post vendendo um serviço digital."),
          lesson("Carrossel simples", "Organização de sequência, capa, conteúdo e fechamento.", "Crie um carrossel de 5 páginas sobre um tema."),
        ],
      },
      {
        title: "Materiais profissionais",
        lessons: [
          lesson("Apresentações no Canva", "Slides bonitos com pouco texto, boa leitura e visual consistente.", "Crie uma apresentação de 6 slides."),
          lesson("Convites e banners", "Formato, informação principal, data, local, contato e exportação.", "Monte um convite ou banner para evento fictício."),
          lesson("Entrega para cliente", "Como nomear arquivos, enviar prévia, exportar em PNG/PDF e organizar revisão.", "Simule uma entrega com arquivo final e mensagem profissional."),
        ],
      },
      {
        title: "Portfólio e venda",
        lessons: [
          lesson("Montando portfólio", "Escolha as melhores peças e organize para mostrar seu trabalho.", "Separe 5 artes e descreva cada uma em uma linha."),
          lesson("Projeto final de design", "Crie um kit visual completo para uma marca fictícia.", "Monte logo simples, post, banner e apresentação curta."),
        ],
      },
    ],
    checklist: ["Entendo hierarquia visual", "Crio posts organizados", "Crio apresentações no Canva", "Sei exportar arquivos", "Tenho peças para portfólio"],
    finalProject: "Criar um kit visual com paleta, post, banner, convite/apresentação e entrega organizada para cliente fictício.",
  },
  {
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
      {
        title: "Controle do medo e preparação",
        lessons: [
          lesson("Por que a gente trava", "Entenda o nervosismo como reação normal e aprenda a transformar ansiedade em preparo.", "Grave um áudio de 30 segundos se apresentando."),
          lesson("Respiração e começo seguro", "Técnicas simples para acalmar o corpo antes de falar.", "Treine 3 respirações profundas e comece uma fala com uma frase curta."),
          lesson("Preparação antes da apresentação", "Como revisar tema, público, tempo e objetivo da fala.", "Crie uma checklist antes de apresentar um trabalho."),
        ],
      },
      {
        title: "Roteiro e clareza",
        lessons: [
          lesson("Começo, meio e fim", "Estruture uma apresentação com abertura, desenvolvimento e fechamento.", "Escreva um roteiro de 5 tópicos para um tema simples."),
          lesson("Falar sem enrolar", "Como explicar uma ideia em frases curtas e organizadas.", "Explique um tema em 3 frases."),
          lesson("História, exemplo e conclusão", "Use exemplos para deixar a fala mais fácil de entender.", "Inclua uma história curta em uma apresentação."),
        ],
      },
      {
        title: "Postura, voz e slides",
        lessons: [
          lesson("Voz e ritmo", "Volume, pausa, velocidade e entonação para não parecer robótico.", "Leia um texto curto variando ritmo e pausas."),
          lesson("Olhar e postura", "Como se posicionar, olhar para as pessoas e usar as mãos naturalmente.", "Grave 1 minuto em pé apresentando um tema."),
          lesson("Slides que ajudam", "Slides devem apoiar a fala, não virar texto gigante.", "Transforme um parágrafo em 3 slides com tópicos curtos."),
        ],
      },
      {
        title: "Projeto final",
        lessons: [
          lesson("Apresentação de 3 minutos", "Monte uma apresentação curta com roteiro, slides e fala treinada.", "Prepare uma apresentação de 3 minutos."),
          lesson("Autoavaliação", "Revise clareza, postura, tempo e segurança para melhorar na próxima.", "Assista sua gravação e anote 3 melhorias."),
        ],
      },
    ],
    checklist: ["Tenho roteiro claro", "Consigo começar sem travar tanto", "Uso slides com pouco texto", "Treinei postura e voz", "Gravei uma apresentação final"],
    finalProject: "Gravar uma apresentação de 3 minutos com roteiro, slides simples e autoavaliação final.",
  },
  {
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
      {
        title: "Escolha do serviço",
        lessons: [
          lesson("O que vender no começo", "Ideias simples: slides, artes, documentos, apresentações, suporte básico e organização digital.", "Escolha 3 serviços que você conseguiria entregar hoje."),
          lesson("Oferta clara", "Como explicar o que você faz, para quem é e qual resultado entrega.", "Escreva uma oferta em uma frase."),
          lesson("Limites do serviço", "O que está incluso, o que não está, prazo, alterações e responsabilidade.", "Crie uma lista de regras para seu serviço."),
        ],
      },
      {
        title: "Preço e atendimento",
        lessons: [
          lesson("Como cobrar", "Preço por complexidade, tempo, urgência e valor percebido.", "Crie 3 pacotes: básico, padrão e completo."),
          lesson("Mensagem de atendimento", "Como responder cliente, coletar briefing e evitar confusão.", "Crie uma mensagem para receber pedido de arte ou slide."),
          lesson("Pagamento e confirmação", "Como registrar pedido, status, comprovante e liberação de entrega.", "Monte um checklist de pedido pago e pedido pendente."),
        ],
      },
      {
        title: "Produção e entrega",
        lessons: [
          lesson("Briefing simples", "Perguntas essenciais antes de começar qualquer serviço.", "Crie um formulário com 8 perguntas para clientes."),
          lesson("Organização do processo", "Fila de pedidos, prazo, revisão e versão final.", "Monte um quadro com status: novo, em produção, revisão, entregue."),
          lesson("Entrega profissional", "Como enviar arquivo final, explicar uso e pedir avaliação.", "Escreva uma mensagem de entrega final."),
        ],
      },
      {
        title: "Projeto de negócio",
        lessons: [
          lesson("Mini portfólio", "Como mostrar exemplos do que você faz para gerar confiança.", "Monte 5 exemplos de serviço."),
          lesson("Plano de 7 dias", "Ações simples para divulgar, atender e fechar os primeiros pedidos.", "Crie um plano de divulgação de 7 dias."),
        ],
      },
    ],
    checklist: ["Escolhi meu serviço", "Tenho tabela de preços", "Tenho mensagem de atendimento", "Tenho processo de entrega", "Tenho mini portfólio"],
    finalProject: "Criar uma oferta completa de serviço digital com pacotes, briefing, mensagem de atendimento, processo e mini portfólio.",
  },
  {
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
      {
        title: "Base do atendimento",
        lessons: [
          lesson("Atender não é só responder", "Entenda escuta, clareza, registro e acompanhamento.", "Escreva uma resposta educada para um cliente irritado sem discutir."),
          lesson("Coleta de informações", "Como perguntar o necessário para entender o problema.", "Crie 6 perguntas para abrir um ticket de suporte."),
          lesson("Tom de voz profissional", "Como ser direto sem ser seco e educado sem enrolar.", "Reescreva uma mensagem fria deixando ela mais profissional."),
        ],
      },
      {
        title: "Tickets e pedidos",
        lessons: [
          lesson("Status de atendimento", "Novo, em análise, aguardando cliente, resolvido e fechado.", "Classifique 5 exemplos de atendimento por status."),
          lesson("Organização de pedidos", "Como registrar pedido, prazo, responsável e observações.", "Monte uma tabela de pedidos com status."),
          lesson("Prioridade", "Como identificar urgência, impacto e ordem de atendimento.", "Organize 5 tickets por prioridade."),
        ],
      },
      {
        title: "Resolução e fechamento",
        lessons: [
          lesson("Resposta com solução", "Explique o que foi feito, o que falta e qual o próximo passo.", "Escreva uma resposta final para um ticket resolvido."),
          lesson("Quando pedir ajuda", "Como escalar para ADM/dev sem bagunçar o atendimento.", "Crie uma mensagem de repasse para um desenvolvedor."),
          lesson("Fechamento correto", "Confirmação, agradecimento, avaliação e registro final.", "Crie uma mensagem de encerramento de atendimento."),
        ],
      },
      {
        title: "Simulação final",
        lessons: [
          lesson("Caso completo", "Abra, acompanhe e feche um atendimento fictício.", "Simule um ticket desde a abertura até o fechamento."),
          lesson("Relatório de suporte", "Transforme atendimentos em informações para melhorar o serviço.", "Escreva um relatório com problemas comuns e sugestões."),
        ],
      },
    ],
    checklist: ["Sei abrir ticket", "Sei coletar informações", "Sei definir prioridade", "Sei responder com clareza", "Sei fechar atendimento"],
    finalProject: "Simular um atendimento completo com abertura de ticket, perguntas, status, solução, fechamento e relatório final.",
  },
  {
    id: "seguranca-digital-profissional",
    title: "Segurança Digital para Usuários",
    subtitle: "Aprenda a proteger contas, senhas, celular, arquivos, compras online e identificar golpes comuns no dia a dia.",
    category: "Segurança",
    level: "iniciante",
    duration: "30h",
    price: "Grátis",
    free: true,
    hero: "🛡️",
    outcome: "Reduzir riscos digitais, proteger contas importantes e reconhecer sinais de golpe antes de cair em problemas.",
    modules: [
      {
        title: "Contas e senhas",
        lessons: [
          lesson("Senha forte na prática", "Como criar senhas melhores e evitar repetir a mesma senha em tudo.", "Crie um modelo de senha forte sem usar dados pessoais."),
          lesson("Verificação em duas etapas", "Por que ativar 2FA e como isso protege contas importantes.", "Liste quais contas suas precisam de mais proteção."),
          lesson("Recuperação de conta", "Como manter e-mail, telefone e códigos de recuperação organizados.", "Monte uma checklist de recuperação segura."),
        ],
      },
      {
        title: "Golpes e links suspeitos",
        lessons: [
          lesson("Sinais de golpe", "Promessas exageradas, urgência, links estranhos, erros e pedidos de dados.", "Analise uma mensagem fictícia e marque sinais suspeitos."),
          lesson("Compras online", "Como verificar loja, preço, pagamento, reputação e segurança.", "Crie uma checklist antes de comprar online."),
          lesson("Perfis falsos", "Como avaliar perfil, histórico, seguidores, comentários e comportamento.", "Liste sinais de perfil suspeito."),
        ],
      },
      {
        title: "Celular e privacidade",
        lessons: [
          lesson("Permissões de aplicativos", "Como revisar câmera, microfone, localização e arquivos.", "Revise permissões de 3 apps no seu celular."),
          lesson("Backup seguro", "Como salvar fotos, documentos e contatos sem perder tudo.", "Crie um plano simples de backup semanal."),
          lesson("Dados pessoais", "O que evitar publicar e como reduzir exposição.", "Faça uma lista de informações que você não deve expor."),
        ],
      },
      {
        title: "Plano de proteção",
        lessons: [
          lesson("Checklist final de segurança", "Organize tudo em um plano simples para revisar todo mês.", "Monte sua checklist mensal de segurança digital."),
          lesson("Simulação de decisão", "Treine decidir se uma mensagem, compra ou link parece confiável.", "Classifique 5 situações como segura, atenção ou risco."),
        ],
      },
    ],
    checklist: ["Uso senhas melhores", "Entendo 2FA", "Reconheço sinais de golpe", "Cuido das permissões do celular", "Tenho plano de backup"],
    finalProject: "Criar um plano pessoal de segurança digital com senhas, recuperação, backup, permissões e checklist contra golpes.",
  },
  {
    id: "produtividade-estudos-carreira",
    title: "Produtividade para Estudos e Carreira",
    subtitle: "Organize rotina, tarefas, metas, estudos, revisões, arquivos e planejamento semanal de forma simples e aplicável.",
    category: "Produtividade",
    level: "iniciante",
    duration: "28h",
    price: "R$ 29,90",
    hero: "📚",
    outcome: "Criar uma rotina organizada para estudar, trabalhar melhor e cumprir tarefas sem depender de motivação o tempo todo.",
    modules: [
      {
        title: "Organização pessoal",
        lessons: [
          lesson("Mapa da bagunça", "Identifique tarefas, prazos, materiais e compromissos que estão espalhados.", "Anote tudo que você precisa resolver nesta semana."),
          lesson("Prioridades", "Separe importante, urgente e adiável para não tentar fazer tudo ao mesmo tempo.", "Classifique suas tarefas em 3 grupos."),
          lesson("Rotina realista", "Monte uma rotina possível, com horários, pausas e margem para imprevistos.", "Crie uma rotina de segunda a sexta."),
        ],
      },
      {
        title: "Estudo eficiente",
        lessons: [
          lesson("Pomodoro e foco", "Como estudar em blocos curtos, com pausas e objetivo definido.", "Faça um ciclo de 25 minutos e anote o resultado."),
          lesson("Revisão inteligente", "Resumo, perguntas, cartões e revisão espaçada.", "Transforme uma aula em 5 perguntas de revisão."),
          lesson("Preparação para prova", "Como distribuir conteúdo, treinar e revisar sem deixar tudo para a última hora.", "Monte um plano de 7 dias para uma prova."),
        ],
      },
      {
        title: "Ferramentas de produtividade",
        lessons: [
          lesson("Agenda e lembretes", "Use calendário e notificações para não depender só da memória.", "Cadastre 5 tarefas com data e lembrete."),
          lesson("Listas e quadro de tarefas", "Organize tarefas em fazer, fazendo e feito.", "Monte um quadro simples de tarefas da semana."),
          lesson("Organização de arquivos", "Padrão de nomes, pastas e arquivos importantes.", "Renomeie arquivos usando data, tema e versão."),
        ],
      },
      {
        title: "Plano final",
        lessons: [
          lesson("Sistema semanal", "Junte rotina, agenda, lista e revisão em um sistema simples.", "Monte seu sistema semanal completo."),
          lesson("Ajuste e melhoria", "Como revisar a rotina sem desistir quando um dia dá errado.", "Escreva o que funcionou e o que precisa mudar."),
        ],
      },
    ],
    checklist: ["Tenho rotina semanal", "Uso prioridades", "Sei estudar em blocos", "Tenho sistema de revisão", "Organizo arquivos e tarefas"],
    finalProject: "Criar um sistema semanal com rotina, tarefas, agenda, plano de estudos e revisão.",
  },
  {
    id: "trabalhos-escolares-academicos",
    title: "Trabalhos Escolares e Acadêmicos",
    subtitle: "Aprenda estrutura, pesquisa, escrita, slides, referências e apresentação para entregar trabalhos mais completos.",
    category: "Acadêmico",
    level: "iniciante",
    duration: "35h",
    price: "R$ 34,90",
    hero: "🎓",
    outcome: "Criar trabalhos organizados com pesquisa, estrutura, escrita clara, slides e apresentação final.",
    modules: [
      {
        title: "Estrutura do trabalho",
        lessons: [
          lesson("Tema e objetivo", "Defina o que o trabalho precisa responder e evite fugir do assunto.", "Escreva tema, objetivo e 3 perguntas principais."),
          lesson("Introdução, desenvolvimento e conclusão", "Entenda o papel de cada parte do trabalho.", "Monte o esqueleto de um trabalho com 5 seções."),
          lesson("Capa e organização", "Crie capa, títulos, sumário simples e formatação limpa.", "Crie uma capa e organize os tópicos principais."),
        ],
      },
      {
        title: "Pesquisa e escrita",
        lessons: [
          lesson("Pesquisa confiável", "Como comparar fontes e evitar copiar qualquer coisa da internet.", "Liste 3 fontes e explique por que parecem confiáveis."),
          lesson("Resumo e explicação", "Transforme pesquisa em texto próprio com clareza.", "Escreva um resumo de 10 linhas com suas palavras."),
          lesson("Referências simples", "Como registrar de onde veio a informação.", "Crie uma lista de referências usadas no trabalho."),
        ],
      },
      {
        title: "Slides e apresentação",
        lessons: [
          lesson("Slides do trabalho", "Transforme texto em tópicos curtos e visuais organizados.", "Monte 6 slides do seu trabalho."),
          lesson("Roteiro de fala", "Prepare o que dizer em cada slide sem ler tudo.", "Escreva notas de fala para cada slide."),
          lesson("Treino final", "Controle tempo, clareza e divisão entre participantes.", "Treine a apresentação e marque o tempo."),
        ],
      },
      {
        title: "Entrega final",
        lessons: [
          lesson("Revisão do material", "Revise erros, organização, nomes de arquivos e requisitos do professor.", "Use uma checklist para revisar o trabalho."),
          lesson("Apresentação final", "Prepare entrega em PDF, slides e fala final.", "Finalize o pacote do trabalho."),
        ],
      },
    ],
    checklist: ["Tenho tema e objetivo", "Pesquisei fontes confiáveis", "Escrevi com estrutura", "Criei slides", "Treinei a apresentação"],
    finalProject: "Criar um trabalho completo com capa, texto estruturado, referências, slides e roteiro de apresentação.",
  },
  {
    id: "financeiro-precificacao-servicos",
    title: "Precificação e Finanças para Serviços",
    subtitle: "Aprenda controle de gastos, lucro, preço, pacotes, orçamento e organização financeira para pequenos serviços digitais.",
    category: "Finanças",
    level: "intermediario",
    duration: "30h",
    price: "R$ 39,90",
    hero: "💰",
    outcome: "Cobrar melhor por serviços simples, controlar ganhos e entender se o trabalho está dando lucro.",
    modules: [
      {
        title: "Base financeira",
        lessons: [
          lesson("Entradas e saídas", "Entenda dinheiro que entra, dinheiro que sai e saldo real.", "Monte uma tabela simples de entradas e gastos."),
          lesson("Custo do tempo", "Seu tempo também tem valor: aprenda a calcular tempo gasto por serviço.", "Calcule quanto tempo você gasta em 3 tipos de serviço."),
          lesson("Lucro básico", "Diferença entre faturamento, custo e lucro.", "Calcule lucro em 3 exemplos simples."),
        ],
      },
      {
        title: "Precificação",
        lessons: [
          lesson("Preço mínimo", "Como definir um valor mínimo para não trabalhar de graça.", "Crie um preço mínimo para arte, slide e documento."),
          lesson("Pacotes de serviço", "Básico, intermediário e completo para facilitar venda.", "Monte 3 pacotes para um serviço seu."),
          lesson("Urgência e revisão", "Como cobrar por prazo apertado e alterações extras.", "Defina regras de revisão e taxa de urgência."),
        ],
      },
      {
        title: "Orçamento e controle",
        lessons: [
          lesson("Orçamento profissional", "Como enviar preço, prazo, condições e forma de pagamento.", "Escreva um orçamento para um cliente fictício."),
          lesson("Registro de pedidos", "Controle cliente, serviço, valor, status e pagamento.", "Monte uma planilha de pedidos."),
          lesson("Metas simples", "Defina meta semanal e mensal realista.", "Crie uma meta de faturamento para 30 dias."),
        ],
      },
      {
        title: "Projeto financeiro",
        lessons: [
          lesson("Tabela de preços final", "Organize preços, pacotes, extras e regras em uma tabela simples.", "Finalize sua tabela de preços."),
          lesson("Plano de controle", "Crie uma rotina semanal para revisar pedidos e dinheiro.", "Monte seu controle financeiro semanal."),
        ],
      },
    ],
    checklist: ["Sei calcular lucro", "Tenho preço mínimo", "Tenho pacotes", "Tenho orçamento padrão", "Tenho controle de pedidos"],
    finalProject: "Criar uma tabela de preços profissional com pacotes, extras, regras de revisão e planilha de controle financeiro.",
  },
  {
    id: "manutencao-celular-digital",
    title: "Organização e Manutenção Digital no Celular",
    subtitle: "Use o celular como ferramenta de estudo e trabalho: arquivos, documentos, backups, apps, produtividade e segurança.",
    category: "Mobile",
    level: "iniciante",
    duration: "24h",
    price: "R$ 24,90",
    hero: "📱",
    outcome: "Transformar o celular em uma ferramenta organizada para estudar, trabalhar, atender clientes e proteger arquivos.",
    modules: [
      {
        title: "Celular organizado",
        lessons: [
          lesson("Arquivos e pastas", "Organize downloads, imagens, documentos e PDFs.", "Crie pastas por categoria no celular."),
          lesson("Apps essenciais", "Escolha aplicativos úteis sem encher o celular de coisa desnecessária.", "Liste seus apps de estudo, trabalho e segurança."),
          lesson("Limpeza digital", "Remova arquivos inúteis, duplicados e bagunça acumulada.", "Faça uma limpeza guiada em fotos ou downloads."),
        ],
      },
      {
        title: "Documentos pelo celular",
        lessons: [
          lesson("Digitalizar documentos", "Use câmera e apps para gerar PDF legível.", "Digitalize um documento fictício ou folha de teste."),
          lesson("Assinar e enviar PDF", "Organize envio de documentos com nome correto e mensagem clara.", "Renomeie um PDF e escreva uma mensagem de envio."),
          lesson("Compartilhamento seguro", "Evite mandar arquivo errado ou expor dados demais.", "Crie uma checklist antes de compartilhar documento."),
        ],
      },
      {
        title: "Produtividade mobile",
        lessons: [
          lesson("Agenda e lembretes", "Use notificações para tarefas, estudos e entregas.", "Cadastre 5 lembretes úteis."),
          lesson("Notas e listas", "Organize ideias, pedidos, senhas não sensíveis e tarefas.", "Crie uma lista de tarefas com prioridades."),
          lesson("Atendimento pelo celular", "Responda pedidos com clareza e registre informações importantes.", "Crie uma mensagem padrão para atendimento."),
        ],
      },
      {
        title: "Projeto final",
        lessons: [
          lesson("Kit celular produtivo", "Monte um sistema com pastas, apps, backup, agenda e mensagens padrão.", "Organize seu celular para estudo/trabalho."),
          lesson("Revisão mensal", "Como manter a organização sem virar bagunça de novo.", "Crie uma rotina de revisão mensal."),
        ],
      },
    ],
    checklist: ["Organizo arquivos", "Digitalizo documentos", "Uso agenda", "Tenho backup", "Tenho mensagens padrão"],
    finalProject: "Organizar o celular com pastas, backup, agenda, documentos modelo e mensagens prontas para estudo/trabalho.",
  },
  {
    id: "tecnico-eletronica",
    title: "Técnico em Eletrônica Básica",
    subtitle: "Introdução profissional a componentes, segurança, ferramentas, circuitos simples e diagnóstico básico para iniciantes.",
    category: "Técnico",
    level: "iniciante",
    duration: "50h",
    price: "R$ 69,90",
    hero: "🔧",
    outcome: "Entender fundamentos de eletrônica básica, identificar componentes e montar raciocínio de diagnóstico com segurança.",
    modules: [
      {
        title: "Segurança e fundamentos",
        lessons: [
          lesson("Cuidados antes de mexer", "Conceitos de segurança, limites para iniciantes e quando não tentar consertar algo sozinho.", "Liste 5 cuidados de segurança antes de qualquer teste."),
          lesson("Tensão, corrente e resistência", "Entenda os conceitos básicos sem matemática pesada.", "Explique tensão, corrente e resistência com suas palavras."),
          lesson("Ferramentas básicas", "Multímetro, fonte, ferro de solda, pinça, lupa e organização da bancada.", "Monte uma lista de ferramentas por prioridade."),
        ],
      },
      {
        title: "Componentes eletrônicos",
        lessons: [
          lesson("Resistores e capacitores", "Função, identificação visual e aplicações comuns.", "Pesquise imagens de resistores e capacitores e anote diferenças."),
          lesson("Diodos e LEDs", "Sentido de condução, polaridade e uso em circuitos simples.", "Desenhe um circuito simples com LED e resistor."),
          lesson("Conectores e placas", "Como observar trilhas, conectores e sinais visuais de problema.", "Analise uma placa em imagem e liste possíveis pontos de atenção."),
        ],
      },
      {
        title: "Medição e diagnóstico básico",
        lessons: [
          lesson("Uso básico do multímetro", "Medição de continuidade, tensão e resistência de forma segura.", "Faça um roteiro de teste de continuidade."),
          lesson("Raciocínio de defeito", "Sintoma, hipótese, teste e conclusão sem trocar peça no chute.", "Monte uma tabela de diagnóstico para aparelho que não liga."),
          lesson("Registro técnico", "Como anotar defeito, testes feitos, resultado e próxima ação.", "Crie um modelo de ficha técnica."),
        ],
      },
      {
        title: "Projeto técnico",
        lessons: [
          lesson("Circuito simples", "Planeje um circuito básico com LED, resistor e fonte adequada.", "Desenhe e explique o funcionamento do circuito."),
          lesson("Relatório final", "Organize objetivo, componentes, cuidados, testes e conclusão.", "Crie um relatório técnico simples do projeto."),
        ],
      },
    ],
    checklist: ["Entendo cuidados de segurança", "Reconheço componentes básicos", "Sei usar raciocínio de diagnóstico", "Crio ficha técnica", "Faço relatório simples"],
    finalProject: "Criar um relatório técnico com circuito simples, lista de componentes, cuidados de segurança, testes e conclusão.",
  },
];

export const cursos: Curso[] = professionalCourses.map((course, index) => ({
  id: index + 1,
  titulo: course.title,
  descricao: course.subtitle,
  preco: course.price,
  aulas: course.modules.reduce((total, modulo) => total + modulo.lessons.length, 0),
  nivel: course.level,
  categoria: course.category,
  tipo: course.free ? "Grátis" : "Pago",
  selo: course.free ? "Essencial" : index < 4 ? "Popular" : "Pro",
  resultado: course.outcome,
  pixCode: chavePixAleatoria,
}));

export const categorias = ["Todos", "Grátis", "Pagos", ...Array.from(new Set(professionalCourses.map((curso) => curso.category)))];

export const trilhas = [
  { nome: "Formação Administrativa", desc: "Informática, atendimento, documentos, organização e rotina profissional.", cursos: ["Assistente Administrativo Digital", "Informática Profissional do Zero", "Pacote Office Profissional"], icon: "🏢" },
  { nome: "Criação e Serviços Digitais", desc: "Design, apresentações, precificação e venda de serviços simples.", cursos: ["Design no Canva Profissional", "Empreendedorismo e Serviços Digitais", "Precificação e Finanças para Serviços"], icon: "🚀" },
  { nome: "Carreira Acadêmica", desc: "Trabalhos, apresentações, produtividade e comunicação.", cursos: ["Trabalhos Escolares e Acadêmicos", "Oratória e Apresentação Profissional", "Produtividade para Estudos e Carreira"], icon: "🎓" },
  { nome: "Segurança e Técnica", desc: "Segurança digital, celular produtivo e introdução técnica.", cursos: ["Segurança Digital para Usuários", "Organização e Manutenção Digital no Celular", "Técnico em Eletrônica Básica"], icon: "🛡️" },
];

export function modulosDoCurso(curso: CourseContent | Curso) {
  if ("modules" in curso) return curso.modules.map((modulo) => modulo.title);
  return [
    "Boas-vindas e plano de estudos",
    `Fundamentos de ${curso.titulo}`,
    "Aulas práticas guiadas",
    "Exercícios profissionais",
    `Projeto final: ${curso.resultado}`,
    "Checklist final e certificado",
  ];
}
