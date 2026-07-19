import { useState } from "react";
import { experts, getFaqReply } from "../data/experts";

function ChatWidget() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about budgeting, CPF, insurance, or the schemes on this site." },
  ]);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input.trim() };
    const reply = { from: "bot", text: getFaqReply(input.trim()) };
    setMessages((m) => [...m, userMsg, reply]);
    setInput("");
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] flex flex-col h-[420px]">
      <div className="px-5 py-3 border-b border-[var(--border)] font-semibold text-[var(--text-primary)]">
        Quick Chat
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] text-sm rounded-2xl px-4 py-2.5 leading-relaxed ${
              m.from === "user" ? "self-end text-white" : "self-start bg-gray-100 text-[var(--text-primary)]"
            }`}
            style={m.from === "user" ? { background: "var(--brand)" } : undefined}
          >
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="p-3 border-t border-[var(--border)] flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question…"
          className="flex-1 rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-lg text-white text-sm font-medium px-4" style={{ background: "var(--brand)" }}>
          Send
        </button>
      </form>
    </div>
  );
}

function BookingModal({ expert, onClose }) {
  const [form, setForm] = useState({ name: "", date: "", message: "" });
  const [confirmed, setConfirmed] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Book with {expert.name}</h2>
          <button onClick={onClose} aria-label="Close" className="text-[var(--muted)] text-xl leading-none">
            ×
          </button>
        </div>

        {!confirmed ? (
          <form onSubmit={submit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[var(--text-primary)]">Your name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border border-[var(--border)] px-3 py-2.5"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[var(--text-primary)]">Preferred date & time</span>
              <input
                required
                type="datetime-local"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-lg border border-[var(--border)] px-3 py-2.5"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[var(--text-primary)]">What would you like to discuss?</span>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-lg border border-[var(--border)] px-3 py-2.5"
              />
            </label>
            <button type="submit" className="mt-2 rounded-lg text-white font-medium py-2.5" style={{ background: "var(--brand)" }}>
              Request appointment
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-4xl">✅</p>
            <p className="mt-3 font-semibold text-[var(--text-primary)]">Request sent!</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {expert.name} will reach out to confirm your appointment.
            </p>
            <button onClick={onClose} className="mt-5 rounded-lg text-white font-medium px-6 py-2.5" style={{ background: "var(--brand)" }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExpertConnect() {
  const [bookingExpert, setBookingExpert] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Expert Connect</h1>
      <p className="mt-2 text-[var(--text-secondary)] max-w-xl">
        Chat now for quick answers, or book a free appointment with a coach who matches your needs.
      </p>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ChatWidget />

        <div className="flex flex-col gap-4">
          {experts.map((ex) => (
            <div key={ex.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-5 flex gap-4 items-start">
              <span
                className="shrink-0 h-11 w-11 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ background: "var(--brand)" }}
              >
                {ex.initials}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--text-primary)]">{ex.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{ex.role}</p>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">{ex.specialty}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">Speaks: {ex.languages.join(", ")}</p>
                <button
                  onClick={() => setBookingExpert(ex)}
                  className="mt-3 text-sm font-medium rounded-lg border border-[var(--brand)] text-[var(--brand)] px-4 py-1.5"
                >
                  Book appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookingExpert && <BookingModal expert={bookingExpert} onClose={() => setBookingExpert(null)} />}
    </div>
  );
}
