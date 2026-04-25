import { services } from "./data/services";

export default function App() {
  return (
    <div className="min-h-screen px-6 py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Kairós Studio</h1>
      <p className="text-zinc-400 mb-10">
        Criação de sites, apps e soluções digitais
      </p>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-6 rounded-2xl border ${
              service.highlight
                ? "border-white bg-zinc-900"
                : "border-zinc-800 bg-zinc-950"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">
              {service.title}
            </h2>

            <p className="text-zinc-400 text-sm mb-4">
              {service.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                {service.price}
              </span>

              <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:opacity-80 transition">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
