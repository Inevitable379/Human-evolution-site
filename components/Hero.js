import { useEffect, useRef } from 'react';
import styles from '../styles/components/Hero.module.css';

export default function Hero() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Animate content in
    const els = heroRef.current?.querySelectorAll(
      `.${styles.subtitle}, .${styles.title}, .${styles.description}, .${styles.scrollIndicator}`
    );

    if (els && !prefersReducedMotion) {
      els.forEach((el, i) => {
        el.style.transition = `opacity 0.8s ease ${i * 0.2}s, transform 0.8s ease ${i * 0.2}s`;
        el.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    } else if (els) {
      els.forEach((el) => {
        el.style.opacity = '1';
      });
    }

    // Starfield canvas background
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const stars = [];
    const numStars = 150;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 230, 227, ${star.alpha})`;
        ctx.fill();
        star.alpha += star.speed * 0.02 * (Math.random() > 0.5 ? 1 : -1);
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={styles.background}>
        <canvas
          ref={canvasRef}
          className={styles.backgroundCanvas}
          aria-hidden="true"
        />
      </div>
      <div ref={heroRef} className={styles.content}>
        <span className={styles.subtitle}>The Story of Us</span>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>What Makes Us</span>
          <span className={styles.titleLine}>Human?</span>
        </h1>
        <p className={styles.description}>
          Journey through millions of years of evolution to discover the
          remarkable adaptations that set our species apart — from walking
          upright to building civilizations.
        </p>
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
