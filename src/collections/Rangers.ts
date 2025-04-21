import type { CollectionConfig } from 'payload'
import { collectionDefaults } from './utils';

const rangerColorOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Black', value: 'black' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Pink', value: 'pink' },
  { label: 'Green', value: 'green' },
  { label: 'White', value: 'white' },
  { label: 'Gold', value: 'gold' },
  { label: 'Silver', value: 'silver' },
  { label: 'Shadow', value: 'shadow' },
  { label: 'Crimson', value: 'crimson' },
  { label: 'Navy', value: 'navy' },
  { label: 'Orange', value: 'orange' },
  { label: 'Purple', value: 'purple' },
  { label: 'Zenith', value: 'zenith' },
  { label: 'Dark', value: 'dark' },
]

export const Rangers: CollectionConfig = {
  slug: "rangers",
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
              type: 'row',
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
                  name: "title",
                  type: "text",
                  required: true,
                  label: "Title",
                },
              ]
            },
            {
              name: "abilityName",
              type: "text",
              required: true,
              label: "Ability Name",
            },
            {
              name: "ability",
              type: "textarea",
              required: true,
              label: "Ability Text",
            },
            {
              name: "isOncePerBattle",
              type: "checkbox",
              label: "Is the ability once per battle?",
            },
            {
              type: 'row',
              fields: [
                {
                  name: "team",
                  type: "relationship",
                  relationTo: "teams",
                  required: true,
                  label: "Team",
                  admin: {
                    width: '50%',
                  }
                },
                {
                  name: "color",
                  type: "select", // Changed from 'text' to 'select'
                  required: true,
                  options: rangerColorOptions, // Use the dynamically generated options
                  label: "Color",
                },
              ]
            },
            {
              name: "type",
              type: "select",
              label: "Ranger Type",
              required: true,
              options: [
                { label: "Core Team", value: "core" },
                { label: "Sixth Ranger", value: "sixth" },
                { label: "Extra Ranger", value: "extra" },
                { label: "Ally", value: "ally" },
              ],
            },
            {
              name: "source",
              type: "select",
              label: "Source",
              required: true,
              defaultValue: 'official',
              options: [
                { label: "Official", value: "official" },
                { label: "TOUGH", value: "tough" },
                { label: "User Creation", value: "user" },
              ],
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
              name: "deck",
              type: "array",
              label: "Combat Deck",
              labels: {
                singular: 'Card',
                plural: 'Cards'
              },
              admin: {
                description: "The cards included in this Ranger's specific deck.",
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
