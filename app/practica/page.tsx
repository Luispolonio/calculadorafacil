import type { Metadata } from "next";
import { Suspense } from "react";
import { Header, Footer } from "@/components/site-chrome";
import PracticeLab from "@/components/practice-lab";
export const metadata: Metadata = {
  title: "Ejercicios aleatorios y test de matemáticas | CalculadoraFácil",
  description:
    "Practica 26 temas de matemáticas con ejercicios aleatorios, tres dificultades, corrección inmediata y explicaciones.",
  alternates: { canonical: "/practica" },
};
export default function PracticePage() {
  return (
    <>
      <Header />
      <main id="contenido" className="section-container practice-page">
        <div className="page-intro">
          <span className="mono-eyebrow">
            MODO PRÁCTICA / APRENDER HACIENDO
          </span>
          <h1>
            Comprueba lo que <em>sabes.</em>
          </h1>
          <p>
            Equivocarse también es parte del proceso. Aquí cada respuesta tiene
            una explicación.
          </p>
        </div>
        <Suspense
          fallback={<p role="status">Preparando tu espacio de práctica…</p>}
        >
          <PracticeLab />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
