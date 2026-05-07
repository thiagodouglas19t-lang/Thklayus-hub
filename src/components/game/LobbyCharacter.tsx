import { useEffect, useState } from "react";
import { auras, masks, outfits, readCharacter } from "../../lib/characterCosmetics";

type Props = {
  avatarEmoji: string;
  playerName: string;
  size?: "normal" | "large";
};

export default function LobbyCharacter({ avatarEmoji, playerName, size = "normal" }: Props) {
  const character = readCharacter();
  const outfit = outfits.find((item) => item.id === character.outfit) || outfits[0];
  const mask = masks.find((item) => item.id === character.mask) || masks[0];
  const aura = auras.find((item) => item.id === character.aura) || auras[0];
  const scale = size === "large" ? "h-[390px] w-[230px]" : "h-[320px] w-[190px]";
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function move(event: PointerEvent) {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * -6;
      setTilt({ x, y });
    }
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className={`relative mx-auto ${scale} [perspective:900px]`} aria-label={`${playerName} character`}>
      {aura.id !== "none" && <div className="absolute left-1/2 top-[55%] h-[92%] w-[130%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl" style={{ background: aura.color || "rgba(168,85,247,.35)" }} />}
      <div className="absolute bottom-2 left-1/2 h-12 w-52 -translate-x-1/2 rounded-[50%] bg-black/60 shadow-[0_0_60px_rgba(34,211,238,.25)] ring-1 ring-cyan-200/15" />

      <div className="absolute inset-0 origin-bottom transition-transform duration-200 ease-out" style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}>
        <div className="absolute inset-x-0 top-0 animate-[thkIdle_3.2s_ease-in-out_infinite]">
          <div className="absolute left-1/2 top-2 z-30 h-[66px] w-[54px] -translate-x-1/2 rounded-[42%] bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-600 shadow-[inset_-8px_-10px_16px_rgba(0,0,0,.25)]" />
          {character.useAvatarFace && mask.id === "none" && <div className="absolute left-1/2 top-[24px] z-40 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-black/75 text-lg ring-2 ring-white/20">{avatarEmoji}</div>}
          {mask.id !== "none" && <div className={`absolute left-1/2 top-[18px] z-50 h-[48px] w-[58px] -translate-x-1/2 ${mask.id === "hood" ? "rounded-t-[36px] bg-gradient-to-b from-zinc-900 to-black" : mask.id === "skull" ? "rounded-[18px] bg-gradient-to-b from-zinc-100 to-zinc-500" : "rounded-[18px] bg-gradient-to-b from-zinc-950 to-black"} shadow-[0_0_28px_rgba(168,85,247,.45)] ring-1 ring-white/15`}>{mask.id === "visor" && <><span className="absolute left-[9px] top-[22px] h-[7px] w-10 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,.95)]" /><span className="absolute left-1/2 top-[12px] h-3 w-7 -translate-x-1/2 rounded bg-violet-500/40" /></>}{mask.id === "skull" && <><span className="absolute left-[13px] top-[17px] h-3 w-3 rounded-full bg-black" /><span className="absolute right-[13px] top-[17px] h-3 w-3 rounded-full bg-black" /><span className="absolute left-1/2 bottom-[8px] h-2 w-6 -translate-x-1/2 rounded bg-black/70" /></>}</div>}

          <div className={`absolute left-1/2 top-[70px] z-20 h-[42px] w-[128px] -translate-x-1/2 rounded-t-[34px] bg-gradient-to-b ${outfit.accent} shadow-[0_0_26px_${outfit.glow}] ring-1 ring-white/15`} />
          <div className={`absolute left-1/2 top-[96px] z-20 h-[118px] w-[106px] -translate-x-1/2 rounded-[28px] bg-gradient-to-b ${outfit.accent} shadow-[inset_0_0_18px_rgba(255,255,255,.13),0_0_34px_${outfit.glow}] ring-1 ring-white/15`} />
          <div className="absolute left-1/2 top-[104px] z-30 h-[86px] w-[42px] -translate-x-1/2 rounded-full bg-black/18" />

          <div className={`absolute left-[23px] top-[92px] z-10 h-[132px] w-[30px] rotate-[13deg] rounded-full bg-gradient-to-b ${outfit.accent} ring-1 ring-white/10`} />
          <div className={`absolute right-[23px] top-[92px] z-10 h-[132px] w-[30px] -rotate-[13deg] rounded-full bg-gradient-to-b ${outfit.accent} ring-1 ring-white/10`} />
          <div className="absolute left-[14px] top-[202px] z-20 h-[30px] w-[34px] rotate-[8deg] rounded-2xl bg-zinc-950 ring-1 ring-violet-300/30" />
          <div className="absolute right-[14px] top-[202px] z-20 h-[30px] w-[34px] -rotate-[8deg] rounded-2xl bg-zinc-950 ring-1 ring-violet-300/30" />

          <div className={`absolute left-1/2 top-[204px] z-10 h-[118px] w-[39px] -translate-x-[45px] rotate-[4deg] rounded-[22px] bg-gradient-to-b ${outfit.accent} ring-1 ring-white/10`} />
          <div className={`absolute left-1/2 top-[204px] z-10 h-[118px] w-[39px] translate-x-[6px] -rotate-[4deg] rounded-[22px] bg-gradient-to-b ${outfit.accent} ring-1 ring-white/10`} />
          <div className="absolute left-1/2 top-[316px] z-20 h-[24px] w-[58px] -translate-x-[62px] rounded-xl bg-gradient-to-b from-white to-zinc-300 shadow-[0_8px_18px_rgba(0,0,0,.35)]" />
          <div className="absolute left-1/2 top-[316px] z-20 h-[24px] w-[58px] translate-x-[2px] rounded-xl bg-gradient-to-b from-white to-zinc-300 shadow-[0_8px_18px_rgba(0,0,0,.35)]" />

          {outfit.id === "neon" && <><span className="absolute left-[66px] top-[106px] z-40 h-24 w-1 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(168,85,247,.95)]" /><span className="absolute right-[66px] top-[106px] z-40 h-24 w-1 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,.95)]" /><span className="absolute bottom-16 left-1/2 h-2 w-28 -translate-x-1/2 rounded-full bg-violet-500/70 blur-sm" /><span className="absolute left-1/2 top-[154px] z-40 h-7 w-7 -translate-x-1/2 rotate-45 rounded bg-violet-500/70 shadow-[0_0_18px_rgba(168,85,247,.95)]" /></>}
          {outfit.id === "armor" && <><span className="absolute left-1/2 top-[104px] z-40 h-20 w-[132px] -translate-x-1/2 rounded-2xl border border-cyan-200/35 bg-white/10" /><span className="absolute left-1/2 top-[132px] z-50 h-8 w-8 -translate-x-1/2 rotate-45 rounded bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.9)]" /><span className="absolute left-[22px] top-[93px] z-40 h-16 w-12 rotate-12 rounded-2xl bg-slate-300/25 ring-1 ring-cyan-200/30" /><span className="absolute right-[22px] top-[93px] z-40 h-16 w-12 -rotate-12 rounded-2xl bg-slate-300/25 ring-1 ring-cyan-200/30" /></>}
        </div>
      </div>

      <style>{`@keyframes thkIdle { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-7px) scaleY(1.015); } }`}</style>
      <div className="absolute -bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/90 px-5 py-2 text-xs font-black ring-1 ring-white/10">{playerName}</div>
    </div>
  );
}
