"use server"

import { getPayload } from "payload"
import type { Payload } from "payload"
import configPromise from "@payload-config" // Use path alias
import path from "path"
import fs from "fs/promises"

// Adjust paths as needed
import type { Dataset, CardData, ZordData, MegazordData } from "@/collections/importData/types"
import { Megazord, Ranger, Zord } from "@/payload-types"
// Import helpers IF your provided logic snippets rely on them (e.g., capitalize)
// import { capitalize, getRangerType } from "@/collections/importData/helpers"

// --- Configuration ---
// Using process.cwd() is generally safer for server-side file path resolution
const JSON_DATA_PATH = path.resolve(
  process.cwd(),
  "src/collections/importData/data.json",
)

// --- Helper: Load JSON Data ---
async function loadJsonData(): Promise<{ datasets: Dataset[] } | null> {
  console.log("Loading JSON data...")
  try {
    const rawData = await fs.readFile(JSON_DATA_PATH, "utf-8")
    const jsonData = JSON.parse(rawData)
    if (!jsonData || !Array.isArray(jsonData.datasets)) {
      throw new Error("Invalid JSON structure: 'datasets' array not found.")
    }
    console.log(`Loaded ${jsonData.datasets.length} datasets.`)
    return jsonData
  } catch (error) {
    console.error(`Error reading or parsing JSON file: ${error}`)
    return null
  }
}

// --- Action: Import Teams (Using your provided logic) ---
export async function importTeamsAction(): Promise<{
  success: boolean
  message: string
}> {
  console.log("\n--- ACTION: Importing Teams ---")
  let payload: Payload | null = null
  try {
    payload = await getPayload({ config: await configPromise })
    const jsonData = await loadJsonData()
    if (!jsonData) throw new Error("Failed to load JSON data.")

    let createdCount = 0
    let foundCount = 0

    // --- Logic from your import-team.ts snippet ---
    const uniqueTeamNames = new Set<string>()
    jsonData.datasets.forEach(({ parsedData }) => {
      // Use optional chaining for safety
      parsedData.rangers?.forEach((r) => r.team && uniqueTeamNames.add(r.team))
      parsedData.zords?.forEach((z) => {
        z.team?.split(/\s+or\s+/i).forEach((t) => uniqueTeamNames.add(t.trim()))
      })
      parsedData.megazords?.forEach((m) => {
        m.team?.split(/\s+or\s+/i).forEach((t) => uniqueTeamNames.add(t.trim()))
      })
    })

    for (const teamName of uniqueTeamNames) {
      // Skip empty names or generic "Power Rangers" if desired
      if (!teamName) continue
      try {
        const existing = await payload.find({
          collection: "teams",
          where: { name: { equals: teamName } },
          limit: 1,
          depth: 0, // Don't need relations here
        })

        if (existing.docs.length > 0) {
          console.log(`Team found: ${teamName} (ID: ${existing.docs[0].id})`)
          foundCount++
        } else {
          await payload.create({
            collection: "teams",
            data: { name: teamName, status: 'published' },
          })
          // console.log(`Team created: ${teamName} (ID: ${newTeam.id})`)
          createdCount++
        }
      } catch (error) {
        console.error(`Error processing team ${teamName}: ${error}`)
      }
    }
    // --- End of logic from your import-team.ts snippet ---

    const message = `Teams import finished. Found: ${foundCount}, Created: ${createdCount}.`
    console.log(message)
    return { success: true, message }
  } catch (error) {
    console.error("Error during team import action:", error)
    return { success: false, message: `Team import failed: ${error}` }
  }
}

