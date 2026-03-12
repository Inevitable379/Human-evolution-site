import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/Timeline.module.css';

const timelineData = [
  {
    year: '~6 million years ago',
    title: 'Bipedalism',
    description: 'Our ancestors began walking upright, freeing hands for tool use and reshaping our anatomy.',
  },
  {
    year: '~2.6 million years ago',
    title: 'First Stone Tools',
    description: 'Homo habilis crafted Oldowan tools — the dawn of technology and intentional design.',
  },
  {
    year: '~1.5 million years ago',
    title: 'Mastery of Fire',
    description: 'Cooking food increased caloric intake, fueling brain growth and enabling social gathering.',
  },
  {
    year: '~500,000 years ago',
    title: 'Complex Social Groups',
    description: 'Homo heidelbergensis formed large social structures, cooperating in hunts and sharing resources.',
  },
  {
    year: '~100,000 years ago',
    title: 'Symbolic Language',
    description: 'Abstract thought and complex language emerged, enabling storytelling, planning, and culture.',
  },
  {
    year: '~70,000 years ago',
    title: 'Cognitive Revolution',
    description: 'A leap in cognitive ability allowed Homo sapiens to imagine, create art, and form belief systems.',
  },
  {
    year: '~10,000 years ago',
    title: 'Agricultural Revolution',
    description: 'Humans settled, domesticated plants and animals, and laid the foundations for civilizations.',
  },
  {
    year: '~5,000 years ago',
    title: 'Writing Systems',
    description: 'The invention of writing enabled knowledge to persist beyond a single lifetime.',
  },
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const progressRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeItems, setActiveItems] = useState(new Set());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Animate heading
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

    // Animate timeline items
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            const delay = prefersReducedMotion ? 0 : index * 0.05;

            entry.target.style.transition = prefersReducedMotion
              ? 'none'
              : `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            setActiveItems((prev) => new Set([...prev, index]));
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) itemObserver.observe(ref);
    });

    // Progress bar scroll handler
    const handleScroll = () => {
      if (!sectionRef.current || !progressRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = Math.max(0, -rect.top + viewportHeight * 0.3);
      const progress = Math.min(100, (scrolled / sectionHeight) * 100);
      progressRef.current.style.height = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      headingObserver.disconnect();
      itemObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className={styles.timeline}
      aria-labelledby="timeline-title"
    >
      <div ref={headingRef} className={styles.heading}>
        <span className={styles.headingLabel}>The Journey</span>
        <h2 id="timeline-title">Milestones of Evolution</h2>
      </div>

      <div className={styles.track} role="list" aria-label="Evolutionary milestones timeline">
        <div className={styles.line} aria-hidden="true" />
        <div
          ref={progressRef}
          className={styles.lineProgress}
          aria-hidden="true"
        />

        {timelineData.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            data-index={index}
            className={`${styles.item} ${
              index % 2 === 0 ? styles.itemLeft : styles.itemRight
            }`}
            role="listitem"
          >
            <div
              className={`${styles.dot} ${
                activeItems.has(index) ? styles.dotActive : ''
              }`}
              aria-hidden="true"
            />
            <div className={styles.card}>
              <div className={styles.cardYear}>{item.year}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
