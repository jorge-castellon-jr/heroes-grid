
import React from 'react';
import { Card } from '@/payload-types'; // Assuming Card interface is here

// Helper function or object for icons (same as before or customize)
const getIcon = (iconName: 'STAR' | 'KING' | 'GIFT') => {
  switch (iconName) {
    case 'STAR':
      return '⭐';
    case 'KING':
      return '👑';
    case 'GIFT':
      return '🎁';
    default:
      return '';
  }
};

// Helper to add specific classes based on type for styling
const getTypeClass = (type: Card['type']) => {
  return `type-${type.replace(/[:\s]/g, '')}`; // Remove colons/spaces for CSS class
};

interface CardDisplayProps {
  card: Card;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  return (
    <div className={`card-display ${getTypeClass(card.type)}`}>
      <div className="card-display-header">
        <span className={`card-display-cost cost-${card.energyCost}`}>
          {card.energyCost}
        </span>
        <h3 className="card-display-name">{card.name}</h3>
      </div>

      <div className="card-display-body">
        <span className="card-display-type">{card.type}</span>
        {card.description && (
          <p className="card-display-description">{card.description}</p>
        )}
        <div className="card-display-stats">
          {card.attackDice != null && (
            <span className="stat attack-dice">⚔️ {card.attackDice} Dice</span>
          )}
          {card.attackHit != null && (
            <span className="stat attack-hit">💥 {card.attackHit} Hit</span>
          )}
          {/* Always show shields, even if 0 */}
          <span className="stat shields">🛡️ {card.shields} Shields</span>
        </div>
      </div>

      {card.iconAbility?.icon && (
        <div className="card-display-footer">
          <span className="icon">{getIcon(card.iconAbility.icon)}</span>
          {card.iconAbility.description && (
            <span className="icon-desc">{card.iconAbility.description}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDisplay;
