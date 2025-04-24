import React from 'react';
import { Filter } from 'lucide-react';

interface FilterButtonProps {
  onClick?: () => void;
}

export function FilterButton({ onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-900/50 rounded-lg flex items-center space-x-2 hover:bg-gray-800/50 transition-colors border border-white/10 cursor-pointer"
    >
      <Filter className="w-4 h-4" />
      <span>Filters</span>
    </button>
  );
}
