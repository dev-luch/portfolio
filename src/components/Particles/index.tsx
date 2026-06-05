"use client";
import React from "react";
import { useAnimationClasses } from "../../hooks/useAnimationClasses";
import styles from "./styles.module.css";

interface ParticlesProps {
  className?: string;
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  count = 12
}) => {
  const { animationClasses } = useAnimationClasses();

  return (
    <div className={`${styles.particles} ${className} ${animationClasses}`}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={`${styles.particle} ${styles[`particle${(index % 6) + 1}`]}`} />
      ))}
    </div>
  );
};
