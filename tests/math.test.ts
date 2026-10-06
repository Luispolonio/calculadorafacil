import { test } from "node:test";
import assert from "node:assert/strict";
import { parse } from "mathjs";
import { catalog } from "../lib/catalog";
import { solve, expression } from "../lib/math-engine";
import { generateExercise, type Difficulty } from "../lib/practice";
const defaults = (slug: string) =>
  Object.fromEntries(
    catalog.find((t) => t.slug === slug)!.fields.map((f) => [f.key, f.value]),
  );
const calculate = (slug: string, values: Record<string, string> = {}) =>
  solve(slug, { ...defaults(slug), ...values });
const approx = (a: number, b: number, eps = 1e-7) =>
  assert.ok(Math.abs(a - b) < eps, `${a} ≠ ${b}`);
for (const tool of catalog)
  test(`Ejemplo funcional: ${tool.title}`, () => {
    const r = calculate(tool.slug);
    assert.ok(r.answer.length > 0);
    assert.ok(r.steps.length > 0);
    assert.doesNotMatch(r.answer, /NaN|undefined|Infinity/);
  });
test("Ecuaciones: raíces lineales, cuadráticas, complejas, cúbicas y degeneradas", () => {
  assert.match(calculate("ecuaciones-lineales").answer, /4/);
  assert.match(
    calculate("ecuaciones-lineales", { a: "0", b: "0" }).answer,
    /Infinitas/,
  );
  assert.match(
    calculate("ecuaciones-lineales", { a: "0", b: "2" }).answer,
    /Sin solución/,
  );
  assert.match(calculate("ecuaciones-cuadraticas").answer, /2/);
  assert.match(calculate("ecuaciones-cuadraticas").answer, /3/);
  assert.equal(
    calculate("ecuaciones-cuadraticas", { a: "1", b: "0", c: "1" }).details[1]
      .value,
    "2",
  );
  assert.match(
    calculate("ecuaciones-cuadraticas", { a: "1", b: "0", c: "1" }).answer,
    /i/,
  );
  assert.equal(
    calculate("ecuaciones-cuadraticas", { a: "1", b: "-2", c: "1" }).details[1]
      .value,
    "1",
  );
  assert.match(
    calculate("ecuaciones-cuadraticas", { a: "0", b: "2", c: "-8" }).answer,
    /4/,
  );
  const cubic = calculate("ecuaciones-cubicas").answer;
  for (const n of [1, 2, 3]) assert.match(cubic, new RegExp(`= ${n}`));
});
test("Derivación con producto, cadena y órdenes superiores", () => {
  for (const [source, expected] of [
    ["sin(2*x)", 2 * Math.cos(0.6)],
    ["exp(x^2)", 0.6 * Math.exp(0.09)],
    ["x^3 - 3*x", 3 * 0.09 - 3],
  ] as const) {
    const r = calculate("derivadas", { expression: source });
    approx(parse(r.answer).evaluate({ x: 0.3 }), expected);
  }
  assert.equal(
    calculate("derivadas", { expression: "x^3", order: "3" }).answer,
    "6",
  );
});
test("Integrales compatibles verificadas por evaluación", () => {
  approx(Number(calculate("integrales", { mode: "Definida" }).answer), 12);
  approx(
    Number(
      calculate("integrales", {
        expression: "sin(2*x)",
        mode: "Definida",
        lower: "0",
        upper: String(Math.PI / 2),
      }).answer,
    ),
    1,
  );
  approx(
    Number(
      calculate("integrales", {
        expression: "1/x",
        mode: "Definida",
        lower: "1",
        upper: String(Math.E),
      }).answer,
    ),
    1,
  );
  approx(
    Number(
      calculate("integrales", {
        expression: "sqrt(x)",
        mode: "Definida",
        lower: "0",
        upper: "4",
      }).answer,
    ),
    16 / 3,
  );
  approx(
    Number(
      calculate("integrales", { mode: "Definida", lower: "2", upper: "0" })
        .answer,
    ),
    -12,
  );
  assert.throws(
    () =>
      calculate("integrales", {
        expression: "1/x",
        mode: "Definida",
        lower: "-1",
        upper: "1",
      }),
    /singularidad/,
  );
  assert.throws(
    () =>
      calculate("integrales", {
        expression: "x^-2",
        mode: "Definida",
        lower: "-1",
        upper: "1",
      }),
    /singularidad/,
  );
  assert.throws(
    () => calculate("integrales", { expression: "sin(x^2)" }),
    /alcance/,
  );
  assert.throws(
    () =>
      calculate("integrales", {
        expression: "sqrt(x)",
        mode: "Definida",
        lower: "-1",
        upper: "1",
      }),
    /dominio/,
  );
});
test("EDO RK4 converge a e y funciona con pasos negativos", () => {
  const r = calculate("ecuaciones-diferenciales", {
    expression: "y",
    end: "1",
  });
  approx(r.plot!.points.at(-1)!.y!, Math.E, 1e-7);
  const back = calculate("ecuaciones-diferenciales", {
    expression: "y",
    x0: "1",
    y0: String(Math.E),
    end: "0",
  });
  approx(back.plot!.points.at(-1)!.y!, 1, 1e-7);
});
test("Validación de expresiones evita asignaciones y acceso a funciones no permitidas", () => {
  for (const bad of [
    "x=2",
    "[1,2]",
    'import("x")',
    "random()",
    "factorial(50000)",
    "f(x)=x",
    "y+1",
    "x!",
    "x[0]",
  ])
    assert.throws(() => expression(bad));
  for (const good of [
    "sin(x)",
    "cos(x)+exp(x)",
    "pi*x",
    "2x",
    "sqrt(x)",
    "log(x)",
    "abs(x)",
  ])
    assert.doesNotThrow(() => expression(good));
});
test("Casos inválidos devuelven errores y no números engañosos", () => {
  for (const [slug, values] of [
    ["sistemas-lineales", { matrix: "1,2;2,4", vector: "1,3" }],
    ["triangulos", { a: "1", b: "2", c: "3" }],
    ["logaritmos", { base: "1" }],
    ["potencias-radicales", { base: "-4", exponent: "2" }],
    [
      "potencias-radicales",
      { base: "0", exponent: "0", operation: "Potencia" },
    ],
    ["probabilidad", { p: "1.5" }],
    ["estadistica", { data: "5", type: "Muestral" }],
    ["vectores", { u: "1,2", v: "1,2,3" }],
    ["regresion-lineal", { x: "1,1", y: "2,3" }],
    ["numeros-complejos", { c: "0", d: "0", operation: "Dividir" }],
    ["ecuaciones-lineales", { a: "" }],
    ["estadistica", { data: "1,,2" }],
  ] as [string, Record<string, string>][])
    assert.throws(() => calculate(slug, values), slug);
});
test("Resultados de álgebra, conjuntos, geometría y estadística", () => {
  assert.equal(calculate("inecuaciones").answer, "x ≥ 3");
  assert.equal(calculate("combinatoria").answer, "C(10, 3) = 120");
  assert.equal(calculate("teoria-numeros").answer, "mcd = 12");
  assert.equal(calculate("sucesiones").details[0].value, "155");
  assert.equal(calculate("matrices").answer, "det(A) = 5");
  assert.equal(calculate("estadistica").details[1].value, "8.8");
  assert.equal(calculate("regresion-lineal").details[0].value, "0.6");
  assert.equal(calculate("regresion-lineal").details[2].value, "0.6");
  assert.equal(
    calculate("probabilidad", { p: "0", k: "0" }).answer,
    "P(X = 0) = 1",
  );
  assert.equal(
    calculate("probabilidad", { p: "1", k: "10" }).answer,
    "P(X = 10) = 1",
  );
  assert.equal(calculate("conjuntos", { a: "", b: "" }).answer, "A ∪ B = ∅");
  assert.equal(
    calculate("conjuntos", { a: "1,1,2", b: "2,3" }).details[0].value,
    "{2}",
  );
});
for (const tool of catalog)
  test(`Test aleatorio válido: ${tool.title}`, () => {
    for (const difficulty of [
      "Inicial",
      "Intermedio",
      "Avanzado",
    ] as Difficulty[])
      for (let i = 0; i < 60; i++) {
        const e = generateExercise(tool.slug, difficulty);
        assert.equal(e.options.length, 4);
        assert.equal(new Set(e.options).size, 4);
        assert.equal(e.options.filter((x) => x === e.correct).length, 1);
        assert.ok(e.explanation);
        assert.doesNotMatch(e.question + e.correct, /NaN|undefined|Infinity/);
      }
  });
test("Ejercicios lineales tienen soluciones correctas, incluso negativas", () => {
  for (let i = 0; i < 100; i++) {
    const e = generateExercise("ecuaciones-lineales", "Avanzado");
    const match = e.question.match(/Resuelve (\d+)x \+ \((\d+)\) = (-?\d+)/)!;
    assert.equal(
      Number(e.correct),
      (Number(match[3]) - Number(match[2])) / Number(match[1]),
    );
  }
});
