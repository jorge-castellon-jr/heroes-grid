/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { X } from 'lucide-react';
// import { rangerColorOptions } from '@/collections/rangers/Rangers';

interface FilterPanelProps {
  filters: {
    search: string;
    colors?: string[];
    teams?: string[];
    type?: string[];
    energyCost?: string[];
  };
  onFiltersChange: (filters: any) => void;
  onClose: () => void;
}

export function FilterPanel({ filters, onFiltersChange, onClose }: FilterPanelProps) {
  // const toggleFilter = (type: string, value: string) => {
  //   onFiltersChange({
  //     ...filters,
  //     [type]: filters[type]?.includes(value)
  //       ? filters[type].filter(item => item !== value)
  //       : [...(filters[type] || []), value]
  //   });
  // };

  return <></>

  // return (
  //   <div className="mb-8 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
  //     <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-lg font-semibold">Advanced Filters</h2>
  //       <button onClick={onClose} className="text-gray-400 hover:text-white">
  //         <X className="w-5 h-5" />
  //       </button>
  //     </div>
  //
  //     <div className="grid grid-cols-3 gap-8">
  //       {/* Colors - Only show for Rangers */}
  //       {filters.colors !== undefined && (
  //         <div>
  //           <h3 className="text-sm font-semibold mb-3">Ranger Colors</h3>
  //           <div className="flex flex-wrap gap-2">
  //             {rangerColorOptions.map((color, index) => (
  //               <button
  //                 key={index}
  //                 onClick={() => toggleFilter('colors', color.value)}
  //                 className={`px-3 py-1 rounded-full border transition-all ${filters.colors?.includes(color.value)
  //                   ? `${color.value} border-white text-white`
  //                   : 'border-gray-600 hover:border-white'
  //                   }`}
  //               >
  //                 {color.label}
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //
  //       {/* Teams */}
  //       {filters.teams !== undefined && (
  //         <div>
  //           <h3 className="text-sm font-semibold mb-3">Teams</h3>
  //           <div className="flex flex-wrap gap-2">
  //             {teams.map((team, index) => (
  //               <button
  //                 key={index}
  //                 onClick={() => toggleFilter('teams', team)}
  //                 className={`px-3 py-1 rounded-full border transition-all ${filters.teams?.includes(team)
  //                   ? 'bg-red-600 border-white'
  //                   : 'border-gray-600 hover:border-white'
  //                   }`}
  //               >
  //                 {team}
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //
  //       {/* Types */}
  //       {filters.type !== undefined && (
  //         <div>
  //           <h3 className="text-sm font-semibold mb-3">Types</h3>
  //           <div className="flex flex-wrap gap-2">
  //             {['core', 'sixth', 'extra', 'ally'].map((type, index) => (
  //               <button
  //                 key={index}
  //                 onClick={() => toggleFilter('type', type)}
  //                 className={`px-3 py-1 rounded-full border transition-all ${filters.type?.includes(type)
  //                   ? 'bg-blue-600 border-white'
  //                   : 'border-gray-600 hover:border-white'
  //                   }`}
  //               >
  //                 {type}
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
}
