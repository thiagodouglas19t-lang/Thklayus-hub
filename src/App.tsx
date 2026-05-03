import { useMemo, useState } from "react";

type Tab = "today" | "capture" | "board" | "archive";
type Drop = {
  id: number;
  title: string;
  tag: string;
  priority: "baixo" | "médio" | "alto";
  status: "novo" | "em análise" | "guardado";
  note: string;
};

const starterDrops: Drop[] = [
  { id: 1, title: "Ideia de app com mapa de locais vazios", tag: "Produto", priority: "alto", status: "novo", note: "Um app que mostra lugares tranquilos para estudar, gravar vídeo ou pensar." },
  { id: 2, title: "Logo preto e branco com símbolo secreto", tag: "Design", priority: "médio", status: "em análise", note: "Criar uma marca que parece simples, mas tem detalhe escondido." },
  { id: 3, title: "Página que muda conforme o humor do usuário", tag: "Experimento", priority: "baixo", status: "guardado", note: "Interface adaptativa com cards diferentes dependendo da escolha inicial." },
];

const tags = ["Produto", "Design", "Experimento", "Negócio", "Conteúdo", "Outro"];

export default function App() {
  const [tab, setTab] = useState<Tab>("today");
  const [drops, setDrops] = useState<Drop[]>(starterDrops);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState(tags[0]);
  const [priority, setPriority] = useState<Drop["priority"]>("médio");
  const [note, setNote] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos");

  const filtered = useMemo(() => selectedTag === "Todos" ? drops : drops.filter((drop) => drop.tag === selectedTag), [drops, selectedTag]);
  const highPriority = drops.filter((drop) => drop.priority === "alto").length;
  const activeDrops = drops.filter((drop) => drop.status !== "guardado").length;

  function addDrop() {
    if (!title.trim()) return;
    setDrops((current) => [{ id: Date.now(), title: title.trim(), tag, priority, status: "novo", note: note.trim() || "Sem descrição." }, ...current]);
    setTitle("");
    setNote("");
    setTab("board");
  }

  function updateStatus(id: number, status: Drop["status"]) {
    setDrops((current) => current.map((drop) => drop.id === id ? { ...drop, status } : drop));
  }

  function deleteDrop(id: number) {
    setDrops((current) => current.filter((drop) => drop.id !== id));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(168,85,247,0.24),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.14),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_22%)]" />
      <section className="relative mx-auto min-h-screen max-w-7xl px-5 py-5 md:px-8">
        <header className="flex items-center justify-between rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
          <button onClick={() => setTab("today")} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">D</div>
            <div>
              <p className="text-sm font-black tracking-tight">DropVault</p>
              <p className="text-xs font-bold text-zinc-500">Banco de ideias rápidas</p>
            </div>
          </button>
          <nav className="hidden gap-2 md:flex">
            {([['today','Hoje'],['capture','Capturar'],['board','Board'],['archive','Arquivo']] as [Tab,string][]).map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${tab === id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => setTab("capture")} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">+ Capturar</button>
        </header>

        {tab === "today" && (
          <div className="grid gap-6 py-6 lg:grid-cols-[1fr_380px]">
            <section className="rounded-[2.7rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Central de ideias</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-7xl">Capture antes que a ideia suma.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">Um app funcional para registrar ideias, separar por tema, decidir prioridade e mover cada uma entre novo, análise e arquivo.</p>
              <div className="mt-9 grid gap-4 md:grid-cols-3">
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Ideias</p><p className="mt-3 text-4xl font-black">{drops.length}</p></div>
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Ativas</p><p className="mt-3 text-4xl font-black">{activeDrops}</p></div>
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Prioridade alta</p><p className="mt-3 text-4xl font-black">{highPriority}</p></div>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <button onClick={() => setTab('capture')} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Nova ideia</button>
                <button onClick={() => setTab('board')} className="rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">Abrir board</button>
              </div>
            </section>
            <aside className="rounded-[2.7rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Últimos drops</p>
              <div className="mt-5 grid gap-3">{drops.slice(0, 4).map((drop) => <div key={drop.id} className="rounded-3xl border border-white/10 bg-black/35 p-4"><p className="font-black">{drop.title}</p><p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">{drop.tag} • {drop.priority}</p></div>)}</div>
            </aside>
          </div>
        )}

        {tab === "capture" && (
          <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8"><section className="w-full max-w-2xl rounded-[2.7rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Capturar drop</p><h2 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">Nova ideia.</h2><div className="mt-8 grid gap-4"><input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Nome da ideia" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><textarea value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Descreve rápido..." className="min-h-32 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" /><div className="grid gap-3 md:grid-cols-2"><select value={tag} onChange={(e)=>setTag(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none">{tags.map((item)=><option key={item}>{item}</option>)}</select><select value={priority} onChange={(e)=>setPriority(e.target.value as Drop['priority'])} className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"><option value="baixo">Baixo</option><option value="médio">Médio</option><option value="alto">Alto</option></select></div><button onClick={addDrop} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black">Salvar ideia</button></div></section></div>
        )}

        {tab === "board" && (
          <div className="py-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Board</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Suas ideias.</h2></div><select value={selectedTag} onChange={(e)=>setSelectedTag(e.target.value)} className="rounded-2xl border border-white/10 bg-black/70 px-5 py-4 text-sm font-black text-white outline-none"><option>Todos</option>{tags.map((item)=><option key={item}>{item}</option>)}</select></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((drop)=><article key={drop.id} className="rounded-[2.2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-200">{drop.tag}</p><h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">{drop.title}</h3></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase text-zinc-300">{drop.priority}</span></div><p className="mt-4 text-sm leading-6 text-zinc-400">{drop.note}</p><div className="mt-5 flex flex-wrap gap-2"><button onClick={()=>updateStatus(drop.id,'novo')} className="rounded-xl bg-black/40 px-3 py-2 text-xs font-black text-zinc-300">Novo</button><button onClick={()=>updateStatus(drop.id,'em análise')} className="rounded-xl bg-black/40 px-3 py-2 text-xs font-black text-zinc-300">Análise</button><button onClick={()=>updateStatus(drop.id,'guardado')} className="rounded-xl bg-black/40 px-3 py-2 text-xs font-black text-zinc-300">Guardar</button><button onClick={()=>deleteDrop(drop.id)} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-black text-zinc-500">Excluir</button></div><p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-zinc-600">Status: {drop.status}</p></article>)}</div></div>
        )}

        {tab === "archive" && (
          <div className="py-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">Arquivo</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Ideias guardadas.</h2><div className="mt-8 grid gap-4">{drops.filter((drop)=>drop.status === 'guardado').map((drop)=><div key={drop.id} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5"><p className="text-xl font-black">{drop.title}</p><p className="mt-2 text-sm text-zinc-500">{drop.note}</p></div>)}</div></div>
        )}

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/85 p-2 backdrop-blur-2xl md:hidden">
          {([['today','Hoje'],['capture','Add'],['board','Board'],['archive','Arquivo']] as [Tab,string][]).map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={`rounded-2xl px-3 py-3 text-[11px] font-black ${tab === id ? 'bg-white text-black' : 'text-zinc-500'}`}>{label}</button>)}
        </nav>
      </section>
    </main>
  );
}
