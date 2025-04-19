import { getPayload, Payload } from "payload"
import configPromise from '@payload-config'
import path from "path"
import fs from "fs/promises"
import { fileURLToPath } from "url"
import { Dataset } from "./types"


// --- Configuration ---
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Adjust the path to your actual JSON data file
const JSON_DATA_PATH = path.resolve(__dirname, "data.json")
// --- End Configuration ---


// --- Helper: Parse Team String ---
async function parseTeams(teamString: string, teamMap: any) {
  if (!teamString) return []
  const teamNames = teamString.split(/\s+or\s+/i) // Split by " or "
  const teamIds = []
  for (const name of teamNames) {
    const trimmedName = name.trim()
    if (teamMap.has(trimmedName)) {
      teamIds.push(teamMap.get(trimmedName))
    } else {
      console.warn(`Team not found in map: ${trimmedName}`)
      // Optionally try to find/create it here if needed
    }
  }
  return teamIds
}


// --- Helper: Find Ranger IDs (Simplified - Needs Improvement) ---
// This is a basic version. Mapping strings like "Any Mighty Morphin Ranger"
// or "Mighty Morphin Red or Ninja Red Ranger" robustly requires a more
// complex lookup strategy, potentially querying Payload multiple times.
async function findRangerIds(rangerString, rangerMap) {
  const ids = []
  const identifier = rangerString // Use the raw string as a key for now
  if (rangerMap.has(identifier)) {
    ids.push(rangerMap.get(identifier))
  } else {
    // Basic fallback: Try finding by name part if it's a simple "Color Team" format
    const parts = rangerString.split(" ")
    if (parts.length >= 2) {
      const potentialName = parts.slice(0, -1).join(" ") // e.g., "Mighty Morphin"
      const potentialColor = parts[parts.length - 1] // e.g., "Red"
      // This requires iterating the map or querying Payload, complex!
      // console.warn(`Complex ranger lookup needed for: ${rangerString}`);
    } else {
      console.warn(`Could not find ranger ID for: ${rangerString}`)
    }
  }
  // TODO: Implement logic for "Any Team Ranger", "Ranger A or Ranger B"
  if (rangerString.startsWith("Any ")) {
    console.warn(`'Any' ranger lookup not implemented for: ${rangerString}`)
  }
  if (rangerString.includes(" or ")) {
    console.warn(`'Or' ranger lookup not implemented for: ${rangerString}`)
  }
  return ids
}

