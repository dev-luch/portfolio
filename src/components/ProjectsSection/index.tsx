'use client';

import React from 'react';
import { HolographicProjectCards } from '../HolographicProjectCards';
import styles from './styles.module.css';

interface ProjectsSectionProps {
  className?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className }) => {
  return (
    <section className={`${styles.projectsSection} ${className}`}>
      <HolographicProjectCards />
    </section>
  );
};
