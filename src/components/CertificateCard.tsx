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

    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Certificado - ${safeCourse}</title><style>*{box-sizing:border-box}body{margin:0;background:#eef2f7;color:#111;font-family:Inter,Arial,sans-serif;padding:24px}.sheet{max-width:1160px;margin:auto;padding:16px;background:#ffffff;box-shadow:0 30px 100px rgba(15,23,42,.18)}.cert{position:relative;overflow:hidden;min-height:760px;padding:58px;background:#fff;border:3px solid #0f2a4a}.cert:before{content:"";position:absolute;inset:18px;border:1px solid #1d4ed8;pointer-events:none}.corner{position:absolute;width:220px;height:220px;background:#0f2a4a;transform:rotate(45deg)}.corner.one{left:-145px;top:-145px}.corner.two{right:-145px;bottom:-145px}.gold{position:absolute;width:260px;height:10px;background:#c9a227;transform:rotate(-45deg)}.gold.one{left:-62px;top:44px}.gold.two{right:-62px;bottom:44px}.watermark{position:absolute;inset:0;display:grid;place-items:center;font-size:120px;font-weight:900;color:rgba(15,42,74,.035);letter-spacing:-6px;transform:rotate(-18deg)}.top{position:relative;z-index:2;display:flex;justify-content:space-between;gap:22px;align-items:flex-start}.brand small{display:block;font-size:11px;font-weight:900;letter-spacing:4px;color:#1d4ed8}.brand strong{display:block;margin-top:5px;font-size:25px;font-weight:900;letter-spacing:1px;color:#0f2a4a}.seal{border:2px solid #0f2a4a;border-radius:999px;width:112px;height:112px;display:grid;place-items:center;text-align:center;color:#0f2a4a;font-size:12px;font-weight:900;line-height:1.25;background:#f8fafc}.center{position:relative;z-index:2;text-align:center;margin-top:46px}.title{font-family:Georgia,serif;font-size:70px;line-height:.95;margin:18px 0 16px;font-weight:900;letter-spacing:2px;color:#0f2a4a;text-transform:uppercase}.text{font-size:16px;line-height:1.75;color:#334155;max-width:880px;margin:0 auto}.name{display:inline-block;margin:26px auto 12px;padding:0 38px 10px;border-bottom:2px solid #0f2a4a;font-family:Georgia,serif;font-size:50px;line-height:1.05;font-style:italic;color:#0f2a4a}.course{max-width:900px;margin:18px auto 0;font-size:26px;line-height:1.25;font-weight:900;color:#111827}.meta{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:34px}.box{border:1px solid #cbd5e1;background:#f8fafc;padding:15px}.box small{display:block;font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#1d4ed8}.box strong{display:block;margin-top:7px;font-size:16px}.project{position:relative;z-index:2;margin-top:22px;padding:18px;border:1px solid #cbd5e1;background:#f8fafc;color:#111827}.project small{font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#1d4ed8}.project p{margin:8px 0 0;line-height:1.65;color:#334155}.footer{position:relative;z-index:2;display:flex;align-items:end;justify-content:space-between;gap:24px;margin-top:38px}.signature{min-width:310px;text-align:center}.line{border-top:2px solid #0f2a4a;margin-bottom:8px}.signature strong{font-size:15px;color:#0f2a4a}.legal{max-width:580px;font-size:10.5px;line-height:1.6;color:#64748b;text-align:left}.auth{font-weight:900;color:#0f2a4a}.print{position:fixed;right:18px;bottom:18px;border:0;border-radius:14px;background:#0f2a4a;color:#fff;padding:14px 18px;font-weight:900;box-shadow:0 12px 30px rgba(0,0,0,.25)}@media print{body{background:#fff;padding:0}.sheet{box-shadow:none;padding:0}.cert{min-height:100vh}.print{display:none}}@media(max-width:760px){body{padding:10px}.cert{padding:34px 22px}.title{font-size:38px}.name{font-size:30px;padding-left:10px;padding-right:10px}.course{font-size:20px}.meta{grid-template-columns:1fr}.footer{display:block}.legal{margin-top:22px}.watermark{font-size:70px}.seal{width:86px;height:86px}}</style></head><body><main class="sheet"><section class="cert"><div class="corner one"></div><div class="corner two"></div><div class="gold one"></div><div class="gold two"></div><div class="watermark">APRENDAJÁ</div><div class="top"><div class="brand"><small>APRENDAJÁ CURSOS LIVRES</small><strong>Certificado de Conclusão</strong></div><div class="seal">CURSO<br/>LIVRE<br/>100%</div></div><div class="center"><h1 class="title">Certificado</h1><p class="text">Este certificado comprova que</p><div class="name">${safeName}</div><p class="text">concluiu o curso livre</p><div class="course">${safeCourse}</div></div><div class="meta"><div class="box"><small>Carga horária</small><strong>${safeWorkload}</strong></div><div class="box"><small>Total de aulas</small><strong>${totalLessons} aulas</strong></div><div class="box"><small>Data de conclusão</small><strong>${date}</strong></div></div><div class="project"><small>Projeto final</small><p>${safeProject}</p></div><div class="footer"><div class="signature"><div class="line"></div><strong>AprendaJá Cursos Livres</strong><br/><small>Assinatura digital da plataforma</small></div><div class="legal"><span class="auth">Código de autenticidade: ${safeCode}</span><br/>ID do curso: ${safeCourseId}<br/>Este certificado comprova a conclusão de um curso livre oferecido pela plataforma AprendaJá Cursos Livres, sem equivalência a diploma técnico, graduação ou certificação oficial regulamentada.</div></div></section></main><button class="print" onclick="window.print()">Salvar / imprimir PDF</button></body></html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado-${courseId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="rounded-[2rem] border border-blue-300/20 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_32%),rgba(255,255,255,0.04)] p-5">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-3xl text-black">📜</div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">Certificado de conclusão — curso livre</p>
          <h3 className="mt-1 text-2xl font-black text-white">AprendaJá Cursos Livres</h3>
          <p className="mt-2 text-sm leading-6 text-blue-50/75">Disponível para todos os cursos, inclusive gratuitos. Não é diploma técnico nem certificado oficial regulamentado. Conclua 100% das aulas e salve como PDF.</p>
        </div>
      </div>
      <input value={studentName} onChange={(event) => updateName(event.target.value)} placeholder="Nome completo do aluno" className="mt-4 w-full rounded-2xl border border-blue-300/20 bg-black/45 px-4 py-3 text-sm font-bold text-white outline-none placeholder:text-zinc-500 focus:border-blue-200/50" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-blue-300 transition-all" style={{ width: `${percent}%` }} /></div>
          <p className="mt-2 text-xs font-bold text-blue-100/70">{completedLessons}/{totalLessons} aulas concluídas • {percent}%</p>
        </div>
        <button onClick={downloadCertificate} className={`rounded-2xl px-5 py-3 text-sm font-black ${unlocked ? "bg-white text-black" : "border border-blue-300/20 text-blue-100/50"}`}>{unlocked ? "Baixar certificado" : "Bloqueado"}</button>
      </div>
    </section>
  );
}
