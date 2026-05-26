import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vensters Veluws Verleden – Ontdek de Veluwe!",
  description:
    "Speel, leer en ontdek het verhaal van de Veluwe. Acht schoolplaten vol avonturen voor jonge ontdekkers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
