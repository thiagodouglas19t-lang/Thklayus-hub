import type { CourseContent } from "../courseTypes";
import { fullLesson } from "../courseTypes";

export const organizacaoFinanceiraBasica: CourseContent = {
  id: "organizacao-financeira-basica",
  title: "Organização Financeira Básica",
  subtitle: "Aprenda a entender seus gastos, controlar dívidas pequenas e juntar dinheiro mesmo começando com pouco.",
  category: "Negócios",
  level: "iniciante",
  duration: "4h • 12 aulas",
  price: "R$ 9,90",
  hero: "💰",
  outcome: "Você monta um plano mensal simples para saber quanto entra, quanto sai, o que cortar, o que pagar primeiro e como criar uma meta realista.",
  modules: [
    {
      title: "Módulo 1 — Entendendo seu dinheiro",
      lessons: [
        fullLesson(
          "Para onde seu dinheiro está indo",
          "Organização financeira começa quando você para de tentar adivinhar e começa a enxergar. Muita gente acha que o problema é ganhar pouco, mas às vezes o maior problema é não saber exatamente para onde o dinheiro está indo. Nesta aula, você vai aprender a mapear entradas e saídas de um jeito simples, sem planilha complicada. O objetivo não é julgar seus gastos, é descobrir a verdade do seu dinheiro para tomar decisões melhores.",
          "Imagine que você recebe R$ 100. Você paga R$ 20 para alguém, R$ 11 de dívida, compra um lanche, coloca crédito, ajuda em casa e no fim acha que o dinheiro sumiu. Quando anota tudo, percebe que o dinheiro não sumiu: ele foi para pequenas decisões que não estavam planejadas.",
          [
            "Anote quanto dinheiro você tem ou vai receber.",
            "Liste todos os compromissos que já têm destino certo.",
            "Liste pequenos gastos comuns: lanche, transporte, crédito, jogos, roupas ou delivery.",
            "Separe o que é obrigatório do que é vontade.",
            "Some tudo e veja quanto sobra de verdade.",
            "Guarde essa lista para comparar no fim da semana.",
            "Não tente ficar perfeito no primeiro dia; tente ficar consciente."
          ],
          [
            "Achar que gasto pequeno não conta. Evite isso anotando até valores baixos.",
            "Fazer conta só de cabeça. Evite usando bloco de notas, caderno ou app simples.",
            "Esconder gastos por vergonha. Evite lembrar que a lista é para melhorar, não para se culpar."
          ],
          "Crie uma lista com todo dinheiro que entrou ou vai entrar esta semana e todos os gastos que você lembra.",
          "Depois desta aula, você deve conseguir ver para onde seu dinheiro vai antes de decidir o que cortar ou guardar."
        ),
        fullLesson(
          "Gasto necessário, vontade e impulso",
          "Nem todo gasto é igual. Alguns gastos são necessários, como dívida, transporte, comida ou algo combinado com a família. Outros são vontades, como comprar algo legal, comer fora ou trocar um acessório. E existem gastos por impulso, que acontecem quando você compra sem pensar muito. Saber separar essas três coisas ajuda você a não tratar tudo como obrigação e também não cortar coisas importantes sem necessidade.",
          "Comprar material para um trabalho escolar pode ser necessário. Comprar um salgado porque você estava com fome pode ser vontade ou necessidade, depende do contexto. Comprar algo só porque apareceu uma promoção no celular pode ser impulso. A diferença está no motivo e no planejamento.",
          [
            "Pegue sua lista de gastos.",
            "Marque com N o que é necessário.",
            "Marque com V o que é vontade.",
            "Marque com I o que foi impulso.",
            "Veja qual grupo está levando mais dinheiro.",
            "Escolha um gasto de impulso para evitar na próxima semana.",
            "Escolha uma vontade que pode continuar sem atrapalhar sua meta."
          ],
          [
            "Chamar toda vontade de erro. Evite isso separando lazer saudável de exagero.",
            "Cortar necessidade e manter impulso. Evite priorizando o que precisa ser pago.",
            "Achar que promoção sempre é economia. Evite comprando apenas o que já estava planejado."
          ],
          "Classifique 10 gastos seus em necessário, vontade ou impulso e escolha um impulso para cortar por 7 dias.",
          "Depois desta aula, você deve conseguir decidir melhor antes de gastar, sem precisar viver sem nada."
        ),
        fullLesson(
          "Como anotar sem complicar",
          "Muita gente desiste de controlar dinheiro porque tenta começar com uma planilha perfeita. Para começar, o melhor sistema é o que você realmente consegue usar. Pode ser bloco de notas, papel, WhatsApp com você mesmo ou uma planilha simples. O importante é anotar valor, motivo e data. Com essas três informações, você já consegue perceber padrões e corrigir erros.",
          "Se você gastou R$ 6 em lanche, anote: 28/04 - lanche - R$ 6. Se recebeu R$ 20, anote: 28/04 - recebi - R$ 20. No fim da semana, você soma entradas e saídas. Simples assim.",
          [
            "Escolha onde vai anotar: caderno, notas do celular ou planilha.",
            "Crie três colunas ou linhas: data, motivo e valor.",
            "Anote no mesmo dia, antes de esquecer.",
            "Use sinal de + para dinheiro que entra e - para dinheiro que sai.",
            "No fim do dia, confira se esqueceu algo.",
            "No fim da semana, some tudo.",
            "Ajuste o método para ficar fácil de manter."
          ],
          [
            "Querer um sistema bonito antes de funcionar. Evite priorizando simplicidade.",
            "Anotar só gastos grandes. Evite deixando tudo registrado.",
            "Esperar o mês acabar para lembrar. Evite anotando no momento ou no fim do dia."
          ],
          "Durante 3 dias, anote todos os valores que entrarem e saírem usando apenas data, motivo e valor.",
          "Depois desta aula, você deve ter um método simples para controlar dinheiro sem depender de ferramenta difícil."
        ),
      ],
    },
    {
      title: "Módulo 2 — Organizando gastos e dívidas",
      lessons: [
        fullLesson(
          "Separando dinheiro por prioridade",
          "Quando o dinheiro entra, ele precisa ter ordem. Se você gastar primeiro e pensar depois, sobra pouco ou nada para o que importa. Separar por prioridade significa decidir antes: o que precisa ser pago, o que será guardado, o que pode ser usado e o que deve esperar. Isso evita aquela sensação de receber e perder tudo rápido.",
          "Se você recebe R$ 100 e já sabe que deve R$ 11, precisa ajudar com R$ 20 e quer guardar para um monitor, o dinheiro não pode ficar todo misturado. Você pode separar mentalmente ou em envelopes: obrigações, meta e uso livre.",
          [
            "Anote o valor total que vai receber.",
            "Separe primeiro dívidas e compromissos combinados.",
            "Separe uma parte para sua meta principal.",
            "Defina um limite pequeno para uso livre.",
            "Não use dinheiro da meta para impulso.",
            "Revise se a divisão está realista.",
            "Ajuste na próxima entrada de dinheiro."
          ],
          [
            "Guardar só se sobrar. Evite separando a meta logo no começo.",
            "Separar valor alto demais e depois pegar de volta. Evite começar pequeno e constante.",
            "Ignorar dívidas pequenas. Evite porque dívida pequena acumulada vira peso."
          ],
          "Pegue um valor fictício ou real que você vai receber e divida em obrigações, meta e uso livre.",
          "Depois desta aula, você deve conseguir dar destino ao dinheiro antes que ele desapareça em gastos aleatórios."
        ),
        fullLesson(
          "Como lidar com dívidas pequenas",
          "Dívidas pequenas parecem fáceis de ignorar, mas elas ocupam sua cabeça e podem virar vergonha ou conflito. A melhor forma de lidar é listar, confirmar valores e pagar por ordem. Nem sempre dá para pagar tudo de uma vez, mas dá para parar de fingir que não existe. Quando você organiza dívidas pequenas, recupera confiança e fica mais livre para juntar dinheiro.",
          "Se você deve R$ 11 para uma pessoa e R$ 23 para outra coisa, não adianta gastar tudo e prometer pagar depois. Melhor separar uma parte, pagar o que for mais urgente e avisar quando vai quitar o resto.",
          [
            "Liste todas as dívidas pequenas.",
            "Coloque nome da pessoa ou motivo.",
            "Coloque valor exato.",
            "Marque quais têm prazo ou pressão maior.",
            "Pague primeiro as mais urgentes ou as menores, dependendo do caso.",
            "Avise com clareza se precisar de prazo.",
            "Depois que pagar, marque como quitada."
          ],
          [
            "Evitar falar sobre a dívida. Evite isso dando uma previsão realista.",
            "Pagar uma parte e esquecer o resto. Evite anotando saldo restante.",
            "Fazer dívida nova antes de quitar a antiga. Evite criando regra de não aumentar pendência."
          ],
          "Monte uma lista de dívidas pequenas com valor, pessoa/motivo, prazo e plano de pagamento.",
          "Depois desta aula, você deve ter um plano claro para quitar pendências sem se perder."
        ),
        fullLesson(
          "Como evitar gastar antes de receber",
          "Gastar antes de receber é quando você já promete ou compromete um dinheiro que ainda nem chegou. Às vezes isso acontece por ansiedade, pressão ou vontade de resolver tudo rápido. O perigo é que qualquer imprevisto quebra o plano. O ideal é planejar antes, mas só confirmar gastos quando o dinheiro estiver disponível ou quando for algo realmente certo.",
          "Você sabe que vai receber R$ 100 e já começa a combinar compras, dividir valores e prometer pagamento. Se o dinheiro atrasa, você fica preso. O plano era bom, mas dependia de algo que ainda não estava na sua mão.",
          [
            "Anote o dinheiro que você espera receber.",
            "Marque como previsto, não como disponível.",
            "Não faça compras contando com dinheiro incerto.",
            "Planeje o destino, mas espere cair para executar.",
            "Tenha uma versão reduzida do plano caso receba menos ou atrase.",
            "Evite prometer pagamento com horário exato se não tem certeza.",
            "Quando receber, siga a ordem de prioridade."
          ],
          [
            "Confundir dinheiro previsto com dinheiro real. Evite usando duas listas: previsto e disponível.",
            "Fazer promessa por pressão. Evite dizendo que confirma quando receber.",
            "Gastar a meta antes de começar. Evite separando a meta assim que o dinheiro cair."
          ],
          "Crie duas listas: dinheiro previsto e dinheiro disponível. Planeje sem gastar até o valor estar disponível.",
          "Depois desta aula, você deve conseguir planejar com calma sem se prender a dinheiro que ainda não chegou."
        ),
      ],
    },
    {
      title: "Módulo 3 — Guardando dinheiro com pouco",
      lessons: [
        fullLesson(
          "Criando uma meta simples",
          "Uma meta financeira boa precisa ser clara. Não basta dizer: quero guardar dinheiro. É melhor dizer: quero juntar R$ 300 para comprar um monitor. Quando a meta tem nome, valor e motivo, fica mais fácil resistir a gastos pequenos. A meta também precisa ser dividida em partes menores, porque valores grandes assustam quando você olha tudo de uma vez.",
          "Se você quer comprar um monitor, pode definir o valor aproximado, quanto já tem e quanto falta. Depois decide quanto consegue guardar por semana ou por cada dinheiro que receber. Mesmo R$ 5 ou R$ 10 já viram avanço quando são constantes.",
          [
            "Escolha uma meta principal.",
            "Coloque nome da meta.",
            "Pesquise ou estime o valor total.",
            "Anote quanto você já tem.",
            "Calcule quanto falta.",
            "Divida em pequenas partes semanais ou por recebimento.",
            "Deixe a meta visível para lembrar antes de gastar."
          ],
          [
            "Ter muitas metas ao mesmo tempo. Evite escolhendo uma prioridade principal.",
            "Não saber o valor da meta. Evite pesquisando uma média.",
            "Desistir porque falta muito. Evite olhando para a próxima parte, não só para o total."
          ],
          "Crie uma meta com nome, valor total, valor já guardado, valor faltando e primeiro passo.",
          "Depois desta aula, você deve ter uma meta clara e dividida em partes pequenas."
        ),
        fullLesson(
          "Como juntar mesmo ganhando pouco",
          "Juntar dinheiro ganhando pouco é difícil, mas não é impossível quando a meta é realista. O segredo é não depender de sobras grandes. Comece com valores pequenos e frequentes. Guardar R$ 5 toda vez que recebe pode parecer pouco, mas cria hábito. Depois você aumenta quando puder. O hábito vem antes do valor alto.",
          "Uma pessoa que tenta guardar R$ 50 de uma vez pode falhar e desistir. Mas se ela guarda R$ 5 ou R$ 10 sempre que recebe algo, cria movimento. O dinheiro cresce devagar, mas cresce.",
          [
            "Escolha um valor mínimo para guardar sempre.",
            "Guarde assim que receber, antes de gastar.",
            "Use um lugar separado: conta, envelope, caixinha ou anotação.",
            "Não misture dinheiro da meta com uso livre.",
            "Registre cada depósito, mesmo pequeno.",
            "Comemore avanço, não só resultado final.",
            "Aumente o valor apenas quando estiver confortável."
          ],
          [
            "Esperar sobrar muito. Evite começando com pouco.",
            "Guardar e retirar toda hora. Evite criando regra para mexer só em emergência real.",
            "Comparar sua meta com a de outra pessoa. Evite olhando sua realidade."
          ],
          "Escolha um valor mínimo para guardar nos próximos 4 recebimentos e anote onde esse dinheiro ficará separado.",
          "Depois desta aula, você deve conseguir começar uma reserva ou meta mesmo com pouco dinheiro."
        ),
        fullLesson(
          "Como não quebrar a meta no meio do mês",
          "Quebrar a meta é usar o dinheiro guardado para algo que não era o objetivo. Isso acontece quando a meta não tem proteção. Para evitar, você precisa dificultar o acesso, lembrar o motivo e ter um valor pequeno para uso livre. Se todo dinheiro fica preso na meta, qualquer vontade vira ameaça. Um plano bom deixa um pouco de liberdade e protege o principal.",
          "Se você guarda tudo para o monitor e fica sem nenhum valor para lanche ou lazer, pode acabar pegando da meta. Melhor guardar uma parte e deixar um uso livre pequeno. Assim você não sente que o plano é uma prisão.",
          [
            "Defina o dinheiro da meta como separado.",
            "Deixe um valor pequeno para uso livre.",
            "Coloque o motivo da meta em algum lugar visível.",
            "Antes de mexer na meta, espere 24 horas.",
            "Pergunte se o gasto aproxima ou afasta você do objetivo.",
            "Se precisar usar, anote o motivo e plano para repor.",
            "Volte para a meta no próximo recebimento."
          ],
          [
            "Guardar 100% e ficar sem nada para viver. Evite deixando uso livre pequeno.",
            "Usar meta por impulso. Evite criando regra de esperar antes.",
            "Desistir após pegar um pouco. Evite retomando no próximo valor recebido."
          ],
          "Crie 3 regras para proteger sua meta principal e uma regra de reposição se precisar usar parte do dinheiro.",
          "Depois desta aula, você deve saber proteger sua meta sem transformar organização financeira em sofrimento."
        ),
      ],
    },
    {
      title: "Módulo 4 — Plano final e certificado",
      lessons: [
        fullLesson(
          "Montando seu plano mensal",
          "O plano mensal junta tudo que você aprendeu: entradas, gastos, dívidas, meta e uso livre. Ele não precisa ser perfeito. Precisa ser claro o suficiente para guiar suas decisões. Um bom plano mensal mostra o que entra, o que sai primeiro, quanto vai para dívidas, quanto vai para meta e quanto sobra para usar sem culpa.",
          "Se você recebe valores pequenos durante o mês, pode fazer um plano por recebimento. Cada vez que entra dinheiro, você repete a ordem: compromisso, dívida, meta e uso livre. Isso funciona melhor do que esperar um mês inteiro para organizar.",
          [
            "Anote todas as entradas previstas do mês.",
            "Anote compromissos e dívidas.",
            "Defina o valor mínimo para sua meta.",
            "Defina uso livre realista.",
            "Crie uma ordem de prioridade.",
            "Revise o plano toda semana.",
            "Ajuste sem abandonar tudo."
          ],
          [
            "Fazer plano impossível. Evite usando valores reais.",
            "Não deixar margem para imprevisto. Evite sendo flexível.",
            "Abandonar o plano por um erro. Evite corrigindo na semana seguinte."
          ],
          "Monte um plano mensal simples com entradas, obrigações, dívidas, meta e uso livre.",
          "Depois desta aula, você deve ter um plano financeiro básico que consegue aplicar no mês atual."
        ),
        fullLesson(
          "Revisando erros e melhorando",
          "Organização financeira não é acertar sempre. É perceber erro mais rápido e ajustar. Talvez você gaste mais do que planejou, esqueça de anotar ou use parte da meta. Isso não significa fracasso. Significa que o plano precisa melhorar. Revisar evita que um erro pequeno vire desistência total.",
          "Se você planejou guardar R$ 20 e só conseguiu R$ 10, ainda existe progresso. A pergunta não é só quanto faltou, mas por que faltou. Foi gasto por impulso? O plano estava apertado? Apareceu emergência? Cada resposta melhora o próximo mês.",
          [
            "Compare plano e realidade.",
            "Veja onde gastou mais que o previsto.",
            "Identifique se foi necessidade, vontade ou impulso.",
            "Ajuste o valor da meta se estava impossível.",
            "Escolha um comportamento para melhorar na próxima semana.",
            "Mantenha o que funcionou.",
            "Recomece sem esperar o mês seguinte."
          ],
          [
            "Se culpar e parar de anotar. Evite tratando erro como informação.",
            "Fingir que nada aconteceu. Evite revisando toda semana.",
            "Aumentar meta sem base. Evite melhorar aos poucos."
          ],
          "Revise seu plano e escreva 3 ajustes para melhorar na próxima semana.",
          "Depois desta aula, você deve conseguir corrigir rota sem desistir da organização financeira."
        ),
        fullLesson(
          "Certificado de Conclusão — Curso Livre",
          "O certificado deste curso é um Certificado de Conclusão — Curso Livre. Ele registra que você concluiu as aulas e montou seu plano financeiro básico dentro da plataforma. Ele não transforma você em consultor financeiro e não substitui orientação profissional para casos complexos. A função dele é comprovar sua participação em um curso livre de organização pessoal.",
          "Depois de concluir as aulas, você terá um plano mensal simples, uma meta definida, uma lista de dívidas ou compromissos e regras para proteger seu dinheiro. Isso já é uma base prática para melhorar sua relação com dinheiro.",
          [
            "Conclua todas as aulas.",
            "Finalize seu plano mensal.",
            "Revise sua meta principal.",
            "Marque 100% do curso como concluído.",
            "Digite seu nome completo corretamente.",
            "Gere o certificado.",
            "Guarde uma cópia do certificado e do plano."
          ],
          [
            "Achar que certificado resolve sua vida financeira. Evite usando ele como registro de estudo, não solução mágica.",
            "Gerar certificado sem aplicar o plano. Evite finalizando o projeto primeiro.",
            "Parar de revisar depois do curso. Evite repetindo o plano todo mês."
          ],
          "Conclua o curso, finalize seu plano mensal e gere o Certificado de Conclusão — Curso Livre.",
          "Depois desta aula, você deve ter concluído o curso com um plano financeiro básico pronto para usar."
        ),
      ],
    },
  ],
  checklist: [
    "Mapear entradas e saídas",
    "Separar necessidade, vontade e impulso",
    "Listar dívidas pequenas",
    "Criar uma meta principal",
    "Montar plano mensal simples",
    "Revisar gastos semanalmente",
    "Concluir 100% das aulas para liberar Certificado de Conclusão — Curso Livre",
  ],
  finalProject: "Criar um plano financeiro mensal com gastos, dívidas, meta e regras de uso livre.",
};
