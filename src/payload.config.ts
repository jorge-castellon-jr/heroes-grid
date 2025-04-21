// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'

// Rangers
import { Rangers } from './collections/rangers/Rangers'
import { Teams } from './collections/rangers/Teams'
import { RangerCards } from './collections/rangers/RangerCards'
import { Zords } from './collections/rangers/Zords'
import { Megazords } from './collections/rangers/Megazords'
import { Seasons } from './collections/rangers/Seasons'

// Enemies
import { Enemies } from './collections/enemy/Enemies'
import { Expansions } from './collections/Expansions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Rangers
    Rangers,
    Teams,
    RangerCards,
    Zords,
    Megazords,
    Seasons,

    // Enemies
    Enemies,

    // Other
    Expansions,
    Tags,
    Media,
    Users
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_TOKEN
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  email: resendAdapter({
    defaultFromAddress: 'heroesgrid@castellon.dev',
    defaultFromName: 'Heroes Grid - Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

})
