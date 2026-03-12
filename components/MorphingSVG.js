import { useEffect, useRef } from 'react';
import styles from '../styles/components/MorphingSVG.module.css';

// SVG path data for different evolutionary stages
const morphShapes = {
  bipedalism: {
    // Upright human silhouette
    body: 'M200 50 C220 50 230 70 230 90 L230 160 L260 260 L240 260 L220 200 L200 260 L180 260 L160 200 L170 260 L150 260 L180 160 L180 90 C180 70 190 50 200 50Z',
    color: '#e76f51',
  },
  tools: {
    // Human with extended arm holding tool
    body: 'M200 50 C220 50 230 70 230 90 L230 130 L280 100 L290 110 L240 150 L230 160 L260 260 L240 260 L215 200 L200 260 L185 200 L160 260 L140 260 L170 160 L170 90 C170 70 180 50 200 50Z',
    color: '#f4a261',
  },
  fire: {
    // Human figure with flame-like energy
    body: 'M200 45 C225 45 235 70 235 90 L235 130 L260 120 L270 140 L245 155 L235 160 L265 260 L245 260 L220 195 L200 260 L180 195 L155 260 L135 260 L165 160 L155 155 L130 140 L140 120 L165 130 L165 90 C165 70 175 45 200 45Z',
    color: '#e9c46a',
  },
  language: {
    // Human with speech waves
    body: 'M200 45 C222 45 232 68 232 88 L232 128 L255 108 L268 118 L250 140 L275 135 L278 148 L252 155 L232 158 L262 260 L242 260 L218 198 L200 260 L182 198 L158 260 L138 260 L168 158 L168 88 C168 68 178 45 200 45Z',
    color: '#2a9d8f',
  },
  agriculture: {
    // Human with wider, settled stance
    body: 'M200 48 C220 48 228 68 228 88 L228 128 L255 140 L260 155 L235 150 L228 158 L270 265 L248 265 L218 200 L200 265 L182 200 L152 265 L130 265 L172 158 L165 150 L140 155 L145 140 L172 128 L172 88 C172 68 180 48 200 48Z',
    color: '#264653',
  },
};

export default function MorphingSVG({ stage = 'bipedalism' }) {
  const pathRef = useRef(null);
  const shape = morphShapes[stage] || morphShapes.bipedalism;

  useEffect(() => {
    if (!pathRef.current) return;

    pathRef.current.setAttribute('d', shape.body);
    pathRef.current.setAttribute('fill', shape.color);
  }, [stage, shape]);

  return (
    <div className={styles.container} role="img" aria-label={`Illustration of human evolution stage: ${stage}`}>
      <svg
        className={styles.svg}
        viewBox="0 0 400 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground line */}
        <line
          x1="80"
          y1="270"
          x2="320"
          y2="270"
          stroke="#333"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Main morphing figure */}
        <path
          ref={pathRef}
          className={styles.morphPath}
          d={shape.body}
          fill={shape.color}
          fillOpacity="0.85"
        />

        {/* Head circle */}
        <circle
          cx="200"
          cy="35"
          r="18"
          fill={shape.color}
          fillOpacity="0.9"
          style={{ transition: 'fill 0.8s ease' }}
        />

        {/* Glow effect */}
        <circle
          cx="200"
          cy="150"
          r="80"
          fill={shape.color}
          fillOpacity="0.05"
          style={{ transition: 'fill 0.8s ease' }}
        />
      </svg>
    </div>
  );
}
