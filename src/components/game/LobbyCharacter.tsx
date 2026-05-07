import { useEffect, useState } from "react";

type Props = {
  avatarEmoji: string;
  playerName: string;
  size?: "normal" | "large";
};

export default function LobbyCharacter({ playerName, size = "normal" }: Props) {
  const scale = size === "large" ? "h-[390px] w-[230px]" : "h-[320px] w-[190px]";
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function move(event: PointerEvent) {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * -5;
      setTilt({ x, y });
    }
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const white = "bg-gradient-to-br from-white via-zinc-200 to-zinc-500";
  const soft = "shadow-[inset_-10px_-14px_18px_rgba(0,0,0,.20),inset_8px_8px_18px_rgba(255,255,255,.45),0_18px_35px_rgba(0,0,0,.30)]";

  return (
    <div className={`relative mx-auto ${scale} [perspective:900px]`} aria-label={`${playerName} mannequin`}>
      <div className="absolute bottom-2 left-1/2 h-12 w-52 -translate-x-1/2 rounded-[50%] bg-black/55 shadow-[0_0_60px_rgba(34,211,238,.22)] ring-1 ring-cyan-200/15" />
      <div className="absolute left-1/2 top-[52%] h-[86%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute inset-0 origin-bottom transition-transform duration-200 ease-out" style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}>
        <div className="absolute inset-x-0 top-0 animate-[thkIdle_3.2s_ease-in-out_infinite]">
          <div className={`absolute left-1/2 top-[4px] z-40 h-[70px] w-[54px] -translate-x-1/2 rounded-[46%] ${white} ${soft}`} />
          <div className="absolute left-1/2 top-[67px] z-30 h-[24px] w-[34px] -translate-x-1/2 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-400 shadow-[inset_-5px_-7px_10px_rgba(0,0,0,.18)]" />

          <div className={`absolute left-1/2 top-[84px] z-20 h-[42px] w-[132px] -translate-x-1/2 rounded-t-[38px] ${white} ${soft}`} />
          <div className={`absolute left-1/2 top-[108px] z-20 h-[116px] w-[96px] -translate-x-1/2 rounded-[36px] ${white} ${soft}`} />
          <div className="absolute left-1/2 top-[122px] z-30 h-[70px] w-[44px] -translate-x-1/2 rounded-full border-x border-white/35 bg-black/5" />
          <div className="absolute left-1/2 top-[142px] z-30 h-[2px] w-[64px] -translate-x-1/2 bg-zinc-500/20" />
          <div className="absolute left-1/2 top-[166px] z-30 h-[2px] w-[56px] -translate-x-1/2 bg-zinc-500/18" />
          <div className="absolute left-1/2 top-[190px] z-30 h-[2px] w-[46px] -translate-x-1/2 bg-zinc-500/16" />

          <div className={`absolute left-[28px] top-[100px] z-10 h-[118px] w-[30px] rotate-[12deg] rounded-full ${white} ${soft}`} />
          <div className={`absolute right-[28px] top-[100px] z-10 h-[118px] w-[30px] -rotate-[12deg] rounded-full ${white} ${soft}`} />
          <div className={`absolute left-[18px] top-[205px] z-20 h-[36px] w-[30px] rotate-[8deg] rounded-2xl ${white} ${soft}`} />
          <div className={`absolute right-[18px] top-[205px] z-20 h-[36px] w-[30px] -rotate-[8deg] rounded-2xl ${white} ${soft}`} />

          <div className="absolute left-1/2 top-[215px] z-30 h-[22px] w-[86px] -translate-x-1/2 rounded-b-[34px] bg-gradient-to-b from-zinc-200 to-zinc-500 shadow-[inset_-6px_-8px_12px_rgba(0,0,0,.20)]" />
          <div className={`absolute left-1/2 top-[232px] z-10 h-[98px] w-[34px] -translate-x-[40px] rotate-[3deg] rounded-[24px] ${white} ${soft}`} />
          <div className={`absolute left-1/2 top-[232px] z-10 h-[98px] w-[34px] translate-x-[6px] -rotate-[3deg] rounded-[24px] ${white} ${soft}`} />
          <div className={`absolute left-1/2 top-[316px] z-20 h-[24px] w-[54px] -translate-x-[56px] rounded-xl ${white} ${soft}`} />
          <div className={`absolute left-1/2 top-[316px] z-20 h-[24px] w-[54px] translate-x-[2px] rounded-xl ${white} ${soft}`} />
        </div>
      </div>

      <style>{`@keyframes thkIdle { 0%,100% { transform: translateY(0) scaleY(1); } 50% { transform: translateY(-6px) scaleY(1.012); } }`}</style>
      <div className="absolute -bottom-4 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/90 px-5 py-2 text-xs font-black ring-1 ring-white/10">{playerName}</div>
    </div>
  );
}
