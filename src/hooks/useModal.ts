import create from 'zustand';
import { IToken } from '../types';

interface ModalStore {
  isModalOpen: boolean;
  token: IToken | null;
  open: (options: IToken) => void;
  close: () => void;
}

/**
 * Hook for handling modal within state.
 */
export const useModal = create<ModalStore>((set) => ({
  isModalOpen: false,
  token: null,
  open: (options: IToken): void =>
    set(() => {
      return { isModalOpen: true, token: options };
    }),
  close: (): void => set({ isModalOpen: false }),
}));
