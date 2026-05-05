type UnoPolishPanelProps = {
  currentTurn: string;
  activeColor: string;
  deckCount: number;
  stackDebt: number;
  winner?: string | null;
  onNewGame: () => void;
};

export default function UnoPolishPanel({ currentTurn, activeColor, deckCount, stackDebt, winner, onNewGame }: UnoPolishPanelProps) {
  return (
    <section className="pro-card rounded-3xl p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Mesa</p>
          <h3 className="mt-1 text-xl font-black text-white">Controle rápido</h3>
        </div>
        <button onClick={onNewGame} className="rounded-2xl border border-white/15 px-4 py-2 text-sm font-black text-white">Nova</button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
          <span className="text-xs text-zinc-500">Turno</span>
          <strong className="block text-white">{currentTurn}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
          <span className="text-xs text-zinc-500">Cor</span>
          <strong className="block capitalize text-white">{activeColor}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
          <span className="text-xs text-zinc-500">Monte</span>
          <strong className="block text-white">{deckCount}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
          <span className="text-xs text-zinc-500">Stack</span>
          <strong className="block text-white">+{stackDebt}</strong>
        </div>
      </div>

      {winner && (
        <div className="mt-4 rounded-3xl border border-emerald-300/30 bg-emerald-400/10 p-4 text-center">
          <p className="text-sm text-emerald-100/80">Fim de partida</p>
          <strong className="block text-2xl text-white">{winner} venceu</strong>
        </div>
      )}

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
        <strong className="text-white">Regras rápidas:</strong>
        <p className="mt-2">Combine cor, número ou símbolo. Coringa muda cor. +2/+4 podem empilhar se o modo stack estiver ligado.</p>
      </div>
    </section>
  );
}
