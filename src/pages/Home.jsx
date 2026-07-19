import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] max-w-3xl mx-auto leading-tight">
          Financial confidence, one small step at a time.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Find the support schemes you qualify for, track your budget, learn at your own pace, and talk to a real
          person — all in one place.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/eligibility"
            className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium"
            style={{ background: "var(--brand)" }}
          >
            Get Started
          </Link>
          <Link
            to="/learn"
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium border border-[var(--border)] text-[var(--text-primary)]"
          >
            Browse lessons
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            to="/eligibility"
            icon="🔍"
            title="Eligibility Finder"
            description="Answer a few quick questions to see which government schemes your household may qualify for."
          />
          <FeatureCard
            to="/tools"
            icon="🧮"
            title="Financial Tools & Budget Tracker"
            description="Track income and expenses, get a recommended budget split, and plan toward a savings goal."
          />
          <FeatureCard
            to="/advice"
            icon="💡"
            title="Personalized Advice"
            description="Get simple, tailored tips based on your own budget and savings — not generic advice."
          />
          <FeatureCard
            to="/learn"
            icon="🎮"
            title="Financial Education Hub"
            description="Bite-sized, gamified lessons on CPF, insurance, and budgeting — earn points as you learn."
          />
          <FeatureCard
            to="/connect"
            icon="🤝"
            title="Expert Connect"
            description="Chat instantly or book a free appointment with a financial coach or community advisor."
          />
        </div>
      </section>
    </div>
  );
}
