import { normalizeExpression } from "./expression-input";
import { explainResult } from "./math-lessons";
import {
  parse,
  derivative,
  simplify,
  polynomialRoot,
  complex,
  add,
  subtract,
  multiply,
  divide,
  det,
  inv,
  transpose,
  lusolve,
  type MathNode,
  type OperatorNode,
  type FunctionNode,
  type ParenthesisNode,
} from "mathjs";
export type Inputs = Record<string, string>;
export type Point = { x: number; y: number | null };
export type Plot = {
  points: Point[];
  secondary?: Point[];
  label: string;
  secondaryLabel?: string;
  sources?: string[];
};
export type ExplanationStep = { title: string; explanation: string; latex?: string; check?: string };
export type Result = {
  latex?: string;
  workedSteps?: ExplanationStep[];
  answer: string;
  details: { label: string; value: string }[];
  steps: string[];
  note?: string;
  plot?: Plot;
  table?: { headers: string[]; rows: string[][] };
};
export const fmt = (n: number): string => {
  if (!Number.isFinite(n))
    throw new Error(
      "El cálculo excede el rango numérico o no está definido en los reales.",
    );
  return Number(n.toPrecision(10)).toString();
};
const num = (v: Inputs, key: string) => {
  if (!v[key]?.trim())
    throw new Error("Completa todos los campos numéricos necesarios.");
  const n = Number(v[key]);
  if (!Number.isFinite(n) || Math.abs(n) > 1e12)
    throw new Error(
      "Usa números finitos entre −10¹² y 10¹². Para decimales utiliza un punto.",
    );
  return n;
};
const integer = (n: number, min: number, max: number) => {
  if (!Number.isInteger(n) || n < min || n > max)
    throw new Error(`Se necesita un entero entre ${min} y ${max}.`);
  return n;
};
const list = (text: string, max = 500): number[] => {
  const parts = text.split(",");
  if (!text.trim() || parts.length > max || parts.some((p) => !p.trim()))
    throw new Error(
      `Introduce entre 1 y ${max} números separados por comas, sin elementos vacíos.`,
    );
  return parts.map((p) => num({ v: p }, "v"));
};
const matrix = (text: string) => {
  const rows = text.split(";").map((r) => list(r, 3));
  if (
    ![2, 3].includes(rows.length) ||
    rows.some((r) => r.length !== rows.length)
  )
    throw new Error("Introduce una matriz cuadrada 2×2 o 3×3: 2,1;3,4.");
  return rows;
};
const matrixText = (m: number[][]) =>
  m.map((row) => `[${row.map(fmt).join(", ")}]`).join("  ");
const detail = (label: string, value: string | number) => ({
  label,
  value: typeof value === "number" ? fmt(value) : value,
});
const unwrap = (n: MathNode): MathNode =>
  n.type === "ParenthesisNode" ? unwrap((n as ParenthesisNode).content) : n;
export function expression(text: string, variables = ["x"], generated = false): MathNode {
  if (!text.trim() || text.length > (generated ? 5000 : 160))
    throw new Error("Escribe una expresión de hasta 160 caracteres.");
  let node: MathNode;
  try {
    node = parse(normalizeExpression(text));
  } catch {
    throw new Error(
      "No se reconoce la expresión. Usa, por ejemplo, x^2 + sin(x).",
    );
  }
  let count = 0;
  node.traverse((n, path) => {
    if (++count > (generated ? 2000 : 90))
      throw new Error(
        "Simplifica la expresión: contiene demasiadas operaciones.",
      );
    if (n.type === "SymbolNode") {
      if (path !== "fn" && ![...variables, "pi", "e"].includes(n.toString()))
        throw new Error(`Variable o constante no admitida: ${n.toString()}.`);
    } else if (n.type === "FunctionNode") {
      const fn = n as FunctionNode;
      if (
        !["sin", "cos", "tan", "exp", "log", "sqrt", "abs", ...(generated ? ["sec", "csc", "cot", "sign"] : [])].includes(
          fn.fn.toString(),
        ) ||
        fn.args.length !== 1
      )
        throw new Error(
          "Usa sin, cos, tan, exp, log, sqrt o abs con un único argumento.",
        );
    } else if (n.type === "OperatorNode") {
      if (!["+", "-", "*", "/", "^"].includes((n as OperatorNode).op))
        throw new Error("Operación no admitida. Usa +, −, *, / y ^.");
    } else if (!["ConstantNode", "ParenthesisNode"].includes(n.type))
      throw new Error(
        "Solo se admiten expresiones matemáticas, sin asignaciones ni listas.",
      );
  });
  return node;
}
// Function names are visited as SymbolNodes by mathjs; keep their validation separate.
function realAt(node: MathNode, x: number, y?: number): number {
  const out: unknown = node.evaluate({ x, y });
  if (typeof out !== "number" || !Number.isFinite(out))
    throw new Error(
      "La función no está definida como número real finito en el intervalo.",
    );
  return out;
}
export function sample(node: MathNode, min = -6, max = 6): Point[] {
  const points: Point[] = [];
  for (let i = 0; i <= 320; i++) {
    const x = min + ((max - min) * i) / 320;
    try {
      const y = realAt(node, x);
      points.push({ x, y });
    } catch {
      points.push({ x, y: null });
    }
  }
  // Refine sign changes to distinguish a zero from a pole between samples.
  // A finite sample is never replaced by a decorative or clamped coordinate.
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    if (a.y === null || b.y === null || a.y * b.y >= 0) continue;
    let lo = a.x, hi = b.x, yl = a.y, yr = b.y;
    const scale = Math.max(Math.abs(yl), Math.abs(yr));
    try {
      for (let j = 0; j < 10; j++) {
        const mid = (lo + hi) / 2, ym = realAt(node, mid);
        if (ym === 0) break;
        if (Math.sign(ym) === Math.sign(yl)) { lo = mid; yl = ym; }
        else { hi = mid; yr = ym; }
      }
      if (Math.min(Math.abs(yl), Math.abs(yr)) > 2 * scale) b.y = null;
    } catch { b.y = null; }
  }
  return points;
}
const factorial = (n: number): bigint => {
  let r = 1n;
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return r;
};
const choose = (n: number, r: number): bigint =>
  factorial(n) / (factorial(r) * factorial(n - r));
