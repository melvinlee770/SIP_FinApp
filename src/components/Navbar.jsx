import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/eligibility", label: "Eligibility Finder" },
  { to: "/tools", label: "Budget & Tools" },
  { to: "/advice", label: "My Advice" },
  { to: "/learn", label: "Learn" },
  { to: "/connect", label: "Expert Connect" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-[var(--brand)] text-white"
        : "text-[var(--text-secondary)] hover:bg-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-1)] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 font-semibold text-lg text-[var(--text-primary)]">
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: "var(--brand)" }}
            >
              $
            </span>
            FinPath
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:bg-gray-100"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
