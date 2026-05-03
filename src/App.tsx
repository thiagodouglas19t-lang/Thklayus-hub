import { useMemo, useState } from "react";

type Tab = "dashboard" | "add" | "history" | "goals";
type Transaction = {
  id: number;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
};

const initialTransactions: Transaction[] = [
  { id: 1, title: "Pix recebido", category: "Entrada", amount: 100, type: "income", date: "Hoje" },
  { id: 2, title: "Bolo", category: "Comida", amount: 23, type: "expense", date: "Hoje" },
  { id: 3, title: "Dívida", category: "Conta", amount: 11, type: "expense", date: "Ontem" },
];

const categories = ["Comida", "Transporte", "Conta", "Lazer", "Entrada", "Outros"];

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [type, setType] = useState<"income" | "expense">("expense");
  const [goal, setGoal] = useState(300);

  const income = useMemo(() => transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0), [transactions]);
  const expenses = useMemo(() => transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + item.amount, 0), [transactions]);
  const balance = income - expenses;
  const goalProgress = Math.min(100, Math.max(0, (balance / goal) * 100));

  function addTransaction() {
    const parsed = Number(amount.replace(",", "."));
    if (!title.trim() || !Number.isFinite(parsed) || parsed <= 0) return;
    setTransactions((current) => [
      { id: Date.now(), title: title.trim(), category, amount: parsed, type, date: "Agora" },
      ...current,
    ]);
    setTitle("");
    setAmount("");
    setTab("dashboard");
  }

  function removeTransaction(id: number) {
    setTransactions((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(34,197,94,0.22),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.16),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent_22%)]" />
      <section className="relative mx-auto min-h-screen max-w-7xl px-5 py-5 md:px-8">
        <header className="flex items-center justify-between rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
          <button onClick={() => setTab("dashboard")} className="flex items-center gap-3 rounded-2xl px-2 py-2 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">F</div>
            <div>
              <p className="text-sm font-black tracking-tight">Fluxo</p>
              <p className="text-xs font-bold text-zinc-500">Controle financeiro</p>
            </div>
          </button>
          <nav className="hidden gap-2 md:flex">
            {([['dashboard','Painel'],['add','Adicionar'],['history','Histórico'],['goals','Meta']] as [Tab,string][]).map(([id,label]) => (
              <button key={id} onClick={() => setTab(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${tab === id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}>{label}</button>
            ))}
          </nav>
          <button onClick={() => setTab("add")} className="rounded-2xl bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black">+ Lançar</button>
        </header>

        {tab === "dashboard" && (
          <div className="grid gap-6 py-6 lg:grid-cols-[1fr_380px]">
            <section className="rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Painel financeiro</p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.08em] md:text-7xl">R$ {balance.toFixed(2).replace('.', ',')}</h1>
              <p className="mt-3 text-sm font-bold text-zinc-500">Saldo atual calculado pelos seus lançamentos.</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Entradas</p><p className="mt-3 text-3xl font-black text-emerald-200">R$ {income.toFixed(2).replace('.', ',')}</p></div>
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Saídas</p><p className="mt-3 text-3xl font-black text-red-200">R$ {expenses.toFixed(2).replace('.', ',')}</p></div>
                <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5"><p className="text-sm text-zinc-500">Lançamentos</p><p className="mt-3 text-3xl font-black">{transactions.length}</p></div>
              </div>
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-5">
                <div className="flex items-center justify-between"><p className="text-sm font-bold text-zinc-400">Meta de reserva</p><p className="text-sm font-black">{goalProgress.toFixed(0)}%</p></div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${goalProgress}%` }} /></div>
                <p className="mt-3 text-sm text-zinc-500">R$ {balance.toFixed(2).replace('.', ',')} de R$ {goal.toFixed(2).replace('.', ',')}</p>
              </div>
            </section>
            <aside className="rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Recentes</p>
              <div className="mt-5 grid gap-3">{transactions.slice(0,5).map((item)=><div key={item.id} className="rounded-3xl border border-white/10 bg-black/35 p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-black">{item.title}</p><p className="mt-1 text-xs font-bold text-zinc-500">{item.category} • {item.date}</p></div><p className={`font-black ${item.type === 'income' ? 'text-emerald-200' : 'text-red-200'}`}>{item.type === 'income' ? '+' : '-'}R$ {item.amount.toFixed(2).replace('.', ',')}</p></div></div>)}</div>
            </aside>
          </div>
        )}

        {tab === "add" && (
          <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8">
            <section className="w-full max-w-2xl rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Novo lançamento</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">Adicionar valor.</h2>
              <div className="mt-8 grid gap-4">
                <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Nome: mercado, pix, lanche..." className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" />
                <input value={amount} onChange={(e)=>setAmount(e.target.value)} inputMode="decimal" placeholder="Valor: 25,50" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white/30" />
                <div className="grid gap-3 md:grid-cols-2">
                  <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none">{categories.map((item)=><option key={item}>{item}</option>)}</select>
                  <select value={type} onChange={(e)=>setType(e.target.value as 'income' | 'expense')} className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"><option value="expense">Saída</option><option value="income">Entrada</option></select>
                </div>
                <button onClick={addTransaction} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.01] active:scale-[0.98]">Salvar lançamento</button>
              </div>
            </section>
          </div>
        )}

        {tab === "history" && (
          <div className="py-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Histórico</p><h2 className="mt-3 text-5xl font-black tracking-[-0.08em] md:text-7xl">Todos os lançamentos.</h2><div className="mt-8 grid gap-3">{transactions.map((item)=><div key={item.id} className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl"><div><p className="text-xl font-black tracking-[-0.04em]">{item.title}</p><p className="mt-1 text-sm text-zinc-500">{item.category} • {item.date}</p></div><div className="flex items-center gap-3"><p className={`font-black ${item.type === 'income' ? 'text-emerald-200' : 'text-red-200'}`}>{item.type === 'income' ? '+' : '-'}R$ {item.amount.toFixed(2).replace('.', ',')}</p><button onClick={()=>removeTransaction(item.id)} className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-xs font-black text-zinc-400">Excluir</button></div></div>)}</div></div>
        )}

        {tab === "goals" && (
          <div className="grid min-h-[calc(100vh-120px)] place-items-center py-8"><section className="w-full max-w-2xl rounded-[2.6rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8"><p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Meta</p><h2 className="mt-3 text-4xl font-black tracking-[-0.07em] md:text-6xl">Defina sua reserva.</h2><p className="mt-4 text-zinc-500">Meta atual: R$ {goal.toFixed(2).replace('.', ',')}</p><input value={goal} onChange={(e)=>setGoal(Number(e.target.value) || 0)} type="number" className="mt-8 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none focus:border-white/30" /><div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white" style={{ width: `${goalProgress}%` }} /></div></section></div>
        )}

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/85 p-2 backdrop-blur-2xl md:hidden">
          {([['dashboard','Painel'],['add','Add'],['history','Histórico'],['goals','Meta']] as [Tab,string][]).map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={`rounded-2xl px-3 py-3 text-[11px] font-black ${tab === id ? 'bg-white text-black' : 'text-zinc-500'}`}>{label}</button>)}
        </nav>
      </section>
    </main>
  );
}
