import { CourseContent, lesson } from "../courseTypes";

export const iaFerramentasPrompts: CourseContent = {
  id: "ia-ferramentas-prompts",
  title: "IA, Ferramentas e Prompts Profissionais",
  subtitle: "Entenda o que cada tipo de IA faz, quando usar cada ferramenta e como criar prompts claros para estudar, vender, criar conteúdo, programar e organizar tarefas.",
  category: "Inteligência Artificial",
  level: "iniciante",
  duration: "4 semanas • 24h",
  price: "R$ 4,90",
  hero: "🧠",
  outcome: "Usar IA com clareza e responsabilidade, escolhendo a ferramenta certa para cada tarefa e criando prompts profissionais com contexto, objetivo, formato e critérios de qualidade.",
  modules: [
    {
      title: "Módulo 1 — Entendendo o que cada IA faz",
      lessons: [
        lesson("IA de texto", "Aprenda quando usar IA para responder dúvidas, resumir, explicar, planejar, revisar textos e criar ideias.", "Liste 10 tarefas do seu dia que uma IA de texto pode ajudar sem fazer tudo por você."),
        lesson("IA de imagem", "Entenda como IA pode ajudar com ideias visuais, logos, artes, referências, banners e conceitos criativos.", "Crie um briefing de imagem com estilo, cores, objetivo e formato."),
        lesson("IA de código", "Entenda como usar IA para estudar programação, revisar erro, explicar código e planejar features sem copiar às cegas.", "Pegue um erro simples e escreva um prompt pedindo explicação e solução passo a passo."),
        lesson("IA de produtividade", "Conheça usos para agenda, listas, planejamento, organização de estudos, processos e atendimento.", "Crie uma rotina semanal usando IA como assistente de organização."),
      ],
    },
    {
      title: "Módulo 2 — Como escolher a ferramenta certa",
      lessons: [
        lesson("Ferramenta certa para cada tarefa", "Nem toda IA serve para tudo. Aprenda a escolher entre texto, imagem, pesquisa, código, automação e organização.", "Monte uma tabela com tarefa, melhor tipo de IA, cuidado necessário e resultado esperado."),
        lesson("Grátis, pago e custo baixo", "Aprenda a avaliar limite gratuito, custo, qualidade, privacidade e necessidade real antes de pagar uma ferramenta.", "Compare 3 ferramentas que você usa ou conhece e diga quando vale ou não pagar."),
        lesson("Cuidados com dados pessoais", "Saiba o que não enviar para IA: senhas, documentos sensíveis, dados de clientes, chaves de API e informações privadas.", "Crie uma checklist de segurança antes de usar IA em um trabalho real."),
      ],
    },
    {
      title: "Módulo 3 — Prompt profissional do jeito certo",
      lessons: [
        lesson("Estrutura de prompt", "Um prompt bom tem papel, contexto, objetivo, formato, restrições e critério de qualidade.", "Crie um prompt com os 6 blocos para pedir uma página de vendas simples."),
        lesson("Contexto e objetivo", "IA responde melhor quando entende situação, público, nível, objetivo e limite do que pode fazer.", "Reescreva um prompt fraco adicionando contexto e objetivo claro."),
        lesson("Formato de saída", "Aprenda a pedir tabela, checklist, passo a passo, JSON, roteiro, e-mail, texto curto ou plano de ação.", "Crie 5 versões do mesmo pedido mudando apenas o formato de saída."),
        lesson("Iteração e melhoria", "Prompt profissional não é uma frase única: você ajusta, pede revisão, compara versões e melhora o resultado.", "Pegue uma resposta de IA e peça 3 melhorias: mais clara, mais curta e mais profissional."),
      ],
    },
    {
      title: "Módulo 4 — Prompts para trabalho, vendas e estudo",
      lessons: [
        lesson("Prompts para estudo", "Use IA para explicar assunto, criar resumo, perguntas, mapas mentais e plano de revisão.", "Crie um prompt para estudar uma matéria difícil com explicação simples e exercícios."),
        lesson("Prompts para vendas", "Crie ofertas, mensagens de atendimento, respostas para dúvidas, descrições e chamadas para ação sem mentir.", "Crie uma sequência de 3 mensagens para vender um curso ou serviço."),
        lesson("Prompts para criação de conteúdo", "Gere ideias de posts, roteiros, legendas, carrosséis e calendário de conteúdo.", "Crie um calendário de 7 dias de conteúdo para divulgar um curso."),
        lesson("Prompts para programação", "Peça explicação de erro, revisão de código, planejamento de componente e checklist de teste.", "Crie um prompt para pedir ajuda em uma integração com API sem expor chaves."),
      ],
    },
    {
      title: "Módulo 5 — Kit final de prompts",
      lessons: [
        lesson("Organizando sua biblioteca", "Aprenda a guardar prompts por categoria para reaproveitar: estudo, venda, conteúdo, programação e atendimento.", "Monte uma pasta ou documento com 20 prompts separados por categoria."),
        lesson("Teste de qualidade", "Um prompt só é bom se o resultado for útil, claro, seguro e revisável.", "Escolha 5 prompts e avalie com nota de 0 a 10 usando critérios claros."),
        lesson("Mini projeto final", "Crie um kit real que você possa usar para estudar, vender, criar conteúdo e programar melhor.", "Entregue um kit com 20 prompts, cada um com objetivo, modelo e exemplo de uso."),
      ],
    },
  ],
  checklist: [
    "Entendo tipos diferentes de IA",
    "Sei escolher ferramenta conforme a tarefa",
    "Crio prompts com contexto, objetivo e formato",
    "Uso IA sem expor dados sensíveis",
    "Crio prompts para estudo, venda, conteúdo e código",
    "Tenho uma biblioteca de prompts reutilizável",
  ],
  finalProject: "Criar um kit profissional com 20 prompts organizados por categoria, incluindo objetivo, modelo, exemplo de uso e checklist de segurança.",
};
