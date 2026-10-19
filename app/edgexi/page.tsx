import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BarChart3, History, Radio } from "lucide-react";
import styles from "./page.module.css";

const title = "EDGEXI | Decisiones con datos";
const description = "Conoce EDGE XI: análisis deportivo, probabilidades, históricos de enfrentamientos y seguimiento de predicciones en vivo.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/edgexi/" },
  openGraph: { title, description, url: "/edgexi/", siteName: "EDGEXI", type: "website" },
  twitter: { card: "summary", title, description },
};

export default function EdgeXiPage() {
  return <div className={styles.page}>
    <header className={styles.header}>
      <Link href="/edgexi/" className={styles.brand} aria-label="EDGEXI, inicio">EDGE<span>XI</span></Link>
      <a href="mailto:contacto@calculadorafacil.dev" className={styles.contact}>Contacto <ArrowUpRight size={16} /></a>
    </header>
    <main id="contenido" className={styles.main}>
      <section className={styles.hero} aria-labelledby="edge-title">
        <div>
          <p className={styles.eyebrow}>TU LECTURA DEL JUEGO</p>
          <h1 id="edge-title">Decisiones<br /><span>con datos.</span></h1>
          <p className={styles.intro}>Mira más allá del marcador. EDGE XI reúne estadísticas, probabilidades y el historial de los equipos para ayudarte a entender cada partido.</p>
          <a href="#explora" className={styles.button}>Conoce la app <ArrowDown size={18} /></a>
          <p className={styles.caption}>Análisis deportivo en tu móvil.</p>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <Image src="/edgexi-mark.svg" alt="" width={320} height={320} priority />
          <span>EL JUEGO, CON OTRA PERSPECTIVA.</span>
        </div>
      </section>
      <section id="explora" className={styles.features} aria-label="Qué encontrarás en EDGE XI">
        <article><BarChart3 /><h2>Probabilidades claras</h2><p>Consulta las predicciones del partido y las estadísticas de equipos y jugadores en un solo lugar.</p></article>
        <article><History /><h2>Historia entre rivales</h2><p>Explora sus enfrentamientos anteriores y el total de goles para poner cada predicción en contexto.</p></article>
        <article><Radio /><h2>Seguimiento en vivo</h2><p>Sigue el partido y comprueba cómo evolucionan los resultados de las predicciones.</p></article>
      </section>
      <section className={styles.about} aria-labelledby="about-title">
        <div><p className={styles.eyebrow}>SOBRE EDGEXI</p><h2 id="about-title">Información para entender.<br />La decisión es tuya.</h2></div>
        <div><p>EDGE XI es una aplicación móvil de análisis deportivo publicada por CalculadoraFácil. Puedes iniciar sesión con tu cuenta de Google para acceder a tu cuenta en la aplicación.</p><p>Las probabilidades son estimaciones y no garantizan resultados. EDGE XI no recibe apuestas.</p><Link href="/privacidad/edgexi/" className={styles.privacy}>Cómo cuidamos tus datos <ArrowUpRight size={17} /></Link></div>
      </section>
    </main>
    <footer className={styles.footer}>
      <span>EDGEXI · Una aplicación de <Link href="/">CalculadoraFácil</Link></span>
      <nav aria-label="Información de EDGEXI"><Link href="/privacidad/edgexi/">Privacidad</Link><Link href="/privacidad/edgexi/#eliminacion">Eliminar cuenta</Link><a href="mailto:contacto@calculadorafacil.dev">Contacto</a></nav>
    </footer>
  </div>;
}
