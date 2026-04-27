import { CourseContent, lesson } from "../courseTypes";

export const informaticaProfissional: CourseContent = {
  id: "informatica-profissional",
  title: "Informática Profissional do Zero",
  subtitle: "Aprenda computador, arquivos, internet, e-mail, documentos, apresentações e segurança digital para estudo e trabalho.",
  category: "Informática",
  level: "iniciante",
  duration: "36h",
  price: "Grátis",
  free: true,
  hero: "💻",
  outcome: "Usar computador e ferramentas digitais com segurança para estudar, trabalhar e resolver tarefas do dia a dia.",
  modules: [
    { title: "Base digital", lessons: [
      lesson("Computador, celular e arquivos", "Entenda pastas, downloads, documentos, imagens, PDFs e organização básica.", "Crie uma estrutura de pastas para estudos, documentos e imagens."),
      lesson("Navegador e pesquisa", "Como pesquisar melhor, abrir abas, baixar arquivos e evitar páginas suspeitas.", "Pesquise um tema e salve 3 links confiáveis em uma lista."),
      lesson("Contas e senhas", "Boas práticas para criar senhas fortes, proteger contas e evitar perda de acesso.", "Crie uma checklist de segurança para suas contas principais."),
    ]},
    { title: "Ferramentas essenciais", lessons: [
      lesson("Documentos de texto", "Como escrever, formatar títulos, usar listas e salvar em PDF.", "Crie um documento com capa simples, título e texto organizado."),
      lesson("Apresentações", "Como montar slides limpos, com pouco texto e visual organizado.", "Monte 5 slides sobre um tema escolar ou profissional."),
      lesson("Planilhas básicas", "Tabelas, soma, média, filtros e controle simples de informações.", "Crie uma planilha de gastos ou notas com soma e média."),
    ]},
    { title: "Internet profissional", lessons: [
      lesson("E-mail na prática", "Enviar, responder, anexar arquivos, organizar caixa de entrada e usar assunto correto.", "Envie um modelo de e-mail profissional para um professor ou cliente fictício."),
      lesson("Drive e nuvem", "Salvar, organizar, compartilhar arquivos e controlar permissões.", "Crie uma pasta na nuvem e organize documentos por categoria."),
      lesson("PDF e documentos", "Juntar, converter, compactar e enviar PDFs de forma organizada.", "Transforme um documento em PDF e escreva uma mensagem de envio."),
    ]},
    { title: "Projeto final", lessons: [
      lesson("Kit digital pessoal", "Crie documento, apresentação, planilha e pasta organizada para provar suas habilidades.", "Monte seu kit digital com os arquivos feitos no curso."),
      lesson("Checklist de revisão", "Revise nomes de arquivos, aparência, organização e segurança antes de entregar.", "Faça a revisão final do seu kit e marque o que está pronto."),
    ]},
  ],
  checklist: ["Organizo arquivos e pastas", "Uso navegador com segurança", "Crio documentos e PDFs", "Monto slides simples", "Faço planilhas básicas"],
  finalProject: "Criar um kit digital com documento formatado, apresentação, planilha simples e pasta organizada na nuvem.",
};
