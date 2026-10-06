import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, BookOpen } from "lucide-react";
import { catalog, bySlug, categories } from "@/lib/catalog";
import { Header, Footer } from "@/components/site-chrome";
import MathWorkspace from "@/components/math-workspace";
import { practiceProse } from "@/lib/math-notation";
import { MathText } from "@/components/math-formula";
export const dynamicParams = false;
export function generateStaticParams() {
  return catalog.map((t) => ({ slug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = bySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.title}: calculadora y explicación | CalculadoraFácil`,
    description: tool.description,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: `${tool.title} | CalculadoraFácil`,
      description: tool.description,
      url: `/${slug}`,
    },
  };
}
export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = bySlug(slug);
  if (!tool) notFound();
  return (
    <>
      <Header />
      <main id="contenido" className="calculator-layout section-container">
        <aside className="tool-sidebar">
          <Link href="/#herramientas" className="back-link">
            <ArrowLeft size={16} /> Todas las herramientas
          </Link>
          <nav aria-label="Herramientas por tema">
            {categories
              .filter((c) => c !== "Todas")
              .map((c) => (
                <div key={c}>
                  <h2>{c}</h2>
                  {catalog
                    .filter((t) => t.category === c)
                    .map((t) => (
                      <Link
                        key={t.slug}
                        href={`/${t.slug}`}
                        aria-current={t.slug === slug ? "page" : undefined}
                        className={t.slug === slug ? "current" : ""}
                      >
                        <span aria-hidden="true">{t.symbol}</span>
                        {t.title}
                      </Link>
                    ))}
                </div>
              ))}
          </nav>
        </aside>
        <div className="calculator-main">
          <div className="tool-breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <Link href="/#herramientas">{tool.category}</Link>
            <span>/</span>
            <span>{tool.title}</span>
          </div>
          <div className="tool-page-heading">
            <span className="mono-eyebrow">
              {tool.category.toUpperCase()} / HERRAMIENTA INTERACTIVA
            </span>
            <h1>{tool.title}</h1>
            <p><MathText text={practiceProse(tool.description)}/></p>
          </div>
          <MathWorkspace key={slug} tool={tool} />
          <article className="tool-guide" id="guia">
            <div className="guide-heading">
              <BookOpen size={22} />
              <div>
                <span className="mono-eyebrow">
                  ENTENDER ANTES DE MEMORIZAR
                </span>
                <h2>La idea detrás del cálculo.</h2>
              </div>
            </div>
            <section>
              <h3>Cómo funciona</h3>
              <p><MathText text={tool.theory}/></p>
            </section>
            <section className="worked-example">
              <span className="mono-eyebrow">UN EJEMPLO RESUELTO</span>
              <p><MathText text={tool.example}/></p>
            </section>
            <section>
              <h3>Qué debes tener en cuenta</h3>
              <p><MathText text={tool.caution}/></p>
            </section>
            <p className="guide-reference">
              Para profundizar:{" "}
              <a
                href={
                  tool.category === "Cálculo"
                    ? "https://openstax.org/details/books/calculus-volume-1"
                    : tool.category === "Estadística"
                      ? "https://openstax.org/details/books/introductory-statistics-2e"
                      : "https://openstax.org/details/books/precalculus-2e"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Texto educativo abierto de OpenStax ↗
              </a>
              . Las explicaciones y ejemplos de esta página están redactados
              para CalculadoraFácil.
            </p>
          </article>
          <div className="tool-practice-cta">
            <div>
              <span className="mono-eyebrow">AHORA, SIN AYUDA</span>
              <h2>¿Lo tienes claro? Ponlo a prueba.</h2>
              <p>
                Resuelve ejercicios nuevos de este tema y comprueba lo
                aprendido.
              </p>
            </div>
            <Link href={`/practica?tema=${slug}`} className="button primary">
              Practicar <ArrowUpRight size={18} />
            </Link>
          </div>
          <section className="related-tools">
            <span className="mono-eyebrow">SIGUE EXPLORANDO</span>
            <div>
              {catalog
                .filter((t) => t.category === tool.category && t.slug !== slug)
                .slice(0, 3)
                .map((t) => (
                  <Link key={t.slug} href={`/${t.slug}`}>
                    <span>{t.symbol}</span>
                    <strong>{t.title}</strong>
                    <ArrowUpRight size={18} />
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
