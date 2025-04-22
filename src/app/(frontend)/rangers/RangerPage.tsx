"use client"

import { Ranger } from '@/payload-types';
import { FilterButton } from '@/ui/FilterButton';
import { FilterPanel } from '@/ui/FilterPanel';
import { SearchBar } from '@/ui/SearchBar';
import clsx from 'clsx';
import { Filter, Search, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RangerCard } from './RangerCard';

export function RangersPage({ rangers }: { rangers: Ranger[] }) {
  const router = useRouter();
  const { theme } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    colors: [] as string[],
    teams: [] as string[],
    type: [] as string[]
  });


  const toggleFilter = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const filteredRangers = rangers.filter(ranger => {
    const matchesSearch = !filters.search ||
      ranger.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      ranger.ability.toLowerCase().includes(filters.search.toLowerCase());

    const matchesColor = filters.colors.length === 0 ||
      filters.colors.includes(ranger.color);

    const matchesTeam = filters.teams.length === 0 ||
      filters.teams.includes(ranger.team.toString());

    const matchesType = filters.type.length === 0 ||
      filters.type.includes(ranger.type);

    return matchesSearch && matchesColor && matchesTeam && matchesType;
  });

  const handleRangerClick = (id: number) => {
    router.push(`/rangers/${id}`);
  };

  return (
    <div className="relative pb-24 md:pb-0">
      {/* Desktop Header */}
      <header className="hidden md:flex justify-between items-center mb-8">
        <h1 className="tracking-tight">Rangers / Heroes</h1>
        <div className="flex items-center space-x-4">
          <SearchBar
            onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
          />
          <FilterButton onClick={() => setShowFilters(!showFilters)} />
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Heroes of the Grid Database</h1>
      </header>

      {/* Desktop Filters Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Rangers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRangers.map((ranger) => (
          <div key={ranger.id} onClick={() => handleRangerClick(ranger.id)}>
            <RangerCard ranger={ranger} />
          </div>
        )
        )}
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <div className={clsx(
          "flex flex-col border-t",
          theme === 'dark'
            ? "bg-gray-900/95 backdrop-blur-lg border-white/10"
            : "bg-white/95 backdrop-blur-lg border-gray-200"
        )}>
          {/* Search and Filter Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex-1 mr-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className={clsx(
                    "w-full pl-10 pr-4 py-2 rounded-lg",
                    theme === 'dark'
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500"
                  )}
                />
              </div>
            </div>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={clsx(
                "p-3 rounded-lg flex items-center justify-center",
                theme === 'dark'
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
              )}
            >
              {showMobileFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className={clsx(
              "p-4 border-t overflow-x-auto",
              theme === 'dark' ? "border-white/10" : "border-gray-200"
            )}>
              {/* Colors */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {rangerColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFilter('colors', color.name)}
                      className={`px-3 py-1 rounded-full border transition-all ${filters.colors.includes(color.name)
                        ? `${color.class} border-white text-white`
                        : 'border-gray-600 hover:border-white'
                        }`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teams */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Teams</h3>
                <div className="flex flex-wrap gap-2">
                  {teams.map((team, index) => (
                    <button
                      key={index}
                      onClick={() => toggleFilter('teams', team)}
                      className={`px-3 py-1 rounded-full border transition-all ${filters.teams.includes(team)
                        ? 'bg-red-600 border-white'
                        : 'border-gray-600 hover:border-white'
                        }`}
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
    </div>
  );
}
