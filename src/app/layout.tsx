import type { Metadata } from "next";
import "./global.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata : Metadata = {
  title: "Xuan Tiep Website",
  icons: {
    icon: [
      { url: "/dashboardWhite.png", media: "(prefers-color-scheme: dark)" },
      { url: "/dashboardBlack.png", media: "(prefers-color-scheme: light)" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
