import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';
import { EnemyCard } from './EnemyCards';


export const Enemies: CollectionConfig = {
  slug: "enemies",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "team", "color", "status"],
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
              label: "Ranger Name",
              admin: {
                width: '50%',
                description: "The character's name (e.g., Jason Lee Scott, Alpha 5).",
              },
            },
            {
              name: "monsterType",
              type: "select",
              required: true,
              options: [
                { label: "Minion", value: 'minion' },
                { label: "Monster", value: 'monster' },
                { label: "Nemesis", value: 'nemesis' },
                { label: "Mastermind", value: 'mastermind' },
              ],
              label: "Monster Type",
            },
            {
              name: "season",
              type: "relationship",
              relationTo: "seasons",
              required: true,
              label: "Season",
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "tags",
              label: "Tags",
            },
          ]
        },
        {
          label: 'Deck',
          fields: [
            {
              name: "deck",
              type: "array",
              label: "Combat Deck",
              labels: {
                singular: 'Card',
                plural: 'Cards'
              },
              admin: {
                description: "The cards included in this Enemy's specific deck.",
              },
              fields: EnemyCard
            }
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
