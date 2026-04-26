import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import ModalPix from "../components/ModalPix";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  categoria: string;
  pixCode: string;
};

const chavePixAleatoria = "5e5e7367-37bb-4f7b-9de2-eaeb0d3712a2";

const cursos: Curso[] = [
  { id: 1, titulo: "Informática Essencial", descricao: "Computador, arquivos, pastas, navegador, downloads, e-mail e ferramentas básicas.", preco: "R$ 14,90", aulas: 12, nivel: "Iniciante", categoria: "Informática", pixCode: chavePixAleatoria },
  { id: 2, titulo: "Pacote Office na Prática", descricao: "Word, PowerPoint e Excel para escola, trabalho, currículo e apresentações.", preco: "R$ 19,90", aulas: 15, nivel: "Profissional", categoria: "Informática", pixCode: chavePixAleatoria },
  { id: 3, titulo: "Excel para Vida Real", descricao: "Controle gastos, tabelas, cálculos, tarefas e planilhas úteis sem complicação.", preco: "R$ 17,90", aulas: 10, nivel: "Básico", categoria: "Informática", pixCode: chavePixAleatoria },
  { id: 4, titulo: "PowerPoint Profissional", descricao: "Slides bonitos para escola, reuniões, trabalhos, vendas e apresentações.", preco: "R$ 12,90", aulas: 9, nivel: "Prático", categoria: "Escola", pixCode: chavePixAleatoria },
  { id: 5, titulo: "Currículo e Primeiro Emprego", descricao: "Monte currículo, se apresente melhor e prepare documentos para oportunidades.", preco: "R$ 9,90", aulas: 8, nivel: "Essencial", categoria: "Carreira", pixCode: chavePixAleatoria },
  { id: 6, titulo: "Segurança Digital Básica", descricao: "Proteja contas, senhas, celular, e-mail e redes sociais contra golpes comuns.", preco: "R$ 9,90", aulas: 7, nivel: "Importante", categoria: "Segurança", pixCode: chavePixAleatoria },
  { id: 7, titulo: "Canva e Design Rápido", descricao: "Crie artes, posts, capas, banners e materiais bonitos para divulgação.", preco: "R$ 11,90", aulas: 8, nivel: "Criativo", categoria: "Design", pixCode: chavePixAleatoria },
  { id: 8, titulo: "Organização Financeira Simples", descricao: "Controle dinheiro, gastos, metas, compras e planilha financeira fácil.", preco: "R$ 9,90", aulas: 6, nivel: "Dia a dia", categoria: "Dinheiro", pixCode: chavePixAleatoria },
  { id: 9, titulo: "Google Drive e Ferramentas Online", descricao: "Use Drive, Docs, Planilhas, Forms e compartilhamento para estudar e trabalhar.", preco: "R$ 12,90", aulas: 9, nivel: "Online", categoria: "Informática", pixCode: chavePixAleatoria },
  { id: 10, titulo: "Trabalhos Escolares do Zero", descricao: "Aprenda estrutura, capa, introdução, desenvolvimento, conclusão e referências.", preco: "R$ 8,90", aulas: 7, nivel: "Escola", categoria: "Escola", pixCode: chavePixAleatoria },
  { id: 11, titulo: "Apresentação Sem Vergonha", descricao: "Treine fala, postura, roteiro e como apresentar sem travar tanto.", preco: "R$ 8,90", aulas: 6, nivel: "Comunicação", categoria: "Escola", pixCode: chavePixAleatoria },
  { id: 12, titulo: "Slides para Seminário", descricao: "Crie slides simples, bonitos e organizados para apresentar na escola.", preco: "R$ 10,90", aulas: 8, nivel: "Prático", categoria: "Escola", pixCode: chavePixAleatoria },
  { id: 13, titulo: "Resumo Inteligente", descricao: "Transforme textos grandes em resumos organizados para estudar melhor.", preco: "R$ 7,90", aulas: 5, nivel: "Estudo", categoria: "Escola", pixCode: chavePixAleatoria },
  { id: 14, titulo: "Canva para Posts", descricao: "Crie posts para Instagram, divulgação, loja, perfil e projetos escolares.", preco: "R$ 12,90", aulas: 9, nivel: "Criativo", categoria: "Design", pixCode: chavePixAleatoria },
  { id: 15, titulo: "Canva para Apresentações", descricao: "Monte apresentações bonitas usando templates, imagens, fontes e organização visual.", preco: "R$ 12,90", aulas: 9, nivel: "Criativo", categoria: "Design", pixCode: chavePixAleatoria },
  { id: 16, titulo: "Artes para Vender", descricao: "Aprenda a montar artes simples para clientes, escola, convites e divulgação.", preco: "R$ 14,90", aulas: 10, nivel: "Venda", categoria: "Design", pixCode: chavePixAleatoria },
  { id: 17, titulo: "Celular Produtivo", descricao: "Organize arquivos, apps, fotos, senhas e estudos usando só o celular.", preco: "R$ 9,90", aulas: 7, nivel: "Mobile", categoria: "Produtividade", pixCode: chavePixAleatoria },
  { id: 18, titulo: "Noções de IA para Estudo", descricao: "Use IA com responsabilidade para estudar, revisar ideias e organizar trabalhos.", preco: "R$ 13,90", aulas: 8, nivel: "Atual", categoria: "Produtividade", pixCode: chavePixAleatoria },
  { id: 19, titulo: "Organização de Rotina", descricao: "Monte rotina de estudos, tarefas, metas e organização semanal simples.", preco: "R$ 8,90", aulas: 6, nivel: "Foco", categoria: "Produtividade", pixCode: chavePixAleatoria },
  { id: 20, titulo: "E-mail Profissional", descricao: "Aprenda a criar, enviar, organizar e usar e-mail de forma profissional.", preco: "R$ 8,90", aulas: 6, nivel: "Básico", categoria: "Carreira", pixCode: chavePixAleatoria },
  { id: 21, titulo: "Atendimento ao Cliente", descricao: "Aprenda respostas, postura, organização de pedidos e suporte básico.", preco: "R$ 11,90", aulas: 8, nivel: "Serviço", categoria: "Carreira", pixCode: chavePixAleatoria },
  { id: 22, titulo: "Como Evitar Golpes Online", descricao: "Identifique golpes, links falsos, perfis suspeitos e promessas perigosas.", preco: "R$ 9,90", aulas: 7, nivel: "Proteção", categoria: "Segurança", pixCode: chavePixAleatoria },
  { id: 23, titulo: "Senhas e Contas Seguras", descricao: "Aprenda a proteger Gmail, redes sociais, autenticação e recuperação de conta.", preco: "R$ 9,90", aulas: 6, nivel: "Proteção", categoria: "Segurança", pixCode: chavePixAleatoria },
  { id: 24, titulo: "Dinheiro para Iniciantes", descricao: "Entenda gastos, lucro, preço, reserva, metas e controle simples do dinheiro.", preco: "R$ 8,90", aulas: 6, nivel: "Básico", categoria: "Dinheiro", pixCode: chavePixAleatoria },
  { id: 25, titulo: "Precificação de Serviços", descricao: "Aprenda a cobrar por slides, artes, trabalhos e pequenos serviços digitais.", preco: "R$ 12,90", aulas: 7, nivel: "Venda", categoria: "Dinheiro", pixCode: chavePixAleatoria },
  { id: 26, titulo: "Mini Negócio Digital", descricao: "Organize ideias, serviços, atendimento e entregas para vender pela internet.", preco: "R$ 16,90", aulas: 10, nivel: "Negócio", categoria: "Dinheiro", pixCode: chavePixAleatoria },
  { id: 27, titulo: "CapCut Básico", descricao: "Edite vídeos simples para apresentação, reels, divulgação e trabalhos.", preco: "R$ 11,90", aulas: 8, nivel: "Criativo", categoria: "Design", pixCode: chavePixAleatoria },
];

const categorias = ["Todos", ...Array.from(new Set(cursos.map((curso) => curso.categoria)))];

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [categoria, setCategoria] = useState("Todos");

  const cursosFiltrados = useMemo(() => {
    if (categoria === "Todos") return cursos;
    return cursos.filter((curso) => curso.categoria === categoria);
  }, [categoria]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs font-black uppercase text-zinc-500">
            {cursos.length} cursos disponíveis
          </span>

          <h2 className="mt-5 text-4xl font-black md:text-5xl">Cursos do THKLAYUS</h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Cursos úteis para escola, trabalho, informática, design, segurança, dinheiro e vida digital. Escolha um curso, pague pelo Pix, envie o comprovante e aguarde a liberação.
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {categorias.map((item) => (
          <button
            key={item}
            onClick={() => setCategoria(item)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black ${
              categoria === item ? "bg-white text-black" : "border border-zinc-800 bg-zinc-950 text-zinc-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {cursosFiltrados.map((curso) => (
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
