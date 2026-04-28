export default function Sobre() {
  const pilares = [
    ["Aprender sozinho", "Cursos feitos para estudar pelo celular, com explicação simples e prática."],
    ["Curso livre", "Certificado de Conclusão — Curso Livre, sem equivalência a diploma técnico ou formação oficial."],
    ["Entrega real", "Cada curso deve levar o aluno a criar algo: arte, currículo, apresentação, roteiro ou projeto."],
    ["Transparência", "Sem promessa falsa, sem emprego garantido e sem professor particular quando isso não existir."],
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_34%),rgba(255,255,255,0.035)] p-6 md:p-9">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-200">Sobre o AprendaJá</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">Cursos práticos, honestos e feitos para aprender no seu ritmo.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">O AprendaJá Cursos Livres é uma plataforma de estudo guiado. A proposta é entregar conteúdo direto, exemplos, passo a passo, exercícios, projeto final e certificado de conclusão para quem quer aprender algo útil sem complicação.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {pilares.map(([title, text]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-zinc-950 p-5">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h2 className="text-2xl font-black text-emerald-100">O que o aluno recebe</h2>
          <div className="mt-4 space-y-2 text-sm leading-6 text-emerald-50/80">
            <p>✓ Aulas em texto completas e organizadas</p>
            <p>✓ Exemplos práticos do dia a dia</p>
            <p>✓ Passo a passo para aplicar</p>
            <p>✓ Exercícios e projeto final</p>
            <p>✓ Certificado de Conclusão — Curso Livre</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-6">
          <h2 className="text-2xl font-black text-amber-100">O que não prometemos</h2>
          <div className="mt-4 space-y-2 text-sm leading-6 text-amber-50/80">
            <p>• Diploma técnico, graduação ou certificação oficial regulamentada</p>
            <p>• Reconhecimento pelo MEC</p>
            <p>• Professor particular ou aula ao vivo</p>
            <p>• Emprego garantido ou renda garantida</p>
            <p>• Resultado impossível sem prática do aluno</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white p-6 text-black">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Aviso legal</p>
        <p className="mt-3 text-sm font-bold leading-7 text-zinc-800">Este certificado comprova a conclusão de um curso livre oferecido pela plataforma AprendaJá Cursos Livres, sem equivalência a diploma técnico, graduação ou certificação oficial regulamentada.</p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-zinc-950 p-6">
        <h2 className="text-2xl font-black text-white">Marca</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-400">O app usa o nome AprendaJá para a plataforma de cursos. THKLAYUS fica como marca criadora/estrutura do projeto, sem aparecer como promessa oficial de certificado.</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/35 p-4">
          <p className="text-sm font-black text-zinc-300">Criado por Thiago • Projeto THKLAYUS</p>
          <p className="mt-1 text-xs text-zinc-500">Plataforma: AprendaJá Cursos Livres</p>
        </div>
      </section>
    </div>
  );
}
