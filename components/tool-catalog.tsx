"use client";
import { useEffect, useRef, useState } from "react";
import { MathText } from "./math-formula";
import { practiceProse } from "@/lib/math-notation";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { catalog, categories, type Category } from "@/lib/catalog";
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export default function ToolCatalog() {
  const [category, setCategory] = useState<Category>("Todas"),
    [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const results = catalog.filter(
    (t) =>
      (category === "Todas" || t.category === category) &&
      normalize(`${t.title} ${t.description} ${t.category}`).includes(
        normalize(query),
      ),
  );
  return (
    <section className="catalog-section section-container" id="herramientas">
      <div className="section-title">
        <div>
          <span className="mono-eyebrow">01 / TU CAJA DE HERRAMIENTAS</span>
          <h2>
            Un problema. <em>Un camino.</em>
          </h2>
          <p>
            Del primer despeje a tu próxima integral. Elige por dónde empezar.
          </p>
        </div>
        <span className="count-stamp">
          {catalog.length}
          <small>
            HERRAMIENTAS
            <br />
            GRATUITAS
          </small>
        </span>
      </div>
      <div className="catalog-controls">
        <div className="filter-tabs" aria-label="Filtrar por área">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "selected" : ""}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <Search size={17} />
          <span className="sr-only">Buscar herramientas</span>
          <input
            ref={search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca un tema…"
          />
          {query ? (
            <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda">
              <X size={16} />
            </button>
          ) : (
            <kbd>Ctrl K</kbd>
          )}
        </label>
      </div>
      <p className="results-count" aria-live="polite">
        {results.length} {results.length === 1 ? "herramienta" : "herramientas"}{" "}
        {category !== "Todas"
          ? `en ${category.toLowerCase()}`
          : "para explorar"}
      </p>
      <div className="catalog-grid">
        {results.map((t) => (
          <Link className="math-card" key={t.slug} href={`/${t.slug}`}>
            <div className="card-top">
              <span className="math-symbol" aria-hidden="true">
                {t.symbol}
              </span>
              <ArrowUpRight size={20} />
            </div>
            <span className="card-category">{t.category}</span>
            <h3>{t.title}</h3>
            <p><MathText text={practiceProse(t.description)}/></p>
            <span className="card-bottom">
              Abrir herramienta <span>↗</span>
            </span>
          </Link>
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-search">
          <h3>No encontramos ese tema.</h3>
          <p>Prueba con «ecuaciones», «integrales» o «conjuntos».</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory("Todas");
            }}
          >
            Mostrar todas las herramientas
          </button>
        </div>
      )}
    </section>
  );
}
