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

const trilhas = [
  { nome: "Iniciante Digital", desc: "Comece do zero e aprenda o essencial para estudar e trabalhar.", cursos: ["Informática Essencial", "Google Drive", "E-mail Profissional", "Segurança Digital"], icon: "💻" },
  { nome: "Escola Pro", desc: "Trabalhos, resumos, slides e apresentação com cara profissional.", cursos: ["Trabalhos Escolares", "PowerPoint", "Seminário", "Resumo Inteligente"], icon: "📚" },
  { nome: "Renda Digital", desc: "Aprenda serviços simples para vender usando celular e criatividade.", cursos: ["Canva", "Artes", "Precificação", "Mini Negócio"], icon: "🚀" },
];

const categorias = ["Todos", ...Array.from(new Set(cursos.map((curso) => curso.categoria)))];

function modulosDoCurso(curso: Curso) {
  return [
    "Boas-vindas e objetivo do curso",
    `Fundamentos de ${curso.titulo}`,
    "Aula prática guiada",
    "Exercício para aplicar sozinho",
    "Checklist final e próximos passos",
  ];
}

export default function Cursos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);
  const [cursoDetalhes, setCursoDetalhes] = useState<Curso | null>(null);
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const cursoDestaque = cursos[25];

  const cursosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();
    return cursos.filter((curso) => {
      const matchCategoria = categoria === "Todos" || curso.categoria === categoria;
      const matchBusca = !termo || `${curso.titulo} ${curso.descricao} ${curso.categoria} ${curso.nivel}`.toLowerCase().includes(termo);
      return matchCategoria && matchBusca;
    });
  }, [categoria, busca]);

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_70%_100%,rgba(16,185,129,0.16),transparent_32%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="rounded-full border border-blue-300/25 bg-blue-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100">AprendaJá • THKLAYUS</span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-[-0.06em] text-white md:text-6xl">Cursos rápidos, práticos e com cara de plataforma premium.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">Aprenda escola, tecnologia, design, segurança e renda digital com aulas curtas, linguagem simples, compra rastreada e suporte interno.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[`${cursos.length} cursos`, "ID de compra", "Certificado em breve"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-center text-sm font-black text-zinc-200">{item}</div>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/45 p-5 shadow-xl shadow-blue-500/10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Curso destaque</p>
            <h3 className="mt-3 text-3xl font-black text-white">{cursoDestaque.titulo}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{cursoDestaque.descricao}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-zinc-300">{cursoDestaque.aulas} aulas</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-zinc-300">{cursoDestaque.nivel}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-zinc-300">{cursoDestaque.categoria}</span>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-4xl font-black text-emerald-200">{cursoDestaque.preco}</p>
              <button onClick={() => setCursoDetalhes(cursoDestaque)} className="rounded-2xl bg-white px-5 py-3 font-black text-black transition active:scale-95">Ver detalhes</button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {trilhas.map((trilha) => (
          <div key={trilha.nome} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl">{trilha.icon}</span>
              <div><h3 className="text-xl font-black text-white">{trilha.nome}</h3><p className="mt-1 text-sm leading-6 text-zinc-400">{trilha.desc}</p></div>
            </div>
            <div className="mt-4 space-y-2">{trilha.cursos.map((nome) => <p key={nome} className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm font-bold text-zinc-300">✓ {nome}</p>)}</div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar curso: Canva, escola, Excel, segurança..." className="min-h-12 rounded-2xl border border-white/10 bg-black/45 px-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600 focus:border-blue-300/40" />
          <div className="flex gap-2 overflow-x-auto">{categorias.map((item) => <button key={item} onClick={() => setCategoria(item)} className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-black transition active:scale-95 ${categoria === item ? "bg-white text-black" : "border border-white/10 bg-black/35 text-zinc-400 hover:text-white"}`}>{item}</button>)}</div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[["Compra rastreada", "ID do usuário, curso e compra."], ["Aulas práticas", "Conteúdo direto para aplicar."], ["Feito para celular", "Aprenda sem precisar de computador."], ["Suporte interno", "Tickets e chat no próprio app."]].map(([title, text]) => <div key={title} className="rounded-3xl border border-white/10 bg-black/35 p-5"><h3 className="font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>)}
      </section>

      <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Catálogo</p><h2 className="mt-2 text-3xl font-black text-white">Cursos disponíveis</h2></div><p className="text-sm font-bold text-zinc-500">{cursosFiltrados.length} encontrados</p></div>

      <div className="grid gap-5 md:grid-cols-3">{cursosFiltrados.map((curso) => <div key={curso.id} className="space-y-3"><CourseCard titulo={curso.titulo} descricao={curso.descricao} preco={curso.preco} nivel={curso.nivel} aulas={curso.aulas} onComprar={() => setCursoSelecionado(curso)} /><button onClick={() => setCursoDetalhes(curso)} className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-black text-zinc-200 transition active:scale-95">Ver detalhes do curso</button></div>)}</div>
      {cursosFiltrados.length === 0 && <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-zinc-500">Nenhum curso encontrado com esse filtro.</div>}

      {cursoDetalhes && (
        <div className="fixed inset-0 z-[80] grid place-items-end bg-black/75 p-3 backdrop-blur-sm md:place-items-center">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/10 bg-zinc-950 p-5 shadow-2xl md:p-7">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-blue-300">Detalhes do curso</p><h2 className="mt-2 text-3xl font-black text-white">{cursoDetalhes.titulo}</h2><p className="mt-2 text-zinc-400">{cursoDetalhes.descricao}</p></div><button onClick={() => setCursoDetalhes(null)} className="rounded-2xl border border-white/10 px-4 py-2 font-black text-zinc-300">X</button></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs text-zinc-500">Aulas</p><p className="text-2xl font-black">{cursoDetalhes.aulas}</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs text-zinc-500">Nível</p><p className="text-2xl font-black">{cursoDetalhes.nivel}</p></div><div className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs text-zinc-500">Preço</p><p className="text-2xl font-black text-emerald-200">{cursoDetalhes.preco}</p></div></div>
            <h3 className="mt-6 text-xl font-black text-white">O que tem dentro</h3><div className="mt-3 space-y-2">{modulosDoCurso(cursoDetalhes).map((modulo, index) => <div key={modulo} className="flex gap-3 rounded-2xl border border-white/10 bg-black/35 p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{index + 1}</span><p className="font-bold text-zinc-300">{modulo}</p></div>)}</div>
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100"><p className="font-black">Bônus em desenvolvimento</p><p className="mt-1">Certificado, progresso do aluno e área de conclusão serão adicionados nas próximas versões.</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => { setCursoSelecionado(cursoDetalhes); setCursoDetalhes(null); }} className="rounded-2xl bg-white px-5 py-4 font-black text-black">Comprar agora</button><button onClick={() => setCursoDetalhes(null)} className="rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Voltar ao catálogo</button></div>
          </div>
        </div>
      )}

      <ModalPix open={Boolean(cursoSelecionado)} onClose={() => setCursoSelecionado(null)} cursoId={String(cursoSelecionado?.id ?? "")} titulo={cursoSelecionado?.titulo ?? ""} preco={cursoSelecionado?.preco ?? ""} pixCode={cursoSelecionado?.pixCode ?? ""} />
    </div>
  );
}
