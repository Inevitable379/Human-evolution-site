import styles from '../styles/components/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.content}>
        <h2 className={styles.title}>
          The journey continues<span className={styles.accent}>.</span>
        </h2>
        <p className={styles.description}>
          From walking upright to reaching for the stars — the story of human
          evolution is still being written. What chapter will we write next?
        </p>
        <div className={styles.divider} aria-hidden="true" />
        <p className={styles.credit}>
          Human.Evolution — An interactive exploration of what makes us unique.
        </p>
      </div>
    </footer>
  );
}
