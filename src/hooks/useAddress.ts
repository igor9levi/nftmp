import create from 'zustand';

interface AddressStore {
  currentAddress: string;
  setCurrentAddress: (address: string) => void;
}

/**
 * Hook for handling modal within state.
 */
export const useAddress = create<AddressStore>((set, get) => ({
  currentAddress: '',
  setCurrentAddress: (address: string): void =>
    set(() => {
      return { currentAddress: address };
    }),
}));
