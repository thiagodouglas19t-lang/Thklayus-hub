import { useEffect, useMemo, useState } from "react";

type Note = {
  id: string;
  title: string;
  type: "Ideia" | "Tarefa" | "Projeto" | "Lembrete";
  done: boolean;
  createdAt: number;
};

const STORAGE_KEY = "aprendaja_space_notes_v1";

function loadNotes(): Note[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Note["type"]>("Ideia");
  const [filter, setFilter] = useState<"Todos" | Note["type"]>("Todos");

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const visibleNotes = useMemo(() => {
    if (filter === "Todos") return notes;
    return notes.filter((note) => note.type === filter);
  }, [notes, filter]);

  const doneCount = notes.filter((note) => note.done).length;
  const activeCount = notes.length - doneCount;

  function addNote() {
    const clean = title.trim();
    if (!clean) return;

    const note: Note = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: clean,
      type,
      done: false,
      createdAt: Date.now(),
    };

    setNotes((current) => [note, ...current]);
    setTitle("");
  }

  function toggleNote(id: string) {
    setNotes((current) => current.map((note) => note.id === id ? { ...note, done: !note.done } : note));
  }

  function removeNote(id: string) {
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  return (
    <div className="space-y-6 pb-4">
      <section className="relative overflow-hidden rounded-[3rem] border border-violet-300/15 bg-[#020003] p-6 shadow-2xl shadow-violet-950/30 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.34),transparent_34%),radial-gradient(circle_at_90%_20%,rgba(124,58,237,0.14),transparent_30%)]" />
        <div className="relative">
          <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-violet-100">
            Espaço pessoal
          </span>

          <h1 className="mt-6 text-6xl font-black leading-[0.88] tracking-[-0.09em] text-white md:text-8xl">
            Guarda tudo.
          </h1>

          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-zinc-400 md:text-lg">
            Um lugar simples para jogar ideias, tarefas, lembretes e projetos sem bagunçar a cabeça.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-3xl font-black text-white">{notes.length}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">itens</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-3xl font-black text-white">{activeCount}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">ativos</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-3xl font-black text-white">{doneCount}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-zinc-500">feitos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">Novo item</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-white">O que você quer guardar?</h2>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter") addNote(); }}
            placeholder="Ex: ideia de app, tarefa da escola, lembrete..."
            className="min-h-14 rounded-2xl border border-white/10 bg-black px-5 text-base font-bold text-white outline-none placeholder:text-zinc-600 focus:border-violet-300/50"
          />
          <button onClick={addNote} className="min-h-14 rounded-2xl bg-white px-6 text-sm font-black text-black active:scale-95">
            Guardar
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["Ideia", "Tarefa", "Projeto", "Lembrete"] as Note["type"][]).map((item) => (
            <button key={item} onClick={() => setType(item)} className={`rounded-full px-4 py-2 text-xs font-black transition ${type === item ? "bg-violet-300 text-black" : "border border-white/10 bg-black/40 text-zinc-400"}`}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="flex gap-2 overflow-x-auto pb-1">
        {(["Todos", "Ideia", "Tarefa", "Projeto", "Lembrete"] as ("Todos" | Note["type"])[]).map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-black transition active:scale-95 ${filter === item ? "bg-violet-300 text-black" : "border border-white/10 bg-white/[0.04] text-zinc-400"}`}>
            {item}
          </button>
        ))}
      </section>

      <section className="space-y-3">
        {visibleNotes.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-xl font-black text-white">Nada aqui ainda.</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-zinc-500">Guarde uma ideia, tarefa ou lembrete para começar.</p>
          </div>
        ) : (
          visibleNotes.map((note) => (
            <article key={note.id} className={`rounded-[2rem] border p-4 transition ${note.done ? "border-emerald-300/20 bg-emerald-500/10" : "border-white/10 bg-white/[0.035]"}`}>
              <div className="flex items-center gap-3">
                <button onClick={() => toggleNote(note.id)} className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-black ${note.done ? "bg-emerald-300 text-black" : "border border-white/10 bg-black text-white"}`}>
                  {note.done ? "✓" : ""}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`text-base font-black leading-6 ${note.done ? "text-emerald-100 line-through decoration-emerald-300/70" : "text-white"}`}>{note.title}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.15em] text-zinc-500">{note.type}</p>
                </div>
                <button onClick={() => removeNote(note.id)} className="rounded-xl px-3 py-2 text-sm font-black text-zinc-600 active:scale-95">
                  ×
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
