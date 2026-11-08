import Image from "next/image";
import { Clock, MapPin, Ticket } from "lucide-react";
import type { GameEvent } from "@/content/types";
import { site } from "@/content/site";
import type { Dictionary, Locale } from "@/i18n";
import { formatEventDate } from "@/lib/dates";
import { gamesForEvent, t } from "@/lib/content";
import { InstagramIcon, TelegramIcon } from "./BrandIcons";
import { Button } from "./Button";
import { CopperFrame } from "./CopperFrame";
import { GameTag } from "./Tags";

type EventCardProps = {
  event: GameEvent;
  locale: Locale;
  dict: Dictionary;
  past?: boolean;
  headingLevel?: "h3" | "h2";
};

export function EventCard({ event, locale, dict, past = false, headingLevel = "h3" }: EventCardProps) {
  const date = formatEventDate(event, locale);
  const eventGames = gamesForEvent(event);
  const Heading = headingLevel;
  const titleId = `event-${event.id}-title`;

  return (
    <CopperFrame
      as="article"
      corners={!past}
      labelledBy={titleId}
      className={`flex h-full flex-col overflow-hidden sm:flex-row ${past ? "opacity-85" : ""}`}
    >
        {/* Ticket stub with the date */}
        <div
          className={`relative flex shrink-0 items-center justify-center gap-4 border-b-2 border-dashed border-copper/70 px-5 py-4 sm:w-36 sm:flex-col sm:gap-1 sm:border-r-2 sm:border-b-0 sm:py-6 ${
            past ? "bg-walnut-900" : "bg-walnut-800"
          }`}
        >
          <time dateTime={date.iso} className="flex items-center gap-4 sm:flex-col sm:gap-1 sm:text-center">
            <span className="font-heading text-5xl leading-none font-bold text-cream sm:text-6xl">{date.day}</span>
            <span className="flex flex-col">
              <span className="font-heading text-xl font-semibold text-cream">{date.month}</span>
              <span className="text-xs font-semibold tracking-[0.15em] text-copper-light uppercase">
                {date.weekday}
              </span>
            </span>
          </time>
          {past ? (
            <span className="absolute top-2 right-2 rounded-sm border border-parchment-muted/60 px-1.5 py-0.5 text-[0.7rem] text-parchment-muted sm:static sm:mt-2">
              {dict.events.pastBadge}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <Heading id={titleId} className="text-2xl leading-tight font-bold">
              {t(event.title, locale)}
            </Heading>
            {event.posterImage ? (
              <a
                href={event.posterImage}
                target="_blank"
                rel="noopener noreferrer"
                className="block shrink-0 overflow-hidden rounded-sm border-2 border-copper"
              >
                <Image src={event.posterImage} alt={dict.events.poster} width={64} height={80} className="h-20 w-16 object-cover" />
                <span className="sr-only">{dict.common.opensInNewTab}</span>
              </a>
            ) : null}
          </div>

          <dl className="grid gap-2 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <dt>
                <Clock size={16} aria-hidden="true" className="text-copper-light" />
                <span className="sr-only">{dict.events.time}</span>
              </dt>
              <dd className="font-semibold text-cream">{date.time}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt>
                <MapPin size={16} aria-hidden="true" className="text-copper-light" />
                <span className="sr-only">{dict.events.venue}</span>
              </dt>
              <dd>{t(event.venue, locale)}</dd>
            </div>
            {event.entry ? (
              <div className="flex items-center gap-2">
                <dt>
                  <Ticket size={16} aria-hidden="true" className="text-copper-light" />
                  <span className="sr-only">{dict.events.entry}</span>
                </dt>
                <dd>{t(event.entry, locale)}</dd>
              </div>
            ) : null}
          </dl>

          {eventGames.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-copper-light uppercase">
                {dict.events.games}
              </p>
              <ul className="flex flex-wrap gap-2">
                {eventGames.map((game) => (
                  <li key={game.id}>
                    <GameTag
                      href={`/${locale}/games#${game.id}`}
                      name={locale === "ru" && game.nameRu ? game.nameRu : game.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {!past ? (
            <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:flex-wrap">
              <Button href={site.socials.telegram} external newTabLabel={dict.common.opensInNewTab}>
                <TelegramIcon size={18} />
                {dict.events.joinTelegram}
              </Button>
              <Button
                href={site.socials.instagram}
                variant="secondary"
                external
                newTabLabel={dict.common.opensInNewTab}
              >
                <InstagramIcon size={18} />
                {dict.events.joinInstagram}
              </Button>
            </div>
          ) : null}
        </div>
    </CopperFrame>
  );
}
