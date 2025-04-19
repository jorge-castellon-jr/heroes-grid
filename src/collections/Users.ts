import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: ({ req: { user } }) => {
      if (!user) return false
      return user.type === 'super'
    },
    read: ({ req: { user } }) => {
      if (!user) return false
      return user.type === 'super'
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return user.type === 'super'
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.type === 'super'
    },
    admin: ({ req: { user } }) => {
      if (!user) return false
      return user.type === 'super'
    },
    unlock: ({ req: { user } }) => {
      if (!user) return false
      return user.type === 'super'
    },
  },
  auth: true,
  fields: [
    {
      name: "type",
      type: "select",
      label: "User Type",
      required: true,
      options: [
        { label: 'Super Admin', value: 'super' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    }
  ]
}
