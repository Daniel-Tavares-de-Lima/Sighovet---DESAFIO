import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sighovet - Requisições",
  description: "Gestão de requisições de exames e procedimentos veterinários",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">
            <div className="app-container">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-[#2f855a] text-white shadow-sm">
      <div className="app-container flex items-center justify-between h-16">
        <span className="font-semibold text-lg">Sighovet</span>
        <nav className="text-sm opacity-90">
          <span>Requisições</span>
        </nav>
      </div>
    </header>
  );
}