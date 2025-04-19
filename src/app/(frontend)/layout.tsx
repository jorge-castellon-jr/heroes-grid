import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Heroes Grid - Companion app to Power Rangers: Heroes of the Grid',
  title: 'Heroes Grid',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
