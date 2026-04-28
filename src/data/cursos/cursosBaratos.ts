import type { CourseContent } from "../courseTypes";
import { fullLesson, lesson } from "../courseTypes";

const checklistPadrao = [
  "Aulas curtas e diretas",
  "Exercícios práticos",
  "Projeto final simples",
  "Certificado de conclusão — Curso Livre",
];

export const canvaParaVender: CourseContent = {
  id: "canva-para-vender",
  title: "Canva para Vender Artes Simples",
  subtitle: "Aprenda a criar artes bonitas pelo celular e montar seus primeiros modelos para vender.",
  category: "Design",
  level: "iniciante",
  duration: "4h • 12 aulas",
  price: "R$ 7,90",
  hero: "🎨",
  outcome: "Você aprende a criar posts, convites, banners simples e modelos prontos para oferecer como serviço.",
  modules: [
    {
      title: "Módulo 1 — Começando no Canva",
      lessons: [
        fullLesson(
          "Criando sua conta e entendendo a tela",
          "O Canva é uma ferramenta de criação visual que permite montar artes, apresentações, convites, posts e materiais simples sem precisar ser designer profissional. Nesta aula, o objetivo é você entender a tela inicial, os menus principais e como organizar seus primeiros arquivos. Quando você sabe onde ficam modelos, textos, imagens, elementos e pastas, você perde menos tempo procurando botões e consegue criar com mais segurança. Essa aula serve para quem vai criar artes para si mesmo, para escola, para pequenos negócios ou para vender serviços simples para outras pessoas.",
          "Imagine que uma pessoa te pede uma arte de divulgação para vender bolo no pote. Antes de criar a arte, você precisa abrir o Canva, escolher um tamanho adequado, encontrar elementos como fotos, formas, texto e salvar o trabalho em uma pasta. Se você não souber usar a tela inicial, pode se perder e demorar muito. Se souber, consegue começar o pedido em poucos minutos.",
          [
            "Entre no Canva pelo celular ou computador.",
            "Crie ou acesse sua conta.",
            "Na tela inicial, procure por modelos, elementos, uploads, textos e projetos.",
            "Crie uma pasta chamada Artes para vender.",
            "Abra um design em branco no tamanho de post quadrado.",
            "Adicione um texto simples, uma forma e uma imagem qualquer apenas para testar.",
            "Salve o design dentro da pasta criada."
          ],
          [
            "Criar tudo solto sem organizar em pastas. Evite isso criando uma pasta para cada tipo de serviço ou cliente.",
            "Achar que precisa usar todos os recursos de uma vez. Evite isso dominando primeiro texto, imagem, cor e tamanho.",
            "Começar pelo visual sem entender onde salvar. Evite isso conferindo se o arquivo está guardado no local certo."
          ],
          "Crie uma pasta no Canva chamada Artes para vender e dentro dela crie um post de teste com título, imagem e uma forma decorativa.",
          "Depois desta aula, você deve conseguir abrir o Canva, encontrar os principais menus, criar uma pasta e iniciar uma arte simples sem ficar perdido."
        ),
        fullLesson(
          "Como escolher um modelo sem copiar feio",
          "Modelos prontos ajudam muito, mas usar um modelo sem alterar quase nada deixa a arte com cara de cópia. O jeito correto é usar o modelo como base e mudar elementos importantes: cores, fonte, imagens, textos, espaçamentos e detalhes. Assim você ganha velocidade, mas cria uma peça com identidade própria. Isso é importante quando você vende artes, porque o cliente espera receber algo adaptado para ele, não apenas um template genérico com o nome trocado.",
          "Uma lanchonete pede uma arte de promoção de hambúrguer. Você encontra um modelo bonito no Canva, mas ele usa cores rosas e fonte delicada. Para combinar com lanchonete, você troca para cores mais fortes, coloca foto de hambúrguer, muda o título, ajusta o preço e remove elementos que não fazem sentido. O resultado nasce de um modelo, mas vira uma arte própria.",
          [
            "Pesquise um modelo relacionado ao tema da arte.",
            "Escolha um modelo com boa organização, não apenas bonito.",
            "Troque o título para o assunto real do cliente.",
            "Mude as cores para combinar com o produto ou marca.",
            "Substitua imagens genéricas por imagens melhores ou mais próximas do pedido.",
            "Remova elementos que não ajudam na mensagem.",
            "Compare antes e depois para ver se a arte ficou diferente do modelo original."
          ],
          [
            "Trocar só o nome e entregar o resto igual. Evite isso alterando pelo menos cores, imagens e organização.",
            "Escolher modelo bonito, mas que não combina com o público. Evite isso pensando no cliente antes de escolher.",
            "Usar muitas ideias de modelos diferentes na mesma arte. Evite isso mantendo um estilo principal."
          ],
          "Pegue um modelo pronto no Canva e transforme ele em uma arte de promoção para um produto fictício, mudando cores, texto, imagem e pelo menos três elementos visuais.",
          "Depois desta aula, você deve saber usar templates como ponto de partida sem entregar uma arte com aparência de cópia."
        ),
        fullLesson(
          "Tamanho certo para cada arte",
          "Cada lugar usa um tamanho diferente de imagem. Um post de feed, um story, um status, um convite e um banner não têm o mesmo formato. Quando você escolhe o tamanho errado, a arte pode cortar informação, ficar espremida ou perder qualidade. Saber escolher o tamanho certo evita retrabalho e passa mais profissionalismo. Para começar, você não precisa decorar todos os tamanhos do mundo. Precisa entender que o formato deve combinar com onde a arte será usada.",
          "Se um cliente quer divulgar uma promoção no status do WhatsApp, uma arte quadrada pode ficar pequena e com bordas sobrando. O melhor é usar formato vertical, parecido com story. Se o cliente quer postar no Instagram, o quadrado ou vertical de feed pode funcionar melhor. A mesma promoção pode virar duas versões: uma para feed e outra para story.",
          [
            "Pergunte onde a arte será usada: Instagram, WhatsApp, impressão, apresentação ou banner.",
            "Escolha um formato adequado no Canva.",
            "Para post simples, use formato quadrado.",
            "Para status ou story, use formato vertical.",
            "Não coloque texto importante muito perto das bordas.",
            "Exporte e veja se nada foi cortado.",
            "Quando necessário, crie uma segunda versão em outro tamanho."
          ],
          [
            "Criar tudo em um único tamanho e usar em qualquer lugar. Evite isso adaptando a arte para cada formato.",
            "Colocar preço, telefone ou título perto demais da borda. Evite isso deixando margem de segurança.",
            "Aumentar uma imagem pequena até ela ficar borrada. Evite usando imagens com boa qualidade."
          ],
          "Crie duas versões da mesma arte: uma quadrada para post e uma vertical para status/story.",
          "Depois desta aula, você deve conseguir escolher o tamanho certo da arte de acordo com o local onde ela será publicada."
        ),
      ],
    },
    {
      title: "Módulo 2 — Criando artes que chamam atenção",
      lessons: [
        fullLesson(
          "Hierarquia visual simples",
          "Hierarquia visual é decidir o que a pessoa deve ver primeiro, segundo e terceiro na arte. Uma arte boa não joga todas as informações do mesmo tamanho. O título principal precisa chamar atenção. Depois vem a informação de apoio, como descrição, preço, data ou contato. Isso serve para deixar a comunicação clara. Quando tudo está grande, nada se destaca. Quando tudo está pequeno, ninguém entende rápido.",
          "Em uma arte de promoção, o cliente precisa ver primeiro: Promoção de hoje. Depois precisa ver o produto e o preço. Por último, contato ou endereço. Se o telefone estiver maior que o produto, a arte fica confusa. Se o preço estiver escondido, a pessoa pode ignorar.",
          [
            "Escreva todas as informações da arte.",
            "Escolha a informação mais importante.",
            "Deixe essa informação maior e mais forte.",
            "Coloque as informações secundárias menores.",
            "Use espaçamento para separar blocos.",
            "Olhe a arte de longe ou reduza o zoom.",
            "Confira se dá para entender a mensagem em poucos segundos."
          ],
          [
            "Deixar tudo do mesmo tamanho. Evite isso definindo título, apoio e detalhe.",
            "Colocar informação demais. Evite isso mantendo só o que ajuda a pessoa a decidir.",
            "Destacar o elemento errado. Evite isso pensando no objetivo da arte antes de montar."
          ],
          "Crie uma arte de promoção com título grande, produto/preço em destaque médio e contato menor no rodapé.",
          "Depois desta aula, você deve conseguir organizar textos para que a pessoa entenda a arte rapidamente."
        ),
        fullLesson(
          "Cores e fontes sem bagunça",
          "Cores e fontes criam a aparência da arte. O erro de muitos iniciantes é usar várias cores fortes e muitas fontes diferentes, deixando tudo bagunçado. Para uma arte simples e bonita, use poucas cores e no máximo duas fontes. Uma fonte pode ser usada para título e outra para textos menores. As cores devem combinar com o tema, com o produto ou com a marca do cliente.",
          "Para uma loja de açaí, você pode usar roxo, branco e verde. Para uma barbearia, pode usar preto, branco e dourado. Para uma apresentação escolar, pode usar azul e branco. O segredo é repetir a mesma paleta para a arte parecer planejada.",
          [
            "Escolha uma cor principal.",
            "Escolha uma cor de apoio.",
            "Escolha uma cor neutra para fundo ou texto.",
            "Escolha uma fonte forte para título.",
            "Escolha uma fonte simples para textos menores.",
            "Use as mesmas cores do começo ao fim.",
            "Revise se o texto está fácil de ler."
          ],
          [
            "Usar cinco ou seis cores sem necessidade. Evite ficando em duas ou três cores principais.",
            "Usar fonte bonita mas difícil de ler. Evite priorizando leitura antes de enfeite.",
            "Colocar texto claro em fundo claro. Evite conferindo contraste entre texto e fundo."
          ],
          "Monte uma paleta com 3 cores e crie uma arte usando apenas essa paleta e no máximo duas fontes.",
          "Depois desta aula, você deve conseguir criar artes mais limpas usando cores e fontes com intenção."
        ),
        fullLesson(
          "Como deixar a arte mais limpa",
          "Uma arte limpa não significa vazia. Significa que cada elemento tem uma função. Espaço vazio também faz parte do design, porque ajuda o olho a descansar e melhora a leitura. Quando você coloca imagem, ícone, fundo, borda, sombra, adesivo e muito texto ao mesmo tempo, a arte perde força. Para vender artes simples, aprender a remover excesso é tão importante quanto aprender a adicionar elementos.",
          "Um convite de aniversário precisa ter nome, data, horário, local e tema. Se você coloca dez personagens, três fundos, muitas estrelas e várias fontes, as informações somem. Uma versão mais limpa usa um fundo, uma imagem principal e texto bem organizado.",
          [
            "Olhe a arte pronta e identifique o objetivo dela.",
            "Remova elementos que não ajudam esse objetivo.",
            "Deixe espaços entre título, imagem e informações.",
            "Use alinhamento para organizar os blocos.",
            "Evite repetir elementos decorativos demais.",
            "Confira se o texto principal continua sendo o destaque.",
            "Peça para alguém olhar por 5 segundos e dizer o que entendeu."
          ],
          [
            "Achar que arte boa precisa estar cheia. Evite lembrando que clareza vende mais que enfeite.",
            "Usar decoração para esconder falta de organização. Evite começando pela estrutura do texto.",
            "Não deixar margem. Evite colocando respiro nas bordas e entre elementos."
          ],
          "Pegue uma arte carregada e faça uma versão limpa, removendo elementos desnecessários e melhorando espaçamento.",
          "Depois desta aula, você deve conseguir simplificar uma arte sem deixá-la sem graça."
        ),
      ],
    },
    {
      title: "Módulo 3 — Vendendo seu serviço",
      lessons: [
        fullLesson(
          "Montando pacote barato",
          "Para vender artes, muitas vezes é melhor oferecer pacotes simples do que cobrar cada arte de forma confusa. Pacotes ajudam o cliente a entender o que está comprando e ajudam você a organizar prazo e entrega. Um pacote barato pode ser uma porta de entrada, mas precisa ter limite. Se você prometer muitas alterações por pouco dinheiro, vai trabalhar demais e ganhar pouco. O pacote deve dizer quantidade, tipo de arte, prazo e quantidade de alterações.",
          "Você pode oferecer: Pacote Inicial com 3 artes para status, prazo de 2 dias e 1 alteração simples. Pacote Divulgação com 5 artes para Instagram e WhatsApp. Pacote Completo com 10 artes para o mês. Assim o cliente escolhe com clareza.",
          [
            "Escolha três pacotes: básico, médio e completo.",
            "Defina quantas artes entram em cada um.",
            "Defina o prazo de entrega.",
            "Defina quantas alterações estão inclusas.",
            "Escreva o que não está incluso.",
            "Coloque preço de entrada acessível.",
            "Monte uma imagem ou texto explicando os pacotes."
          ],
          [
            "Prometer alteração ilimitada. Evite colocando limite claro desde o começo.",
            "Cobrar barato demais por muito trabalho. Evite começando pequeno e aumentando conforme melhora.",
            "Não explicar prazo. Evite sempre informando quando entrega."
          ],
          "Crie uma tabela com 3 pacotes de artes, incluindo quantidade, prazo, alterações e preço.",
          "Depois desta aula, você deve conseguir oferecer seus serviços de forma mais clara e organizada."
        ),
        fullLesson(
          "Como mostrar portfólio no WhatsApp",
          "Portfólio é um conjunto de exemplos que mostra o que você sabe fazer. Para vender pelo WhatsApp, você não precisa ter um site profissional no começo. Pode criar algumas artes de exemplo, organizar em uma pasta e enviar quando alguém perguntar. O importante é mostrar variedade e qualidade. Um bom portfólio simples ajuda o cliente a confiar antes de comprar.",
          "Se alguém pergunta se você faz arte para loja de roupas, você pode mandar 3 exemplos: uma promoção, uma novidade e uma arte de contato. Mesmo que sejam fictícias, elas mostram seu estilo e sua capacidade. O cliente entende melhor do que só lendo uma mensagem.",
          [
            "Crie pelo menos 5 artes de exemplo.",
            "Faça exemplos de temas diferentes: comida, loja, evento, serviço e escolar.",
            "Salve as imagens com nomes organizados.",
            "Crie uma pasta no celular para o portfólio.",
            "Escolha as melhores artes, não todas.",
            "Escreva uma mensagem curta para enviar junto.",
            "Atualize o portfólio quando fizer trabalhos melhores."
          ],
          [
            "Mandar muitas imagens de uma vez. Evite enviando só as melhores e perguntando o que o cliente procura.",
            "Mostrar artes com erro de português. Evite revisando antes de usar como exemplo.",
            "Usar trabalhos de outros como se fossem seus. Evite criando modelos próprios ou deixando claro quando é referência."
          ],
          "Crie 5 artes fictícias para temas diferentes e organize em uma pasta chamada Portfólio.",
          "Depois desta aula, você deve ter exemplos prontos para mostrar quando alguém perguntar pelo seu trabalho."
        ),
        fullLesson(
          "Mensagem pronta para oferecer",
          "Uma boa mensagem de venda precisa ser simples, educada e direta. O objetivo não é pressionar a pessoa, mas mostrar que você faz um serviço e pode ajudar. Mensagens muito longas parecem spam. Mensagens sem explicação não geram interesse. O ideal é dizer o que você faz, para quem serve, mostrar um exemplo e oferecer uma opção de entrada.",
          "Em vez de mandar: Faço arte, quer comprar?, você pode escrever: Oi, estou fazendo artes simples para divulgação no WhatsApp e Instagram. Tenho pacote de entrada com 3 artes para quem quer divulgar produto, serviço ou evento. Posso te mandar alguns exemplos? Essa mensagem é mais clara e menos forçada.",
          [
            "Cumprimente a pessoa.",
            "Diga o serviço que você oferece.",
            "Explique para que serve.",
            "Fale de um pacote simples.",
            "Pergunte se pode mandar exemplos.",
            "Não envie muitas mensagens seguidas.",
            "Responda dúvidas com educação e clareza."
          ],
          [
            "Mandar mensagem genérica para todo mundo. Evite adaptando para a pessoa ou negócio.",
            "Insistir quando a pessoa não responde. Evite fazer pressão.",
            "Falar preço antes de explicar o valor. Evite mostrando primeiro o que a pessoa recebe."
          ],
          "Escreva uma mensagem curta oferecendo um pacote de artes simples e pedindo permissão para enviar exemplos.",
          "Depois desta aula, você deve conseguir abordar possíveis clientes sem parecer insistente ou desorganizado."
        ),
      ],
    },
    {
      title: "Módulo 4 — Projeto final e certificado",
      lessons: [
        fullLesson(
          "Criando seu mini portfólio",
          "O projeto final deste curso é criar um mini portfólio com 5 artes prontas. Esse portfólio será sua primeira entrega real, mesmo que ainda não tenha cliente. Ele prova que você consegue aplicar o que estudou: tamanho correto, hierarquia, cores, fontes, limpeza visual e organização. O mini portfólio também serve para divulgar seu serviço e receber feedback.",
          "Você pode criar 5 artes fictícias: uma promoção de açaí, um convite de aniversário, uma arte para salão de beleza, uma apresentação escolar e uma arte de serviço de limpeza. Com isso, você mostra que consegue atender temas diferentes.",
          [
            "Escolha 5 temas diferentes.",
            "Crie uma arte para cada tema.",
            "Use tamanhos adequados para cada caso.",
            "Aplique hierarquia visual em todas.",
            "Use poucas cores e fontes.",
            "Revise texto e alinhamento.",
            "Salve todas as artes em uma pasta de portfólio."
          ],
          [
            "Fazer 5 artes iguais mudando só o texto. Evite variando tema, formato e composição.",
            "Terminar sem revisar. Evite entregando apenas depois de conferir legibilidade, erros e margens.",
            "Escolher temas que você não entende. Evite começando com negócios simples do dia a dia."
          ],
          "Crie 5 artes finais para seu mini portfólio: post, story, convite, promoção e capa simples.",
          "Depois desta aula, você deve ter um mini portfólio real para mostrar e usar como base de venda."
        ),
        fullLesson(
          "Checklist final",
          "Antes de considerar uma arte pronta, você precisa revisar. Design não é só criar; é conferir se a mensagem está clara. O checklist final evita erros que passam despercebidos, como texto cortado, telefone errado, preço confuso, fonte difícil de ler ou excesso de elementos. Essa revisão é ainda mais importante quando você vende, porque um erro simples pode fazer o cliente perder confiança.",
          "Imagine entregar uma arte de promoção com o preço errado ou com o número do WhatsApp faltando um dígito. Mesmo que a arte esteja bonita, o erro prejudica o cliente. Um checklist simples antes da entrega evita esse tipo de problema.",
          [
            "Confira se o título principal está claro.",
            "Confira preço, data, contato e endereço se existirem.",
            "Veja se o texto está legível no celular.",
            "Confira se nada importante está perto demais da borda.",
            "Revise erros de português.",
            "Veja se cores e fontes estão consistentes.",
            "Exporte em boa qualidade."
          ],
          [
            "Revisar só no Canva e não olhar a imagem exportada. Evite abrindo o arquivo final no celular.",
            "Confiar que o cliente vai perceber erros. Evite entregando o mais correto possível.",
            "Mudar detalhes demais depois da arte pronta. Evite finalizar com critério e sem bagunçar."
          ],
          "Revise as 5 artes do seu mini portfólio usando o checklist da aula e corrija pelo menos um detalhe em cada uma.",
          "Depois desta aula, você deve conseguir revisar artes antes de postar, vender ou entregar para alguém."
        ),
        fullLesson(
          "Certificado de Conclusão — Curso Livre",
          "O certificado deste curso é um Certificado de Conclusão — Curso Livre. Ele comprova que você concluiu as aulas e realizou o projeto final dentro da plataforma AprendaJá Cursos Livres. Ele não é diploma técnico, não substitui formação regulamentada e não promete reconhecimento oficial. A função dele é registrar sua participação e conclusão em um curso livre de aprendizado prático.",
          "Se você concluiu o curso Canva para Vender Artes Simples e montou seu mini portfólio, o certificado mostra que você estudou aquele conteúdo e finalizou a entrega proposta. Você pode guardar, imprimir, anexar em uma pasta pessoal ou usar como comprovante de curso livre quando fizer sentido.",
          [
            "Conclua todas as aulas do curso.",
            "Finalize o mini portfólio com 5 artes.",
            "Marque 100% das aulas como concluídas na plataforma.",
            "Digite seu nome completo corretamente.",
            "Gere o certificado.",
            "Confira nome, curso, carga horária, total de aulas e projeto final.",
            "Salve ou imprima o certificado em PDF."
          ],
          [
            "Chamar curso livre de diploma. Evite isso usando o nome correto: Certificado de Conclusão — Curso Livre.",
            "Gerar certificado sem concluir o projeto. Evite liberando apenas depois de finalizar 100% das aulas.",
            "Digitar nome errado. Evite conferindo antes de salvar o PDF."
          ],
          "Conclua 100% das aulas, revise seu mini portfólio e gere seu Certificado de Conclusão — Curso Livre.",
          "Depois desta aula, você deve entender o valor correto do certificado e saber gerar seu comprovante de conclusão sem promessas falsas."
        ),
      ],
    },
  ],
  checklist: [
    "Criar e organizar pasta no Canva",
    "Usar modelos sem copiar de forma genérica",
    "Escolher tamanho certo para cada arte",
    "Aplicar hierarquia visual, cores e fontes limpas",
    "Montar pacotes simples para vender",
    "Criar mini portfólio com 5 artes",
    "Concluir 100% das aulas para liberar Certificado de Conclusão — Curso Livre",
  ],
  finalProject: "Criar um mini portfólio com 5 artes prontas para vender.",
};

