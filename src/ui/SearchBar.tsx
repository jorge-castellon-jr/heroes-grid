import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({ placeholder = "Search database...", onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-64 pl-10 pr-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
      />
    </div>
  );
}
