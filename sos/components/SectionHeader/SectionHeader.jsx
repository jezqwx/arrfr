// src/components/SectionHeader/SectionHeader.jsx

import styles from './SectionHeader.module.css';

/**
 * Reusable section title + subtitle block.
 * align: 'center' | 'left'
 */
export function SectionHeader({ title, subtitle, align = 'center', className = '' }) {
  return (
    <div className={[styles.header, styles[align], className].join(' ')}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
