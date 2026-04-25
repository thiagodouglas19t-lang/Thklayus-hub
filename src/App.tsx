import { useMemo, useState } from "react";

type Page = "home" | "cursos" | "estudo" | "pedidos" | "suporte" | "admin";

type StatusPedido = "pendente" | "em produção" | "entregue";
type StatusTicket = "aberto" | "em andamento" | "concluído";
type StatusCompra = "aguardando pagamento" | "comprovante enviado" | "liberado";

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: string;
  aulas: number;
  nivel: string;
  pix: string;
};

type Pedido = {
  id: number;
  nome: string;
  servico: string;
  detalhes: string;
  status: StatusPedido;
};

type Ticket = {
  id: number;
  nome: string;
  titulo: string;
  mensagem: string;
  status: StatusTicket;
};

type Compra = {
  id: number;
  curso: string;
  preco: string;
  status: StatusCompra;
};

const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Curso de Slides Escolares",
    descricao: "Aprenda a criar apresentações bonitas, organizadas e rápidas.",
    preco: "R$ 9,90",
    aulas: 8,
    nivel: "Iniciante",
    pix: "COLE_AQUI_O_PIX_COPIA_E_COLA_DO_CURSO_DE_SLIDES",
  },
  {
    id: 2,
    titulo: "Curso de Trabalhos Escolares",
    descricao: "Aprenda a montar trabalhos com capa, sumário, texto e organização.",
    preco: "R$ 14,90",
    aulas: 10,
    nivel: "Básico",
    pix: "COLE_AQUI_O_PIX_COPIA_E_COLA_DO_CURSO_DE_TRABALHOS",
  },
  {
    id: 3,
    titulo: "Curso de Design Simples",
    descricao: "Crie artes simples para posts, capas, banners e entregas rápidas.",
    preco: "R$ 7,90",
    aulas: 6,
    nivel: "Rápido",
    pix: "COLE_AQUI_O_PIX_COPIA_E_COLA_DO_CURSO_DE_DESIGN",
  },
];

const servicos = [
  {
    nome: "Slide escolar simples",
    preco: "R$ 7",
    descricao: "Apresentação simples, bonita e organizada.",
  },
  {
    nome: "Trabalho escolar completo",
    preco: "R$ 15",
    descricao: "Capa, organização, conteúdo e finalização.",
  },
  {
    nome: "Arte simples",
    preco: "R$ 5",
    descricao: "Card, capa, banner ou arte básica.",
  },
  {
    nome: "Resumo escolar",
    preco: "R$ 8",
    descricao: "Resumo direto, limpo e fácil de estudar.",
  },
];

