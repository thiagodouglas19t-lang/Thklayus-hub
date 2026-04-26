import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { professionalCourses } from "../data/courses";

type Produto = { id: string; nome: string; descricao: string; preco: string; tipo: "purchase" | "order" };

const cursoPrincipal = professionalCourses.find((course) => course.id === "tecnico-eletronica");

const produtos: Produto[] = [
  { id: "tecnico-eletronica", nome: "Técnico em Eletrônica • Fundamentos Completos", descricao: "Curso principal: eletrônica do zero, segurança, componentes, multímetro, esquemas e projetos práticos.", preco: "R$ 29,90", tipo: "purchase" },
  { id: "powerpoint-pro", nome: "PowerPoint Profissional", descricao: "Aprenda a criar apresentações bonitas para escola, trabalho e clientes.", preco: "R$ 9,90", tipo: "purchase" },
  { id: "informatica-zero-iniciante", nome: "Informática do Zero", descricao: "Curso de entrada para aprender organização digital, internet, arquivos e ferramentas básicas.", preco: "R$ 4,90", tipo: "purchase" },
  { id: "servico-escolar", nome: "Serviço Escolar Personalizado", descricao: "Pedido de apresentação, resumo, mapa mental, trabalho ou material de estudo.", preco: "A combinar", tipo: "order" },
];

const whatsapp = "5585992686478";
const chavePix = "85 99268-6478";
const duvidaMsg = encodeURIComponent("Olá! Tenho dúvida sobre o curso de eletrônica do AprendaJá antes de comprar.");

function gerarMensagem(produto: Produto, compraId?: string, userId?: string) {
  return encodeURIComponent(`Olá! Quero comprar pelo AprendaJá.\n\nCurso/produto escolhido: ${produto.nome}\nID do curso/produto: ${produto.id}\nValor: ${produto.preco}\nID do usuário: ${userId || "preciso entrar na conta"}\nID da compra: ${compraId || "ainda não gerado"}\n\nEstou enviando o comprovante para liberar exatamente esse curso/produto.`);
}

