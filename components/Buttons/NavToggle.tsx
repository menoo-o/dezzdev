// components/NavToggle.tsx
import { useNavStore } from "@/stores/useContactOverlay";
import './hamburger.css'

export default function NavToggle() {
  const isOpen = useNavStore((s) => s.isOpen);
  const toggle = useNavStore((s) => s.toggle);

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
