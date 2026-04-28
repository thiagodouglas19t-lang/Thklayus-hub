export type BookAge = "Crianças" | "Adolescentes" | "Jovens e adultos" | "Todas as idades";

export type EducationalBook = {
  id: string;
  title: string;
  subtitle: string;
  age: BookAge;
  category: string;
  readingTime: string;
  cover: string;
  description: string;
  chapters: {
    title: string;
    content: string;
    reflection: string;
    activity: string;
  }[];
};

export const educationalBooks: EducationalBook[] = [
  {
    id: "pequenos-habitos-grandes-mudancas",
    title: "Pequenos Hábitos, Grandes Mudanças",
    subtitle: "Um livro simples sobre rotina, disciplina e constância.",
    age: "Todas as idades",
    category: "Desenvolvimento pessoal",
    readingTime: "20 min",
    cover: "🌱",
    description: "Mostra como pequenas atitudes repetidas todos os dias podem melhorar estudos, organização, saúde e projetos pessoais.",
    chapters: [
      {
        title: "O poder do pequeno começo",
        content: "Muita gente desiste de melhorar porque tenta mudar tudo de uma vez. A pessoa decide estudar muitas horas, organizar tudo, acordar cedo, fazer exercícios e ainda criar um projeto novo no mesmo dia. O problema é que mudanças grandes demais cansam rápido. Um hábito pequeno é diferente: ele é fácil de repetir. Ler uma página, organizar a mochila, revisar uma aula por dez minutos ou separar a roupa do dia seguinte parece pouco, mas cria movimento. Quando você começa pequeno, diminui a chance de desistir e aumenta a chance de continuar.",
        reflection: "Qual pequena atitude você consegue repetir hoje sem depender de motivação?",
        activity: "Escolha um hábito de 5 minutos e anote quando vai fazer."
      },
      {
        title: "Constância vence empolgação",
        content: "Empolgação ajuda a começar, mas não sustenta tudo. Constância é fazer um pouco mesmo quando não está perfeito. Uma pessoa que estuda 15 minutos por dia aprende mais do que alguém que estuda 3 horas em um único dia e depois passa a semana sem revisar. O segredo é não esperar o momento ideal. Faça o possível com o tempo que tem. A repetição transforma uma ação difícil em algo normal.",
        reflection: "Você costuma depender de vontade para fazer suas tarefas?",
        activity: "Monte uma lista com 3 tarefas pequenas que podem ser feitas todos os dias."
      },
      {
        title: "Ambiente também ensina",
        content: "O lugar onde você vive influencia suas escolhas. Se o celular fica sempre aberto em redes sociais, estudar parece mais difícil. Se o material fica perdido, começar uma tarefa demora. Organizar o ambiente não precisa ser complicado. Deixe perto o que ajuda e afaste o que atrapalha. Um caderno visível, uma lista de tarefas e uma mesa menos bagunçada já tornam o começo mais fácil.",
        reflection: "O que no seu ambiente mais atrapalha sua concentração?",
        activity: "Organize um pequeno espaço de estudo ou trabalho por 10 minutos."
      }
    ]
  },
  {
    id: "internet-com-seguranca",
    title: "Internet com Segurança",
    subtitle: "Cuidados básicos para usar celular, senhas e links com mais atenção.",
    age: "Todas as idades",
    category: "Tecnologia",
    readingTime: "18 min",
    cover: "🛡️",
    description: "Ensina noções simples de segurança digital para evitar golpes, proteger contas e pensar antes de clicar.",
    chapters: [
      {
        title: "Senha não é detalhe",
        content: "Senha é como a chave de uma casa digital. Quando alguém descobre sua senha, pode entrar em contas, ver dados, apagar coisas ou fingir ser você. Uma senha fraca usa nome, data de nascimento ou sequência fácil. Uma senha melhor mistura palavras, números e símbolos, mas principalmente não deve ser repetida em todos os lugares. Se uma conta vaza, as outras continuam mais seguras.",
        reflection: "Você usa a mesma senha em muitos lugares?",
        activity: "Escolha uma conta importante e troque por uma senha mais forte."
      },
      {
        title: "Pense antes de clicar",
        content: "Links falsos podem chegar por mensagem, rede social, e-mail ou anúncios. Alguns prometem prêmio, desconto absurdo, emprego fácil ou urgência falsa. Antes de clicar, observe o endereço, a escrita da mensagem e se a proposta faz sentido. Quando estiver em dúvida, não informe senha, código ou dados pessoais. Procure o site oficial por conta própria.",
        reflection: "Que tipo de promessa falsa costuma chamar atenção das pessoas?",
        activity: "Analise uma mensagem antiga e veja se ela tinha sinais de golpe."
      },
      {
        title: "Privacidade no dia a dia",
        content: "Nem tudo precisa ser publicado. Fotos com documentos, endereço, rotina, escola, localização ou dados pessoais podem expor você e outras pessoas. Privacidade não é medo; é cuidado. Antes de postar, pense quem pode ver, salvar ou enviar para outros. Na internet, uma informação pequena pode virar problema quando chega na pessoa errada.",
        reflection: "Você já postou algo que depois achou melhor apagar?",
        activity: "Revise uma rede social e remova uma informação pessoal desnecessária."
      }
    ]
  },
  {
    id: "historias-para-pensar",
    title: "Histórias Curtas para Pensar",
    subtitle: "Pequenas histórias com lições sobre respeito, escolha e responsabilidade.",
    age: "Crianças",
    category: "Leitura e valores",
    readingTime: "15 min",
    cover: "📖",
    description: "Livro leve para leitura em família, escola ou sozinho, com perguntas e atividades simples.",
    chapters: [
      {
        title: "A mochila pesada",
        content: "Lia carregava uma mochila cheia todos os dias. Dentro dela tinha livros, brinquedos, papéis amassados e coisas que ela nem usava. Um dia, percebeu que chegava cansada antes mesmo da aula começar. Com ajuda, tirou o que não precisava e deixou apenas o necessário. A mochila ficou mais leve. Lia entendeu que às vezes a gente carrega coisas demais: objetos, preocupações e bagunças. Escolher o essencial ajuda a caminhar melhor.",
        reflection: "O que você carrega no dia a dia que poderia organizar melhor?",
        activity: "Organize sua mochila, mesa ou gaveta e separe o que não precisa."
      },
      {
        title: "O combinado do grupo",
        content: "Quatro amigos precisavam fazer um trabalho. No começo, cada um queria fazer do seu jeito. Um queria desenhar, outro escrever, outro falar e outro escolher as imagens. Eles discutiram até perceber que todos podiam ajudar de um jeito diferente. Criaram um combinado: cada um teria uma parte e todos revisariam juntos. O trabalho ficou melhor porque ninguém precisou fazer tudo sozinho.",
        reflection: "Por que combinar tarefas ajuda um grupo?",
        activity: "Crie um combinado simples para uma tarefa em dupla ou em família."
      },
      {
        title: "A palavra que conserta",
        content: "Pedro falou algo ruim sem pensar e deixou um colega triste. No começo, ficou com vergonha de pedir desculpa. Depois entendeu que desculpa não apaga tudo, mas mostra que a pessoa percebeu o erro e quer melhorar. Ele conversou, ouviu o colega e tentou agir diferente. Palavras podem machucar, mas também podem ajudar a consertar quando vêm com atitude.",
        reflection: "Por que pedir desculpa de verdade é diferente de falar só por obrigação?",
        activity: "Escreva uma frase educada para resolver um desentendimento."
      }
    ]
  },
  {
    id: "aprendendo-a-aprender",
    title: "Aprendendo a Aprender",
    subtitle: "Como estudar melhor sem decorar tudo de qualquer jeito.",
    age: "Adolescentes",
    category: "Estudos",
    readingTime: "22 min",
    cover: "🧠",
    description: "Mostra técnicas simples para entender, revisar e praticar conteúdos da escola ou cursos livres.",
    chapters: [
      {
        title: "Entender antes de decorar",
        content: "Decorar sem entender pode até ajudar em uma prova rápida, mas geralmente some da memória. Entender é conseguir explicar com suas palavras. Para estudar melhor, leia um trecho, pare e tente dizer o que ele significa. Se não conseguir explicar, volte e procure exemplos. Aprender não é só passar os olhos no texto; é transformar a informação em algo que faça sentido.",
        reflection: "Você consegue explicar o que estudou sem olhar o caderno?",
        activity: "Escolha um assunto e explique em voz alta como se ensinasse alguém."
      },
      {
        title: "Revisão curta funciona",
        content: "Revisar não precisa ser estudar tudo de novo. Uma revisão curta serve para lembrar o cérebro do que foi aprendido. Pode ser reler tópicos, responder perguntas, refazer um exercício ou olhar um resumo. Revisões pequenas em dias diferentes costumam funcionar melhor do que tentar aprender tudo na véspera.",
        reflection: "Você costuma revisar ou só estudar uma vez?",
        activity: "Crie três perguntas sobre um conteúdo e responda sem olhar."
      },
      {
        title: "Prática mostra a verdade",
        content: "A gente só descobre se aprendeu quando tenta fazer. Ler sobre matemática não substitui resolver questões. Ler sobre design não substitui criar uma arte. Ler sobre comunicação não substitui falar. A prática mostra dúvidas que pareciam escondidas. Por isso, todo estudo precisa gerar alguma ação.",
        reflection: "Qual assunto você está só lendo, mas ainda não praticou?",
        activity: "Faça um exercício real sobre algo que você estudou hoje."
      }
    ]
  }
];
