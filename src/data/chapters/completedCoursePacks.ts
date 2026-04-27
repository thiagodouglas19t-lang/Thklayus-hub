import { CourseChapterPack } from "../courseChapterTypes";
import { lesson } from "../courseTypes";

const pack = (courseId: string, chapters: CourseChapterPack["chapters"]): CourseChapterPack => ({
  courseId,
  chapters: chapters.sort((a, b) => a.order - b.order),
});

export const informaticaProfissionalChapters = pack("informatica-profissional", [
  {
    id: "info-cap-1",
    title: "Organizando seu ambiente digital",
    subtitle: "Aprenda a deixar arquivos, pastas e documentos fáceis de encontrar.",
    order: 1,
    workplaceScenario: "Você precisa entregar um trabalho, mas seus arquivos estão misturados entre downloads, imagens e documentos sem nome correto.",
    chapterDeliverable: "Criar uma estrutura de pastas organizada com nomes profissionais",
    successCriteria: ["Pastas separadas por tema", "Arquivos com nomes claros", "Documento final salvo em PDF", "Nada importante perdido em Downloads"],
    lessons: [
      lesson("Pastas que fazem sentido", "Organize seus arquivos por finalidade: estudos, documentos, imagens, projetos e entregas. Isso evita perder tempo procurando coisas simples.", "Crie 4 pastas principais e mova pelo menos 5 arquivos para o lugar certo."),
      lesson("Nome de arquivo profissional", "Use nomes com data, tema e versão. Exemplo: 2026-04-trabalho-historia-v1.pdf.", "Renomeie 5 arquivos usando um padrão limpo e fácil de entender."),
      lesson("PDF e entrega", "Aprenda a salvar documentos em PDF para enviar sem desconfigurar e parecer mais profissional.", "Crie um documento simples e exporte em PDF com nome correto."),
    ],
  },
  {
    id: "info-cap-2",
    title: "Internet, e-mail e segurança básica",
    subtitle: "Use navegador, pesquisa, e-mail e contas com mais segurança.",
    order: 2,
    workplaceScenario: "Você precisa pesquisar um tema, enviar um arquivo e proteger sua conta para não perder acesso.",
    chapterDeliverable: "Enviar um e-mail profissional com anexo e checklist de segurança",
    successCriteria: ["Pesquisa feita em fontes melhores", "E-mail com assunto claro", "Arquivo anexado corretamente", "Checklist de senha e recuperação pronto"],
    lessons: [
      lesson("Pesquisa sem cair em qualquer coisa", "Compare fontes, veja data, procure sites confiáveis e evite copiar sem entender.", "Pesquise um tema e salve 3 links úteis com uma frase explicando cada um."),
      lesson("E-mail profissional", "Um bom e-mail tem assunto, saudação, mensagem objetiva, anexo certo e encerramento educado.", "Escreva um e-mail enviando um trabalho para um professor ou cliente fictício."),
      lesson("Conta protegida", "Senha forte, recuperação atualizada e verificação em duas etapas reduzem muito o risco de perder conta.", "Monte uma checklist com 5 cuidados para suas contas principais."),
    ],
  },
]);

