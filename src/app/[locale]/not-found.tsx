import { locale as getLocale } from "next/root-params";
import { Button } from "@/components/Button";
import { CopperFrame } from "@/components/CopperFrame";
import { defaultLocale, getDictionary, isLocale } from "@/i18n";

export default async function NotFound() {
  const param = await getLocale();
  const locale = param && isLocale(param) ? param : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <CopperFrame corners className="p-10 text-center">
        <p className="font-brand text-6xl font-bold text-copper-light">404</p>
        <h1 className="mt-4 text-3xl font-bold">{dict.notFound.title}</h1>
        <p className="mt-3">{dict.notFound.text}</p>
        <Button href={`/${locale}`} className="mt-8">
          {dict.notFound.back}
        </Button>
      </CopperFrame>
    </div>
  );
}
