// src/hooks/useCopyToClipboard.js

import { useState, useCallback } from 'react';

/**
 * Returns [copied, copy] where copy(text) copies text and
 * sets `copied = true` for `resetDelay` ms.
 */
export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    (text) => {
      navigator.clipboard?.writeText(text).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    },
    [resetDelay],
  );

  return [copied, copy];
}
