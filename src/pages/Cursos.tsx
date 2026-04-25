import { useState } from "react";
import CourseCard from "../components/CourseCard";
import ModalPix from "../components/ModalPix";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  pixCode: string;
};

const chavePixAleatoria = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";

const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Informática Essencial",
    descricao: "Aprenda a usar computador, arquivos, pastas, navegador, downloads, e-mail e ferramentas básicas do dia a dia.",
    preco: "R$ 14,90",
    aulas: 12,
    nivel: "Iniciante",
    pixCode: chavePixAleatoria,
  },
  {
    id: 2,
    titulo: "Pacote Office na Prática",
    descricao: "Word, PowerPoint e Excel para escola, trabalho, currículo, apresentações e organização pessoal.",
    preco: "R$ 19,90",
    aulas: 15,
    nivel: "Profissional",
    pixCode: chavePixAleatoria,
  },
  {
    id: 3,
    titulo: "Excel para Vida Real",
    descricao: "Controle gastos, monte tabelas, calcule valores, organize tarefas e crie planilhas úteis sem complicação.",
    preco: "R$ 17,90",
    aulas: 10,
    nivel: "Básico",
    pixCode: chavePixAleatoria,
  },
  {
    id: 4,
    titulo: "PowerPoint Profissional",
    descricao: "Crie slides bonitos para escola, reuniões, trabalhos, vendas e apresentações com aparência profissional.",
    preco: "R$ 12,90",
    aulas: 9,
    nivel: "Prático",
    pixCode: chavePixAleatoria,
  },
  {
    id: 5,
    titulo: "Currículo e Primeiro Emprego",
    descricao: "Aprenda a montar currículo, se apresentar melhor, organizar documentos e se preparar para oportunidades.",
    preco: "R$ 9,90",
    aulas: 8,
    nivel: "Essencial",
    pixCode: chavePixAleatoria,
  },
  {
    id: 6,
    titulo: "Segurança Digital Básica",
    descricao: "Proteja contas, senhas, celular, e-mail e redes sociais contra golpes comuns e erros perigosos.",
    preco: "R$ 9,90",
    aulas: 7,
    nivel: "Importante",
    pixCode: chavePixAleatoria,
  },
  {
    id: 7,
    titulo: "Canva e Design Rápido",
    descricao: "Crie artes simples, posts, capas, banners e materiais bonitos para escola, venda ou divulgação.",
    preco: "R$ 11,90",
    aulas: 8,
    nivel: "Criativo",
    pixCode: chavePixAleatoria,
  },
  {
    id: 8,
    titulo: "Organização Financeira Simples",
    descricao: "Aprenda a controlar dinheiro, gastos, metas, compras e organizar uma planilha financeira fácil.",
    preco: "R$ 9,90",
    aulas: 6,
    nivel: "Dia a dia",
    pixCode: chavePixAleatoria,
  },
  {
    id: 9,
    titulo: "Google Drive e Ferramentas Online",
    descricao: "Use Drive, Docs, Planilhas, Forms e compartilhamento para estudar, trabalhar e organizar arquivos.",
    preco: "R$ 12,90",
    aulas: 9,
    nivel: "Online",
    pixCode: chavePixAleatoria,
  },
];

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  return (
    <div>
      <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 md:p-8">
        <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">
          Cursos profissionais e baratos
        </span>

        <h2 className="mt-5 text-4xl font-black md:text-5xl">Cursos do THKLAYUS</h2>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Cursos úteis para escola, trabalho, informática, organização e vida digital. Escolha um curso, pague pelo Pix, envie o comprovante e aguarde a liberação.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {cursos.map((curso) => (
          <CourseCard
            key={curso.id}
            titulo={curso.titulo}
            descricao={curso.descricao}
            preco={curso.preco}
            nivel={curso.nivel}
            aulas={curso.aulas}
            onComprar={() => setCursoSelecionado(curso)}
          />
        ))}
      </div>

      <ModalPix
        open={Boolean(cursoSelecionado)}
        onClose={() => setCursoSelecionado(null)}
        cursoId={String(cursoSelecionado?.id ?? "")}
        titulo={cursoSelecionado?.titulo ?? ""}
        preco={cursoSelecionado?.preco ?? ""}
        pixCode={cursoSelecionado?.pixCode ?? ""}
      />
    </div>
  );
}
