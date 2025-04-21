import type { CollectionConfig } from 'payload'
import { collectionDefaults } from './utils';

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "status"],
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
      unique: true,
      label: "Tag Name",
    },
  ],
};