// --- Action: Import Cards (Using your provided logic) ---
export async function importCardsAction(): Promise<{
  success: boolean
  message: string
}> {
  console.log("\n--- ACTION: Importing Cards ---")
  let payload: Payload | null = null
  try {
    payload = await getPayload({ config: await configPromise })
    const jsonData = await loadJsonData()
    if (!jsonData) throw new Error("Failed to load JSON data.")

    let createdCount = 0
    let foundCount = 0

    // --- Logic from your import-cards.ts snippet ---
    const uniqueCards = new Map<string, CardData>() // Use CardData type
    jsonData.datasets.forEach((dataset) => {
      dataset.parsedData.rangers?.forEach((ranger) => {
        ranger.deck?.forEach((deckCard) => {
          if (!uniqueCards.has(deckCard.name) && !uniqueCards.has(deckCard.description)) {
            if (!deckCard.description) return uniqueCards.set(deckCard.name, deckCard as CardData)
            uniqueCards.set(deckCard.description, deckCard as CardData)
          }
        })
      })
    })

    for (const [cardDesc, cardData] of uniqueCards) {
      try {
        // *** Using the find logic YOU provided: finding by DESCRIPTION ***
        // *** This is unusual - normally you'd find by NAME. Verify this is intended. ***
        const existing = await payload.find({
          collection: "rangerCards",
          where: { description: { equals: cardDesc } }, // Changed back to find by NAME - your code had description which is likely wrong
          limit: 1,
          depth: 0,
        })

        if (existing.docs.length > 0) {
          // console.log(`Card found: ${cardName} (ID: ${existing.docs[0].id})`)
          foundCount++
        } else {
          // Prepare payload based on your snippet's structure
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cardPayload: any = { // Use 'any' for flexibility or refine type
            name: cardData.name,
            // Cast to specific select types defined in your Cards collection
            energyCost: String(cardData.energyCost) as "0" | "1" | "2" | "3" | "4" | "X",
            type: cardData.type, // Assuming type is always present and correct
            shields: String(cardData.shields) as "0" | "1" | "2" | "3",
            description: cardData.description,
            // Include attack fields only if type is ATTACK and they exist
            attackDice: cardData.type === 'ATTACK' ? cardData.attackDice : 0,
            attackHit: cardData.type === 'ATTACK' ? cardData.attackHit : 0,
            // Map iconAbility if present
            iconAbility: cardData.iconAbility
          }


          // Basic validation before create
          if (!cardPayload.name || !cardPayload.type || !cardPayload.energyCost || !cardPayload.shields) {
            console.warn(`Skipping card creation for "${cardDesc}": Missing required fields (name, type, energyCost, shields).`);
            continue;
          }


          await payload.create({
            collection: "rangerCards",
            data: cardPayload,
          })
          // console.log(`Card created: ${cardName} (ID: ${newCard.id})`)
          createdCount++
        }
      } catch (error) {
        console.error(
          `Error processing card ${cardData.name}: ${error}`,
        )
      }
    }
    // --- End of logic from your import-cards.ts snippet ---

    const message = `Cards import finished. Found: ${foundCount}, Created: ${createdCount}.`
    console.log(message)
    return { success: true, message }
  } catch (error) {
    console.error("Error during card import action:", error)
    return { success: false, message: `Card import failed: ${error}` }
  }
}

