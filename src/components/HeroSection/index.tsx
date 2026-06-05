"use client";
import React from "react";
import { User, Code, Star } from "lucide-react";
import { Container } from "../Container";
import { Text } from "../Text";
import Image from "next/image";
import { useLang } from "../../hooks/useLang";
import { calculateAge } from "@utils/dynamicDuration";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useAnimationClasses } from "../../hooks/useAnimationClasses";
import { FloatingSettings } from "../FloatingSettings";
import { OptimizedParticles } from "../OptimizedParticles";
import styles from "./styles.module.css";

export const HeroSection = () => {
  const { t, lang } = useLang();
  const { totalStars, totalCommits, totalPRs, totalContributions, rank, isLoading, error } = {
    totalStars: 12,
    totalCommits: 1008,
    totalPRs: 20,
    totalContributions: 12,
    rank: 'B-',
    isLoading: false,
    error: null
  };
  const { animationClasses } = useAnimationClasses();

  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal({ threshold: 0.3 });
  const { ref: missionRef, isVisible: missionVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: statusRef, isVisible: statusVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className={`${styles.heroSection} ${animationClasses}`} id="hero">

      <OptimizedParticles
        count={12}
        pauseWhenHidden={true}
        mobileOptimized={true}
      />

      <div className={styles.gridBackground}></div>

      <Container flexDirection="column" className={styles.heroContainer}>

        <div className={styles.imageSection}>
          <div className={styles.imageContainer} ref={imageRef as any}>

            <div className={`${styles.imageWrapper} ${imageVisible ? styles.reveal : ''}`}>
              <Image
                src="/luch.webp"
                alt="Dev Luch - Desenvolvedor Full Stack"
                width={200}
                height={200}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageGlow}></div>
            </div>
          </div>
        </div>

        <div className={styles.titleSection} ref={titleRef as any}>
          <div className={`${styles.titleWrapper} ${titleVisible ? styles.reveal : ''}`}>
            <Text family="orbitron" size="xl" className={styles.mainTitle}>
              {t("home.title")}
            </Text>
            <div className={styles.titleGlow}></div>
          </div>
          <Text family="orbitron" size="lg" align="center" className={`${styles.subtitle} ${titleVisible ? styles.reveal : ''}`}>
            {t("home.subtitle")}
          </Text>
        </div>
        <div className={styles.descriptionSection}>

          <div className={`${styles.descriptionCard} ${missionVisible ? styles.reveal : ''}`} ref={missionRef as any}>
            <div className={styles.descriptionHeader}>
              <Star size={16} className={styles.descriptionIcon} />
              <span>{t("home.mission")}</span>
            </div>
            <p className={styles.descriptionText}>
              {t("home.description")}
            </p>
          </div>

          <div className={styles.mainContent}>

            <div className={styles.infoCards}>
              <div className={`${styles.card} ${statusVisible ? styles.reveal : ''}`} ref={statusRef as any}>
                <div className={styles.cardHeader}>
                  <User size={16} className={styles.cardIcon} />
                  <span>{t("home.status")}</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t("home.age")}:</span>
                    <span className={styles.statValue}>{calculateAge(lang)}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t("home.profession")}:</span>
                    <span className={styles.statValue}>{t("home.professionValue")}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>{t("home.education")}:</span>
                    <span className={styles.statValue}>{t("home.educationValue")}</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.card} ${metricsVisible ? styles.reveal : ''}`} ref={metricsRef as any}>
                {!isLoading && !error && (
                  <div className={styles.rankCircle}>
                    <span className={styles.rankText}>{rank}</span>
                  </div>
                )}

                <div className={styles.cardHeader}>
                  <Code size={16} className={styles.cardIcon} />
                  <span>{t("home.metrics")}</span>
                </div>
                <div className={styles.cardContent}>
                  {isLoading ? (
                    <div className={styles.loadingContainer}>
                      <span className={styles.loadingText}>{t("home.loading")}</span>
                    </div>
                  ) : error ? (
                    <div className={styles.errorContainer}>
                      <span className={styles.errorText}>{t("home.error")}</span>
                    </div>
                  ) : (
                    <div className={styles.metricGrid}>
                      <div className={styles.metric}>
                        <span className={styles.metricNumber}>{totalCommits.toLocaleString()}</span>
                        <span className={styles.metricLabel}>{t("home.commits")}</span>
                      </div>
                      <div className={styles.metric}>
                        <span className={styles.metricNumber}>{totalPRs}</span>
                        <span className={styles.metricLabel}>{t("home.prs")}</span>
                      </div>
                      <div className={styles.metric}>
                        <span className={styles.metricNumber}>{totalStars}</span>
                        <span className={styles.metricLabel}>{t("home.stars")}</span>
                      </div>
                      <div className={styles.metric}>
                        <span className={styles.metricNumber}>{totalContributions}</span>
                        <span className={styles.metricLabel}>{t("home.contributions")}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <FloatingSettings />
    </section>
  );
};
