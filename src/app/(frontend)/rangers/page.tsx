// Your page file (e.g., CardsPage.tsx)
import { getPayload, Payload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import { Ranger } from '@/payload-types'; // Import the interface
import { RangersPage } from './RangerPage';

// Make sure Payload's find operation returns data typed as Ranger[]
// You might need to adjust the payload.find call or type assertion
async function fetchRangers(payload: Payload): Promise<Ranger[]> {
  const result = await payload.find({
    collection: 'rangers',
    limit: 100,
    depth: 2,
    where: {
      status: { equals: 'published' }
    }
  });
  return result.docs;
}

export default async function CardsPage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const rangers: Ranger[] = await fetchRangers(payload);

  const seasonsPayload = await payload.find({
    collection: 'seasons',
    limit: 100,
    depth: 2,
    where: {
      status: { equals: 'published' }
    }
  });
  const seasons = seasonsPayload.docs

  return (
    <div className="page-container">
      <div className='flex flex-col gap-4'>
        {
          seasons.map((season) => <div key={season.id} className='flex flex-col gap-2'>
            <h2>{season.name}</h2>
            {season.teams && season.teams.docs && season.teams.docs.map((team) => {
              if (typeof team === 'number') return team
              if (!team.rangers || !team.rangers.docs) return <></>

              return (
                <div key={team.id}>
                  <h3>
                    {team.name}
                  </h3>
                  <RangersPage rangers={team.rangers.docs as Ranger[]} />
                  {/* { */}
                  {/*   JSON.stringify(team.rangers?.docs) */}
                  {/* } */}
                </div>
              )
            })}
          </div>)
        }
      </div>
      <RangersPage rangers={rangers} />
    </div>

  );
}

