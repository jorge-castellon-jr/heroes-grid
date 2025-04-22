import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';

export const Seasons: CollectionConfig = {
  slug: "seasons",
  admin: {
    useAsTitle: "name",
    description: "Represents a Power Rangers team season (e.g., Mighty Morphin, Zeo).",
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
      label: "Season Name",
      admin: {
        description: "The official name of the Power Rangers season.",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      unique: true,
      label: "Season Release Order",
      admin: {
        description: "This is unique and for ordering in the front end",
      },
    },
    {
      name: "teams",
      type: "join",
      collection: 'teams',
      on: 'season',
      maxDepth: 2,
    },

  ],
};
