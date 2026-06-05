import { createContext, Dispatch, SetStateAction } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<Theme>>;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
