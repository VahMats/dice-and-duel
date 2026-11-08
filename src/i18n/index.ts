import type { Locale } from "./config";
import { hy } from "./hy";
import { ru, type Dictionary } from "./ru";

const dictionaries: Record<Locale, Dictionary> = { ru, hy };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replaces `{name}` placeholders: format("Найдено игр: {n}", { n: 3 }). */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type { Dictionary };
export * from "./config";
