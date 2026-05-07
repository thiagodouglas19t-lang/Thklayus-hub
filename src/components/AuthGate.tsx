import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase, supabaseConfigMessage, supabaseConfigOk } from "../lib/supabase";
import { isAdminEmail } from "../lib/admin";

type AuthGateProps = {
  user: User | null;
  onUserChange: (user: User | null) => void;
};

export default function AuthGate({ user, onUserChange }: AuthGateProps) {
  const [email, setEmail] = useState("thiagodouglas19t@gmail.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState(supabaseConfigMessage);
  const isAdmin = isAdminEmail(user?.email);

  async function submit() {
    if (!supabaseConfigOk) {
      setMessage(supabaseConfigMessage);
      return;
    }

    const action = mode === "login"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password });

    const { data, error } = await action;
    if (error) {
      setMessage(error.message);
      return;
    }

    onUserChange(data.user ?? null);
    setMessage(mode === "login" ? "Login feito." : "Conta criada. Se pedir confirmação, confira o e-mail.");
  }

  async function logout() {
    await supabase.auth.signOut();
    onUserChange(null);
    setMessage("Você saiu da conta.");
  }

  if (user) {
    return (
      <div className="glass-card rounded-[2rem] p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Conta</p>
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 p-4">
          <p className="text-sm text-zinc-400">Logado como</p>
          <strong className="break-all text-sm text-white">{user.email}</strong>
          {isAdmin && <p className="mt-2 rounded-full bg-amber-300 px-3 py-1 text-center text-xs font-black text-black">ADM · dinheiro infinito</p>}
          <button onClick={logout} className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white hover:bg-white/10">Sair</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-[2rem] p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Login</p>
      <div className="mt-3 grid gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-bold outline-none focus:border-violet-300" placeholder="E-mail" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-bold outline-none focus:border-violet-300" placeholder="Senha" />
        <button onClick={submit} className="rounded-2xl bg-violet-300 px-4 py-3 font-black text-black">{mode === "login" ? "Entrar" : "Criar conta"}</button>
        <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-sm font-bold text-violet-200">{mode === "login" ? "Criar uma conta" : "Já tenho conta"}</button>
        <p className="text-xs text-zinc-500">{message}</p>
      </div>
    </div>
  );
}
