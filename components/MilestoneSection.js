import { useEffect, useRef } from 'react';
import MorphingSVG from './MorphingSVG';
import styles from '../styles/components/MilestoneSection.module.css';

const milestoneColors = {
  bipedalism: { bg: 'rgba(231, 111, 81, 0.08)', text: '#e76f51', border: '#e76f51' },
  tools: { bg: 'rgba(244, 162, 97, 0.08)', text: '#f4a261', border: '#f4a261' },
  fire: { bg: 'rgba(233, 196, 106, 0.08)', text: '#e9c46a', border: '#e9c46a' },
  language: { bg: 'rgba(42, 157, 143, 0.08)', text: '#2a9d8f', border: '#2a9d8f' },
  agriculture: { bg: 'rgba(38, 70, 83, 0.15)', text: '#5fa8d3', border: '#264653' },
};

export default function MilestoneSection({
  id,
  stage,
  era,
  title,
  description,
  fact,
  factIcon,
  reversed = false,
}) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  const colors = milestoneColors[stage] || milestoneColors.bipedalism;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const content = contentRef.current;
            const visual = visualRef.current;

            if (prefersReducedMotion) {
              if (content) content.style.opacity = '1';
              if (visual) visual.style.opacity = '1';
              return;
            }

            if (content) {
              content.style.transition = 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s';
              content.style.opacity = '1';
              content.style.transform = 'translateY(0)';
            }
            if (visual) {
              visual.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
              visual.style.opacity = '1';
              visual.style.transform = 'translateY(0)';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.section} ${reversed ? styles.reversed : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.inner}>
        <div ref={contentRef} className={styles.content}>
          <span
            className={styles.era}
            style={{ background: colors.bg, color: colors.text }}
          >
            {era}
          </span>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
          {fact && (
            <div
              className={styles.fact}
              style={{ borderLeftColor: colors.border }}
              role="note"
            >
              <span className={styles.factIcon} aria-hidden="true">
                {factIcon || '💡'}
              </span>
              <div>
                <span className={styles.factLabel} style={{ color: colors.text }}>
                  Key Fact
                </span>
                <span className={styles.factText}>{fact}</span>
              </div>
            </div>
          )}
        </div>
        <div ref={visualRef} className={styles.visual}>
          <MorphingSVG stage={stage} />
        </div>
      </div>
    </section>
  );
}
