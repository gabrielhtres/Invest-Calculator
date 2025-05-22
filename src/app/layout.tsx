import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invest Calculator",
  description: "A simple calculator for investments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>Invest Calculator</header>
        <main className={styles.main}>
          <nav className={styles.nav}>
            <ul>
              <li>Classes de Ativos</li>
              <li>Ativos</li>
            </ul>
          </nav>
          <div>{children}</div>
        </main>
        <footer className={styles.footer}>Desenvolvido por mim mesmo</footer>
      </body>
    </html>
  );
}