export const apisNaPraticaChapters = pack("apis-na-pratica", [
  {
    id: "apis-cap-1",
    title: "Entendendo a API antes de codar",
    subtitle: "Aprenda a olhar endpoint, método, JSON e erro sem se perder.",
    order: 1,
    workplaceScenario: "Você recebeu uma API para conectar no app, mas não sabe se ela lista dados, cria registros ou precisa de token.",
    chapterDeliverable: "Mapa da API com endpoint, método, resposta esperada e erros comuns",
    successCriteria: ["Endpoint identificado", "Método HTTP correto", "Campos do JSON entendidos", "Erros 400/401/404/500 explicados"],
    lessons: [
      lesson("API é contrato", "Seu app pede algo e a API responde com dados ou erro. Antes de programar, você precisa entender esse contrato.", "Escolha uma API fictícia e escreva o que o app pede e o que deve receber."),
      lesson("JSON sem medo", "Leia objetos e listas como informação organizada: id, título, preço, status, usuário e data.", "Crie um JSON de curso com id, nome, preço, aulas e status."),
      lesson("Status code manda mensagem", "200 é sucesso, 201 criou, 400 pedido errado, 401 sem autorização, 404 não encontrado e 500 erro interno.", "Faça uma tabela dizendo o que mostrar para o usuário em cada status."),
    ],
  },
  {
    id: "apis-cap-2",
    title: "Integração segura no app",
    subtitle: "Conecte dados sem vazar chave e sem quebrar a tela quando der erro.",
    order: 2,
    workplaceScenario: "Seu app precisa buscar cursos em uma API, mostrar carregando, tratar erro e proteger tokens secretos.",
    chapterDeliverable: "Plano de provider com loading, erro, dados normalizados e variáveis de ambiente",
    successCriteria: ["Provider separado da tela", "Loading e erro definidos", "Chaves secretas fora do front-end", "Formato final dos dados padronizado"],
    lessons: [
      lesson("Provider separado", "Coloque a lógica da API em um arquivo próprio. Assim a tela só mostra dados e você troca a API sem quebrar tudo.", "Desenhe os arquivos: provider, types, normalizer e tela de cards."),
      lesson("Loading, erro e vazio", "Tela profissional não fica travada. Ela mostra carregando, mensagem de erro ou estado sem resultados.", "Escreva as 3 mensagens que seu app mostraria nesses casos."),
      lesson("Chaves e segurança", "Chave pública pode ir no front quando o serviço permite. Chave secreta precisa ficar no servidor, Edge Function ou backend.", "Liste quais variáveis são públicas e quais são secretas em um projeto real."),
    ],
  },
]);

export const siteNivelEmpresaChapters = pack("site-nivel-empresa", [
  {
    id: "site-cap-1",
    title: "Planejamento de site que vende confiança",
    subtitle: "Antes do visual bonito, defina objetivo, público, oferta e seções.",
    order: 1,
    workplaceScenario: "Um cliente quer um site bonito, mas não sabe explicar o que vende, para quem vende e qual ação espera do visitante.",
    chapterDeliverable: "Briefing completo de site com objetivo, público, seções e chamada para ação",
    successCriteria: ["Objetivo claro", "Público definido", "Seções principais listadas", "CTA principal escrito"],
    lessons: [
      lesson("Site sem objetivo vira enfeite", "Todo site precisa levar a uma ação: pedir orçamento, comprar, chamar no suporte, baixar material ou conhecer serviços.", "Escolha um negócio fictício e defina o objetivo principal do site."),
      lesson("Seções essenciais", "Home, benefícios, serviços/produtos, prova de confiança, dúvidas e contato formam uma base forte.", "Liste as seções de uma landing page de venda simples."),
      lesson("Texto que não enrola", "Explique o que é, para quem é e qual resultado entrega em frases curtas.", "Escreva título, subtítulo e botão principal para o site."),
    ],
  },
  {
    id: "site-cap-2",
    title: "Entrega profissional e revisão",
    subtitle: "Transforme o site em algo apresentável, responsivo e pronto para divulgar.",
    order: 2,
    workplaceScenario: "O site está quase pronto, mas precisa funcionar no celular, carregar bem e passar confiança antes de publicar.",
    chapterDeliverable: "Checklist de publicação com revisão visual, mobile, links e formulário",
    successCriteria: ["Layout revisado no celular", "Links funcionando", "Contato visível", "Textos sem erros básicos", "Página pronta para enviar"],
    lessons: [
      lesson("Mobile primeiro", "A maioria das pessoas abre pelo celular. Se no celular estiver ruim, o site perde venda e confiança.", "Revise uma página no celular e anote 5 ajustes necessários."),
      lesson("Confiança visual", "Espaçamento, contraste, botão claro, prova social e texto direto deixam o site menos suspeito.", "Melhore uma seção adicionando benefício, botão e prova de confiança."),
      lesson("Publicação sem vergonha", "Antes de divulgar, teste links, formulário, imagens, ortografia e velocidade básica.", "Monte uma checklist final com tudo que precisa testar antes do envio."),
    ],
  },
]);

