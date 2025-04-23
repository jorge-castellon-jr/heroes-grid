import type { CollectionConfig } from 'payload'
import { collectionDefaults } from '../utils';


export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "monsterType", "team", "color", "status"],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    ...collectionDefaults,
    {
      name: "name",
      type: "text",
      required: true,
      label: "Location Name",
    },
    {
      name: "effect",
      type: "textarea",
      required: true,
      label: "Location Effect",
    },
  ],
};
