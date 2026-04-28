import { useState } from "react";
import { supabase } from "../lib/supabase";

type LoginProps = {
  onLoginSuccess: () => void;
};

type NoticeType = "success" | "error" | "info";

type Notice = {
  type: NoticeType;
  message: string;
};

function traduzirErroAuth(message: string) {
  const texto = message.toLowerCase();
  if (texto.includes("email not confirmed") || texto.includes("not confirmed")) return "Seu e-mail ainda não foi confirmado. Abra o Gmail, toque no link de confirmação e depois volte para fazer login. Se a página do link mostrar erro, tudo bem: volte para o app e tente entrar.";
  if (texto.includes("invalid login credentials")) return "E-mail ou senha incorretos. Confira se digitou certo. Se acabou de criar a conta, confirme o e-mail antes de entrar.";
  if (texto.includes("already registered") || texto.includes("already exists")) return "Esse e-mail já tem conta. Use Entrar em vez de Criar conta.";
  if (texto.includes("password")) return "Senha inválida. Use uma senha com pelo menos 6 caracteres.";
  return message;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modoCadastro, setModoCadastro] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [contaCriada, setContaCriada] = useState(false);

  async function handleAuth() {
    setNotice(null);
    if (!email.trim() || !senha.trim()) {
      setNotice({ type: "error", message: "Preencha e-mail e senha." });
      return;
    }

    setLoading(true);

    if (modoCadastro) {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setNotice({ type: "error", message: traduzirErroAuth(error.message) });
      } else {
        setContaCriada(true);
        setModoCadastro(false);
        setNotice({ type: "success", message: "Conta criada. Agora confirme o e-mail no Gmail. Depois volte aqui e toque em Entrar." });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha,
      });

      if (error) {
        setNotice({ type: "error", message: traduzirErroAuth(error.message) });
      } else {
        onLoginSuccess();
      }
    }

    setLoading(false);
  }

  async function reenviarConfirmacao() {
    setNotice(null);
    if (!email.trim()) {
      setNotice({ type: "error", message: "Digite seu e-mail para reenviar a confirmação." });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      setNotice({ type: "error", message: traduzirErroAuth(error.message) });
      return;
    }
    setNotice({ type: "success", message: "Enviei outro e-mail de confirmação. Confira o Gmail, inclusive Spam/Lixo eletrônico." });
  }

  function abrirGmail() {
    window.open("https://mail.google.com/", "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl shadow-black/50">
        <div className="mb-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200">AprendaJá</p>
          <p className="mt-2 text-sm leading-6 text-blue-50/80">Se o link do Gmail abrir uma tela branca ou mostrar erro, volte para o app e tente entrar normal. Muitas vezes a conta já foi confirmada.</p>
        </div>

        <h2 className="text-3xl font-black">
          {modoCadastro ? "Criar conta" : "Entrar"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {modoCadastro ? "Crie a conta e confirme pelo Gmail para liberar cursos, tickets e pagamentos." : "Entre para acessar cursos, enviar comprovante, abrir ticket e acompanhar liberação."}
        </p>

        {notice && (
          <div className={`mt-5 rounded-2xl border p-4 text-sm leading-6 ${notice.type === "success" ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100" : notice.type === "error" ? "border-red-400/20 bg-red-500/10 text-red-100" : "border-blue-400/20 bg-blue-500/10 text-blue-100"}`}>
            {notice.message}
          </div>
        )}

        {contaCriada && (
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm leading-6 text-amber-100">
            <p className="font-black">Passo a passo:</p>
            <p>1. Abra o Gmail.</p>
            <p>2. Procure o e-mail de confirmação.</p>
            <p>3. Toque no link.</p>
            <p>4. Se aparecer erro no navegador, volte aqui.</p>
            <p>5. Toque em Entrar.</p>
          </div>
        )}

        <div className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-white/30"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none focus:border-white/30"
          />

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full rounded-2xl bg-white py-3 font-black text-black disabled:opacity-60"
          >
            {loading ? "Carregando..." : modoCadastro ? "Criar conta" : "Entrar"}
          </button>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            onClick={() => { setModoCadastro(!modoCadastro); setNotice(null); }}
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-black text-zinc-300"
          >
            {modoCadastro ? "Já tenho conta" : "Criar uma conta"}
          </button>
          <button
            onClick={reenviarConfirmacao}
            disabled={loading}
            className="rounded-2xl border border-blue-400/25 bg-blue-500/10 px-4 py-3 text-sm font-black text-blue-100 disabled:opacity-60"
          >
            Reenviar confirmação
          </button>
        </div>

        <button
          onClick={abrirGmail}
          className="mt-3 w-full rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm font-black text-emerald-100"
        >
          Abrir Gmail
        </button>
      </div>
    </div>
  );
}
