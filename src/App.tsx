import { useState } from "react";
import { services } from "./data/services";

export default function App() {
  const [name, setName] = useState("");

  const phone = "5585992686478";

  const handleBuy = (service: { title: string; price: string }) => {
    const message = `Olá! Me chamo ${
      name || "cliente"
    } e quero comprar: ${service.title} - ${service.price}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const handleContact = () => {
    const message = `Olá! Me chamo ${
      name || "cliente"
    } e quero falar com o dev sobre um projeto.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const getStatusText = (status: string) => {
    if (status === "popular") return "Popular";
    if (status === "novo") return "Novo";
    return "Disponível";
  };

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <header className="mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Kairós Platform
        </p>

        <h1 className="mb-3 text-4xl font-black md:text-5xl">
          Cursos, serviços e suporte dev em um só lugar.
        </h1>

        <p className="max-w-2xl text-zinc-400">
          Compre cursos, peça serviços digitais e fale direto com o dev quando
          precisar de algo personalizado.
        </p>
      </header>

      <section className="mb-10 flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 md:flex-row">
        <input
          type="text"
          placeholder="Seu nome..."
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-white"
        />

        <button
          onClick={handleContact}
          className="rounded-2xl bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02] hover:opacity-90"
        >
          Falar com o dev
        </button>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.id}
            className={`rounded-3xl border p-6 transition hover:scale-[1.02] ${
              service.highlight
                ? "border-white bg-zinc-900"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                {getStatusText(service.status)}
              </span>

              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                {service.category}
              </span>
            </div>

            <h2 className="mb-2 text-2xl font-bold">{service.title}</h2>

            <p className="mb-4 text-sm text-zinc-400">
              {service.description}
            </p>

            <p className="mb-4 text-sm text-zinc-300">
              Entrega:{" "}
              <span className="font-semibold text-white">
                {service.delivery}
              </span>
            </p>

            <ul className="mb-6 space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="text-sm text-zinc-400">
                  ✓ {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xl font-black">{service.price}</span>

              <button
                onClick={() => handleBuy(service)}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-black transition hover:opacity-80"
              >
                Comprar
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="mb-2 text-lg font-bold">🎓 Cursos</h3>
          <p className="text-sm text-zinc-400">
            Conteúdos digitais para o usuário estudar dentro do app.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="mb-2 text-lg font-bold">🛒 Pedidos</h3>
          <p className="text-sm text-zinc-400">
            Clientes podem pedir artes, sites, apps e serviços personalizados.
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="mb-2 text-lg font-bold">⚡ Dev/Admin</h3>
          <p className="text-sm text-zinc-400">
            Depois vamos criar painel interno para acompanhar pedidos e entregas.
          </p>
        </div>
      </section>

      <button
        onClick={handleContact}
        className="fixed bottom-5 right-5 rounded-full bg-white px-5 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-105"
      >
        Suporte Dev
      </button>
    </div>
  );
}
