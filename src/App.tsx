import { useEffect, useMemo, useState } from "react";

type Stage = "idle" | "scan" | "signal" | "choice" | "result";
type Mood = "silence" | "pulse" | "mirror";

const fragments = [
  "não responda rápido demais",
  "a tela percebeu sua presença",
  "um padrão acabou de mudar",
  "tem algo escondido no intervalo",
  "você não está atrasado",
  "o próximo toque decide o clima",
];

const cards = [
  {
    id: "silence" as Mood,
    label: "Silêncio",
    title: "Modo baixo ruído",
    text: "O app reduz distrações e entrega uma única instrução por vez.",
  },
  {
    id: "pulse" as Mood,
    label: "Pulso",
    title: "Modo impulso",
    text: "O app cria uma sequência curta para te colocar em movimento.",
  },
  {
    id: "mirror" as Mood,
    label: "Espelho",
    title: "Modo reflexão",
    text: "O app devolve uma pergunta estranha para destravar sua cabeça.",
  },
];

const outputs: Record<Mood, string[]> = {
  silence: [
    "Feche as abas que não importam.",
    "Escolha uma coisa pequena.",
    "Faça em silêncio por 7 minutos.",
  ],
  pulse: [
    "Levanta agora.",
    "Pega água.",
    "Volta e executa a menor parte possível.",
  ],
  mirror: [
    "O que você está adiando porque parece pequeno demais?",
    "Qual ação simples resolveria 10% do problema?",
    "O que você faria se ninguém pudesse opinar?",
  ],
};

function randomFragment() {
  return fragments[Math.floor(Math.random() * fragments.length)];
}

export default function App() {
  const [stage, setStage] = useState<Stage>("idle");
  const [fragment, setFragment] = useState(randomFragment());
  const [mood, setMood] = useState<Mood>("silence");
  const [count, setCount] = useState(0);

  const progress = useMemo(() => {
    if (stage === "idle") return 8;
    if (stage === "scan") return 38;
    if (stage === "signal") return 67;
    if (stage === "choice") return 84;
    return 100;
  }, [stage]);

  useEffect(() => {
    const timer = window.setInterval(() => setFragment(randomFragment()), 2400);
    return () => window.clearInterval(timer);
  }, []);

  function begin() {
    setCount((value) => value + 1);
    setStage("scan");
    window.setTimeout(() => setStage("signal"), 900);
    window.setTimeout(() => setStage("choice"), 1800);
  }

  function selectMood(nextMood: Mood) {
    setMood(nextMood);
    setStage("result");
  }

  function reset() {
    setStage("idle");
    setFragment(randomFragment());
  }

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(124,58,237,0.28),transparent_32%),radial-gradient(circle_at_85%_85%,rgba(255,255,255,0.10),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-7 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-violet-300/80">THKLAYUS</p>
            <h1 className="mt-2 text-lg font-black tracking-tight text-white sm:text-2xl">Projeto desconhecido</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400 backdrop-blur-xl">
            Sessão {String(count + 1).padStart(2, "0")}
          </div>
        </header>

        <div className="grid flex-1 items-center gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-violet-100">
              {stage === "idle" && "Aguardando toque"}
              {stage === "scan" && "Lendo sinal"}
              {stage === "signal" && "Padrão encontrado"}
              {stage === "choice" && "Escolha sem pensar muito"}
              {stage === "result" && "Resposta gerada"}
            </div>

            <h2 className="mt-7 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
              Não tente entender de primeira.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              Esse app foi feito para ser testado antes de ser explicado. Toque, escolha uma trilha e veja o que ele devolve.
            </p>

            <div className="mt-9 h-2 max-w-lg overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              {stage === "idle" && (
                <button onClick={begin} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] active:scale-[0.98]">
                  Iniciar teste
                </button>
              )}
              {stage !== "idle" && stage !== "result" && (
                <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-white">
                  Processando...
                </button>
              )}
              {stage === "result" && (
                <button onClick={reset} className="rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.02] active:scale-[0.98]">
                  Rodar de novo
                </button>
              )}
            </div>
          </div>

          <aside className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-violet-950/40 backdrop-blur-2xl sm:p-6">
            <div className="rounded-[1.7rem] border border-white/10 bg-black/45 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500">Fragmento</p>
                <span className="h-3 w-3 animate-pulse rounded-full bg-violet-300" />
              </div>
              <p className="mt-6 min-h-20 text-2xl font-black leading-tight tracking-[-0.04em] text-white">“{fragment}”</p>
            </div>

            {stage === "choice" && (
              <div className="mt-5 grid gap-3">
                {cards.map((card) => (
                  <button key={card.id} onClick={() => selectMood(card.id)} className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-violet-300/40 hover:bg-violet-400/10">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-200">{card.label}</p>
                    <h3 className="mt-3 text-xl font-black tracking-[-0.04em] text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{card.text}</p>
                  </button>
                ))}
              </div>
            )}

            {stage === "result" && (
              <div className="mt-5 rounded-[1.7rem] border border-violet-300/20 bg-violet-400/10 p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-100">Protocolo liberado</p>
                <div className="mt-5 grid gap-3">
                  {outputs[mood].map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/35 p-4 text-sm font-bold leading-6 text-zinc-100">
                      {String(index + 1).padStart(2, "0")} — {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stage !== "choice" && stage !== "result" && (
              <div className="mt-5 rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-zinc-500">Status</p>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {stage === "idle" ? "Nenhum dado foi iniciado. O app ainda está quieto." : "A experiência está montando uma resposta baseada na sua próxima escolha."}
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
