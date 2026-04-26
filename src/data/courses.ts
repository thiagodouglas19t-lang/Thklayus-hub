export type CourseLevel = "iniciante" | "intermediario" | "avancado";

export type CourseModule = {
  title: string;
  lessons: { title: string; summary: string; practice: string }[];
};

export type CourseContent = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  price: string;
  free?: boolean;
  duration: string;
  outcome: string;
  hero: string;
  modules: CourseModule[];
  checklist: string[];
  finalProject: string;
};

function aula(title: string, summary: string, practice: string) {
  return { title, summary, practice };
}

const apresentacao: CourseContent = {
  id: "teste-apresentacao-pro",
  title: "Curso Teste • Apresentação Bonita do Zero",
  subtitle: "Aprenda a montar uma apresentação com aparência limpa, fala organizada e slides que ajudam em vez de atrapalhar.",
  category: "Escola",
  level: "iniciante",
  price: "Grátis",
  free: true,
  duration: "45 min",
  outcome: "Criar uma apresentação de 6 slides com capa, roteiro, visual limpo e conclusão pronta para apresentar.",
  hero: "🎤",
  modules: [
    { title: "Módulo 1 • Planejamento antes do slide", lessons: [
      aula("Defina a mensagem principal", "Antes de abrir qualquer editor, responda: qual é a ideia que a pessoa precisa entender no final? Uma apresentação boa não é cheia de texto; ela tem uma mensagem clara. Exemplo: em vez de 'vou falar sobre meio ambiente', use 'pequenas atitudes reduzem lixo e ajudam a cidade'.", "Escreva uma frase principal para o seu tema começando com: 'No final, quero que entendam que...'") ,
      aula("Organize começo, meio e fim", "A estrutura mais segura é: abertura com tema, desenvolvimento com 3 pontos e conclusão com resumo. Isso evita travar e deixa a apresentação fácil de seguir.", "Divida seu tema em 3 partes: introdução, 3 pontos principais e conclusão."),
      aula("Transforme texto em tópicos", "Slide não é folha de caderno. O slide deve mostrar palavras-chave; a explicação fica na sua fala. Use frases curtas e deixe espaço vazio.", "Pegue um parágrafo e reduza para no máximo 5 tópicos curtos."),
    ]},
    { title: "Módulo 2 • Visual que parece profissional", lessons: [
      aula("Fonte, tamanho e contraste", "Use fonte grande para título, texto menor para apoio e contraste forte. Se o fundo é escuro, texto claro. Se o fundo é claro, texto escuro. O erro mais comum é usar letra pequena demais.", "Crie uma capa com título grande, subtítulo curto e contraste forte."),
      aula("Imagens com função", "Imagem bonita não basta. Ela precisa explicar, emocionar ou reforçar o assunto. Evite usar muitas imagens pequenas no mesmo slide.", "Escolha uma imagem para seu tema e escreva uma legenda explicando por que ela faz sentido."),
      aula("Regra do slide limpo", "Um slide limpo tem poucos elementos, bom espaçamento e foco. Se tudo chama atenção, nada chama atenção. Use no máximo 2 fontes e 2 cores principais.", "Revise um slide e remova tudo que não ajuda a explicar."),
    ]},
    { title: "Módulo 3 • Fala e entrega", lessons: [
      aula("Roteiro de fala simples", "Para não ler o slide inteiro, prepare uma fala curta para cada slide: o que é, por que importa e exemplo. Isso deixa a apresentação natural.", "Escreva 3 frases de fala para o slide de introdução."),
      aula("Como não travar", "Treine em voz alta uma vez, depois grave um áudio curto. Não precisa decorar tudo; precisa entender a ordem. Se esquecer, volte para o tópico do slide.", "Grave 30 segundos explicando um slide sem ler tudo."),
      aula("Conclusão forte", "A conclusão deve retomar a ideia principal e fechar com uma frase de impacto. Evite terminar com 'é isso'. Finalize com resumo + agradecimento.", "Escreva uma conclusão com: 'Concluindo...' + resumo + agradecimento."),
    ]},
  ],
  checklist: ["Mensagem principal clara", "Slides com pouco texto", "Capa organizada", "Imagens úteis", "Roteiro de fala pronto", "Conclusão curta"],
  finalProject: "Criar uma apresentação de 6 slides: capa, introdução, 3 pontos principais e conclusão.",
};

