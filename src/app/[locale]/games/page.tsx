import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GamesExplorer } from "@/components/GamesExplorer";
import { Section } from "@/components/Section";
import { games } from "@/content/games";
import { getDictionary, isLocale } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/games">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/games",
    title: dict.meta.gamesTitle,
    description: dict.meta.gamesDescription,
  });
}

export default async function GamesPage({ params }: PageProps<"/[locale]/games">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <Section id="collection" eyebrow={dict.games.eyebrow} title={dict.meta.gamesTitle} titleAs="h1">
      <GamesExplorer games={games} locale={locale} labels={dict.games} newTabLabel={dict.common.opensInNewTab} />
    </Section>
  );
}