export const iaFerramentasPromptsChapters = pack("ia-ferramentas-prompts", [
  {
    id: "ia-prompts-cap-1",
    title: "Prompt profissional de verdade",
    subtitle: "Saia do pedido genérico e aprenda a dar contexto, objetivo e formato.",
    order: 1,
    workplaceScenario: "Você precisa usar IA para criar conteúdo, organizar ideias ou revisar materiais, mas respostas genéricas não ajudam.",
    chapterDeliverable: "Biblioteca com 10 prompts profissionais reutilizáveis",
    successCriteria: ["Prompt com contexto", "Objetivo definido", "Formato de saída claro", "Critério de qualidade incluído"],
    lessons: [
      lesson("A fórmula do prompt bom", "Use papel, contexto, tarefa, formato, tom e critério. Isso reduz resposta fraca e aumenta controle.", "Reescreva um prompt simples usando esses 6 elementos."),
      lesson("Prompts para estudo e trabalho", "Crie comandos para resumir, explicar, revisar, transformar em slides e montar plano de ação.", "Crie 5 prompts para tarefas escolares ou profissionais."),
      lesson("Revisão humana obrigatória", "IA ajuda, mas pode errar. Você precisa checar fatos, tom, dados pessoais e qualidade final.", "Crie uma checklist para revisar qualquer resposta de IA antes de usar."),
    ],
  },
  {
    id: "ia-prompts-cap-2",
    title: "Ferramentas e fluxo de produção",
    subtitle: "Use IA em etapas: ideia, rascunho, revisão, design e entrega.",
    order: 2,
    workplaceScenario: "Você quer produzir um trabalho, arte, apresentação ou proposta usando IA sem virar bagunça.",
    chapterDeliverable: "Fluxo de produção com IA para um serviço digital simples",
    successCriteria: ["Etapas separadas", "Ferramenta certa para cada tarefa", "Entrega revisada", "Modelo reutilizável criado"],
    lessons: [
      lesson("Não peça tudo de uma vez", "Divida em etapas: entender, planejar, criar, revisar e finalizar. O resultado fica melhor.", "Monte um fluxo de 5 etapas para criar uma apresentação com IA."),
      lesson("IA para atendimento", "Crie respostas padrão para dúvidas, pedidos, orçamento, entrega e pós-venda.", "Escreva 5 mensagens de atendimento com tom profissional."),
      lesson("Kit reutilizável", "Um bom dev/criador guarda modelos para acelerar trabalhos futuros.", "Junte seus melhores prompts em categorias e dê nomes claros."),
    ],
  },
]);

export const desenvolvedorWebsitesChapters = pack("desenvolvedor-websites", [
  {
    id: "websites-cap-1",
    title: "Primeiro site profissional",
    subtitle: "Planeje e estruture uma página real com HTML sem bagunça.",
    order: 1,
    workplaceScenario: "Um pequeno negócio precisa de uma página simples com apresentação, serviços e contato.",
    chapterDeliverable: "Estrutura HTML de landing page com header, seções, CTA e formulário",
    successCriteria: ["HTML semântico", "Seções bem nomeadas", "CTA visível", "Formulário básico planejado"],
    lessons: [
      lesson("Estrutura antes de beleza", "Comece com header, main, sections e footer. O visual vem depois da organização.", "Escreva a estrutura de uma landing page com 5 seções."),
      lesson("Conteúdo que guia", "O visitante precisa entender rápido: o que é, benefício, serviço e próximo passo.", "Crie título, subtítulo e 3 benefícios para um site fictício."),
      lesson("Contato simples", "Formulário, botão, e-mail ou WhatsApp precisam ser fáceis de achar.", "Planeje campos de um formulário de orçamento."),
    ],
  },
  {
    id: "websites-cap-2",
    title: "CSS responsivo e entrega",
    subtitle: "Deixe o site bonito no celular e apresentável para portfólio.",
    order: 2,
    workplaceScenario: "A página existe, mas precisa parecer profissional no celular e no computador.",
    chapterDeliverable: "Página responsiva com cards, espaçamento, cores e checklist de publicação",
    successCriteria: ["Layout funciona no celular", "Cards alinhados", "Contraste legível", "Arquivos organizados", "Checklist final feito"],
    lessons: [
      lesson("Visual limpo ganha confiança", "Use poucos estilos bem feitos: espaçamento, fonte legível, cores consistentes e botão destacado.", "Melhore uma seção aplicando hierarquia visual."),
      lesson("Cards e responsividade", "Cards ajudam a mostrar serviços, benefícios e depoimentos. No celular, eles precisam quebrar bem.", "Desenhe uma grade de 3 cards para desktop e mobile."),
      lesson("Portfólio e proposta", "Projeto pronto precisa virar prova. Mostre objetivo, telas, tecnologias e valor entregue.", "Escreva uma mini proposta para vender um site simples."),
    ],
  },
]);

