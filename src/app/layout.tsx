import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Store from "./context/Store";
import PrefetchProvider from "./context/PrefetchProvider";
import { CapturedPokemonProvider } from "./context/CapuredPokemonContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Store>
          <PrefetchProvider>
            <CapturedPokemonProvider>
              <NavBar />
              {children}
            </CapturedPokemonProvider>
          </PrefetchProvider>
        </Store>
      </body>
    </html>
  );
}
