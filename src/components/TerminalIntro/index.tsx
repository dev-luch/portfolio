"use client";
import { useState, useEffect, useMemo } from "react";
import { Terminal, Play } from "lucide-react";
import { useLang } from "../../hooks/useLang";
import { useAnimationClasses } from "../../hooks/useAnimationClasses";
import { Particles } from "../Particles";
import styles from "./styles.module.css";

interface TerminalIntroProps {
  onComplete: () => void;
}

export const TerminalIntro = ({ onComplete }: TerminalIntroProps) => {
  const { t } = useLang();
  const { animationClasses } = useAnimationClasses();
  
  const terminalLines = useMemo(() => [
    t("terminal.lines.0"),
    t("terminal.lines.1"),
    t("terminal.lines.2"),
    t("terminal.lines.3"),
    t("terminal.lines.4"),
    t("terminal.lines.5"),
    t("terminal.lines.6")
  ], [t]);
  const [currentText, setCurrentText] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    if (currentLine < terminalLines.length) {
      const line = terminalLines[currentLine];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (charIndex <= line.length) {
          setCurrentText(line.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentLine(prev => prev + 1);
          }, 10);
        }
      }, 20);

      return () => clearInterval(typeInterval);
    } else {
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  }, [currentLine, onComplete, isMounted, terminalLines]);

  return (
    <div className={`${styles.terminalIntro} ${animationClasses}`}>
      {/* Fundo futurista */}
      <div className={styles.background}>
        <div className={styles.gridOverlay}></div>
         <Particles count={8} />
      </div>

      {/* Container principal */}
      <div className={styles.container}>
        {/* Terminal */}
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalButtons}>
              <div className={styles.button}></div>
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
            <div className={styles.terminalTitle}>
              <Terminal size={16} />
              <span>{t("terminal.title")}</span>
            </div>
          </div>
          
          <div className={styles.terminalBody}>
            <div className={styles.terminalContent}>
              {terminalLines.slice(0, currentLine).map((line, index: number) => (
                <div key={index} className={styles.terminalLine}>
                  <span className={styles.prompt}>&gt;</span>
                  <span className={styles.command}>{line.substring(2)}</span>
                </div>
              ))}
              
              {currentLine < terminalLines.length && (
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>&gt;</span>
                  <span className={styles.command}>{currentText.substring(2)}</span>
                  <span className={styles.cursor}>_</span>
                </div>
              )}
              
              {!isTyping && (
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>&gt;</span>
                  <span className={styles.success}>{t("terminal.systemReady")}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Botão de entrada */}
        {!isTyping && (
          <div className={styles.enterButton}>
            <button onClick={onComplete} className={styles.enterBtn}>
              <Play size={16} />
              <span>{t("terminal.enterSystem")}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
