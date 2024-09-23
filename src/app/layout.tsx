import type { Metadata } from "next";
import "../styles/globals.css";

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
      <body className="">{children}</body>
    </html>
  );
}
