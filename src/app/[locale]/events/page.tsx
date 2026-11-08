import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CopperFrame } from "@/components/CopperFrame";
import { EventCard } from "@/components/EventCard";
import { Section } from "@/components/Section";
import { getDictionary, isLocale } from "@/i18n";
import { splitEvents } from "@/lib/content";
import { getTodayInYerevan } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/events">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/events",
    title: dict.meta.eventsTitle,
    description: dict.meta.eventsDescription,
  });
}

export default async function EventsPage({ params }: PageProps<"/[locale]/events">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const { upcoming, past } = splitEvents(await getTodayInYerevan());

  return (
    <>
      <Section id="upcoming" eyebrow={dict.events.eyebrow} title={dict.events.upcoming} titleAs="h1">
        {upcoming.length > 0 ? (
          <ul className="mx-auto grid max-w-4xl gap-6">
            {upcoming.map((event) => (
              <li key={event.id}>
                <EventCard event={event} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        ) : (
          <CopperFrame className="mx-auto max-w-2xl p-8 text-center">{dict.events.empty}</CopperFrame>
        )}
      </Section>

      <Section id="past" title={dict.events.past} className="pt-0 sm:pt-0">
        {past.length > 0 ? (
          <ul className="mx-auto grid max-w-4xl gap-6">
            {past.map((event) => (
              <li key={event.id}>
                <EventCard event={event} locale={locale} dict={dict} past />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-parchment-muted">{dict.events.emptyPast}</p>
        )}
      </Section>
    </>
  );
}