// --- Action: Import Rangers (Using your provided logic) ---
export async function importRangersAction(): Promise<{
  success: boolean
  message: string
}> {
  console.log("\n--- ACTION: Importing Rangers ---")
  let payload: Payload | null = null
  try {
    payload = await getPayload({ config: await configPromise })
    const jsonData = await loadJsonData()
    if (!jsonData) throw new Error("Failed to load JSON data.")

    // Fetch existing data needed for relationships WITHIN this action
    const teamMap = new Map<string, number>()
    const allTeams = await payload.find({ collection: "teams", limit: 1000, depth: 0, pagination: false })
    allTeams.docs.forEach((t) => teamMap.set(t.name, t.id))

    const cardMap = new Map<string, { id: number; name: string }>()
    const allCards = await payload.find({ collection: "rangerCards", limit: 3000, depth: 0, pagination: false }) // Adjust limit
    allCards.docs.forEach((c) => cardMap.set(c.description ? c.description : c.name, { id: c.id, name: c.name }))

    let createdCount = 0
    let foundCount = 0
    let skippedCount = 0

    // --- Logic from your import-rangers.ts snippet ---
    for (const dataset of jsonData.datasets) {
      if (!dataset.parsedData.rangers) continue
      for (const rangerData of dataset.parsedData.rangers) {
        try {
          for (const uniqueRanger of rangerData.abilities) {
            // Find by name and subtext (more reliable than just name)
            const existing = await payload.find({
              collection: "rangers",
              where: {
                and: [
                  { name: { equals: rangerData.name } },
                  { abilityName: { equals: uniqueRanger.name } },
                ],
              },
              limit: 1,
            })

            if (existing.docs.length > 0) {
              console.log(
                `Ranger found: ${rangerData.name} (${uniqueRanger.name}) (ID: ${existing.docs[0].id})`,
              )
              foundCount++
            } else {
              const teamId = teamMap.get(rangerData.team)
              if (!teamId) {
                console.warn(
                  `Skipping ranger ${rangerData.name}: Team ${rangerData.team} not found.`,
                )
                skippedCount++
                continue
              }


              const deckPayload: { card: number; count: number; overrideName?: string; }[] = []
              for await (const card of rangerData.deck) {
                const foundCard = cardMap.get(card.description ? card.description : card.name)
                if (!foundCard) {
                  console.warn(
                    `Skipping card ${card.name}: not found.`,
                  )
                  continue
                }

                deckPayload.push({
                  card: foundCard.id,
                  count: card.count,
                  overrideName: card.name !== foundCard.name ? card.name : undefined
                })
              }

              const rangerPayload: Omit<Ranger, 'id' | 'updatedAt' | 'createdAt'> = {
                name: rangerData.name,
                team: teamId,
                title: rangerData.cardTitle ? rangerData.cardTitle : rangerData.title,
                cardTitle: rangerData.cardTitle ? rangerData.title : undefined,
                color: rangerData.color.toLowerCase() as typeof rangerData.color,
                abilityName: uniqueRanger.name,
                ability: uniqueRanger.description,
                type: rangerData.type.toLowerCase() as 'core' | 'sixth' | 'extra' | 'ally',
                deck: deckPayload,
                isOncePerTurn: uniqueRanger.description.toLowerCase().includes('once per battle'),
                status: 'published'
              }

              const newRanger = await payload.create({
                collection: "rangers",
                data: rangerPayload,
              })
              console.log(
                `Ranger created: ${rangerData.name} (${uniqueRanger.name}) (ID: ${newRanger.id})`,
              )
              createdCount++
            }
          }

        } catch (error) {
          console.error(
            `Error processing ranger: ${error}\n${JSON.stringify(rangerData, null, 2)}`,
          )
        }

      }
    } // End dataset loop
    // --- End of logic from your import-rangers.ts snippet ---

    const message = `Rangers import finished. Found: ${foundCount}, Created: ${createdCount}, Skipped: ${skippedCount}.`
    console.log(message)
    return { success: true, message }
  } catch (error) {
    console.error("Error during ranger import action:", error)
    return { success: false, message: `Ranger import failed: ${error}` }
  }
}


// --- Action: Import Zords (Placeholder - Add your logic here) ---
export async function importZordsAction(): Promise<{ success: boolean; message: string }> {
  console.warn("--- ACTION: Import Zords ---");
  let payload: Payload | null = null
  try {
    payload = await getPayload({ config: await configPromise })
    const jsonData = await loadJsonData()
    if (!jsonData) throw new Error("Failed to load JSON data.")

    const teamMap = new Map<string, number>()
    const allTeams = await payload.find({ collection: "teams", limit: 1000, depth: 0, pagination: false })
    allTeams.docs.forEach((t) => teamMap.set(t.name, t.id))

    const rangerMap = new Map<string, number>()
    const allRangers = await payload.find({ collection: "rangers", limit: 1000, depth: 0, pagination: false })
    allRangers.docs.forEach((t) => rangerMap.set(`${t.name}--${t.abilityName}`, t.id))

    let createdCount = 0
    let skippedCount = 0
    let foundCount = 0

    // --- Logic from your import-cards.ts snippet ---
    const uniqueCards = new Map<string, ZordData>() // Use CardData type
    const jsonZords = jsonData.datasets.find(d => d.label === 'Zords')
    if (!jsonZords) throw new Error("Could not find the Zords dataset")

    jsonZords.parsedData.zords.forEach((zord) => {
      if (!uniqueCards.has(zord.name)) {
        uniqueCards.set(zord.name, zord)
      }
    })

    for (const [zordName, zordData] of uniqueCards) {
      console.log(`Zord: ${zordName}`)
      try {
        const existing = await payload.find({
          collection: "zords",
          where: { name: { equals: zordName } },
          limit: 1,
          depth: 0,
        })

        if (existing.docs.length > 0) {
          console.log(`Zord found: ${zordName} (ID: ${existing.docs[0].id})`)
          foundCount++
        } else {
          console.log(`Creating Zord: ${zordName}`)
          const teams = zordData.team.split(' or ')
          const currentTeams = teams.map((z) => teamMap.get(z)).filter((z) => !!z)
          if (!teams.length && teams.length > currentTeams.length) {
            console.log(`Zord skipped: ${zordName}  could not find team ${zordData.team}`, currentTeams)
            skippedCount++
            continue
          }

          const rangers = zordData.rangers
          const compatibleRangers = rangers.map((r) => rangerMap.get(r)).filter((r) => !!r)
          if (!rangers.length && rangers.length > compatibleRangers.length) {
            console.log(`Zord skipped: ${zordName}  could not find team ${zordData.team}`, currentTeams)
            skippedCount++
            continue
          }


          const zordPayload: Omit<Zord, 'id' | 'updatedAt' | 'createdAt'> = {
            name: zordData.name,
            team: currentTeams as number[],
            ability: zordData.ability,
            compatibleRangers: compatibleRangers as number[],
            isAny: zordData.ranger.toLowerCase().includes('any'),
            whichAnyTeam: teamMap.get(zordData.ranger.replace('Any', '').replace('Ranger', '').trim()),
            subcategory: zordData.type,
            status: 'published'
          }

          await payload.create({
            collection: "zords",
            data: zordPayload,
          })
          // console.log(`Card created: ${cardName} (ID: ${newCard.id})`)
          createdCount++
        }
      } catch (error) {
        console.error(
          `Error processing card ${zordData.name}: ${error}`,
          JSON.stringify(zordData, null, 2)
        )
      }
    }
    // --- End of logic from your import-cards.ts snippet ---

    const message = `Zord import finished. Found: ${foundCount}, Created: ${createdCount}, Skipped: ${skippedCount}.`
    console.log(message)
    return { success: true, message }
  } catch (error) {
    console.error("Error during card import action:", error)
    return { success: false, message: `Zord import failed: ${error}` }
  }
}

