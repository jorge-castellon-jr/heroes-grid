export interface FilterOption {
  value: string; // The actual value stored in state (e.g., "Red", "MMPR")
  label: string; // The text displayed to the user (e.g., "Red", "Mighty Morphin")
}

export interface FilterSection {
  id: string; // Corresponds to the key in the filter state (e.g., "colors", "teams")
  label: string; // Display label for the section (e.g., "Colors")
  options: FilterOption[]; // List of options within this section
}

// General shape for filter state - can be extended in store
export type ActiveFilters = Record<string, string | string[]>;
