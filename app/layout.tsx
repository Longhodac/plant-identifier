import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plant Identifier - AI-Powered Plant Recognition",
  description:
    "Upload a photo of any plant and discover its name, care instructions, and interesting facts using advanced AI technology.",
  keywords:
    "plant identifier, plant recognition, AI, botany, gardening, plant care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
