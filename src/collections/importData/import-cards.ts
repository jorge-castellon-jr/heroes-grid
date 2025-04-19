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


  // --- 2. Import Cards ---
  console.log("\n--- Importing Cards ---")
  const uniqueCards = new Map<string, Dataset["parsedData"]["rangers"][0]['deck'][0]>() // Key: cardName, Value: cardData from JSON
  jsonData.datasets.forEach((dataset) => {
    dataset.parsedData.rangers.forEach((ranger) => {
      ranger.deck.forEach((deckCard) => {
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
        where: { name: { equals: cardData.description } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`Card found: ${cardName} (ID: ${existing.docs[0].id})`)
      } else {

        const cardPayload = {
          name: cardName,
          energyCost: String(cardData.energyCost) as "0" | "1" | "2" | "3" | "4" | "X",
          type: cardData.type,
          shields: String(cardData.shields) as "0" | "1" | "2" | "3",
          description: cardData.description,
          attackDice: cardData.type === 'ATTACK' ? cardData.attackDice : 0,
          attackHit: cardData.type === 'ATTACK' ? cardData.attackHit : 0,
          iconAbility: cardData.iconAbility,
        }

        const newCard = await payload.create({
          collection: "cards",
          data: cardPayload,
        })
        console.log(`Card created: ${cardName} (ID: ${newCard.id})`)
      }
    } catch (error) {
      console.error(
        `Error processing card ${cardName}: ${error}`,
      ) // Log Payload validation errors if available
    }
  }

  console.log("\n--- Import Complete ---")
}

// --- Run the Import ---
importData().catch((error) => {
  console.error("Unhandled error during import:", error)
  process.exit(1)
})
