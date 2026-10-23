import Link from "next/link";
import { Header, Footer } from "@/components/site-chrome";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="section-container not-found-page">
        <span className="mono-eyebrow">404 / UN NUEVO CAMINO</span>
        <h1>Esta página ya no está aquí.</h1>
        <p>
          CalculadoraFácil se ha convertido en un laboratorio de matemáticas.
          Encuentra herramientas de álgebra, cálculo, geometría y estadística, o
          practica con ejercicios nuevos.
        </p>
        <Link href="/#herramientas" className="button primary">
          Explorar las herramientas →
        </Link>
      </main>
      <Footer />
    </>
  );
}
