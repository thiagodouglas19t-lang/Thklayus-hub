import { useState } from "react";

export default function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-widest">THKLAYUS</h1>
          <p className="text-gray-500 mt-2">Serviços • Suporte • Tickets</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

          {!user ? (
            <div className="flex flex-col gap-4">

              <input
                type="email"
                placeholder="Seu email"
                className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-blue-500"
              />

              <input
                type="password"
                placeholder="Sua senha"
                className="p-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-blue-500"
              />

              <button className="bg-blue-600 p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Entrar
              </button>

              <button className="text-sm text-gray-400 hover:text-white transition">
                Criar conta
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-center">

              <h2 className="text-xl font-semibold">Bem-vindo 👋</h2>

              <button className="bg-green-600 p-3 rounded-lg hover:bg-green-700">
                Abrir Ticket
              </button>

              <button className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700">
                Meus Tickets
              </button>

              <button
                onClick={() => setUser(null)}
                className="text-red-400 text-sm mt-2"
              >
                Sair
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
