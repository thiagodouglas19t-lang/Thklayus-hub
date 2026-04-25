import { services } from "./data/services";

export default function App() {
  const handleBuy = (service: { title: string; price: string }) => {
    const phone = "5585992686478";

    const message = `Olá! Quero comprar o serviço: ${service.title} - ${service.price}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Header */}
      <h1 className="mb-2 text-3xl font-bold">Kairós Studio</h1>

      <p className="mb-10 text-zinc-400">
        Criação de sites, apps e soluções digitais
      </p>

      {/* Serviços */}
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-2xl border p-6 transition hover:scale-[1.02] ${
              service.highlight
                ? "border-white bg-zinc-900"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            {service.highlight && (
              <span className="mb-4 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                Mais vendido
              </span>
            )}

            <h2 className="mb-2 text-xl font-semibold">{service.title}</h2>

            <p className="mb-4 text-sm text-zinc-400">
              {service.description}
            </p>

            <div className="flex items-center justify-between gap-4">
              <span className="text-lg font-bold">{service.price}</span>

              <button
                onClick={() => handleBuy(service)}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-80"
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção confiança */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="mb-2 font-semibold">🚀 Rápido</h3>
          <p className="text-sm text-zinc-400">
            Entrega rápida e suporte direto com você.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="mb-2 font-semibold">💎 Premium</h3>
          <p className="text-sm text-zinc-400">
            Design moderno estilo app profissional.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="mb-2 font-semibold">🔥 Suporte</h3>
          <p className="text-sm text-zinc-400">
            Atendimento direto no WhatsApp sem enrolação.
          </p>
        </div>
      </div>

      {/* Botão fixo */}
      <a
        href="https://wa.me/5585992686478?text=Olá! Quero falar sobre um serviço."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-105"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