export const apresentacaoEscolar: CourseContent = {
  id: "apresentacao-escolar",
  title: "Apresentações Escolares Bonitas",
  subtitle: "Aprenda a fazer slides organizados para trabalhos de escola sem deixar tudo poluído.",
  category: "Design",
  level: "iniciante",
  duration: "1h30 • 10 aulas",
  price: "R$ 5,90",
  hero: "📚",
  outcome: "Você cria apresentações mais bonitas, claras e fáceis de explicar em sala ou online.",
  modules: [
    {
      title: "Módulo 1 — Estrutura da apresentação",
      lessons: [
        lesson("Capa, introdução e conclusão", "Entenda a ordem básica de uma apresentação escolar.", "Crie uma estrutura com 6 slides."),
        lesson("Como dividir o conteúdo", "Aprenda a separar textos grandes em partes menores.", "Transforme um texto em tópicos curtos."),
        lesson("O que não colocar no slide", "Evite parágrafos enormes e excesso de imagem.", "Revise um slide e corte informações desnecessárias."),
      ],
    },
    {
      title: "Módulo 2 — Visual bonito e simples",
      lessons: [
        lesson("Escolhendo tema e cores", "Use uma identidade visual simples para todos os slides.", "Defina 2 cores e uma fonte."),
        lesson("Imagens que ajudam", "Escolha imagens que explicam o assunto em vez de enfeitar demais.", "Adicione uma imagem útil em 3 slides."),
        lesson("Como alinhar tudo", "Aprenda alinhamento básico para parecer profissional.", "Organize textos e imagens com margem."),
      ],
    },
    {
      title: "Módulo 3 — Apresentando melhor",
      lessons: [
        lesson("Como falar sem ler tudo", "Use o slide como guia, não como texto completo.", "Treine explicar um slide em 30 segundos."),
        lesson("Dividindo fala em grupo", "Organize quem fala cada parte para evitar confusão.", "Monte uma lista com nomes e slides."),
      ],
    },
    {
      title: "Módulo 4 — Projeto final e certificado",
      lessons: [
        lesson("Criando apresentação completa", "Monte uma apresentação de 6 a 8 slides com capa, tópicos e conclusão.", "Finalize uma apresentação escolar pronta."),
        lesson("Certificado", "Ao concluir o projeto final, o certificado fica disponível.", "Revise e conclua o curso."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar uma apresentação escolar completa com 6 a 8 slides.",
};

export const whatsappVendas: CourseContent = {
  id: "whatsapp-vendas-basico",
  title: "Venda pelo WhatsApp do Zero",
  subtitle: "Aprenda a organizar atendimento, mensagem, catálogo simples e fechamento sem enrolação.",
  category: "Negócios",
  level: "iniciante",
  duration: "2h • 11 aulas",
  price: "R$ 9,90",
  hero: "💬",
  outcome: "Você monta uma abordagem simples para vender serviços ou produtos pelo WhatsApp com mais confiança.",
  modules: [
    {
      title: "Módulo 1 — Preparando seu WhatsApp",
      lessons: [
        lesson("Perfil que passa confiança", "Veja como nome, foto, descrição e status ajudam na venda.", "Arrume sua bio e crie uma mensagem de boas-vindas."),
        lesson("Catálogo simples", "Organize seus serviços em pacotes fáceis de entender.", "Crie 3 pacotes com nome, preço e entrega."),
        lesson("Resposta rápida", "Prepare mensagens prontas para não travar quando alguém chamar.", "Escreva 5 respostas rápidas."),
      ],
    },
    {
      title: "Módulo 2 — Conversa que vende",
      lessons: [
        lesson("Como chamar sem parecer chato", "Aprenda abordagem educada para oferecer algo.", "Escreva uma mensagem para família/amigos."),
        lesson("Perguntas certas", "Descubra o que o cliente precisa antes de falar preço.", "Monte 5 perguntas de atendimento."),
        lesson("Mostrando valor", "Explique resultado, prazo e benefício antes de cobrar.", "Reescreva uma oferta usando benefício."),
      ],
    },
    {
      title: "Módulo 3 — Fechamento e pós-venda",
      lessons: [
        lesson("Como mandar preço", "Aprenda a apresentar preço com clareza e opções.", "Crie uma mensagem com 2 opções de pacote."),
        lesson("Comprovante e entrega", "Organize pagamento, prazo e confirmação.", "Crie um checklist de pedido."),
        lesson("Pós-venda simples", "Peça feedback e indicação sem forçar.", "Escreva uma mensagem de pós-venda."),
      ],
    },
    {
      title: "Módulo 4 — Projeto final e certificado",
      lessons: [
        lesson("Seu funil simples", "Monte o caminho: mensagem, atendimento, preço, pagamento e entrega.", "Crie seu roteiro completo de venda."),
        lesson("Certificado", "Certificado liberado ao concluir aulas e projeto final.", "Finalize o roteiro e marque como concluído."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar um roteiro completo de venda pelo WhatsApp com pacotes e mensagens prontas.",
};

export const curriculoPrimeiroEmprego: CourseContent = {
  id: "curriculo-primeiro-emprego",
  title: "Currículo para Primeiro Emprego",
  subtitle: "Aprenda a montar um currículo simples, bonito e honesto mesmo sem experiência.",
  category: "Negócios",
  level: "iniciante",
  duration: "1h • 8 aulas",
  price: "R$ 4,90",
  hero: "🧾",
  outcome: "Você sai com um currículo organizado e pronto para enviar por PDF ou imprimir.",
  modules: [
    {
      title: "Módulo 1 — O que colocar no currículo",
      lessons: [
        lesson("Dados certos", "Aprenda quais dados colocar e quais evitar.", "Liste seus dados principais de contato."),
        lesson("Objetivo profissional", "Crie um objetivo simples para primeiro emprego.", "Escreva 3 versões de objetivo."),
        lesson("Formação e cursos", "Organize escola, cursos livres e habilidades.", "Liste seus estudos e cursos."),
      ],
    },
    {
      title: "Módulo 2 — Como deixar profissional",
      lessons: [
        lesson("Modelo limpo", "Evite currículo colorido demais e difícil de ler.", "Escolha um modelo simples."),
        lesson("Habilidades importantes", "Inclua habilidades reais como informática, atendimento e organização.", "Escolha 6 habilidades verdadeiras."),
        lesson("Revisão final", "Corrija erros de português, excesso de informação e layout.", "Revise seu currículo com checklist."),
      ],
    },
    {
      title: "Módulo 3 — Enviando do jeito certo",
      lessons: [
        lesson("PDF e nome do arquivo", "Salve o currículo com nome profissional.", "Exporte o arquivo em PDF."),
        lesson("Certificado", "Ao finalizar seu currículo, o certificado do curso é liberado.", "Conclua e baixe seu currículo."),
      ],
    },
  ],
  checklist: checklistPadrao,
  finalProject: "Criar um currículo completo para primeiro emprego em PDF.",
};

export const cursosBaratos: CourseContent[] = [
  curriculoPrimeiroEmprego,
  apresentacaoEscolar,
  canvaParaVender,
  whatsappVendas,
];