function constant(n: MathNode): number | null {
  let dependent = false;
  n.traverse((child) => {
    if (child.type === "SymbolNode" && child.toString() === "x")
      dependent = true;
  });
  if (dependent) return null;
  try {
    const value = n.evaluate();
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}
type Primitive = {
  text: string;
  rules: string[];
  nonzero?: boolean;
  positive?: boolean;
};
function primitive(node: MathNode): Primitive {
  const n = unwrap(node);
  const c = constant(n);
  if (c !== null)
    return {
      text: `(${c})*x`,
      rules: ["Una constante k se integra como k·x."],
    };
  if (n.toString() === "x")
    return {
      text: "x^2/2",
      rules: ["Regla de potencia: ∫xⁿ dx = xⁿ⁺¹/(n+1), para n ≠ −1."],
    };
  if (n.type === "OperatorNode") {
    const op = n as OperatorNode,
      args = op.args;
    if (["+", "-"].includes(op.op)) {
      const p = args.map(primitive);
      return {
        text:
          p.length === 1
            ? `${op.op}(${p[0].text})`
            : `(${p[0].text})${op.op}(${p[1].text})`,
        rules: [
          "Linealidad: integra cada término conservando su signo.",
          ...p.flatMap((x) => x.rules),
        ],
        nonzero: p.some((x) => x.nonzero),
        positive: p.some((x) => x.positive),
      };
    }
    if (op.op === "*") {
      const left = constant(args[0]),
        right = constant(args[1]);
      if (left !== null || right !== null) {
        const p = primitive(left !== null ? args[1] : args[0]);
        return {
          ...p,
          text: `(${left ?? right})*(${p.text})`,
          rules: ["Extrae el factor constante de la integral.", ...p.rules],
        };
      }
    }
    if (op.op === "/") {
      const denominator = constant(args[1]);
      if (denominator !== null && denominator !== 0) {
        const p = primitive(args[0]);
        return { ...p, text: `(${p.text})/(${denominator})` };
      }
      const numerator = constant(args[0]);
      if (numerator !== null && unwrap(args[1]).toString() === "x")
        return {
          text: `(${numerator})*log(abs(x))`,
          rules: [
            "La primitiva de 1/x es ln|x| en intervalos que no contienen cero.",
          ],
          nonzero: true,
        };
    }
    if (op.op === "^" && unwrap(args[0]).toString() === "x") {
      const power = constant(args[1]);
      if (power !== null && Math.abs(power) <= 100) {
        if (power === -1)
          return {
            text: "log(abs(x))",
            rules: ["Para exponente −1, usa ∫1/x dx = ln|x|."],
            nonzero: true,
          };
        return {
          text: `x^(${power + 1})/(${power + 1})`,
          rules: [
            `Suma uno al exponente ${power} y divide entre ${power + 1}.`,
          ],
          nonzero: power < 0,
          positive: !Number.isInteger(power),
        };
      }
    }
  }
  if (n.type === "FunctionNode") {
    const fn = n as FunctionNode,
      name = fn.fn.toString();
    if (["sin", "cos", "exp"].includes(name)) {
      const slope = constant(derivative(fn.args[0], "x"));
      if (slope !== null && slope !== 0) {
        const arg = fn.args[0].toString();
        return {
          text: `${name === "sin" ? "-cos" : name === "cos" ? "sin" : "exp"}(${arg})/(${slope})`,
          rules: [
            `Sustitución lineal: integra ${name}(u) y divide entre u′ = ${slope}.`,
          ],
        };
      }
    }
    if (name === "sqrt" && unwrap(fn.args[0]).toString() === "x")
      return {
        text: "2*x^(1.5)/3",
        rules: ["Escribe √x como x^(1/2) y aplica la regla de potencia."],
        positive: true,
      };
  }
  throw new Error(
    "Esta integral no está dentro del alcance del motor. Consulta las familias admitidas bajo el campo de entrada. Escribe los polinomios desarrollados, como suma de potencias de la variable.",
  );
}
function solveCore(slug: string, v: Inputs): Result {
  const n = (key: string) => num(v, key);
  const r: Result = { answer: "", details: [], steps: [] };
  if (
    [
      "ecuaciones-lineales",
      "ecuaciones-cuadraticas",
      "ecuaciones-cubicas",
    ].includes(slug)
  ) {
    const order =
      slug === "ecuaciones-lineales"
        ? 1
        : slug === "ecuaciones-cuadraticas"
          ? 2
          : 3;
    const coefficients = ["a", "b", "c", "d"].slice(0, order + 1).map(n);
    while (coefficients.length > 1 && coefficients[0] === 0)
      coefficients.shift();
    if (coefficients.length === 1) {
      r.answer =
        coefficients[0] === 0 ? "Infinitas soluciones" : "Sin solución";
      r.steps = [
        `La ecuación se reduce a ${coefficients[0]} = 0.`,
        coefficients[0] === 0
          ? "La igualdad es cierta para cualquier valor de x."
          : "La igualdad es falsa para cualquier valor de x.",
      ];
      return r;
    }
    const degree = coefficients.length - 1;
    const coeffScale = Math.max(...coefficients.map(Math.abs));
    const normalized = coefficients.map((c) => c / coeffScale).reverse();
    const roots =
      degree === 1
        ? polynomialRoot(normalized[0], normalized[1])
        : degree === 2
          ? polynomialRoot(normalized[0], normalized[1], normalized[2])
          : polynomialRoot(
              normalized[0],
              normalized[1],
              normalized[2],
              normalized[3],
            );
    r.answer = roots
      .map(
        (root, i) =>
          `x${i + 1} = ${typeof root === "number" ? fmt(root) : `${fmt(root.re)} ${root.im < 0 ? "−" : "+"} ${fmt(Math.abs(root.im))}i`}`,
      )
      .join("   ·   ");
    r.details = [
      detail("Grado efectivo", degree),
      detail("Raíces distintas", roots.length),
    ];
    r.steps.push(
      `Ordena los términos: ${coefficients.map((c, i) => `(${c})x^${degree - i}`).join(" + ")} = 0.`,
    );
    if (degree === 1)
      r.steps.push(
        `Aísla x: ${coefficients[0]}x = ${-coefficients[1]}.`,
        `Divide entre ${coefficients[0]}: x = ${fmt(-coefficients[1] / coefficients[0])}.`,
      );
    if (degree === 2) {
      const [a, b, c] = coefficients,
        delta = b * b - 4 * a * c;
      r.steps.push(
        `Calcula Δ = b² − 4ac = ${fmt(delta)}.`,
        delta > 0
          ? "Δ > 0: hay dos raíces reales distintas."
          : delta === 0
            ? "Δ = 0: hay una raíz real doble."
            : "Δ < 0: hay dos raíces complejas conjugadas.",
        `Sustituye en x = (−(${b}) ± √(${fmt(delta)})) / (2·${a}).`,
      );
    }
    if (degree === 3) {
      const [a, b, c, d] = coefficients,
        p = (3 * a * c - b * b) / (3 * a * a),
        q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
      r.steps.push(
        `Normaliza y sustituye x = t − (${fmt(b / (3 * a))}) para eliminar el término cuadrático.`,
        `Obtén t³ + (${fmt(p)})t + (${fmt(q)}) = 0.`,
        "Aplica las fórmulas de la cúbica y deshaz la sustitución para obtener las raíces numéricas.",
      );
    }
    const source = parse(
      coefficients.map((c, i) => `(${c})*x^${degree - i}`).join("+"),
    );
    const realRoots = roots.flatMap((root) =>
      typeof root === "number"
        ? [root]
        : Math.abs(root.im) < 1e-9
          ? [root.re]
          : [],
    );
    const extent = Math.min(
      1000,
      Math.max(5, ...realRoots.map((x) => Math.abs(x) * 1.4)),
    );
    r.plot = {
      points: sample(source, -extent, extent),
      label: "Polinomio f(x)",
    sources: [source.toString()],
    };
    r.note =
      "Raíces numéricas redondeadas a 10 cifras significativas. Las raíces repetidas se muestran una sola vez.";
    return r;
  }
  switch (slug) {
    case "sistemas-lineales": {
      const a = matrix(v.matrix),
        b = list(v.vector, 3);
      if (a.length !== b.length)
        throw new Error("Debe haber un término independiente por cada fila.");
      if (
        Math.abs(det(a)) <=
        1e-12 * Math.max(...a.flat().map(Math.abs)) ** a.length
      )
        throw new Error(
          "La matriz es singular o casi singular: no se puede calcular una solución única fiable. Puede haber infinitas soluciones o ninguna.",
        );
      const scale = Math.max(...a.flat().map(Math.abs));
      const solution = lusolve(a.map(row => row.map(value => value / scale)), b.map(value => value / scale)) as number[][];
      r.answer = solution
        .map((row, i) => `${["x", "y", "z"][i]} = ${fmt(row[0])}`)
        .join(" · ");
      r.steps = [
        "Escribe el sistema en la forma Ax = b.",
        `El determinante es ${fmt(det(a))}; la matriz es invertible.`,
        "Resuelve mediante descomposición LU (eliminación con pivoteo).",
        "Comprueba cada fila sustituyendo la solución en las ecuaciones originales.",
      ];
      r.details = a.map((row, i) =>
        detail(
          `Comprobación fila ${i + 1}`,
          `${fmt(row.reduce((sum, x, j) => sum + x * solution[j][0], 0))} = ${b[i]}`,
        ),
      );
      break;
    }
    case "inecuaciones": {
      const a = n("a"),
        b = n("b");
      let relation = v.relation;
      if (!["<", "≤", ">", "≥"].includes(relation))
        throw new Error("Elige una relación válida.");
      if (a === 0) {
        const ok =
          relation === "<"
            ? b < 0
            : relation === "≤"
              ? b <= 0
              : relation === ">"
                ? b > 0
                : b >= 0;
        r.answer = ok ? "ℝ (todos los reales)" : "∅ (conjunto vacío)";
        r.steps = [
          `Sin término en x, comprueba ${b} ${relation} 0.`,
          `La desigualdad es ${ok ? "verdadera" : "falsa"} para todo x.`,
        ];
        break;
      }
      if (a < 0)
        relation = (
          { "<": ">", "≤": "≥", ">": "<", "≥": "≤" } as Record<string, string>
        )[relation];
      const root = fmt(-b / a),
        left = ["<", "≤"].includes(relation),
        closed = ["≤", "≥"].includes(relation);
      r.answer = `x ${relation} ${root}`;
      r.details = [
        detail(
          "Intervalo",
          left
            ? `(−∞, ${root}${closed ? "]" : ")"}`
            : `${closed ? "[" : "("}${root}, +∞)`,
        ),
      ];
      r.steps = [
        `Resta ${b} en ambos lados.`,
        `Divide entre ${a}${a < 0 ? " e invierte el sentido de la desigualdad" : ", conservando el sentido"}.`,
        `La solución es ${r.answer}.`,
      ];
      break;
    }
    case "derivadas": {
      const node = expression(v.expression),
        order = integer(n("order"), 1, 3);
      let current = node;
      r.steps = [`Parte de f(x) = ${node.toString()}.`];
      for (let i = 1; i <= order; i++) {
        current = derivative(current, "x");
        r.steps.push(`Derivada de orden ${i}: ${current.toString()}.`);
      }
      r.answer = current.toString();
      r.details = [detail("Variable", "x"), detail("Orden", order)];
      r.plot = {
        points: sample(node),
        secondary: sample(current),
        label: "f(x)",
        secondaryLabel: `Derivada de orden ${order}`,
      sources: [node.toString(), current.toString()],
      };
      r.note =
        "Se aplican reglas simbólicas de derivación. La gráfica es un muestreo en [−6, 6]; respeta el dominio de la función original.";
      break;
    }
    case "integrales": {
      const node = expression(v.expression),
        p = primitive(node),
        antiderivative = simplify(p.text);
      r.steps = [
        ...new Set(p.rules),
        `Primitiva: F(x) = ${antiderivative.toString()}.`,
      ];
      if (v.mode === "Definida") {
        const a = n("lower"),
          b = n("upper"),
          lo = Math.min(a, b),
          hi = Math.max(a, b);
        if ((p.nonzero && lo <= 0 && hi >= 0) || (p.positive && lo < 0))
          throw new Error(
            "El intervalo contiene una singularidad o sale del dominio real. Esta herramienta no evalúa integrales impropias.",
          );
        for (let i = 0; i <= 128; i++) realAt(node, lo + ((hi - lo) * i) / 128);
        const fa = realAt(antiderivative, a),
          fb = realAt(antiderivative, b);
        r.answer = fmt(fb - fa);
        r.steps.push(
          `Teorema fundamental: F(${b}) − F(${a}) = ${fmt(fb)} − (${fmt(fa)}) = ${r.answer}.`,
        );
        r.details = [detail("F(b)", fb), detail("F(a)", fa)];
      } else r.answer = `${antiderivative.toString()} + C`;
      r.plot = { points: sample(node), label: "Integrando f(x)", sources: [node.toString()] };
      r.note =
        "C es una constante arbitraria. Las integrales definidas representan área con signo; no necesariamente área geométrica.";
      break;
    }
    case "limites": {
      const node = expression(v.expression),
        a = n("point");
      const rows = [1e-1, 1e-2, 1e-3, 1e-4, 1e-5, 1e-6].map((h) => [
        fmt(h),
        ...[-1, 1].map((sign) => {
          try {
            return fmt(realAt(node, a + sign * h));
          } catch {
            return "No definido";
          }
        }),
      ]);
      r.answer = "Compara las aproximaciones laterales";
      r.table = { headers: ["Distancia h", "f(a − h)", "f(a + h)"], rows };
      r.steps = [
        `Acércate a x = ${a} desde ambos lados.`,
        "Reduce h progresivamente y compara las dos columnas.",
        "Si parecen acercarse al mismo número, ese valor es un candidato. La tabla no demuestra que el límite exista.",
      ];
      r.note =
        "Exploración numérica, no resolución simbólica. Las funciones oscilatorias y los errores de redondeo pueden producir conclusiones engañosas.";
      r.plot = { points: sample(node, a - 2, a + 2), label: "f(x)", sources: [node.toString()] };
      break;
    }
    case "ecuaciones-diferenciales": {
      const node = expression(v.expression, ["x", "y"]),
        x0 = n("x0"),
        y0 = n("y0"),
        end = n("end"),
        steps = integer(n("steps"), 10, 2000);
      if (x0 === end)
        throw new Error("El valor final de x debe diferir del inicial.");
      const h = (end - x0) / steps;
      let y = y0;
      const points: Point[] = [{ x: x0, y }];
      for (let i = 0; i < steps; i++) {
        const x = x0 + i * h,
          k1 = realAt(node, x, y),
          k2 = realAt(node, x + h / 2, y + (h * k1) / 2),
          k3 = realAt(node, x + h / 2, y + (h * k2) / 2),
          k4 = realAt(node, x + h, y + h * k3);
        y += (h * (k1 + 2 * k2 + 2 * k3 + k4)) / 6;
        if (!Number.isFinite(y) || Math.abs(y) > 1e12)
          throw new Error(
            "La aproximación diverge. Reduce el intervalo o revisa la ecuación y sus singularidades.",
          );
        points.push({ x: x0 + (i + 1) * h, y });
      }
      r.answer = `y(${end}) ≈ ${fmt(y)}`;
      r.details = [detail("Tamaño del paso h", h), detail("Pasos RK4", steps)];
      r.plot = { points, label: "Solución aproximada y(x)" };
      r.steps = [
        `Comienza en (${x0}, ${y0}) con h = ${fmt(h)}.`,
        "Calcula k₁=f(x,y), k₂=f(x+h/2,y+hk₁/2), k₃=f(x+h/2,y+hk₂/2), k₄=f(x+h,y+hk₃).",
        "Actualiza y ← y + h(k₁+2k₂+2k₃+k₄)/6 y avanza x en h.",
        `Repite ${steps} pasos. Compara con más pasos para explorar la estabilidad.`,
      ];
      r.note =
        "RK4 con paso fijo: no hay garantía de error ni detección completa de singularidades. No es adecuado para todas las EDO rígidas.";
      break;
    }
    case "graficador": {
      const node = expression(v.expression),
        min = n("min"),
        max = n("max");
      if (max <= min || max - min < 1e-8)
        throw new Error(
          "El extremo final debe ser mayor que el inicial, con un intervalo de al menos 10⁻⁸.",
        );
      const points = sample(node, min, max);
      if (!points.some((p) => p.y !== null))
        throw new Error(
          "No se encontraron valores reales representables en este intervalo.",
        );
      r.answer = `f(x) = ${node.toString()}`;
      r.plot = { points, label: "f(x)", sources: [node.toString()] };
      r.steps = [
        `Evalúa la función en 321 puntos de [${min}, ${max}].`,
        "Ubica cada par (x, f(x)) en los ejes y une segmentos sin saltos visibles.",
      ];
      r.note =
        "Los saltos se separan de forma heurística. El muestreo puede omitir discontinuidades o detalles pequeños.";
      break;
    }
    case "numeros-complejos": {
      const z = complex(n("a"), n("b")),
        w = complex(n("c"), n("d"));
      if (v.operation === "Dividir" && w.re === 0 && w.im === 0)
        throw new Error("No se puede dividir entre el complejo cero.");
      const out =
        v.operation === "Sumar"
          ? add(z, w)
          : v.operation === "Restar"
            ? subtract(z, w)
            : v.operation === "Dividir"
              ? divide(z, w)
              : multiply(z, w);
      r.answer = out.toString();
      r.details = [
        detail("|z₁|", Math.hypot(z.re, z.im)),
        detail("|z₂|", Math.hypot(w.re, w.im)),
      ];
      r.steps = [
        `Escribe z₁ = ${z.toString()} y z₂ = ${w.toString()}.`,
        "Opera las partes reales e imaginarias usando i² = −1. Para dividir, utiliza el conjugado del denominador.",
        `Resultado: ${r.answer}.`,
      ];
      break;
    }
    case "matrices": {
      const a = matrix(v.matrix),
        d = det(a);
      r.answer = `det(A) = ${fmt(d)}`;
      r.details = [detail("Transpuesta", matrixText(transpose(a)))];
      if (Math.abs(d) > 1e-12 * Math.max(...a.flat().map(Math.abs)) ** a.length)
        r.details.push(detail("Inversa", matrixText(inv(a))));
      else
        r.details.push(
          detail(
            "Inversa",
            "Singular o casi singular: no se calcula una inversa fiable.",
          ),
        );
      r.steps = [
        `Matriz de orden ${a.length}.`,
        a.length === 2
          ? `Determinante: (${a[0][0]})(${a[1][1]}) − (${a[0][1]})(${a[1][0]}) = ${fmt(d)}.`
          : "Calcula el determinante por eliminación.",
        "Intercambia filas y columnas para la transpuesta; calcula la inversa solo cuando la matriz es invertible.",
      ];
      break;
    }
    case "potencias-radicales": {
      const a = n("base"),
        b = n("exponent");
      let out: number;
      if (v.operation === "Raíz") {
        integer(b, 1, 1000);
        if (a < 0 && b % 2 === 0)
          throw new Error("Una raíz par de un número negativo no es real.");
        out = Math.sign(a) * Math.abs(a) ** (1 / b);
      } else {
        if (a === 0 && b === 0)
          throw new Error("0⁰ no está definido en esta herramienta.");
        out = a ** b;
      }
      r.answer = fmt(out);
      r.steps = [
        v.operation === "Raíz"
          ? `Busca el número real cuyo exponente ${b} produce ${a}.`
          : `Eleva ${a} al exponente ${b}.`,
        `Resultado numérico: ${r.answer}.`,
      ];
      break;
    }
    case "logaritmos": {
      const a = n("value"),
        b = n("base");
      if (a <= 0 || b <= 0 || b === 1)
        throw new Error(
          "El argumento y la base deben ser positivos, y la base distinta de 1.",
        );
      r.answer = fmt(Math.log(a) / Math.log(b));
      r.steps = [
        `Aplica cambio de base: log_${b}(${a}) = ln(${a}) / ln(${b}).`,
        `Divide ${fmt(Math.log(a))} entre ${fmt(Math.log(b))}.`,
      ];
      break;
    }
    case "sucesiones": {
      const a = n("first"),
        d = n("ratio"),
        count = integer(n("n"), 1, 10000),
        arith = v.type === "Aritmética";
      const last = arith ? a + (count - 1) * d : a * d ** (count - 1),
        sum = arith
          ? (count * (a + last)) / 2
          : d === 1
            ? count * a
            : (a * (1 - d ** count)) / (1 - d);
      r.answer = `a${count} = ${fmt(last)}`;
      r.details = [detail("Suma de términos", sum)];
      r.steps = [
        arith ? "Usa aₙ = a₁ + (n−1)d." : "Usa aₙ = a₁rⁿ⁻¹.",
        arith
          ? "Suma con Sₙ = n(a₁+aₙ)/2."
          : d === 1
            ? "Como r = 1, Sₙ = n·a₁."
            : "Suma con Sₙ = a₁(1−rⁿ)/(1−r).",
      ];
      break;
    }
    case "trigonometria": {
      const a = n("angle"),
        rad = v.unit === "Grados" ? (a * Math.PI) / 180 : a;
      r.answer = `sen(θ) = ${fmt(Math.sin(rad))}`;
      r.details = [
        detail("Coseno", Math.cos(rad)),
        detail(
          "Tangente",
          Math.abs(Math.cos(rad)) < 1e-12
            ? "No definida (o demasiado cerca de un polo)"
            : fmt(Math.tan(rad)),
        ),
        detail("Radianes", rad),
        detail("Grados", (rad * 180) / Math.PI),
      ];
      r.steps = [
        "Convierte grados a radianes multiplicando por π/180 cuando corresponda.",
        "Evalúa seno y coseno en la circunferencia unitaria.",
        "Calcula tangente = seno/coseno si el denominador no es cero.",
      ];
      break;
    }
    case "triangulos": {
      const a = n("a"),
        b = n("b"),
        c = n("c");
      if (Math.min(a, b, c) <= 0 || a + b <= c || a + c <= b || b + c <= a)
        throw new Error(
          "Los lados deben ser positivos y cumplir la desigualdad triangular estricta.",
        );
      const s = (a + b + c) / 2,
        angle = (a: number, b: number, c: number) =>
          (Math.acos(
            Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c))),
          ) *
            180) /
          Math.PI;
      r.answer = `Área = ${fmt(Math.sqrt(s * (s - a) * (s - b) * (s - c)))}`;
      r.details = [
        detail("Perímetro", 2 * s),
        detail("Ángulo A", `${fmt(angle(a, b, c))}°`),
        detail("Ángulo B", `${fmt(angle(b, a, c))}°`),
        detail("Ángulo C", `${fmt(angle(c, a, b))}°`),
      ];
      r.steps = [
        `Semiperímetro s = (a+b+c)/2 = ${fmt(s)}.`,
        "Aplica Herón: área = √(s(s−a)(s−b)(s−c)).",
        "Obtén cada ángulo con la ley de cosenos.",
      ];
      break;
    }
    case "geometria": {
      const radius = n("radius");
      if (radius <= 0) throw new Error("El radio debe ser positivo.");
      const area = Math.PI * radius ** 2;
      r.details = [detail("Radio", radius)];
      if (v.shape === "Círculo") {
        r.answer = `Área = ${fmt(area)}`;
        r.details.push(detail("Perímetro", 2 * Math.PI * radius));
        r.steps = ["Área = πr².", "Perímetro = 2πr."];
      } else if (v.shape === "Esfera") {
        r.answer = `Volumen = ${fmt((4 * Math.PI * radius ** 3) / 3)}`;
        r.details.push(detail("Área superficial", 4 * area));
        r.steps = ["Volumen = 4πr³/3.", "Área superficial = 4πr²."];
      } else {
        const h = n("height");
        if (h <= 0) throw new Error("La altura debe ser positiva.");
        const cone = v.shape === "Cono";
        r.answer = `Volumen = ${fmt((area * h) / (cone ? 3 : 1))}`;
        r.details.push(
          detail(
            "Área total",
            cone
              ? Math.PI * radius * (radius + Math.hypot(radius, h))
              : 2 * Math.PI * radius * (radius + h),
          ),
        );
        r.steps = [
          cone ? "Volumen = πr²h/3." : "Volumen = πr²h.",
          "El área total incluye la base o bases y la superficie lateral.",
        ];
      }
      r.note =
        "Usa una única unidad de longitud. Área en unidades cuadradas y volumen en unidades cúbicas.";
      break;
    }
    case "vectores": {
      const u = list(v.u, 3),
        w = list(v.v, 3);
      if (u.length !== w.length || u.length < 2)
        throw new Error("Usa dos vectores de igual dimensión, 2 o 3.");
      const dot = u.reduce((s, x, i) => s + x * w[i], 0),
        nu = Math.hypot(...u),
        nv = Math.hypot(...w);
      r.answer = `u · v = ${fmt(dot)}`;
      r.details = [
        detail("u + v", u.map((x, i) => fmt(x + w[i])).join(", ")),
        detail("‖u‖", nu),
        detail("‖v‖", nv),
        detail(
          "Ángulo",
          nu && nv
            ? `${fmt((Math.acos(Math.max(-1, Math.min(1, dot / (nu * nv)))) * 180) / Math.PI)}°`
            : "No definido para el vector cero",
        ),
      ];
      if (u.length === 3)
        r.details.push(
          detail(
            "u × v",
            [
              u[1] * w[2] - u[2] * w[1],
              u[2] * w[0] - u[0] * w[2],
              u[0] * w[1] - u[1] * w[0],
            ]
              .map(fmt)
              .join(", "),
          ),
        );
      r.steps = [
        "Multiplica componentes correspondientes y suma para obtener el producto escalar.",
        "Calcula las normas con la raíz de la suma de cuadrados.",
        "Si ambas normas son positivas, usa θ = arccos((u·v)/(‖u‖‖v‖)).",
      ];
      break;
    }
    case "geometria-analitica": {
      const a = n("x1"),
        b = n("y1"),
        c = n("x2"),
        d = n("y2");
      r.answer = `Distancia = ${fmt(Math.hypot(c - a, d - b))}`;
      r.details = [
        detail("Punto medio", `(${fmt((a + c) / 2)}, ${fmt((b + d) / 2)})`),
        detail(
          "Recta",
          a === c
            ? b === d
              ? "No hay una recta única"
              : `x = ${a}`
            : `y = (${fmt((d - b) / (c - a))})x + (${fmt(b - (a * (d - b)) / (c - a))})`,
        ),
      ];
      r.steps = [
        "Aplica la fórmula de distancia euclídea.",
        "Promedia las coordenadas para obtener el punto medio.",
        "Calcula la pendiente si las coordenadas x son distintas.",
      ];
      break;
    }
    case "conjuntos": {
      const set = (s: string) => [
        ...new Set(
          s
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean),
        ),
      ];
      const a = set(v.a),
        b = set(v.b);
      if (
        a.length > 40 ||
        b.length > 40 ||
        [...a, ...b].some((x) => x.length > 30)
      )
        throw new Error(
          "Usa hasta 40 elementos por conjunto, de 30 caracteres como máximo.",
        );
      const show = (s: string[]) => (s.length ? `{${s.join(", ")}}` : "∅");
      const union = [...new Set([...a, ...b])],
        intersection = a.filter((x) => b.includes(x));
      r.answer = `A ∪ B = ${show(union)}`;
      r.details = [
        detail("A ∩ B", show(intersection)),
        detail("A ∖ B", show(a.filter((x) => !b.includes(x)))),
        detail("B ∖ A", show(b.filter((x) => !a.includes(x)))),
        detail("A △ B", show(union.filter((x) => !intersection.includes(x)))),
        detail("|A × B|", a.length * b.length),
      ];
      r.steps = [
        "Elimina duplicados: un conjunto cuenta cada elemento una sola vez.",
        "Reúne todos los elementos para la unión y conserva los comunes para la intersección.",
        "Para las diferencias, conserva los elementos exclusivos del conjunto indicado.",
      ];
      break;
    }
    case "combinatoria": {
      const a = integer(n("n"), 0, 100),
        b = integer(n("r"), 0, a);
      r.answer = `C(${a}, ${b}) = ${choose(a, b).toString()}`;
      r.details = [
        detail("Variaciones", String(factorial(a) / factorial(a - b))),
        detail("Permutaciones n!", String(factorial(a))),
      ];
      r.steps = [
        `Combinaciones: ${a}! / (${b}! · ${a - b}!).`,
        `Variaciones: ${a}! / ${a - b}!.`,
        "Cuenta sin repetición. Las combinaciones no distinguen el orden; las variaciones sí.",
      ];
      break;
    }
    case "teoria-numeros": {
      const a = integer(n("a"), 1, 1000000),
        b = integer(n("b"), 1, 1000000);
      let x = a,
        y = b;
      while (y) {
        const rem = x % y;
        r.steps.push(`${x} = ${Math.floor(x / y)} × ${y} + ${rem}.`);
        x = y;
        y = rem;
      }
      const factors = (n: number) => {
        const out: string[] = [];
        for (let p = 2; p * p <= n; p++) {
          let count = 0;
          while (n % p === 0) {
            count++;
            n /= p;
          }
          if (count) out.push(count > 1 ? `${p}^${count}` : String(p));
        }
        if (n > 1) out.push(String(n));
        return out.join(" × ") || "1 (sin factores primos)";
      };
      r.answer = `mcd = ${x}`;
      r.details = [
        detail("mcm", (a / x) * b),
        detail(`Factores de ${a}`, factors(a)),
        detail(`Factores de ${b}`, factors(b)),
      ];
      break;
    }
    case "probabilidad": {
      const a = integer(n("n"), 0, 200),
        k = integer(n("k"), 0, a),
        p = n("p");
      if (p < 0 || p > 1)
        throw new Error("La probabilidad p debe estar entre 0 y 1.");
      const pmf = (i: number) =>
        p === 0
          ? i === 0
            ? 1
            : 0
          : p === 1
            ? i === a
              ? 1
              : 0
            : Number(choose(a, i)) * p ** i * (1 - p) ** (a - i);
      r.answer = `P(X = ${k}) = ${fmt(pmf(k))}`;
      r.details = [
        detail(
          `P(X ≤ ${k})`,
          Math.min(
            1,
            Array.from({ length: k + 1 }, (_, i) => pmf(i)).reduce(
              (s, x) => s + x,
              0,
            ),
          ),
        ),
        detail("Media", a * p),
        detail("Varianza", a * p * (1 - p)),
      ];
      r.steps = [
        `Calcula C(${a},${k}) = ${choose(a, k)}.`,
        `Multiplica por p^${k} y (1−p)^${a - k}.`,
        "Para la acumulada, suma las probabilidades desde 0 hasta k.",
      ];
      break;
    }
    case "estadistica": {
      const data = list(v.data),
        sorted = [...data].sort((a, b) => a - b),
        count = data.length,
        mean = data.reduce((s, x) => s + x, 0) / count,
        middle = Math.floor(count / 2),
        median =
          count % 2
            ? sorted[middle]
            : (sorted[middle - 1] + sorted[middle]) / 2;
      const denominator = v.type === "Muestral" ? count - 1 : count;
      if (!denominator)
        throw new Error("La varianza muestral necesita al menos dos datos.");
      const variance =
        data.reduce((s, x) => s + (x - mean) ** 2, 0) / denominator;
      r.answer = `Media = ${fmt(mean)}`;
      r.details = [
        detail("Mediana", median),
        detail(`Varianza ${v.type.toLowerCase()}`, variance),
        detail("Desviación estándar", Math.sqrt(variance)),
        detail("Mínimo", sorted[0]),
        detail("Máximo", sorted[count - 1]),
        detail("Cantidad", count),
      ];
      r.steps = [
        `Suma los ${count} valores y divide entre ${count} para la media.`,
        "Ordena los valores y localiza el centro para la mediana.",
        `Suma (xᵢ − media)² y divide entre ${denominator} para la varianza.`,
        "La raíz de la varianza es la desviación estándar.",
      ];
      break;
    }
    case "regresion-lineal": {
      const x = list(v.x),
        y = list(v.y);
      if (x.length !== y.length || x.length < 2)
        throw new Error(
          "Introduce al menos dos pares, con igual cantidad de valores x e y.",
        );
      const mx = x.reduce((s, v) => s + v, 0) / x.length,
        my = y.reduce((s, v) => s + v, 0) / y.length,
        sxx = x.reduce((s, v) => s + (v - mx) ** 2, 0);
      if (sxx === 0)
        throw new Error(
          "Los valores de x deben incluir al menos dos valores distintos.",
        );
      const m = x.reduce((s, v, i) => s + (v - mx) * (y[i] - my), 0) / sxx,
        b = my - m * mx,
        sse = x.reduce((s, v, i) => s + (y[i] - (m * v + b)) ** 2, 0),
        sst = y.reduce((s, v) => s + (v - my) ** 2, 0);
      r.answer = `ŷ = (${fmt(m)})x + (${fmt(b)})`;
      r.details = [
        detail("Pendiente", m),
        detail("Intercepto", b),
        detail(
          "R²",
          sst === 0 ? "No definido: y es constante" : fmt(1 - sse / sst),
        ),
      ];
      r.steps = [
        "Calcula las medias de x e y.",
        "Pendiente = Σ(x−media x)(y−media y) / Σ(x−media x)².",
        "Intercepto = media y − pendiente · media x.",
        "R² = 1 − error residual / variación total de y.",
      ];
      break;
    }
    default:
      throw new Error("Herramienta no disponible.");
  }
  return r;
}

export function solve(slug: string, values: Inputs): Result {
 const result = solveCore(slug, values);
 return explainResult(slug, values, result);
}
