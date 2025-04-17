import type { CollectionConfig } from 'payload'

export const Zords: CollectionConfig = {
  slug: "zords",
  admin: {
    useAsTitle: "name",
    description: "Individual Zords associated with Rangers.",
    defaultColumns: ["name", "team", "type", "rangerAssociation"],
  },
  access: {
    read: () => true, // Publicly readable
  },
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
    {
      name: "type",
      type: "text",
      required: true,
      label: "Zord Type / System",
      admin: {
        description:
          "e.g., Dino Zords, Thunder Zords, Ninjazord System, Other MMPR Zords.",
      },
    },
    {
      name: "rangerAssociation",
      type: "text",
      label: "Ranger Association (Text)",
      admin: {
        description:
          "The descriptive text indicating which Ranger(s) use this Zord (e.g., 'Mighty Morphin Red', 'Any Mighty Morphin Ranger').",
      },
    },
    {
      name: "compatibleRangers",
      type: "relationship",
      relationTo: "rangers",
      hasMany: true,
      label: "Compatible Rangers (Relationship)",
      admin: {
        description:
          "Direct link to Ranger entries that can use this Zord. Based on the 'rangers' array in source data.",
      },
    },
    {
      name: "ability",
      type: "textarea",
      required: true,
      label: "Zord Ability",
    },
  ],
};
