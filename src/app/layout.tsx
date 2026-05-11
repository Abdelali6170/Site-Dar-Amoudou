// src/app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { draftMode } from 'next/headers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dar Amoudou — Maison d\'hôte de luxe, Atlas marocain',
  description:
    'Une maison d\'hôte d\'exception nichée à 1 400 mètres dans le Haut-Atlas marocain. Suites berbères, gastronomie du terroir, expériences immersives.',
  keywords: 'hôtel luxe Maroc, Atlas marocain, Ouarzazate, riad luxe, séjour haut de gamme',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#FDFBF7] text-[#1A1A1A] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* VisualEditing sera activé après mise à jour de next-sanity */}
        {isDraftMode && (
          <div style={{ display: 'none' }} data-draft-mode="true" />
        )}
      </body>
    </html>
  )
}
