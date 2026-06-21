import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CursorGlobal from "@/components/CursorGlobal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Colmeia — Open Vodka · Energético Liberado",
  description: "Uma experiência única de música eletrônica. Open Vodka + Energético liberado. Dia 20, 13h às 18h. Ingresso: R$ 50.",
  openGraph: {
    title: "Colmeia — Open Vodka · Energético Liberado",
    description: "Uma experiência única de música eletrônica. Open Vodka + Energético liberado. Dia 20, 13h às 18h. Ingresso: R$ 50.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bebas.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
        <CursorGlobal />
        {children}
      </body>
    </html>
  );
}
