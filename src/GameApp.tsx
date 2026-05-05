import { useState } from "react";
import UnoGame from "./UnoGame";

export default function GameApp() {
  const [mode, setMode] = useState<"hub" | "uno">("uno");

  if (mode === "uno") return <UnoGame onBack={() => setMode("hub")} />;

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="glass-card rounded-[2rem] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-violet-300">THKLAYUS Arena</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">Escolha o modo</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">Classic Clash é o jogo principal. O app agora abre direto nele, mas o hub fica pronto para novos modos.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <button onClick={() => setMode("uno")} className="pro-card rounded-3xl p-6 text-left hover:scale-[1.01]">
            <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-200">Principal</span>
            <h2 className="mt-4 text-3xl font-black">Classic Clash</h2>
            <p className="mt-2 text-zinc-400">Cartas, coringas, +2, +4, bloqueio, reverso, bots e progressão.</p>
          </button>

          <div className="pro-card rounded-3xl p-6 opacity-60">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-zinc-300">Depois</span>
            <h2 className="mt-4 text-3xl font-black">Neon Runner</h2>
            <p className="mt-2 text-zinc-400">Modo arcade extra. Melhor deixar pra depois do Classic Clash ficar perfeito.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
