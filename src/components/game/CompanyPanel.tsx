import { company } from "../../lib/company";

export default function CompanyPanel() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-[2rem] border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(8,15,30,.95),rgba(3,8,20,.96))] p-5 shadow-[0_0_80px_rgba(14,165,233,.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-cyan-200">{company.name}</p>
            <h2 className="mt-1 text-3xl font-black">{company.product}</h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">{company.tagline}</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-emerald-200">Servidor</p>
            <strong className="text-xl text-white">{company.status}</strong>
            <p className="text-xs text-zinc-400">Uptime {company.uptime}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">{company.activePlayersLabel}</p>
            <strong className="mt-2 block text-3xl">{company.activePlayers}</strong>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">{company.supportLabel}</p>
            <strong className="mt-2 block text-2xl">{company.supportStatus}</strong>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500">Versão</p>
            <strong className="mt-2 block text-xl">{company.version}</strong>
          </div>
        </div>

        <div className="mt-5 rounded-[1.7rem] border border-violet-300/10 bg-violet-500/10 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-violet-200">Próxima atualização</p>
          <h3 className="mt-2 text-2xl font-black">{company.nextUpdate}</h3>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-yellow-200">Novidades</p>
              <h3 className="text-2xl font-black">Atualizações</h3>
            </div>
            <span className="rounded-full bg-yellow-300 px-3 py-1 text-[10px] font-black text-black">LIVE</span>
          </div>

          <div className="space-y-3">
            {company.news.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <h4 className="font-black">{item.title}</h4>
                <p className="mt-1 text-xs text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200">THKLAYUS</p>
          <h3 className="text-2xl font-black">Equipe</h3>
          <div className="mt-3 space-y-3">
            {company.departments.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <div>
                  <strong>{dept.name}</strong>
                  <p className="text-xs text-zinc-400">{dept.status}</p>
                </div>
                <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,.9)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
