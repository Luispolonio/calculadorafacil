"use client";
import { useLanguage } from "@/components/language-provider";
type AdFormat = "leaderboard" | "rectangle" | "responsive";
export default function AdSlot({
  placement,
  format = "responsive",
}: {
  placement: string;
  format?: AdFormat;
}) {
  const { language } = useLanguage(),
    en = language === "en";
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
  if (!enabled) return null;
  return (
    <aside
      className={`ad-slot ad-${format}`}
      aria-label={en ? "Advertisement space" : "Espacio publicitario"}
      data-ad-placement={placement}
    >
      <span>{en ? "Advertisement" : "Publicidad"}</span>
      <div>
        <strong>
          {en ? "Ad space reserved" : "Espacio reservado para anuncios"}
        </strong>
        <small>
          {en
            ? "Google AdSense will use this area after activation."
            : "Google AdSense utilizará esta área después de la activación."}
        </small>
      </div>
    </aside>
  );
}
