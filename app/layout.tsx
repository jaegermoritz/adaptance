import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Adaptance | From uncertainty to action",
    template: "%s | Adaptance",
  },
  description:
    "Adaptance is building a focused consulting team that helps leaders turn AI and digital ambition into clearer priorities, better workflows and practical implementation.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
