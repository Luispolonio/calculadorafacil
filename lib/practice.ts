import { calculusExercise } from './calculus-practice';
import type { ExplanationStep } from './math-engine';
export type Exercise = {
  latex?:string;
  workedSteps?:ExplanationStep[];
  family?:string;
  verification?:{source:string;point?:number;order?:number;primitive?:string;lower?:number;upper?:number};
  topic: string;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};
export type Difficulty = "Inicial" | "Intermedio" | "Avanzado";
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const format = (n: number) => Number(n.toFixed(5)).toString();
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = random(0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
function numeric(
  topic: string,
  question: string,
  answer: number,
  explanation: string,
): Exercise {
  const correct = format(answer),
    options = new Set([correct]);
  for (let i = 0; options.size < 4; i++) {
    const delta = random(1, Math.max(3, Math.ceil(Math.abs(answer) * 0.4)));
    options.add(format(answer + (i % 2 ? -delta : delta)));
  }
  return {
    topic,
    question,
    correct,
    options: shuffle([...options]),
    explanation,
  };
}
function text(
  topic: string,
  question: string,
  correct: string,
  wrong: string[],
  explanation: string,
): Exercise {
  return {
    topic,
    question,
    correct,
    options: shuffle(
      [correct, ...wrong.filter((x) => x !== correct)].slice(0, 4),
    ),
    explanation,
  };
}
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
export function generateExercise(
  topic: string,
  difficulty: Difficulty,
): Exercise {
  const max =
      difficulty === "Inicial" ? 5 : difficulty === "Intermedio" ? 10 : 20,
    a = random(2, max),
    b = random(1, max),
    x = random(difficulty === "Inicial" ? 1 : -max, max);
  switch (topic) {
    case "ecuaciones-lineales":
      return numeric(
        topic,
        `Resuelve ${a}x + (${b}) = ${a * x + b}. ¿Cuánto vale x?`,
        x,
        `Resta ${b} en ambos lados: ${a}x = ${a * x}. Divide entre ${a}: x = ${x}.`,
      );
    case "ecuaciones-cuadraticas": {
      const p = random(1, max),
        q = p + random(1, 4);
      return numeric(
        topic,
        `¿Cuál es la raíz menor de x² − ${p + q}x + ${p * q} = 0?`,
        p,
        `Factoriza como (x − ${p})(x − ${q}) = 0. Las raíces son ${p} y ${q}; la menor es ${p}.`,
      );
    }
    case "ecuaciones-cubicas": {
      const p = random(1, max),
        q = p + 1,
        s = p + 2;
      return numeric(
        topic,
        `¿Cuál es la raíz mayor de x³ − ${p + q + s}x² + ${p * q + p * s + q * s}x − ${p * q * s} = 0?`,
        s,
        `El polinomio es (x − ${p})(x − ${q})(x − ${s}). Las raíces son ${p}, ${q} y ${s}.`,
      );
    }
    case "sistemas-lineales":
      return numeric(
        topic,
        `Si x + y = ${a + b} y x − y = ${a - b}, ¿cuánto vale x?`,
        a,
        `Suma las ecuaciones: 2x = ${2 * a}. Así x = ${a}; al sustituir, y = ${b}.`,
      );
    case "inecuaciones": {
      const correct = `x ≥ ${b}`;
      return text(
        topic,
        `Resuelve −${a}x + ${a * b} ≤ 0.`,
        correct,
        [`x ≤ ${b}`, `x > ${b}`, `x ≤ ${-b}`],
        `−${a}x ≤ −${a * b}. Al dividir entre −${a}, invierte el signo: x ≥ ${b}.`,
      );
    }
    case "numeros-complejos":
      return numeric(
        topic,
        `¿Cuál es la parte real de (${a} + ${b}i)(${a} − ${b}i)?`,
        a * a + b * b,
        `Son conjugados: (a+bi)(a−bi) = a²+b². ${a}²+${b}² = ${a * a + b * b}. La parte imaginaria se cancela.`,
      );
    case "matrices":
      return numeric(
        topic,
        `Calcula el determinante de la matriz [[${a}, ${b}], [1, ${a + 1}]].`,
        a * (a + 1) - b,
        `En una matriz 2×2, det = ad−bc = ${a}·${a + 1}−${b}·1 = ${a * (a + 1) - b}.`,
      );
    case "potencias-radicales":
      return numeric(
        topic,
        `¿Cuál es la raíz cúbica real de ${a ** 3}?`,
        a,
        `${a}³ = ${a ** 3}; por eso la raíz cúbica es ${a}.`,
      );
    case "logaritmos": {
      const p = random(2, difficulty === "Inicial" ? 3 : 5);
      return numeric(
        topic,
        `Calcula log en base ${a} de ${a ** p}.`,
        p,
        `El logaritmo busca el exponente. Como ${a}^${p} = ${a ** p}, el resultado es ${p}.`,
      );
    }
    case "derivadas":
    case "integrales":
      return calculusExercise(topic,difficulty);
    case "limites":
      return numeric(
        topic,
        `Calcula lim cuando x → ${b} de (x² − ${b * b}) / (x − ${b}).`,
        2 * b,
        `Factoriza x²−${b * b} = (x−${b})(x+${b}). Para x ≠ ${b}, se simplifica a x+${b}; su límite es ${2 * b}.`,
      );
    case "ecuaciones-diferenciales":
      return numeric(
        topic,
        `Si y′ = ${a} e y(0) = ${b}, ¿cuánto vale y(2)?`,
        2 * a + b,
        `Integra y′ = ${a}: y = ${a}x+C. La condición inicial da C = ${b}. Por tanto y(2) = ${2 * a + b}.`,
      );
    case "graficador":
      return numeric(
        topic,
        `La gráfica de f(x) = ${a}x − ${a * b} cruza el eje x. ¿En qué valor de x?`,
        b,
        `En el eje x, f(x) = 0. Resuelve ${a}x−${a * b} = 0: x = ${b}.`,
      );
    case "sucesiones": {
      const count = random(3, max + 2);
      return numeric(
        topic,
        `Una sucesión aritmética empieza en ${a} y aumenta ${b} por término. ¿Cuál es el término ${count}?`,
        a + (count - 1) * b,
        `aₙ = a₁+(n−1)d = ${a}+(${count}−1)·${b} = ${a + (count - 1) * b}.`,
      );
    }
    case "trigonometria": {
      const angle = [0, 30, 90, 180, 270][random(0, 4)] + 360 * random(-3,3),
        value = Number(Math.sin(angle * Math.PI / 180).toFixed(5));
      return text(
        topic,
        `¿Cuánto vale sen(${angle}°)?`,
        String(value),
        shuffle(
          ["0", "0.5", "1", "-1", "-0.5"].filter((x) => x !== String(value)),
        ).slice(0, 3),
        `En la circunferencia unitaria, seno es la coordenada vertical. Para ${angle}°, esa coordenada es ${value}.`,
      );
    }
    case "triangulos": {
      const scale = random(1, max);
      return numeric(
        topic,
        `Un triángulo rectángulo tiene catetos ${3 * scale} y ${4 * scale}. ¿Cuál es su área?`,
        6 * scale * scale,
        `Área = base·altura/2 = ${3 * scale}·${4 * scale}/2 = ${6 * scale * scale}.`,
      );
    }
    case "geometria":
      return numeric(
        topic,
        `Un círculo tiene radio ${a}. Si su área se escribe kπ, ¿cuánto vale k?`,
        a * a,
        `Área = πr² = π·${a}² = ${a * a}π. Así k = ${a * a}.`,
      );
    case "vectores":
      return numeric(
        topic,
        `Calcula el producto escalar de u = (${a}, ${b}) y v = (2, −1).`,
        2 * a - b,
        `u·v = ${a}·2 + ${b}·(−1) = ${2 * a - b}.`,
      );
    case "geometria-analitica":
      return numeric(
        topic,
        `¿Cuál es la pendiente de la recta que pasa por (0, ${b}) y (2, ${2 * a + b})?`,
        a,
        `m = (y₂−y₁)/(x₂−x₁) = (${2 * a + b}−${b})/2 = ${a}.`,
      );
    case "conjuntos": {
      const p = random(1, max),
        correct = `{${p + 1}, ${p + 2}}`;
      return text(
        topic,
        `A = {${p}, ${p + 1}, ${p + 2}} y B = {${p + 1}, ${p + 2}, ${p + 3}}. ¿Cuál es A ∩ B?`,
        correct,
        [`{${p}, ${p + 3}}`, `{${p}, ${p + 1}, ${p + 2}, ${p + 3}}`, "∅"],
        `La intersección contiene solo los elementos presentes en ambos conjuntos: ${p + 1} y ${p + 2}.`,
      );
    }
    case "combinatoria": {
      const count = random(4, Math.min(max + 3, 12));
      return numeric(
        topic,
        `¿Cuántas parejas distintas puedes elegir de ${count} personas, sin importar el orden?`,
        (count * (count - 1)) / 2,
        `C(${count},2) = ${count}·${count - 1}/2 = ${(count * (count - 1)) / 2}. Dividimos entre 2 porque el orden no importa.`,
      );
    }
    case "teoria-numeros":
      return numeric(
        topic,
        `Calcula el máximo común divisor de ${2 * a} y ${3 * a}.`,
        a,
        `Los números son 2·${a} y 3·${a}. Como mcd(2,3)=1, el máximo factor común es ${a}.`,
      );
    case "probabilidad": {
      const count = random(2, 5),
        k = random(0, count),
        ways = factorial(count) / (factorial(k) * factorial(count - k));
      return text(
        topic,
        `Lanzas una moneda equilibrada ${count} veces. ¿Cuál es la probabilidad de exactamente ${k} caras?`,
        `${ways}/${2 ** count}`,
        shuffle(
          [
            `1/${2 ** count}`,
            `${ways + 1}/${2 ** count}`,
            `${ways}/${2 ** count + 1}`,
            `${ways}/${2 ** count + 2}`,
          ].filter((x) => x !== `${ways}/${2 ** count}`),
        ).slice(0, 3),
        `Hay C(${count},${k}) = ${ways} secuencias favorables y 2^${count} = ${2 ** count} secuencias equiprobables.`,
      );
    }
    case "estadistica":
      return numeric(
        topic,
        `¿Cuál es la media de ${a}, ${a + b} y ${a + 2 * b}?`,
        a + b,
        `Suma los tres valores y divide entre 3: ${3 * a + 3 * b}/3 = ${a + b}.`,
      );
    case "regresion-lineal":
      return numeric(
        topic,
        `Los puntos (0, ${b}), (1, ${a + b}) y (2, ${2 * a + b}) están alineados. ¿Cuál es la pendiente de su recta de regresión?`,
        a,
        `Por cada incremento de 1 en x, y aumenta ${a}. El ajuste exacto es y = ${a}x + ${b}, con pendiente ${a}.`,
      );
    default:
      throw new Error("Tema de práctica no disponible.");
  }
}

export const randomTopic = (topics: string[]) =>
  topics[random(0, topics.length - 1)];
