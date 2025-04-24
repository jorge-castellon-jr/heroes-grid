import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';

export const Teams: CollectionConfig = {
  slug: "teams",
  admin: {
    useAsTitle: "name",
    description: "Represents a Power Rangers team (e.g., Mighty Morphin Ninja, Zeo).",
    defaultColumns: ["name", "status"],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    collectionDefaults[0],
    collectionDefaults[1],
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      label: "Team Name",
      admin: {
        description: "The official name of the Power Rangers team.",
      },
    },
    {
      name: "season",
      type: "relationship",
      relationTo: "seasons",
      label: "Season",
    },
    {
      name: "rangers",
      type: "join",
      collection: "rangers",
      on: 'team',
      maxDepth: 3,
    },
  ],
};
