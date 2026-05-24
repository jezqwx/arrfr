// src/sections/DocumentTemplates/DocumentTemplates.jsx

import { DocCard }            from '@/components/DocCard';
import { SectionHeader }      from '@/components/SectionHeader';
import { DOCUMENT_TEMPLATES } from '@/constants/documents';
import { downloadTemplate }   from '@/services/api';
import styles                  from './DocumentTemplates.module.css';

// Icon import stubs — replace with actual Figma SVG exports:
// import DocIcon   from '@/assets/icons/doc.svg?react';
// import BankIcon  from '@/assets/icons/bank.svg?react';
// import ScaleIcon from '@/assets/icons/scale.svg?react';

const iconMap = {
  doc: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  bank: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="10" width="18" height="11" /><path d="M3 10l9-7 9 7M6 10v11M18 10v11" />
    </svg>
  ),
  scale: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M12 3v18M3 6l9 3 9-3M5 18l-2-9 9 3M19 18l2-9-9 3" />
    </svg>
  ),
};

async function handleDownload(filename) {
  try {
    const blob = await downloadTemplate(filename);
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download error:', err);
    // TODO: show toast notification
  }
}

export function DocumentTemplates() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeader
          title="Шаблоны документов"
          subtitle="Готовые формы для подачи заявлений и жалоб"
        />
        <div className={styles.grid}>
          {DOCUMENT_TEMPLATES.map((doc) => (
            <DocCard
              key={doc.title}
              icon={iconMap[doc.iconKey]}
              title={doc.title}
              description={doc.description}
              filename={doc.filename}
              onDownload={handleDownload}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
