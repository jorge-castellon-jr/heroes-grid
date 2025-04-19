"use client"
import { importCardsAction, importRangersAction, importTeamsAction } from '../actions/importActions'

export function ImportButtons() {
  return (
    <div className="links" style={{ marginTop: 20 }}>
      <p><u>Import:</u></p>
      <a
        className="admin"
        // href={payloadConfig.routes.admin}
        onClick={importTeamsAction}
      >
        Teams
      </a>
      <a
        className="docs"
        onClick={importCardsAction}
      >
        Cards
      </a>
      <a
        className="docs"
        onClick={importRangersAction}
      >
        Rangers
      </a>
    </div>
  )
}
