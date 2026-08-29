"use client";
import { useState } from "react";
import { Beaker, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
type Op = {
  es: string;
  en: string;
  formula: string;
  run: CalcFn;
  fields: string[];
  unit?: string;
};
type CalcFn = (a: number, b: number, c: number, d: number) => number;
const fieldText: Record<string, [string, string, string?]> = {
  percentage: ["Porcentaje", "Percentage", "%"],
  amount: ["Cantidad", "Amount"],
  value: ["Valor", "Value"],
  total: ["Total", "Total"],
  initial: ["Valor inicial", "Initial value"],
  final: ["Valor final", "Final value"],
  years: ["Años", "Years", "años"],
  price: ["Precio", "Price", "$"],
  cost: ["Costo", "Cost", "$"],
  estimate: ["Valor estimado", "Estimated value"],
  actual: ["Valor real", "Actual value"],
  a: ["Primer valor", "First value"],
  b: ["Segundo valor", "Second value"],
  c: ["Tercer valor", "Third value"],
  weight: ["Peso", "Weight", "%"],
  mean: ["Media", "Mean"],
  deviation: ["Desviación estándar", "Standard deviation"],
  distance: ["Distancia", "Distance"],
  time: ["Tiempo", "Time"],
  speed: ["Velocidad", "Speed"],
  budget: ["Presupuesto", "Budget", "$"],
  units: ["Unidades", "Units"],
  workers: ["Trabajadores", "Workers"],
  grade: ["Nota actual", "Current grade"],
  target: ["Objetivo", "Target"],
  earned: ["Puntos obtenidos", "Points earned"],
  possible: ["Puntos posibles", "Points possible"],
  rank: ["Posición", "Rank"],
  students: ["Total de estudiantes", "Total students"],
  completed: ["Completados", "Completed"],
  principal: ["Capital", "Principal", "$"],
  rate: ["Tasa anual", "Annual rate", "%"],
  months: ["Meses", "Months"],
  payment: ["Cuota mensual", "Monthly payment", "$"],
  income: ["Ingreso mensual", "Monthly income", "$"],
  debt: ["Deudas mensuales", "Monthly debts", "$"],
  paid: ["Total pagado", "Total paid", "$"],
  periods: ["Periodos por año", "Periods per year"],
  inflation: ["Inflación", "Inflation", "%"],
  contributions: ["Aportes realizados", "Contributions", "$"],
  days: ["Días", "Days"],
  weeks: ["Semanas", "Weeks"],
  hours: ["Horas", "Hours"],
  minutes: ["Minutos", "Minutes"],
  discount: ["Descuento", "Discount", "%"],
  tax: ["Impuesto", "Tax", "%"],
  markup: ["Markup", "Markup", "%"],
  km: ["Kilómetros", "Kilometers", "km"],
  kg: ["Kilogramos", "Kilograms", "kg"],
  celsius: ["Celsius", "Celsius", "°C"],
  sqm: ["Metros cuadrados", "Square meters", "m²"],
  liters: ["Litros", "Liters", "L"],
  kmh: ["Kilómetros por hora", "Kilometers per hour", "km/h"],
  gb: ["Gigabytes", "Gigabytes", "GB"],
  kj: ["Kilojulios", "Kilojoules", "kJ"],
  bar: ["Bar", "Bar", "bar"],
  map: ["Distancia en mapa", "Map distance"],
  scale: ["Escala", "Scale"],
  partA: ["Parte A", "Part A"],
  partB: ["Parte B", "Part B"],
  newWorkers: ["Nuevos trabajadores", "New workers"],
};
const fieldKeys: Record<string, string[]> = {
  porcentaje: [
    "percentage amount",
    "value total",
    "initial final",
    "initial final",
    "final percentage",
    "final percentage",
    "price cost",
    "price cost",
    "initial final years",
    "estimate actual",
  ],
  promedio: [
    "a b c",
    "value weight final",
    "a b c",
    "a b c",
    "a b c",
    "a b c",
    "a b c",
    "a b c",
    "value mean deviation",
    "a b c",
  ],
  "regla-de-tres": [
    "a b c",
    "a b c",
    "map scale",
    "price units",
    "budget price",
    "total partA partB",
    "distance time",
    "speed time",
    "distance speed",
    "workers time newWorkers",
  ],
  "calculadora-notas": [
    "a b c",
    "grade weight target",
    "grade weight final",
    "earned possible",
    "percentage",
    "initial final",
    "a b c",
    "grade target",
    "rank students",
    "completed total",
  ],
  prestamo: [
    "principal rate months",
    "principal rate years",
    "principal rate years",
    "principal rate",
    "payment",
    "debt income",
    "payment rate months",
    "principal rate payment months",
    "principal rate payment months",
    "paid principal",
  ],
  "interes-compuesto": [
    "principal rate years",
    "final rate years",
    "initial final years",
    "rate",
    "rate periods",
    "principal rate years",
    "final rate months",
    "rate inflation",
    "final contributions",
    "initial final",
  ],
  edad: [
    "years",
    "years",
    "years",
    "years",
    "years",
    "days",
    "days",
    "months",
    "weeks",
    "years",
  ],
  "diferencia-fechas": [
    "days",
    "days",
    "days",
    "days",
    "weeks",
    "months",
    "years",
    "days",
    "hours",
    "minutes",
  ],
  descuento: [
    "price discount",
    "price discount",
    "price final",
    "final discount",
    "price discount tax",
    "price discount tax",
    "total tax",
    "price cost",
    "cost markup",
    "total units",
  ],
  convertir: [
    "km",
    "kg",
    "celsius",
    "sqm",
    "liters",
    "kmh",
    "hours",
    "gb",
    "kj",
    "bar",
  ],
};
const formulaSets: Record<string, string[]> = {
  prestamo: [
    "P·r(1+r)ⁿ / ((1+r)ⁿ−1)",
    "P·r·t",
    "P(1+r·t)",
    "P·r/12",
    "cuota mensual·12/26",
    "deuda mensual/ingreso mensual",
    "A((1+r)ⁿ−1)/(r(1+r)ⁿ)",
    "P(1+r)ᵏ−A((1+r)ᵏ−1)/r",
    "P(1+r)ᵏ−A((1+r)ᵏ−1)/r",
    "total pagado−principal",
  ],
  "interes-compuesto": [
    "P(1+r)ᵗ",
    "FV/(1+r)ᵗ",
    "(FV/PV)^(1/t)−1",
    "ln(2)/ln(1+r)",
    "(1+r/n)ⁿ−1",
    "Peʳᵗ",
    "FV·r/((1+r)ⁿ−1)",
    "(1+nominal)/(1+inflación)−1",
    "valor final−aportes",
    "valor final/valor inicial−1",
  ],
  "calculadora-notas": [
    "Σnotas/n",
    "(objetivo−actual·peso cursado)/peso final",
    "Σ(nota·peso)/Σpesos",
    "obtenidos/posibles·100",
    "porcentaje/25",
    "(actual−anterior)/anterior",
    "(Σnotas−mínima)/(n−1)",
    "objetivo−actual",
    "(1−posición/total)·100",
    "completados/total·100",
  ],
  descuento: [
    "P(1−d)",
    "P·d",
    "(1−final/original)·100",
    "final/(1−d)",
    "P(1−d₁)(1−d₂)",
    "P(1−d)(1+t)",
    "total/(1+t)",
    "(precio−costo)/precio",
    "costo(1+markup)",
    "total/unidades",
  ],
};
const names: Record<string, Array<[string, string]>> = {
  porcentaje: [
    ["X% de una cantidad", "X% of an amount"],
    ["Qué porcentaje es X de Y", "What percentage is X of Y"],
    ["Aumento porcentual", "Percentage increase"],
    ["Disminución porcentual", "Percentage decrease"],
    ["Valor antes de un aumento", "Value before an increase"],
    ["Valor antes de un descuento", "Value before a discount"],
    ["Margen porcentual", "Percentage margin"],
    ["Markup sobre costo", "Markup on cost"],
    ["Crecimiento anual compuesto", "Compound annual growth"],
    ["Error porcentual", "Percentage error"],
  ],
  promedio: [
    ["Media aritmética", "Arithmetic mean"],
    ["Media ponderada", "Weighted mean"],
    ["Media geométrica", "Geometric mean"],
    ["Media armónica", "Harmonic mean"],
    ["Media cuadrática RMS", "Root mean square"],
    ["Mediana de tres", "Median of three"],
    ["Rango", "Range"],
    ["Desviación estándar", "Standard deviation"],
    ["Puntuación Z", "Z-score"],
    ["Media móvil", "Moving average"],
  ],
  "regla-de-tres": [
    ["Proporción directa", "Direct proportion"],
    ["Proporción inversa", "Inverse proportion"],
    ["Escala de mapa", "Map scale"],
    ["Precio unitario", "Unit price"],
    ["Cantidad por presupuesto", "Quantity for budget"],
    ["Reparto proporcional", "Proportional split"],
    ["Velocidad", "Speed"],
    ["Distancia", "Distance"],
    ["Tiempo", "Time"],
    ["Productividad combinada", "Combined productivity"],
  ],
  "calculadora-notas": [
    ["Promedio de notas", "Grade average"],
    ["Nota final necesaria", "Required final grade"],
    ["Nota ponderada", "Weighted grade"],
    ["Porcentaje de puntos", "Points percentage"],
    ["GPA aproximado", "Approximate GPA"],
    ["Mejora de nota", "Grade improvement"],
    ["Promedio sin la menor", "Average without lowest"],
    ["Puntos faltantes", "Missing points"],
    ["Percentil aproximado", "Approximate percentile"],
    ["Créditos aprobados", "Credits completed"],
  ],
  prestamo: [
    ["Cuota amortizada", "Amortized payment"],
    ["Interés simple", "Simple interest"],
    ["Total con interés simple", "Simple interest total"],
    ["Pago mensual solo intereses", "Monthly interest-only payment"],
    ["Pago quincenal", "Biweekly payment"],
    ["Relación deuda/ingreso", "Debt-to-income ratio"],
    ["Capital posible según cuota", "Affordable principal"],
    ["Saldo tras varios pagos", "Balance after payments"],
    ["Pago global final", "Balloon balance"],
    ["Costo financiero total", "Total finance cost"],
  ],
  "interes-compuesto": [
    ["Valor futuro", "Future value"],
    ["Valor presente", "Present value"],
    ["CAGR", "CAGR"],
    ["Tiempo de duplicación", "Doubling time"],
    ["Tasa efectiva anual", "Effective annual rate"],
    ["Capitalización continua", "Continuous compounding"],
    ["Aporte requerido", "Required contribution"],
    ["Tasa real con inflación", "Real return after inflation"],
    ["Interés generado", "Interest earned"],
    ["Crecimiento total", "Total growth"],
  ],
  edad: [
    ["Años a meses", "Years to months"],
    ["Años a semanas", "Years to weeks"],
    ["Años a días", "Years to days"],
    ["Años a horas", "Years to hours"],
    ["Años a minutos", "Years to minutes"],
    ["Días a años", "Days to years"],
    ["Días a meses", "Days to months"],
    ["Meses a años", "Months to years"],
    ["Semanas a años", "Weeks to years"],
    ["Edad en segundos", "Age in seconds"],
  ],
  "diferencia-fechas": [
    ["Días a semanas", "Days to weeks"],
    ["Días a horas", "Days to hours"],
    ["Días a minutos", "Days to minutes"],
    ["Días a segundos", "Days to seconds"],
    ["Semanas a días", "Weeks to days"],
    ["Meses a días aproximados", "Months to approximate days"],
    ["Años a días", "Years to days"],
    ["Días laborables aproximados", "Approximate business days"],
    ["Horas a días", "Hours to days"],
    ["Minutos a horas", "Minutes to hours"],
  ],
  descuento: [
    ["Precio con descuento", "Discounted price"],
    ["Ahorro obtenido", "Savings"],
    ["Descuento necesario", "Required discount"],
    ["Precio antes del descuento", "Price before discount"],
    ["Descuentos encadenados", "Stacked discounts"],
    ["Impuesto después del descuento", "Tax after discount"],
    ["Quitar impuesto incluido", "Remove included tax"],
    ["Margen de ganancia", "Profit margin"],
    ["Precio con markup", "Price with markup"],
    ["Precio por unidad", "Unit price"],
  ],
  convertir: [
    ["Kilómetros a millas", "Kilometers to miles"],
    ["Kilogramos a libras", "Kilograms to pounds"],
    ["Celsius a Fahrenheit", "Celsius to Fahrenheit"],
    ["m² a pies²", "m² to square feet"],
    ["Litros a galones", "Liters to gallons"],
    ["km/h a mph", "km/h to mph"],
    ["Horas a segundos", "Hours to seconds"],
    ["GB a MB", "GB to MB"],
    ["Kilojulios a kilocalorías", "Kilojoules to kilocalories"],
    ["Bar a PSI", "Bar to PSI"],
  ],
};
const generic = [
  (a: number, b: number) => (a * b) / 100,
  (a: number, b: number) => (a / b) * 100,
  (a: number, b: number) => ((b - a) / a) * 100,
  (a: number, b: number) => ((a - b) / a) * 100,
  (a: number, b: number) => a / (1 + b / 100),
  (a: number, b: number) => a / (1 - b / 100),
  (a: number, b: number) => ((a - b) / a) * 100,
  (a: number, b: number) => ((a - b) / b) * 100,
  (a: number, b: number, c: number) => (Math.pow(b / a, 1 / c) - 1) * 100,
  (a: number, b: number) => (Math.abs(a - b) / Math.abs(b)) * 100,
];
const mean = [
  (a: number, b: number, c: number) => (a + b + c) / 3,
  (a: number, b: number, c: number) => (a * b + c * (100 - b)) / 100,
  (a: number, b: number, c: number) => Math.cbrt(a * b * c),
  (a: number, b: number, c: number) => 3 / (1 / a + 1 / b + 1 / c),
  (a: number, b: number, c: number) => Math.sqrt((a * a + b * b + c * c) / 3),
  (a: number, b: number, c: number) => [a, b, c].sort((x, y) => x - y)[1],
  (a: number, b: number, c: number) => Math.max(a, b, c) - Math.min(a, b, c),
  (a: number, b: number, c: number) => {
    const m = (a + b + c) / 3;
    return Math.sqrt(((a - m) ** 2 + (b - m) ** 2 + (c - m) ** 2) / 3);
  },
  (a: number, b: number, c: number) => (a - b) / c,
  (a: number, b: number, c: number) => (a + b + c) / 3,
];
const proportion = [
  (a: number, b: number, c: number) => (b * c) / a,
  (a: number, b: number, c: number) => (a * b) / c,
  (a: number, b: number) => a * b,
  (a: number, b: number) => a / b,
  (a: number, b: number) => a / b,
  (a: number, b: number, c: number) => (a * b) / (b + c),
  (a: number, b: number) => a / b,
  (a: number, b: number) => a * b,
  (a: number, b: number) => a / b,
  (a: number, b: number, c: number) => (a * b) / c,
];
const grades = [
  mean[0],
  (a: number, b: number, c: number) => (c - a * (1 - b / 100)) / (b / 100),
  (a: number, b: number, c: number) => (a * b + c * (100 - b)) / 100,
  (a: number, b: number) => (a / b) * 100,
  (a: number) => Math.min(4, a / 25),
  (a: number, b: number) => ((b - a) / a) * 100,
  (a: number, b: number, c: number) => (a + b + c - Math.min(a, b, c)) / 2,
  (a: number, b: number) => Math.max(0, b - a),
  (a: number, b: number) => (1 - a / b) * 100,
  (a: number, b: number) => (a / b) * 100,
];
const loan = [
  (a: number, b: number, c: number) => {
    const r = b / 1200;
    return r ? (a * r * (1 + r) ** c) / ((1 + r) ** c - 1) : a / c;
  },
  (a: number, b: number, c: number) => ((a * b) / 100) * c,
  (a: number, b: number, c: number) => a * (1 + (b / 100) * c),
  (a: number, b: number) => (a * b) / 1200,
  (a: number) => (a * 12) / 26,
  (a: number, b: number) => (a / b) * 100,
  (a: number, b: number, c: number) => {
    const r = b / 1200;
    return r ? (a * ((1 + r) ** c - 1)) / (r * (1 + r) ** c) : a * c;
  },
  (a: number, b: number, c: number, d: number) => {
    const r = b / 1200;
    return r ? a * (1 + r) ** d - (c * ((1 + r) ** d - 1)) / r : a - c * d;
  },
  (a: number, b: number, c: number, d: number) => {
    const r = b / 1200;
    return r ? a * (1 + r) ** d - (c * ((1 + r) ** d - 1)) / r : a - c * d;
  },
  (a: number, b: number) => a - b,
];
const compound = [
  (a: number, b: number, c: number) => a * (1 + b / 100) ** c,
  (a: number, b: number, c: number) => a / (1 + b / 100) ** c,
  (a: number, b: number, c: number) => (Math.pow(b / a, 1 / c) - 1) * 100,
  (a: number) => Math.log(2) / Math.log(1 + a / 100),
  (a: number, b: number) => ((1 + a / 100 / b) ** b - 1) * 100,
  (a: number, b: number, c: number) => a * Math.exp((b / 100) * c),
  (a: number, b: number, c: number) => {
    const r = b / 1200;
    return r ? (a * r) / ((1 + r) ** c - 1) : a / c;
  },
  (a: number, b: number) => ((1 + a / 100) / (1 + b / 100)) * 100 - 100,
  (a: number, b: number) => a - b,
  (a: number, b: number) => (b / a - 1) * 100,
];
const timeFactors = [
  12,
  52.1429,
  365.2425,
  8765.82,
  525949.2,
  1 / 365.2425,
  1 / 30.4369,
  1 / 12,
  1 / 52.1429,
  31556952,
];
const dateFactors = [
  1 / 7,
  24,
  1440,
  86400,
  7,
  30.4369,
  365.2425,
  5 / 7,
  1 / 24,
  1 / 60,
];
const discount = [
  (a: number, b: number) => a * (1 - b / 100),
  (a: number, b: number) => (a * b) / 100,
  (a: number, b: number) => (1 - b / a) * 100,
  (a: number, b: number) => a / (1 - b / 100),
  (a: number, b: number, c: number) => a * (1 - b / 100) * (1 - c / 100),
  (a: number, b: number, c: number) => a * (1 - b / 100) * (1 + c / 100),
  (a: number, b: number) => a / (1 + b / 100),
  (a: number, b: number) => ((a - b) / a) * 100,
  (a: number, b: number) => a * (1 + b / 100),
  (a: number, b: number) => a / b,
];
const convertFactors = [
  0.621371, 2.20462262, 1, 10.7639, 0.264172, 0.621371, 3600, 1024, 0.239006,
  14.5038,
];
function build(slug: string): Op[] {
  const ns = names[slug] || [];
  let fs: CalcFn[] = generic;
  if (slug === "promedio") fs = mean;
  if (slug === "regla-de-tres") fs = proportion;
  if (slug === "calculadora-notas") fs = grades;
  if (slug === "prestamo") fs = loan;
  if (slug === "interes-compuesto") fs = compound;
  if (slug === "descuento") fs = discount;
  if (slug === "edad") fs = timeFactors.map((k) => (a: number) => a * k);
  if (slug === "diferencia-fechas")
    fs = dateFactors.map((k) => (a: number) => a * k);
  if (slug === "convertir")
    fs = convertFactors.map(
      (k, i) => (a: number) => (i === 2 ? (a * 9) / 5 + 32 : a * k),
    );
  return ns.map((x, i) => ({
    es: x[0],
    en: x[1],
    formula:
      formulaSets[slug]?.[i] ||
      [
        "a × b ÷ 100",
        "a ÷ b × 100",
        "(b − a) ÷ a",
        "(a − b) ÷ a",
        "a ÷ (1 + b%)",
        "a ÷ (1 − b%)",
        "(a − b) ÷ a",
        "(a − b) ÷ b",
        "(b/a)^(1/c) − 1",
        "|a − b| ÷ b",
      ][i] ||
      "f(a, b, c)",
    run: fs[i],
    fields: fieldKeys[slug][i].split(" "),
  }));
}
export default function AdvancedCalculations({ slug }: { slug: string }) {
  const { language } = useLanguage(),
    en = language === "en",
    list = build(slug);
  const [selected, setSelected] = useState(0),
    [values, setValues] = useState(["100", "20", "3", "12"]);
  if (!list.length) return null;
  const op = list[selected],
    nums = values.map(Number),
    requiredValues = nums.slice(0, op.fields.length),
    hasInvalidInput = requiredValues.some((v) => !Number.isFinite(v)),
    raw = hasInvalidInput
      ? Number.NaN
      : op.run(nums[0], nums[1], nums[2], nums[3]);
  const result = Number.isFinite(raw)
    ? raw.toLocaleString(undefined, { maximumFractionDigits: 4 })
    : en
      ? "Check the values"
      : "Revisa los valores";
  return (
    <section className="advanced-calculations">
      <div className="advanced-heading">
        <span className="kicker">
          <Beaker /> {en ? "Advanced tools" : "Herramientas avanzadas"}
        </span>
        <h2>
          {en ? "10 calculations in this module" : "10 cálculos en este módulo"}
        </h2>
        <p>
          {en
            ? "Choose an operation and get an instant result."
            : "Elige una operación y obtén el resultado al instante."}
        </p>
      </div>
      <div className="operation-picker">
        <select
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {list.map((o, i) => (
            <option value={i} key={o.es}>
              {i + 1}. {en ? o.en : o.es}
            </option>
          ))}
        </select>
        <ChevronDown />
      </div>
      <div className="advanced-workspace">
        <div className="advanced-fields">
          {op.fields.map((key, i) => {
            const text = fieldText[key] || [key, key];
            return (
              <label key={key + i}>
                <span>{text[en ? 1 : 0]}</span>
                <input
                  type="number"
                  value={values[i]}
                  aria-label={text[en ? 1 : 0]}
                  onChange={(e) =>
                    setValues(
                      values.map((x, j) => (j === i ? e.target.value : x)),
                    )
                  }
                />
                {text[2] && <small>{text[2]}</small>}
              </label>
            );
          })}
        </div>
        <div className="advanced-result">
          <small>{en ? "Instant result" : "Resultado instantáneo"}</small>
          <strong>{result}</strong>
          <code>{op.formula}</code>
        </div>
      </div>
      <div className="operation-tabs">
        {list.map((o, i) => (
          <button
            className={selected === i ? "active" : ""}
            onClick={() => setSelected(i)}
            key={o.es}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {en ? o.en : o.es}
          </button>
        ))}
      </div>
    </section>
  );
}
