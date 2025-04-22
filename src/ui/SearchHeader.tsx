"use client";

import { FilterButton } from '@/ui/FilterButton';
import { FilterPanel } from '@/ui/FilterPanel'; // Assuming FilterPanel exists
import { SearchBar } from '@/ui/SearchBar';
import clsx from 'clsx';
import { Filter, Search, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRangerStore } from '@/stores/rangerStore'; // Adjust path if needed

// Define props if rangerColors/teams are passed down
interface RangerControlsProps {
  rangerColors: { name: string; class: string }[]; // Example structure
  teams: string[]; // Example structure
}

export function RangerControls({ rangerColors, teams }: RangerControlsProps) {
  const { theme } = useTheme();
  const {
    filters,
    showDesktopFilters,
    showMobileFilters,
    setSearch,
    toggleFilter,
    toggleDesktopFilterPanel,
    toggleMobileFilterPanel,
    setFilters, // Use this if FilterPanel needs it
  } = useRangerStore();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center mb-8">
        <h1 className="tracking-tight">Rangers / Heroes</h1>
        <div className="flex items-center space-x-4">
          <SearchBar onChange={setSearch} />
          <FilterButton onClick={toggleDesktopFilterPanel} />
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Heroes of the Grid Database
        </h1>
      </header>

      {/* Desktop Filters Panel */}
      {showDesktopFilters && (
        <FilterPanel
          filters={filters}
          // Adjust how FilterPanel interacts - maybe pass toggleFilter or setFilters
          // Option 1: Pass toggleFilter if it handles individual toggles
          // onFilterChange={toggleFilter} // You might need to adjust FilterPanel's props
          // Option 2: Pass setFilters if it sets multiple filters
          onFiltersChange={setFilters} // Adjust FilterPanel's props accordingly
          onClose={toggleDesktopFilterPanel}
          // Pass necessary data like colors/teams if FilterPanel needs them
          rangerColors={rangerColors}
          teams={teams}
        />
      )}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50"> {/* Added z-index */}
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
                  value={filters.search} // Controlled input
                  onChange={(e) => setSearch(e.target.value)}
                  className={clsx(
                    'w-full pl-10 pr-4 py-2 rounded-lg',
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500'
                  )}
                />
              </div>
            </div>
            <button
              onClick={toggleMobileFilterPanel}
              className={clsx(
                'p-3 rounded-lg flex items-center justify-center',
                theme === 'dark'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-900'
              )}
            >
              {showMobileFilters ? (
                <X className="w-5 h-5" />
              ) : (
                <Filter className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div
              className={clsx(
                'p-4 border-t overflow-y-auto max-h-48', // Added max-height and scroll
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              )}
            >
              {/* Colors */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {rangerColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFilter('colors', color.name)}
                      className={clsx(
                        'px-3 py-1 rounded-full border text-xs transition-all', // Adjusted padding/text size
                        filters.colors.includes(color.name)
                          ? `${color.class} border-transparent text-white` // Use transparent border when active
                          : theme === 'dark'
                            ? 'border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white'
                            : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-gray-900'
                      )}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teams */}
              {/* Add Type filter similarly if needed */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Teams</h3>
                <div className="flex flex-wrap gap-2">
                  {teams.map((team, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFilter('teams', team)}
                      className={clsx(
                        'px-3 py-1 rounded-full border text-xs transition-all', // Adjusted padding/text size
                        filters.teams.includes(team)
                          ? 'bg-red-600 border-transparent text-white' // Use transparent border when active
                          : theme === 'dark'
                            ? 'border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white'
                            : 'border-gray-300 hover:border-gray-500 text-gray-600 hover:text-gray-900'
                      )}
                    >
                      {team}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
