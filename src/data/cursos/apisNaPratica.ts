import { CourseContent, lesson } from "../courseTypes";

export const apisNaPratica: CourseContent = {
  id: "apis-na-pratica",
  title: "APIs na Prática",
  subtitle: "Aprenda a entender, testar e integrar APIs em sites e apps usando JSON, fetch, tokens, headers, erros, segurança e boas práticas.",
  category: "Tecnologia",
  level: "intermediario",
  duration: "8 semanas • 48h",
  price: "R$ 14,90",
  hero: "🔌",
  outcome: "Conseguir consumir APIs com segurança, entender respostas JSON, tratar erros, proteger chaves e integrar dados reais ou simulados em um app.",
  modules: [
    {
      title: "Módulo 1 — Fundamentos de API",
      lessons: [
        lesson("O que é uma API", "Entenda API como uma ponte entre sistemas: seu app faz uma solicitação e recebe dados ou executa uma ação.", "Explique com suas palavras como um app de clima, pagamento ou login pode usar API."),
        lesson("Cliente, servidor e endpoint", "Aprenda a diferença entre quem pede, quem responde e qual URL representa cada recurso.", "Desenhe o fluxo: usuário clica, app chama endpoint, servidor responde, tela atualiza."),
        lesson("Métodos HTTP", "Entenda GET, POST, PUT/PATCH e DELETE sem decorar: buscar, criar, atualizar e remover.", "Escolha um sistema simples e diga qual método usaria para listar, criar, editar e excluir."),
      ],
    },
    {
      title: "Módulo 2 — JSON, parâmetros e respostas",
      lessons: [
        lesson("JSON na prática", "Aprenda a ler objetos, arrays, strings, números, booleanos e campos aninhados.", "Crie um JSON de produto com nome, preço, categoria, estoque e imagens."),
        lesson("Query params e path params", "Entenda filtros na URL e identificadores no caminho do endpoint.", "Monte exemplos de URL para buscar usuário por ID e filtrar produtos por categoria."),
        lesson("Status codes", "Aprenda os códigos mais comuns: 200, 201, 400, 401, 403, 404 e 500.", "Crie uma tabela explicando o que o app deve mostrar para cada erro comum."),
      ],
    },
    {
      title: "Módulo 3 — Testando APIs",
      lessons: [
        lesson("Teste no navegador", "Entenda quando dá para testar uma API pelo navegador e quando precisa de ferramenta.", "Abra uma API pública simples ou mockada e identifique URL, resposta e campos principais."),
        lesson("Postman ou Insomnia", "Aprenda a organizar requisições, headers, body, ambientes e tokens.", "Crie uma coleção com GET de lista, GET por ID e POST de criação fictícia."),
        lesson("Mock API", "Use dados simulados para construir sem depender de serviço pago ou instável.", "Crie uma resposta mock de cursos com id, título, preço e status."),
      ],
    },
    {
      title: "Módulo 4 — Integração no front-end",
      lessons: [
        lesson("fetch do jeito certo", "Use fetch para chamar uma API, aguardar resposta, converter JSON e atualizar a tela.", "Escreva o roteiro de uma função que busca cursos e mostra loading, sucesso ou erro."),
        lesson("Loading, erro e estado vazio", "Uma integração profissional não quebra quando demora, falha ou retorna lista vazia.", "Planeje três telas: carregando, erro e sem resultados."),
        lesson("Componentes com dados reais", "Transforme resposta da API em cards, tabelas, filtros e detalhes.", "Pegue um JSON de produtos/cursos e desenhe como cada campo vira interface."),
      ],
    },
    {
      title: "Módulo 5 — Autenticação e segurança",
      lessons: [
        lesson("API key, token e headers", "Entenda como enviar credenciais no header e por que não expor chave secreta no front-end.", "Liste quais chaves podem ficar públicas e quais precisam ficar no servidor."),
        lesson("Variáveis de ambiente", "Use .env para separar configuração do código e evitar vazar segredos.", "Crie nomes de variáveis para URL pública, anon key e token secreto."),
        lesson("Proxy e backend", "Aprenda quando chamar direto do front-end e quando usar backend/Edge Function para proteger chave.", "Desenhe um fluxo seguro: app chama função, função chama API externa, app recebe resposta limpa."),
      ],
    },
    {
      title: "Módulo 6 — Integração profissional",
      lessons: [
        lesson("Normalização de dados", "Nem toda API responde no formato que sua tela espera. Aprenda a converter respostas para um padrão do app.", "Crie um formato padrão de oferta/curso e converta 2 respostas diferentes para ele."),
        lesson("Tratamento de limites", "Entenda rate limit, queda de serviço, retry simples e mensagem clara para o usuário.", "Crie um plano do que o app mostra se a API estiver fora do ar."),
        lesson("Logs e debug", "Aprenda a investigar erro sem bagunçar: console, status, payload, headers e mensagem do servidor.", "Monte uma checklist de debug para quando uma API não responde."),
      ],
    },
    {
      title: "Módulo 7 — Projeto final",
      lessons: [
        lesson("API integrada no app", "Planeje uma integração completa usando API real ou mockada com lista, detalhe, loading e erro.", "Escolha um tema: cursos, produtos, viagens, clima, notícias ou pedidos."),
        lesson("Camada de provider", "Organize a integração em arquivo separado para trocar API sem destruir a interface.", "Crie o plano de arquivos: provider, tipos, normalizador e componente de card."),
        lesson("Entrega profissional", "Documente endpoint, método, resposta, erros, variáveis de ambiente e como testar.", "Monte um README curto explicando como sua integração funciona."),
      ],
    },
  ],
  checklist: [
    "Entendo cliente, servidor e endpoint",
    "Sei ler JSON e status code",
    "Testo APIs com ferramenta própria",
    "Uso fetch com loading e erro",
    "Entendo token, header e variável de ambiente",
    "Sei quando proteger chave no backend",
    "Consigo criar uma camada de provider",
    "Documento a integração final",
  ],
  finalProject: "Criar uma integração completa com API real ou mockada, exibindo dados no app com loading, erro, normalização, provider separado e documentação básica.",
};
