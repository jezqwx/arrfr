// src/sections/Footer/Footer.jsx

import { Logo }              from '@/components/Logo';
import {
  FOOTER_PLATFORM_LINKS,
  FOOTER_TOOLS_LINKS,
  SOCIAL_LINKS,
  CONTACT_INFO,
}                            from '@/constants/navigation';
import styles                from './Footer.module.css';

// TODO: import PinIcon  from '@/assets/icons/pin.svg?react';
// TODO: import PhoneIcon from '@/assets/icons/phone.svg?react';
// TODO: import MailIcon from '@/assets/icons/mail.svg?react';
// Social icon stubs — replace with actual Figma SVG exports
// import FacebookIcon  from '@/assets/icons/facebook.svg?react';
// import InstagramIcon from '@/assets/icons/instagram.svg?react';
// import TwitterIcon   from '@/assets/icons/twitter.svg?react';
// import YouTubeIcon   from '@/assets/icons/youtube.svg?react';

// Inline placeholder SVGs — delete once Figma icons are connected
const socialIconMap = {
  facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="white" />
    </svg>
  ),
  twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  ),
};

function FooterLinkGroup({ title, links }) {
  return (
    <div className={styles.linkGroup}>
      <p className={styles.groupTitle}>{title}</p>
      <ul className={styles.linkList} role="list">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className={styles.footerLink}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* ── Brand column ───────────────── */}
          <div className={styles.brand}>
            <Logo />
            <p className={styles.brandDesc}>
              Ваш надёжный проводник в мире финансов. Мы помогаем гражданам принимать
              осознанные решения и защищаем от мошенников.
            </p>
            <div className={styles.social}>
              {SOCIAL_LINKS.map(({ iconKey, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialBtn}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* TODO: replace with Figma icon */}
                  {socialIconMap[iconKey]}
                </a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ────────────────── */}
          <FooterLinkGroup title="Платформа"   links={FOOTER_PLATFORM_LINKS} />
          <FooterLinkGroup title="Инструменты" links={FOOTER_TOOLS_LINKS} />

          {/* ── Contacts column ────────────── */}
          <div className={styles.contacts}>
            <p className={styles.groupTitle}>Контакты</p>

            <div className={styles.contactRow}>
              {/* TODO: <PinIcon className={styles.contactIcon} /> */}
              <svg className={styles.contactIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <span>{CONTACT_INFO.address}</span>
            </div>

            <div className={styles.contactRow}>
              {/* TODO: <PhoneIcon className={styles.contactIcon} /> */}
              <svg className={styles.contactIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.27 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className={styles.phone}>{CONTACT_INFO.phone}</span>
            </div>

            <div className={styles.contactRow}>
              {/* TODO: <MailIcon className={styles.contactIcon} /> */}
              <svg className={styles.contactIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{CONTACT_INFO.email}</span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────── */}
        <div className={styles.bottom}>
          <a href="/privacy" className={styles.legalLink}>Политика конфиденциальности</a>
          <span>© 2026 FinGramota. Все права защищены.</span>
          <a href="/terms"   className={styles.legalLink}>Условия использования</a>
        </div>
      </div>
    </footer>
  );
}
