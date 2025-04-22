import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';

export const RangerCards: CollectionConfig = {
  slug: "rangerCards",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "energyCost", "shields", "status"],
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
                  name: "energyCost",
                  type: "select",
                  required: true,
                  label: "Energy Cost",
                  options: ['X', '0', '1', '2', '3', '4'],
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
              options: ["ATTACK", "ATTACK: SPECIAL", "MANEUVER", "REACTION"],
              label: "Card Type",
            },
            {
              name: "description",
              type: "textarea",
              label: "Card Description / Effect Text",
            },
            {
              name: "shields",
              type: "select",
              options: ['1', '2', '3'],
              required: true,
              label: "Shield Value",
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData?.type === "ATTACK",
              },
              fields: [
                {
                  name: "attackDice",
                  type: "number",
                  label: "Attack Dice",
                  admin: {
                    description: "How many Dice?",
                  },
                },
                {
                  name: "attackHit",
                  type: "number",
                  label: "Hit Value",
                  admin: {
                    description: "How much flat damage?",
                  },
                },
              ]
            }
          ]
        },
        {
          label: 'Icon Ability',
          fields: [
            {
              name: "iconAbility",
              type: "group",
              label: "Icon Ability (Optional)",
              fields: [
                {
                  name: "icon",
                  type: "select",
                  label: "Icon Symbol",
                  options: [
                    { label: '★ STAR', value: 'STAR' },
                    { label: '王 KING', value: 'KING' },
                    'GIFT'
                  ],
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Icon Ability Description",
                },
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
    }
  ],
};

