export type ServiceCategory = "Site" | "App" | "Suporte" | "Consultoria";

export interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  category: ServiceCategory;
  delivery: string;
  status: "popular" | "novo" | "disponivel";
  features: string[];
  highlight?: boolean;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Criação de Site",
    description: "Site moderno para divulgar seu negócio, serviço ou produto.",
    price: "R$ 150",
    category: "Site",
    delivery: "2 a 5 dias",
    status: "popular",
    highlight: true,
    features: [
      "Design responsivo",
      "Botão direto para WhatsApp",
      "Página inicial premium",
      "Código organizado",
    ],
  },
  {
    id: 2,
    title: "Landing Page",
    description: "Página focada em vender, captar clientes ou apresentar oferta.",
    price: "R$ 100",
    category: "Site",
    delivery: "1 a 3 dias",
    status: "disponivel",
    features: [
      "Seção de oferta",
      "Chamada para ação",
      "Layout rápido",
      "Visual profissional",
    ],
  },
  {
    id: 3,
    title: "App Simples",
    description: "Aplicativo web simples com interface bonita e funcional.",
    price: "R$ 200",
    category: "App",
    delivery: "3 a 7 dias",
    status: "novo",
    features: [
      "Tela inicial",
      "Botões funcionais",
      "Design mobile",
      "Estrutura pronta para crescer",
    ],
  },
  {
    id: 4,
    title: "Correção de Bugs",
    description: "Correção de erros visuais, botões quebrados ou problemas no código.",
    price: "R$ 50",
    category: "Suporte",
    delivery: "Mesmo dia",
    status: "disponivel",
    features: [
      "Análise do erro",
      "Correção no código",
      "Explicação simples",
      "Suporte direto",
    ],
  },
  {
    id: 5,
    title: "Consultoria de Projeto",
    description: "Ajuda para organizar ideia, escolher ferramentas e começar certo.",
    price: "R$ 30",
    category: "Consultoria",
    delivery: "30 a 60 minutos",
    status: "disponivel",
    features: [
      "Análise da ideia",
      "Sugestão de ferramentas",
      "Plano inicial",
      "Orientação prática",
    ],
  },
];
