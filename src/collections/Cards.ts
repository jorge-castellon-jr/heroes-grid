import type { CollectionConfig } from 'payload'

export const Cards: CollectionConfig = {
  slug: "cards",
  admin: {
    useAsTitle: "name",
    description: "Individual combat cards used by Rangers.",
    defaultColumns: ["name", "type", "energyCost", "shields"],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true,
      label: "Card Name",
    },
    {
      name: "energyCost",
      type: "text", // Using text because cost can be 'X'
      required: true,
      label: "Energy Cost",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: ["ATTACK", "MANEUVER", "REACTION"],
      label: "Card Type",
    },
    {
      name: "shields",
      type: "number",
      required: true,
      label: "Shield Value",
    },
    {
      name: "attack",
      type: "text", // Covers dice notation ("Two Dice"), special values ("SPECIAL"), and fixed hits ("2 [HIT]")
      label: "Attack Value / Dice",
    },
    {
      name: "description",
      type: "textarea",
      label: "Card Description / Effect Text",
    },
    {
      name: "iconAbility",
      type: "group",
      label: "Icon Ability (Optional)",
      fields: [
        {
          name: "icon",
          type: "text",
          label: "Icon Symbol",
          admin: {
            description: "e.g., ★, 王, [GIFT], [CHROMAFURY]",
          },
        },
        {
          name: "description",
          type: "textarea",
          label: "Icon Ability Description",
        },
      ],
    },
    // --- Special Flags/Fields for specific card types ---
    {
      name: "isKeyCard",
      type: "checkbox",
      label: "Is Key Card?",
      admin: {
        description:
          "Check if this card belongs to a Super Megaforce Silver key deck.",
      },
    },
    {
      name: "giftEffect", // Specific to Santa Claus cards
      type: "textarea",
      label: "Gift Effect",
      admin: {
        condition: (_, siblingData) => siblingData?.iconAbility?.icon === "[GIFT]",
        description: "The effect triggered when this card is revealed as a gift.",
      },
    },
    {
      name: "chromafuryIcons", // Specific to Dino Fury keys
      type: "number",
      label: "Number of Chromafury Icons",
      admin: {
        condition: (_, siblingData) =>
          siblingData?.iconAbility?.icon === "[CHROMAFURY]",
        description: "How many Chromafury icons are on this Dino Key.",
      },
    },
  ],
};