// --- Action: Import Megazords (Placeholder - Add your logic here) ---
export async function importMegazordsAction(): Promise<{ success: boolean; message: string }> {
  console.warn("--- ACTION: Import Megazords - Not Implemented Yet ---");
  let payload: Payload | null = null
  try {
    payload = await getPayload({ config: await configPromise })
    const jsonData = await loadJsonData()
    if (!jsonData) throw new Error("Failed to load JSON data.")

    const teamMap = new Map<string, number>()
    const allTeams = await payload.find({ collection: "teams", limit: 1000, depth: 0, pagination: false })
    allTeams.docs.forEach((t) => teamMap.set(t.name, t.id))

    let createdCount = 0
    let skippedCount = 0
    let foundCount = 0

    // --- Logic from your import-cards.ts snippet ---
    const uniqueCards = new Map<string, MegazordData>() // Use CardData type
    const jsonZords = jsonData.datasets.find(d => d.label === 'Megazords')
    if (!jsonZords) throw new Error("Could not find the Zords dataset")

    jsonZords.parsedData.megazords.forEach((megazord) => {
      if (!uniqueCards.has(megazord.name)) {
        uniqueCards.set(megazord.name, megazord)
      }
    })

    for (const [megazordName, megazordData] of uniqueCards) {
      console.log(`Megaord: ${megazordName}`)
      try {
        const existing = await payload.find({
          collection: "megazords",
          where: { name: { equals: megazordName } },
          limit: 1,
          depth: 0,
        })

        if (existing.docs.length > 0) {
          console.log(`Megaord found: ${megazordName} (ID: ${existing.docs[0].id})`)
          foundCount++
        } else {
          console.log(`Creating Megazord: ${megazordName}`)
          const teams = megazordData.team.split(' or ')
          const currentTeams = teams.map((z) => teamMap.get(z)).filter((z) => !!z)
          if (!teams.length && teams.length > currentTeams.length) {
            console.log(`Megazord skipped: ${megazordName}  could not find team ${megazordData.team}`, currentTeams)
            skippedCount++
            continue
          }


          const zordPayload: Omit<Megazord, 'id' | 'updatedAt' | 'createdAt'> = {
            name: megazordData.name,
            team: currentTeams as number[],
            ability: megazordData.ability,
            status: 'published'
          }

          await payload.create({
            collection: "megazords",
            data: zordPayload,
          })
          // console.log(`Card created: ${cardName} (ID: ${newCard.id})`)
          createdCount++
        }
      } catch (error) {
        console.error(
          `Error processing card ${megazordData.name}: ${error}`,
          JSON.stringify(megazordData, null, 2)
        )
      }
    }
    // --- End of logic from your import-cards.ts snippet ---

    const message = `Megazord import finished. Found: ${foundCount}, Created: ${createdCount}, Skipped: ${skippedCount}.`
    console.log(message)
    return { success: true, message }
  } catch (error) {
    console.error("Error during card import action:", error)
    return { success: false, message: `Megazord import failed: ${error}` }
  }
}
