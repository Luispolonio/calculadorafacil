"use client";
import { useEffect, useRef } from "react";

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
  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense todavía no está disponible; se reintenta en la siguiente visita. */
    }
  }, []);
  return (
    <aside
      className={`ad-unit ad-unit--${variant}`}
      aria-label={label}
      data-ad-placement={variant}
    >
      <span className="ad-unit-label">{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={AD_SLOTS[variant]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
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
