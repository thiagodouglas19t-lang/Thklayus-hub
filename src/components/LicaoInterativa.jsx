import { useMemo, useState } from "react";
import { ArrowRight, Check, MousePointerClick, PartyPopper, Sparkles, Zap } from "lucide-react";
import { supabase } from "../lib/supabase";

const glass = "border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl shadow-2xl shadow-black/45";
const tactile = "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-14px_28px_rgba(0,0,0,0.28),0_18px_50px_rgba(163,112,247,0.22)]";

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#08080a]">
      <div className="absolute -left-28 -top-32 h-96 w-96 rounded-full bg-[#a370f7]/35 blur-[120px]" />
      <div className="absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-[120px]" />
      <div className="absolute bottom-[-8rem] left-1/4 h-96 w-96 rounded-full bg-emerald-300/10 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_24%,rgba(0,0,0,0.48))]" />
    </div>
  );
}

function Switch({ label, enabled, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className={`${glass} active:scale-95 transition-all duration-200 flex items-center justify-between rounded-[1.35rem] px-4 py-3 text-left`}>
      <span className="text-sm font-black text-white">{label}</span>
      <span className={`relative h-8 w-14 rounded-full border border-white/10 transition-all duration-200 ${enabled ? "bg-[#a370f7] shadow-[0_0_34px_rgba(163,112,247,0.45),inset_0_1px_0_rgba(255,255,255,0.35)]" : "bg-black/45 shadow-inner shadow-black"}`}>
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-[0_8px_18px_rgba(0,0,0,0.35)] transition-all duration-200 ${enabled ? "left-7" : "left-1"}`} />
      </span>
    </button>
  );
}

function ProductMockup({ mode }) {
  return (
    <div className={`${glass} relative mt-6 overflow-hidden rounded-[2rem] p-4`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(163,112,247,0.18),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(34,211,238,0.16),transparent_30%)]" />
      <div className="relative rounded-[1.45rem] border border-white/10 bg-black/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-8 rounded-xl bg-white/10" />
          <div className="flex gap-2 text-[10px] font-black text-white/45"><span>Design</span><span>System</span><span>Specs</span></div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-200/70">Precision Series</p>
        <h3 className="mt-2 text-3xl font-black tracking-[-0.08em] text-white">Botões que parecem caros.</h3>
        <div className="mt-6 flex gap-2">
          <div className="h-9 w-24 rounded-full bg-white shadow-[0_16px_34px_rgba(255,255,255,0.16)]" />
          <div className="h-9 w-16 rounded-full border border-white/10 bg-white/5" />
        </div>
        {mode === "final" && <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-xs font-bold text-emerald-100">Pronto para proposta: CTA, estados e área de toque revisados.</div>}
      </div>
    </div>
  );
}

export default function LicaoInterativa({ onFinish, onBackHome }) {
  const [step, setStep] = useState(0);
  const [canAdvance, setCanAdvance] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedContrast, setSelectedContrast] = useState(null);
  const [accessFixed, setAccessFixed] = useState(false);
  const [lifeLost, setLifeLost] = useState(false);
  const [saving, setSaving] = useState(false);
  const [states, setStates] = useState({ hover: false, active: false, disabled: false });

  const progress = ((step + 1) / 4) * 100;

  const sandboxButtonClass = useMemo(() => {
    const classes = ["rounded-[1.35rem] px-8 py-4 font-black transition-all duration-200", "bg-[#a370f7] text-white", tactile];
    if (states.hover) classes.push("brightness-110 ring-2 ring-cyan-200/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-14px_28px_rgba(0,0,0,0.24),0_22px_70px_rgba(163,112,247,0.42)]");
    if (states.active) classes.push("scale-95 translate-y-1");
    if (states.disabled) classes.push("opacity-50 grayscale cursor-not-allowed shadow-none");
    return classes.join(" ");
  }, [states]);

  async function getCurrentUserId() {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  }

  async function loseLife() {
    const userId = await getCurrentUserId();
    if (!userId) return;
    const { data: profile } = await supabase.from("profiles").select("vidas").eq("id", userId).single();
    const nextLives = Math.max(0, Number(profile?.vidas ?? 5) - 1);
    await supabase.from("profiles").update({ vidas: nextLives }).eq("id", userId);
  }

  async function addXpAndComplete() {
    setSaving(true);
    const userId = await getCurrentUserId();
    if (userId) {
      const { data: profile } = await supabase.from("profiles").select("xp").eq("id", userId).single();
      await supabase.from("profiles").update({ xp: Number(profile?.xp ?? 0) + 15 }).eq("id", userId);
      await supabase.from("user_progress").upsert({ user_id: userId, trilha: "Visual", licao_id: "design-system-botoes", concluida: true }, { onConflict: "user_id,trilha,licao_id" });
    }
    setSaving(false);
    if (onFinish) onFinish();
    if (onBackHome) onBackHome();
  }

  function handleContrast(choice) {
    setSelectedContrast(choice);
    if (choice === "good") {
      setFeedback("Acertou. O CTA parece físico, legível e pronto para vender.");
      setCanAdvance(true);
    } else {
      setFeedback("Esse CTA some no layout. Premium também precisa ser claro.");
      setCanAdvance(false);
    }
  }

  async function handleTinyButtonClick() {
    if (!accessFixed) {
      setFeedback("Erro simulado: alvo pequeno demais. Corrigindo para 44px com toque premium.");
      setAccessFixed(true);
      setCanAdvance(true);
      if (!lifeLost) {
        setLifeLost(true);
        await loseLife();
      }
    } else {
      setFeedback("Agora sim: 44px, respiro e sensação tátil.");
      setCanAdvance(true);
    }
  }

  function goNext() {
    const next = Math.min(3, step + 1);
    setStep(next);
    setFeedback("");
    setCanAdvance(next === 1 || next === 3);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08080a] px-4 py-5 text-white">
      <GlowBackground />
      <section className="relative z-10 mx-auto max-w-md">
        <header className="mb-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button type="button" onClick={onBackHome} className={`${glass} active:scale-95 transition-all duration-200 rounded-2xl px-4 py-2 text-sm font-black text-white/70`}>Home</button>
            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-100">Fase {step + 1}/4</div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#a370f7] via-cyan-300 to-emerald-200 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </header>

        <article className={`${glass} min-h-[690px] overflow-hidden rounded-[2.35rem] p-5`}>
          <div className="absolute right-8 top-24 h-32 w-32 rounded-full bg-cyan-300/10 blur-[70px]" />
          <div className="relative mb-7 flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a370f7]/20 text-white ${tactile}`}><Sparkles size={22} /></div>
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#a370f7]">Design System</p><h1 className="text-2xl font-black tracking-tight">Botões Premium</h1></div>
          </div>

          {step === 0 && <section className="relative"><h2 className="text-4xl font-black leading-[0.95] tracking-[-0.08em]">Contraste que converte.</h2><p className="mt-4 text-sm leading-7 text-white/50">Escolha o CTA com leitura forte e presença de produto caro.</p><ProductMockup /><div className="mt-6 grid gap-4"><button type="button" onClick={() => handleContrast("bad")} className={`active:scale-95 transition-all duration-200 rounded-[1.35rem] bg-[#16101e] px-5 py-4 font-black text-[#241932] shadow-inner shadow-black ${selectedContrast === "bad" ? "ring-2 ring-rose-400" : ""}`}>Get Early Access</button><button type="button" onClick={() => handleContrast("good")} className={`active:scale-95 transition-all duration-200 rounded-[1.35rem] bg-white px-5 py-4 font-black text-black ${tactile} ${selectedContrast === "good" ? "ring-2 ring-cyan-200" : ""}`}>Get Early Access</button></div></section>}

          {step === 1 && <section className="relative"><h2 className="text-4xl font-black leading-[0.95] tracking-[-0.08em]">Estados táteis.</h2><p className="mt-4 text-sm leading-7 text-white/50">Um botão bom responde como objeto físico: acende, pressiona e desativa.</p><div className="my-8 flex justify-center rounded-[2rem] border border-white/[0.08] bg-black/35 p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"><button type="button" disabled={states.disabled} className={sandboxButtonClass}>Botão Premium</button></div><div className="grid gap-3"><Switch label="Hover glow" enabled={states.hover} onToggle={() => setStates((old) => ({ ...old, hover: !old.hover }))} /><Switch label="Active press" enabled={states.active} onToggle={() => setStates((old) => ({ ...old, active: !old.active }))} /><Switch label="Disabled mute" enabled={states.disabled} onToggle={() => setStates((old) => ({ ...old, disabled: !old.disabled }))} /></div></section>}

          {step === 2 && <section className="relative"><h2 className="text-4xl font-black leading-[0.95] tracking-[-0.08em]">Toque de app sério.</h2><p className="mt-4 text-sm leading-7 text-white/50">O visual pode ser lindo, mas no mobile o dedo precisa acertar.</p><div className="mt-8 rounded-[2rem] border border-white/[0.08] bg-black/35 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"><div className={`flex flex-wrap justify-center transition-all duration-500 ${accessFixed ? "gap-3" : "gap-1"}`}>{["A", "B", "C", "D"].map((item) => <button key={item} type="button" onClick={handleTinyButtonClick} className={`active:scale-95 transition-all duration-500 rounded-2xl font-black ${accessFixed ? `h-11 min-w-11 bg-white px-4 text-black ${tactile}` : "h-5 w-5 bg-white/[0.06] text-[10px] text-white/30 shadow-inner shadow-black"}`}>{item}</button>)}</div></div>{accessFixed && <div className="mt-6 flex gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4 text-sm leading-6 text-cyan-50/75"><Check className="mt-0.5 shrink-0 text-cyan-200" size={18} />44px, espaçamento e feedback visual: o mínimo para um produto parecer confiável.</div>}</section>}

          {step === 3 && <section className="relative text-center"><div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-black ${tactile}`}><PartyPopper size={42} /></div><h2 className="text-4xl font-black leading-[0.95] tracking-[-0.08em]">Entrega pronta.</h2><p className="mt-4 text-sm leading-7 text-white/55">Você já sabe transformar botão em argumento de venda: mais clareza, mais confiança e menos fricção para o cliente.</p><ProductMockup mode="final" /><div className="mt-6 grid grid-cols-2 gap-3"><div className={`${glass} rounded-3xl p-4`}><Zap className="mx-auto mb-2 fill-yellow-300 text-yellow-300" /><p className="text-2xl font-black">+15</p><p className="text-xs text-white/45">XP</p></div><div className={`${glass} rounded-3xl p-4`}><MousePointerClick className="mx-auto mb-2 text-cyan-200" /><p className="text-2xl font-black">44px</p><p className="text-xs text-white/45">Toque</p></div></div></section>}

          {feedback && <div className="relative mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 text-sm font-semibold leading-6 text-white/70 backdrop-blur-xl">{feedback}</div>}

          <div className="relative mt-8">{step < 3 ? <button type="button" onClick={goNext} disabled={!canAdvance} className={`active:scale-95 transition-all duration-200 flex w-full items-center justify-center gap-2 rounded-[1.35rem] px-5 py-4 font-black ${canAdvance ? `bg-[#a370f7] text-white ${tactile}` : "cursor-not-allowed bg-white/[0.05] text-white/25"}`}>Avançar <ArrowRight size={18} /></button> : <button type="button" onClick={addXpAndComplete} disabled={saving} className={`active:scale-95 transition-all duration-200 flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-[#a370f7] px-5 py-4 font-black text-white disabled:opacity-60 ${tactile}`}>{saving ? "Salvando recompensa..." : "Finalizar"} <ArrowRight size={18} /></button>}</div>
        </article>
      </section>
    </main>
  );
}
