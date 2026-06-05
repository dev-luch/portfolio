'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Skill, skillsData } from '@data/skills';
import { RankBadge } from '../RankBadge';
import { useLang } from '../../hooks/useLang';
import { getSkillDuration } from '@utils/dynamicDuration';
import styles from './styles.module.css';
import Image from 'next/image';

interface SkillModalProps {
  skill: Skill;
  onClose: () => void;
  onRelatedSkillClick?: (skillId: string) => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ skill, onClose, onRelatedSkillClick }) => {
  const { t, lang } = useLang();

  const handleRelatedSkillClick = (relatedSkill: string) => {
    const skillExists = skillsData.find(s => s.name.toLowerCase() === relatedSkill.toLowerCase());
    if (skillExists && onRelatedSkillClick) {
      onRelatedSkillClick(skillExists.id);
    }
  };

  const isRelatedSkillClickable = (relatedSkill: string) => {
    return skillsData.some(s => s.name.toLowerCase() === relatedSkill.toLowerCase());
  };

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.modalBackdrop} />
        <Dialog.Content
          className={styles.modalContent}
          style={{ '--skill-color': skill.color, '--glow-color': skill.glowColor } as React.CSSProperties}
          aria-describedby={undefined}
        >
          <div className={styles.modalHeader}>
            <div className={styles.skillIcon}>
              {skill.icon ? (
                <Image src={skill.icon} alt={skill.name} width={48} height={48} className={styles.skillIconImage} />
              ) : (
                '⚡'
              )}
            </div>
            <div className={styles.skillInfo}>
              <Dialog.Title asChild>
                <h2 className={styles.skillName}>{skill.name}</h2>
              </Dialog.Title>
              <div className={styles.skillMeta}>
                <RankBadge rank={skill.rank} size="medium" />
                <span className={styles.skillPercentage}>{skill.percentage}%</span>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className={styles.closeButton}>×</button>
            </Dialog.Close>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.skillDescription}>
              <h3>{t('skills.modal.description')}</h3>
              <p>{t(skill.descriptionKey)}</p>
            </div>

            <div className={styles.skillExperienceSection}>
              <h3>{t('skills.modal.experience')}</h3>
              <p>{getSkillDuration(skill.startDate, lang, skill.endDate)}</p>
            </div>

            {skill.projects && skill.projects.length > 0 && (
              <div className={styles.skillProjects}>
                <h3>{t('skills.modal.projects')}</h3>
                <ul>
                  {skill.projects.map((project, index) => (
                    <li key={index}>{project.startsWith('skills.') ? t(project) : project}</li>
                  ))}
                </ul>
              </div>
            )}

            {skill.certifications && skill.certifications.length > 0 && (
              <div className={styles.skillCertifications}>
                <h3>{t('skills.modal.certifications')}</h3>
                <ul>
                  {skill.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}

            {skill.relatedSkills && skill.relatedSkills.length > 0 && (
              <div className={styles.relatedSkills}>
                <h3>{t('skills.modal.related-skills')}</h3>
                <div className={styles.relatedList}>
                  {skill.relatedSkills.map((relatedSkill, index) => {
                    const isClickable = isRelatedSkillClickable(relatedSkill);
                    return (
                      <div
                        key={index}
                        className={`${styles.relatedItem} ${isClickable ? styles.clickable : styles.disabled}`}
                        onClick={() => isClickable && handleRelatedSkillClick(relatedSkill)}
                      >
                        <span className={styles.relatedIcon}>{isClickable ? '🔗' : '🔒'}</span>
                        <span className={styles.relatedName}>{relatedSkill}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.skillLevel}>
              <span className={styles.levelLabel}>{t('skills.modal.proficiency-level')}</span>
              <div className={styles.levelBar}>
                <div
                  className={styles.levelFill}
                  style={{ width: `${skill.percentage}%`, backgroundColor: skill.color }}
                />
              </div>
              <span className={styles.levelPercentage}>{skill.percentage}%</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