const logica: CourseContent = {
  id: "logica-iniciante",
  title: "Lógica para Iniciantes",
  subtitle: "Treine raciocínio, organização de pensamento e resolução de problemas sem precisar saber programar.",
  category: "Tecnologia",
  level: "iniciante",
  price: "R$ 1,00",
  duration: "1h 10min",
  outcome: "Pensar em passos, condições e soluções simples para problemas do dia a dia e tecnologia.",
  hero: "🧠",
  modules: [
    { title: "Módulo 1 • Pensar em passos", lessons: [
      aula("O que é lógica", "Lógica é organizar uma sequência de ideias para chegar a um resultado. Ela aparece quando você segue uma receita, resolve uma conta, monta uma rotina ou cria um app.", "Escreva o passo a passo para acordar, se arrumar e sair de casa."),
      aula("Entrada, processo e saída", "Todo problema tem algo que entra, uma ação e um resultado. Exemplo: entrada = tema; processo = organizar ideias; saída = apresentação pronta.", "Escolha um problema e separe entrada, processo e saída."),
      aula("Quebrando problemas grandes", "Problema grande assusta. Divida em partes pequenas. Em vez de 'fazer trabalho', pense: pesquisar, resumir, montar slide, revisar e apresentar.", "Divida uma tarefa grande em 5 tarefas pequenas."),
    ]},
    { title: "Módulo 2 • Condições e decisões", lessons: [
      aula("Se isso, então aquilo", "Condições ajudam a decidir. Exemplo: se o comprovante foi confirmado, libera curso; se não foi, mantém em análise.", "Crie 5 regras usando 'se... então...'"),
      aula("Prioridade", "Nem tudo tem a mesma importância. Lógica também é decidir o que fazer primeiro, o que pode esperar e o que impede o resto.", "Liste 5 tarefas e coloque em ordem de prioridade."),
      aula("Testando resultado", "Uma solução precisa ser testada. Se falhar, você ajusta. Isso é pensamento lógico aplicado.", "Pegue uma regra sua e pense em 2 situações onde ela pode falhar."),
    ]},
    { title: "Módulo 3 • Aplicação prática", lessons: [
      aula("Fluxo de app", "Apps funcionam com fluxo: usuário clica, sistema verifica, mostra resultado. Entender fluxo ajuda a criar ideias melhores.", "Desenhe o fluxo de compra de um curso em 5 passos."),
      aula("Checklist lógico", "Checklist evita erro porque força conferir cada etapa. É uma ferramenta de lógica simples.", "Crie um checklist para entregar um trabalho escolar."),
      aula("Melhorando uma solução", "Depois de resolver, pergunte: dá para simplificar? dá para deixar mais seguro? dá para deixar mais rápido?", "Melhore um processo seu usando essas 3 perguntas."),
    ]},
  ],
  checklist: ["Sei dividir problema", "Entendo entrada/processo/saída", "Criei condições", "Montei fluxo", "Testei solução"],
  finalProject: "Criar um fluxo lógico para resolver um problema real, como compra, estudo ou atendimento.",
};

