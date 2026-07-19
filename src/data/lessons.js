export const lessons = [
  {
    id: "cpf-basics",
    title: "CPF Basics",
    minutes: 3,
    points: 20,
    summary: "What CPF is, the three accounts, and why it matters for your future.",
    content: [
      "CPF (Central Provident Fund) is a compulsory savings scheme for working Singaporeans and PRs.",
      "Your contributions go into 3 accounts: Ordinary (housing, education), Special (retirement, investment), and MediSave (healthcare).",
      "Employers also contribute on your behalf — it's not just money taken from your pay, it's extra savings added to it.",
    ],
    quiz: [
      {
        q: "Which CPF account is meant for healthcare expenses?",
        options: ["Ordinary Account", "Special Account", "MediSave Account"],
        answer: 2,
      },
      {
        q: "Who contributes to your CPF account?",
        options: ["Only you", "Only your employer", "Both you and your employer"],
        answer: 2,
      },
    ],
  },
  {
    id: "insurance-101",
    title: "Insurance 101",
    minutes: 4,
    points: 20,
    summary: "The difference between 'nice to have' and 'must have' insurance.",
    content: [
      "Insurance protects you from large, unexpected costs — like a hospital stay — by spreading the risk across many people.",
      "MediShield Life is a basic, compulsory health insurance for all Singaporeans and PRs, covering large hospital bills.",
      "Before buying extra insurance, check what you're already covered for so you don't pay twice for the same protection.",
    ],
    quiz: [
      {
        q: "What is MediShield Life?",
        options: ["Optional life insurance", "Basic compulsory health insurance", "A savings account"],
        answer: 1,
      },
      {
        q: "Why check existing coverage before buying more insurance?",
        options: ["To avoid paying twice for the same protection", "It's required by law", "It has no benefit"],
        answer: 0,
      },
    ],
  },
  {
    id: "budgeting-basics",
    title: "Budgeting Basics",
    minutes: 3,
    points: 20,
    summary: "A simple way to split your income so bills and savings both get covered.",
    content: [
      "A common guideline is to split income roughly into needs, wants, and savings — adjust the ratio to fit tight budgets.",
      "Track fixed costs (rent, utilities) separately from flexible costs (food, transport) so you know where to cut first.",
      "Even a small, consistent saving habit (e.g. $20/month) builds a buffer for emergencies over time.",
    ],
    quiz: [
      {
        q: "What should you track separately from flexible costs?",
        options: ["Fixed costs like rent", "Nothing, track it all together", "Only entertainment"],
        answer: 0,
      },
      {
        q: "Why does even a small consistent saving habit matter?",
        options: ["It doesn't matter", "It builds a buffer for emergencies over time", "It's required by the bank"],
        answer: 1,
      },
    ],
  },
  {
    id: "saving-vs-investing",
    title: "Saving vs Investing",
    minutes: 4,
    points: 25,
    summary: "When to keep cash safe, and when growth might be worth some risk.",
    content: [
      "Savings (e.g. bank deposits) are low-risk and easy to access — good for emergency funds and short-term goals.",
      "Investing can grow your money faster over the long run, but values can go up and down — don't invest money you need soon.",
      "A common approach: build a small emergency fund first, then consider investing extra, stable savings.",
    ],
    quiz: [
      {
        q: "What's a key advantage of keeping money in savings?",
        options: ["Higher returns", "Low risk and easy access", "Guaranteed to double"],
        answer: 1,
      },
      {
        q: "What should you generally build before investing?",
        options: ["A car loan", "A small emergency fund", "Nothing, invest everything"],
        answer: 1,
      },
    ],
  },
];
