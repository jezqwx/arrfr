// src/components/DocCard/DocCard.jsx

import styles from './DocCard.module.css';

// TODO: import actual SVG icons from @/assets/icons/
// import DownloadIcon from '@/assets/icons/download.svg?react';

/**
 * @param {object} props
 * @param {React.ReactNode} props.icon        - SVG icon (from Figma)
 * @param {string}          props.title
 * @param {string}          props.description
 * @param {string}          props.filename    - used for download
 * @param {Function}        [props.onDownload]
 */
export function DocCard({ icon, title, description, filename, onDownload }) {
  const handleDownload = () => {
    if (onDownload) {
      onDownload(filename);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.iconWrap}>
        {/* Replace with: <YourIcon /> */}
        {icon}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <button className={styles.downloadBtn} onClick={handleDownload}>
        {/* TODO: <DownloadIcon /> */}
        Скачать
      </button>
    </article>
  );
}