const tecnicoEletronica: CourseContent = {
  id: "tecnico-eletronica",
  title: "Técnico em Eletrônica • Fundamentos Completos",
  subtitle: "Curso maior e mais sério para aprender eletrônica de verdade: segurança, grandezas elétricas, Lei de Ohm, componentes, protoboard, multímetro, leitura de esquemas e projetos práticos em baixa tensão.",
  category: "Eletrônica",
  level: "intermediario",
  price: "R$ 29,90",
  duration: "12h",
  outcome: "Sair do zero para entender circuitos simples, calcular resistores, reconhecer componentes, usar protoboard, medir com multímetro e montar projetos básicos de baixa tensão com segurança.",
  hero: "⚡",
  modules: [
    { title: "Módulo 1 • Começando com segurança", lessons: [
      aula("O que é eletrônica de verdade", "Eletrônica é o estudo e aplicação de circuitos que controlam energia elétrica para gerar sinais, luz, som, movimento ou processamento. Ela está em carregadores, controles, celulares, fontes, sensores, brinquedos, placas e máquinas. Neste curso, o foco é começar por baixa tensão, entendendo o caminho da energia, os componentes e os testes básicos. Você não vai decorar nomes: vai aprender a olhar um circuito e entender o que cada parte está fazendo.", "Liste 10 aparelhos ao seu redor que usam eletrônica. Depois escolha 3 e escreva qual função elétrica eles fazem: iluminar, carregar, controlar, medir, emitir som ou processar dados."),
      aula("Baixa tensão vs rede elétrica", "Baixa tensão, como pilhas, baterias pequenas, USB 5V e fontes adequadas, é o ambiente certo para começar. Rede elétrica de tomada é perigosa e não deve ser aberta ou manipulada por iniciante. A regra é simples: estudar primeiro com circuitos de baixa energia, em bancada organizada, sem mexer em fonte aberta, tomada, chuveiro, extensão danificada ou equipamento ligado na rede. Segurança vem antes de curiosidade.", "Crie uma lista com duas colunas: 'posso estudar com supervisão/baixa tensão' e 'não devo mexer'. Coloque pilha, bateria 9V, USB 5V, tomada, fonte aberta, carregador fechado e protoboard."),
      aula("Equipamentos básicos do iniciante", "Para começar bem você precisa de poucos itens: protoboard, jumpers, resistores, LEDs, botões, fonte de baixa tensão, multímetro simples e organização. Não precisa comprar tudo caro. O mais importante é saber usar cada item e montar devagar. Um erro comum é comprar muitos componentes sem saber testar nenhum. Primeiro domine o básico.", "Monte uma lista de compras do kit iniciante: 5 itens obrigatórios e 5 opcionais. Marque quais você já tem."),
      aula("Organização da bancada", "Uma bancada ruim causa erros. Fios misturados, componente solto e pressa fazem o circuito falhar. Separe área de montagem, área de componentes e área de anotação. Sempre escreva o que está montando, qual tensão está usando e o que espera que aconteça. Eletrônica não é adivinhação: é teste com método.", "Desenhe no papel sua bancada ideal com 3 áreas: montagem, componentes e anotações. Depois escreva 5 regras para manter tudo organizado."),
    ]},
    { title: "Módulo 2 • Grandezas elétricas", lessons: [
      aula("Tensão: o empurrão elétrico", "Tensão é a diferença de potencial entre dois pontos. Pense como a força que empurra a corrente pelo circuito. Uma pilha comum tem cerca de 1,5V; USB geralmente fornece 5V; uma bateria retangular pode ter 9V. Em eletrônica básica, saber a tensão da fonte é essencial para não queimar componentes. Um LED, por exemplo, não deve ser ligado direto em uma fonte sem resistor.", "Anote a tensão de 5 fontes diferentes que você conhece: pilha, bateria, carregador, USB, power bank ou fonte de roteador. Escreva qual delas parece mais segura para estudar."),
      aula("Corrente: o fluxo que circula", "Corrente é o fluxo de carga elétrica passando pelo circuito. Ela é medida em ampères, mas em circuitos pequenos geralmente usamos miliampères. Componentes têm limite de corrente. Quando passa corrente demais, aquecem ou queimam. O resistor é um dos componentes usados para limitar essa corrente e proteger partes sensíveis, como LEDs.", "Explique com suas palavras por que um LED precisa de resistor. Depois escreva: 'corrente demais pode...' e complete com 3 consequências."),
      aula("Resistência: o freio do circuito", "Resistência é a oposição à passagem da corrente. Um resistor transforma parte da energia em calor e limita o fluxo. Resistores são usados para proteger LEDs, dividir tensão, ajustar sinais e controlar comportamento do circuito. Entender resistência evita o erro de ligar tudo direto na fonte.", "Pegue 3 valores de resistor comuns: 220Ω, 1kΩ e 10kΩ. Organize do que deixa passar mais corrente para o que deixa passar menos corrente."),
      aula("Potência: quando o componente esquenta", "Potência indica quanta energia por segundo um componente está dissipando. Em resistores, potência demais vira calor demais. A fórmula básica é P = V × I. Mesmo em baixa tensão, um resistor errado pode aquecer. Por isso eletrônica não é só ligar: é calcular, testar e respeitar limites.", "Imagine um circuito de 5V com corrente de 0,02A. Calcule a potência aproximada usando P = V × I. Depois escreva por que potência importa."),
    ]},
    { title: "Módulo 3 • Lei de Ohm na prática", lessons: [
      aula("A fórmula que mais aparece", "A Lei de Ohm relaciona tensão, corrente e resistência: V = R × I. Se você sabe dois valores, calcula o terceiro. Ela é uma das bases da eletrônica porque ajuda a escolher resistores, estimar corrente e entender por que um circuito não se comporta como esperado.", "Escreva a fórmula V = R × I e depois isole I = V / R e R = V / I. Faça uma tabela com as três versões."),
      aula("Calculando corrente", "Para descobrir a corrente, use I = V / R. Exemplo: fonte de 5V e resistor de 1000Ω: I = 5 / 1000 = 0,005A, ou 5mA. Esse valor é pequeno e comum em eletrônica básica. Aprender a converter A para mA ajuda a entender datasheets e limites de componentes.", "Calcule a corrente para 5V com resistores de 220Ω, 1kΩ e 10kΩ. Escreva os resultados em A e em mA."),
      aula("Calculando resistor para LED", "Um LED precisa de resistor para limitar corrente. A ideia simples é: tensão da fonte menos tensão aproximada do LED, dividido pela corrente desejada. Para estudo inicial, você pode usar valores seguros como 330Ω ou 1kΩ em 5V. Quanto maior o resistor, menor o brilho e menor a corrente.", "Faça uma comparação: LED com 330Ω e LED com 1kΩ em 5V. Qual deve brilhar mais? Qual deve ser mais conservador?"),
      aula("Erros comuns de cálculo", "Os erros mais comuns são esquecer unidade, confundir mA com A, usar resistor pequeno demais ou ignorar queda de tensão do LED. O objetivo não é virar calculadora humana, mas saber fazer estimativa segura antes de montar.", "Revise seus cálculos das aulas anteriores e marque onde poderia confundir unidade. Reescreva tudo com unidade ao lado."),
    ]},
    { title: "Módulo 4 • Resistores e código de cores", lessons: [
      aula("Para que serve resistor", "Resistores aparecem em quase todo circuito. Eles limitam corrente, criam divisores de tensão, ajustam sinais e protegem componentes. Um resistor não tem polaridade: pode ser colocado em qualquer sentido. Mesmo assim, precisa ter valor correto e potência adequada.", "Desenhe 3 usos de resistor: proteger LED, dividir tensão e limitar corrente em um circuito simples."),
      aula("Entendendo código de cores", "Muitos resistores mostram valor por faixas coloridas. As primeiras faixas indicam números, a próxima indica multiplicador e a última tolerância. No começo, use tabela de cores até decorar. O importante é não chutar: leia, confira e, se possível, meça com multímetro.", "Pesquise uma tabela de código de cores e anote as cores de 220Ω, 330Ω, 1kΩ e 10kΩ."),
      aula("Série e paralelo", "Resistores em série somam seus valores. Dois resistores de 1kΩ em série viram 2kΩ. Em paralelo, o resultado fica menor que o menor resistor do grupo. Esses arranjos ajudam quando você não tem exatamente o valor desejado.", "Calcule: 1kΩ + 1kΩ em série. Depois pesquise ou estime o paralelo de dois resistores iguais de 1kΩ."),
      aula("Divisor de tensão", "Divisor de tensão usa dois resistores em série para criar uma tensão menor em um ponto intermediário. É comum em sensores, leitura de sinal e adaptação de tensão. Não é fonte de alta corrente; serve para sinais e referências.", "Desenhe dois resistores em série ligados a 5V e marque o ponto do meio como saída do divisor."),
    ]},
    { title: "Módulo 5 • LEDs, diodos e polaridade", lessons: [
      aula("LED não é lâmpada comum", "LED é um diodo emissor de luz. Ele tem polaridade: um lado positivo e um lado negativo. Se ligar invertido, geralmente não acende. Se ligar sem resistor, pode queimar. Entender LED é ótimo para treinar polaridade, corrente e leitura de circuito.", "Desenhe um LED e marque anodo, catodo, lado positivo e lado negativo. Escreva a função do resistor no mesmo desenho."),
      aula("Diodo comum", "Diodo permite passagem de corrente principalmente em um sentido. Ele é usado para proteção, retificação e controle de caminho da corrente. Assim como LED, tem polaridade. Em esquemas, a barrinha do símbolo indica o lado do catodo.", "Pesquise o símbolo de um diodo e desenhe 3 vezes: uma normal, uma invertida e uma com indicação do catodo."),
      aula("Proteção contra inversão", "Um diodo pode proteger circuitos contra ligação invertida em algumas situações. A ideia é impedir que a corrente siga pelo caminho errado. Existem formas diferentes de proteção, e cada uma tem perdas e limitações. No começo, foque em entender o sentido correto da corrente.", "Explique com suas palavras o que pode acontecer se você inverter positivo e negativo de uma montagem."),
      aula("Teste visual e teste lógico", "Quando um LED não acende, não significa que tudo queimou. Pode ser polaridade invertida, resistor errado, fio solto, fonte desligada ou caminho aberto. Teste com calma: fonte, resistor, LED, retorno e conexão.", "Monte uma checklist de diagnóstico para LED que não acende com pelo menos 7 itens."),
    ]},
    { title: "Módulo 6 • Capacitores e tempo", lessons: [
      aula("O que capacitor faz", "Capacitor armazena energia por curto tempo. Ele pode filtrar ruído, suavizar variações, criar atrasos e estabilizar alimentação. Capacitores aparecem muito perto de chips e fontes porque ajudam a manter a tensão mais estável.", "Explique a diferença entre resistor e capacitor usando uma analogia simples: freio e reservatório."),
      aula("Polarizado e não polarizado", "Alguns capacitores têm polaridade, como eletrolíticos. Outros, como cerâmicos comuns, geralmente não têm polaridade. Ligar capacitor polarizado invertido pode ser perigoso. Sempre confira marcação antes de montar.", "Desenhe um capacitor eletrolítico e marque o lado negativo. Depois desenhe um capacitor cerâmico."),
      aula("Carga e descarga", "Quando ligado a uma fonte através de resistência, o capacitor carrega aos poucos. Quando descarrega, libera energia aos poucos. Isso cria comportamento de tempo, como atraso para LED apagar ou suavização de pulsos.", "Desenhe um circuito conceitual com fonte, resistor, capacitor e LED indicando carga e descarga."),
      aula("Capacitor como filtro", "Em alimentação, capacitor pode reduzir pequenas oscilações. Ele não conserta fonte ruim, mas ajuda em circuitos sensíveis. Em projetos com microcontroladores, sensores e módulos, capacitores próximos à alimentação são comuns.", "Pesquise uma placa eletrônica qualquer e tente identificar capacitores próximos de entrada de energia."),
    ]},
    { title: "Módulo 7 • Protoboard e montagem limpa", lessons: [
      aula("Como a protoboard é ligada por dentro", "A protoboard tem linhas internas conectadas. Nas áreas centrais, grupos de furos são conectados em pequenas fileiras. Nas laterais, trilhas longas costumam ser usadas para positivo e negativo. Entender isso evita montar componentes no mesmo nó por engano.", "Desenhe uma protoboard simplificada e pinte quais furos estão conectados entre si."),
      aula("Barramentos positivo e negativo", "Separar positivo e negativo nas laterais deixa o circuito mais organizado. Use cores: vermelho para positivo e preto/azul para negativo. Isso reduz erro visual e facilita manutenção. Nunca confie só na cor: confira o caminho.", "Planeje uma protoboard com barramento de 5V e GND. Marque onde entrará a fonte."),
      aula("Montagem por etapas", "Não monte tudo de uma vez. Primeiro alimente a protoboard, depois teste um LED, depois adicione botão, depois ajuste resistores. Montagem por etapas facilita encontrar erro, porque você sabe qual mudança causou o problema.", "Escreva um plano de montagem em 5 etapas para LED com botão."),
      aula("Organização de fios", "Fios longos e cruzados dificultam diagnóstico. Use fios curtos quando possível, mantenha positivo e negativo separados e não esconda componentes importantes. Um circuito bonito não é frescura: é mais fácil de testar.", "Desenhe duas montagens: uma bagunçada e uma organizada. Explique por que a organizada é melhor."),
    ]},
    { title: "Módulo 8 • Multímetro básico", lessons: [
      aula("Funções principais", "Multímetro mede tensão, resistência, continuidade e, em alguns casos, corrente. Para iniciante, as medições mais úteis são tensão DC, resistência e continuidade. Usar a escala errada ou ponta no lugar errado pode dar leitura errada e até danificar o aparelho.", "Liste 3 medições que você quer aprender: medir pilha, medir resistor e testar continuidade de fio."),
      aula("Medindo tensão", "Para medir tensão, o multímetro fica em paralelo com o ponto que você quer medir. Em circuitos DC, ponta preta no GND e vermelha no ponto positivo ou sinal. Comece sempre em escala adequada. Medir tensão ajuda a saber se a energia está chegando.", "Desenhe como medir a tensão de uma pilha com ponta vermelha no positivo e preta no negativo."),
      aula("Medindo resistência", "Para medir resistência, o componente deve estar fora do circuito ou sem alimentação. Se medir resistor dentro do circuito, outros caminhos podem alterar a leitura. Essa medição ajuda a confirmar valor real de resistor.", "Escolha 3 resistores e escreva como você confirmaria o valor deles com multímetro."),
      aula("Continuidade e diagnóstico", "Continuidade apita quando existe caminho elétrico entre dois pontos. É ótima para testar fio partido, trilha, conexão de protoboard e botão. Mas continuidade não substitui entendimento do circuito; ela só confirma caminho.", "Crie uma checklist: quando usar continuidade? fio, botão, trilha, protoboard, solda."),
    ]},
    { title: "Módulo 9 • Leitura de esquemas", lessons: [
      aula("Símbolos essenciais", "Esquema elétrico usa símbolos para representar componentes. Você precisa reconhecer fonte, GND, resistor, LED, diodo, capacitor, botão e conexões. Ler esquema é como ler mapa: ele não mostra aparência real, mostra ligação.", "Desenhe os símbolos de fonte, GND, resistor, LED, botão, capacitor e diodo."),
      aula("Nós e conexões", "Um nó é um ponto onde partes do circuito estão eletricamente conectadas. Linhas unidas representam o mesmo ponto elétrico. Entender nós é fundamental para transferir um esquema para protoboard sem erro.", "Pegue um circuito simples de LED e marque todos os nós com letras: A, B, C e D."),
      aula("Do esquema para a protoboard", "Para montar a partir do esquema, identifique fonte, GND, caminho da corrente e componentes em ordem. Depois escolha onde cada nó ficará na protoboard. A montagem física pode parecer diferente do desenho, desde que as conexões elétricas sejam iguais.", "Converta no papel um esquema de LED com resistor para uma organização de protoboard."),
      aula("Diagnóstico lendo esquema", "Quando algo falha, volte ao esquema. Pergunte: a fonte chega? existe GND? o resistor está no caminho certo? o LED está polarizado? o botão realmente fecha o caminho? Diagnóstico é comparação entre esperado e real.", "Escreva 5 perguntas de diagnóstico para qualquer circuito simples."),
    ]},
    { title: "Módulo 10 • Projetos práticos finais", lessons: [
      aula("Projeto 1: LED com botão", "Este projeto junta fonte baixa, resistor, LED e botão. O botão controla o caminho da corrente e o resistor protege o LED. Parece simples, mas treina polaridade, série, caminho de corrente e diagnóstico.", "Desenhe o circuito, liste componentes e escreva o passo a passo antes de montar."),
      aula("Projeto 2: dois LEDs com resistores", "Agora você vai controlar dois LEDs, cada um com seu resistor. Isso ensina que cada caminho precisa de limitação de corrente. Também ajuda a entender paralelo básico e organização de fios.", "Planeje um circuito com LED vermelho e LED verde, cada um com resistor próprio."),
      aula("Projeto 3: LED com capacitor", "Um capacitor pode criar pequeno efeito de atraso ou suavização. O objetivo não é fazer circuito perfeito, mas observar comportamento: carregar, descarregar e mudar o tempo de resposta.", "Desenhe um circuito experimental com resistor, capacitor e LED. Escreva o que você espera observar."),
      aula("Apresentação do projeto final", "Curso bom termina com entrega. O projeto final deve mostrar esquema, lista de componentes, explicação do funcionamento, fotos ou desenho da montagem e checklist de teste. Isso prova que você entendeu, não apenas clicou nas aulas.", "Monte um relatório final com: objetivo, componentes, esquema, montagem, testes, erros encontrados e conclusão."),
    ]},
  ],
  checklist: ["Sei diferenciar baixa tensão e rede elétrica", "Entendo tensão, corrente, resistência e potência", "Uso Lei de Ohm para cálculos básicos", "Reconheço resistor, LED, diodo e capacitor", "Consigo planejar montagem em protoboard", "Sei usar multímetro no básico", "Leio esquemas simples", "Tenho método de diagnóstico", "Concluí pelo menos um projeto final"],
  finalProject: "Montar e documentar um circuito de baixa tensão com LED, resistor, botão e pelo menos uma variação extra. O aluno deve entregar esquema, lista de peças, explicação do funcionamento, checklist de segurança e relatório de testes.",
};

