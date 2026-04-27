import { CourseChapter } from "../../courseChapterTypes";
import { lesson } from "../../courseTypes";

export const atendimentoClienteChapter1: CourseChapter = {
  id: "atendimento-cap-1",
  title: "Primeiro Atendimento Real",
  subtitle: "Transforme mensagem bagunçada em atendimento profissional",
  order: 1,
  workplaceScenario: "Um cliente mandou uma mensagem confusa reclamando que não recebeu retorno. Ele está impaciente e você precisa responder sem discutir, coletar informações e organizar o próximo passo. Esse tipo de situação acontece muito em suporte, vendas, pedidos, serviços digitais e atendimento por WhatsApp.",
  chapterDeliverable: "Criar um atendimento completo com saudação, acolhimento, perguntas, status e próximo passo",
  successCriteria: [
    "Resposta educada mesmo com cliente irritado",
    "Perguntas objetivas para entender o problema",
    "Status claro do atendimento",
    "Próximo passo informado sem enrolação",
    "Fechamento organizado e profissional"
  ],
  lessons: [
    lesson(
      "Resposta que acalma",
      `No atendimento real, a primeira resposta define o clima da conversa. Se você responde de qualquer jeito, o cliente pode ficar mais irritado. Se você responde com calma, clareza e postura, a conversa começa a voltar para o controle.\n\nAtender bem não significa concordar com tudo. Significa reconhecer que a pessoa tem um problema e mostrar que você vai conduzir aquilo. A pior resposta é discutir: \"mas eu já respondi\", \"você que não viu\", \"não é culpa minha\". Mesmo quando você está certo, esse tipo de resposta parece imatura.\n\nUma boa resposta tem quatro partes: saudação, acolhimento, pedido de informação e próximo passo. Exemplo: \"Olá! Entendo sua preocupação. Vou verificar isso agora para te orientar da forma correta. Pode me enviar o número do pedido e o print da tela onde aparece o problema? Assim que eu conferir, te retorno com a solução ou encaminho para análise.\"\n\nPerceba que essa resposta não promete o que você não sabe. Ela mostra atenção, pede dados e informa o que vai acontecer depois. Isso passa confiança.`,
      `Escreva uma resposta para este cliente:\n\"Já mandei mensagem faz tempo e ninguém resolve nada. Que demora é essa?\"\n\nSua resposta precisa ter:\n1. Saudação\n2. Acolhimento sem discutir\n3. Pedido de informação\n4. Próximo passo\n5. Tom profissional`
    ),
    lesson(
      "Coleta de informações",
      `Sem informação, não existe solução. Um erro comum de atendimento é tentar resolver antes de entender o problema. Isso gera resposta errada, demora e retrabalho.\n\nO atendente bom sabe perguntar pouco, mas perguntar certo. Ele não transforma a conversa em interrogatório. Ele pede dados que realmente ajudam: nome, pedido, serviço, data, print, descrição do erro, forma de pagamento, e-mail usado ou etapa onde o problema apareceu.\n\nExemplo ruim: \"me explica melhor\". Essa pergunta é vaga e faz o cliente ter que pensar demais. Exemplo melhor: \"Você pode me enviar o e-mail usado na compra, o nome do curso e um print da tela onde aparece o problema?\"\n\nPerceba que a pergunta melhor guia o cliente. Quanto mais clara for sua pergunta, mais rápido o atendimento anda.`,
      `Crie 8 perguntas essenciais para abrir um atendimento. Separe em categorias:\n1. Identificação do cliente\n2. Produto ou serviço\n3. Problema relatado\n4. Comprovante ou print\n5. Prazo ou urgência\n6. Próximo passo\n\nDepois escolha as 4 perguntas mais importantes para usar em uma primeira resposta.`
    ),
    lesson(
      "Status do atendimento",
      `Cliente fica mais calmo quando sabe em que etapa está. O problema é que muitos atendimentos ficam soltos: ninguém sabe se está esperando cliente, se está em análise, se já foi resolvido ou se precisa de ajuda do ADM.\n\nStatus serve para organizar. Ele transforma bagunça em processo. Alguns status simples já resolvem muito: recebido, em análise, aguardando cliente, encaminhado para ADM, resolvido e fechado.\n\nExemplo: se o cliente mandou comprovante, o status pode ser \"em análise\". Se faltou print, pode ser \"aguardando cliente\". Se o ADM precisa liberar curso, pode ser \"encaminhado para ADM\". Se o problema foi resolvido, \"resolvido\".\n\nIsso ajuda o cliente, o atendente e o dono do app. Atendimento profissional não é só responder; é registrar o andamento.`,
      `Classifique estes casos com status e escreva uma resposta curta para cada um:\n1. Cliente enviou comprovante\n2. Cliente não mandou print\n3. Curso ainda não foi liberado\n4. ADM precisa conferir pagamento\n5. Problema foi resolvido\n\nUse os status: recebido, em análise, aguardando cliente, encaminhado para ADM, resolvido.`
    ),
    lesson(
      "Fechamento profissional",
      `Fechar atendimento não é só parar de responder. Um fechamento bom confirma que o problema foi resolvido, agradece o contato e deixa uma porta aberta caso a pessoa precise de ajuda depois.\n\nExemplo fraco: \"resolvido\".\nExemplo melhor: \"Pronto, o acesso foi liberado no seu perfil. Pode entrar na área de cursos e atualizar a página. Obrigado por aguardar! Se aparecer qualquer outra dúvida, é só responder por aqui.\"\n\nEsse tipo de fechamento passa cuidado. Também evita que o cliente fique perdido depois da solução. Em produto digital, o pós-atendimento é parte da experiência.\n\nAtendimento bem fechado também ajuda a empresa. Você pode registrar o que aconteceu e evitar o mesmo erro no futuro.`,
      `Crie uma mensagem de fechamento para três situações:\n1. Curso liberado\n2. Pedido entregue\n3. Problema técnico resolvido\n\nCada mensagem precisa ter confirmação, orientação final, agradecimento e abertura para nova dúvida.`
    )
  ]
};
