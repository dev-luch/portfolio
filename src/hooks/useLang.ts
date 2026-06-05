import { LangContext } from "@context/LangContext/LangContext";
import { useContext } from "react";

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context;
}