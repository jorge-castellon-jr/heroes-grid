import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    // Add @libsql/client here
    serverExternalPackages: ["@libsql/client", "libsql"],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
