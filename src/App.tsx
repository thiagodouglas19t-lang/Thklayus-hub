import { services } from "./data/services";

export default function App() {
  const handleBuy = (service: { title: string; price: string }) => {
    const phone = "5585992686478"; // seu número corrigido

    const message = `Olá! Quero comprar o serviço: ${service.title} - ${service.price}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <h1 className="mb-2 text-3xl font-bold">Kairós Studio</h1>

      <p className="mb-10 text-zinc-400">
        Criação de sites, apps e soluções digitais
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`rounded-2xl border p-6 ${
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
    </div>
  );
}
