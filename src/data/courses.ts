import { Course } from '../types';

export const courses: Course[] = [
  {
    id: 'fundamentos-web',
    title: 'Fundamentos do Desenvolvimento Web',
    description: 'Aprenda HTML, CSS e JavaScript do zero. Base sólida para sua carreira em tech.',
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
    level: 'iniciante',
    lessonsCount: 24,
    duration: '8 horas',
    modules: [
      {
        id: 'mod-html',
        title: 'HTML - Estrutura da Web',
        lessons: [
          {
            id: 'html-1',
            title: 'Introdução ao HTML',
            duration: '15min',
            description: 'O que é HTML e como ele funciona na web.'
          },
          {
            id: 'html-2',
            title: 'Tags e Elementos',
            duration: '20min',
            description: 'Conhecendo as principais tags HTML.'
          },
          {
            id: 'html-3',
            title: 'Formulários',
            duration: '25min',
            description: 'Criando formulários interativos.'
          },
          {
            id: 'html-4',
            title: 'Semântica HTML5',
            duration: '20min',
            description: 'Usando tags semânticas para melhor acessibilidade.'
          }
        ]
      },
      {
        id: 'mod-css',
        title: 'CSS - Estilizando a Web',
        lessons: [
          {
            id: 'css-1',
            title: 'Introdução ao CSS',
            duration: '15min',
            description: 'Fundamentos do CSS e seletores.'
          },
          {
            id: 'css-2',
            title: 'Box Model',
            duration: '25min',
            description: 'Entendendo margin, padding e border.'
          },
          {
            id: 'css-3',
            title: 'Flexbox',
            duration: '30min',
            description: 'Layouts flexíveis com Flexbox.'
          },
          {
            id: 'css-4',
            title: 'CSS Grid',
            duration: '30min',
            description: 'Layouts avançados com Grid.'
          }
        ]
      },
      {
        id: 'mod-js',
        title: 'JavaScript - Programação',
        lessons: [
          {
            id: 'js-1',
            title: 'Introdução ao JavaScript',
            duration: '20min',
            description: 'Variáveis, tipos e operadores.'
          },
          {
            id: 'js-2',
            title: 'Funções e Escopo',
            duration: '25min',
            description: 'Criando e usando funções.'
          },
          {
            id: 'js-3',
            title: 'DOM Manipulation',
            duration: '30min',
            description: 'Manipulando elementos da página.'
          },
          {
            id: 'js-4',
            title: 'Eventos',
            duration: '25min',
            description: 'Interatividade com eventos.'
          }
        ]
      }
    ]
  },
  {
    id: 'react-mastery',
    title: 'React do Zero ao Avançado',
    description: 'Domine React, Hooks, Context API e construa aplicações modernas.',
    cover: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    level: 'intermediário',
    lessonsCount: 32,
    duration: '12 horas',
    modules: [
      {
        id: 'react-intro',
        title: 'Introdução ao React',
        lessons: [
          {
            id: 'react-1',
            title: 'O que é React?',
            duration: '15min',
            description: 'Entendendo o ecossistema React.'
          },
          {
            id: 'react-2',
            title: 'Componentes',
            duration: '25min',
            description: 'Criando seus primeiros componentes.'
          },
          {
            id: 'react-3',
            title: 'Props e State',
            duration: '30min',
            description: 'Gerenciando dados nos componentes.'
          },
          {
            id: 'react-4',
            title: 'Eventos no React',
            duration: '20min',
            description: 'Lidando com interações do usuário.'
          }
        ]
      },
      {
        id: 'react-hooks',
        title: 'React Hooks',
        lessons: [
          {
            id: 'hooks-1',
            title: 'useState',
            duration: '25min',
            description: 'Gerenciando estado com useState.'
          },
          {
            id: 'hooks-2',
            title: 'useEffect',
            duration: '30min',
            description: 'Efeitos colaterais e ciclo de vida.'
          },
          {
            id: 'hooks-3',
            title: 'useContext',
            duration: '25min',
            description: 'Compartilhando estado globalmente.'
          },
          {
            id: 'hooks-4',
            title: 'Custom Hooks',
            duration: '30min',
            description: 'Criando seus próprios hooks.'
          }
        ]
      },
      {
        id: 'react-avancado',
        title: 'React Avançado',
        lessons: [
          {
            id: 'adv-1',
            title: 'Performance',
            duration: '35min',
            description: 'Otimizando aplicações React.'
          },
          {
            id: 'adv-2',
            title: 'Testing',
            duration: '40min',
            description: 'Testando componentes React.'
          },
          {
            id: 'adv-3',
            title: 'Patterns',
            duration: '35min',
            description: 'Design patterns em React.'
          },
          {
            id: 'adv-4',
            title: 'Deploy',
            duration: '25min',
            description: 'Publicando sua aplicação.'
          }
        ]
      }
    ]
  },
  {
    id: 'typescript-essencial',
    title: 'TypeScript Essencial',
    description: 'Adicione tipagem ao seu JavaScript e escreva código mais seguro e escalável.',
    cover: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
    level: 'intermediário',
    lessonsCount: 18,
    duration: '6 horas',
    modules: [
      {
        id: 'ts-basics',
        title: 'Fundamentos do TypeScript',
        lessons: [
          {
            id: 'ts-1',
            title: 'Introdução ao TypeScript',
            duration: '15min',
            description: 'Por que usar TypeScript?'
          },
          {
            id: 'ts-2',
            title: 'Tipos Básicos',
            duration: '25min',
            description: 'string, number, boolean e mais.'
          },
          {
            id: 'ts-3',
            title: 'Interfaces',
            duration: '30min',
            description: 'Definindo contratos com interfaces.'
          },
          {
            id: 'ts-4',
            title: 'Types vs Interfaces',
            duration: '20min',
            description: 'Quando usar cada um.'
          }
        ]
      },
      {
        id: 'ts-advanced',
        title: 'TypeScript Avançado',
        lessons: [
          {
            id: 'ts-5',
            title: 'Generics',
            duration: '35min',
            description: 'Tipos genéricos e reutilizáveis.'
          },
          {
            id: 'ts-6',
            title: 'Utility Types',
            duration: '30min',
            description: 'Partial, Required, Pick e mais.'
          },
          {
            id: 'ts-7',
            title: 'Type Guards',
            duration: '25min',
            description: 'Verificação de tipos em runtime.'
          },
          {
            id: 'ts-8',
            title: 'TypeScript com React',
            duration: '40min',
            description: 'Tipando componentes React.'
          }
        ]
      }
    ]
  },
  {
    id: 'design-ui-ux',
    title: 'UI/UX Design para Devs',
    description: 'Princípios de design que todo desenvolvedor deveria conhecer.',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
    level: 'iniciante',
    lessonsCount: 16,
    duration: '5 horas',
    modules: [
      {
        id: 'design-basics',
        title: 'Fundamentos de Design',
        lessons: [
          {
            id: 'design-1',
            title: 'Princípios de Design',
            duration: '20min',
            description: 'Contraste, repetição, alinhamento, proximidade.'
          },
          {
            id: 'design-2',
            title: 'Teoria das Cores',
            duration: '25min',
            description: 'Escolhendo paletas eficientes.'
          },
          {
            id: 'design-3',
            title: 'Tipografia',
            duration: '25min',
            description: 'Hierarquia e legibilidade.'
          },
          {
            id: 'design-4',
            title: 'Espaçamento',
            duration: '20min',
            description: 'Whitespace e breathing room.'
          }
        ]
      },
      {
        id: 'ux-basics',
        title: 'UX Essencial',
        lessons: [
          {
            id: 'ux-1',
            title: 'O que é UX?',
            duration: '15min',
            description: 'User Experience explicado.'
          },
          {
            id: 'ux-2',
            title: 'Pesquisa de Usuário',
            duration: '30min',
            description: 'Entendendo seu público.'
          },
          {
            id: 'ux-3',
            title: 'Wireframes',
            duration: '25min',
            description: 'Prototipação rápida.'
          },
          {
            id: 'ux-4',
            title: 'Usabilidade',
            duration: '25min',
            description: 'Testando e melhorando.'
          }
        ]
      }
    ]
  }
];
