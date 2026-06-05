"use client";

import { useState, useEffect } from "react";
import { LangContext } from "./LangContext";
import { getDictionary, type Lang } from "@utils/langUtils";

export function LangProvider({
  language,
  children,
}: {
  language: Lang;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(() => {
    // Tenta pegar do document primeiro, depois usa o language passado
    if (typeof document !== 'undefined') {
      const docLang = document.documentElement.lang as Lang;
      return docLang || language;
    }
    return language;
  });
  
  const dictionary = getDictionary(lang);
  const t = (key: string) => key.split('.').reduce((acc: any, part: any) => acc?.[part], dictionary) ?? key;
  
  const changeLanguage = (newLang: Lang) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
    setLang(newLang);
  }

  // Detecta mudanças no document.documentElement.lang
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const observer = new MutationObserver(() => {
        const docLang = document.documentElement.lang as Lang;
        if (docLang && docLang !== lang) {
          setLang(docLang);
        }
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang']
      });
      
      return () => observer.disconnect();
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ t, lang, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
}