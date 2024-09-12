import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "AoM God Chooser",
  description: "Choose the best AoM god for you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        {/* Primary Meta Tags */}
        <title>AoM: Retold Hero Picker | Choose Your God and Hero</title>
        <meta
          name="title"
          content="AoM: Retold Hero Picker | Choose Your God and Hero"
        />
        <meta
          name="description"
          content="Discover which god or hero best suits your playstyle in AoM: Retold! Use this interactive picker to find your perfect match."
        />
        <meta
          name="keywords"
          content="AoM, AoM Retold, hero picker, god picker, strategy game, mythology game, god heroes, AoM Retold"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Dennis Rauscher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook / Discord */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://aomr-hero-picker.com/" />
        <meta
          property="og:title"
          content="AoM: Retold Hero Picker | Choose Your God and Hero"
        />
        <meta
          property="og:description"
          content="Find out which AoM: Retold god or hero fits your strategy best with this fun and interactive picker tool!"
        />
        <meta
          property="og:image"
          content="http://aomr-hero-picker.com/preview.png"
        />
        <meta property="og:site_name" content="AoM: Retold Hero Picker" />

        {/* Twitter Card Metadata */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://aomr-hero-picker.com/" />
        <meta
          property="twitter:title"
          content="AoM: Retold Hero Picker | Choose Your God and Hero"
        />
        <meta
          property="twitter:description"
          content="Discover the best god or hero for your playstyle in AoM: Retold! Try the interactive hero picker now."
        />
        <meta
          property="twitter:image"
          content="http://aomr-hero-picker.com/preview.png"
        />
      </head>
      <body className={cinzel.className}>
        <Suspense>{children}</Suspense>
        <Analytics/>
      </body>
    </html>
  );
}
