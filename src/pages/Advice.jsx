import { Link } from "react-router-dom";
import { useAppState } from "../state/AppState";
import { CATEGORIES } from "../components/BudgetChart";

function generateTips(budget) {
  const income = Number(budget.income) || 0;
  const expenses = CATEGORIES.reduce((sum, c) => sum + (Number(budget[c.key]) || 0), 0);
  const remaining = income - expenses;
  const tips = [];

  if (income === 0) {
    return [
      {
        level: "info",
        text: "Head to Budget & Tools and enter your income and expenses to get advice tailored to your numbers.",
      },
    ];
  }

  if (remaining < 0) {
    tips.push({
      level: "critical",
      text: `Your expenses are $${Math.abs(remaining).toLocaleString()} more than your income this month. Look at your largest category first — even a small cut can help you break even.`,
    });
  } else if (remaining / income < 0.1) {
    tips.push({
      level: "warning",
      text: "You're breaking even, but with little left over. Consider checking the Eligibility Finder — there may be schemes that free up some room in your budget.",
    });
  } else {
    tips.push({
      level: "good",
      text: `You have $${remaining.toLocaleString()} left over this month. Consider setting a savings goal in Budget & Tools to put it to work.`,
    });
  }

  const housing = Number(budget.housing) || 0;
  if (income > 0 && housing / income > 0.35) {
    tips.push({
      level: "warning",
      text: "Housing costs are taking up a large share of your income. The Eligibility Finder can check if you qualify for housing-related grants.",
    });
  }

  const savingsGoal = Number(budget.savingsGoal) || 0;
  const savingsMonths = Number(budget.savingsMonths) || 0;
  if (savingsGoal > 0 && savingsMonths > 0) {
    const perMonth = savingsGoal / savingsMonths;
    if (remaining >= perMonth) {
      tips.push({
        level: "good",
        text: `You're on track to hit your $${savingsGoal.toLocaleString()} goal — your leftover budget covers the $${perMonth.toFixed(0)}/month you need.`,
      });
    } else {
      tips.push({
        level: "warning",
        text: `Your savings goal needs about $${perMonth.toFixed(0)}/month, but your current budget only leaves $${Math.max(remaining, 0).toLocaleString()}. You may need to extend your timeline or reduce a category.`,
      });
    }
  }

  tips.push({
    level: "info",
    text: "New to budgeting terms? Visit the Financial Education Hub for short, gamified lessons on budgeting, CPF, and insurance.",
  });

  return tips;
}

const levelStyles = {
  good: { bg: "#e9f7ea", color: "var(--good)", icon: "✓" },
  warning: { bg: "#fef6e6", color: "#a86a00", icon: "!" },
  critical: { bg: "#fdeceb", color: "var(--critical)", icon: "✕" },
  info: { bg: "#e8f1fc", color: "var(--brand-dark)", icon: "i" },
};

export default function Advice() {
  const { budget } = useAppState();
  const tips = generateTips(budget);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">My Advice</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        Based on the numbers you entered in{" "}
        <Link to="/tools" className="text-[var(--brand)] underline">
          Budget & Tools
        </Link>
        .
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {tips.map((tip, i) => {
          const style = levelStyles[tip.level];
          return (
            <div key={i} className="rounded-xl border border-[var(--border)] p-5 flex gap-4" style={{ background: style.bg }}>
              <span
                className="shrink-0 h-7 w-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: style.color }}
              >
                {style.icon}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
                {tip.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
