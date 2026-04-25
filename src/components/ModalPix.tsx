import { useState } from "react";

type ModalPixProps = {
  open: boolean;
  onClose: () => void;
  titulo: string;
  preco: string;
  pixCode: string;
};

export default function ModalPix({
  open,
  onClose,
  titulo,
  preco,
  pixCode,
}: ModalPixProps) {
  const [arquivo, setArquivo] = useState<string>("");

  if (!open) return null;

  function enviar() {
    alert("Comprovante enviado! Aguarde a liberação.");
    setArquivo("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-2xl font-black">{titulo}</h2>
        <p className="mt-2 text-zinc-400">Valor: {preco}</p>

        <div className="my-5 rounded-3xl border border-zinc-800 bg-white p-5 text-center text-black">
          <p className="text-sm font-black">QR CODE PIX</p>

          <div className="mx-auto my-4 flex h-40 w-40 items-center justify-center rounded-2xl border-4 border-black text-xs font-black">
            COLOQUE O QR AQUI
          </div>

          <p className="text-xs">
            Substituir por QR real depois
          </p>
        </div>

        <textarea
          readOnly
          value={pixCode}
          className="w-full h-24 rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm"
        />

        <input
          type="file"
          onChange={(e) =>
            setArquivo(e.target.files?.[0]?.name || "")
          }
          className="mt-4 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm"
        />

        {arquivo && (
          <p className="mt-2 text-sm text-zinc-400">
            Arquivo: {arquivo}
          </p>
        )}

        <div className="mt-5 flex gap-3">
          <button
            onClick={enviar}
            className="flex-1 rounded-2xl bg-white py-3 font-black text-black"
          >
            Enviar
          </button>

          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-700 px-5 py-3 font-black"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
