import React from 'react';
import { rangerColors } from '@/lib/constants';

export function RangerColorBar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-2 flex -z-5 pointer-events-none">
      {rangerColors.map((color, index) => (
        <div key={index} className={`flex-1 ${color.class}`} />
      ))}
    </div>
  );
}
