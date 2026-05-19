import { useMemo, useState } from "react";
import { ArrowRight, Check, MousePointerClick, PartyPopper, Sparkles, Zap } from "lucide-react";
import { supabase } from "../lib/supabase";

const glass = "bg-white/[0.02] border border-white/[0.06] backdrop-blur-md";

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#08080a]">
      <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#a370f7]/30 blur-[120px]" />
      <div className="absolute -right-28 top-52 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#a370f7]/15 blur-[120px]" />
    </div>
  );
}

function Switch({ label, enabled, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className={`${glass} active:scale-95 transition-all duration-200 flex items-center justify-between rounded-2xl px-4 py-3 text-left`}>
      <span className="text-sm font-black text-white">{label}</span>
      <span className={`relative h-7 w-12 rounded-full transition-all duration-200 ${enabled ? "bg-[#a370f7] shadow-lg shadow-[#a370f7]/30" : "bg-white/[0.08]"}`}>
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-200 ${enabled ? "left-6" : "left-1"}`} />
      </span>
    </button>
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
    const classes = ["rounded-2xl px-7 py-4 font-black transition-all duration-200", "bg-[#a370f7] text-white shadow-lg shadow-[#a370f7]/25"];
    if (states.hover) classes.push("brightness-110 shadow-2xl shadow-[#a370f7]/45 ring-2 ring-cyan-200/20");
    if (states.active) classes.push("scale-95 translate-y-0.5");
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
      setFeedback("Acertou. Alto contraste deixa a ação clara e reduz esforço visual.");
      setCanAdvance(true);
    } else {
      setFeedback("Esse botão esconde o texto. Em interfaces reais, isso derruba conversão e confiança.");
      setCanAdvance(false);
    }
  }

  async function handleTinyButtonClick() {
    if (!accessFixed) {
      setFeedback("Erro simulado: alvo pequeno demais. Corrigindo para 44px com espaçamento premium.");
      setAccessFixed(true);
      setCanAdvance(true);
      if (!lifeLost) {
        setLifeLost(true);
        await loseLife();
      }
    } else {
      setFeedback("Agora ficou clicável: 44px ajuda o polegar a acertar sem fricção.");
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
            <div className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#a370f7]">Fase {step + 1}/4</div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-gradient-to-r from-[#a370f7] to-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </header>

        <article className={`${glass} min-h-[650px] rounded-[36px] p-5 shadow-2xl shadow-black/40`}>
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a370f7]/15 text-[#a370f7] shadow-lg shadow-[#a370f7]/10"><Sparkles size={22} /></div>
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#a370f7]">Design System</p><h1 className="text-2xl font-black tracking-tight">Botões</h1></div>
          </div>

          {step === 0 && <section><h2 className="text-3xl font-black leading-tight">Qual botão vende melhor?</h2><p className="mt-3 text-sm leading-7 text-white/50">Escolha o botão com melhor legibilidade para liberar a próxima fase.</p><div className="mt-8 grid gap-4"><button type="button" onClick={() => handleContrast("bad")} className={`active:scale-95 transition-all duration-200 rounded-2xl bg-[#17101f] px-5 py-4 font-black text-[#23182f] ${selectedContrast === "bad" ? "ring-2 ring-rose-400" : ""}`}>Continuar proposta</button><button type="button" onClick={() => handleContrast("good")} className={`active:scale-95 transition-all duration-200 rounded-2xl bg-[#a370f7] px-5 py-4 font-black text-white shadow-2xl shadow-[#a370f7]/35 ${selectedContrast === "good" ? "ring-2 ring-cyan-200" : ""}`}>Continuar proposta</button></div></section>}

          {step === 1 && <section><h2 className="text-3xl font-black leading-tight">Sandbox de estados</h2><p className="mt-3 text-sm leading-7 text-white/50">Ative os estados e veja como microfeedback deixa a interface viva.</p><div className="my-10 flex justify-center rounded-[30px] border border-white/[0.06] bg-black/25 p-8"><button type="button" disabled={states.disabled} className={sandboxButtonClass}>Botão Premium</button></div><div className="grid gap-3"><Switch label="Hover" enabled={states.hover} onToggle={() => setStates((old) => ({ ...old, hover: !old.hover }))} /><Switch label="Active" enabled={states.active} onToggle={() => setStates((old) => ({ ...old, active: !old.active }))} /><Switch label="Disabled" enabled={states.disabled} onToggle={() => setStates((old) => ({ ...old, disabled: !old.disabled }))} /></div></section>}

          {step === 2 && <section><h2 className="text-3xl font-black leading-tight">Acessibilidade Mobile</h2><p className="mt-3 text-sm leading-7 text-white/50">Toque nos botões minúsculos. O erro ensina por que área de toque importa.</p><div className="mt-10 rounded-[30px] border border-white/[0.06] bg-black/25 p-6"><div className={`flex flex-wrap justify-center transition-all duration-500 ${accessFixed ? "gap-3" : "gap-1"}`}>{["A", "B", "C", "D"].map((item) => <button key={item} type="button" onClick={handleTinyButtonClick} className={`active:scale-95 transition-all duration-500 rounded-xl font-black ${accessFixed ? "h-11 min-w-11 bg-[#a370f7] px-4 text-white shadow-xl shadow-[#a370f7]/30" : "h-5 w-5 bg-white/[0.06] text-[10px] text-white/35"}`}>{item}</button>)}</div></div>{accessFixed && <div className="mt-6 flex gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4 text-sm leading-6 text-cyan-50/75"><Check className="mt-0.5 shrink-0 text-cyan-200" size={18} />44px cria uma zona confortável para toque e reduz cliques errados em telas pequenas.</div>}</section>}

          {step === 3 && <section className="text-center"><div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[32px] bg-[#a370f7] shadow-2xl shadow-[#a370f7]/40"><PartyPopper size={42} /></div><h2 className="text-4xl font-black leading-tight">Lição concluída</h2><p className="mt-4 text-sm leading-7 text-white/55">Você aprendeu contraste, estados e área de toque. Isso vira proposta real: botões melhores aumentam clareza, confiança e conversão para clientes.</p><div className="mt-8 grid grid-cols-2 gap-3"><div className={`${glass} rounded-3xl p-4`}><Zap className="mx-auto mb-2 fill-yellow-300 text-yellow-300" /><p className="text-2xl font-black">+15</p><p className="text-xs text-white/45">XP</p></div><div className={`${glass} rounded-3xl p-4`}><MousePointerClick className="mx-auto mb-2 text-cyan-200" /><p className="text-2xl font-black">44px</p><p className="text-xs text-white/45">Toque</p></div></div></section>}

          {feedback && <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-sm leading-6 text-white/65">{feedback}</div>}

          <div className="mt-8">{step < 3 ? <button type="button" onClick={goNext} disabled={!canAdvance} className={`active:scale-95 transition-all duration-200 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black ${canAdvance ? "bg-[#a370f7] text-white shadow-2xl shadow-[#a370f7]/35" : "cursor-not-allowed bg-white/[0.05] text-white/25"}`}>Avançar <ArrowRight size={18} /></button> : <button type="button" onClick={addXpAndComplete} disabled={saving} className="active:scale-95 transition-all duration-200 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#a370f7] px-5 py-4 font-black text-white shadow-2xl shadow-[#a370f7]/35 disabled:opacity-60">{saving ? "Salvando recompensa..." : "Finalizar"} <ArrowRight size={18} /></button>}</div>
        </article>
      </section>
    </main>
  );
}
