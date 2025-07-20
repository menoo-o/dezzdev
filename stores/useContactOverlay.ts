// // stores/useContactOverlay.ts
// import { create } from 'zustand';

// interface ContactOverlayState {
//   isOpen: boolean;
//   openOverlay: () => void;
//   closeOverlay: () => void;
//   toggleOverlay: () => void;
// }

// export const useContactOverlay = create<ContactOverlayState>((set) => ({
//   isOpen: false,
//   openOverlay: () => set({ isOpen: true }),
//   closeOverlay: () => set({ isOpen: false }),
//   toggleOverlay: () => set((state) => ({ isOpen: !state.isOpen })),
// }));


// store/navStore.ts
import { create } from 'zustand';

interface NavState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

export const useNavStore = create<NavState>((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
