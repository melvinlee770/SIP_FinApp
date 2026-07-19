import { useAppState } from "../state/AppState";
import BudgetChart, { CATEGORIES } from "../components/BudgetChart";
import { useMemo } from "react";

function SavingsCalculator({ budget, setBudget }) {
  const goal = Number(budget.savingsGoal) || 0;
  const months = Number(budget.savingsMonths) || 0;
  const perMonth = months > 0 ? goal / months : 0;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
      <h2 className="font-semibold text-[var(--text-primary)]">Savings Goal Calculator</h2>
      <p className="text-sm text-[var(--text-secondary)] mt-1">Work out how much to set aside each month.</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Goal amount (SGD)</span>
          <input
            type="number"
            min="0"
            value={budget.savingsGoal}
            onChange={(e) => setBudget({ ...budget, savingsGoal: e.target.value })}
            placeholder="e.g. 1200"
            className="rounded-lg border border-[var(--border)] px-3 py-2.5"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-[var(--text-primary)]">Number of months</span>
          <input
            type="number"
            min="1"
            value={budget.savingsMonths}
            onChange={(e) => setBudget({ ...budget, savingsMonths: e.target.value })}
            placeholder="e.g. 12"
            className="rounded-lg border border-[var(--border)] px-3 py-2.5"
          />
        </label>
      </div>

      {perMonth > 0 && (
        <p className="mt-4 text-sm bg-[#e8f1fc] text-[var(--brand-dark)] rounded-lg px-4 py-3">
          Save about <strong className="font-tabular">${perMonth.toFixed(0)}</strong> per month to reach ${goal.toLocaleString()} in {months} month{months > 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
}

export default function BudgetTools() {
  const { budget, setBudget } = useAppState();

  const update = (field) => (e) => setBudget({ ...budget, [field]: e.target.value });

  const totals = useMemo(() => {
    const income = Number(budget.income) || 0;
    const expenses = CATEGORIES.reduce((sum, c) => sum + (Number(budget[c.key]) || 0), 0);
    const remaining = income - expenses;
    return { income, expenses, remaining };
  }, [budget]);

  const recommended = useMemo(() => {
    const income = Number(budget.income) || 0;
    return {
      needs: income * 0.5,
      wants: income * 0.3,
      savings: income * 0.2,
    };
  }, [budget.income]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Financial Tools & Budget Tracker</h1>
      <p className="mt-2 text-[var(--text-secondary)] max-w-xl">
        Enter your monthly income and expenses to see a breakdown and a suggested split. Your numbers are saved
        only on this device.
      </p>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
        <h2 className="font-semibold text-[var(--text-primary)] mb-4">Monthly Income & Expenses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
            <span className="font-medium text-[var(--text-primary)]">Monthly income (SGD)</span>
            <input
              type="number"
              min="0"
              value={budget.income}
              onChange={update("income")}
              placeholder="e.g. 3000"
              className="rounded-lg border border-[var(--border)] px-3 py-2.5"
            />
          </label>

          {CATEGORIES.map((c) => (
            <label key={c.key} className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-[var(--text-primary)]">{c.label} (SGD)</span>
              <input
                type="number"
                min="0"
                value={budget[c.key]}
                onChange={update(c.key)}
                placeholder="0"
                className="rounded-lg border border-[var(--border)] px-3 py-2.5"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-gray-50 py-3">
            <p className="text-xs text-[var(--muted)]">Income</p>
            <p className="font-tabular font-semibold">${totals.income.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-gray-50 py-3">
            <p className="text-xs text-[var(--muted)]">Expenses</p>
            <p className="font-tabular font-semibold">${totals.expenses.toLocaleString()}</p>
          </div>
          <div className="rounded-lg py-3" style={{ background: totals.remaining < 0 ? "#fdeceb" : "#e9f7ea" }}>
            <p className="text-xs text-[var(--muted)]">Remaining</p>
            <p
              className="font-tabular font-semibold"
              style={{ color: totals.remaining < 0 ? "var(--critical)" : "var(--good)" }}
            >
              ${totals.remaining.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
        <h2 className="font-semibold text-[var(--text-primary)] mb-4">Expense Breakdown</h2>
        <BudgetChart values={budget} />
      </div>

      {totals.income > 0 && (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6">
          <h2 className="font-semibold text-[var(--text-primary)] mb-1">Recommended Split</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-4">A simple 50/30/20 guideline as a starting point.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-[var(--border)] p-4">
              <p className="text-sm text-[var(--text-secondary)]">Needs (50%)</p>
              <p className="font-tabular text-lg font-semibold">${recommended.needs.toFixed(0)}</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] p-4">
              <p className="text-sm text-[var(--text-secondary)]">Wants (30%)</p>
              <p className="font-tabular text-lg font-semibold">${recommended.wants.toFixed(0)}</p>
            </div>
            <div className="rounded-lg border border-[var(--border)] p-4">
              <p className="text-sm text-[var(--text-secondary)]">Savings (20%)</p>
              <p className="font-tabular text-lg font-semibold">${recommended.savings.toFixed(0)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <SavingsCalculator budget={budget} setBudget={setBudget} />
      </div>
    </div>
  );
}
