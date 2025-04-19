// CardsPage.tsx (or your preferred filename)
import { getPayload, Payload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import CardDisplay from './CardDisplay'; // Import the new card component
import { Card } from '@/payload-types'; // Import the Card interface

// Type assertion for the fetched data
async function fetchCards(payload: Payload): Promise<Card[]> {
  const result = await payload.find({
    collection: 'cards', // Ensure this is your collection slug for Cards
    limit: 100, // Adjust limit as needed, consider pagination for large sets
    depth: 0, // Usually 0 is fine if Card has no nested relationships to populate
  });
  return result.docs as Card[];
}

export default async function CardsPage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const cards: Card[] = await fetchCards(payload);

  return (
    <div className="page-container">
      <h1>Card Library</h1>
      {cards.length > 0 ? (
        <div className="cards-grid">
          {/* Reusing the grid class or create a new one */}
          {cards.map((card) => (
            <CardDisplay key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <p>No cards found in the library.</p>
      )}
    </div>
  );
}
