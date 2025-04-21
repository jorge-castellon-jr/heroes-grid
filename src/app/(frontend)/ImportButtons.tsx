"use client"
import { importCardsAction, importMegazordsAction, importRangersAction, importTeamsAction, importZordsAction } from '../actions/importActions'

export function ImportButtons() {
  return <></>
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
      <a
        className="docs"
        onClick={importZordsAction}
      >
        Zords
      </a>
      <a
        className="docs"
        onClick={importMegazordsAction}
      >
        Megazords
      </a>
    </div>
  )
}
