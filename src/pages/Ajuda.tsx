export default function Ajuda() {
  const faqs = [
    ["Como compro um curso?", "Entre em Cursos, escolha o curso, clique em Garantir acesso, copie o Pix, pague pelo app do banco e anexe o comprovante dentro do AprendaJá."],
    ["Preciso chamar no WhatsApp?", "Não. O caminho correto é fazer tudo pelo app: compra, comprovante, acompanhamento, suporte e acesso ao curso."],
    ["Onde vejo minha compra?", "Depois de enviar o comprovante, abra Pedidos. Lá aparece o status da compra: em análise, aprovada, recusada ou finalizada."],
    ["Quanto tempo demora a liberação?", "A liberação é manual após conferência do Pix. Quando aprovado, o curso aparece em Meus Cursos."],
    ["Onde estudo o curso comprado?", "Depois da aprovação, entre em Meus Cursos. Lá ficam as aulas, progresso, material e certificado."],
    ["Como pego o certificado?", "Conclua 100% das aulas, digite seu nome completo no campo de certificado e clique em baixar certificado."],
    ["O certificado é oficial ou MEC?", "Não. É Certificado de Conclusão — Curso Livre, sem equivalência a diploma técnico, graduação ou certificação oficial regulamentada."],
    ["Tem professor particular?", "Não. Os cursos são guiados para autoaprendizado, com explicação, exemplo, passo a passo, erros comuns, exercício e projeto final."],
    ["E se eu tiver problema?", "Abra Tickets dentro do app. Assim sua solicitação fica registrada e pode ser acompanhada sem depender de conversa fora da plataforma."],
  ];

  const passos = [
    ["1", "Escolha", "Veja o catálogo e escolha o curso."],
    ["2", "Pague", "Use Pix copia e cola dentro do app."],
    ["3", "Anexe", "Envie o comprovante no checkout."],
    ["4", "Acompanhe", "Veja o status em Pedidos."],
    ["5", "Estude", "Após aprovado, acesse Meus Cursos."],
    ["6", "Certifique", "Conclua 100% e baixe o certificado."],
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.16),transparent_34%),rgba(255,255,255,0.035)] p-6 md:p-9">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-200">Central de ajuda</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">Resolva tudo dentro do app.</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">Compra, comprovante, pedidos, estudo, certificado e suporte ficam no AprendaJá. Você não precisa chamar ninguém no WhatsApp para continuar.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-6">
        {passos.map(([num, title, text]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-zinc-950 p-4">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-sm font-black text-black">{num}</div>
            <h2 className="mt-3 font-black text-white">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-zinc-500">{text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 p-5">
        <h2 className="text-2xl font-black text-amber-100">Antes de abrir ticket</h2>
        <p className="mt-2 text-sm leading-7 text-amber-50/80">Confira Pedidos para status de compra e Meus Cursos para acesso liberado. A maioria das dúvidas é resolvida olhando essas duas áreas.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {faqs.map(([question, answer]) => (
          <div key={question} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
            <h3 className="text-lg font-black text-white">{question}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
