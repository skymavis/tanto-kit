import { useCallback, useEffect, useState } from 'react';

export function useClipboard(value: string | undefined, duration?: number) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (copied || !value) return;
    try {
      await navigator.clipboard.writeText(value.trim());
      setCopied(true);
    } catch {}
  }, [value, copied]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), duration);
    return () => clearTimeout(timer);
  }, [copied, duration]);

  return { copied, handleCopy };
}
