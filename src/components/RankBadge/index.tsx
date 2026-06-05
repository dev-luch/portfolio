'use client';

import React from 'react';
import { rankConfig } from '@data/skills';
import styles from './styles.module.css';

interface RankBadgeProps {
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'EX';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ 
  rank, 
  size = 'medium', 
  showLabel = true 
}) => {
  const rankInfo = rankConfig[rank];
  
  const getSizeClass = () => {
    switch (size) {
      case 'small': return styles.small;
      case 'large': return styles.large;
      default: return styles.medium;
    }
  };

  return (
    <div 
      className={`${styles.rankBadge} ${getSizeClass()}`}
      style={{
        '--rank-color': rankInfo.color,
        '--glow-color': rankInfo.glow
      } as React.CSSProperties}
    >
      <div className={styles.rankSymbol}>{rank}</div>
      {showLabel && (
        <div className={styles.rankLabel}>{rankInfo.label}</div>
      )}
    </div>
  );
};
