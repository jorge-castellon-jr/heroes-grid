import type { CollectionConfig } from 'payload'

export const Rangers: CollectionConfig = {
  slug: "rangers",
  admin: {
    useAsTitle: "name",
    description: "Represents individual Power Ranger characters and their variants.",
    defaultColumns: ["name", "team", "color", "subtext"],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Ranger Name",
      admin: {
        description: "The character's name (e.g., Jason Lee Scott, Alpha 5).",
      },
    },
    {
      name: "team",
      type: "relationship",
      relationTo: "teams",
      required: true,
      label: "Team",
    },
    {
      name: "color",
      type: "text",
      required: true,
      label: "Color / Designation",
      admin: {
        description: "e.g., Red, Yellow, Ally, Gold, Purple.",
      },
    },
    {
      name: "subtext",
      type: "text",
      label: "Subtext / Title",
      admin: {
        description:
          "Descriptive title below the name (e.g., Mighty Morphin Red, Loyal Robot).",
      },
    },
    {
      name: "abilities",
      type: "array",
      label: "Character Abilities",
      minRows: 1,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Ability Name",
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "Ability Description",
        },
      ],
    },
    {
      name: "deck",
      type: "array",
      label: "Combat Deck",
      admin: {
        description: "The cards included in this Ranger's specific deck.",
      },
      fields: [
        {
          name: "card",
          type: "relationship",
          relationTo: "cards",
          required: true,
          label: "Card",
        },
        {
          name: "count",
          type: "number",
          required: true,
          min: 1,
          defaultValue: 1,
          label: "Count in Deck",
          admin: {
            description: "How many copies of this card are in the deck.",
            step: 1,
          },
        },
      ],
    },
    {
      name: "isAlly",
      type: "checkbox",
      label: "Is Ally?",
      defaultValue: false,
      admin: {
        description:
          "Check if this character is an Ally (like Alpha 5, Ninjor) rather than a primary Ranger.",
      },
    },
    // --- Fields for specific Ranger mechanics ---
    {
      name: "keyDeckRangerType", // For Super Megaforce Silver
      type: "select",
      label: "Key Deck Ranger Type (Super Megaforce Silver)",
      options: [
        { label: "Not Applicable", value: "na" },
        { label: "Sixth Ranger", value: "sixth" },
        { label: "Core Team", value: "core" },
        // Add other categories if needed
      ],
      defaultValue: "na",
      admin: {
        description:
          "Specifies the type of Rangers for Super Megaforce Silver's key deck construction.",
      },
    },
  ],
};
