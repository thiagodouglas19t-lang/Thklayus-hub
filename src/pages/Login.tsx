import { useState } from "react";
import { supabase } from "../lib/supabase";

type LoginProps = {
  onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAuth() {
    if (!email.trim() || !senha.trim()) {
      alert("Preencha email e senha.");
      return;
    }

    setLoading(true);

    if (modoCadastro) {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Conta criada! Agora faça login.");
        setModoCadastro(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) {
        alert(error.message);
      } else {
        onLoginSuccess();
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-3xl font-black">
          {modoCadastro ? "Criar conta" : "Entrar"}
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Acesse sua conta para usar pedidos, tickets e cursos.
        </p>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
          />

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full rounded-2xl bg-white py-3 font-black text-black disabled:opacity-60"
          >
            {loading ? "Carregando..." : modoCadastro ? "Criar conta" : "Entrar"}
          </button>
        </div>

        <button
          onClick={() => setModoCadastro(!modoCadastro)}
          className="mt-5 text-sm font-bold text-zinc-400 underline"
        >
          {modoCadastro ? "Já tenho conta" : "Criar uma conta"}
        </button>
      </div>
    </div>
  );
}
