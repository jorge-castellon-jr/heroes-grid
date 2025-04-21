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
]
