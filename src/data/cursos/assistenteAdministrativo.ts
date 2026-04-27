import { CourseContent, lesson } from "../courseTypes";

export const assistenteAdministrativo: CourseContent = {
  id: "assistente-administrativo-digital",
  title: "Assistente Administrativo Básico",
  subtitle: "Curso simples e direto para aprender organização, documentos, e-mail, planilhas e atendimento básico no dia a dia.",
  category: "Administração",
  level: "iniciante",
  duration: "4h • curso rápido",
  price: "R$ 12,90",
  hero: "🏢",
  outcome: "Aprender o básico para organizar tarefas, responder mensagens com mais profissionalismo e montar controles simples.",
  modules: [
    {
      title: "Rotina administrativa simples",
      lessons: [
        lesson("O que um assistente faz", "Entenda tarefas básicas: organizar informações, atender pessoas, controlar documentos e anotar pedidos.", "Liste 5 tarefas que uma pessoa pode organizar em casa, escola ou pequeno negócio."),
        lesson("Organização de tarefas", "Aprenda a separar o que é urgente, importante e pendente sem complicar.", "Monte uma lista com prioridade alta, média e baixa."),
      ],
    },
    {
      title: "Documentos e mensagens",
      lessons: [
        lesson("Documento básico", "Como criar comunicado, recibo simples ou anotação organizada.", "Crie um comunicado curto com título, data, mensagem e assinatura."),
        lesson("Mensagem profissional", "Como responder cliente, familiar ou contato sem parecer bagunçado.", "Reescreva uma mensagem informal deixando ela mais clara e educada."),
      ],
    },
    {
      title: "Planilhas e controle",
      lessons: [
        lesson("Tabela simples", "Como organizar nome, contato, valor, status e observação.", "Monte uma tabela com 5 registros fictícios."),
        lesson("Controle de pagamentos", "Aprenda a marcar pago, pendente e atrasado.", "Crie uma tabela simples de pagamentos."),
      ],
    },
    {
      title: "Projeto final rápido",
      lessons: [
        lesson("Kit administrativo básico", "Junte mensagem pronta, tabela de clientes e tabela de pagamentos.", "Organize os 3 materiais em uma pasta ou arquivo final."),
      ],
    },
  ],
  checklist: ["Organizo tarefas simples", "Crio documentos básicos", "Respondo mensagens melhor", "Monto tabelas simples", "Tenho um kit administrativo básico"],
  finalProject: "Criar um kit administrativo básico com mensagem pronta, tabela de contatos/pedidos e tabela de pagamentos.",
};
