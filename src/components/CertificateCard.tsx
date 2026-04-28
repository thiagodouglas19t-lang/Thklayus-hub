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

    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Certificado - ${safeCourse}</title><style>*{box-sizing:border-box}body{margin:0;background:#0b0d12;color:#111;font-family:Inter,Arial,sans-serif;padding:22px}.sheet{max-width:1200px;margin:auto;background:#fff;box-shadow:0 40px 120px rgba(0,0,0,.45);padding:14px}.cert{position:relative;overflow:hidden;min-height:780px;background:#fff;border:3px solid #111;padding:0}.cert:before{content:"";position:absolute;inset:18px;border:1px solid #c9a227;pointer-events:none;z-index:5}.top{position:relative;z-index:2;min-height:205px;background:linear-gradient(145deg,#040404,#151515 62%,#0b0b0b);clip-path:polygon(0 0,100% 0,100% 70%,50% 100%,0 70%);display:grid;place-items:center;color:white}.top:after{content:"";position:absolute;left:0;right:0;bottom:18px;height:8px;background:linear-gradient(90deg,transparent,#c9a227 16%,#f5d675 50%,#c9a227 84%,transparent)}.medal{width:156px;height:156px;border-radius:999px;border:4px solid #d4af37;background:radial-gradient(circle at 30% 20%,#1f1f1f,#020202 70%);display:grid;place-items:center;text-align:center;box-shadow:0 0 0 10px rgba(212,175,55,.08)}.medal strong{display:block;font-family:Georgia,serif;font-size:54px;line-height:1;color:#fff;letter-spacing:-8px}.medal small{display:block;margin-top:8px;font-size:13px;letter-spacing:6px;color:#f6e7b4}.body{position:relative;z-index:2;padding:38px 70px 34px}.watermark{position:absolute;inset:150px 0 auto 0;text-align:center;font-size:115px;font-weight:900;letter-spacing:-7px;color:rgba(0,0,0,.035);transform:rotate(-8deg);z-index:0}.title{text-align:center}.title h1{margin:0;font-family:Georgia,serif;font-size:74px;line-height:.95;letter-spacing:10px;text-transform:uppercase;color:#111}.title h2{margin:10px 0 0;font-size:25px;letter-spacing:6px;text-transform:uppercase;color:#8a6419}.rule{height:1px;background:linear-gradient(90deg,transparent,#c9a227,transparent);margin:20px auto;max-width:720px}.center{text-align:center;margin-top:18px}.text{font-size:16px;line-height:1.8;color:#333;margin:0}.name{display:inline-block;margin:18px auto 10px;padding:0 42px 12px;border-bottom:2px solid #c9a227;font-family:Georgia,serif;font-size:58px;line-height:1.05;font-style:italic;color:#111}.course{max-width:900px;margin:14px auto 0;font-size:25px;line-height:1.25;font-weight:900;color:#111}.brandLine{margin-top:12px;font-size:16px;line-height:1.7;color:#333}.brandLine strong{color:#000}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:30px}.box{border:1px solid #d6c18b;background:linear-gradient(180deg,#fff,#fbf7ec);padding:16px;border-radius:18px}.box small{display:block;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#8a6419}.box strong{display:block;margin-top:8px;font-size:16px;color:#111}.project{margin-top:18px;border:1px solid #d6c18b;background:#fffdf8;border-radius:18px;padding:18px}.project small{font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#8a6419}.project p{margin:8px 0 0;line-height:1.6;color:#333}.footer{display:grid;grid-template-columns:330px 1fr;gap:28px;align-items:end;margin-top:34px}.signature{text-align:center}.sign{font-family:Georgia,serif;font-style:italic;font-size:36px;color:#111;margin-bottom:-2px}.line{border-top:2px solid #111;margin-bottom:8px}.signature strong{font-size:15px;color:#111}.signature small{color:#555}.legal{font-size:10.5px;line-height:1.6;color:#555;text-align:left}.auth{font-weight:900;color:#111}.seal{position:absolute;left:55px;bottom:70px;width:116px;height:116px;border-radius:999px;background:radial-gradient(circle,#151515,#020202);border:8px solid #d4af37;color:#f6d878;display:grid;place-items:center;text-align:center;font-weight:900;line-height:1.2;box-shadow:0 12px 25px rgba(0,0,0,.18);z-index:3}.bottomBar{position:absolute;left:0;right:0;bottom:0;background:#080808;color:#d4af37;text-align:center;padding:13px;font-size:13px;font-weight:900;letter-spacing:5px;text-transform:uppercase}.print{position:fixed;right:18px;bottom:18px;border:0;border-radius:14px;background:#111;color:#f6d878;padding:14px 18px;font-weight:900;box-shadow:0 12px 30px rgba(0,0,0,.35)}@media print{body{background:#fff;padding:0}.sheet{box-shadow:none;padding:0}.cert{min-height:100vh}.print{display:none}}@media(max-width:760px){body{padding:10px}.top{min-height:165px}.medal{width:120px;height:120px}.medal strong{font-size:42px}.medal small{font-size:10px}.body{padding:28px 24px 72px}.title h1{font-size:38px;letter-spacing:4px}.title h2{font-size:15px;letter-spacing:2px}.name{font-size:32px;padding-left:10px;padding-right:10px}.course{font-size:19px}.meta{grid-template-columns:1fr}.footer{grid-template-columns:1fr}.seal{display:none}.watermark{font-size:58px;top:170px}.bottomBar{font-size:9px;letter-spacing:2px}}</style></head><body><main class="sheet"><section class="cert"><div class="top"><div class="medal"><div><strong>AJ</strong><small>CURSOS</small></div></div></div><div class="watermark">APRENDAJÁ</div><div class="seal">CURSO<br/>LIVRE<br/>100%</div><div class="body"><div class="title"><h1>Certificado</h1><div class="rule"></div><h2>De Conclusão — Curso Livre</h2></div><div class="center"><p class="text">Certificamos que</p><div class="name">${safeName}</div><p class="text">concluiu o curso livre</p><div class="course">${safeCourse}</div><p class="brandLine">oferecido pela plataforma <strong>AprendaJá Cursos Livres</strong>, demonstrando conclusão das aulas e atividades propostas.</p></div><div class="meta"><div class="box"><small>Carga horária</small><strong>${safeWorkload}</strong></div><div class="box"><small>Total de aulas</small><strong>${totalLessons} aulas</strong></div><div class="box"><small>Concluído em</small><strong>${date}</strong></div></div><div class="project"><small>Projeto final</small><p>${safeProject}</p></div><div class="footer"><div class="signature"><div class="sign">AprendaJá</div><div class="line"></div><strong>AprendaJá Cursos Livres</strong><br/><small>Assinatura digital da plataforma</small></div><div class="legal"><span class="auth">Código de autenticidade: ${safeCode}</span><br/>ID do curso: ${safeCourseId}<br/>Este certificado comprova a conclusão de um curso livre oferecido pela plataforma AprendaJá Cursos Livres, sem equivalência a diploma técnico, graduação ou certificação oficial regulamentada.</div></div></div><div class="bottomBar">Aprender hoje, transformar sempre.</div></section></main><button class="print" onclick="window.print()">Salvar / imprimir PDF</button></body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado-${courseId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-[2rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_32%),rgba(255,255,255,0.04)] p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl text-black">📜</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Certificado de conclusão — curso livre</p>
          <h3 className="mt-1 text-2xl font-black text-white">AprendaJá Cursos Livres</h3>
          <p className="mt-2 text-sm leading-6 text-amber-50/75">Visual premium em preto, branco e dourado. Disponível para todos os cursos, inclusive gratuitos. Não é diploma técnico nem certificado oficial regulamentado.</p>
        </div>
      </div>
      <input value={studentName} onChange={(event) => updateName(event.target.value)} placeholder="Nome completo do aluno" className="mt-4 w-full rounded-2xl border border-amber-300/20 bg-black/45 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-zinc-500 focus:border-amber-200/50" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-amber-300 transition-all" style={{ width: `${percent}%` }} /></div>
          <p className="mt-2 text-xs font-bold text-amber-100/70">{completedLessons}/{totalLessons} aulas concluídas • {percent}%</p>
        </div>
        <button onClick={downloadCertificate} className={`rounded-2xl px-5 py-3 text-sm font-black ${unlocked ? "bg-white text-black" : "border border-amber-300/20 text-amber-100/50"}`}>{unlocked ? "Baixar certificado" : "Bloqueado"}</button>
      </div>
    </section>
  );
}
