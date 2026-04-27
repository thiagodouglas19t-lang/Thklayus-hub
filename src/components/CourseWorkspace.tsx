import { useEffect, useMemo, useState } from "react";
import type { CourseContent, CourseLesson } from "../data/courseTypes";
import CourseDeliveryChecklist from "./CourseDeliveryChecklist";

type CourseWorkspaceProps = {
  course: CourseContent;
  lesson: CourseLesson;
  moduleTitle: string;
  moduleIndex: number;
  lessonIndex: number;
  totalModules: number;
  moduleLessonsCount: number;
};

type NotesMap = Record<string, string>;
type QuizMap = Record<string, string[]>;

const NOTES_KEY = "thklayus_student_notes_v1";
const QUIZ_KEY = "thklayus_lesson_quiz_v1";

function readMap<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function keyFor(courseId: string, moduleIndex: number, lessonIndex: number) {
  return `${courseId}:${moduleIndex}:${lessonIndex}`;
}

function buildQuiz(lesson: CourseLesson, course: CourseContent) {
  const words = lesson.summary.split(" ").filter((word) => word.length > 5).slice(0, 3);
  return [
    {
      id: "objective",
      question: "Qual é o foco principal desta aula?",
      options: [
        lesson.title,
        "Apenas decorar teoria sem praticar",
        "Pular direto para o certificado",
      ],
      answer: lesson.title,
    },
    {
      id: "delivery",
      question: "Qual atitude mais combina com um ambiente de trabalho real?",
      options: [
        "Ler rápido e marcar como concluído",
        "Fazer o job da aula e guardar o entregável",
        "Ignorar a prática porque parece simples",
      ],
      answer: "Fazer o job da aula e guardar o entregável",
    },
    {
      id: "proof",
      question: "O que prova que você realmente aprendeu esta aula?",
      options: [
        "Um entregável feito por você",
        "Só lembrar o título da aula",
        `Saber que o curso se chama ${course.title}`,
      ],
      answer: "Um entregável feito por você",
    },
  ].map((item, index) => ({ ...item, hint: words[index] ?? lesson.practice.slice(0, 42) }));
}