export default function App() {
  const [pagina, setPagina] = useState<Page>("home");
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  const [compras, setCompras] = useState<Compra[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [nomeCliente, setNomeCliente] = useState("");
  const [pedidoServico, setPedidoServico] = useState(servicos[0].nome);
  const [pedidoDetalhes, setPedidoDetalhes] = useState("");

  const [ticketNome, setTicketNome] = useState("");
  const [ticketTitulo, setTicketTitulo] = useState("");
  const [ticketMensagem, setTicketMensagem] = useState("");

  const [comprovanteNome, setComprovanteNome] = useState("");

  const dados = useMemo(
    () => [
      { label: "Cursos", value: cursos.length },
      { label: "Serviços", value: servicos.length },
      { label: "Pedidos", value: pedidos.length },
      { label: "Tickets", value: tickets.length },
    ],
    [pedidos.length, tickets.length]
  );

  function abrirWhatsApp(texto: string) {
    const phone = "5585992686478";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  }

  function criarPedido() {
    if (!nomeCliente.trim() || !pedidoDetalhes.trim()) {
      alert("Preencha seu nome e os detalhes do pedido.");
      return;
    }

    const novoPedido: Pedido = {
      id: Date.now(),
      nome: nomeCliente,
      servico: pedidoServico,
      detalhes: pedidoDetalhes,
      status: "pendente",
    };

    setPedidos([novoPedido, ...pedidos]);
    setNomeCliente("");
    setPedidoServico(servicos[0].nome);
    setPedidoDetalhes("");
    alert("Pedido criado com sucesso!");
  }

  function abrirTicket() {
    if (!ticketNome.trim() || !ticketTitulo.trim() || !ticketMensagem.trim()) {
      alert("Preencha todos os campos do ticket.");
      return;
    }

    const novoTicket: Ticket = {
      id: Date.now(),
      nome: ticketNome,
      titulo: ticketTitulo,
      mensagem: ticketMensagem,
      status: "aberto",
    };

    setTickets([novoTicket, ...tickets]);
    setTicketNome("");
    setTicketTitulo("");
    setTicketMensagem("");
    alert("Ticket aberto com sucesso!");
  }

  function enviarComprovante() {
    if (!cursoSelecionado) return;

    const novaCompra: Compra = {
      id: Date.now(),
      curso: cursoSelecionado.titulo,
      preco: cursoSelecionado.preco,
      status: "comprovante enviado",
    };

    setCompras([novaCompra, ...compras]);
    setCursoSelecionado(null);
    setComprovanteNome("");
    alert("Comprovante enviado! Aguarde a liberação do curso.");
  }

  function liberarCurso(id: number) {
    setCompras(
      compras.map((compra) =>
        compra.id === id ? { ...compra, status: "liberado" } : compra
      )
    );
  }

  function atualizarPedido(id: number, status: StatusPedido) {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status } : pedido
      )
    );
  }

  function atualizarTicket(id: number, status: StatusTicket) {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/90 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <button onClick={() => setPagina("home")} className="text-left">
            <h1 className="text-xl font-black tracking-[0.25em]">THKLAYUS</h1>
            <p className="text-xs text-zinc-500">Cursos • Pedidos • Suporte</p>
          </button>

          <nav className="flex gap-2 overflow-x-auto pb-1 text-sm">
            {[
              ["home", "Home"],
              ["cursos", "Cursos"],
              ["estudo", "Estudo"],
              ["pedidos", "Pedidos"],
              ["suporte", "Tickets"],
              ["admin", "Admin"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setPagina(key as Page)}
                className={`whitespace-nowrap rounded-full px-4 py-2 font-bold transition ${
                  pagina === key
                    ? "bg-white text-black"
                    : "border border-zinc-800 bg-zinc-950 text-zinc-300"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        {pagina === "home" && (
          <div>
            <div className="rounded-[2rem] border border-zinc-800 bg-gradient-to-br from-zinc-950 to-black p-6 shadow-2xl md:p-10">
              <span className="mb-4 inline-block rounded-full border border-zinc-800 px-4 py-2 text-xs font-black text-zinc-400">
                APP OFICIAL
              </span>

              <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">
                Serviços baratos, cursos simples e suporte direto.
              </h2>

              <p className="mt-5 max-w-2xl text-zinc-400">
                Compre cursos, peça trabalhos escolares, abra tickets e acompanhe
                tudo dentro do THKLAYUS.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setPagina("cursos")}
                  className="rounded-2xl bg-white px-6 py-3 font-black text-black"
                >
                  Ver cursos
                </button>

                <button
                  onClick={() => setPagina("pedidos")}
                  className="rounded-2xl border border-zinc-700 px-6 py-3 font-black text-white"
                >
                  Criar pedido
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {dados.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <p className="text-4xl font-black">{item.value}</p>
                  <p className="text-sm text-zinc-500">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="mb-4 mt-10 text-2xl font-black">Serviços baratos</h3>

            <div className="grid gap-4 md:grid-cols-4">
              {servicos.map((servico) => (
                <div
                  key={servico.nome}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <h4 className="font-black">{servico.nome}</h4>
                  <p className="mt-2 text-sm text-zinc-400">
                    {servico.descricao}
                  </p>
                  <p className="mt-4 text-2xl font-black">{servico.preco}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pagina === "cursos" && (
          <div>
            <h2 className="text-3xl font-black">Cursos</h2>
            <p className="mt-2 text-zinc-400">
              Pagamento via Pix QR Code ou copia e cola com valor fixo.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {cursos.map((curso) => (
                <div
                  key={curso.id}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
                >
                  <p className="text-xs font-black uppercase text-zinc-500">
                    {curso.nivel} • {curso.aulas} aulas
                  </p>

                  <h3 className="mt-3 text-2xl font-black">{curso.titulo}</h3>

                  <p className="mt-3 text-sm text-zinc-400">
                    {curso.descricao}
                  </p>

                  <p className="mt-6 text-3xl font-black">{curso.preco}</p>

                  <button
                    onClick={() => setCursoSelecionado(curso)}
                    className="mt-5 w-full rounded-2xl bg-white py-3 font-black text-black"
                  >
                    Comprar curso
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {pagina === "estudo" && (
          <div>
            <h2 className="text-3xl font-black">Área de estudo</h2>
            <p className="mt-2 text-zinc-400">
              Aqui aparecem os cursos comprados e liberados.
            </p>

            <div className="mt-6 space-y-4">
              {compras.length === 0 ? (
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-500">
                  Nenhum curso comprado ainda.
                </div>
              ) : (
                compras.map((compra) => (
                  <div
                    key={compra.id}
                    className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black">{compra.curso}</h3>
                        <p className="text-sm text-zinc-500">{compra.preco}</p>
                      </div>

                      <span className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-zinc-300">
                        {compra.status}
                      </span>
                    </div>

                    {compra.status === "liberado" ? (
                      <button className="mt-5 rounded-2xl bg-white px-5 py-3 font-black text-black">
                        Continuar aula
                      </button>
                    ) : (
                      <p className="mt-5 text-sm text-zinc-500">
                        Aguarde o ADM liberar seu acesso.
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {pagina === "pedidos" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-3xl font-black">Criar pedido</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Pedido é para trabalho pago: slides, artes, resumos e trabalhos.
              </p>

              <div className="mt-5 space-y-3">
                <input
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
                />

                <select
                  value={pedidoServico}
                  onChange={(e) => setPedidoServico(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
                >
                  {servicos.map((servico) => (
                    <option key={servico.nome}>{servico.nome}</option>
                  ))}
                </select>

                <textarea
                  value={pedidoDetalhes}
                  onChange={(e) => setPedidoDetalhes(e.target.value)}
                  placeholder="Explique o que você precisa..."
                  className="min-h-32 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
                />

                <button
                  onClick={criarPedido}
                  className="w-full rounded-2xl bg-white py-3 font-black text-black"
                >
                  Enviar pedido
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-3xl font-black">Meus pedidos</h2>

              <div className="mt-5 space-y-3">
                {pedidos.length === 0 ? (
                  <p className="text-zinc-500">Nenhum pedido criado.</p>
                ) : (
                  pedidos.map((pedido) => (
                    <div
                      key={pedido.id}
                      className="rounded-2xl border border-zinc-800 bg-black p-4"
                    >
                      <p className="font-black">{pedido.servico}</p>
                      <p className="text-sm text-zinc-500">Cliente: {pedido.nome}</p>
                      <p className="mt-2 text-sm text-zinc-300">
                        {pedido.detalhes}
                      </p>
                      <p className="mt-3 text-xs font-black uppercase text-zinc-500">
                        {pedido.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {pagina === "suporte" && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-3xl font-black">Abrir ticket</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Ticket é para suporte, dúvida ou problema no app.
              </p>

              <div className="mt-5 space-y-3">
                <input
                  value={ticketNome}
                  onChange={(e) => setTicketNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
                />

                <input
                  value={ticketTitulo}
                  onChange={(e) => setTicketTitulo(e.target.value)}
                  placeholder="Título do ticket"
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
                />

                <textarea
                  value={ticketMensagem}
                  onChange={(e) => setTicketMensagem(e.target.value)}
                  placeholder="Explique sua dúvida..."
                  className="min-h-32 w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3 outline-none"
                />

                <button
                  onClick={abrirTicket}
                  className="w-full rounded-2xl bg-white py-3 font-black text-black"
                >
                  Abrir ticket
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-3xl font-black">Tickets</h2>

              <div className="mt-5 space-y-3">
                {tickets.length === 0 ? (
                  <p className="text-zinc-500">Nenhum ticket aberto.</p>
                ) : (
                  tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="rounded-2xl border border-zinc-800 bg-black p-4"
                    >
                      <p className="font-black">{ticket.titulo}</p>
                      <p className="text-sm text-zinc-500">Cliente: {ticket.nome}</p>
                      <p className="mt-2 text-sm text-zinc-300">
                        {ticket.mensagem}
                      </p>
                      <p className="mt-3 text-xs font-black uppercase text-zinc-500">
                        {ticket.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {pagina === "admin" && (
          <div>
            <h2 className="text-3xl font-black">Painel interno</h2>
            <p className="mt-2 text-zinc-400">
              Controle compras, pedidos e tickets.
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-2xl font-black">Compras</h3>

                <div className="mt-5 space-y-3">
                  {compras.length === 0 ? (
                    <p className="text-zinc-500">Nenhuma compra.</p>
                  ) : (
                    compras.map((compra) => (
                      <div
                        key={compra.id}
                        className="rounded-2xl border border-zinc-800 bg-black p-4"
                      >
                        <p className="font-black">{compra.curso}</p>
                        <p className="text-sm text-zinc-500">{compra.preco}</p>
                        <p className="mt-2 text-xs font-black uppercase text-zinc-400">
                          {compra.status}
                        </p>

                        {compra.status !== "liberado" && (
                          <button
                            onClick={() => liberarCurso(compra.id)}
                            className="mt-3 w-full rounded-xl bg-white py-2 text-sm font-black text-black"
                          >
                            Liberar curso
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
                <h3 className="text-2xl font-black">Pedidos</h3>

                <div className="mt-5 space-y-3">
                  {pedidos.length === 0 ? (
                    <p className="text-zinc-500">Nenhum pedido.</p>
                  ) : (
                    pedidos.map((pedido) => (
                      <div
                        k
