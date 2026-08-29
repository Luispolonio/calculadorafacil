"use client";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Calculator,
  ChevronDown,
  Clock3,
  Coins,
  GraduationCap,
  HeartPulse,
  Languages,
  Menu,
  Percent,
  Ruler,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  WalletCards,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import Image from "next/image";
import Link from "next/link";
import AdSlot from "@/components/ad-slot";

const tools = [
  {
    name: "Porcentajes",
    enName: "Percentages",
    description: "Calcula porcentajes, aumentos y variaciones.",
    enDescription: "Calculate percentages, increases and variations.",
    category: "Matemáticas",
    enCategory: "Mathematics",
    icon: Percent,
    tone: "sky",
    popular: true,
    href: "/porcentaje",
  },
  {
    name: "Préstamos",
    enName: "Loans",
    description: "Estima tu cuota, intereses y total a pagar.",
    enDescription: "Estimate payments, interest and total cost.",
    category: "Finanzas",
    enCategory: "Finance",
    icon: WalletCards,
    tone: "blue",
    popular: true,
    href: "/prestamo",
  },
  {
    name: "Promedio",
    enName: "Average",
    description: "Obtén el promedio de varios valores o notas.",
    enDescription: "Find the average of several values or grades.",
    category: "Estudios",
    enCategory: "Education",
    icon: BarChart3,
    tone: "violet",
    popular: true,
    href: "/promedio",
  },
  {
    name: "Edad",
    enName: "Age",
    description: "Conoce tu edad exacta en años, meses y días.",
    enDescription: "Find your exact age in years, months and days.",
    category: "Fechas y tiempo",
    enCategory: "Dates and time",
    icon: CalendarDays,
    tone: "amber",
    popular: true,
    href: "/edad",
  },
  {
    name: "Interés compuesto",
    enName: "Compound interest",
    description: "Proyecta cómo crecerán tus ahorros.",
    enDescription: "Project how your savings will grow.",
    category: "Finanzas",
    enCategory: "Finance",
    icon: TrendingUp,
    tone: "emerald",
    popular: true,
    href: "/interes-compuesto",
  },
  {
    name: "Regla de tres",
    enName: "Rule of three",
    description: "Resuelve proporciones de forma sencilla.",
    enDescription: "Solve proportions in a simple way.",
    category: "Matemáticas",
    enCategory: "Mathematics",
    icon: Calculator,
    tone: "rose",
    popular: true,
    href: "/regla-de-tres",
  },
  {
    name: "Descuentos",
    enName: "Discounts",
    description: "Calcula el precio final y cuánto ahorras.",
    enDescription: "Calculate the final price and your savings.",
    category: "Vida cotidiana",
    enCategory: "Everyday life",
    icon: Coins,
    tone: "sky",
    isNew: true,
    href: "/descuento",
  },
  {
    name: "Conversor de unidades",
    enName: "Unit converter",
    description: "Convierte longitud, peso y temperatura.",
    enDescription: "Convert length, weight and temperature.",
    category: "Conversores",
    enCategory: "Converters",
    icon: Ruler,
    tone: "blue",
    isNew: true,
    href: "/convertir",
  },
  {
    name: "Diferencia entre fechas",
    enName: "Date difference",
    description: "Cuenta días, semanas, meses y años.",
    enDescription: "Count days, weeks, months and years.",
    category: "Fechas y tiempo",
    enCategory: "Dates and time",
    icon: Clock3,
    tone: "amber",
    isNew: true,
    href: "/diferencia-fechas",
  },
  {
    name: "Calculadora de notas",
    enName: "Grade calculator",
    description: "Averigua qué nota necesitas para aprobar.",
    enDescription: "Find out what grade you need to pass.",
    category: "Estudios",
    enCategory: "Education",
    icon: GraduationCap,
    tone: "violet",
    isNew: true,
    href: "/calculadora-notas",
  },
];
const categories = [
  {
    name: "Matemáticas",
    enName: "Mathematics",
    count: 12,
    icon: Calculator,
    tone: "sky",
  },
  {
    name: "Finanzas",
    enName: "Finance",
    count: 10,
    icon: WalletCards,
    tone: "blue",
  },
  {
    name: "Estudios",
    enName: "Education",
    count: 7,
    icon: GraduationCap,
    tone: "violet",
  },
  {
    name: "Fechas y tiempo",
    enName: "Dates and time",
    count: 9,
    icon: CalendarDays,
    tone: "amber",
  },
  {
    name: "Salud y bienestar",
    enName: "Health and wellness",
    count: 6,
    icon: HeartPulse,
    tone: "rose",
  },
  {
    name: "Conversores",
    enName: "Converters",
    count: 14,
    icon: Ruler,
    tone: "emerald",
  },
];
const faqs = [
  {
    es: [
      "¿Las calculadoras son gratuitas?",
      "Sí. Todas las herramientas de CalculadoraFácil son gratuitas y puedes usarlas sin registrarte.",
    ],
    en: [
      "Are the calculators free?",
      "Yes. Every CalculadoraFácil tool is free and you can use it without signing up.",
    ],
  },
  {
    es: [
      "¿Mis datos se guardan?",
      "No enviamos los valores que introduces a ningún servidor. Los cálculos se realizan directamente en tu navegador.",
    ],
    en: [
      "Is my data stored?",
      "We do not send the values you enter to a server. Calculations run directly in your browser.",
    ],
  },
  {
    es: [
      "¿Puedo usar los resultados para decisiones financieras?",
      "Las herramientas ofrecen estimaciones orientativas. Para decisiones importantes, consulta a un profesional cualificado.",
    ],
    en: [
      "Can I use the results for financial decisions?",
      "These tools provide estimates. Consult a qualified professional for important decisions.",
    ],
  },
  {
    es: [
      "¿Cómo encuentro una calculadora?",
      "Usa el buscador superior o explora las categorías. Verás coincidencias mientras escribes.",
    ],
    en: [
      "How do I find a calculator?",
      "Use the search box or browse the categories. Matching tools appear as you type.",
    ],
  },
];
function ToolCard({ tool, en }: { tool: (typeof tools)[number]; en: boolean }) {
  const Icon = tool.icon;
  return (
    <a className="tool-card" href={tool.href}>
      <div className={`icon-box ${tool.tone}`}>
        <Icon />
      </div>
      <div className="tool-copy">
        <div className="tool-title-row">
          <h3>{en ? tool.enName : tool.name}</h3>
          {tool.isNew && <span className="badge">{en ? "New" : "Nueva"}</span>}
        </div>
        <p>{en ? tool.enDescription : tool.description}</p>
        <span className="tool-link">
          {en ? "Open calculator" : "Abrir calculadora"} <ArrowRight />
        </span>
      </div>
    </a>
  );
}

