import { Lang } from "./langUtils";

const BIRTH_DATE = new Date("2005-03-18");

export function calculateAge(lang: Lang): string {
  const now = new Date();
  let age = now.getFullYear() - BIRTH_DATE.getFullYear();
  const monthDiff = now.getMonth() - BIRTH_DATE.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < BIRTH_DATE.getDate())) {
    age--;
  }
  return lang === "pt-BR" ? `${age} anos` : `${age} years old`;
}

export function getSkillDuration(startDate: string, lang: Lang): string {
  const start = new Date(startDate);
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / 12);
    return lang === "pt-BR" ? `${years}+ anos` : `${years}+ years`;
  }
  return lang === "pt-BR" ? `${totalMonths}+ meses` : `${totalMonths}+ months`;
}
