import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calculadorafacil.dev"),
  title: "CalculadoraFácil | Calculadoras online gratis",
  description:
    "Calculadoras gratuitas en español para porcentajes, finanzas, estudios, fechas, conversiones y cálculos cotidianos.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "CalculadoraFácil",
    title: "CalculadoraFácil | Calculadoras online gratis",
    description:
      "Calculadoras gratuitas para porcentajes, finanzas, estudios, fechas y conversiones.",
    images: [
      {
        url: "/calculadora-facil-logo.png",
        width: 2172,
        height: 724,
        alt: "CalculadoraFácil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalculadoraFácil | Calculadoras online gratis",
    description:
      "Calculadoras gratuitas para porcentajes, finanzas, estudios, fechas y conversiones.",
    images: ["/calculadora-facil-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
