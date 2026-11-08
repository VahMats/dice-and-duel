import Image from "next/image";
import { Cake, Clock, Dices, ExternalLink, Users } from "lucide-react";
import type { Game } from "@/content/types";
import type { Dictionary, Locale } from "@/i18n";
import { bggLink, formatPlayers, formatPlayTime } from "@/lib/content";
import { TypeBadge, typeStyles } from "./Tags";

type GameCardProps = {
  game: Game;
  locale: Locale;
  labels: Dictionary["games"];
  newTabLabel: string;
  highlighted?: boolean;
};

/** Looks like a game card: coloured type stripe, art window, stats band. Safe to use in client components. */
export function GameCard({ game, locale, labels, newTabLabel, highlighted = false }: GameCardProps) {
  const subtitle = locale === "ru" && game.nameRu && game.nameRu !== game.name ? game.nameRu : undefined;

  const stats = [
    { icon: Users, label: labels.playersLabel, value: formatPlayers(game, labels.unknown) },
    { icon: Clock, label: labels.timeLabel, value: formatPlayTime(game, labels.unknown, labels.minutes) },
    { icon: Cake, label: labels.ageLabel, value: game.age ? `${game.age}+` : labels.unknown },
  ];

  return (
    <article
      id={game.id}
      aria-labelledby={`game-${game.id}-title`}
      className={`copper-frame flex h-full scroll-mt-28 flex-col overflow-hidden rounded-xl transition-shadow target:shadow-[0_0_0_4px_var(--color-copper-light)] ${
        highlighted ? "shadow-[0_0_0_4px_var(--color-copper-light)]" : ""
      }`}
    >
      {/* Type stripe */}
      <div className="flex h-2 shrink-0" aria-hidden="true">
        {game.types.length > 0 ? (
          game.types.map((type) => <span key={type} className={`flex-1 ${typeStyles[type].stripe}`} />)
        ) : (
          <span className="flex-1 bg-copper" />
        )}
      </div>

      {/* Art window */}
      <div className="relative mx-3 mt-3 aspect-video overflow-hidden sm:aspect-4/3 rounded-md border border-copper/70">
        {game.image ? (
          <Image
            src={game.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="parchment-surface flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <Dices size={40} strokeWidth={1.5} aria-hidden="true" />
            <span className="font-brand text-lg leading-tight font-bold">{game.name}</span>
            <span className="text-xs">{labels.noImage}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {game.types.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label={labels.types}>
            {game.types.map((type) => (
              <li key={type}>
                <TypeBadge type={type} label={labels.typeNames[type]} />
              </li>
            ))}
          </ul>
        ) : null}

        <div>
          <h3 id={`game-${game.id}-title`} className="text-2xl leading-tight font-bold">
            {game.name}
          </h3>
          {subtitle ? <p className="text-sm text-parchment-muted">{subtitle}</p> : null}
        </div>

        <p className="text-sm leading-relaxed">{game.description[locale]}</p>

        <dl className="mt-auto grid grid-cols-3 divide-x divide-copper/50 rounded-md border border-copper/50 bg-walnut-950/60 text-center">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-1 py-2">
              <dt className="flex items-center gap-1 text-[0.7rem] text-copper-light">
                <Icon size={14} aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">{label}</span>
              </dt>
              <dd className="text-sm font-semibold text-cream">{value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={bggLink(game)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 self-start text-sm text-copper-light underline decoration-copper/60 underline-offset-4 hover:text-cream"
        >
          {labels.bgg}
          <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only">
            {game.name} {newTabLabel}
          </span>
        </a>
      </div>
    </article>
  );
}
