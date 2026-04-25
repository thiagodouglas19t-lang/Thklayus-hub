import { useState } from "react";
import {
  LayoutDashboard,
  Ticket,
  ShieldCheck,
  Package,
  Plus,
  MessageCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

type Page = "dashboard" | "services" | "tickets" | "admin";

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-[0.25em]">THKLAYUS</h1>
            <p className="text-sm text-zinc-500">Hub de serviços e suporte</p>
          </div>

          <div className="rounded-full border border-zinc-800 bg-black px-4 py-2 text-sm text-zinc-300">
            Premium Support
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
          <NavButton icon={<LayoutDashboard size={18} />} label="Dashboard" active={page === "dashboard"} onClick={() => setPage("dashboard")} />
          <NavButton icon={<Package size={18} />} label="Serviços" active={page === "services"} onClick={() => setPage("services")} />
          <NavButton icon={<Ticket size={18} />} label="Tickets" active={page === "tickets"} onClick={() => setPage("tickets")} />
          <NavButton icon={<ShieldCheck size={18} />} label="ADM" active={page === "admin"} onClick={() => setPage("admin")} />
        </aside>

        <section>
          {page === "dashboard" && <Dashboard />}
          {page === "services" && <Services />}
          {page === "tickets" && <Tickets />}
          {page === "admin" && <Admin />}
        </section>
      </main>
    </div>
  );
}

function NavButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
        active
          ? "bg-white text-black"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500">Bem-vindo ao</p>
        <h2 className="mt-1 text-3xl font-bold">Thklayus Hub</h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Uma central profissional para serviços, suporte, tickets e administração.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat title="Tickets abertos" value="0" icon={<Clock />} />
        <Stat title="Serviços ativos" value="3" icon={<Package />} />
        <Stat title="Respostas ADM" value="0" icon={<MessageCircle />} />
      </div>
    </div>
  );
}

function Stat({ title, value, icon }: any) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="mb-4 text-zinc-500">{icon}</div>
      <p className="text-sm text-zinc-500">{title}</p>
      <h3 className="mt-1 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function Services() {
  const services = [
    "Suporte básico",
    "Criação de site simples",
    "Arte ou identidade visual"
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Serviços</h2>

      {services.map(service => (
        <div key={service} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
          <h3 className="font-semibold">{service}</h3>
          <p className="mt-2 text-sm text-zinc-500">
            Serviço disponível para solicitação via ticket.
          </p>
          <button className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
            Solicitar
          </button>
        </div>
      ))}
    </div>
  );
}

function Tickets() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold">Tickets</h2>
        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
          <Plus size={16} />
          Novo ticket
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <h3 className="font-semibold">Nenhum ticket ainda</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Quando alguém abrir um ticket, ele aparecerá aqui.
        </p>
      </div>
    </div>
  );
}

function Admin() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Painel ADM</h2>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <div className="mb-3 text-zinc-500">
          <ShieldCheck />
        </div>

        <h3 className="font-semibold">Área administrativa</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Aqui o ADM vai responder tickets, organizar suporte e controlar serviços.
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
          <CheckCircle2 size={16} />
          Visual pronto para conectar ao login ADM
        </div>
      </div>
    </div>
  );
}
