"use client";

import React, { useState, useEffect } from 'react';
import { useAnimationClasses } from '../../hooks/useAnimationClasses';
import styles from './styles.module.css';

interface OptimizedParticlesProps {
  className?: string;
  count?: number;
  /**
   * Se deve pausar animações quando não visível
   */
  pauseWhenHidden?: boolean;
  /**
   * Reduzir número de partículas em mobile
   */
  mobileOptimized?: boolean;
}

export const OptimizedParticles: React.FC<OptimizedParticlesProps> = ({
  className = "",
  count = 12,
  pauseWhenHidden = true,
  mobileOptimized = true
}) => {
  const { animationClasses } = useAnimationClasses();
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (pauseWhenHidden) {
      setIsPaused(false);
    }
  }, [pauseWhenHidden]);

  const optimizedCount = React.useMemo(() => {
    if (!mobileOptimized) return count;
    return isMobile ? Math.max(2, Math.floor(count / 4)) : Math.floor(count / 2);
  }, [count, isMobile, mobileOptimized]);

  return (
    <div
      className={`${styles.particles} ${className} ${animationClasses} ${isPaused ? styles.paused : ''}`}
    >
      {Array.from({ length: optimizedCount }, (_, index) => (
        <div
          key={index}
          className={`${styles.particle} ${styles[`particle${(index % 6) + 1}`]}`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        />
      ))}
    </div>
  );
};
