import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Illustrated Data Structure",
  description: "Interactive visualisations for data structures and algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50`}>
        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shrink-0">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
            <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
              Illustrated Data Structure
            </Link>
          </div>
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <Link 
                  href="/percolation" 
                  className="block px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
                >
                  Percolation
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full p-8 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
