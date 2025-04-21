
import React from 'react';
import { Ranger } from '@/payload-types';

// Helper function or object to map color names to CSS-friendly values
// Add all your colors from the interface here!
const rangerColorStyles: Record<Ranger['color'], React.CSSProperties> = {
  red: { '--ranger-color': '#E23730', },
  blue: { '--ranger-color': '#0078F0', },
  black: { '--ranger-color': '#222222', },
  yellow: { '--ranger-color': '#FFDE00' }, // Darker text for yellow
  pink: { '--ranger-color': '#F991C8' }, // Darker text for pink
  green: { '--ranger-color': '#009A4E' },
  white: { '--ranger-color': '#FAFAFA' }, // Darker text for white
  gold: { '--ranger-color': '#D4AF37' },
  silver: { '--ranger-color': '#C0C0C0' },
  shadow: { '--ranger-color': '#4A0404' },
  crimson: { '--ranger-color': '#990000' },
  navy: { '--ranger-color': '#000080' },
  orange: { '--ranger-color': '#FFA500' },
  purple: { '--ranger-color': '#800080' },
  zenith: { '--ranger-color': '#ADA9EC' },
  dark: { '--ranger-color': '#1C1C1C' },
  aqua: { '--ranger-color': '#0078F0' },
  graphite: { '--ranger-color': '#C0C0C0' },
};

interface RangerCardProps {
  ranger: Ranger;
}

const RangerCard: React.FC<RangerCardProps> = ({ ranger }) => {
  // Get the specific style object based on ranger color, or fallback
  const cardStyle = rangerColorStyles[ranger.color]

  return (
    <div className="ranger-card" style={cardStyle}>
      <div className="card-header">
        <span className="ranger-type">{ranger.type}</span>
        <h3>{ranger.name}</h3>
        <p className="ranger-title">{ranger.title}</p>
      </div>
      <div className="card-body">
        <h4>{ranger.abilityName}</h4>
        <p>{ranger.ability}</p>
        {ranger.isOncePerBattle && (
          <p className="once-per-turn">⚡ Once Per Battle</p>
        )}
      </div>
      {ranger.cardTitle && (
        <div className="card-footer">
          <p>{ranger.cardTitle}</p>
        </div>
      )}
    </div>
  );
};

export default RangerCard;
