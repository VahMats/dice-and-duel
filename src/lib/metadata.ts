import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

/** Canonical + hreflang alternates for a path below the locale, e.g. "/events". */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ...languages, "x-default": `/ru${path}` },
    },
    // Nested `openGraph` replaces the layout's object, so repeat the shared fields here.
    openGraph: {
      type: "website",
      siteName: "Dice and Duel",
      locale: locale === "ru" ? "ru_RU" : "hy_AM",
      ...(title ? { title } : {}),
      description,
      url: `/${locale}${path}`,
    },
  };
}