export const desenvolvedorSistemasChapters = pack("desenvolvedor-sistemas", [
  {
    id: "sistemas-cap-1",
    title: "Do problema ao sistema",
    subtitle: "Transforme uma necessidade real em requisitos, telas e dados.",
    order: 1,
    workplaceScenario: "Uma loja pequena controla clientes e pedidos no papel e quer um sistema simples para se organizar.",
    chapterDeliverable: "Documento de requisitos com usuários, funcionalidades, telas e dados principais",
    successCriteria: ["Problema descrito", "Funcionalidades listadas", "Perfis de usuário definidos", "Telas principais planejadas"],
    lessons: [
      lesson("Sistema resolve problema", "Não comece pelo código. Primeiro entenda o processo, quem usa e qual dor será resolvida.", "Descreva um problema que poderia virar sistema em 5 linhas."),
      lesson("Requisitos simples", "Separe o que o sistema precisa fazer: cadastrar, listar, editar, excluir, filtrar e mostrar resumo.", "Liste 8 requisitos para um sistema de pedidos."),
      lesson("Telas e fluxo", "Planeje login, dashboard, cadastro, listagem, detalhe e edição antes de construir.", "Desenhe o fluxo de telas de um sistema simples."),
    ],
  },
  {
    id: "sistemas-cap-2",
    title: "Banco, CRUD e painel",
    subtitle: "Modele dados e pense como o sistema vai operar no dia a dia.",
    order: 2,
    workplaceScenario: "O sistema precisa salvar clientes, produtos e pedidos, além de mostrar status e métricas para o administrador.",
    chapterDeliverable: "Modelo de banco + plano de CRUD + dashboard administrativo",
    successCriteria: ["Tabelas principais definidas", "Campos importantes listados", "CRUD planejado", "Permissões básicas descritas", "Métricas do painel definidas"],
    lessons: [
      lesson("Modelagem básica", "Tabelas guardam dados. Relacionamentos conectam cliente, pedido, produto e pagamento.", "Modele tabelas para clientes, produtos e pedidos."),
      lesson("CRUD profissional", "Criar, listar, editar e remover precisa de validação, confirmação e mensagem clara.", "Escreva o fluxo completo do CRUD de produtos."),
      lesson("Painel administrativo", "Dashboard bom mostra o que importa: vendas, pendências, usuários, pedidos e alertas.", "Defina 5 cards de métricas para o painel."),
    ],
  },
]);

