import { create } from "zustand";

interface FormState {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  toggleForm: () => void;
}

export const useFormStore = create<FormState>((set) => ({
  isOpen: false,
  openForm: () => set({ isOpen: true }),
  closeForm: () => set({ isOpen: false }),
  toggleForm: () => set((state) => ({ isOpen: !state.isOpen })),
}));
