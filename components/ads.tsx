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

// Share one native script and wait for it before exposing units to AdSense.
// next/script adds data-nscript, which AdSense reports as unsupported.
let adsenseScript: Promise<void> | undefined;
function loadAdSense() {
  if (!adsenseScript) {
    adsenseScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
      script.crossOrigin = "anonymous";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("No se pudo cargar el script de AdSense"));
      document.head.appendChild(script);
    });
  }
  return adsenseScript;
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

    let active = true;
    let loaded = false;
    const initialize = () => {
      if (!active || !loaded) return;
      if (pushed.current || element.hasAttribute("data-adsbygoogle-status")) return;
      // Responsive units need a measurable width, including after a hidden
      // sidebar becomes visible. Never refresh a unit on subsequent resizes.
      if (element.getBoundingClientRect().width <= 0) return;
      // push({}) fills the first eligible unit, not necessarily this ref.
      // Keep hidden/waiting units out of that selection until they are ready.
      element.classList.add("adsbygoogle");
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error("No se pudo inicializar el anuncio de AdSense:", error);
      }
    };
    const observer = new ResizeObserver(initialize);
    observer.observe(element);
    void loadAdSense().then(() => {
      loaded = true;
      initialize();
    }).catch((error: unknown) => {
      if (active) console.error(error);
    });
    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);
  return (
      <aside
        className={`ad-unit ad-unit--${variant}`}
        aria-label={label}
        data-ad-placement={variant}
      >
        <span className="ad-unit-label">{label}</span>
        <ins
          ref={ad}
          className="ad-unit-slot"
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
