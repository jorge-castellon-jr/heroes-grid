import { CollectionConfig } from "payload";

export const collectionDefaults: CollectionConfig['fields'] = [
  {
    name: "status",
    type: "select",
    required: true,
    label: "Status",
    defaultValue: 'draft',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ],
  },
  {
    name: "source",
    type: "select",
    label: "Source",
    required: true,
    defaultValue: 'official',
    options: [
      { label: "Official", value: "official" },
      { label: "TOUGH", value: "tough" },
      { label: "User Creation", value: "user" },
    ],
  },
  {
    name: 'expansion',
    type: 'relationship',
    relationTo: 'expansions',
  },
  {
    name: 'expansions',
    type: 'array',
    required: true,
    fields: [
      {
        name: 'expansion',
        type: 'relationship',
        relationTo: 'expansions',
        required: true
      },
      {
        name: 'includes',
        type: 'select',
        hasMany: true,
        options: [
          { label: 'All', value: 'all' },
          { label: 'Ranger Ability', value: 'ability' },

          { label: 'Combat Cards', value: 'cards' },
          { label: 'Figure', value: 'figure' },
        ]
      }
    ]
  },
]
