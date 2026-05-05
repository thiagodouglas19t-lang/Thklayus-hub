import { useState } from "react";
import UnoGame from "./UnoGame";

export default function GameApp() {
  const [mode, setMode] = useState<"hub" | "uno" | "runner">("hub");

  if (mode === "uno") return <UnoGame onBack={() => setMode("hub")} />;

  return (
    <main className="min-h-screen px-4 py-6 text-white max-w-5xl mx-auto">
      <h1 className="text-4xl font-black mb-6">THKLAYUS Arena</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <button onClick={() => setMode("uno")} className="p-6 rounded-2xl border border-white/10 bg-white/5 text-left">
          <h2 className="text-2xl font-bold">Color Clash (UNO)</h2>
          <p className="text-zinc-400 mt-2">Modo principal</p>
        </button>

        <button className="p-6 rounded-2xl border border-white/10 bg-white/5 text-left opacity-50">
          <h2 className="text-2xl font-bold">Neon Runner</h2>
          <p className="text-zinc-400 mt-2">Em breve</p>
        </button>
      </div>
    </main>
  );
}
