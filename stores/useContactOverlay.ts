// stores/useContactOverlay.ts
import { create } from 'zustand';

interface ContactOverlayState {
  isOpen: boolean;
  openOverlay: () => void;
  closeOverlay: () => void;
  toggleOverlay: () => void;
}

export const useContactOverlay = create<ContactOverlayState>((set) => ({
  isOpen: false,
  openOverlay: () => set({ isOpen: true }),
  closeOverlay: () => set({ isOpen: false }),
  toggleOverlay: () => set((state) => ({ isOpen: !state.isOpen })),
}));
