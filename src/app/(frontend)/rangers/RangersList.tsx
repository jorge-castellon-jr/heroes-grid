"use client";

import { Ranger } from '@/payload-types';
import { useRouter } from 'next/navigation';
import { useMemo, useEffect } from 'react'; // Import useEffect
import { RangerCard } from './RangerCard';
import { useAppStore } from '@/stores/appStore'; // Use the renamed store hook


export function RangersList({ rangers }: { rangers: (number | Ranger)[] }) {
  const router = useRouter();

  // Get state and actions from the global store
  const {
    filters,
    closeMobileFilters, // Get the close action
  } = useAppStore();

  // Close mobile filters when navigating away (optional but good UX)
  useEffect(() => {
    return () => {
      closeMobileFilters();
    }
  }, [closeMobileFilters, router]); // Dependency array includes router if navigation triggers unmount/remount

  // Memoized filtering logic (no changes needed here)
  const filteredRangers = useMemo(() => {
    return rangers.filter((ranger) => {
      if (typeof ranger === 'number') return false
      // if (ranger.status === 'draft') return false

      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        ranger.name.toLowerCase().includes(searchLower) ||
        (ranger.ability && ranger.ability.toLowerCase().includes(searchLower));

      const matchesColor =
        !filters.colors?.length || filters.colors.includes(ranger.color);

      const matchesTeam =
        !filters.teams?.length ||
        filters.teams.includes(ranger.team.toString());

      const matchesType =
        !filters.type?.length || filters.type.includes(ranger.type);

      return matchesSearch && matchesColor && matchesTeam && matchesType;
    });
  }, [rangers, filters]);

  const handleRangerClick = (id: number | string) => {
    router.push(`/rangers/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {filteredRangers.map((ranger) => (
        typeof ranger !== 'number' && (
          <div
            key={ranger.id}
            onClick={() => handleRangerClick(ranger.id)}
            className="cursor-pointer group" // Added group for potential hover effects within RangerCard
          >
            <RangerCard ranger={ranger} />
          </div>
        )
      ))}
    </div>
  );
}

// export default RangersPage;
