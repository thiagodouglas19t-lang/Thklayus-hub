import { CourseContent, lesson } from "../courseTypes";

export const tecnicoEletronica: CourseContent = {
  id: "tecnico-eletronica",
  title: "Técnico em Eletrônica • Fundamentos Completos",
  subtitle: "Aprenda eletrônica do zero com segurança, componentes, Lei de Ohm, multímetro, protoboard, leitura de esquemas e projetos práticos em baixa tensão.",
  category: "Tecnologia",
  level: "iniciante",
  duration: "5 meses • 60h",
  price: "R$ 29,90",
  hero: "⚡",
  outcome: "Entender os fundamentos da eletrônica e montar pequenos circuitos seguros em baixa tensão, documentando testes, medições e projeto final.",
  modules: [
    {
      title: "Módulo 1 — Segurança e base da eletrônica",
      lessons: [
        lesson("Eletrônica sem se colocar em risco", "Antes de qualquer montagem, você precisa entender que eletrônica exige cuidado. O foco deste curso é baixa tensão, como pilhas, baterias pequenas, USB e fontes simples. Nunca mexa em tomada, rede elétrica, fonte aberta, chuveiro, carregador aberto ou equipamento ligado na tomada sem formação adequada e supervisão profissional.", "Liste 5 coisas que você NÃO deve mexer e 5 materiais seguros para começar, como pilha, LED, resistor, protoboard e jumpers."),
        lesson("Tensão, corrente e resistência", "Tensão é a força que empurra a energia, corrente é o fluxo que passa pelo circuito e resistência é o que limita esse fluxo. Esses três conceitos aparecem em praticamente todo circuito. Entender isso evita queimar LED, componente ou fonte.", "Explique com suas palavras o que é tensão, corrente e resistência usando o exemplo de uma mangueira de água."),
        lesson("Circuito aberto e circuito fechado", "Um circuito só funciona quando existe caminho completo para a corrente. Se o caminho está interrompido, o circuito está aberto. Se está completo, está fechado. Botões, chaves e fios controlam esse caminho.", "Desenhe um circuito simples com pilha, botão, resistor e LED, indicando quando ele fica aberto e fechado."),
      ],
    },
    {
      title: "Módulo 2 — Componentes essenciais",
      lessons: [
        lesson("Resistores", "Resistores limitam corrente e protegem componentes. Eles são fundamentais para usar LEDs, divisores de tensão e sinais simples. Sem resistor, um LED pode queimar facilmente.", "Monte uma tabela com resistor, função, símbolo e exemplo de uso."),
        lesson("LEDs e polaridade", "LED tem lado certo para ligar: ânodo e cátodo. Se inverter, pode não acender. Se ligar sem resistor, pode queimar. Essa aula ensina a montar LED com segurança em baixa tensão.", "Desenhe um LED com resistor em série e marque o lado positivo e negativo."),
        lesson("Capacitores, diodos e botões", "Capacitores armazenam energia por pouco tempo, diodos deixam corrente passar em um sentido e botões abrem ou fecham o circuito. Esses componentes aparecem em projetos simples e são base para circuitos maiores.", "Crie um resumo com a função de capacitor, diodo e botão, com um exemplo prático para cada um."),
      ],
    },
    {
      title: "Módulo 3 — Lei de Ohm e cálculos simples",
      lessons: [
        lesson("A fórmula mais importante", "A Lei de Ohm liga tensão, corrente e resistência. Ela ajuda a escolher resistor correto e prever o comportamento do circuito. Você não precisa virar matemático, mas precisa saber usar a lógica para não montar no chute.", "Calcule qual resistor usar para um LED simples considerando uma fonte de baixa tensão e corrente segura."),
        lesson("Potência e aquecimento", "Além de resistência, componentes têm limite de potência. Quando passa corrente demais, eles aquecem. Isso explica por que resistores queimam, fontes esquentam e projetos mal dimensionados falham.", "Explique por que um resistor pequeno pode esquentar se usado errado."),
        lesson("Erros comuns em cálculo", "Os erros mais comuns são confundir volts com amperes, ignorar resistor, usar fonte forte demais e montar sem conferir polaridade. Profissional não monta no impulso: confere antes.", "Faça uma checklist de cálculo antes de ligar qualquer circuito."),
      ],
    },
    {
      title: "Módulo 4 — Protoboard e montagem prática",
      lessons: [
        lesson("Como a protoboard funciona", "A protoboard permite montar circuitos sem solda. Ela tem trilhas internas conectadas, linhas de alimentação e áreas separadas. Entender isso evita montar fios em lugares errados.", "Desenhe uma protoboard e marque onde ficam alimentação, terra e área de componentes."),
        lesson("Montagem de LED com botão", "Agora você junta pilha/fonte baixa, resistor, LED e botão. O objetivo é montar um circuito simples e entender o caminho da corrente.", "Monte ou desenhe o circuito LED + resistor + botão e explique por onde a corrente passa."),
        lesson("Organização dos fios", "Circuito bagunçado dificulta achar erro. Use cores: vermelho para positivo, preto para negativo, e outras cores para sinais. Isso deixa o projeto mais limpo e fácil de revisar.", "Reorganize um desenho de circuito usando cores e nomes nos fios."),
      ],
    },
    {
      title: "Módulo 5 — Multímetro e diagnóstico",
      lessons: [
        lesson("Multímetro sem medo", "O multímetro mede tensão, resistência e continuidade. Ele é uma das ferramentas mais importantes da eletrônica. Mas precisa usar a escala certa e nunca medir corrente de qualquer jeito.", "Liste o que medir em modo tensão, resistência e continuidade."),
        lesson("Testando continuidade", "Continuidade ajuda a descobrir se um fio está conectado, se uma trilha está rompida ou se um botão está funcionando. É uma forma segura de investigar circuito desligado.", "Explique como testar se um botão abre e fecha usando continuidade."),
        lesson("Encontrando erro no circuito", "Quando um circuito não funciona, o erro pode estar em polaridade, fio solto, resistor errado, alimentação fraca ou montagem na protoboard. Diagnóstico é seguir pistas, não adivinhar.", "Crie uma checklist de 8 passos para descobrir por que um LED não acende."),
      ],
    },
    {
      title: "Módulo 6 — Leitura de esquemas e projeto final",
      lessons: [
        lesson("Símbolos eletrônicos", "Esquemas usam símbolos para representar componentes. Aprender símbolos de resistor, LED, capacitor, botão, bateria e terra ajuda você a copiar projetos simples sem depender só de foto.", "Monte uma tabela com 8 símbolos eletrônicos e o nome de cada um."),
        lesson("Do esquema para a protoboard", "Ler esquema é entender conexões. Depois você transforma essas conexões em fios e componentes na protoboard. A posição física pode mudar, mas as ligações precisam continuar iguais.", "Pegue um esquema simples de LED com botão e transforme em desenho de protoboard."),
        lesson("Projeto final: mini sinalizador", "O projeto final junta segurança, LED, resistor, botão, organização de fios, teste com multímetro e documentação. O resultado deve ser um pequeno sinalizador em baixa tensão.", "Crie o projeto final com desenho, lista de peças, explicação do funcionamento, checklist de segurança e teste."),
      ],
    },
  ],
  checklist: [
    "Entendo cuidados básicos de segurança",
    "Sei diferenciar tensão, corrente e resistência",
    "Conheço resistores, LEDs, botões, diodos e capacitores",
    "Uso Lei de Ohm em exemplos simples",
    "Monto circuito básico em protoboard",
    "Entendo uso básico do multímetro",
    "Leio esquemas simples",
    "Tenho projeto final documentado",
  ],
  finalProject: "Montar ou documentar um mini sinalizador em baixa tensão com LED, resistor, botão, esquema, lista de peças, testes com multímetro e checklist de segurança.",
};
