import { create } from 'zustand';
import { ActiveFilters } from '@/types/filters'; // Import the type

interface AppFilters extends ActiveFilters {
  search: string;
  colors: string[];
  teams: string[];
  type: string[];
}

// Define the state shape
interface AppState {
  filters: AppFilters;
  showDesktopFilters: boolean;
  showMobileFilters: boolean;
  setSearch: (search: string) => void;
  // Make toggleFilter accept any string keyof AppFilters
  toggleFilter: (
    type: keyof Omit<AppFilters, 'search'>, // Use keyof to be type-safe
    value: string
  ) => void;
  setFilters: (filters: Partial<AppFilters>) => void;
  toggleDesktopFilterPanel: () => void;
  toggleMobileFilterPanel: () => void;
  resetFilters: (defaultFilters?: Partial<AppFilters>) => void; // Allow resetting to specific defaults
  closeMobileFilters: () => void; // Add action to specifically close mobile
}

const initialFilters: AppFilters = {
  search: '',
  colors: [],
  teams: [],
  type: [],
};

export const useAppStore = create<AppState>((set) => ({ // Rename hook for generality
  filters: initialFilters,
  showDesktopFilters: false,
  showMobileFilters: false,

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),

  toggleFilter: (type, value) =>
    set((state) => {
      // Ensure the filter array exists before trying to access/modify it
      const currentFilterValues = state.filters[type] ?? [];
      const newFilterValues = currentFilterValues.includes(value)
        ? currentFilterValues.filter((item) => item !== value)
        : [...currentFilterValues, value];
      return {
        filters: {
          ...state.filters,
          [type]: newFilterValues,
        },
      };
    }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  toggleDesktopFilterPanel: () =>
    set((state) => ({ showDesktopFilters: !state.showDesktopFilters })),

  toggleMobileFilterPanel: () =>
    set((state) => ({ showMobileFilters: !state.showMobileFilters })),

  closeMobileFilters: () => set({ showMobileFilters: false }),

  resetFilters: (defaultFilters = initialFilters) =>
    set({
      filters: { ...initialFilters, ...defaultFilters }, // Merge with potential defaults
      showDesktopFilters: false,
      showMobileFilters: false,
    }),
}));
