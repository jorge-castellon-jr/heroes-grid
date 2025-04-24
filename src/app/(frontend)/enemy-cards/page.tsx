// CardsPage.tsx (or your preferred filename)
import { getPayload, Payload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import { RangerCard } from '@/payload-types'; // Import the Card interface
// import { CardsPage } from './CardsPage';

// Type assertion for the fetched data
async function fetchCards(payload: Payload) {
  const result = await payload.find({
    collection: 'enemies',







    limit: 1,
    depth: 1,
    where: {
      status: { equals: 'published' },
      id: { equals: 1 }
    },
  });
  return result.docs
}

export default async function Page() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const cards = await fetchCards(payload);

  return (
    <div className="page-container">
      {JSON.stringify(cards, null, 2)}
      {/* <CardsPage cards={cards} /> */}
    </div>
  );
}
