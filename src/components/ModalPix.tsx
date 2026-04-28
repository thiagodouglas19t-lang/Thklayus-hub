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
  const [nomePagador, setNomePagador] = useState("");
  const [horarioPix, setHorarioPix] = useState("");
  const [bancoPagador, setBancoPagador] = useState("");
  const [codigoComprovante, setCodigoComprovante] = useState("");
  const [observacao, setObservacao] = useState("");
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

  function temDadosParaVerificar() {
    return Boolean(arquivo || nomePagador.trim() || horarioPix.trim() || bancoPagador.trim() || codigoComprovante.trim() || observacao.trim());
  }

  async function enviar() {
    if (!temDadosParaVerificar()) {
      alert("Informe dados do Pix para conferência ou anexe o comprovante.");
      return;
    }

    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      alert("Entre na sua conta antes de registrar a compra.");
      setLoading(false);
      return;
    }

    let comprovanteUrl = "";

    if (arquivo) {
      const filePath = `${userData.user.id}/compras/${Date.now()}-${arquivo.name}`;
      const { error: uploadError } = await supabase.storage.from("chat-files").upload(filePath, arquivo);

      if (uploadError) {
        alert("Erro ao enviar comprovante: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("chat-files").getPublicUrl(filePath);
      comprovanteUrl = data.publicUrl;
    }

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
        comprovante_url: comprovanteUrl || null,
      })
      .select()
      .single();

    if (threadError) {
      alert("Erro ao registrar compra: " + threadError.message);
      setLoading(false);
      return;
    }

    const mensagemInicial = `COMPRA REGISTRADA NO APP\n\nCurso: ${titulo}\nValor: ${preco}\nStatus: em análise\n\nDADOS PARA CONFERÊNCIA NO BANCO\nNome de quem pagou: ${nomePagador.trim() || "não informado"}\nHorário/data do Pix: ${horarioPix.trim() || "não informado"}\nBanco/app usado: ${bancoPagador.trim() || "não informado"}\nCódigo/ID do comprovante: ${codigoComprovante.trim() || "não informado"}\nComprovante anexado: ${arquivo ? arquivo.name : "não anexado"}\nObservação: ${observacao.trim() || "sem observação"}\n\nAÇÃO DO ADM: conferir no banco se o Pix caiu. Se estiver correto, clicar em Liberar curso no painel ADM. Se faltar informação, responder neste pedido.`;

    const { error: messageError } = await supabase.from("chat_messages").insert({
      thread_id: threadData.id,
      user_id: userData.user.id,
      content: mensagemInicial,
      file_url: comprovanteUrl || null,
    });

    if (messageError) {
      alert("Compra registrada, mas deu erro ao salvar a mensagem: " + messageError.message);
      setLoading(false);
      return;
    }

    setArquivo(null);
    setNomePagador("");
    setHorarioPix("");
    setBancoPagador("");
    setCodigoComprovante("");
    setObservacao("");
    setEnviado(true);
    setLoading(false);
  }

  if (enviado) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
        <div className="w-full max-w-lg rounded-[2rem] border border-emerald-400/20 bg-[#050508] p-6 text-center shadow-2xl shadow-emerald-500/10">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-[2rem] bg-emerald-400 text-4xl text-black">✓</div>
          <h2 className="mt-5 text-3xl font-black text-white">Compra registrada</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-300">As informações foram salvas dentro do app. Agora o ADM confere no banco se o Pix caiu. Quando aprovado, o curso aparece automaticamente em <b>Meus Cursos</b>.</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-sm leading-6 text-zinc-300">
            <p><b>Curso:</b> {titulo}</p>
            <p><b>Valor:</b> {preco}</p>
            <p><b>Status:</b> em análise</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={abrirAcompanhamento} className="rounded-2xl bg-white px-5 py-4 font-black text-black">Ver pedidos</button>
            <button onClick={onClose} className="rounded-2xl border border-white/10 px-5 py-4 font-black text-zinc-300">Fechar</button>
          </div>
          <p className="mt-4 text-xs font-bold text-zinc-500">A liberação é manual após conferência no banco.</p>
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
              <p className="inline-flex rounded-full border border-emerald-300/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100">Pagamento Pix manual</p>
              <h2 className="mt-4 text-2xl font-black leading-tight text-white md:text-3xl">{titulo}</h2>
              <p className="mt-2 text-sm font-bold text-zinc-400">Valor total: <span className="text-white">{preco}</span></p>
            </div>
            <button onClick={onClose} disabled={loading} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-lg font-black text-zinc-400 transition hover:text-white disabled:opacity-50">×</button>
          </div>
          <div className="relative mt-5 grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase tracking-[0.08em] text-zinc-500">
            {["1. Pix", "2. Dados", "3. Análise", "4. Acesso"].map((step, index) => (
              <div key={step} className={`rounded-2xl border px-2 py-2 ${index <= 1 ? "border-emerald-300/35 bg-emerald-500/10 text-emerald-100" : "border-white/10 bg-white/[0.03]"}`}>{step}</div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-5 md:p-6">
          <div className="rounded-2xl border border-amber-300/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-50">
            Depois de pagar, coloque as informações do Pix para o ADM verificar no banco se caiu. Você também pode anexar o comprovante.
          </div>
          <div className="rounded-[1.7rem] border border-zinc-800 bg-white p-5 text-center text-black shadow-xl shadow-white/5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Pague exatamente</p>
            <p className="mt-2 text-4xl font-black">{preco}</p>
            <p className="mt-3 text-xs font-bold leading-5 text-zinc-700">Abra o app do banco, use a chave Pix abaixo, pague o valor exato e volte aqui para registrar os dados.</p>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between gap-3"><p className="text-sm font-black text-zinc-200">Chave/Código Pix</p><p className="text-xs font-bold text-zinc-500">Copie e cole no banco</p></div>
            <textarea readOnly value={pixCode} className="h-20 w-full resize-none rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm text-zinc-200 outline-none focus:border-emerald-300/40" />
            <button onClick={copiarPix} className={`mt-2 w-full rounded-2xl py-3 font-black transition active:scale-[0.98] ${copiado ? "bg-emerald-400 text-black" : "border border-white/10 bg-white/[0.06] text-white hover:bg-white/[0.1]"}`}>{copiado ? "✓ Pix copiado" : "Copiar Pix"}</button>
          </div>
          <div className="rounded-[1.7rem] border border-white/10 bg-zinc-950 p-4">
            <h3 className="text-lg font-black text-white">Informações para conferência</h3>
            <p className="mt-1 text-xs leading-5 text-zinc-500">Preencha o que conseguir. Essas informações ajudam o ADM a achar seu pagamento no banco.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input value={nomePagador} onChange={(e) => setNomePagador(e.target.value)} placeholder="Nome de quem pagou" className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600" />
              <input value={horarioPix} onChange={(e) => setHorarioPix(e.target.value)} placeholder="Data/horário do Pix" className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600" />
              <input value={bancoPagador} onChange={(e) => setBancoPagador(e.target.value)} placeholder="Banco/app usado" className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600" />
              <input value={codigoComprovante} onChange={(e) => setCodigoComprovante(e.target.value)} placeholder="Código/ID do comprovante" className="rounded-2xl border border-white/10 bg-black/60 p-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600" />
            </div>
            <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} placeholder="Observação opcional: exemplo: paguei por outra conta, foi no nome da minha mãe, etc." className="mt-3 min-h-24 w-full rounded-2xl border border-white/10 bg-black/60 p-4 text-sm font-bold text-white outline-none placeholder:text-zinc-600" />
          </div>
          <div>
            <p className="mb-2 text-sm font-black text-zinc-200">Comprovante opcional</p>
            <label className={`group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed p-5 text-center transition ${arquivo ? "border-emerald-300/50 bg-emerald-500/10" : "border-sky-300/25 bg-sky-500/10 hover:border-sky-300/45"}`}>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setArquivo(e.target.files?.[0] ?? null)} className="hidden" />
              <span className="text-4xl">📎</span>
              <span className="mt-2 text-base font-black text-white">{arquivo ? "Comprovante anexado" : "Anexar comprovante"}</span>
              <span className="mt-1 text-xs font-bold text-zinc-400">PNG, JPG ou PDF. Opcional se você preencher os dados acima.</span>
            </label>
            {arquivo && <p className="mt-2 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-300">Arquivo: <span className="font-bold text-white">{arquivo.name}</span></p>}
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs leading-5 text-zinc-400">
            Depois do envio, sua compra fica em <b>em análise</b>. O ADM confere no banco. Se estiver tudo certo, libera o curso. Se faltar alguma informação, ele responde pelo pedido dentro do app.
          </div>
          <button onClick={enviar} disabled={loading} className="w-full rounded-2xl bg-white py-4 text-base font-black text-black shadow-lg shadow-white/10 transition hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Registrando compra..." : "Registrar pagamento para análise"}</button>
          <p className="text-center text-xs font-bold text-zinc-500">A liberação não é automática. O ADM precisa confirmar o Pix no banco.</p>
        </div>
      </div>
    </div>
  );
}
