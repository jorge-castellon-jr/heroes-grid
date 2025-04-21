import type { CollectionConfig } from 'payload'
import { collectionDefaults } from './utils';

export const Zords: CollectionConfig = {
  slug: "zords",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "team", "status"],
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
          label: 'Whats on the card',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  unique: true, // Assuming Zord names are unique
                  label: "Zord Name",
                },
                {
                  name: "team",
                  type: "relationship",
                  relationTo: "teams",
                  hasMany: true, // Some zords belong to multiple teams (e.g., "Mighty Morphin or Mighty Morphin Ninja")
                  required: true,
                  label: "Associated Team(s)",
                },
              ]
            },
            {
              name: "ability",
              type: "textarea",
              required: true,
              label: "Zord Ability",
            },
          ]
        },
        {
          label: 'More Data',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'isAny',
                  label: 'Is Any',
                  type: 'checkbox',
                  admin: {
                    width: '10%',
                    style: {
                      alignSelf: 'flex-end'
                    }
                  }
                },
                {
                  name: 'whichAnyTeam',
                  label: 'Which Team',
                  type: 'relationship',
                  relationTo: 'teams',
                  admin: {
                    width: '90%'
                  }
                },
              ],
            },
            {
              name: "subcategory",
              type: "text",
              label: "Subcategory",
              admin: {
                description:
                  "e.g., Dino Zords, Thunder Zords, Ninjazord System, Other MMPR Zords.",
              },
            },
            {
              name: "compatibleRangers",
              type: "relationship",
              relationTo: "rangers",
              hasMany: true,
              required: true,
              label: "Compatible Rangers (Relationship)",
              admin: {
                description:
                  "Direct link to Ranger entries that can use this Zord. Based on the 'rangers' array in source data.",
              },
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
      ],
    }
  ],
};
