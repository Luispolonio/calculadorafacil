import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalContent from "@/components/legal-content";
const titles: Record<string, string> = {
  "sobre-nosotros": "Sobre nosotros",
  contacto: "Contacto",
  privacidad: "Política de privacidad",
  cookies: "Política de cookies",
  terminos: "Términos y condiciones",
  "aviso-legal": "Aviso legal",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(titles).map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  if (!titles[page]) return {};
  return {
    title: `${titles[page]} | CalculadoraFácil`,
    description: `Consulta ${titles[page].toLowerCase()} de CalculadoraFácil.`,
    alternates: { canonical: `/legal/${page}` },
  };
}
export default async function LegalPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  if (!titles[page]) notFound();
  return <LegalContent page={page} />;
}
