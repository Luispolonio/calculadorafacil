"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";

const ADSENSE_CLIENT = "ca-pub-3071749149722632";
const AD_SLOTS = {
  horizontal: "2091848770",
  vertical: "9641542443",
} as const;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdVariant = keyof typeof AD_SLOTS;

function AdUnit({
  variant,
  label,
}: {
  variant: AdVariant;
  label: string;
}) {
  const pushed = useRef(false);
  const ad = useRef<HTMLModElement>(null);
  useEffect(() => {
    const element = ad.current;
    if (!element || pushed.current) return;

    const initialize = () => {
      if (pushed.current || element.hasAttribute("data-adsbygoogle-status")) return;
      // Responsive units need a measurable width, including after a hidden
      // sidebar becomes visible. Never refresh a unit on subsequent resizes.
      if (element.getBoundingClientRect().width <= 0) return;
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("No se pudo inicializar el anuncio de AdSense:", error);
      }
    };
    const observer = new ResizeObserver(initialize);
    observer.observe(element);
    initialize();
    return () => observer.disconnect();
  }, []);
  return (
    <>
      {/* Next.js deduplicates this URL across units and client navigations. */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <aside
        className={`ad-unit ad-unit--${variant}`}
        aria-label={label}
        data-ad-placement={variant}
      >
        <span className="ad-unit-label">{label}</span>
        <ins
          ref={ad}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={AD_SLOTS[variant]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    </>
  );
}

/** Unidad horizontal (banner ancho) — slot 2091848770. */
export function AdHorizontal({ label = "Publicidad" }: { label?: string }) {
  return <AdUnit variant="horizontal" label={label} />;
}

/** Unidad vertical (columna/lateral) — slot 9641542443. */
export function AdVertical({ label = "Publicidad" }: { label?: string }) {
  return <AdUnit variant="vertical" label={label} />;
}
