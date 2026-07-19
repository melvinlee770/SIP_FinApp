import { useState } from "react";
import { findEligibleSchemes } from "../data/schemes";

const housingOptions = ["1-2 room", "3-room", "4-room", "5-room / EC", "Other"];

export default function EligibilityFinder() {
  const [form, setForm] = useState({ income: "", familySize: "", housingType: housingOptions[0] });
  const [results, setResults] = useState(null);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const income = Number(form.income) || 0;
    const familySize = Number(form.familySize) || 1;
    setResults(findEligibleSchemes({ income, familySize, housingType: form.housingType }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Eligibility Finder</h1>
      <p className="mt-2 text-[var(--text-secondary)] max-w-xl">
        Enter a few details about your household. This is a demo estimate only — always confirm with the official
        scheme page before applying.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-[var(--surface-1)] border border-[var(--border)] rounded-2xl p-6">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Monthly household income (SGD)</span>
          <input
            type="number"
            min="0"
            required
            value={form.income}
            onChange={update("income")}
            placeholder="e.g. 2500"
            className="rounded-lg border border-[var(--border)] px-3 py-2.5"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Number of family members</span>
          <input
            type="number"
            min="1"
            required
            value={form.familySize}
            onChange={update("familySize")}
            placeholder="e.g. 4"
            className="rounded-lg border border-[var(--border)] px-3 py-2.5"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          <span className="font-medium text-[var(--text-primary)]">Housing type</span>
          <select
            value={form.housingType}
            onChange={update("housingType")}
            className="rounded-lg border border-[var(--border)] px-3 py-2.5 bg-white"
          >
            {housingOptions.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="sm:col-span-2 mt-2 rounded-lg text-white font-medium py-3"
          style={{ background: "var(--brand)" }}
        >
          Find schemes I may qualify for
        </button>
      </form>

      {results && (
        <div className="mt-8">
          <h2 className="font-semibold text-[var(--text-primary)] mb-4">
            {results.length > 0 ? `${results.length} scheme${results.length > 1 ? "s" : ""} found` : "No matches found"}
          </h2>

          {results.length === 0 && (
            <p className="text-sm text-[var(--text-secondary)] bg-gray-50 border border-[var(--border)] rounded-xl p-5">
              We couldn't find a match based on these numbers. Try checking with a{" "}
              <a href="/connect" className="text-[var(--brand)] underline">financial coach</a> — eligibility rules
              have exceptions this demo can't capture.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((s) => (
              <div key={s.id} className="rounded-xl border border-[var(--border)] p-5 bg-[var(--surface-1)]">
                <h3 className="font-semibold text-[var(--text-primary)]">{s.name}</h3>
                <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{s.description}</p>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-[var(--brand)]"
                >
                  Learn more & apply →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
