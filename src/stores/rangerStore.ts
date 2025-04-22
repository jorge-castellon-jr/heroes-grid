import { create } from 'zustand';

// Define the shape of your filters
interface RangerFilters {
  search: string;
  colors: string[];
  teams: string[];
  type: string[]; // Assuming 'type' was also intended based on original state
}

// Define the state shape
interface RangerState {
  filters: RangerFilters;
  showDesktopFilters: boolean;
  showMobileFilters: boolean;
  setSearch: (search: string) => void;
  toggleFilter: (
    type: keyof Omit<RangerFilters, 'search'>, // 'colors' | 'teams' | 'type'
    value: string
  ) => void;
  setFilters: (filters: Partial<RangerFilters>) => void; // For FilterPanel potentially
  toggleDesktopFilterPanel: () => void;
  toggleMobileFilterPanel: () => void;
  resetFilters: () => void; // Optional: Add a way to reset
}

const initialFilters: RangerFilters = {
  search: '',
  colors: [],
  teams: [],
  type: [],
};

export const useRangerStore = create<RangerState>((set) => ({
  filters: initialFilters,
  showDesktopFilters: false,
  showMobileFilters: false,

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
    })),

  toggleFilter: (type, value) =>
    set((state) => {
      const currentFilterValues = state.filters[type];
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

  // Example: If FilterPanel needs to set multiple filters at once
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  toggleDesktopFilterPanel: () =>
    set((state) => ({ showDesktopFilters: !state.showDesktopFilters })),

  toggleMobileFilterPanel: () =>
    set((state) => ({ showMobileFilters: !state.showMobileFilters })),

  resetFilters: () =>
    set({
      filters: initialFilters,
      showDesktopFilters: false,
      showMobileFilters: false,
    }),
}));
