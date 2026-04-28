export default function Home({ setPage }: any) {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/10 bg-black p-6">
        <h2 className="text-4xl font-black">Serviços digitais simples e rápidos</h2>
        <p className="mt-3 text-zinc-400">Peça apresentações, artes com IA e packs digitais direto pelo app.</p>
        <div className="mt-5 flex gap-3">
          <button onClick={() => setPage("pedidos")} className="bg-white text-black px-6 py-3 rounded-2xl font-black">Pedir agora</button>
          <button onClick={() => setPage("chat")} className="border border-white/10 px-6 py-3 rounded-2xl font-black">Falar no chat</button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="border border-white/10 p-5 rounded-2xl">
          <h3 className="text-xl font-black">Apresentação com IA</h3>
          <p className="text-zinc-400 mt-2">Até 6 slides com texto organizado e imagens ilustrativas.</p>
          <p className="mt-2 font-black">R$10</p>
        </div>

        <div className="border border-white/10 p-5 rounded-2xl">
          <h3 className="text-xl font-black">Arte com IA</h3>
          <p className="text-zinc-400 mt-2">Imagem estilo anime, dark ou perfil personalizada.</p>
          <p className="mt-2 font-black">R$5</p>
        </div>

        <div className="border border-white/10 p-5 rounded-2xl">
          <h3 className="text-xl font-black">Pack digital</h3>
          <p className="text-zinc-400 mt-2">Conjunto de imagens, wallpapers ou ideias.</p>
          <p className="mt-2 font-black">R$10</p>
        </div>
      </section>

      <section className="border border-white/10 p-5 rounded-2xl">
        <p className="text-sm text-zinc-400">Os serviços utilizam IA + revisão manual. Algumas imagens podem ser ilustrativas ou geradas por IA.</p>
      </section>
    </div>
  );
}
