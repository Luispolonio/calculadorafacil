import type { Metadata } from "next";
import CalculatorModule from "@/components/calculator-module";
import { notFound } from "next/navigation";
const titles: Record<string, string> = {
  porcentaje: "Porcentajes",
  promedio: "Promedio",
  "regla-de-tres": "Regla de tres",
  "calculadora-notas": "Notas",
  prestamo: "Préstamos",
  "interes-compuesto": "Interés compuesto",
  edad: "Edad",
  "diferencia-fechas": "Diferencia entre fechas",
  descuento: "Descuentos",
  convertir: "Conversor de unidades",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = titles[slug] || "Calculadora";
  return {
    title: `Calculadora de ${name} Online Gratis | CalculadoraFácil`,
    description: `Usa nuestra calculadora de ${name.toLowerCase()} gratis, con resultado inmediato, fórmula y ejemplo práctico.`,
    alternates: { canonical: `/${slug}` },
  };
}
export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!titles[slug]) notFound();
  return <CalculatorModule slug={slug} />;
}
