import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CopperFrame } from "@/components/CopperFrame";
import { CreatorCard } from "@/components/CreatorCard";
import { Section } from "@/components/Section";
import { creators } from "@/content/creators";
import { site } from "@/content/site";
import { getDictionary, isLocale } from "@/i18n";
import { t } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: dict.meta.aboutTitle,
    description: dict.meta.aboutDescription,
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Section id="story" eyebrow={dict.about.eyebrow} title={dict.about.title} titleAs="h1">
        <CopperFrame corners className="mx-auto grid max-w-4xl items-center gap-8 p-6 sm:p-10 md:grid-cols-[12rem_1fr]">
          <Image
            src="/logo.png"
            alt=""
            width={299}
            height={273}
            className="mx-auto h-auto w-40 md:w-full"
          />
          <div className="space-y-4 text-lg leading-relaxed">
            {site.story.map((paragraph, index) => (
              <p key={index}>{t(paragraph, locale)}</p>
            ))}
          </div>
        </CopperFrame>
      </Section>

      <Section id="creators" eyebrow={dict.creators.eyebrow} title={dict.creators.title} className="pt-0 sm:pt-0">
        <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <li key={creator.id}>
              <CreatorCard creator={creator} locale={locale} newTabLabel={dict.common.opensInNewTab} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
