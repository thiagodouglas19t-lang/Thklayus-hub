import { CourseContent, lesson } from "../courseTypes";

export const assistenteAdministrativo: CourseContent = {
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
};
