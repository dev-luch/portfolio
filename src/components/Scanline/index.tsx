"use client";
import styles from "./styles.module.css";

interface ScanlineProps {
  className?: string;
  delay?: number;
  duration?: number;
}

export const Scanline = ({ 
  className = "", 
  delay = 0, 
  duration = 3 
}: ScanlineProps) => {
  return (
    <div 
      className={`${styles.scanline} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }}
    />
  );
};
