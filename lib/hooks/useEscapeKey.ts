import { useEffect } from 'react';

export default function useEscapeKey(active: boolean, onEscape: () => void) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && active) {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [active, onEscape]);
}
