"use client";

import { FilterButton } from '@/ui/FilterButton';
import { SearchBar } from '@/ui/SearchBar';
import { ActiveFilters, FilterSection } from '@/types/filters'; // Import types
import clsx from 'clsx';
import { Filter, Search, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

interface SearchHeaderProps {
  title: string; // Title for the page (used in desktop header)
  searchQuery: string;
  onSearchChange: (query: string) => void;
  // activeFilters: ActiveFilters; // Current active filters { colors: [...], teams: [...] }
  // onToggleFilter: (filterType: string, value: string) => void;
  // isDesktopFilterPanelOpen: boolean;
  // onToggleDesktopFilterPanel: () => void;
  // desktopFilterPanel?: React.ReactNode; // Optional: Render prop for the desktop panel itself
  // isMobileFilterPanelOpen: boolean;
  // onToggleMobileFilterPanel: () => void;
  // filterSections: FilterSection[]; // Configuration for mobile filter buttons
}

export function SearchHeader({
  title,
  searchQuery,
  onSearchChange,
  // activeFilters,
  // onToggleFilter,
  // isDesktopFilterPanelOpen,
  // onToggleDesktopFilterPanel,
  // desktopFilterPanel, // Receive the panel as a prop
  // isMobileFilterPanelOpen,
  // onToggleMobileFilterPanel,
  // filterSections,
}: SearchHeaderProps) {
  const { theme } = useTheme();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <div className="flex items-center space-x-4">
          <SearchBar onChange={onSearchChange} />
          {/* Only show desktop filter button if panel or sections provided */}
          {/* {(desktopFilterPanel || filterSections.length > 0) && ( */}
          {/*   <FilterButton onClick={onToggleDesktopFilterPanel} /> */}
          {/* )} */}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {title}
        </h1>
      </header>

      {/* Desktop Filters Panel (Rendered via prop) */}
      {/* {isDesktopFilterPanelOpen && desktopFilterPanel} */}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50">
        <div
          className={clsx(
            'flex flex-col border-t',
            theme === 'dark'
              ? 'bg-gray-900/95 backdrop-blur-lg border-white/10'
              : 'bg-white/95 backdrop-blur-lg border-gray-200'
          )}
        >
          {/* Search and Filter Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex-1 mr-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery} // Controlled input
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={clsx(
                    'w-full pl-10 pr-4 py-2 rounded-lg text-sm', // Adjusted text size
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                      : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                  )}
                />
              </div>
            </div>
            {/* Only show filter toggle if filter sections exist */}
            {/* {filterSections.length > 0 && ( */}
            {/*   <button */}
            {/*     onClick={onToggleMobileFilterPanel} */}
            {/*     className={clsx( */}
            {/*       'p-3 rounded-lg flex items-center justify-center transition-colors', */}
            {/*       theme === 'dark' */}
            {/*         ? 'bg-gray-800 text-white hover:bg-gray-700' */}
            {/*         : 'bg-gray-100 text-gray-900 hover:bg-gray-200' */}
            {/*     )} */}
            {/*     aria-label={isMobileFilterPanelOpen ? "Close filters" : "Open filters"} */}
            {/*   > */}
            {/*     {isMobileFilterPanelOpen ? ( */}
            {/*       <X className="w-5 h-5" /> */}
            {/*     ) : ( */}
            {/*       <Filter className="w-5 h-5" /> */}
            {/*     )} */}
            {/*   </button> */}
            {/* )} */}
          </div>

          {/* Mobile Filters Drawer */}
          {/* {isMobileFilterPanelOpen && filterSections.length > 0 && ( */}
          {/*   <div */}
          {/*     className={clsx( */}
          {/*       'p-4 border-t overflow-y-auto max-h-60', // Increased max-height slightly */}
          {/*       theme === 'dark' ? 'border-white/10' : 'border-gray-200' */}
          {/*     )} */}
          {/*   > */}
          {/*     {filterSections.map((section) => ( */}
          {/*       <div key={section.id} className="mb-4 last:mb-0"> */}
          {/* <h3 className="text-sm font-semibold mb-2 uppercase tracking-wide">  */}
          {/*           {section.label} */}
          {/*         </h3> */}
          {/*         <div className="flex flex-wrap gap-2"> */}
          {/*           {section.options.map((option) => { */}
          {/*             const isActive = activeFilters[section.id]?.includes( */}
          {/*               option.value */}
          {/*             ); */}
          {/*             const activeClass = option.activeClassName || (theme === 'dark' ? 'bg-blue-600 border-transparent text-white' : 'bg-indigo-600 border-transparent text-white'); */}
          {/*             const inactiveClass = option.inactiveClassName || (theme === 'dark' ? 'border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white' : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-gray-900'); */}
          {/**/}
          {/*             return ( */}
          {/*               <button */}
          {/*                 key={option.value} */}
          {/*                 onClick={() => onToggleFilter(section.id, option.value)} */}
          {/*                 className={clsx( */}
          {/*                   'px-3 py-1 rounded-full border text-xs transition-all duration-150 ease-in-out', */}
          {/*                   isActive ? activeClass : inactiveClass */}
          {/*                 )} */}
          {/*               > */}
          {/*                 {option.label} */}
          {/*               </button> */}
          {/*             ); */}
          {/*           })} */}
          {/*         </div> */}
          {/*       </div> */}
          {/*     ))} */}
          {/* </div> */}
          {/* )} */}
        </div>
      </div>
    </>
  );
}
