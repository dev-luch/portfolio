import { Terminal } from "lucide-react";
import { useLang } from "../../hooks/useLang";
import { useAnimationClasses } from "../../hooks/useAnimationClasses";
import styles from "./styles.module.css";
import Link from "next/link";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Image from "next/image";

export const SocialSection = () => {
  const { t } = useLang();
  const { ref: socialRef, isVisible: socialVisible } = useScrollReveal({ threshold: 0.2 });
  const { animationClasses } = useAnimationClasses();

  const socialLinks = [
    { id: 0, icon: () => <Image src="/developer-icons/social-icons/github.svg" alt="GitHub" width={24} height={24} className={styles.socialIcon} />, label: "GitHub", url: "https://github.com/Lucas-Christian" },
    { id: 1, icon: () => <Image src="/developer-icons/social-icons/linkedin.svg" alt="LinkedIn" width={24} height={24} className={styles.socialIcon} />, label: "LinkedIn", url: "https://www.linkedin.com/in/lucas-christian-226846245/" },
    { id: 2, icon: () => <Image src="/developer-icons/social-icons/youtube.svg" alt="YouTube" width={24} height={24} className={styles.socialIcon} />, label: "YouTube", url: "https://www.youtube.com/@dev-luch" },
    { id: 3, icon: () => <Image src="/developer-icons/social-icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} className={styles.socialIcon} />, label: "WhatsApp", url: "https://wa.me/message/VLJUSJK2WXJBJ1" },
    { id: 4, icon: () => <Image src="/developer-icons/social-icons/tiktok.svg" alt="TikTok" width={24} height={24} className={styles.socialIcon} />, label: "TikTok", url: "https://www.tiktok.com/@dev.luch" },
    { id: 5, icon: () => <Image src="/developer-icons/social-icons/instagram.svg" alt="Instagram" width={24} height={24} className={styles.socialIcon} />, label: "Instagram", url: "https://www.instagram.com/dev.luch/" }
  ];

  return (
    <div className={`${styles.socialSection} ${animationClasses}`} ref={socialRef as any}>
      <div className={`${styles.socialTitle} ${socialVisible ? styles.reveal : ''}`}>
        <Terminal size={32} className={styles.socialTitleIcon} />
        <span>{t("home.connections")}</span>
      </div>
      <div className={`${styles.socialLinks} ${socialVisible ? styles.reveal : ''}`}>
        {socialLinks.map(({ icon: Icon, id, label, url }) => (
          <div key={`social-link-${id}`} className={styles.socialLinkWrapper}>
            <Link href={url} target="_blank" className={styles.socialLink}>
              <Icon />
              <span className={styles.socialLabel}>{label}</span>
              <div className={styles.socialGlow}></div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