export default function Home() {
  const { language, toggle } = useLanguage();
  const en = language === "en";
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const matches = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return q
      ? tools.filter((t) =>
          `${t.name} ${t.enName} ${t.description} ${t.enDescription} ${t.category} ${t.enCategory}`
            .toLocaleLowerCase()
            .includes(q),
        )
      : [];
  }, [query]);
  return (
    <div className="site-shell">
      <header className="header">
        <a
          className="brand"
          href="#inicio"
          aria-label="CalculadoraFácil, inicio"
        >
          <Image
            className="brand-logo"
            src="/calculadora-facil-logo.png"
            alt="CalculadoraFácil"
            width={180}
            height={60}
            priority
          />
        </a>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#populares">{language === "es" ? "Populares" : "Popular"}</a>
          <a href="#categorias">
            {language === "es" ? "Categorías" : "Categories"}
          </a>
          <a href="#nuevas">{language === "es" ? "Nuevas" : "New"}</a>
          <a href="#preguntas">{language === "es" ? "Ayuda" : "Help"}</a>
        </nav>
        <button
          className="language-button"
          onClick={toggle}
          aria-label="Cambiar idioma"
        >
          <Languages />
          <span>{language === "es" ? "ES" : "EN"}</span>
        </button>
        <a className="all-tools" href="#categorias">
          {language === "es" ? "Todas las calculadoras" : "All calculators"}{" "}
          <ArrowRight />
        </a>
        <button
          className="menu-button"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main id="inicio">
        <section className="hero">
          <div className="hero-glow" />
          <div className="eyebrow">
            <Sparkles />{" "}
            {language === "es"
              ? "Cálculos claros, resultados al instante"
              : "Clear calculations, instant results"}
          </div>
          <h1>
            {language === "es"
              ? "La respuesta que necesitas,"
              : "The answer you need,"}
            <br />
            <span>
              {language === "es"
                ? "sin complicaciones."
                : "without complications."}
            </span>
          </h1>
          <p className="hero-lead">
            {language === "es"
              ? "Herramientas gratuitas para resolver tus cálculos cotidianos de forma rápida, sencilla y confiable."
              : "Free tools to solve everyday calculations quickly, simply and reliably."}
          </p>
          <div className="search-wrap">
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                en
                  ? "What do you need to calculate?"
                  : "¿Qué necesitas calcular?"
              }
              aria-label={en ? "Search calculators" : "Buscar calculadoras"}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label={en ? "Clear search" : "Limpiar búsqueda"}
              >
                <X />
              </button>
            )}
            <span className="search-key">⌘ K</span>
            {query && (
              <div className="search-results">
                {matches.length ? (
                  matches.map((t) => {
                    const Icon = t.icon;
                    return (
                      <a href={t.href} key={t.name}>
                        <span className={`mini-icon ${t.tone}`}>
                          <Icon />
                        </span>
                        <span>
                          <strong>{en ? t.enName : t.name}</strong>
                          <small>{en ? t.enCategory : t.category}</small>
                        </span>
                        <ArrowRight />
                      </a>
                    );
                  })
                ) : (
                  <p>
                    {en
                      ? "We could not find that calculator. Try “money”, “age” or “percentage”."
                      : "No encontramos esa calculadora. Prueba con “dinero”, “edad” o “porcentaje”."}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="quick-links">
            <span>{en ? "Popular searches:" : "Búsquedas frecuentes:"}</span>
            {(en
              ? ["percentage", "loan", "average", "age"]
              : ["porcentaje", "préstamo", "promedio", "edad"]
            ).map((x) => (
              <button onClick={() => setQuery(x)} key={x}>
                {x[0].toUpperCase() + x.slice(1)}
              </button>
            ))}
          </div>
        </section>
        <section className="section" id="populares">
          <div className="section-heading">
            <div>
              <span className="kicker">
                <Star /> {en ? "Community favorites" : "Las favoritas"}
              </span>
              <h2>
                {en ? "Most-used calculators" : "Calculadoras más utilizadas"}
              </h2>
              <p>
                {en
                  ? "The tools that help our community the most."
                  : "Las herramientas que más ayudan a nuestra comunidad."}
              </p>
            </div>
            <a href="#categorias">
              {en ? "View all" : "Ver todas"} <ArrowRight />
            </a>
          </div>
          <div className="tool-grid">
            {tools
              .filter((t) => t.popular)
              .map((t) => (
                <ToolCard tool={t} en={en} key={t.name} />
              ))}
          </div>
        </section>
        <AdSlot placement="home-after-popular" format="leaderboard" />
        <section className="category-section" id="categorias">
          <div className="section centered">
            <span className="kicker">
              {en ? "Explore your way" : "Explora a tu manera"}
            </span>
            <h2>{en ? "Find tools by category" : "Encuentra por categoría"}</h2>
            <p className="section-intro">
              {en
                ? "Everything is organized so you can find the right tool in seconds."
                : "Todo ordenado para que llegues a la herramienta indicada en pocos segundos."}
            </p>
            <div className="category-grid">
              {categories.map((c) => {
                const Icon = c.icon;
                return (
                  <a href="#populares" className="category-card" key={c.name}>
                    <div className={`icon-box ${c.tone}`}>
                      <Icon />
                    </div>
                    <div>
                      <h3>{en ? c.enName : c.name}</h3>
                      <p>
                        {c.count} {en ? "calculators" : "calculadoras"}
                      </p>
                    </div>
                    <ArrowRight className="category-arrow" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        <AdSlot placement="home-after-categories" format="leaderboard" />
        <section className="section" id="nuevas">
          <div className="section-heading">
            <div>
              <span className="kicker">
                <Sparkles /> {en ? "Just added" : "Recién llegadas"}
              </span>
              <h2>{en ? "New calculators" : "Nuevas calculadoras"}</h2>
              <p>
                {en
                  ? "More solutions to make your day a little easier."
                  : "Más soluciones para hacerte el día un poco más fácil."}
              </p>
            </div>
          </div>
          <div className="tool-grid four">
            {tools
              .filter((t) => t.isNew)
              .map((t) => (
                <ToolCard tool={t} en={en} key={t.name} />
              ))}
          </div>
        </section>
        <section className="trust-band">
          <div className="trust-copy">
            <span className="kicker light">
              {en ? "Made to help you" : "Hecho para ayudarte"}
            </span>
            <h2>
              {en
                ? "Calculating should be easy."
                : "Calcular debería ser fácil."}
              <br />
              {en
                ? "That is why we keep it simple."
                : "Por eso lo hacemos simple."}
            </h2>
            <p>
              {en
                ? "No accounts, no fine print and no unnecessary steps. Choose a tool, enter your data and get a clear answer."
                : "Sin registros, sin letras pequeñas y sin pasos innecesarios. Solo eliges una herramienta, introduces tus datos y obtienes una respuesta clara."}
            </p>
            <div className="trust-points">
              <span>
                <strong>100%</strong> {en ? "free" : "gratis"}
              </span>
              <span>
                <strong>0</strong> {en ? "accounts" : "registros"}
              </span>
              <span>
                <strong>+50</strong> {en ? "tools" : "herramientas"}
              </span>
            </div>
          </div>
          <div className="trust-card">
            <div className="mock-top">
              <span />
              <span />
              <span />
            </div>
            <div className="mock-line" />
            <div className="mock-fields">
              <div />
              <div />
            </div>
            <div className="mock-button">{en ? "Calculate" : "Calcular"}</div>
            <div className="mock-result">
              <small>{en ? "Your result" : "Tu resultado"}</small>
              <strong>30</strong>
              <span>{en ? "20% of 150" : "20% de 150"}</span>
            </div>
          </div>
        </section>
        <section className="section faq-section" id="preguntas">
          <span className="kicker">
            {en ? "We are here to help" : "Estamos para ayudarte"}
          </span>
          <h2>{en ? "Frequently asked questions" : "Preguntas frecuentes"}</h2>
          <p className="section-intro">
            {en
              ? "Quick answers before you begin."
              : "Respuestas rápidas antes de empezar."}
          </p>
          <div className="faq-list">
            {faqs.map((faq, i) => {
              const [q, a] = en ? faq.en : faq.es;
              return (
                <div
                  className={`faq-item ${openFaq === i ? "expanded" : ""}`}
                  key={q}
                >
                  <button
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{q}</span>
                    <ChevronDown />
                  </button>
                  {openFaq === i && <p>{a}</p>}
                </div>
              );
            })}
          </div>
        </section>
        <AdSlot placement="home-before-footer" format="leaderboard" />
        <section className="cta">
          <div>
            <span className="kicker light">
              {en ? "Ready to get started?" : "¿Listo para empezar?"}
            </span>
            <h2>
              {en
                ? "Find the calculator you need."
                : "Encuentra la calculadora que necesitas."}
            </h2>
            <p>
              {en
                ? "More than 50 free, clear and always-available tools."
                : "Más de 50 herramientas gratuitas, claras y siempre disponibles."}
            </p>
          </div>
          <a href="#categorias">
            {en ? "Explore calculators" : "Explorar calculadoras"}{" "}
            <ArrowRight />
          </a>
        </section>
      </main>
      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand inverted" href="#inicio">
              <Image
                className="brand-logo"
                src="/calculadora-facil-logo.png"
                alt="CalculadoraFácil"
                width={180}
                height={60}
              />
            </a>
            <p>
              {en
                ? "Everyday calculations solved quickly, simply and reliably."
                : "Resolvemos tus cálculos cotidianos de forma rápida, sencilla y confiable."}
            </p>
          </div>
          <div>
            <h3>{en ? "Calculators" : "Calculadoras"}</h3>
            <a href="#populares">{en ? "Most used" : "Más utilizadas"}</a>
            <a href="#nuevas">{en ? "New" : "Nuevas"}</a>
            <a href="#categorias">{en ? "All" : "Todas"}</a>
          </div>
          <div>
            <h3>{en ? "Categories" : "Categorías"}</h3>
            <a href="#categorias">{en ? "Mathematics" : "Matemáticas"}</a>
            <a href="#categorias">{en ? "Finance" : "Finanzas"}</a>
            <a href="#categorias">
              {en ? "Dates and time" : "Fechas y tiempo"}
            </a>
          </div>
          <div>
            <h3>{en ? "Information" : "Información"}</h3>
            <Link href="/legal/sobre-nosotros">
              {en ? "About us" : "Sobre nosotros"}
            </Link>
            <Link href="/legal/contacto">{en ? "Contact" : "Contacto"}</Link>
            <Link href="/legal/privacidad">
              {en ? "Privacy" : "Privacidad"}
            </Link>
            <Link href="/legal/cookies">{en ? "Cookies" : "Cookies"}</Link>
            <Link href="/legal/terminos">{en ? "Terms" : "Términos"}</Link>
            <Link href="/legal/aviso-legal">
              {en ? "Legal notice" : "Aviso legal"}
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 CalculadoraFácil.{" "}
            {en ? "All rights reserved." : "Todos los derechos reservados."}
          </span>
          <span>
            {en
              ? "Made with clarity for everyone."
              : "Hecho con claridad para todos."}
          </span>
        </div>
      </footer>
    </div>
  );
}
