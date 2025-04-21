import type { CollectionConfig } from 'payload'
import { collectionDefaults } from './utils';

export const Expansions: CollectionConfig = {
  slug: "expansions",
  admin: {
    useAsTitle: "name",
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
      label: "Expansion Name",
    },
    {
      name: "urls",
      type: "array",
      label: "URLs",
      admin: {
        description: 'List of URLs for things like where to buy, more info and such'
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          label: "URL Label",
        },
        {
          name: "link",
          type: "text",
          required: true,
          label: "URL Link (i.e. http://example.com)",
        },
      ]
    },
  ],
};
