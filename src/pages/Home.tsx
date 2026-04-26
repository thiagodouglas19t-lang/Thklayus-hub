import { professionalCourses } from "../data/courses";

export default function Home({ setPage }: any) {
  const populares = professionalCourses.slice(0, 4);

  const acoes = [
    { title: "Ver cursos", text: "Catálogo completo com ID, preço e detalhes.", icon: "◈", page: "cursos" },
    { title: "Meus cursos", text: "Acesse cursos grátis, comprados e liberados pelo ADM.", icon: "▣", page: "estudo" },
    { title: "Suporte", text: "Abra ticket e acompanhe atendimento no app.", icon: "◇", page: "suporte" },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(124,58,237,0.38),transparent_34%),radial-gradient(circle_at_95%_15%,rgba(56,189,248,0.24),transparent_32%),radial-gradient(circle_at_70%_100%,rgba(16,185,129,0.14),transparent_32%)]" />
        <div className="relative grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-200">THKLAYUS HUB</span>
              <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-200">Aprenda pelo celular</span>
            </div>

            <h2 className="mt-5 max-w-4xl text-4xl font-black leading-[1.01] tracking-[-0.06em] md:text-7xl">
              Cursos práticos, suporte e serviços digitais em um só lugar.
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 md:text-lg">
              Aprenda com aulas diretas, acompanhe compras por ID, peça serviços e fale no chat sem bagunça. Simples igual plataforma grande, com cara THKLAYUS.
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-6 py-4 font-black text-black shadow-lg shadow-blue-500/20 transition hover:scale-[1.03] active:scale-95">Ver cursos</button>
              <button onClick={() => setPage("estudo")} className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 font-black text-white transition hover:border-blue-400/40 hover:bg-blue-500/10 active:scale-95">Meus cursos</button>
              <button onClick={() => setPage("pedidos")} className="rounded-2xl border border-violet-400/30 bg-violet-500/10 px-6 py-4 font-black text-violet-100 transition hover:bg-violet-500/20 active:scale-95">Pedir serviço</button>
            </div>
          </div>

          <div className="grid gap-3">
            {[[`${professionalCourses.length}+`, "cursos completos"], ["ID", "controle de acesso"], ["ADM", "liberação manual"], ["Chat", "suporte interno"]].map(([valor, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/45 p-5 shadow-xl shadow-black/30 backdrop-blur-xl">
                <p className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-black text-transparent md:text-5xl">{valor}</p>
                <p className="mt-1 text-sm font-bold text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {acoes.map((item) => (
          <button key={item.title} onClick={() => setPage(item.page)} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 text-left shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/40 active:scale-[0.99]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/15 to-violet-500/10 opacity-80 transition group-hover:opacity-100" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-black/50 text-2xl font-black text-blue-200 shadow-lg shadow-black/30">{item.icon}</div>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">{item.text}</p>
              <p className="mt-5 inline-flex rounded-2xl bg-white px-4 py-2 text-sm font-black text-black transition group-hover:scale-[1.03]">Abrir</p>
            </div>
          </button>
        ))}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-300">Cursos populares</p>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.03em]">Comece por aqui</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">Cursos com conteúdo completo e ID igual na vitrine e na área do aluno.</p>
          </div>
          <button onClick={() => setPage("cursos")} className="rounded-2xl bg-white px-5 py-3 font-black text-black shadow-lg shadow-blue-500/20 transition active:scale-95">Ver catálogo</button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {populares.map((course) => (
            <button key={course.id} onClick={() => setPage("cursos")} className="overflow-hidden rounded-3xl border border-white/10 bg-black/45 text-left transition hover:border-blue-300/40 active:scale-[0.99]">
              <div className="bg-white p-4 text-black">
                <p className="text-4xl">{course.hero}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">ID: {course.id}</p>
                <h4 className="mt-2 text-lg font-black leading-tight">{course.title}</h4>
              </div>
              <div className="p-4">
                <p className="text-sm text-zinc-400">{course.category} • {course.duration}</p>
                <p className="mt-2 text-xl font-black text-emerald-200">{course.price}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white p-5 text-black shadow-2xl shadow-blue-500/10 md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-200 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black tracking-[-0.03em]">Quer comprar ou liberar curso?</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-700">Use o ID do curso no ADM. Exemplo: tecnico-eletronica.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setPage("admin")} className="rounded-2xl bg-black px-5 py-3 font-black text-white">Abrir ADM</button>
            <button onClick={() => setPage("chat")} className="rounded-2xl border border-zinc-300 px-5 py-3 font-black">Ver chat</button>
          </div>
        </div>
      </section>
    </div>
  );
}
