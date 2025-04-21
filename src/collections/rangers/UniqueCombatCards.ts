import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';
import { rangerColorOptions } from './Rangers';


export const UniqueCombatCards: CollectionConfig = {
  slug: "uniqueCards",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "name", "status"],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    ...collectionDefaults,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              unique: true,
              label: "Title",
              admin: {
                width: '50%',
              },
            },
            {
              name: "rules",
              type: "textarea",
              label: "Rules",
            },
          ]
        },
        {
          label: 'Deck',
          fields: [
            {
              name: "cardTitle",
              type: "text",
              label: "Card Title",
              admin: {
                description: "Descriptive title on bottom of each card",
              },
            },
            {
              name: "color",
              type: "select",
              label: "Color for all cards",
              options: rangerColorOptions,
              admin: {
                condition: (data) => {
                  if (!data) return false
                  if (!data.deck) return true

                  return !data.deck.some((card: { overrideColor: string }) => card.overrideColor)

                }
              }
            },
            {
              name: "deck",
              type: "array",
              label: "Combat Deck",
              labels: {
                singular: 'Card',
                plural: 'Cards'
              },
              admin: {
                description: "The cards included in this specific deck.",
              },
              fields: [
                {
                  name: "card",
                  type: "relationship",
                  relationTo: "rangerCards",
                  required: true,
                  label: "Card",
                },
                {
                  name: "count",
                  type: "number",
                  required: true,
                  min: 1,
                  defaultValue: 1,
                  label: "Count in Deck",
                  admin: {
                    description: "How many copies of this card are in the deck.",
                    step: 1,
                  },
                },
                {
                  name: "overrideName",
                  type: "text",
                  label: "Override Name",
                },
                {
                  name: "overrideColor",
                  type: "select",
                  label: "Color",
                  options: rangerColorOptions,
                  admin: {
                    condition: (data) => !data?.color
                  }
                },
                // TODO: override image
              ],
            },
          ]
        },
        {
          label: 'Preview',
          fields: [
            {
              name: "preview",
              type: "ui",
              admin: {

              }
            },
          ]
        }
      ]
    },
  ],
};
