"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  className?: string;
};

/** Swaps the first path segment, keeping the rest of the URL. */
export function LanguageSwitcher({ current, label, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex overflow-hidden rounded-md border-2 border-copper">
        {locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale} className="not-first:border-l-2 not-first:border-copper">
              <Link
                href={`/${locale}${rest ? `/${rest}` : ""}`}
                hrefLang={locale}
                lang={locale}
                aria-current={active ? "page" : undefined}
                title={localeLabels[locale].full}
                className={`flex min-h-10 min-w-12 items-center justify-center px-2.5 text-sm font-semibold transition-colors ${
                  active ? "bg-rust text-cream" : "bg-walnut-950 text-parchment hover:bg-walnut-800 hover:text-cream"
                }`}
              >
                <span aria-hidden="true">{localeLabels[locale].short}</span>
                <span className="sr-only">{localeLabels[locale].full}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
