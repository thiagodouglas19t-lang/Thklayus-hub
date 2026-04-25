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

export default function ModalPix({
  open,
  onClose,
  cursoId,
  titulo,
  preco,
  pixCode,
}: ModalPixProps) {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function enviar() {
    setLoading(true);

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      alert("Entre na sua conta antes de enviar o comprovante.");
      setLoading(false);
      return;
    }

    let comprovanteUrl = "";

    if (arquivo) {
      const filePath = `${userData.user.id}/compras/${Date.now()}-${arquivo.name}`;
      const { error: uploadError } = await supabase.storage
        .from("chat-files")
        .upload(filePath, arquivo);

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
        status: "comprovante enviado",
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

    const mensagemInicial = `Compra criada\n\nCurso comprado: ${titulo}\nValor total: ${preco}\nStatus: comprovante enviado\n\nO cliente enviou o comprovante para análise.`;

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

    alert("Compra enviada! Um chat interno foi criado para acompanhamento.");
    setArquivo(null);
    setLoading(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-2xl font-black">{titulo}</h2>
        <p className="mt-2 text-zinc-400">Valor total: {preco}</p>

        <div className="my-5 rounded-3xl border border-zinc-800 bg-white p-5 text-center text-black">
          <p className="text-sm font-black">PIX</p>
          <div className="mx-auto my-4 flex h-40 w-40 items-center justify-center rounded-2xl border-4 border-black px-3 text-xs font-black">
            PAGUE COM A CHAVE ABAIXO
          </div>
          <p className="text-xs">Depois envie o comprovante para criar o chat da compra.</p>
        </div>

        <p className="mb-2 text-sm font-black text-zinc-300">Chave Pix</p>
        <textarea
          readOnly
          value={pixCode}
          className="h-24 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm outline-none"
        />

        <label className="mt-4 block text-sm font-black text-zinc-300">Comprovante</label>
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
          className="mt-2 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm"
        />

        {arquivo && <p className="mt-2 text-sm text-zinc-400">Arquivo: {arquivo.name}</p>}

        <div className="mt-5 flex gap-3">
          <button
            onClick={enviar}
            disabled={loading}
            className="flex-1 rounded-2xl bg-white py-3 font-black text-black disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar e criar chat"}
          </button>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-2xl border border-zinc-700 px-5 py-3 font-black disabled:opacity-60"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
