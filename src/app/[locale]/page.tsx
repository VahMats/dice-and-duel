import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Beer, Dices, MapPin, Puzzle, Swords, Trophy, Users, type LucideIcon } from "lucide-react";
import { InstagramIcon, TelegramIcon } from "@/components/BrandIcons";
import { Button } from "@/components/Button";
import { CopperFrame } from "@/components/CopperFrame";
import { CreatorCard } from "@/components/CreatorCard";
import { EventCard } from "@/components/EventCard";
import { GameCard } from "@/components/GameCard";
import { Section } from "@/components/Section";
import { creators } from "@/content/creators";
import { games } from "@/content/games";
import { site } from "@/content/site";
import type { FeatureIcon } from "@/content/types";
import { getDictionary, isLocale, type Dictionary, type Locale } from "@/i18n";
import { splitEvents, t } from "@/lib/content";
import { getTodayInYerevan } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  dices: Dices,
  swords: Swords,
  users: Users,
  beer: Beer,
  trophy: Trophy,
  puzzle: Puzzle,
};
const featureColors = ["bg-piece-green", "bg-piece-yellow", "bg-piece-blue", "bg-piece-orange"];
const featureIconColors = ["text-walnut-950", "text-walnut-950", "text-cream", "text-walnut-950"];

const PREVIEW_GAMES = 8;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "", description: dict.meta.homeDescription });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <Features locale={locale} dict={dict} />
      <UpcomingEvents locale={locale} dict={dict} />
      <Section
        id="games"
        eyebrow={dict.games.eyebrow}
        title={dict.games.title}
        action={
          <Button href={`/${locale}/games`} variant="secondary" size="lg">
            {dict.games.previewAll}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        }
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {games.slice(0, PREVIEW_GAMES).map((game) => (
            <li key={game.id}>
              <GameCard game={game} locale={locale} labels={dict.games} newTabLabel={dict.common.opensInNewTab} />
            </li>
          ))}
        </ul>
      </Section>
      <Section id="creators" eyebrow={dict.creators.eyebrow} title={dict.creators.title}>
        <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:justify-center">
          {creators.map((creator) => (
            <li key={creator.id}>
              <CreatorCard creator={creator} locale={locale} newTabLabel={dict.common.opensInNewTab} />
            </li>
          ))}
        </ul>
      </Section>
      <Contacts locale={locale} dict={dict} />
    </>
  );
}

function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* warm lamp light behind the badge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgb(192_102_43/0.22),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-10 pb-16 text-center sm:px-6 sm:pt-14 sm:pb-24">
        <div className="relative w-[min(82vw,26rem)]">
          <div className="rounded-full border-[5px] border-copper p-1.5 shadow-[0_20px_60px_rgb(0_0_0/0.55)]">
            <div className="rounded-full border border-copper-light/60 p-1">
              <Image
                src="/logo-round.png"
                alt={dict.hero.logoAlt}
                width={800}
                height={800}
                preload
                sizes="(min-width: 640px) 26rem, 82vw"
                className="aspect-square w-full rounded-full"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 font-brand text-sm font-bold tracking-[0.3em] text-copper-light uppercase">
          {dict.hero.tagline}
        </p>
        <h1 id="hero-title" className="mt-3 max-w-3xl text-4xl leading-tight font-bold sm:text-6xl">
          {dict.hero.slogan}
        </h1>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <Button href="#events" size="lg">
            <Dices size={20} aria-hidden="true" />
            {dict.hero.nextGame}
          </Button>
          <Button
            href={site.socials.telegram}
            variant="secondary"
            size="lg"
            external
            newTabLabel={dict.common.opensInNewTab}
          >
            <TelegramIcon />
            {dict.hero.telegram}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Features({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="what-we-do" eyebrow={dict.features.eyebrow} title={dict.features.title}>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {site.features.map((feature, index) => {
          const Icon = featureIcons[feature.icon];
          return (
            <li key={index}>
              <CopperFrame rounded className="flex h-full flex-col items-center p-6 text-center">
                <span
                  className={`mb-4 inline-flex size-14 items-center justify-center rounded-full border-2 border-cream/70 ${
                    featureColors[index % featureColors.length]
                  } ${featureIconColors[index % featureIconColors.length]}`}
                >
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className="text-2xl leading-tight font-bold">{t(feature.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed">{t(feature.text, locale)}</p>
              </CopperFrame>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

async function UpcomingEvents({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { upcoming } = splitEvents(await getTodayInYerevan());
  const next = upcoming.slice(0, 3);

  return (
    <Section
      id="events"
      eyebrow={dict.events.eyebrow}
      title={dict.events.title}
      action={
        <Button href={`/${locale}/events`} variant="secondary" size="lg">
          {dict.events.all}
          <ArrowRight size={18} aria-hidden="true" />
        </Button>
      }
    >
      {next.length > 0 ? (
        <ul className="mx-auto grid max-w-4xl gap-6">
          {next.map((event) => (
            <li key={event.id}>
              <EventCard event={event} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      ) : (
        <CopperFrame className="mx-auto max-w-2xl p-8 text-center">{dict.events.empty}</CopperFrame>
      )}
    </Section>
  );
}

function Contacts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const cards = [
    {
      key: "telegram",
      icon: <TelegramIcon size={28} />,
      title: dict.contacts.telegram,
      text: dict.contacts.telegramText,
      href: site.socials.telegram,
      cta: site.socials.telegramHandle,
    },
    {
      key: "instagram",
      icon: <InstagramIcon size={28} />,
      title: dict.contacts.instagram,
      text: dict.contacts.instagramText,
      href: site.socials.instagram,
      cta: site.socials.instagramHandle,
    },
    {
      key: "venue",
      icon: <MapPin size={28} aria-hidden="true" />,
      title: dict.contacts.venue,
      text: `${t(site.venue.name, locale)} — ${t(site.venue.address, locale)}`,
      href: site.venue.mapUrl,
      cta: dict.contacts.map,
    },
  ];

  return (
    <Section id="contacts" eyebrow={dict.contacts.eyebrow} title={dict.contacts.title}>
      <ul className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <li key={card.key}>
            <CopperFrame corners className="flex h-full flex-col items-center gap-3 p-6 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full border-2 border-copper bg-walnut-800 text-cream">
                {card.icon}
              </span>
              <h3 className="text-2xl font-bold">{card.title}</h3>
              <p className="text-sm leading-relaxed">{card.text}</p>
              <Button
                href={card.href}
                variant="secondary"
                external
                newTabLabel={dict.common.opensInNewTab}
                className="mt-auto"
              >
                {card.cta}
              </Button>
            </CopperFrame>
          </li>
        ))}
      </ul>
    </Section>
  );
}
