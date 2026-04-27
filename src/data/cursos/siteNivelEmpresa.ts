import { CourseContent, lesson } from "../courseTypes";

export const siteNivelEmpresa: CourseContent = {
  id: "site-nivel-empresa",
  title: "Criar Site Nível Empresa",
  subtitle: "Aprenda a planejar, estruturar, desenhar, construir e entregar sites com aparência profissional, foco em confiança, conversão e experiência no celular.",
  category: "Tecnologia",
  level: "intermediario",
  duration: "10 semanas • 60h",
  price: "R$ 59,90",
  hero: "🏢",
  outcome: "Criar sites com estrutura profissional, visual limpo, boa apresentação, formulário, copy clara, versão mobile e checklist de entrega para cliente ou projeto próprio.",
  modules: [
    {
      title: "Módulo 1 — Mentalidade de site profissional",
      lessons: [
        lesson("O que separa site amador de site profissional", "Entenda que site nível empresa não é só bonito: precisa ter objetivo, hierarquia, confiança, velocidade, mobile e chamada para ação.", "Analise 3 sites e liste sinais de profissionalismo e sinais de amadorismo."),
        lesson("Objetivo do site", "Aprenda a definir se o site existe para vender, captar contato, apresentar empresa, divulgar portfólio ou explicar um serviço.", "Escolha um negócio fictício e escreva o objetivo principal do site em uma frase."),
        lesson("Público, dor e promessa realista", "Defina para quem o site fala, qual problema resolve e qual promessa pode fazer sem exagero ou mentira.", "Crie uma descrição de público-alvo com dor, desejo e benefício principal."),
      ],
    },
    {
      title: "Módulo 2 — Estrutura de página empresarial",
      lessons: [
        lesson("Primeira dobra forte", "A primeira parte do site precisa explicar o que é, para quem é, por que importa e qual ação tomar.", "Crie uma primeira dobra com título, subtítulo, botão e benefício principal."),
        lesson("Seções essenciais", "Aprenda a montar blocos como benefícios, serviços, processo, prova, FAQ, contato e rodapé.", "Desenhe a ordem das seções de uma landing page empresarial."),
        lesson("Navegação e rodapé", "Menus, links, contato, políticas, redes e informações importantes precisam estar fáceis de encontrar.", "Monte um menu e um rodapé para uma empresa fictícia."),
      ],
    },
    {
      title: "Módulo 3 — Design visual premium",
      lessons: [
        lesson("Hierarquia visual", "Aprenda a guiar o olho do usuário usando tamanho, peso, contraste, espaço e repetição.", "Reorganize uma seção bagunçada priorizando título, texto e botão."),
        lesson("Cores e identidade", "Escolha cores com intenção: fundo, texto, contraste, destaque e consistência visual.", "Crie uma paleta com fundo, texto, cor principal, cor secundária e alerta."),
        lesson("Tipografia e espaçamento", "Fontes, tamanho, altura de linha e respiro visual deixam o site mais caro e fácil de ler.", "Defina regras de fonte para título, subtítulo, texto e botão."),
        lesson("Cards, sombras e bordas", "Use componentes visuais com equilíbrio para passar organização sem poluir a tela.", "Crie um padrão de card para serviços, benefícios e planos."),
      ],
    },
    {
      title: "Módulo 4 — Copy e conteúdo que vende sem mentir",
      lessons: [
        lesson("Título claro", "Um bom título explica valor sem promessa falsa. Clareza vende mais que frase exagerada.", "Escreva 5 títulos para uma página de serviço e escolha o mais claro."),
        lesson("Benefícios e funcionalidades", "Aprenda a separar o que o serviço tem do que o cliente ganha com isso.", "Transforme 5 funcionalidades em benefícios reais."),
        lesson("Prova sem inventar número", "Use prova honesta: portfólio, processo, amostra, antes/depois, checklist, metodologia e demonstração.", "Crie uma seção de confiança sem usar número falso de clientes."),
        lesson("Chamada para ação", "Botões precisam dizer exatamente o próximo passo: pedir orçamento, enviar mensagem, comprar ou ver planos.", "Crie 5 botões para objetivos diferentes."),
      ],
    },
    {
      title: "Módulo 5 — Construção do site",
      lessons: [
        lesson("HTML semântico", "Estruture a página com header, main, section, article, footer, títulos corretos e links organizados.", "Monte o esqueleto HTML de uma landing page de empresa."),
        lesson("CSS responsivo", "Crie layout que funciona em celular, tablet e computador usando grid, flex e limites de largura.", "Faça um plano de responsividade para hero, cards e formulário."),
        lesson("Componentes reutilizáveis", "Crie padrões para botão, card, seção, título, input e navbar para acelerar projetos.", "Liste os componentes necessários para construir 3 páginas diferentes."),
        lesson("Microinterações", "Animações leves em hover, foco e transição passam cuidado, mas não podem atrapalhar.", "Defina 5 microinterações discretas para botões e cards."),
      ],
    },
    {
      title: "Módulo 6 — Formulário, contato e confiança",
      lessons: [
        lesson("Formulário profissional", "Campos certos reduzem atrito: nome, contato, serviço, mensagem e consentimento quando necessário.", "Crie um formulário de orçamento com campos obrigatórios e opcionais."),
        lesson("Mensagens de sucesso e erro", "O usuário precisa saber se enviou, se faltou informação ou se algo falhou.", "Escreva mensagens para sucesso, erro e campo obrigatório."),
        lesson("Segurança e privacidade básica", "Evite pedir dados demais, explique contato e cuide para não expor informações sensíveis.", "Revise um formulário e remova campos desnecessários."),
      ],
    },
    {
      title: "Módulo 7 — Performance, SEO e revisão",
      lessons: [
        lesson("Performance básica", "Imagens pesadas, scripts demais e layout bagunçado deixam o site lento e ruim no celular.", "Crie uma checklist para reduzir peso de imagens e testar carregamento."),
        lesson("SEO essencial", "Título, descrição, headings, textos claros e links ajudam o site a ser entendido por buscadores e pessoas.", "Escreva title, description e H1 para uma página empresarial."),
        lesson("Checklist de QA", "Antes de entregar, revise links, botões, mobile, formulário, textos, erros visuais e acessibilidade básica.", "Monte uma checklist final com 20 itens para testar um site."),
      ],
    },
    {
      title: "Módulo 8 — Entrega para cliente ou portfólio",
      lessons: [
        lesson("Apresentação do projeto", "Explique as escolhas de layout, seções, conteúdo e objetivos do site com linguagem simples.", "Crie uma apresentação de 5 tópicos para mostrar o site final."),
        lesson("Pacote de entrega", "Organize arquivos, links, instruções, credenciais não sensíveis e próximos passos.", "Monte um pacote de entrega com link, checklist e orientações."),
        lesson("Proposta comercial", "Aprenda a transformar o site em serviço: escopo, prazo, revisões, preço e manutenção.", "Crie uma proposta simples de criação de site para uma empresa fictícia."),
      ],
    },
  ],
  checklist: [
    "Sei planejar objetivo e público do site",
    "Monto estrutura de landing page empresarial",
    "Uso hierarquia visual e identidade consistente",
    "Escrevo copy clara sem promessa falsa",
    "Crio layout responsivo",
    "Faço formulário com estados de sucesso e erro",
    "Reviso performance, SEO e mobile",
    "Entrego site com proposta e checklist profissional",
  ],
  finalProject: "Criar uma landing page nível empresa para um negócio fictício ou real, com primeira dobra, seções de valor, visual responsivo, formulário, checklist de QA, proposta comercial e apresentação final.",
};
