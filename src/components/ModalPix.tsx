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

  if (!open) return null;

  async function copiarPix() {
    await navigator.clipboard.writeText(pixCode);
    alert("Chave Pix copiada!");
  }

  async function enviar() {
    if (!arquivo) {
      alert("Envie o comprovante para criar a compra. O curso só libera depois da conferência manual.");
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
      alert("Erro ao criar chat da compra: " + threadError.message);
      setLoading(false);
      return;
    }

    const mensagemInicial = `Compra enviada para análise\n\nCurso: ${titulo}\nValor: ${preco}\nStatus: em análise\n\n⚠️ O curso só será liberado depois que o ADM confirmar o Pix no banco.`;

    const { error: messageError } = await supabase.from("chat_messages").insert({
      thread_id: threadData.id,
      user_id: userData.user.id,
      content: mensagemInicial,
      file_url: comprovanteUrl,
    });

    if (messageError) {
      alert("Compra criada, mas deu erro ao salvar a primeira mensagem: " + messageError.message);
      setLoading(false);
      return;
    }

    alert("Compra enviada para análise. Acompanhe pelo Chat.");
    setArquivo(null);
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur">
      <div className="w-full max-w-md rounded-[2rem] border border-zinc-800 bg-zinc-950 p-5 shadow-2xl md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-emerald-300">Pagamento seguro</p>
            <h2 className="mt-1 text-2xl font-black">{titulo}</h2>
            <p className="mt-1 text-zinc-400">Valor total: {preco}</p>
          </div>
          <button onClick={onClose} disabled={loading} className="rounded-full border border-zinc-800 px-3 py-1 font-black text-zinc-400">×</button>
        </div>

        <div className="my-5 rounded-3xl border border-zinc-800 bg-white p-5 text-center text-black">
          <p className="text-sm font-black">PIX</p>
          <div className="mx-auto my-4 flex h-36 w-36 items-center justify-center rounded-2xl border-4 border-black px-3 text-xs font-black">
            CHAVE PIX
          </div>
          <p className="text-xs">Copie a chave, pague, depois envie o comprovante.</p>
        </div>

        <div className="rounded-2xl border border-amber-900 bg-amber-950/20 p-3 text-xs leading-5 text-amber-100">
          🛡️ Curso só libera depois da conferência manual. Print falso não libera acesso.
        </div>

        <p className="mb-2 mt-4 text-sm font-black text-zinc-300">Chave Pix</p>
        <textarea readOnly value={pixCode} className="h-20 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none" />
        <button onClick={copiarPix} className="mt-2 w-full rounded-2xl border border-zinc-700 py-3 font-black text-zinc-200">Copiar chave Pix</button>

        <label className="mt-4 block text-sm font-black text-zinc-300">Comprovante obrigatório</label>
        <input type="file" accept="image/*,.pdf" onChange={(e) => setArquivo(e.target.files?.[0] ?? null)} className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm" />

        {arquivo && <p className="mt-2 text-sm text-zinc-400">Arquivo: {arquivo.name}</p>}

        <div className="mt-5 flex gap-3">
          <button onClick={enviar} disabled={loading} className="flex-1 rounded-2xl bg-white py-3 font-black text-black disabled:opacity-60">
            {loading ? "Enviando..." : "Enviar para análise"}
          </button>
        </div>
      </div>
    </div>
  );
}
