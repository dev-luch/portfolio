import { Briefcase } from "lucide-react";
import { useLang } from "../../hooks/useLang";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useAnimationClasses } from "../../hooks/useAnimationClasses";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./styles.module.css";
import { experiences } from "../../data/experiences";

export const ExperienceSection = () => {
  const { t } = useLang();
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollReveal({ threshold: 0.2 });
  const { animationClasses } = useAnimationClasses();
  const [openPopover, setOpenPopover] = useState<number | null>(null);
  const popoverRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useLayoutEffect(() => {
    if (openPopover === null) return;

    const el = popoverRefs.current[openPopover];
    if (!el) return;

    el.style.setProperty('--offset-x', '0px');
    el.style.setProperty('--arrow-offset', '0px');

    const rect = el.getBoundingClientRect();
    const pad = 12;
    let offsetX = 0;

    if (rect.left < pad) {
      offsetX = pad - rect.left;
    } else if (rect.right > window.innerWidth - pad) {
      offsetX = window.innerWidth - pad - rect.right;
    }

    if (offsetX !== 0) {
      el.style.setProperty('--offset-x', `${offsetX}px`);
      el.style.setProperty('--arrow-offset', `${offsetX}px`);
    }
  }, [openPopover]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickedPopover = Object.values(popoverRefs.current).some(
        (ref) => ref && ref.contains(target)
      );
      const clickedTrigger = target.closest(`.${styles.timelineItem}`);
      
      if (!clickedPopover && !clickedTrigger) {
        setOpenPopover(null);
      }
    };

    if (openPopover !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openPopover]);

  return (
    <section className={`${styles.experienceSection} ${animationClasses}`} ref={experienceRef as any}>
      <div className={`${styles.sectionHeader} ${experienceVisible ? styles.reveal : ''}`}>
        <Briefcase size={48} className={styles.headerIcon} />
        <h2 className={styles.sectionTitle}>{t("experience.title")}</h2>
      </div>

      <div className={`${styles.timeline} ${experienceVisible ? styles.reveal : ''}`}>
        <div className={styles.timelineLine}></div>
        
        {experiences.map((experience) => {
          const IconComponent = experience.icon;
          const isOpen = openPopover === experience.id;
          return (
            <div
              key={experience.id}
              className={`${styles.timelineItemWrapper} ${isOpen ? styles.timelineItemWrapperOpen : ""}`}
            >
              <button 
                type="button"
                className={`${styles.timelineItem} ${styles[experience.status]}`}
                aria-label={t(experience.title)}
                onClick={() => setOpenPopover(isOpen ? null : experience.id)}
              >
                <div className={styles.timelineMarker}>
                  <IconComponent size={16} className={styles.markerIcon} />
                </div>
              </button>
              {isOpen && (
                <div 
                  ref={(el) => {
                    popoverRefs.current[experience.id] = el;
                  }}
                  className={styles.popoverContent}
                >
                  <div className={styles.popoverHeader}>
                    <h3 className={styles.popoverTitle}>{t(experience.title)}</h3>
                    <span className={styles.popoverDate}>{t(experience.date || "")}</span>
                  </div>
                  <div className={styles.popoverBody}>
                    <p className={styles.popoverDescription}>{t(experience.description)}</p>
                    <p className={styles.popoverResponsibilities}>{t(experience.responsibilities)}</p>
                  </div>
                  <div className={styles.popoverArrow}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