export default function CourseWorkspace({ course, lesson, moduleTitle, moduleIndex, lessonIndex, totalModules, moduleLessonsCount }: CourseWorkspaceProps) {
  const storageKey = keyFor(course.id, moduleIndex, lessonIndex);
  const [notes, setNotes] = useState<NotesMap>(() => readMap<NotesMap>(NOTES_KEY, {}));
  const [answers, setAnswers] = useState<QuizMap>(() => readMap<QuizMap>(QUIZ_KEY, {}));
  const currentNote = notes[storageKey] ?? "";
  const quiz = useMemo(() => buildQuiz(lesson, course), [lesson, course]);
  const selectedAnswers = answers[storageKey] ?? [];
  const correctCount = quiz.filter((item, index) => selectedAnswers[index] === item.answer).length;
  const quizPercent = Math.round((correctCount / quiz.length) * 100);

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(QUIZ_KEY, JSON.stringify(answers));
  }, [answers]);

  function updateNote(value: string) {
    setNotes((current) => ({ ...current, [storageKey]: value }));
  }

  function selectAnswer(questionIndex: number, option: string) {
    setAnswers((current) => {
      const currentAnswers = current[storageKey] ?? [];
      const nextAnswers = [...currentAnswers];
      nextAnswers[questionIndex] = option;
      return { ...current, [storageKey]: nextAnswers };
    });
  }

  function baixarNotas() {
    const text = Object.entries(notes)
      .filter(([key, value]) => key.startsWith(`${course.id}:`) && value.trim())
      .map(([key, value]) => `Aula ${key}\n\n${value}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text || "Nenhuma anotação encontrada."], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${course.id}-caderno-digital.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function baixarKit() {
    const text = [
      `KIT DE TREINAMENTO — ${course.title}`,
      `Módulo ${moduleIndex + 1}/${totalModules}: ${moduleTitle}`,
      `Aula ${lessonIndex + 1}/${moduleLessonsCount}: ${lesson.title}`,
      "",
      "Cenário de trabalho:",
      `Você recebeu uma demanda real relacionada a: ${lesson.title}. Sua missão é entregar algo claro, organizado e apresentável.`,
      "",
      "Briefing do job:",
      lesson.summary,
      "",
      "Job da aula:",
      lesson.practice,
      "",
      "Checklist de entrega:",
      ...course.checklist.map((item) => `- ${item}`),
      "",
      "Critério de qualidade:",
      "1. Entrega organizada",
      "2. Nome de arquivo claro",
      "3. Explicação simples do que foi feito",
      "4. Material pronto para mostrar no portfólio",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${course.id}-kit-treinamento-aula-${moduleIndex + 1}-${lessonIndex + 1}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const moduleBadgeReady = quizPercent === 100 && currentNote.trim().length >= 20;

  return (
    <div className="space-y-4">
      <section className="rounded-[1.5rem] border border-violet-400/20 bg-violet-500/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-200">📦 Central de recursos</p>
            <h3 className="mt-2 text-xl font-black text-white">Kit de Treinamento da Aula</h3>
            <p className="mt-2 text-sm leading-6 text-violet-50/80">Baixe um briefing de trabalho com cenário, job da aula, checklist e critério de qualidade.</p>
          </div>
          <button onClick={baixarKit} className="rounded-2xl bg-violet-300 px-4 py-3 text-sm font-black text-black transition active:scale-95">Baixar kit</button>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-300">📝 Caderno digital</p>
            <h3 className="mt-2 text-xl font-black text-white">Minhas anotações</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Escreva como se estivesse documentando uma task para uma equipe.</p>
          </div>
          <button onClick={baixarNotas} className="rounded-2xl border border-white/10 px-4 py-3 text-xs font-black text-zinc-300">Baixar notas</button>
        </div>
        <textarea
          value={currentNote}
          onChange={(event) => updateNote(event.target.value)}
          placeholder="Ex: O que aprendi, como fiz o job da aula, quais erros encontrei e qual entregável gerei..."
          className="mt-4 min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm leading-7 text-white outline-none placeholder:text-zinc-600 focus:border-sky-300/40"
        />
        <p className="mt-2 text-xs font-bold text-zinc-600">{currentNote.length} caracteres salvos automaticamente</p>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-black p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">🧪 Quiz rápido</p>
            <h3 className="mt-2 text-xl font-black text-white">Validação da aula</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Responda antes de marcar como concluída. Isso tira o estudo do modo passivo.</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-center text-black">
            <p className="text-[10px] font-black uppercase text-zinc-500">Score</p>
            <p className="text-xl font-black">{quizPercent}%</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {quiz.map((item, questionIndex) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-black text-white">{questionIndex + 1}. {item.question}</p>
              <div className="mt-3 grid gap-2">
                {item.options.map((option) => {
                  const selected = selectedAnswers[questionIndex] === option;
                  const correct = option === item.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(questionIndex, option)}
                      className={`rounded-xl border px-3 py-2 text-left text-sm font-bold transition active:scale-[0.99] ${
                        selected && correct ? "border-emerald-300/40 bg-emerald-500/15 text-emerald-50" : selected ? "border-amber-300/40 bg-amber-500/15 text-amber-50" : "border-white/10 bg-black text-zinc-400 hover:text-white"
                      }`}
                    >
                      {selected && correct ? "✓ " : selected ? "• " : ""}{option}
                    </button>
                  );
                })}
              </div>
              {selectedAnswers[questionIndex] && selectedAnswers[questionIndex] !== item.answer && <p className="mt-2 text-xs font-bold text-amber-200">Dica: volte no job da aula e procure o entregável real.</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={`rounded-[1.5rem] border p-5 ${moduleBadgeReady ? "border-emerald-300/25 bg-emerald-500/10" : "border-white/10 bg-black"}`}>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-200">🏆 Badge do módulo</p>
        <h3 className="mt-2 text-xl font-black text-white">{moduleBadgeReady ? "Badge liberado" : "Badge em progresso"}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {moduleBadgeReady ? "Você validou a aula e registrou anotações. Esse módulo já tem evidência de aprendizado." : "Para liberar o badge, tire 100% no quiz e escreva pelo menos 20 caracteres nas suas notas."}
        </p>
      </section>

      <CourseDeliveryChecklist courseId={course.id} items={course.checklist} />
    </div>
  );
}
