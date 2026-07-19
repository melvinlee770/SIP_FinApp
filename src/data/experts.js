export const experts = [
  {
    id: "coach-1",
    name: "Grace Tan",
    role: "Family Financial Coach",
    languages: ["English", "Mandarin"],
    specialty: "Budgeting for households with young children",
    initials: "GT",
  },
  {
    id: "coach-2",
    name: "Muhammad Hafiz",
    role: "Community Financial Advisor",
    languages: ["English", "Malay"],
    specialty: "Scheme navigation & housing grants",
    initials: "MH",
  },
  {
    id: "coach-3",
    name: "Priya Ramesh",
    role: "Volunteer Financial Mentor",
    languages: ["English", "Tamil"],
    specialty: "Debt management & savings habits",
    initials: "PR",
  },
];

// Simple canned FAQ chat — keyword matched, no backend required.
export const chatFaq = [
  {
    keywords: ["comcare", "assistance", "help"],
    reply: "ComCare offers short-to-medium term cash assistance. Try the Eligibility Finder to see if your household qualifies, or book an appointment with an advisor for personal guidance.",
  },
  {
    keywords: ["cpf"],
    reply: "CPF has 3 accounts: Ordinary, Special, and MediSave. Check out the 'CPF Basics' lesson in the Learn section for a quick overview.",
  },
  {
    keywords: ["budget", "save", "saving"],
    reply: "A simple starting point is splitting income into needs, wants, and savings. The Budget & Tools page can calculate a suggested split for you.",
  },
  {
    keywords: ["insurance", "medishield"],
    reply: "MediShield Life is Singapore's basic compulsory health insurance. See the 'Insurance 101' lesson for more, or book a chat with an advisor for your specific situation.",
  },
  {
    keywords: ["appointment", "book", "talk", "advisor", "coach"],
    reply: "You can book a free appointment with one of our advisors below — just pick someone whose specialty matches what you need.",
  },
];

export function getFaqReply(message) {
  const lower = message.toLowerCase();
  const match = chatFaq.find((f) => f.keywords.some((k) => lower.includes(k)));
  return (
    match?.reply ??
    "Thanks for your message! For anything specific to your situation, it's best to book a free appointment with one of our advisors below."
  );
}