function makeCourse(id: string, title: string, category: string, level: CourseLevel, price: string, hero: string, focus: string, duration = "1h 30min", free = false): CourseContent {
  return {
    id, title, category, level, price, hero, duration, free,
    subtitle: `Aprenda ${focus} com explicação prática, exemplos e projeto final.`,
    outcome: `Aplicar ${focus} em uma situação real com mais segurança e organização.`,
    modules: [
      { title: "Módulo 1 • Base real", lessons: [
        aula(`Entendendo ${focus}`, `Você vai entender para que serve ${focus}, onde isso aparece na prática e como começar do jeito certo. A ideia é sair da teoria solta e enxergar uso real.`, `Escreva 3 situações onde ${focus} pode ser usado.`),
        aula("Erros que atrapalham", "A maioria das pessoas erra por pular etapas, copiar sem entender ou entregar sem revisar. Aqui você aprende a evitar isso.", "Liste 3 erros comuns e escreva como evitar cada um."),
        aula("Preparação profissional", "Antes de fazer qualquer entrega, organize objetivo, prazo, materiais e padrão de qualidade. Isso melhora o resultado e evita retrabalho.", "Monte um checklist de preparação com 5 itens."),
      ]},
      { title: "Módulo 2 • Execução guiada", lessons: [
        aula("Processo simples", "Use um processo fixo: entender pedido, planejar, produzir, revisar e entregar. Esse método serve para estudo, design, atendimento e serviços.", "Aplique esse processo em uma tarefa pequena."),
        aula("Exemplo analisado", "Compare uma entrega fraca com uma boa: clareza, organização, visual, utilidade e acabamento. Qualidade aparece nos detalhes.", "Melhore uma entrega simples usando esses critérios."),
        aula("Revisão antes da entrega", "Revisar é parte do trabalho. Confira erro, visual, objetivo e se a pessoa vai entender sem você explicar demais.", "Revise seu resultado e corrija 3 pontos."),
      ]},
      { title: "Módulo 3 • Resultado final", lessons: [
        aula("Criando o projeto", "Agora você transforma o aprendizado em uma entrega real. O objetivo é criar algo pequeno, mas bem feito.", "Produza uma entrega final simples sobre o tema do curso."),
        aula("Como apresentar", "Explique o que fez, por que fez e como a pessoa pode usar. Isso aumenta percepção de valor.", "Escreva uma mensagem apresentando seu projeto final."),
        aula("Como evoluir", "Depois do básico, melhore velocidade, acabamento e confiança. O segredo é repetir com revisão.", "Defina 3 coisas para melhorar na próxima entrega."),
      ]},
    ],
    checklist: ["Entendi o objetivo", "Pratiquei", "Revisei", "Concluí projeto", "Sei explicar o resultado"],
    finalProject: `Criar uma entrega prática usando ${focus} e revisar antes de finalizar.`,
  };
}

