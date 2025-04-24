// CardsPage.tsx (or your preferred filename)
import { getPayload, Payload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import { RangerCard } from '@/payload-types'; // Import the Card interface
import { CardsPage } from './CardsPage';

// Type assertion for the fetched data
async function fetchCards(payload: Payload): Promise<RangerCard[]> {
  const result = await payload.find({
    collection: 'rangerCards',
    limit: 100,
    depth: 1,
    where: {
      status: { equals: 'published' }
    }
  });
  return result.docs
}

export default async function Page() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const cards: RangerCard[] = await fetchCards(payload);

  return (
    <div className="page-container">
      <h1>Card Library</h1>
      <CardsPage cards={cards} />
    </div>
  );
}
