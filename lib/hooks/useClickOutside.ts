import { useEffect } from 'react';

export default function useClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  isActive: boolean,
  onClickOutside: () => void
) {
  useEffect(() => {
    if (!isActive) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, isActive, onClickOutside]);
}