// --- Main Import Function ---
async function importData() {
  console.log("Initializing Payload...")
  const payload: Payload = await getPayload({ config: await configPromise })
  console.log("Payload initialized.")

  console.log("Loading JSON data...")
  let jsonData: { datasets: Dataset[] }
  try {
    const rawData = await fs.readFile(JSON_DATA_PATH, "utf-8")
    jsonData = JSON.parse(rawData)
    if (!jsonData || !Array.isArray(jsonData.datasets)) {
      throw new Error("Invalid JSON structure: 'datasets' array not found.")
    }
  } catch (error) {
    console.error(`Error reading or parsing JSON file: ${error}`)
    return
  }
  console.log(`Loaded ${jsonData.datasets.length} datasets.`)

  const teamMap = new Map()
  const cardMap = new Map()
  const rangerMap = new Map() // Key: name-ability, Value: id

  // --- 1. Import Teams ---
  console.log("\n--- Importing Teams ---")
  const uniqueTeamNames = new Set<string>()
  jsonData.datasets.forEach(({ parsedData }) => {
    parsedData.rangers.forEach((r) => uniqueTeamNames.add(r.team))
    parsedData.zords.forEach((z) => {
      z.team.split(/\s+or\s+/i).forEach((t) => uniqueTeamNames.add(t.trim()))
    })
    parsedData.megazords.forEach((m) => {
      m.team.split(/\s+or\s+/i).forEach((t) => uniqueTeamNames.add(t.trim()))
    })
  })

  for (const teamName of uniqueTeamNames) {
    if (!teamName) continue
    try {
      const existing = await payload.find({
        collection: "teams",
        where: { name: { equals: teamName } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`Team found: ${teamName} (ID: ${existing.docs[0].id})`)
        teamMap.set(teamName, existing.docs[0].id)
      } else {
        const newTeam = await payload.create({
          collection: "teams",
          data: { name: teamName },
        })
        console.log(`Team created: ${teamName} (ID: ${newTeam.id})`)
        teamMap.set(teamName, newTeam.id)
      }
    } catch (error) {
      console.error(`Error processing team ${teamName}: ${error}`)
    }
  }

  // --- 2. Import Cards ---
  console.log("\n--- Importing Cards ---")
  const uniqueCards = new Map() // Key: cardName, Value: cardData from JSON
  jsonData.datasets.forEach((dataset) => {
    dataset.parsedData.rangers?.forEach((ranger) => {
      ranger.deck?.forEach((deckCard) => {
        if (deckCard.name && !uniqueCards.has(deckCard.name)) {
          uniqueCards.set(deckCard.name, deckCard)
        }
      })
    })
  })

  for (const [cardName, cardData] of uniqueCards) {
    try {
      const existing = await payload.find({
        collection: "cards",
        where: { name: { equals: cardName } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`Card found: ${cardName} (ID: ${existing.docs[0].id})`)
        cardMap.set(cardName, existing.docs[0].id)
      } else {
        const { attackDice, attackHit } = parseAttack(cardData.attack)
        let iconAbilityData = null
        if (cardData.iconAbility) {
          let iconValue = null
          if (cardData.iconAbility.icon === "★") iconValue = "STAR"
          if (cardData.iconAbility.icon === "王") iconValue = "KING"
          if (cardData.iconAbility.icon === "GIFT") iconValue = "GIFT" // Assuming GIFT is direct

          iconAbilityData = {
            icon: iconValue,
            description: cardData.iconAbility.description,
          }
        }

        const cardPayload = {
          name: cardName,
          energyCost: cardData.energyCost === 'X' ? 'X' : Number(cardData.energyCost), // Ensure string for select
          type: cardData.type,
          shields: String(cardData.shields), // Ensure string for select
          description: cardData.description,
          // Conditional attack fields
          ...(cardData.type === "ATTACK" && { attackDice, attackHit }),
          ...(iconAbilityData && { iconAbility: iconAbilityData }),
        }

        const newCard = await payload.create({
          collection: "cards",
          data: cardPayload,
        })
        console.log(`Card created: ${cardName} (ID: ${newCard.id})`)
        cardMap.set(cardName, newCard.id)
      }
    } catch (error) {
      console.error(
        `Error processing card ${cardName}: ${error.message}`,
        error.data || "",
      ) // Log Payload validation errors if available
    }
  }

  // --- 3. Import Rangers ---
  console.log("\n--- Importing Rangers ---")
  let rangerIndex = 0 // For unique identifier if needed
  for (const dataset of jsonData.datasets) {
    if (!dataset.parsedData.rangers) continue
    for (const rangerData of dataset.parsedData.rangers) {
      const rangerIdentifier = `${rangerData.name}-${rangerData.subtext}-${rangerIndex++}` // Create a unique key
      try {
        // Find by name and subtext (more reliable than just name)
        const existing = await payload.find({
          collection: "rangers",
          where: {
            and: [
              { name: { equals: rangerData.name } },
              { subtext: { equals: rangerData.subtext } },
            ],
          },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          console.log(
            `Ranger found: ${rangerData.name} (${rangerData.subtext}) (ID: ${existing.docs[0].id})`,
          )
          rangerMap.set(rangerIdentifier, existing.docs[0].id)
          // Store a simpler key for Zord lookup if subtext is consistent
          if (rangerData.subtext) {
            rangerMap.set(rangerData.subtext, existing.docs[0].id)
          }
        } else {
          const teamId = teamMap.get(rangerData.team)
          if (!teamId) {
            console.warn(
              `Skipping ranger ${rangerData.name}: Team ${rangerData.team} not found.`,
            )
            continue
          }

          const deckPayload = rangerData.deck
            ?.map((dCard) => {
              const cardId = cardMap.get(dCard.name)
              if (!cardId) {
                console.warn(
                  `Card ${dCard.name} not found for ranger ${rangerData.name}'s deck.`,
                )
                return null
              }
              return { card: cardId, count: dCard.count }
            })
            .filter((c) => c !== null) // Filter out nulls if card wasn't found

          // Combine abilities into one string
          const abilityText = rangerData.abilities
            ?.map((a) => `${a.name}: ${a.description}`)
            .join("\n\n") // Separate abilities by double newline

          const rangerPayload = {
            name: rangerData.name,
            subtext: rangerData.subtext,
            team: teamId,
            color: rangerData.color?.toLowerCase(), // Ensure lowercase for select
            ability: abilityText || rangerData.ability || "No ability listed.", // Use combined text or fallback
            type: getRangerType(rangerData),
            deck: deckPayload || [],
          }

          const newRanger = await payload.create({
            collection: "rangers",
            data: rangerPayload,
          })
          console.log(
            `Ranger created: ${rangerData.name} (${rangerData.subtext}) (ID: ${newRanger.id})`,
          )
          rangerMap.set(rangerIdentifier, newRanger.id)
          // Store a simpler key for Zord lookup if subtext is consistent
          if (rangerData.subtext) {
            rangerMap.set(rangerData.subtext, newRanger.id)
          }
        }
      } catch (error) {
        console.error(
          `Error processing ranger ${rangerData.name} (${rangerData.subtext}): ${error.message}`,
          error.data || "",
        )
      }
    }
  }

  // --- 4. Import Zords ---
  console.log("\n--- Importing Zords ---")
  for (const dataset of jsonData.datasets) {
    if (!dataset.parsedData.zords) continue
    for (const zordData of dataset.parsedData.zords) {
      try {
        const existing = await payload.find({
          collection: "zords",
          where: { name: { equals: zordData.name } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          console.log(`Zord found: ${zordData.name} (ID: ${existing.docs[0].id})`)
        } else {
          const teamIds = await parseTeams(zordData.team, teamMap)
          if (teamIds.length === 0) {
            console.warn(
              `Skipping zord ${zordData.name}: Teams ${zordData.team} not found.`,
            )
            continue
          }

          // --- Complex Ranger Mapping Logic ---
          // This part needs significant improvement for robustness
          let compatibleRangerIds = []
          if (zordData.ranger) {
            // Attempt lookup based on the provided 'ranger' string (often subtext)
            compatibleRangerIds = await findRangerIds(
              zordData.ranger,
              rangerMap,
            )
            // If lookup fails, maybe try parsing "Team Color" if applicable
          }
          // Fallback/Alternative: Use the 'rangers' array if it were populated in JSON
          // if (zordData.rangers && zordData.rangers.length > 0) {
          //     // Map these identifiers to IDs
          // }

          if (compatibleRangerIds.length === 0) {
            console.warn(
              `Could not map compatible rangers for Zord: ${zordData.name} (String: ${zordData.ranger})`,
            )
          }
          // --- End Complex Ranger Mapping ---

          const zordPayload = {
            name: zordData.name,
            team: teamIds,
            ability: zordData.ability,
            subcategory: zordData.type, // Map JSON 'type' to schema 'subcategory'
            compatibleRangers: compatibleRangerIds,
            // TODO: Handle isAny and whichAnyTeam based on your logic
          }

          const newZord = await payload.create({
            collection: "zords",
            data: zordPayload,
          })
          console.log(`Zord created: ${zordData.name} (ID: ${newZord.id})`)
        }
      } catch (error) {
        console.error(
          `Error processing zord ${zordData.name}: ${error.message}`,
          error.data || "",
        )
      }
    }
  }

  // --- 5. Import Megazords ---
  console.log("\n--- Importing Megazords ---")
  for (const dataset of jsonData.datasets) {
    if (!dataset.parsedData.megazords) continue
    for (const megazordData of dataset.parsedData.megazords) {
      try {
        const existing = await payload.find({
          collection: "megazords",
          where: { name: { equals: megazordData.name } },
          limit: 1,
        })

        if (existing.docs.length > 0) {
          console.log(
            `Megazord found: ${megazordData.name} (ID: ${existing.docs[0].id})`,
          )
        } else {
          const teamIds = await parseTeams(megazordData.team, teamMap)
          if (teamIds.length === 0) {
            console.warn(
              `Skipping megazord ${megazordData.name}: Teams ${megazordData.team} not found.`,
            )
            continue
          }

          const megazordPayload = {
            name: megazordData.name,
            team: teamIds,
            ability: megazordData.ability,
          }

          const newMegazord = await payload.create({
            collection: "megazords",
            data: megazordPayload,
          })
          console.log(
            `Megazord created: ${megazordData.name} (ID: ${newMegazord.id})`,
          )
        }
      } catch (error) {
        console.error(
          `Error processing megazord ${megazordData.name}: ${error.message}`,
          error.data || "",
        )
      }
    }
  }

  console.log("\n--- Import Complete ---")
}

// --- Run the Import ---
importData().catch((error) => {
  console.error("Unhandled error during import:", error)
  process.exit(1)
})
