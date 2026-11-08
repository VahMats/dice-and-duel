/**
 * Supported locales. To add English later:
 *   1. add "en" to `locales`, `intlLocales` and `localeLabels`,
 *   2. create `src/i18n/en.ts` typed as `Dictionary`,
 *   3. register it in `src/i18n/index.ts`,
 *   4. add `en` to the `Localized` type in `src/content/types.ts`
 *      (TypeScript will then point at every content entry that needs a translation).
 */
export const locales = ["ru", "hy"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** BCP 47 tags used for Intl date formatting. */
export const intlLocales: Record<Locale, string> = {
  ru: "ru-RU",
  hy: "hy-AM",
};

/** Labels for the language switcher, written in their own language. */
export const localeLabels: Record<Locale, { short: string; full: string }> = {
  ru: { short: "РУС", full: "Русский" },
  hy: { short: "ՀԱՅ", full: "Հայերեն" },
};

export const TIME_ZONE = "Asia/Yerevan";
/** Yerevan has been UTC+4 all year since 2012 (no DST). */
export const TIME_ZONE_OFFSET = "+04:00";
