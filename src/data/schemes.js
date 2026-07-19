// Mock eligibility rules — for prototype/demo purposes only, not official criteria.
export const schemes = [
  {
    id: "comcare",
    name: "ComCare Short-to-Medium Term Assistance",
    description: "Cash assistance for daily living, plus help with utilities and medical expenses for households facing financial difficulty.",
    link: "https://supportgowhere.life.gov.sg/schemes/COMCARE-SMTA/comcare-short-to-medium-term-assistance-smta",
    maxIncomePerPerson: 800,
    minFamilySize: 1,
    housingTypes: ["1-2 room", "3-room", "4-room", "5-room / EC", "Other"],
  },
  {
    id: "cdc",
    name: "CDC Vouchers",
    description: "Vouchers to help with daily essentials at participating hawkers and heartland merchants.",
    link: "https://vouchers.cdc.gov.sg/",
    maxIncomePerPerson: 2000,
    minFamilySize: 1,
    housingTypes: ["1-2 room", "3-room", "4-room", "5-room / EC", "Other"],
  },
  {
    id: "housing",
    name: "Enhanced CPF Housing Grant",
    description: "Grants to help lower- and middle-income families buy their first home (new or resale HDB flat).",
    link: "https://www.hdb.gov.sg/buying-a-flat/flat-grant-and-loan-eligibility/couples-and-families/enhanced-cpf-housing-grant",
    maxIncomePerPerson: 2917, // approximates a household cap divided across a typical family
    minFamilySize: 2,
    housingTypes: ["1-2 room", "3-room", "4-room"],
  },
  {
    id: "medifund",
    name: "MediFund",
    description: "Help with subsidised medical bills at public healthcare institutions for those who can't afford them, even after subsidies.",
    link: "https://www.moh.gov.sg/managing-expenses/schemes-and-subsidies/medifund",
    maxIncomePerPerson: 1200,
    minFamilySize: 1,
    housingTypes: ["1-2 room", "3-room", "4-room", "5-room / EC", "Other"],
  },
  {
    id: "comlink",
    name: "ComLink+",
    description: "Pairs lower-income families with children with a dedicated family coach, plus volunteer support toward long-term goals.",
    link: "https://www.msf.gov.sg/what-we-do/volunteer/find-causes/comlink",
    maxIncomePerPerson: 1500,
    minFamilySize: 2,
    housingTypes: ["1-2 room", "3-room", "4-room"],
  },
  {
    id: "edusave",
    name: "Edusave Award",
    description: "Financial top-ups and merit awards for school-going children to ease education-related costs.",
    link: "https://www.moe.gov.sg/financial-matters/edusave",
    maxIncomePerPerson: 2500,
    minFamilySize: 3,
    housingTypes: ["1-2 room", "3-room", "4-room", "5-room / EC"],
  },
];

export function findEligibleSchemes({ income, familySize, housingType }) {
  const perPersonIncome = income / Math.max(familySize, 1);
  return schemes.filter(
    (s) =>
      perPersonIncome <= s.maxIncomePerPerson &&
      familySize >= s.minFamilySize &&
      s.housingTypes.includes(housingType)
  );
}
