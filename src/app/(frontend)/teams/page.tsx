import { getPayload, Payload } from 'payload';
import React from 'react';

import config from '@/payload.config';
import '../styles.css'; // Your main stylesheet
import { Team } from '@/payload-types'; // Assuming interfaces are in './interfaces'

async function fetchTeams(payload: Payload): Promise<Team[]> {
  const result = await payload.find({
    collection: 'teams',
    limit: 100,
    depth: 0,
  });
  return result.docs as Team[];
}

export default async function TeamsPage() {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  const teams: Team[] = await fetchTeams(payload);

  return (
    <div className="page-container">
      <h1>Power Rangers Teams</h1>
      {teams.length > 0 ? (
        <div className="teams-grid"> {/* Changed class name for clarity */}
          {teams.map((team) => (
            <div key={team.id} className="team-item-grid"> {/* Changed class name */}
              {team.name}
            </div>
          ))}
        </div>
      ) : (
        <p>No teams found.</p>
      )}
    </div>
  );
}
