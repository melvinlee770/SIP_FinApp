import { useState } from "react";
import { lessons } from "../data/lessons";
import { useAppState } from "../state/AppState";

function LessonModal({ lesson, onClose, onComplete }) {
  const [step, setStep] = useState(0); // 0..content.length-1 = reading, then quiz
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isQuiz = step >= lesson.content.length;
  const quizIndex = step - lesson.content.length;

  const selectAnswer = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  const score = lesson.quiz.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);

  const next = () => {
    if (!isQuiz) {
      setStep(step + 1);
    } else if (quizIndex < lesson.quiz.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      onComplete(lesson.id, lesson.points);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--text-primary)]">{lesson.title}</h2>
          <button onClick={onClose} aria-label="Close" className="text-[var(--muted)] text-xl leading-none">
            ×
          </button>
        </div>

        {!submitted && !isQuiz && (
          <div>
            <p className="text-sm text-[var(--muted)] mb-2">
              Step {step + 1} of {lesson.content.length}
            </p>
            <p className="text-[var(--text-primary)] leading-relaxed">{lesson.content[step]}</p>
          </div>
        )}

        {!submitted && isQuiz && (
          <div>
            <p className="text-sm text-[var(--muted)] mb-2">
              Quiz {quizIndex + 1} of {lesson.quiz.length}
            </p>
            <p className="font-medium text-[var(--text-primary)] mb-3">{lesson.quiz[quizIndex].q}</p>
            <div className="flex flex-col gap-2">
              {lesson.quiz[quizIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(quizIndex, i)}
                  className="text-left rounded-lg border px-4 py-2.5 text-sm"
                  style={{
                    borderColor: answers[quizIndex] === i ? "var(--brand)" : "var(--border)",
                    background: answers[quizIndex] === i ? "#e8f1fc" : "white",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {submitted && (
          <div className="text-center py-4">
            <p className="text-4xl">🎉</p>
            <p className="mt-3 font-semibold text-[var(--text-primary)]">
              You scored {score} / {lesson.quiz.length}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">+{lesson.points} points earned</p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg text-white font-medium px-6 py-2.5"
              style={{ background: "var(--brand)" }}
            >
              Done
            </button>
          </div>
        )}

        {!submitted && (
          <button
            onClick={next}
            disabled={isQuiz && answers[quizIndex] === undefined}
            className="mt-6 w-full rounded-lg text-white font-medium py-2.5 disabled:opacity-40"
            style={{ background: "var(--brand)" }}
          >
            {isQuiz && quizIndex === lesson.quiz.length - 1 ? "Finish" : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function EducationHub() {
  const { points, completedLessons, markLessonComplete, streak } = useAppState();
  const [activeLesson, setActiveLesson] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Financial Education Hub</h1>
      <p className="mt-2 text-[var(--text-secondary)] max-w-xl">
        Short lessons on topics you may never have had the time to learn. Finish a quiz to earn points.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4 text-center">
          <p className="text-xs text-[var(--muted)]">Points</p>
          <p className="font-tabular text-2xl font-bold" style={{ color: "var(--brand)" }}>
            {points}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4 text-center">
          <p className="text-xs text-[var(--muted)]">Lessons done</p>
          <p className="font-tabular text-2xl font-bold text-[var(--text-primary)]">
            {completedLessons.length}/{lessons.length}
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-1)] p-4 text-center col-span-2 sm:col-span-1">
          <p className="text-xs text-[var(--muted)]">Day streak</p>
          <p className="font-tabular text-2xl font-bold text-[var(--text-primary)]">🔥 {streak}</p>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${(completedLessons.length / lessons.length) * 100}%`, background: "var(--good)" }}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lessons.map((lesson) => {
          const done = completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="text-left rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-5 hover:border-[var(--brand)] transition-colors"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-[var(--text-primary)]">{lesson.title}</h3>
                {done && <span className="text-xs font-medium text-white px-2 py-0.5 rounded-full" style={{ background: "var(--good)" }}>Done</span>}
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{lesson.summary}</p>
              <p className="mt-3 text-xs text-[var(--muted)]">
                {lesson.minutes} min · {lesson.points} pts
              </p>
            </button>
          );
        })}
      </div>

      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={markLessonComplete}
        />
      )}
    </div>
  );
}
