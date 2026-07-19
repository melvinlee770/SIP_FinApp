import { Link } from "react-router-dom";

export default function FeatureCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] p-6 hover:shadow-md hover:border-[var(--brand)] transition-all"
    >
      <div
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl"
        style={{ background: "#e8f1fc" }}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
      <span className="text-sm font-medium text-[var(--brand)] mt-auto flex items-center gap-1">
        Explore
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
