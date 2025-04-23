// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Seasons } from './collections/rangers/Seasons'
import { UniqueCombatCards } from './collections/rangers/UniqueCombatCards'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'

// Rangers
import { ArsenalCards } from './collections/rangers/ArsenalCards'
import { Megazords } from './collections/rangers/Megazords'
import { RangerCards } from './collections/rangers/RangerCards'
import { Rangers } from './collections/rangers/Rangers'
import { Teams } from './collections/rangers/Teams'
import { Zords } from './collections/rangers/Zords'

// Enemies
import { Enemies } from './collections/enemy/Enemies'
import { Locations } from './collections/enemy/Locations'
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
    RangerCards,
    Zords,
    Megazords,
    ArsenalCards,
    UniqueCombatCards,


    // Enemies
    Enemies,
    Locations,

    // Other
    Expansions,
    Teams,
    Seasons,
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
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        region: 'auto',
      },
    }),
  ],
  email: resendAdapter({
    defaultFromAddress: 'heroesgrid@castellon.dev',
    defaultFromName: 'Heroes Grid - Payload CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),

})
