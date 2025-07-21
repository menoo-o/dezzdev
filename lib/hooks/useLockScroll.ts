import { useEffect } from 'react';

export default function useLockScroll(active: boolean) {
  useEffect(() => {
    const body = document.body;

    if (active) {
      body.classList.add('lock-scroll');
    } else {
      body.classList.remove('lock-scroll');
    }

    return () => body.classList.remove('lock-scroll');
  }, [active]);
}
