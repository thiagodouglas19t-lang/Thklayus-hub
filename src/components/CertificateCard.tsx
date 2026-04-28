import { useMemo, useState } from "react";

type CertificateCardProps = {
  courseId: string;
  courseTitle: string;
  duration: string;
  totalLessons: number;
  completedLessons: number;
  finalProject: string;
};

function escapeHtml(text: string) {
  return text.replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  }[char] ?? char));
}

function hoursFromDuration(duration: string) {
  const match = duration.match(/(\d+)\s*h/i);
  if (match?.[1]) return `${match[1]} horas`;
  const months = duration.match(/(\d+)\s*mes/i);
  if (months?.[1]) return `${Number(months[1]) * 12} horas estimadas`;
  return duration;
}

export default function CertificateCard({ courseId, courseTitle, duration, totalLessons, completedLessons, finalProject }: CertificateCardProps) {
  const [studentName, setStudentName] = useState(() => localStorage.getItem("aprendaja_student_name") ?? "");
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const unlocked = percent >= 100;
  const workload = useMemo(() => hoursFromDuration(duration), [duration]);

  function updateName(value: string) {
    setStudentName(value);
    localStorage.setItem("aprendaja_student_name", value);
  }

  function downloadCertificate() {
    if (!unlocked) {
      alert("Conclua 100% das aulas para liberar o certificado.");
      return;
    }
    if (!studentName.trim()) {
      alert("Digite seu nome completo para gerar o certificado.");
      return;
    }

    const date = new Date().toLocaleDateString("pt-BR");
    const code = `APJ-${courseId.toUpperCase().replace(/[^A-Z0-9]/g, "-")}-${Date.now().toString().slice(-6)}`;
    const safeName = escapeHtml(studentName.trim());
    const safeCourse = escapeHtml(courseTitle);
    const safeProject = escapeHtml(finalProject);
    const safeWorkload = escapeHtml(workload);
    const safeCode = escapeHtml(code);
    const safeCourseId = escapeHtml(courseId);

    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Certificado - ${safeCourse}</title><style>*{box-sizing:border-box}body{margin:0;background:#09090b;color:#111;font-family:Inter,Arial,sans-serif;padding:24px}.sheet{max-width:1160px;margin:auto;padding:18px;border-radius:34px;background:linear-gradient(135deg,#0f172a,#111827 42%,#78350f);box-shadow:0 30px 100px rgba(0,0,0,.55)}.cert{position:relative;overflow:hidden;min-height:760px;padding:58px;background:#fffdf7;border-radius:26px;border:1px solid #ead7a2}.cert:before{content:"";position:absolute;inset:20px;border:2px solid #d6a94f;border-radius:20px;pointer-events:none}.watermark{position:absolute;inset:0;display:grid;place-items:center;font-size:150px;font-weight:900;color:rgba(17,24,39,.035);letter-spacing:-8px;transform:rotate(-18deg)}.top{position:relative;z-index:2;display:flex;justify-content:space-between;gap:22px;align-items:flex-start}.brand{display:flex;gap:14px;align-items:center}.logo{width:68px;height:68px;border-radius:22px;background:linear-gradient(135deg,#facc15,#ffffff,#93c5fd);display:grid;place-items:center;color:#111;font-size:30px;font-weight:900;box-shadow:0 10px 30px rgba(0,0,0,.12)}.brand small{display:block;font-size:11px;font-weight:900;letter-spacing:4px;color:#8a6a18}.brand strong{display:block;margin-top:4px;font-size:24px;font-weight:900;letter-spacing:2px}.seal{width:118px;height:118px;border-radius:999px;background:radial-gradient(circle,#fff 0 36%,#facc15 37% 52%,#111827 53%);display:grid;place-items:center;color:#fff;text-align:center;font-size:12px;font-weight:900;line-height:1.2;box-shadow:0 14px 40px rgba(0,0,0,.2)}.center{position:relative;z-index:2;text-align:center;margin-top:56px}.kicker{font-size:13px;font-weight:900;letter-spacing:7px;text-transform:uppercase;color:#a16207}.title{font-family:Georgia,serif;font-size:76px;line-height:.95;margin:18px 0 12px;font-weight:900;color:#111827}.text{font-size:18px;line-height:1.75;color:#4b5563;max-width:860px;margin:0 auto}.name{display:inline-block;margin:30px auto 12px;padding:0 42px 12px;border-bottom:2px solid #111827;font-family:Georgia,serif;font-size:52px;line-height:1.05;font-weight:900}.course{max-width:900px;margin:20px auto 0;font-size:30px;line-height:1.2;font-weight:900;color:#111827}.meta{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:42px}.box{border:1px solid #ead7a2;border-radius:18px;background:#fffbeb;padding:18px}.box small{display:block;font-size:11px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#a16207}.box strong{display:block;margin-top:8px;font-size:18px}.project{position:relative;z-index:2;margin-top:24px;padding:22px;border-radius:22px;background:#111827;color:#fff}.project small{font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#facc15}.project p{margin:10px 0 0;line-height:1.7;color:#e5e7eb}.footer{position:relative;z-index:2;display:flex;align-items:end;justify-content:space-between;gap:24px;margin-top:42px}.signature{min-width:280px;text-align:center}.line{border-top:2px solid #111827;margin-bottom:9px}.signature strong{font-size:15px}.legal{max-width:560px;font-size:11px;line-height:1.65;color:#6b7280}.auth{font-weight:900;color:#111827}.print{position:fixed;right:18px;bottom:18px;border:0;border-radius:18px;background:#111827;color:#fff;padding:14px 18px;font-weight:900;box-shadow:0 12px 30px rgba(0,0,0,.3)}@media print{body{background:#fff;padding:0}.sheet{box-shadow:none;border-radius:0;padding:0;background:#fff}.cert{border-radius:0;min-height:100vh}.print{display:none}}@media(max-width:760px){body{padding:10px}.cert{padding:34px 24px}.top{align-items:center}.title{font-size:42px}.name{font-size:30px;padding-left:10px;padding-right:10px}.course{font-size:21px}.meta{grid-template-columns:1fr}.seal{width:88px;height:88px}.footer{display:block}.legal{margin-top:24px}.watermark{font-size:80px}}</style></head><body><main class="sheet"><section class="cert"><div class="watermark">APRENDAJÁ</div><div class="top"><div class="brand"><div class="logo">A</div><div><small>CURSOS LIVRES</small><strong>AprendaJá</strong></div></div><div class="seal">CURSO<br/>LIVRE</div></div><div class="center"><div class="kicker">Certificado de Conclusão</div><h1 class="title">Certificado</h1><p class="text">Certificamos que</p><div class="name">${safeName}</div><p class="text">concluiu com aproveitamento o curso livre de</p><div class="course">${safeCourse}</div></div><div class="meta"><div class="box"><small>Carga horária</small><strong>${safeWorkload}</strong></div><div class="box"><small>Total de aulas</small><strong>${totalLessons} aulas</strong></div><div class="box"><small>Data de conclusão</small><strong>${date}</strong></div></div><div class="project"><small>Projeto final</small><p>${safeProject}</p></div><div class="footer"><div class="signature"><div class="line"></div><strong>Coordenação AprendaJá Cursos Livres</strong><br/><small>Assinatura digital da plataforma</small></div><div class="legal"><span class="auth">Código de autenticidade: ${safeCode}</span><br/>ID do curso: ${safeCourseId}<br/>Este certificado comprova a conclusão de um curso livre oferecido pela plataforma AprendaJá Cursos Livres, sem equivalência a diploma técnico, graduação ou certificação oficial regulamentada.</div></div></section></main><button class="print" onclick="window.print()">Salvar / imprimir PDF</button></body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado-${courseId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-[2rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_32%),rgba(250,204,21,0.06)] p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-300 text-3xl text-black">🏆</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Certificado de conclusão</p>
          <h3 className="mt-1 text-2xl font-black text-white">Curso Livre AprendaJá</h3>
          <p className="mt-2 text-sm leading-6 text-amber-50/75">Disponível para todos os cursos, inclusive gratuitos. Conclua 100% das aulas e baixe em HTML ou salve como PDF.</p>
        </div>
      </div>
      <input value={studentName} onChange={(event) => updateName(event.target.value)} placeholder="Nome completo do aluno" className="mt-4 w-full rounded-2xl border border-amber-300/20 bg-black/45 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-zinc-500 focus:border-amber-200/50" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300 transition-all" style={{ width: `${percent}%` }} /></div>
          <p className="mt-2 text-xs font-bold text-amber-100/70">{completedLessons}/{totalLessons} aulas concluídas • {percent}%</p>
        </div>
        <button onClick={downloadCertificate} className={`rounded-2xl px-5 py-3 text-sm font-black ${unlocked ? "bg-amber-300 text-black" : "border border-amber-300/20 text-amber-100/50"}`}>{unlocked ? "Baixar certificado" : "Bloqueado"}</button>
      </div>
    </section>
  );
}
