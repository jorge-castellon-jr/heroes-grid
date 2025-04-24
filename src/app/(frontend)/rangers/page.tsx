// Your page file (e.g., CardsPage.tsx)
import { getPayload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import { RangersPage } from './RangerPage';


export default async function CardsPage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });


  const seasonsPayload = await payload.find({
    collection: 'seasons',
    limit: 100,
    depth: 5,
    where: {
      status: { equals: 'published' },
    },
    joins: {
      teams: {
        where: {
          status: { equals: 'published' },
        },
      },
    },
    sort: 'order'
  });

  const seasons = seasonsPayload.docs.map((season) => {
    const filteredTeams = (season.teams?.docs || []).map((team) => {
      if (typeof team === 'number') return team

      const filteredNestedItems = (team.rangers?.docs || []).filter((ranger) => {
        if (typeof ranger === 'number') return false
        return ranger.status === 'published'
      });

      return {
        ...team,
        rangers: { docs: filteredNestedItems },
      };
    });

    return {
      ...season,
      teams: { docs: filteredTeams },
    };
  });

  return (
    <div className="page-container">
      <RangersPage seasons={seasons} />
    </div>

  );
}

