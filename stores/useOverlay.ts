// store/useOverlay.ts
import { create } from 'zustand';

interface OverlayState {
  isNavOpen: boolean;
  isContactOpen: boolean;
  toggleNav: () => void;
  openNav: () => void;
  closeNav: () => void;
  openContact: () => void;
  closeContact: () => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
  isNavOpen: false,
  isContactOpen: false,

  toggleNav: () => set((s) => ({ isNavOpen: !s.isNavOpen })),
  openNav: () => set({ isNavOpen: true }),
  closeNav: () => set({ isNavOpen: false }),

  openContact: () => set({ isContactOpen: true }),
  closeContact: () => set({ isContactOpen: false }),
}));
