"use client";

import { Season } from '@/payload-types';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect } from 'react'; // Import useEffect
import { RangerCard } from './RangerCard';
import { useAppStore } from '@/stores/appStore'; // Use the renamed store hook
import { SearchHeader } from '@/ui/SearchHeader'; // Import the new header
import { FilterPanel } from '@/ui/FilterPanel'; // Keep FilterPanel for desktop
import { FilterSection } from '@/types/filters'; // Import type
import { RangersList } from './RangersList';

// Define or import your static data
const RANGER_COLORS = [
  { value: 'Red', label: 'Red', activeClassName: 'bg-red-600 border-transparent text-white' },
  { value: 'Blue', label: 'Blue', activeClassName: 'bg-blue-600 border-transparent text-white' },
  { value: 'Yellow', label: 'Yellow', activeClassName: 'bg-yellow-500 border-transparent text-black' }, // Example different text
  { value: 'Pink', label: 'Pink', activeClassName: 'bg-pink-500 border-transparent text-white' },
  { value: 'Black', label: 'Black', activeClassName: 'bg-gray-800 border-transparent text-white' },
  { value: 'Green', label: 'Green', activeClassName: 'bg-green-600 border-transparent text-white' },
  // Add other colors as needed
];
const TEAMS = [
  { value: 'Mighty Morphin', label: 'Mighty Morphin' },
  { value: 'Zeo', label: 'Zeo' },
  { value: 'Turbo', label: 'Turbo' },
  // Add other teams
];
const RANGER_TYPES = [
  { value: 'Core', label: 'Core' },
  { value: 'Sixth', label: 'Sixth' },
  { value: 'Extra', label: 'Extra' },
  // Add other types
];

// Define the filter sections specifically for the Rangers page
const rangerFilterSections: FilterSection[] = [
  {
    id: 'colors', // Must match the key in the store's filters state
    label: 'Colors',
    options: RANGER_COLORS,
  },
  {
    id: 'teams', // Must match the key in the store's filters state
    label: 'Teams',
    options: TEAMS.map(team => ({ ...team, activeClassName: 'bg-red-600 border-transparent text-white' })), // Example: Give all teams same active style
  },
  {
    id: 'type', // Must match the key in the store's filters state
    label: 'Type',
    options: RANGER_TYPES.map(type => ({ ...type, activeClassName: 'bg-purple-600 border-transparent text-white' })), // Example: Give all types same active style
  },
];


export function RangersPage({ seasons }: { seasons: Season[] }) {
  const router = useRouter();

  // Get state and actions from the global store
  const {
    filters,
    // showDesktopFilters,
    // showMobileFilters,
    setSearch,
    // toggleFilter,
    // setFilters, // Keep if FilterPanel needs it
    // toggleDesktopFilterPanel,
    // toggleMobileFilterPanel,
    closeMobileFilters, // Get the close action
  } = useAppStore();

  // Close mobile filters when navigating away (optional but good UX)
  useEffect(() => {
    return () => {
      closeMobileFilters();
    }
  }, [closeMobileFilters, router]); // Dependency array includes router if navigation triggers unmount/remount


  return (
    <div className='flex flex-col gap-4'>
      <SearchHeader
        title="Rangers / Heroes"
        searchQuery={filters.search}
        onSearchChange={setSearch}
      // activeFilters={filters}
      // onToggleFilter={toggleFilter}
      // isDesktopFilterPanelOpen={showDesktopFilters}
      // onToggleDesktopFilterPanel={toggleDesktopFilterPanel}
      // Pass the configured FilterPanel component for the desktop view
      // desktopFilterPanel={
      // <FilterPanel
      //   filters={filters}
      //   onFiltersChange={setFilters} // Or pass toggleFilter if preferred
      //   onClose={toggleDesktopFilterPanel}
      // Pass data needed by FilterPanel specifically for rangers
      // Example: Assuming FilterPanel also uses FilterSection structure
      // filterSections={rangerFilterSections}
      //  />
      //}
      // isMobileFilterPanelOpen={showMobileFilters}
      // onToggleMobileFilterPanel={toggleMobileFilterPanel}
      // filterSections={rangerFilterSections} // Pass the config for mobile filters
      />
      {
        seasons.map((season) => <div key={season.id} className='flex flex-col gap-2'>
          <h2 className='title'>{season.name}</h2>
          {season.teams && season.teams.docs && season.teams.docs.length && season.teams.docs.map((team) => {
            if (typeof team === 'number') return team
            // if (team.status === 'draft') return
            if (!team.rangers || !team.rangers.docs) return <></>
            if (!team.rangers.docs.length) return <></>

            return <div key={team.id}>
              <h3 className='subtitle'>{team.name}</h3>
              <RangersList rangers={team.rangers.docs} />
            </div>
          })}
        </div>)
      }
    </div>
  );
}

