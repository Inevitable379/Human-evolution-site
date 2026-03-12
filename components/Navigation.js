import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/Navigation.module.css';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'bipedalism', label: 'Bipedalism' },
  { id: 'tools', label: 'Tools' },
  { id: 'fire', label: 'Fire' },
  { id: 'language', label: 'Language' },
  { id: 'agriculture', label: 'Agriculture' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'data', label: 'Data' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.logo}>
        Human<span className={styles.logoAccent}>.</span>Evolution
      </div>
      <ul className={styles.links} role="list">
        {sections.map((section) => (
          <li key={section.id} role="listitem">
            <button
              className={`${styles.link} ${
                activeSection === section.id ? styles.linkActive : ''
              }`}
              onClick={() => scrollToSection(section.id)}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
