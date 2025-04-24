"use client"
import { RangerCard } from "@/payload-types";
import { useAppStore } from "@/stores/appStore";
import { SearchHeader } from "@/ui/SearchHeader";
import { SingleCardUi } from "./SingleCardUi";

export function CardsPage({ cards }: { cards: RangerCard[] }) {
  const {
    filters,
    // showDesktopFilters,
    // showMobileFilters,
    setSearch,
    // toggleFilter,
    // setFilters, // Keep if FilterPanel needs it
    // toggleDesktopFilterPanel,
    // toggleMobileFilterPanel,
    // closeMobileFilters, // Get the close action
  } = useAppStore();

  // Filter cards based on search, type, and energy cost
  const filteredCards = cards.filter(card => {
    const matchesSearch = !filters.search ||
      card.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      (card.description?.toLowerCase().includes(filters.search.toLowerCase()));

    // const matchesType = filters.type.length === 0 ||
    //   filters.type.includes(card.type);
    //
    // const matchesEnergyCost = filters.energyCost.length === 0 ||
    //   filters.energyCost.includes(card.energyCost);

    // return matchesSearch && matchesType && matchesEnergyCost;
    return matchesSearch
  });

  return (
    <div>
      <SearchHeader
        title="Ranger Cards"
        searchQuery={filters.search}
        onSearchChange={setSearch}
      />


      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCards.map(card => (
          <SingleCardUi key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
