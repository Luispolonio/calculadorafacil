"use client";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  Check,
  Copy,
  Languages,
  RotateCcw,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import AdvancedCalculations from "@/components/advanced-calculations";
import Link from "next/link";
import Image from "next/image";
import AdSlot from "@/components/ad-slot";

type Field = {
  key: string;
  es: string;
  en: string;
  type?: "date" | "text";
  placeholder?: string;
  unit?: string;
};
type Config = {
  title: [string, string];
  description: [string, string];
  fields: Field[];
  defaults: Record<string, string>;
  formula: [string, string];
  example: [string, string];
  calculate: (
    v: Record<string, string>,
    en: boolean,
  ) => { main: string; detail: string } | null;
};
const n = (v: string) => Number(v.replace(",", "."));
const money = (v: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(v);
const configs: Record<string, Config> = {
  porcentaje: {
    title: ["Calculadora de porcentajes", "Percentage calculator"],
    description: [
      "Calcula fácilmente cuánto es un porcentaje de una cantidad.",
      "Easily calculate a percentage of any amount.",
    ],
    fields: [
      { key: "percent", es: "Porcentaje", en: "Percentage", unit: "%" },
      { key: "amount", es: "Cantidad", en: "Amount" },
    ],
    defaults: { percent: "20", amount: "150" },
    formula: [
      "Resultado = (porcentaje ÷ 100) × cantidad",
      "Result = (percentage ÷ 100) × amount",
    ],
    example: ["20% de 150 es 30.", "20% of 150 is 30."],
    calculate: (v) => ({
      main: String((n(v.percent) / 100) * n(v.amount)),
      detail: `${v.percent}% de ${v.amount}`,
    }),
  },
  promedio: {
    title: ["Calculadora de promedio", "Average calculator"],
    description: [
      "Calcula el promedio, suma, mínimo y máximo de varios valores.",
      "Calculate the average, sum, minimum and maximum of several values.",
    ],
    fields: [
      {
        key: "values",
        es: "Valores separados por comas",
        en: "Comma-separated values",
        type: "text",
      },
    ],
    defaults: { values: "8, 9, 7, 10" },
    formula: [
      "Promedio = suma de valores ÷ cantidad de valores",
      "Average = sum of values ÷ number of values",
    ],
    example: [
      "El promedio de 8, 9, 7 y 10 es 8,5.",
      "The average of 8, 9, 7 and 10 is 8.5.",
    ],
    calculate: (v, en) => {
      const a = v.values
        .split(/[,; ]+/)
        .map(n)
        .filter(Number.isFinite);
      if (!a.length) return null;
      const sum = a.reduce((x, y) => x + y, 0);
      return {
        main: (sum / a.length).toFixed(2),
        detail: `${en ? "Sum" : "Suma"}: ${sum} · ${en ? "Values" : "Valores"}: ${a.length} · Min: ${Math.min(...a)} · Max: ${Math.max(...a)}`,
      };
    },
  },
  "regla-de-tres": {
    title: ["Regla de tres simple", "Rule of three"],
    description: [
      "Resuelve proporciones directas en segundos.",
      "Solve direct proportions in seconds.",
    ],
    fields: [
      { key: "a", es: "Valor A", en: "Value A" },
      { key: "b", es: "Valor B", en: "Value B" },
      { key: "c", es: "Valor C", en: "Value C" },
    ],
    defaults: { a: "5", b: "20", c: "8" },
    formula: ["X = (B × C) ÷ A", "X = (B × C) ÷ A"],
    example: [
      "Si 5 unidades cuestan 20, 8 unidades cuestan 32.",
      "If 5 units cost 20, 8 units cost 32.",
    ],
    calculate: (v) =>
      n(v.a) === 0
        ? null
        : {
            main: ((n(v.b) * n(v.c)) / n(v.a)).toFixed(2),
            detail: `(${v.b} × ${v.c}) ÷ ${v.a}`,
          },
  },
  "calculadora-notas": {
    title: ["Calculadora de notas", "Grade calculator"],
    description: [
      "Descubre qué nota necesitas en tu evaluación final.",
      "Find the grade you need on your final assessment.",
    ],
    fields: [
      { key: "current", es: "Promedio actual", en: "Current average" },
      {
        key: "weight",
        es: "Peso del examen final",
        en: "Final exam weight",
        unit: "%",
      },
      { key: "target", es: "Promedio deseado", en: "Target average" },
    ],
    defaults: { current: "8", weight: "40", target: "8" },
    formula: [
      "Nota final = (objetivo − actual × peso cursado) ÷ peso final",
      "Final grade = (target − current × completed weight) ÷ final weight",
    ],
    example: [
      "Ajusta los datos a la escala de evaluación de tu institución.",
      "Use your institution's grading scale.",
    ],
    calculate: (v, en) => {
      const w = n(v.weight) / 100;
      if (w <= 0) return null;
      const r = (n(v.target) - n(v.current) * (1 - w)) / w;
      return {
        main: r.toFixed(2),
        detail: en
          ? "Grade needed on the final exam"
          : "Nota necesaria en el examen final",
      };
    },
  },
  prestamo: {
    title: ["Calculadora de préstamos", "Loan calculator"],
    description: [
      "Estima la cuota mensual, los intereses y el total del préstamo.",
      "Estimate monthly payments, interest and loan total.",
    ],
    fields: [
      {
        key: "principal",
        es: "Cantidad del préstamo",
        en: "Loan amount",
        unit: "$",
      },
      { key: "rate", es: "Interés anual", en: "Annual interest", unit: "%" },
      { key: "years", es: "Duración", en: "Term", unit: "años" },
    ],
    defaults: { principal: "10000", rate: "8", years: "3" },
    formula: [
      "Cuota = P × r(1+r)ⁿ ÷ ((1+r)ⁿ−1)",
      "Payment = P × r(1+r)ⁿ ÷ ((1+r)ⁿ−1)",
    ],
    example: [
      "Un préstamo de $10.000 al 8% por 3 años tiene 36 cuotas.",
      "A $10,000 loan at 8% for 3 years has 36 payments.",
    ],
    calculate: (v, en) => {
      const p = n(v.principal),
        r = n(v.rate) / 1200,
        m = n(v.years) * 12;
      const pay = r ? (p * r * (1 + r) ** m) / ((1 + r) ** m - 1) : p / m;
      return {
        main: money(pay),
        detail: `${en ? "Total" : "Total"}: ${money(pay * m)} · ${en ? "Interest" : "Intereses"}: ${money(pay * m - p)}`,
      };
    },
  },
  "interes-compuesto": {
    title: ["Calculadora de interés compuesto", "Compound interest calculator"],
    description: [
      "Proyecta el crecimiento de una inversión con aportes mensuales.",
      "Project investment growth with monthly contributions.",
    ],
    fields: [
      {
        key: "initial",
        es: "Capital inicial",
        en: "Starting amount",
        unit: "$",
      },
      {
        key: "monthly",
        es: "Aporte mensual",
        en: "Monthly contribution",
        unit: "$",
      },
      { key: "rate", es: "Tasa anual", en: "Annual rate", unit: "%" },
      { key: "years", es: "Duración", en: "Duration", unit: "años" },
    ],
    defaults: { initial: "1000", monthly: "100", rate: "6", years: "10" },
    formula: [
      "Valor futuro = capital compuesto + aportes compuestos",
      "Future value = compounded principal + compounded contributions",
    ],
    example: [
      "Los aportes constantes pueden aumentar notablemente el valor final.",
      "Regular contributions can significantly increase the final value.",
    ],
    calculate: (v, en) => {
      const i = n(v.rate) / 1200,
        m = n(v.years) * 12,
        initial = n(v.initial),
        monthly = n(v.monthly);
      const total = i
        ? initial * (1 + i) ** m + monthly * (((1 + i) ** m - 1) / i)
        : initial + monthly * m;
      const paid = initial + monthly * m;
      return {
        main: money(total),
        detail: `${en ? "Contributed" : "Aportado"}: ${money(paid)} · ${en ? "Interest" : "Intereses"}: ${money(total - paid)}`,
      };
    },
  },
  edad: {
    title: ["Calculadora de edad", "Age calculator"],
    description: [
      "Calcula tu edad y los días aproximados vividos.",
      "Calculate your age and approximate days lived.",
    ],
    fields: [
      {
        key: "birth",
        es: "Fecha de nacimiento",
        en: "Date of birth",
        type: "date",
      },
    ],
    defaults: { birth: "1995-01-01" },
    formula: [
      "Edad = fecha actual − fecha de nacimiento",
      "Age = current date − birth date",
    ],
    example: [
      "El resultado usa la fecha actual de tu dispositivo.",
      "The result uses your device's current date.",
    ],
    calculate: (v, en) => {
      const b = new Date(v.birth + "T00:00:00"),
        today = new Date();
      if (isNaN(b.getTime()) || b > today) return null;
      let age = today.getFullYear() - b.getFullYear();
      if (today < new Date(today.getFullYear(), b.getMonth(), b.getDate()))
        age--;
      const days = Math.floor((today.getTime() - b.getTime()) / 86400000);
      return {
        main: `${age} ${en ? "years" : "años"}`,
        detail: `${days.toLocaleString()} ${en ? "days lived approximately" : "días vividos aproximadamente"}`,
      };
    },
  },
  "diferencia-fechas": {
    title: ["Diferencia entre fechas", "Date difference"],
    description: [
      "Calcula la distancia exacta entre dos fechas.",
      "Calculate the distance between two dates.",
    ],
    fields: [
      { key: "start", es: "Fecha inicial", en: "Start date", type: "date" },
      { key: "end", es: "Fecha final", en: "End date", type: "date" },
    ],
    defaults: { start: "2025-01-01", end: "2026-01-01" },
    formula: [
      "Diferencia = fecha final − fecha inicial",
      "Difference = end date − start date",
    ],
    example: [
      "Útil para proyectos, eventos y plazos.",
      "Useful for projects, events and deadlines.",
    ],
    calculate: (v, en) => {
      const d =
        Math.abs(new Date(v.end).getTime() - new Date(v.start).getTime()) /
        86400000;
      if (!Number.isFinite(d)) return null;
      return {
        main: `${d} ${en ? "days" : "días"}`,
        detail: `${(d / 7).toFixed(1)} ${en ? "weeks" : "semanas"} · ${(d * 24).toLocaleString()} ${en ? "hours" : "horas"}`,
      };
    },
  },
  descuento: {
    title: ["Calculadora de descuentos", "Discount calculator"],
    description: [
      "Calcula el precio final y cuánto ahorrarás.",
      "Calculate the final price and your savings.",
    ],
    fields: [
      { key: "price", es: "Precio original", en: "Original price", unit: "$" },
      { key: "discount", es: "Descuento", en: "Discount", unit: "%" },
    ],
    defaults: { price: "120", discount: "25" },
    formula: [
      "Precio final = precio × (1 − descuento ÷ 100)",
      "Final price = price × (1 − discount ÷ 100)",
    ],
    example: [
      "Un descuento del 25% sobre $120 deja un precio de $90.",
      "A 25% discount on $120 gives a final price of $90.",
    ],
    calculate: (v, en) => {
      const saved = (n(v.price) * n(v.discount)) / 100;
      return {
        main: money(n(v.price) - saved),
        detail: `${en ? "You save" : "Ahorras"}: ${money(saved)}`,
      };
    },
  },
  convertir: {
    title: ["Conversor de longitud", "Length converter"],
    description: [
      "Convierte kilómetros a metros, millas, pies y centímetros.",
      "Convert kilometers to meters, miles, feet and centimeters.",
    ],
    fields: [{ key: "km", es: "Kilómetros", en: "Kilometers", unit: "km" }],
    defaults: { km: "1" },
    formula: ["1 km = 1.000 m = 0,621371 mi", "1 km = 1,000 m = 0.621371 mi"],
    example: [
      "Introduce un valor para ver sus equivalencias.",
      "Enter a value to see its equivalents.",
    ],
    calculate: (v) => {
      const x = n(v.km);
      return {
        main: `${(x * 0.621371).toFixed(4)} mi`,
        detail: `${(x * 1000).toLocaleString()} m · ${(x * 3280.84).toFixed(2)} ft · ${(x * 100000).toLocaleString()} cm`,
      };
    },
  },
};

export default function CalculatorModule({ slug }: { slug: string }) {
  const config = configs[slug],
    { language, toggle } = useLanguage(),
    en = language === "en";
  const [values, setValues] = useState<Record<string, string>>(
      config?.defaults || {},
    ),
    [result, setResult] = useState<{ main: string; detail: string } | null>(
      null,
    ),
    [copied, setCopied] = useState(false);
  const title = config?.title[en ? 1 : 0];
  const related = useMemo(
    () =>
      Object.entries(configs)
        .filter(([s]) => s !== slug)
        .slice(0, 3),
    [slug],
  );
  if (!config)
    return (
      <main className="calculator-page">
        <h1>Calculadora no encontrada</h1>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  const calculate = () => {
    const invalidInput = config.fields.some((field) => {
      const value = values[field.key];
      if (!value) return true;
      if (field.type === "date") return Number.isNaN(new Date(value).getTime());
      const parsed = Number(value.replace(",", "."));
      return (
        !Number.isFinite(parsed) ||
        (["prestamo", "interes-compuesto"].includes(slug) && parsed < 0)
      );
    });
    const calculated = invalidInput ? null : config.calculate(values, en);
    const invalidResult =
      calculated &&
      /NaN|Infinity|∞/.test(`${calculated.main} ${calculated.detail}`);
    setResult(
      !invalidResult && calculated
        ? calculated
        : {
            main: en ? "Check the data" : "Revisa los datos",
            detail: en
              ? "Enter valid values in every field."
              : "Introduce valores válidos en todos los campos.",
          },
    );
  };
  const reset = () => {
    setValues(config.defaults);
    setResult(null);
  };
  return (
    <div className="calculator-site">
      <header className="calc-header">
        <Link className="brand" href="/">
          <Image
            className="brand-logo"
            src="/calculadora-facil-logo.png"
            alt="CalculadoraFácil"
            width={180}
            height={60}
            priority
          />
        </Link>
        <Link className="back-home" href="/">
          <ArrowLeft /> {en ? "All calculators" : "Todas las calculadoras"}
        </Link>
        <button className="language-button" onClick={toggle}>
          <Languages />
          <span>{en ? "EN" : "ES"}</span>
        </button>
      </header>
      <main className="calculator-page">
        <div className="breadcrumbs">
          <Link href="/">{en ? "Home" : "Inicio"}</Link>
          <span>/</span>
          <span>{title}</span>
        </div>
        <section className="calculator-intro">
          <span className="kicker">
            {en ? "Free online tool" : "Herramienta online gratuita"}
          </span>
          <h1>{title}</h1>
          <p>{config.description[en ? 1 : 0]}</p>
        </section>
        <div className="calculator-layout">
          <section className="calculator-panel">
            <div className="panel-heading">
              <div className="icon-box sky">
                <Calculator />
              </div>
              <div>
                <h2>{en ? "Enter your data" : "Introduce tus datos"}</h2>
                <p>
                  {en
                    ? "Complete the fields and calculate."
                    : "Completa los campos y calcula."}
                </p>
              </div>
            </div>
            <div className="calc-fields">
              {config.fields.map((f) => (
                <label key={f.key}>
                  <span>{en ? f.en : f.es}</span>
                  <div className="field-wrap">
                    <input
                      type={f.type || "number"}
                      value={values[f.key] || ""}
                      onChange={(e) =>
                        setValues({ ...values, [f.key]: e.target.value })
                      }
                    />
                    {f.unit && <small>{f.unit}</small>}
                  </div>
                </label>
              ))}
            </div>
            <div className="calc-actions">
              <button className="calculate-button" onClick={calculate}>
                {en ? "Calculate" : "Calcular"}
              </button>
              <button className="reset-button" onClick={reset}>
                <RotateCcw />
                {en ? "Clear" : "Limpiar"}
              </button>
            </div>
          </section>
          <aside className={`result-panel ${result ? "has-result" : ""}`}>
            <span>{en ? "Your result" : "Tu resultado"}</span>
            {result ? (
              <>
                <strong>{result.main}</strong>
                <p>{result.detail}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${result.main} — ${result.detail}`,
                    );
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? <Check /> : <Copy />}
                  {copied
                    ? en
                      ? "Copied"
                      : "Copiado"
                    : en
                      ? "Copy result"
                      : "Copiar resultado"}
                </button>
              </>
            ) : (
              <>
                <div className="result-placeholder">
                  <Calculator />
                </div>
                <p>
                  {en
                    ? "Your result will appear here."
                    : "Tu resultado aparecerá aquí."}
                </p>
              </>
            )}
          </aside>
        </div>
        <AdSlot placement={`${slug}-after-result`} format="leaderboard" />
        <AdvancedCalculations slug={slug} />
        <AdSlot placement={`${slug}-between-content`} format="rectangle" />
        <section className="explanation-grid">
          <article>
            <span className="kicker">{en ? "Formula" : "Fórmula"}</span>
            <h2>{en ? "How it is calculated" : "Cómo se calcula"}</h2>
            <div className="formula-box">{config.formula[en ? 1 : 0]}</div>
          </article>
          <article>
            <span className="kicker">
              {en ? "Practical case" : "Caso práctico"}
            </span>
            <h2>{en ? "Example" : "Ejemplo"}</h2>
            <p>{config.example[en ? 1 : 0]}</p>
          </article>
        </section>
        <AdSlot placement={`${slug}-after-explanation`} format="responsive" />
        <section className="related">
          <span className="kicker">
            {en ? "Keep calculating" : "Sigue calculando"}
          </span>
          <h2>{en ? "Related calculators" : "Calculadoras relacionadas"}</h2>
          <div>
            {related.map(([s, c]) => (
              <a href={`/${s}`} key={s}>
                <Calculator />
                <span>
                  <strong>{c.title[en ? 1 : 0]}</strong>
                  <small>{c.description[en ? 1 : 0]}</small>
                </span>
                <ArrowLeft />
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
