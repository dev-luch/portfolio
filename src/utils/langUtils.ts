import { enUS } from "@locales/enUS";
import { ptBR } from "@locales/ptBR";

const dictionaries = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

export type Lang = keyof typeof dictionaries;

const fallbackLang: Lang = 'en-US';

export const getDictionary = (lang: string) => dictionaries[lang as Lang] || dictionaries[fallbackLang];


