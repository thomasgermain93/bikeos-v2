import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BikeOS — Live MotoGP & WSBK Data",
  description: "Live MotoGP & WSBK results, schedules, standings, and race timing data",
  openGraph: {
    title: "BikeOS",
    description: "Live MotoGP & WSBK results, schedules, standings, and race timing data",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0a] text-zinc-200 antialiased">
        {children}
      </body>
    </html>
  );
}
