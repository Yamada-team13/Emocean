import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "emotion mapper",
  description: "This is a app for hackathon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
