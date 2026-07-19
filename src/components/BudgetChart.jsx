const CATEGORIES = [
  { key: "housing", label: "Housing", color: "var(--series-1)" },
  { key: "food", label: "Food", color: "var(--series-2)" },
  { key: "utilities", label: "Utilities", color: "var(--series-3)" },
  { key: "transport", label: "Transport", color: "var(--series-4)" },
  { key: "other", label: "Other", color: "var(--series-5)" },
];

export default function BudgetChart({ values }) {
  const max = Math.max(1, ...CATEGORIES.map((c) => Number(values[c.key]) || 0));

  return (
    <div className="flex flex-col gap-3" role="img" aria-label="Bar chart of budget breakdown by category">
      {CATEGORIES.map((c) => {
        const val = Number(values[c.key]) || 0;
        const pct = Math.round((val / max) * 100);
        return (
          <div key={c.key} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-sm text-[var(--text-secondary)]">{c.label}</span>
            <div className="flex-1 h-6 rounded-md bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-md transition-all"
                style={{ width: `${pct}%`, background: c.color, minWidth: val > 0 ? "8px" : 0 }}
              />
            </div>
            <span className="w-16 shrink-0 text-right text-sm font-tabular text-[var(--text-primary)]">
              ${val.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export { CATEGORIES };
