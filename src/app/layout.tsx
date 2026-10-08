import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunset Jams Vol. 1 — The Homecoming",
  description:
    "Sunset Jams Vol. 1: The Homecoming — Jam Grove Entertainment's all-new open-air experience. Sunday, 6 December 2026, 1:00 PM till late, Accra. RSVP free.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
