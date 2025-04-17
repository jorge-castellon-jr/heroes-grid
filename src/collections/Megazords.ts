import type { CollectionConfig } from 'payload'

export const Megazords: CollectionConfig = {
  slug: "megazords",
  admin: {
    useAsTitle: "name",
    description: "Combined Megazord formations.",
    defaultColumns: ["name", "team"],
  },
  access: {
    read: () => true, // Publicly readable
  },
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
    {
      name: "ability",
      type: "textarea",
      required: true,
      label: "Megazord Ability",
    },
  ],
};

