import { Lang } from "@utils/langUtils";
import { createContext } from "react";

export type LangContextType = { t: (key: string) => string, lang: Lang, changeLanguage: (lang: Lang) => void; };


export const LangContext = createContext<LangContextType>({
  t: (key) => key,
  lang: "en-US",
  changeLanguage: () => undefined
});