export const professionalCourses: CourseContent[] = [
  tecnicoEletronica,
  apresentacao,
  logica,
  makeCourse("informatica-zero-iniciante", "Informática do Zero • Iniciante", "Informática", "iniciante", "R$ 1,00", "💻", "informática básica"),
  makeCourse("formacao-profissional", "Formação Profissional Completa", "Carreira", "intermediario", "R$ 5,00", "💼", "postura profissional, currículo e atendimento", "2h"),
  makeCourse("design-social-media", "Design para Social Media", "Design", "intermediario", "R$ 5,00", "🎨", "design para posts e divulgação"),
  makeCourse("sobrancelha-design", "Design de Sobrancelha • Iniciante", "Beleza", "iniciante", "R$ 5,00", "✨", "noções de design de sobrancelha, atendimento e organização", "1h 20min"),
  makeCourse("powerpoint-pro", "PowerPoint Profissional", "Escola", "intermediario", "R$ 5,00", "📊", "slides profissionais"),
  makeCourse("canva-avancado", "Canva e Design • Avançado", "Design", "avancado", "R$ 10,00", "🎨", "criação visual avançada", "2h"),
  makeCourse("excel-pratico", "Excel para Vida Real", "Informática", "intermediario", "R$ 5,00", "📈", "planilhas úteis e controle financeiro"),
  makeCourse("seguranca-digital", "Segurança Digital e Anti-Golpes", "Segurança", "intermediario", "R$ 5,00", "🛡️", "proteção de contas e identificação de golpes"),
  makeCourse("capcut-basico", "CapCut Básico para Vídeos", "Criação", "iniciante", "R$ 5,00", "🎬", "edição simples de vídeos"),
  makeCourse("mini-negocio-digital", "Mini Negócio Digital", "Dinheiro", "avancado", "R$ 10,00", "🚀", "serviços digitais e venda online", "2h 10min"),
  makeCourse("atendimento-cliente", "Atendimento ao Cliente", "Carreira", "iniciante", "R$ 1,00", "🤝", "respostas profissionais e suporte"),
  makeCourse("resumo-escolar", "Resumo Escolar Inteligente", "Escola", "iniciante", "R$ 1,00", "📝", "resumos claros e estudo rápido"),
  makeCourse("mapa-mental", "Mapas Mentais Bonitos", "Escola", "intermediario", "R$ 5,00", "🗺️", "mapas mentais para estudar e apresentar"),
  makeCourse("precificacao-servicos", "Precificação de Serviços", "Dinheiro", "intermediario", "R$ 5,00", "💰", "cobrança por artes, slides e trabalhos"),
  makeCourse("organizacao-rotina", "Organização de Rotina", "Produtividade", "iniciante", "R$ 1,00", "⏱️", "rotina, foco e tarefas"),
  makeCourse("google-drive", "Google Drive e Docs", "Informática", "iniciante", "R$ 1,00", "☁️", "Drive, Docs e compartilhamento"),
  makeCourse("email-profissional", "E-mail Profissional", "Carreira", "iniciante", "R$ 1,00", "📧", "mensagens, anexos e comunicação formal"),
  makeCourse("artes-vender", "Artes para Vender", "Design", "avancado", "R$ 10,00", "🖼️", "criação de artes simples para clientes"),
];

export function findCourse(id?: string | null, title?: string | null) {
  return professionalCourses.find((course) => course.id === id) || professionalCourses.find((course) => course.title === title) || professionalCourses.find((course) => title && course.title.toLowerCase().includes(title.toLowerCase().split(" • ")[0]));
}
