import type { Metadata } from "next";
import localFont from "next/font/local";
import "katex/dist/katex.min.css";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import Script from "next/script";


const display = localFont({
  src: "../public/fonts/fraunces.ttf",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: "../public/fonts/manrope.ttf",
  weight: "200 800",
  variable: "--font-sans",
  display: "swap",
});
const mono = localFont({
  src: "../public/fonts/modenine.ttf",
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://calculadorafacil.dev"),
  other: { "google-adsense-account": "ca-pub-3071749149722632" },
  title: "CalculadoraFácil | Laboratorio de matemáticas",
  description:
    "Resuelve y comprende álgebra, ecuaciones, derivadas, integrales, geometría y estadística. 26 herramientas gratuitas y ejercicios aleatorios con explicaciones.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CalculadoraFácil",
    title: "Las matemáticas tienen sentido | CalculadoraFácil",
    description:
      "Un laboratorio para resolver problemas, entender el proceso y practicar matemáticas.",
  },
  twitter: {
    card: "summary",
    title: "CalculadoraFácil | Laboratorio de matemáticas",
    description:
      "Resuelve, comprende y practica. Álgebra, cálculo, geometría y estadística.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <LanguageProvider>{children}</LanguageProvider>
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3071749149722632"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
      </body>
    </html>
  );
}
