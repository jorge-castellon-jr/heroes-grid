import type { CollectionConfig } from 'payload'

export const EnemyCard: CollectionConfig['fields'] = [
  {
    type: 'tabs',
    tabs: [
      {
        label: 'Card Details',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: "health",
                type: "select",
                required: true,
                label: "Health",
                options: ['1', '2', '3', '4', '5', '6', '7', '8'],
                admin: {
                  width: '20%'
                }
              },
              {
                name: "name",
                type: "text",
                required: true,
                index: true,
                label: "Card Name",
              },
            ]
          },
          // TODO: media will go here
          {
            name: "cardtype",
            type: "select",
            required: true,
            hasMany: true,
            options: ["FAST", "GUARD", "PASSIVE"],
            label: "Card Type",
          },
          {
            name: "description",
            type: "textarea",
            label: "Card Description / Effect Text",
          },
        ]
      },
      {
        label: 'Battle Simulator',
        fields: [
          // {
          //   name: "damage",
          //   type: "array",
          //   fields: [
          //     {
          //       name: "attackDice",
          //       type: "number",
          //       label: "Attack Dice",
          //       admin: {
          //         description: "How many Dice?",
          //       },
          //     },
          //     {
          //       name: "attackHit",
          //       type: "number",
          //       label: "Hit Value",
          //       admin: {
          //         description: "How much flat damage?",
          //       },
          //     },
          //   ]
          // },
        ]
      },
    ]
  }
]

