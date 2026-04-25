import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'landing-page',
    title: 'Landing Page',
    description: 'Página de alta conversão para capturar leads e vender seus produtos ou serviços.',
    price: 997,
    deliveryTime: '7 dias',
    status: 'popular',
    features: [
      'Design personalizado',
      'Responsivo (mobile-first)',
      'SEO otimizado',
      'Integração com WhatsApp',
      '1 revisão inclusa',
      'Entrega com hospedagem'
    ],
    icon: 'layout'
  },
  {
    id: 'website-institucional',
    title: 'Website Institucional',
    description: 'Site completo para apresentar sua empresa com profissionalismo e credibilidade.',
    price: 2497,
    deliveryTime: '15 dias',
    status: 'popular',
    features: [
      'Até 5 páginas',
      'Design exclusivo',
      'Painel administrativo',
      'Blog integrado',
      'Formulário de contato',
      'SSL gratuito',
      '3 revisões inclusas'
    ],
    icon: 'globe'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Loja virtual completa com gestão de produtos, estoque e pagamentos integrados.',
    price: 4997,
    deliveryTime: '30 dias',
    status: 'novo',
    features: [
      'Catálogo ilimitado',
      'Gateway de pagamento',
      'Gestão de estoque',
      'Área do cliente',
      'Cupons e promoções',
      'Integração com correios',
      'Dashboard de vendas',
      '5 revisões inclusas'
    ],
    icon: 'shopping-cart'
  },
  {
    id: 'app-mobile',
    title: 'Aplicativo Mobile',
    description: 'App nativo para iOS e Android com experiência fluida e moderna.',
    price: 9997,
    deliveryTime: '60 dias',
    status: 'disponível',
    features: [
      'iOS e Android',
      'Design UI/UX personalizado',
      'Autenticação de usuários',
      'Notificações push',
      'Publicação nas lojas',
      'Backend incluso',
      'Suporte por 30 dias'
    ],
    icon: 'smartphone'
  },
  {
    id: 'automacao',
    title: 'Automação de Processos',
    description: 'Automatize tarefas repetitivas e ganhe tempo para focar no que importa.',
    price: 1497,
    deliveryTime: '10 dias',
    status: 'novo',
    features: [
      'Análise de processos',
      'Integração com ferramentas',
      'Fluxos automatizados',
      'Relatórios automáticos',
      'Treinamento incluso',
      'Suporte por 15 dias'
    ],
    icon: 'zap'
  },
  {
    id: 'consultoria',
    title: 'Consultoria Tech',
    description: 'Orientação especializada para decisões tecnológicas do seu negócio.',
    price: 497,
    deliveryTime: '1 sessão',
    status: 'disponível',
    features: [
      '1 hora de consultoria',
      'Análise personalizada',
      'Recomendações práticas',
      'Material de apoio',
      'Gravação da sessão'
    ],
    icon: 'message-circle'
  }
];
