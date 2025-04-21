import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';

export const ArsenalCards: CollectionConfig = {
  slug: "arsenalCards",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "const", "status"],
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
                  name: "cost",
                  type: "select",
                  required: true,
                  label: "Shield Cost",
                  options: ['R', '0', '1', '2', '3', '4', '5', '6', '7', '8'],
                  admin: {
                    width: '20%'
                  }
                },
                {
                  name: "name",
                  type: "text",
                  required: true,
                  index: true,
                  label: "Card Name",
                },
              ]
            },
            // TODO: media will go here
            {
              name: "type",
              type: "select",
              required: true,
              options: [
                { label: 'Armor', value: 'armor' },
                { label: 'Powerup', value: 'powerup' },
                { label: 'Team Powerup', value: 'team' },
              ],
              label: "Card Type",
            },
            {
              name: "description",
              type: "textarea",
              required: true,
              label: "Card Description / Effect Text",
            },
            {
              name: "uses",
              type: "select",
              options: ['1', '2', '3'],
              required: true,
              label: "Shield Value",
              admin: {
                condition: (_, siblingData) => siblingData?.type === "armor",
              }
            },
          ]
        },
        {
          label: 'Battle Simulator',
          fields: [
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
    }
  ],
};

