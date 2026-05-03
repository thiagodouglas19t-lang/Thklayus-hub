import { useMemo, useState } from "react";

type Tab = "home" | "pulse" | "vault" | "profile";
type Mission = {
  id: number;
  title: string;
  category: string;
  time: string;
  xp: number;
  intensity: "leve" | "média" | "alta";
};

const missions: Mission[] = [
  { id: 1, title: "Modo 12 minutos", category: "Foco", time: "12 min", xp: 40, intensity: "leve" },
  { id: 2, title: "Desafio sem desculpa", category: "Ação", time: "7 min", xp: 55, intensity: "média" },
  { id: 3, title: "Limpeza mental", category: "Reset", time: "5 min", xp: 30, intensity: "leve" },
  { id: 4, title: "Criação rápida", category: "Criatividade", time: "15 min", xp: 70, intensity: "alta" },
];

const vaultItems = [
  "Sequência de foco profundo",
  "Ritual de reinício rápido",
  "Mapa de evolução semanal",
  "Protocolo anti-procrastinação",
];

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const totalXp = useMemo(() => completed.reduce((sum, id) => sum + (missions.find((mission) => mission.id === id)?.xp ?? 0), 240), [completed]);
  const level = Math.floor(totalXp / 100) + 1;
  const progress = totalXp % 100;

  function completeMission() {
    if (!activeMission) return;
    setCompleted((current) => (current.includes(activeMission.id) ? current : [...current, activeMission.id]));
    setActiveMission(null);
    setTab("profile");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(124,58,237,0.36),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.10),transparent_24%),radial-gradient(circle_at_55%_100%,rgba(76,29,149,0.32),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:46px_46px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 md:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4 rounded-[1.8rem] border border-white/10 bg-white/[0.045] px-4 py-4 backdrop-blur-2xl md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-lg font-black text-black">T</div>
            <div>
              <p className="text-sm font-black tracking-tight">THKLAYUS OS</p>
              <p className="text-xs font-bold text-zinc-500">Sistema privado de evolução</p>
            </div>
          </div>
          <nav className="hidden gap-2 md:flex">
            {([
              ["home", "Início"],
              ["pulse", "Missões"],
              ["vault", "Vault"],
              ["profile", "Perfil"],
            ] as [Tab, string][]).map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} className={`rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition ${tab === id ? "bg-white text-black" : "text-zinc-400 hover:bg-white/10 hover:text-white"}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="rounded-2xl border border-violet-300/20 bg-violet-400/10 px-4 py-3 text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-200">Nível</p>
            <p className="text-lg font-black">{level}</p>
          </div>
        </header>

        <div className="grid flex-1 gap-6 py-6 lg:grid-cols-[1fr_380px]">
          <section className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl md:p-8">
            {tab === "home" && (
              <div className="grid min-h-[620px] content-between gap-10">
                <div>
                  <p className="inline-flex rounded-full border border-violet-300/20 bg-violet-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-violet-100">Produto experimental</p>
                  <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-7xl lg:text-8xl">Transforme intenção em execução.</h1>
                  <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">Um sistema minimalista para escolher uma missão curta, executar sem enrolar e acumular progresso real dentro do seu próprio painel.</p>
                  <div className="mt-9 flex flex-wrap gap-3">
                    <button onClick={() => setTab("pulse")} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] active:scale-[0.98]">Começar agora</button>
                    <button onClick={() => setTab("vault")} className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/10">Ver vault</button>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {["Missões curtas", "XP visual", "Fluxo premium"].map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-black/35 p-5">
                      <p className="text-sm font-black text-white">{item}</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-500">Criado para abrir, escolher e agir rápido.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "pulse" && (
              <div>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Pulse Center</p>
                    <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">Escolha uma missão.</h2>
                  </div>
                  <p className="max-w-sm text-sm leading-6 text-zinc-500">Cada missão foi feita para ser pequena o bastante para começar agora.</p>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {missions.map((mission) => {
                    const done = completed.includes(mission.id);
                    return (
                      <button key={mission.id} onClick={() => setActiveMission(mission)} className="group rounded-[2rem] border border-white/10 bg-black/35 p-5 text-left transition hover:-translate-y-1 hover:border-violet-300/30 hover:bg-violet-400/10">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">{mission.category}</p>
                            <h3 className="mt-4 text-2xl font-black tracking-[-0.05em] text-white">{mission.title}</h3>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${done ? "bg-white text-black" : "bg-white/10 text-zinc-300"}`}>{done ? "feito" : `+${mission.xp} XP`}</span>
                        </div>
                        <div className="mt-6 flex gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                          <span>{mission.time}</span><span>•</span><span>{mission.intensity}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "vault" && (
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Vault</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">Protocolos salvos.</h2>
                <div className="mt-8 grid gap-4">
                  {vaultItems.map((item, index) => (
                    <div key={item} className="rounded-[2rem] border border-white/10 bg-black/35 p-5">
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-600">Arquivo {String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">{item}</h3>
                      <p className="mt-3 text-sm leading-6 text-zinc-500">Bloqueado para a próxima versão do produto.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "profile" && (
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-200">Perfil operacional</p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.06em] md:text-6xl">Seu progresso.</h2>
                <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-zinc-500">XP total</p>
                      <p className="mt-2 text-6xl font-black tracking-[-0.08em]">{totalXp}</p>
                    </div>
                    <p className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black">Nível {level}</p>
                  </div>
                  <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-4 text-sm text-zinc-500">{progress}/100 XP para o próximo nível</p>
                </div>
              </div>
            )}
          </section>

          <aside className="grid gap-6">
            <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Status</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.06em]">Sistema ativo</h3>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-black/35 p-4"><p className="text-2xl font-black">{completed.length}</p><p className="mt-1 text-xs font-bold text-zinc-500">missões feitas</p></div>
                <div className="rounded-3xl bg-black/35 p-4"><p className="text-2xl font-black">4</p><p className="mt-1 text-xs font-bold text-zinc-500">disponíveis</p></div>
              </div>
            </div>

            <div className="rounded-[2.4rem] border border-violet-300/20 bg-violet-400/10 p-5 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-100">Missão selecionada</p>
              {activeMission ? (
                <div>
                  <h3 className="mt-4 text-3xl font-black tracking-[-0.06em]">{activeMission.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-violet-100/70">Execute essa missão agora. Quando terminar, marque como concluída para ganhar XP.</p>
                  <button onClick={completeMission} className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] active:scale-[0.98]">Concluir missão</button>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-violet-100/70">Escolha uma missão na aba Missões para iniciar o fluxo.</p>
              )}
            </div>
          </aside>
        </div>

        <nav className="fixed bottom-4 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 justify-between rounded-[1.5rem] border border-white/10 bg-black/80 p-2 backdrop-blur-2xl md:hidden">
          {([
            ["home", "Início"],
            ["pulse", "Missões"],
            ["vault", "Vault"],
            ["profile", "Perfil"],
          ] as [Tab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} className={`rounded-2xl px-3 py-3 text-[11px] font-black ${tab === id ? "bg-white text-black" : "text-zinc-500"}`}>{label}</button>
          ))}
        </nav>
      </section>
    </main>
  );
}
