import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MoveDown,
  PencilLine,
  ScanLine,
  Workflow,
} from "lucide-react";
import { Header, Footer } from "@/components/site-chrome";
import ToolCatalog from "@/components/tool-catalog";
import FunctionPlot from "@/components/function-plot";
import MathFormula from "@/components/math-formula";
const demo = Array.from({ length: 121 }, (_, i) => {
  const x = -1 + i / 20;
  return { x, y: x * x - 5 * x + 6 };
});
export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <section className="home-hero section-container">
          <div className="hero-editorial">
            <span className="mono-eyebrow">
              <span className="status-dot" /> MENOS DUDAS. MÁS IDEAS.
            </span>
            <h1>
              Las matemáticas
              <br />
              tienen <em>sentido.</em>
              <span className="hero-asterisk" aria-hidden="true">
                ✳
              </span>
            </h1>
            <p className="hero-description">
              Resuelve lo complejo. Entiende el proceso.
              <br />
              Un espacio para explorar, calcular y poner a prueba lo que sabes.
            </p>
            <div className="hero-actions">
              <Link href="#herramientas" className="button primary">
                Encuentra tu herramienta <ArrowUpRight size={20} />
              </Link>
              <Link href="/practica" className="text-action">
                Quiero practicar <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hero-notes">
              <span>
                <Check size={15} /> Sin registro
              </span>
              <span>
                <Check size={15} /> Explicaciones claras
              </span>
              <span>
                <Check size={15} /> 100% gratuito
              </span>
            </div>
          </div>
          <div className="hero-lab">
            <div className="demo-top">
              <span className="mono-eyebrow">EN EL LABORATORIO</span>
              <span className="demo-live">ÁLGEBRA / 002</span>
            </div>
            <div className="demo-equation"><MathFormula latex="x^2-5x+6=0" /></div>
            <p className="demo-subtitle">Cada curva cuenta una historia.</p>
            <FunctionPlot
              plot={{ points: demo, label: "f(x) = x² − 5x + 6", sources: ["x^2 - 5*x + 6"] }}
              compact
            />
            <div className="demo-result">
              <div>
                <span>LAS RAÍCES</span>
                <strong>
                  x₁ = 2 <i /> x₂ = 3
                </strong>
              </div>
              <Link
                href="/ecuaciones-cuadraticas"
                aria-label="Explorar ecuaciones de segundo grado"
              >
                <ArrowUpRight size={22} />
              </Link>
            </div>
            <span className="margin-note">¡Aquí todo encaja!</span>
          </div>
        </section>
        <div className="subject-strip">
          <div className="section-container">
            <span>ÁLGEBRA</span>
            <b>+</b>
            <span>CÁLCULO</span>
            <b>∫</b>
            <span>GEOMETRÍA</span>
            <b>△</b>
            <span>ESTADÍSTICA</span>
            <b>σ</b>
            <span>Y MUCHO MÁS</span>
            <MoveDown size={16} />
          </div>
        </div>
        <ToolCatalog />
        <section className="programming-promo section-container"><div><span className="mono-eyebrow">NUEVO / LÓGICA DE PROGRAMACIÓN</span><h2>Del «lo entiendo»<br/>al <em>«lo programé».</em></h2><p>Variables, decisiones, bucles y algoritmos. 28 lecciones en tres niveles, con un editor de Python real, consola y pruebas: desde lo básico hasta grafos y programación dinámica.</p><Link className="button primary" href="/programacion">Aprender y escribir código <ArrowUpRight size={18}/></Link></div><div className="code-promo-snippet"><span>tu_primera_idea.py</span><pre><code>{"def resolver(ancho, alto):\n    area = ancho * alto\n    return area\n\nprint(resolver(3, 4))\n# 12 · una idea que ya funciona"}</code></pre><span>APRENDE → ESCRIBE → PRUEBA</span></div></section>
        <section className="practice-promo section-container">
          <div className="practice-promo-copy">
            <span className="mono-eyebrow">02 / APRENDER HACIENDO</span>
            <h2>
              La respuesta importa.
              <br />
              <em>Entenderla, más.</em>
            </h2>
            <p>
              Pasa de «creo que lo sé» a comprobarlo. Ejercicios aleatorios, una
              pregunta a la vez y una explicación después de cada respuesta.
            </p>
            <Link className="button paper" href="/practica">
              Entrar al modo práctica <ArrowUpRight size={20} />
            </Link>
            <span className="promo-footnote">
              Tú eliges el tema. Nosotros planteamos el reto.
            </span>
          </div>
          <div
            className="practice-preview"
            aria-label="Ejemplo de ejercicio de práctica"
          >
            <div>
              <span>UN PEQUEÑO RETO</span>
              <PencilLine size={18} />
            </div>
            <p>Si <MathFormula latex="f(x)=x^3" />, ¿cuál es <MathFormula latex="f'(x)" />?</p>
            <div className="preview-option">
              <span>A</span> x²
            </div>
            <div className="preview-option correct">
              <span>B</span> 3x² <Check size={19} />
            </div>
            <div className="preview-option">
              <span>C</span> 3x
            </div>
            <p className="preview-explanation">
              La regla de potencia: baja el exponente y réstale uno.
            </p>
            <Link href="/practica">
              Ahora te toca a ti <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="method-section section-container" id="metodo">
          <div className="section-title">
            <div>
              <span className="mono-eyebrow">03 / DEL PROBLEMA A LA IDEA</span>
              <h2>
                Más que <em>un resultado.</em>
              </h2>
            </div>
            <p>
              Herramientas para estudiar con criterio,
              <br />a tu ritmo y desde tu navegador.
            </p>
          </div>
          <div className="method-grid">
            {[
              {
                n: "01",
                icon: ScanLine,
                title: "Plantea tu problema",
                text: "Elige una herramienta, introduce los datos o parte de un ejemplo. Cada campo te indica qué necesita.",
              },
              {
                n: "02",
                icon: Workflow,
                title: "Sigue el razonamiento",
                text: "Consulta el método, las condiciones y la gráfica cuando corresponde. Distingue resultados exactos de aproximaciones.",
              },
              {
                n: "03",
                icon: PencilLine,
                title: "Comprueba lo aprendido",
                text: "Practica con nuevos ejercicios. Revisa por qué una respuesta es correcta y vuelve a intentarlo con otro problema.",
              },
            ].map((x) => (
              <article key={x.n}>
                <div>
                  <span>{x.n}</span>
                  <x.icon size={22} />
                </div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="faq-section-new section-container">
          <div>
            <span className="mono-eyebrow">ANTES DE EMPEZAR</span>
            <h2>
              Una duda
              <br />
              <em>menos.</em>
            </h2>
          </div>
          <div className="faq-entries">
            {[
              [
                "¿Qué puedo resolver aquí?",
                "Ecuaciones de hasta tercer grado, sistemas lineales, derivadas, integrales de familias compatibles, EDO de primer orden, operaciones con conjuntos y otros problemas de álgebra, geometría y estadística. Cada herramienta explica su alcance.",
              ],
              [
                "¿Los resultados son siempre exactos?",
                "No. Las derivadas y primitivas compatibles son simbólicas; las raíces y otros cálculos usan aritmética numérica. Las EDO son aproximaciones RK4 y el explorador de límites no constituye una demostración.",
              ],
              [
                "¿Cómo funciona el modo práctica?",
                "Elige un tema y una dificultad. Completa diez preguntas generadas al azar, comprueba cada respuesta y revisa las explicaciones. La puntuación es orientativa y no una evaluación académica.",
              ],
              [
                "¿Necesito una cuenta?",
                "No. Las herramientas y ejercicios son gratuitos. Los valores de tus cálculos se procesan en tu navegador y no se envían a un servidor.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
