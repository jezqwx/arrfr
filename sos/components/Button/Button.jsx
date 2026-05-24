// src/components/Button/Button.jsx

import styles from './Button.module.css';

/**
 * variant: 'primary' | 'outline' | 'ghost' | 'icon'
 * size:    'sm' | 'md' | 'lg'
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      className={[styles.btn, styles[variant], styles[size], className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