export default function Pagamento() {
  const [produto, setProduto] = useState<Produto>(produtos[0]);
  const [loading, setLoading] = useState(false);
  const [compraId, setCompraId] = useState("");
  const [userId, setUserId] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const mensagem = useMemo(() => gerarMensagem(produto, compraId, userId), [produto, compraId, userId]);

  useEffect(() => { carregarUsuario(); }, []);

  async function carregarUsuario() { const { data } = await supabase.auth.getUser(); setUserId(data.user?.id ?? ""); }
  async function copiar(texto: string, mensagemOk: string) { try { await navigator.clipboard.writeText(texto); setSucesso(mensagemOk); } catch { setErro("Não consegui copiar nesse navegador. Copie manualmente: " + texto); } }
  async function copiarPix() { await copiar(chavePix, "Chave Pix copiada. Depois do pagamento, clique em Registrar compra."); }
  async function copiarUserId() { if (!userId) { setErro("Entre na sua conta para gerar seu ID de usuário."); return; } await copiar(userId, "ID do usuário copiado. Envie esse ID junto com o comprovante no WhatsApp."); }
  async function copiarProdutoId() { await copiar(produto.id, "ID do curso/produto copiado."); }

  async function registrarCompra() {
    setErro(""); setSucesso(""); setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setLoading(false); setErro("Entre na sua conta antes de registrar uma compra."); return; }
    setUserId(userData.user.id);
    const { data: thread, error: threadError } = await supabase.from("chat_threads").insert({ user_id: userData.user.id, type: produto.tipo, title: produto.tipo === "purchase" ? `Compra - ${produto.nome}` : `Pedido - ${produto.nome}`, status: produto.tipo === "purchase" ? "em análise" : "pendente", course_id: produto.id, course_title: produto.nome, price: produto.preco, total_price: produto.preco }).select("id").single();
    if (threadError) { setLoading(false); setErro("Erro ao registrar compra: " + threadError.message); return; }
    const { error: messageError } = await supabase.from("chat_messages").insert({ thread_id: thread.id, user_id: userData.user.id, content: produto.tipo === "purchase" ? `🛒 Compra registrada\n\nCurso/produto escolhido: ${produto.nome}\nID do curso/produto: ${produto.id}\nValor: ${produto.preco}\nID do usuário: ${userData.user.id}\nID da compra: ${thread.id}\nStatus: aguardando confirmação do Pix.\n\nEnvie o comprovante pelo WhatsApp informando o ID do usuário, ID da compra e o curso/produto escolhido para o ADM liberar exatamente o acesso certo.` : `📦 Pedido registrado\n\nProduto escolhido: ${produto.nome}\nID do produto: ${produto.id}\nValor: ${produto.preco}\nID do usuário: ${userData.user.id}\nID do pedido: ${thread.id}\nStatus: pendente.\n\nO ADM/DEV vai combinar os detalhes pelo chat ou WhatsApp.` });
    if (messageError) { setLoading(false); setErro("A compra foi criada, mas deu erro ao salvar a mensagem: " + messageError.message); setCompraId(thread.id); return; }
    setCompraId(thread.id); setLoading(false); setSucesso("Compra registrada. Agora envie o comprovante no WhatsApp com curso escolhido, ID do curso, seu ID de usuário e ID da compra.");
  }

  const modulos = cursoPrincipal?.modules ?? [];
  const aulas = modulos.reduce((sum, modulo) => sum + modulo.lessons.length, 0);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(251,191,36,0.22),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.22),transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="rounded-full border border-amber-300/25 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-100">Oferta principal • AprendaJá</span>
            <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.06em] md:text-7xl">Aprenda eletrônica do zero ao primeiro circuito funcional.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">Mesmo começando do básico, você aprende segurança, Lei de Ohm, resistores, LEDs, capacitores, protoboard, multímetro, esquemas e projetos práticos.</p>
            <div className="mt-6 flex flex-wrap gap-2">{[`${modulos.length} módulos`, `${aulas} aulas`, "Certificado", "Projetos práticos", "Bônus incluso"].map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-sm font-black text-zinc-200">{item}</span>)}</div>
            <div className="mt-7 flex flex-wrap items-center gap-4"><div><p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">Preço promocional</p><p className="text-5xl font-black text-emerald-200">R$ 29,90</p><p className="text-sm font-bold text-zinc-500 line-through">De R$ 49,90</p><p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-amber-200">Oferta inicial para primeiros alunos</p></div><button onClick={() => setProduto(produtos[0])} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-amber-500/20 transition active:scale-95">Quero começar agora</button></div>
            <a href={`https://wa.me/${whatsapp}?text=${duvidaMsg}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 text-sm font-black text-emerald-100">Tirar dúvida no WhatsApp</a>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/50 p-5">
            <p className="text-6xl">⚡</p>
            <h2 className="mt-4 text-3xl font-black">O que você vai aprender</h2>
            <div className="mt-5 space-y-3">{["Entender energia elétrica sem confusão", "Calcular resistores com Lei de Ohm", "Montar circuitos simples em baixa tensão", "Usar multímetro no básico", "Ler esquemas simples", "Criar projeto final documentado"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-zinc-200">✓ {item}</div>)}</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">{[["01", "Prática em toda aula", "Não é só teoria: o aluno faz atividade em cada etapa."], ["02", "Certificado", "Liberado ao concluir 100% do curso."], ["03", "Suporte direto", "Dúvidas podem ser tiradas pelo WhatsApp."], ["04", "Acesso seguro", "ADM libera só depois de confirmar o Pix."]].map(([num, title, text]) => <div key={String(num)} className="rounded-3xl border border-white/10 bg-zinc-950 p-5"><p className="text-3xl font-black text-blue-200">{num}</p><h3 className="mt-3 font-black text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p></div>)}</section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Bônus: checklist de bancada segura", "Bônus: roteiro de projeto final", "Bônus: material para baixar"].map((item) => <div key={item} className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-5"><p className="text-3xl">🎁</p><h3 className="mt-3 text-xl font-black text-amber-100">{item}</h3><p className="mt-2 text-sm leading-6 text-amber-100/70">Incluído para deixar o aluno com caminho claro até o resultado final.</p></div>)}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-6">
        <h2 className="text-3xl font-black">Módulos do curso principal</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{modulos.map((modulo, index) => <div key={modulo.title} className="rounded-2xl border border-white/10 bg-black/35 p-4"><p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Módulo {index + 1}</p><h3 className="mt-1 font-black text-white">{modulo.title}</h3><p className="mt-2 text-sm text-zinc-500">{modulo.lessons.length} aulas práticas</p></div>)}</div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Gostei porque não ficou só na teoria. Tem prática e projeto.", "A parte de segurança ajuda muito quem está começando.", "Ficou bem mais fácil entender resistor, LED e multímetro."].map((text, index) => <div key={text} className="rounded-[2rem] border border-white/10 bg-black/45 p-5"><p className="text-amber-200">★★★★★</p><p className="mt-4 text-sm leading-6 text-zinc-300">“{text}”</p><p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-zinc-600">Aluno teste {index + 1}</p></div>)}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-black/50 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white">Comprar no Pix</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">{produtos.map((item) => { const ativo = item.id === produto.id; return <button key={item.id} onClick={() => { setProduto(item); setCompraId(""); setErro(""); setSucesso(""); }} className={`rounded-3xl border p-5 text-left transition active:scale-95 ${ativo ? "border-blue-400 bg-blue-500/15" : "border-white/10 bg-white/[0.04]"}`}><h3 className="font-black text-white">{item.nome}</h3><p className="mt-2 text-sm text-zinc-400">{item.descricao}</p><p className="mt-3 break-all text-xs text-zinc-500">ID: {item.id}</p><p className="mt-4 text-2xl font-black text-blue-300">{item.preco}</p></button>; })}</div>
          <div className="mt-5 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-violet-100"><p>Escolhido: <span className="font-black text-white">{produto.nome}</span></p><p className="mt-1 break-all">ID: <span className="font-black text-white">{produto.id}</span></p><p className="mt-1">Valor: <span className="font-black text-blue-200">{produto.preco}</span></p><button onClick={copiarProdutoId} className="mt-3 rounded-xl bg-white px-4 py-2 text-xs font-black text-black">Copiar ID do curso</button></div>
          <p className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm text-blue-100">Chave Pix: <span className="font-black">{chavePix}</span></p>
          <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4 text-sm text-amber-100"><p className="font-black">Obrigatório no WhatsApp</p><p className="mt-1">Envie o comprovante com: curso escolhido, ID do curso, seu ID de usuário e ID da compra.</p><p className="mt-3 break-all text-xs">Seu ID: <span className="font-black">{userId || "entre na conta para aparecer"}</span></p><button onClick={copiarUserId} className="mt-3 rounded-xl bg-white px-4 py-2 text-xs font-black text-black">Copiar meu ID</button></div>
          {compraId && <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">ID da compra: <span className="font-black">{compraId}</span></p>}
          {erro && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-100">{erro}</p>}
          {sucesso && <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">{sucesso}</p>}
          <div className="mt-6 grid gap-3 md:grid-cols-2"><button onClick={copiarPix} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-black text-white">Copiar chave Pix</button><button onClick={registrarCompra} disabled={loading} className="rounded-2xl bg-white px-5 py-4 font-black text-black disabled:opacity-60">{loading ? "Registrando..." : compraId ? "Registrar outra compra" : "Registrar compra"}</button></div>
          <a href={`https://wa.me/${whatsapp}?text=${mensagem}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 font-black text-emerald-100">Enviar comprovante no WhatsApp</a>
        </div>
        <div className="space-y-4"><div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6"><h3 className="text-2xl font-black text-white">Como funciona</h3><div className="mt-5 space-y-3">{[["1", "Escolha o curso."], ["2", "Copie a chave Pix e pague."], ["3", "Clique em Registrar compra."], ["4", "Envie comprovante com IDs."], ["5", "ADM libera o acesso." ]].map(([num, text]) => <div key={num} className="flex gap-3 rounded-2xl border border-white/10 bg-black/35 p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white font-black text-black">{num}</span><p className="text-sm font-bold text-zinc-300">{text}</p></div>)}</div></div><div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 p-6"><h3 className="text-xl font-black text-emerald-100">Compra com suporte</h3><p className="mt-2 text-sm leading-6 text-emerald-100/75">Se tiver problema para acessar depois da confirmação, você chama no suporte e o ADM verifica seu ID da compra.</p></div><p className="text-xs leading-5 text-zinc-500">Anti-golpe: o acesso só é liberado depois do ADM conferir o Pix no banco.</p></div>
      </section>
    </div>
  );
}
