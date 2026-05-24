// src/components/IconWrapper/IconWrapper.jsx
//
// A styled container for SVG icons.
// Replace children with your Figma SVG import, e.g.:
//   import SearchIcon from '@/assets/icons/search.svg?react';
//   <IconWrapper variant="navy"><SearchIcon /></IconWrapper>

import styles from './IconWrapper.module.css';

/**
 * variant: 'navy' | 'cream' | 'transparent'
 * size:    'sm'(36) | 'md'(44) | 'lg'(48)
 * shape:   'rounded' | 'circle'
 */
export function IconWrapper({
  children,
  variant = 'navy',
  size = 'md',
  shape = 'rounded',
  className = '',
}) {
  return (
    <span
      className={[
        styles.wrapper,
        styles[variant],
        styles[size],
        styles[shape],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
