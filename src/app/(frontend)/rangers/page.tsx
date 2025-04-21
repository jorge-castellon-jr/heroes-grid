// Your page file (e.g., CardsPage.tsx)
import { getPayload, Payload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import RangerCard from './RangerCard'; // Import the new card component
import { Ranger } from '@/payload-types'; // Import the interface

// Make sure Payload's find operation returns data typed as Ranger[]
// You might need to adjust the payload.find call or type assertion
async function fetchRangers(payload: Payload): Promise<Ranger[]> {
  const result = await payload.find({
    collection: 'rangers', // Assuming your collection is named 'rangers'
    limit: 100,
    depth: 1, // Ensure nested fields like 'team' (if object) or 'deck.card' are populated if needed
    where: {
      status: { equals: 'published' }
    }
  });
  // Perform type assertion or validation if necessary
  return result.docs as Ranger[];
}

export default async function CardsPage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Fetch data using the typed function
  const rangers: Ranger[] = await fetchRangers(payload);

  return (
    <div className="page-container">
      {' '}
      {/* Optional: Add a container for page padding */}
      <h1>Power Rangers Deck</h1>
      {rangers.length > 0 ? (
        <div className="rangers-grid">
          {rangers.map((ranger) => (
            <RangerCard key={ranger.id} ranger={ranger} />
          ))}
        </div>
      ) : (
        <p>{"No Rangers found. It's quiet... too quiet."}</p>
      )}
    </div>
  );
}
