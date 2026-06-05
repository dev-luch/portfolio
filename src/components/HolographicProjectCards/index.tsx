'use client';

import React, { useState, useEffect, useRef } from 'react';
import { projects, Project } from '@data/projects';
import { skillsData } from '@data/skills';
import { SkillModal } from '../SkillModal';
import { useLang } from '../../hooks/useLang';
import { useTheme } from '../../hooks/useTheme';
import { 
  Monitor, 
  Smartphone, 
  Globe, 
  GitFork,
  ExternalLink, 
  Zap, 
  Code, 
  Database, 
  Cloud,
  Star,
  ZoomIn,
  X
} from 'lucide-react';
import styles from './styles.module.css';
import Image from 'next/image';

interface HolographicProjectCardsProps {
  className?: string;
}

export const HolographicProjectCards: React.FC<HolographicProjectCardsProps> = ({ className }) => {
  const { t } = useLang();
  const { resolvedTheme } = useTheme();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePreview, setActivePreview] = useState<{ [key: string]: 'desktop' | 'mobile' }>({});
  const [zoomModal, setZoomModal] = useState<{ isOpen: boolean; image: string; alt: string }>({
    isOpen: false,
    image: '',
    alt: ''
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleTechnologyClick = (technology: string) => {
    const skill = skillsData.find(s => 
      s.name.toLowerCase() === technology.toLowerCase() ||
      s.name.toLowerCase().includes(technology.toLowerCase()) ||
      technology.toLowerCase().includes(s.name.toLowerCase())
    );
    
    if (skill) {
      setSelectedSkill(skill.id);
    }
  };

  const getTechnologyIcon = (tech: string) => {
    if (tech.includes('React') || tech.includes('Next.js')) return <Code size={14} />;
    if (tech.includes('Node.js') || tech.includes('TypeScript')) return <Zap size={14} />;
    if (tech.includes('PostgreSQL') || tech.includes('MongoDB')) return <Database size={14} />;
    if (tech.includes('AWS') || tech.includes('Docker')) return <Cloud size={14} />;
    if (tech.includes('React Native')) return <Smartphone size={14} />;
    return <Code size={14} />;
  };

  const getProjectIcon = (project: Project) => {
    if (project.projectType === 'open-source') return <GitFork size={20} />;
    return <Globe size={20} />;
  };

  const togglePreview = (projectId: string, type: 'desktop' | 'mobile') => {
    setActivePreview(prev => ({
      ...prev,
      [projectId]: prev[projectId] === type ? 'desktop' : type
    }));
  };

  const openZoomModal = (image: string, alt: string) => {
    setZoomModal({ isOpen: true, image, alt });
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeZoomModal = () => {
    setZoomModal({ isOpen: false, image: '', alt: '' });
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  return (
    <div className={`${styles.holographicContainer} ${className} ${resolvedTheme === 'light' ? styles.lightTheme : ''}`} ref={containerRef}>
      
      <div className={styles.backgroundEffects}>
        <div className={styles.matrixRain} />
        <div className={styles.matrixCode} />
        <div className={styles.digitalGlitch} />
        <div className={styles.cyberGrid} />
        <div className={styles.gradientOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>
      </div>

      
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleGlow}>
            <Star size={48} /> {t('projects.title')}
          </span>
        </h2>
        <p className={styles.subtitle}>
          {t('projects.subtitle')}
        </p>
      </div>

      
      <div className={styles.cardsGrid}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`${styles.holographicCard} ${isLoaded ? styles.loaded : ''} ${
              hoveredCard === project.id ? styles.hovered : ''
            }`}
            style={{
              '--delay': `${index * 200}ms`,
              '--card-color': project.projectType === 'open-source' ? '#6366f1' : '#22c55e'
            } as React.CSSProperties}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            
            <div className={styles.holographicGlow} />
            
            
            <div className={styles.cardContent}>
              
              <div className={styles.projectHeader}>
                <div className={styles.projectIcon}>
                  {getProjectIcon(project)}
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <div className={styles.projectType}>
                    {project.projectType === 'open-source' ? 'Open Source' : 'Personal'}
                  </div>
                </div>
                <div className={styles.projectStatus}>
                  <div className={styles.statusDot} />
                  <span>Live</span>
                </div>
              </div>

              
              <div className={styles.projectDescription}>
                <p>{t(project.description)}</p>
              </div>

              
              <div className={styles.projectPreviews}>
                <div className={styles.previewControls}>
                  <button
                    className={`${styles.previewButton} ${
                      activePreview[project.id] === 'desktop' ? styles.active : ''
                    }`}
                    onClick={() => togglePreview(project.id, 'desktop')}
                  >
                    <Monitor size={16} />
                    Desktop
                  </button>
                  <button
                    className={`${styles.previewButton} ${
                      activePreview[project.id] === 'mobile' ? styles.active : ''
                    }`}
                    onClick={() => togglePreview(project.id, 'mobile')}
                  >
                    <Smartphone size={16} />
                    Mobile
                  </button>
                </div>

                <div className={styles.previewContainer}>
                  {activePreview[project.id] === 'mobile' ? (
                    <div 
                      className={styles.mobilePreview}
                      onClick={() => openZoomModal(project.mobileImage, project.mobileImageAlt)}
                    >
                      <Image
                        src={project.mobileImage}
                        alt={project.mobileImageAlt}
                        width={2000}
                        height={2000}
                        className={styles.previewImage}
                      />
                      <div className={styles.previewOverlay}>
                        <button className={styles.zoomButton}>
                          <ZoomIn size={20} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={styles.desktopPreview}
                      onClick={() => openZoomModal(project.desktopImage, project.desktopImageAlt)}
                    >
                      <Image
                        src={project.desktopImage}
                        alt={project.desktopImageAlt}
                        width={2000}
                        height={2000}
                        className={styles.previewImage}
                      />
                      <div className={styles.previewOverlay}>
                        <button className={styles.zoomButton}>
                          <ZoomIn size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              
              <div className={styles.technologies}>
                <h4 className={styles.techTitle}>Technologies</h4>
                <div className={styles.techList}>
                  {project.technologies.map((tech, techIndex) => (
                    <button
                      key={techIndex}
                      className={styles.techChip}
                      onClick={() => handleTechnologyClick(tech)}
                    >
                      {getTechnologyIcon(tech)}
                      <span>{tech}</span>
                    </button>
                  ))}
                </div>
              </div>

              
              <div className={styles.projectLinks}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <GitFork size={16} />
                    <span>GitHub</span>
                  </a>
                )}
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              
              <div className={styles.scanLines} />
            </div>

            
            <div className={styles.holographicBorder} />
          </div>
        ))}
      </div>

      
      {selectedSkill && (
        <SkillModal
          skill={skillsData.find(s => s.id === selectedSkill)!}
          onClose={() => setSelectedSkill(null)}
        />
      )}

      
      {zoomModal.isOpen && (
        <div className={styles.zoomModal} onClick={closeZoomModal}>
          <div className={styles.zoomModalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.zoomCloseButton} onClick={closeZoomModal}>
              <X size={24} />
            </button>
            <Image
              src={zoomModal.image}
              alt={zoomModal.alt}
              width={1920}
              height={1080}
              className={styles.zoomImage}
            />
          </div>
        </div>
      )}
    </div>
  );
};
