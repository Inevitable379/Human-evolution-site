import { useEffect, useRef } from 'react';
import styles from '../styles/components/DataViz.module.css';

const dataCards = [
  {
    title: 'Brain Volume',
    icon: '🧠',
    metric: 'cranial capacity',
    bars: [
      { label: 'Australopithecus', value: 30, display: '~450 cc' },
      { label: 'Homo habilis', value: 45, display: '~650 cc' },
      { label: 'Homo erectus', value: 65, display: '~950 cc' },
      { label: 'Homo sapiens', value: 100, display: '~1450 cc' },
    ],
    color: '#e76f51',
    description:
      'Brain size tripled over 3 million years, enabling complex thought, planning, and social behavior.',
  },
  {
    title: 'Tool Complexity',
    icon: '🔧',
    metric: 'sophistication index',
    bars: [
      { label: 'Oldowan (simple)', value: 15, display: 'Basic flakes' },
      { label: 'Acheulean', value: 35, display: 'Hand axes' },
      { label: 'Mousterian', value: 60, display: 'Prepared cores' },
      { label: 'Upper Paleolithic', value: 100, display: 'Blades & art' },
    ],
    color: '#f4a261',
    description:
      'From simple stone chips to multi-component tools, each advance reflected growing cognitive ability.',
  },
  {
    title: 'Population Growth',
    icon: '👥',
    metric: 'estimated population',
    bars: [
      { label: '1M years ago', value: 5, display: '~125,000' },
      { label: '100K years ago', value: 10, display: '~500,000' },
      { label: '10K years ago', value: 25, display: '~5 million' },
      { label: 'Today', value: 100, display: '~8 billion' },
    ],
    color: '#2a9d8f',
    description:
      'Agriculture and civilization triggered exponential growth — from thousands to billions.',
  },
];

export default function DataViz() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Heading fade in
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition = prefersReducedMotion
              ? 'none'
              : 'opacity 0.6s ease';
            entry.target.style.opacity = '1';
            headingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    // Card animations
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const delay = parseInt(card.dataset.index, 10) * 0.15;

            card.style.transition = prefersReducedMotion
              ? 'none'
              : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';

            // Animate bars after card appears
            const animDelay = prefersReducedMotion ? 0 : (delay + 0.3) * 1000;
            setTimeout(() => {
              const bars = card.querySelectorAll('[data-bar-value]');
              bars.forEach((bar) => {
                bar.style.width = `${bar.dataset.barValue}%`;
              });
            }, animDelay);

            cardObserver.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      headingObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="data"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="data-title"
    >
      <div ref={headingRef} className={styles.heading}>
        <span className={styles.headingLabel}>By the Numbers</span>
        <h2 id="data-title">Evolution in Data</h2>
      </div>

      <div className={styles.grid}>
        {dataCards.map((card, cardIndex) => (
          <div
            key={cardIndex}
            ref={(el) => (cardRefs.current[cardIndex] = el)}
            data-index={cardIndex}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <span className={styles.cardIcon} aria-hidden="true">
                {card.icon}
              </span>
            </div>

            {card.bars.map((bar, barIndex) => (
              <div
                key={barIndex}
                className={styles.barContainer}
                role="meter"
                aria-label={`${bar.label}: ${bar.display}`}
                aria-valuenow={bar.value}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={styles.barLabel}>
                  <span className={styles.tooltip} tabIndex={0}>
                    {bar.label}
                    <span className={styles.tooltipText} role="tooltip">
                      {bar.display}
                    </span>
                  </span>
                  <span>{bar.display}</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    data-bar-value={bar.value}
                    style={{ background: card.color }}
                  />
                </div>
              </div>
            ))}

            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
