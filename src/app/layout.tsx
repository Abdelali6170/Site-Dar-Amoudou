import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"; // Importation du Footer

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant" 
});

export const metadata: Metadata = {
  title: "Dar Amoudou | Maison d'Hôte d'Exception",
  description: "Découvrez l'authenticité et le luxe au cœur de l'Atlas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans bg-dar-sand text-dar-dark antialiased`}>
        <Navbar />
        
        {/* Les pages s'injectent ici */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Le Footer s'affichera en bas de chaque page */}
        <Footer />
      </body>
    </html>
  );
}