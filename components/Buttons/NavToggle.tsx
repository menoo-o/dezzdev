// components/NavToggle.tsx
import { useOverlayStore } from '../../stores/useOverlay';
import './hamburger.css'

function NavToggle() {
  const isOpen = useOverlayStore((s) => s.isNavOpen);
  const toggle = useOverlayStore((s) => s.toggleNav);

  return (
    <button
      className={`menu-toggle ${isOpen ? 'active' : ''}`}
      onClick={toggle}
      aria-label="Toggle navigation"
    >
      <span className="hamburger"></span>
    </button>
  );
}



export  {NavToggle}
