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

  // --- 3. Import Rangers ---
  console.log("\n--- Importing Rangers ---")
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
          } else {
            const { docs: teamDocs } = await payload.find({
              collection: "teams",
              where: {
                and: [
                  { name: { equals: rangerData.name } },
                  { abilityName: { equals: uniqueRanger.name } },
                ],
              },
              limit: 1,
            })

            if (!teamDocs.length) {
              console.warn(
                `Skipping ranger ${rangerData.name}: Team ${rangerData.team} not found.`,
              )
              continue
            }

            const team = teamDocs[0]

            const deckPayload: { card: number; count: number; overrideName?: string; }[] = []
            for await (const card of rangerData.deck) {
              const { docs: cardDocs } = await payload.find({
                collection: "cards",
                where: {
                  and: [
                    { description: { equals: card.description } },
                  ],
                },
                limit: 1,
              })
              if (!cardDocs.length) {
                console.warn(
                  `Skipping card ${card.name}: not found.`,
                )
                continue
              }

              deckPayload.push({
                card: cardDocs[0].id,
                count: card.count,
                overrideName: card.name !== cardDocs[0].name ? card.name : undefined
              })
            }

            const rangerPayload = {
              name: rangerData.name,
              team: team.id,
              title: rangerData.title,
              color: rangerData.color.toLowerCase() as typeof rangerData.color,
              abilityName: uniqueRanger.name,
              ability: uniqueRanger.description,
              type: rangerData.type,
              deck: deckPayload,
            }

            const newRanger = await payload.create({
              collection: "rangers",
              data: rangerPayload,
            })
            console.log(
              `Ranger created: ${rangerData.name} (${uniqueRanger.name}) (ID: ${newRanger.id})`,
            )
          }
        }

      } catch (error) {
        console.error(
          `Error processing ranger ${rangerData.name} (${rangerData.title}): ${error}`,
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
