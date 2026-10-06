import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { catalog } from "@/lib/catalog";
const calculatorRoutes = [...catalog.map((tool) => tool.slug), "practica", "programacion"];

const legalRoutes = [
  "sobre-nosotros",
  "contacto",
  "privacidad",
  "cookies",
  "terminos",
  "aviso-legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calculadorafacil.dev";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacidad/edgexi`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...calculatorRoutes.map((route) => ({
      url: `${baseUrl}/${route}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...legalRoutes.map((route) => ({
      url: `${baseUrl}/legal/${route}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
