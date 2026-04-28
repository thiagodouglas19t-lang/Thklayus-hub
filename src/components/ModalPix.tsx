import { useState } from "react";
import { supabase } from "../lib/supabase";

type ModalPixProps = {
  open: boolean;
  onClose: () => void;
  cursoId: string;
  titulo: string;
  preco: string;
  pixCode: string;
};

export default function ModalPix({ open, onClose, cursoId, titulo, preco, pixCode }: ModalPixProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [enviado, setEnviado] = useState(false);

  if (!open) return null;

  async function copiarPix() {
    await navigator.clipboard.writeText(pixCode);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 2200);
  }

  function abrirAcompanhamento() {
    onClose();
    window.dispatchEvent(new CustomEvent("thklayus-open-page", { detail: "pedidos" }));
  }

  async function enviar() {
    if (!arquivo) {
      alert("Anexe o comprovante para continuar. Tudo é acompanhado dentro do app, sem WhatsApp.");
      return;
    }

    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      alert("Entre na sua conta antes de enviar o comprovante.");
      setLoading(false);
      return;
    }

    let comprovanteUrl = "";
    const filePath = `${userData.user.id}/compras/${Date.now()}-${arquivo.name}`;
    const { error: uploadError } = await supabase.storage.from("chat-files").upload(filePath, arquivo);

    if (uploadError) {
      alert("Erro ao enviar comprovante: " + uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage.from("chat-files").getPublicUrl(filePath);
    comprovanteUrl = data.publicUrl;

    const { data: threadData, error: threadError } = await supabase
      .from("chat_threads")
      .insert({
        user_id: userData.user.id,
        type: "purchase",
        title: `Compra: ${titulo}`,
        status: "em análise",
        course_id: cursoId,
        course_title: titulo,
        price: preco,
        total_price: preco,
        comprovante_url: comprovanteUrl,
      })
      .select()
      .single();

    if (threadError) {
      alert("Erro ao registrar compra: " + threadError.message);
      setLoading(false);
      return;
    }

    const mensagemInicial = `Compra registrada dentro do app\n\nCurso: ${titulo}\nValor: ${preco}\nStatus: em análise\n\nNão precisa enviar nada pelo WhatsApp. Acompanhe o status em Pedidos. Quando aprovado, o curso aparece em Meus Cursos.`;

    const { error: messageError } = await supabase.from("chat_messages").insert({
      thread_id: threadData.id,
      user_id: userData.user.id,
      content: mensagemInicial,
      file_url: comprovanteUrl,
    });

    if (messageError) {
      alert("Compra registrada, mas deu erro ao salvar a mensagem: " + messageError.message);
      setLoading(false);
      return;
    }

    setArquivo(null);
    setEnviado(true);
    setLoading(false);
  }

  if (enviado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
        <div className="w-full max-w-lg rounded-[2rem] border border-emerald-400/20 bg-[#050508] p-6 text-center shadow-2xl shadow-emerald-500/10">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-[2rem] bg-emerald-400 text-4xl text-black">✓</div>
          <h2 className="mt-5 text-3xl font-black text-white">Compra enviada</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-300">Seu comprovante foi salvo dentro do app. Agora é só acompanhar o status em <b>Pedidos</b>. Quando aprovado, o curso aparece automaticamente em <b>Meus Cursos</b>.</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-sm leading-6 text-zinc-300">
            <p><b>Curso:</b> {titulo}</p>
            <p><b>Valor:</b> {preco}</p>
            <p><b>Status:</b> em análise</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={abrirAcompanhamento} className="rounded-2xl bg-white px-5 py-4 font-black text-black">Ver pedidos</button>
            <button onClick={onClose} className="rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Fechar</button>
          </div>
          <p className="mt-4 text-xs font-bold text-zinc-500">Tudo acontece dentro do app. Não precisa enviar nada fora daqui.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
      <div className="max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-white/10 bg-[#050508] shadow-2xl shadow-emerald-500/10">
        <div className="relative overflow-hidden border-b border-white/10 p-5 md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(245,158,11,0.18),transparent_32%)]" />
          <div className="relative flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Checkout dentro do app</p>
              <h2 className="mt-4 text-2xl font-black leading-tight text-white md:text-3xl">{titulo}</h2>
              <p className="mt-2 text-sm font-bold text-zinc-400">Valor total: <span className="text-white">{preco}</span></p>
            </div>
            <button onClick={onClose} disabled={loading} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-lg font-black text-zinc-400 transition hover:text-white disabled:opacity-50">×</button>
          </div>

          <div className="relative mt-5 grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase tracking-[0.08em] text-zinc-500">
            {["1. Pix", "2. Anexar", "3. Análise", "4. Acesso"].map((step, index) => (
              <div key={step} className={`rounded-2xl border px-2 py-2 ${index <= 1 ? "border-emerald-300/35 bg-emerald-500/10 text-emerald-100" : "border-white/10 bg-white/[0.03]"}`}>{step}</div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5 md:p-6">
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-50">
            Caminho perfeito: pague, anexe o comprovante e acompanhe tudo em <b>Pedidos</b>. Não precisa chamar no WhatsApp nem enviar nada fora do app.
          </div>

          <div className="grid gap-3 rounded-[1.7rem] border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/10 p-3 text-center"><p className="text-2xl">🔒</p><p className="mt-1 text-[11px] font-black uppercase text-emerald-100">Registro interno</p></div>
            <div className="rounded-2xl border border-sky-300/20 bg-sky-500/10 p-3 text-center"><p className="text-2xl">📎</p><p className="mt-1 text-[11px] font-black uppercase text-sky-100">Comprovante salvo</p></div>
            <div className="rounded-2xl border border-violet-300/20 bg-violet-500/10 p-3 text-center"><p className="text-2xl">🎓</p><p className="mt-1 text-[11px] font-black uppercase text-violet-100">Acesso no app</p></div>
          </div>

          <div className="rounded-[1.7rem] border border-zinc-800 bg-white p-5 text-center text-black shadow-xl shadow-white/5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Pague via Pix</p>
            <div className="mx-auto my-4 grid h-44 w-44 place-items-center rounded-3xl border-4 border-black bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[length:18px_18px] bg-[position:0_0,0_9px,9px_-9px,-9px_0] p-4">
              <div className="grid h-full w-full place-items-center rounded-2xl bg-white px-3 text-center text-[10px] font-black leading-4">PIX<br />COPIA E COLA</div>
            </div>
            <p className="text-xs font-bold leading-5 text-zinc-700">Abra o app do banco, escolha Pix copia e cola, pague o valor e volte aqui para anexar o comprovante.</p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3"><p className="text-sm font-black text-zinc-200">Código Pix</p><p className="text-xs font-bold text-zinc-500">Copie e cole no banco</p></div>
            <textarea readOnly value={pixCode} className="h-20 w-full resize-none rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-emerald-300/40" />
            <button onClick={copiarPix} className={`mt-2 w-full rounded-2xl py-3 font-black transition active:scale-[0.98] ${copiado ? "bg-emerald-400 text-black" : "border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"}`}>{copiado ? "✓ Código copiado" : "Copiar código Pix"}</button>
          </div>

          <div>
            <p className="mb-2 text-sm font-black text-zinc-200">Anexe o comprovante aqui no app</p>
            <label className={`group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-5 text-center transition ${arquivo ? "border-emerald-300/50 bg-emerald-500/10" : "border-sky-300/25 bg-sky-500/10 hover:border-sky-300/45"}`}>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setArquivo(e.target.files?.[0] ?? null)} className="hidden" />
              <span className="text-4xl">☁️</span>
              <span className="mt-2 text-base font-black text-white">{arquivo ? "Comprovante anexado" : "Escolher comprovante"}</span>
              <span className="mt-1 text-xs font-bold text-zinc-400">PNG, JPG ou PDF</span>
            </label>
            {arquivo && <p className="mt-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-300">Arquivo: <span className="font-bold text-white">{arquivo.name}</span></p>}
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-5 text-zinc-400">
            Depois do envio, sua compra fica em <b>em análise</b>. Quando o ADM aprovar, o status muda e o curso aparece em <b>Meus Cursos</b>.
          </div>

          <button onClick={enviar} disabled={loading} className="w-full rounded-2xl bg-white py-4 text-base font-black text-black shadow-lg shadow-white/10 transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Salvando compra..." : "Salvar compra e acompanhar no app"}</button>
          <p className="text-center text-xs font-bold text-zinc-500">Sem WhatsApp. Sem mensagem externa. Tudo registrado dentro do AprendaJá.</p>
        </div>
      </div>
    </div>
  );
}
