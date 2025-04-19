import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import '../styles.css'

export default async function TeamsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const teams = await payload.find({
    collection: 'teams',
    limit: 100
  })


  return (
    <div className="home">
      <div className="content">
        {JSON.stringify(teams.docs)}
      </div>
    </div>
  )
}
