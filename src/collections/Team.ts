import type { CollectionConfig } from 'payload'

export const Teams: CollectionConfig = {
  slug: "teams",
  admin: {
    useAsTitle: "name",
    description: "Represents a Power Rangers team season (e.g., Mighty Morphin, Zeo).",
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      label: "Team Name",
      admin: {
        description: "The official name of the Power Rangers team/season.",
      },
    },
  ],
};