export const segurancaDigitalChapters = pack("seguranca-digital-profissional", [
  {
    id: "seguranca-cap-1",
    title: "Proteção de contas e senhas",
    subtitle: "Evite perder acesso e reduza risco de invasão.",
    order: 1,
    workplaceScenario: "Uma pessoa usa a mesma senha em tudo e não sabe recuperar contas importantes se algo der errado.",
    chapterDeliverable: "Plano de proteção de contas com senha forte, recuperação e 2FA",
    successCriteria: ["Senhas não repetidas", "Recuperação atualizada", "2FA ativado onde possível", "Códigos guardados em local seguro"],
    lessons: [
      lesson("Senha repetida é risco", "Se uma senha vaza, outras contas podem cair. O ideal é ter senhas diferentes e fortes.", "Liste suas contas principais e marque quais precisam de senha melhor."),
      lesson("Recuperação salva vida", "E-mail e telefone de recuperação precisam estar atualizados para você não perder conta.", "Crie uma checklist de recuperação para suas contas importantes."),
      lesson("2FA sem complicar", "A verificação em duas etapas adiciona uma barreira mesmo se alguém descobrir sua senha.", "Escolha 3 contas para ativar ou revisar o 2FA."),
    ],
  },
  {
    id: "seguranca-cap-2",
    title: "Golpes, links e privacidade",
    subtitle: "Aprenda a desconfiar do jeito certo antes de clicar ou enviar dados.",
    order: 2,
    workplaceScenario: "Você recebe uma mensagem prometendo prêmio, desconto ou urgência e precisa decidir se é confiável.",
    chapterDeliverable: "Checklist anti-golpe para links, compras, perfis e mensagens suspeitas",
    successCriteria: ["Sinais de golpe reconhecidos", "Links analisados antes do clique", "Dados pessoais protegidos", "Permissões do celular revisadas"],
    lessons: [
      lesson("Urgência falsa", "Golpes usam pressa, medo ou promessa grande para você agir sem pensar.", "Analise uma mensagem fictícia e marque 5 sinais suspeitos."),
      lesson("Compra online com calma", "Verifique loja, reputação, domínio, preço absurdo, forma de pagamento e avaliações.", "Monte uma checklist antes de comprar em uma loja nova."),
      lesson("Privacidade no celular", "Apps pedem permissões que nem sempre precisam. Revise câmera, microfone, localização e arquivos.", "Revise permissões de 3 aplicativos e anote o que removeria."),
    ],
  },
]);

export const produtividadeChapters = pack("produtividade-estudos-carreira", [
  {
    id: "produtividade-cap-1",
    title: "Rotina realista",
    subtitle: "Organize tarefas sem montar um plano impossível de seguir.",
    order: 1,
    workplaceScenario: "Você tem estudos, tarefas, arquivos e compromissos espalhados, mas tenta resolver tudo na cabeça.",
    chapterDeliverable: "Plano semanal com prioridades, horários e tarefas reais",
    successCriteria: ["Tarefas anotadas", "Prioridades separadas", "Horários possíveis", "Pausas incluídas", "Revisão semanal marcada"],
    lessons: [
      lesson("Tira da cabeça", "A cabeça é ruim para guardar tarefa. Anote tudo antes de tentar organizar.", "Liste tudo que você precisa resolver nesta semana."),
      lesson("Prioridade de verdade", "Nem tudo é urgente. Separe importante, urgente e adiável para parar de correr em círculo.", "Classifique sua lista em 3 grupos."),
      lesson("Rotina possível", "Plano bom cabe na vida real, com pausas e margem para imprevisto.", "Monte uma rotina de segunda a sexta com blocos de foco."),
    ],
  },
  {
    id: "produtividade-cap-2",
    title: "Estudo e carreira com sistema",
    subtitle: "Use revisão, agenda e arquivos organizados para evoluir com constância.",
    order: 2,
    workplaceScenario: "Você quer estudar melhor e se preparar para oportunidades, mas perde materiais e esquece revisões.",
    chapterDeliverable: "Sistema simples de estudo com agenda, revisão e pastas organizadas",
    successCriteria: ["Agenda com lembretes", "Revisões planejadas", "Pastas organizadas", "Quadro de tarefas criado", "Acompanhamento semanal feito"],
    lessons: [
      lesson("Foco em blocos", "Estudar por blocos curtos com objetivo definido costuma funcionar melhor que tentar estudar sem direção.", "Faça um bloco de 25 minutos e anote o que conseguiu concluir."),
      lesson("Revisão inteligente", "Resumo sozinho pode enganar. Perguntas, cartões e repetição ajudam a lembrar de verdade.", "Transforme uma aula em 5 perguntas de revisão."),
      lesson("Sistema semanal", "Junte agenda, lista de tarefas, revisão e arquivos em um processo que você repete toda semana.", "Monte seu quadro: fazer, fazendo, revisar e concluído."),
    ],
  },
]);

export const completedCoursePacks: CourseChapterPack[] = [
  informaticaProfissionalChapters,
  apisNaPraticaChapters,
  siteNivelEmpresaChapters,
  iaFerramentasPromptsChapters,
  desenvolvedorWebsitesChapters,
  desenvolvedorSistemasChapters,
  segurancaDigitalChapters,
  produtividadeChapters,
];
