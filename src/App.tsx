import { useState } from "react";

export default function App() {
  const [user, setUser] = useState<any>(null);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      
      {/* Logo / Nome */}
      <h1 className="text-4xl font-bold mb-2">THKLAYUS</h1>
      <p className="text-gray-400 mb-8">Serviços + Suporte</p>

      {/* Se não estiver logado */}
      {!user && (
        <div className="bg-zinc-900 p-6 rounded-2xl w-[300px] flex flex-col gap-4">
          
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-black border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Senha"
            className="p-2 rounded bg-black border border-zinc-700"
          />

          <button className="bg-blue-600 p-2 rounded hover:bg-blue-700">
            Entrar
          </button>

          <button className="text-sm text-gray-400">
            Criar conta
          </button>
        </div>
      )}

      {/* Se estiver logado */}
      {user && (
        <div className="text-center">
          <h2 className="text-xl mb-4">Bem-vindo 👋</h2>

          <button className="bg-green-600 px-4 py-2 rounded">
            Abrir Ticket
          </button>
        </div>
      )}
    </div>
  );
}
