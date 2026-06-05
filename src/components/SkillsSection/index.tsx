'use client';

import React, { useState, useRef } from 'react';
import { skillsData, skillCategories } from '@data/skills';
import { SkillModal } from '../SkillModal';
import { OptimizedParticleSystem } from '../OptimizedParticleSystem';
import { useAnimationClasses } from '../../hooks/useAnimationClasses';
import { useLang } from '../../hooks/useLang';
import { getSkillDuration } from '@utils/dynamicDuration';
import { Search, Zap, Palette, Settings, Cloud, Smartphone, Wrench, Network, GitFork } from 'lucide-react';
import styles from './styles.module.css';
import Image from 'next/image';

interface SkillsSectionProps {
  className?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ className }) => {
  const { t, lang } = useLang();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationClasses } = useAnimationClasses();

  const getFilteredSkills = () => {
    let filtered = skillsData;

    if (searchTerm) {
      filtered = filtered.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleSkillClick = (skillId: string) => {
    setSelectedSkill(skillId);
  };

  const handleRelatedSkillClick = (skillId: string) => {
    setSelectedSkill(skillId);
  };

  const closeModal = () => {
    setSelectedSkill(null);
  };

  const getCategorySkills = (category: string) =>
    getFilteredSkills().filter(skill => skill.categories.includes(category));

  const needsScroll = (category: string) => {
    const skills = getCategorySkills(category);
    return skills.length > 8;
  };

  const [showScroll, setShowScroll] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
      setShowScroll(false);
      setIsAnimating(false);
    } else {
      setExpandedCategory(categoryId);
      setShowScroll(false);
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
        if (needsScroll(categoryId)) {
          setShowScroll(true);
        }
      }, 1500);
    }
  };

  return (
    <div className={`${styles.skillsTree} ${className} ${animationClasses}`} ref={containerRef}>

      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern} />
        <div className={styles.gradientOrbs}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>
      </div>

      <OptimizedParticleSystem />

      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleGlow}><Network size={48} /> {t('skills.skills')}</span>
        </h2>
        <p className={styles.subtitle}>
          {t('skills.click-categories')}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={t('skills.search-placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.searchIcon}>
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className={styles.roadmapContainer}>

        <div className={styles.categoriesSidebar}>
          <h3 className={styles.sidebarTitle}>{t('skills.categories')}</h3>
          {skillCategories.map((category) => {
            const categorySkills = getCategorySkills(category.id);
            const isExpanded = expandedCategory === category.id;

            return (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${isExpanded ? styles.active : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                style={{ '--category-color': category.color } as React.CSSProperties}
              >
                <div className={styles.categoryIcon}>
                  {category.id === 'core' ? <Zap size={24} /> :
                    category.id === 'frontend' ? <Palette size={24} /> :
                      category.id === 'backend' ? <Settings size={24} /> :
                        category.id === 'cloud' ? <Cloud size={24} /> :
                          category.id === 'mobile' ? <Smartphone size={24} /> : <Wrench size={24} />}
                </div>
                <div className={styles.categoryInfo}>
                  <div className={styles.categoryName}>{category.name}</div>
                  <div className={styles.skillCount}>{categorySkills.length} skills</div>
                </div>
                <div className={styles.expandIcon}>
                  {isExpanded ? '−' : '+'}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`${styles.skillsContent} ${expandedCategory && needsScroll(expandedCategory) && showScroll && !isAnimating ? styles.withScroll : ''}`}
          style={{
            overflowY: isAnimating ? 'hidden !important' : (expandedCategory && needsScroll(expandedCategory) && showScroll ? 'auto' : 'hidden')
          } as React.CSSProperties}
        >
          {expandedCategory ? (
            <div className={styles.skillsSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  {skillCategories.find(c => c.id === expandedCategory)?.name} Skills
                </h2>
                <p className={styles.sectionSubtitle}>
                  {getCategorySkills(expandedCategory).length} {t('skills.skills-available')}
                </p>
              </div>

              <div className={styles.skillsGrid}>
                {getCategorySkills(expandedCategory).map((skill, index) => (
                  <div
                    key={skill.id}
                    className={styles.skillCard}
                    onClick={() => handleSkillClick(skill.id)}
                    style={{
                      '--skill-color': skill.color,
                      '--delay': `${index * 100}ms`
                    } as React.CSSProperties}
                  >
                     <div className={styles.skillIcon}>
                       {skill.icon ? (
                         <Image
                           src={skill.icon}
                           alt={skill.name}
                           width={32}
                           height={32}
                           className={styles.skillIconImage}
                         />
                       ) : (
                         '⚡'
                       )}
                     </div>
                    <div className={styles.skillInfo}>
                      <div className={styles.skillName}>{skill.name}</div>
                      <div className={styles.skillDetails}>
                        <div className={styles.skillRank}>{skill.rank}</div>
                        <div className={styles.skillExperience}>{getSkillDuration(skill.startDate, lang, skill.endDate)}</div>
                        <div className={styles.skillPercentage}>{skill.percentage}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.welcomeSection}>
              <div className={styles.welcomeIcon}>
                <GitFork size={48} />
              </div>
              <h2 className={styles.welcomeTitle}>{t('skills.select-category')}</h2>
              <p className={styles.welcomeText}>
                {t('skills.choose-category')}
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedSkill && (
        <SkillModal
          skill={getFilteredSkills().find(s => s.id === selectedSkill)!}
          onClose={closeModal}
          onRelatedSkillClick={handleRelatedSkillClick}
        />
      )}
    </div>
  );
};
