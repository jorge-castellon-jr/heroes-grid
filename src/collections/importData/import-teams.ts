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
      } else {
        const newTeam = await payload.create({
          collection: "teams",
          data: { name: teamName },
        })
        console.log(`Team created: ${teamName} (ID: ${newTeam.id})`)
      }
    } catch (error) {
      console.error(`Error processing team ${teamName}: ${error}`)
    }
  }

  console.log("\n--- Import Complete ---")
}

// --- Run the Import ---
importData().catch((error) => {
  console.error("Unhandled error during import:", error)
  process.exit(1)
})
