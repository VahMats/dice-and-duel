import { cacheLife } from "next/cache";
import type { GameEvent } from "@/content/types";
import { intlLocales, TIME_ZONE, TIME_ZONE_OFFSET, type Locale } from "@/i18n/config";

/**
 * Today's date in Yerevan as "YYYY-MM-DD".
 * Cached for about an hour, so events move from "upcoming" to "past"
 * shortly after midnight without a redeploy.
 */
export async function getTodayInYerevan(): Promise<string> {
  "use cache";
  cacheLife("hours");
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function eventStart(event: GameEvent): Date {
  return new Date(`${event.date}T${event.time}:00${TIME_ZONE_OFFSET}`);
}

export type EventDateParts = {
  day: string;
  month: string;
  weekday: string;
  /** e.g. "вторник, 10 ноября 2026 г." */
  full: string;
  time: string;
  iso: string;
};

export function formatEventDate(event: GameEvent, locale: Locale): EventDateParts {
  const date = eventStart(event);
  const tag = intlLocales[locale];
  const fmt = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(tag, { timeZone: TIME_ZONE, ...options }).format(date);

  return {
    day: fmt({ day: "numeric" }),
    month: fmt({ month: "long", day: "numeric" }).replace(/\d+/g, "").replace(/[\s.,]+$/, "").trim(),
    weekday: fmt({ weekday: "long" }),
    full: fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    time: event.time,
    iso: date.toISOString(),
  };
}
