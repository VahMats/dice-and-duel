import { Cinzel, Cormorant_SC, Noto_Sans, Noto_Sans_Armenian, Noto_Serif_Armenian } from "next/font/google";

/** Latin only — use for the "Dice and Duel" wordmark, never for Russian/Armenian text. */
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cinzel",
  display: "swap",
});

/** Russian (and Latin) headings. */
export const cormorant = Cormorant_SC({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Armenian headings. */
export const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-armenian",
  display: "swap",
});

/** Body text: Latin + Cyrillic. */
export const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

/** Body text: Armenian. */
export const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-armenian",
  display: "swap",
});

export const fontVariables = [cinzel, cormorant, notoSerifArmenian, notoSans, notoSansArmenian]
  .map((font) => font.variable)
  .join(" ");
