import type { CollectionConfig } from 'payload'
import { collectionDefaults } from './utils';

export const Megazords: CollectionConfig = {
  slug: "megazords",
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
      type: 'row',
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          unique: true, // Assuming Megazord names are unique
          label: "Megazord Name",
        },
        {
          name: "team",
          type: "relationship",
          relationTo: "teams",
          hasMany: true, // Some megazords belong to multiple teams
          required: true,
          label: "Associated Team(s)",
        },
      ]
    },
    {
      name: "ability",
      type: "textarea",
      required: true,
      label: "Megazord Ability",
    },
  ],
};

