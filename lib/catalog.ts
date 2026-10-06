export type Category =
  | "Todas"
  | "Álgebra"
  | "Cálculo"
  | "Geometría"
  | "Matemática discreta"
  | "Estadística";
export type Field = {
  key: string;
  label: string;
  value: string;
  help?: string;
  options?: string[];
};
export type Tool = {
  slug: string;
  title: string;
  category: Category;
  symbol: string;
  description: string;
  fields: Field[];
  theory: string;
  example: string;
  caution: string;
};
const f = (
  key: string,
  label: string,
  value: string,
  help?: string,
): Field => ({ key, label, value, help });
const choice = (
  key: string,
  label: string,
  value: string,
  options: string[],
): Field => ({ key, label, value, options });
export const categories: Category[] = [
  "Todas",
  "Álgebra",
  "Cálculo",
  "Geometría",
  "Matemática discreta",
  "Estadística",
];
export const catalog: Tool[] = [
  {
    slug: "ecuaciones-lineales",
    title: "Ecuaciones de primer grado",
    category: "Álgebra",
    symbol: "x",
    description: "Despeja la incógnita y comprueba la solución de ax + b = 0.",
    fields: [f("a", "Coeficiente a", "3"), f("b", "Término b", "-12")],
    theory:
      "Una ecuación lineal tiene la forma \\(ax+b=0\\). Si a es distinto de cero, restamos b en ambos lados y dividimos entre a: \\(x=-\\frac{b}{a}\\). Si \\(a=0\\), ya no hay una incógnita efectiva: \\(b=0\\) es una identidad y \\(b\\ne0\\) es una contradicción.",
    example:
      "Para \\(3x-12=0\\), sumamos 12 y obtenemos \\(3x=12\\). Al dividir entre 3, \\(x=4\\). Sustitución: \\(3(4)-12=0\\).",
    caution:
      "Introduce todos los términos en el lado izquierdo. En \\(3x=12\\), el término b es −12, no 12.",
  },
  {
    slug: "ecuaciones-cuadraticas",
    title: "Ecuaciones de segundo grado",
    category: "Álgebra",
    symbol: "x²",
    description: "Encuentra raíces reales o complejas con la fórmula general.",
    fields: [
      f("a", "Coeficiente a", "1"),
      f("b", "Coeficiente b", "-5"),
      f("c", "Término c", "6"),
    ],
    theory:
      "Para \\(ax^2+bx+c=0\\), el discriminante \\(\\Delta=b^2-4ac\\) determina el tipo de raíces. Si \\(\\Delta>0\\) hay dos raíces reales; si \\(\\Delta=0\\) hay una raíz doble; si \\(\\Delta<0\\) hay dos raíces complejas conjugadas. La fórmula es \\(x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}\\).",
    example:
      "\\(x^2-5x+6=0\\) tiene \\(\\Delta=25-24=1\\). Las raíces son \\(\\frac{5-1}{2}=2\\) y \\(\\frac{5+1}{2}=3\\). La factorización es \\((x-2)(x-3)\\).",
    caution:
      "Una raíz doble se muestra una sola vez. Si \\(a=0\\), la ecuación se resuelve como lineal.",
  },
  {
    slug: "ecuaciones-cubicas",
    title: "Ecuaciones de tercer grado",
    category: "Álgebra",
    symbol: "x³",
    description: "Resuelve polinomios cúbicos y visualiza sus raíces reales.",
    fields: [
      f("a", "Coeficiente a", "1"),
      f("b", "Coeficiente b", "-6"),
      f("c", "Coeficiente c", "11"),
      f("d", "Término d", "-6"),
    ],
    theory:
      "La sustitución \\(x=t-\\frac{b}{3a}\\) transforma \\(ax^3+bx^2+cx+d=0\\) en \\(t^3+pt+q=0\\). El método de Cardano y su variante trigonométrica permiten calcular las raíces. Una cúbica con coeficientes reales siempre tiene al menos una raíz real.",
    example:
      "\\(x^3-6x^2+11x-6=(x-1)(x-2)(x-3)\\). Sus tres raíces son 1, 2 y 3; la curva cruza el eje horizontal en esos puntos.",
    caution:
      "Los resultados son aproximaciones numéricas. Raíces muy cercanas y coeficientes de escalas muy diferentes pueden perder precisión.",
  },
  {
    slug: "sistemas-lineales",
    title: "Sistemas de ecuaciones",
    category: "Álgebra",
    symbol: "{x,y}",
    description: "Resuelve sistemas de dos o tres incógnitas por eliminación.",
    fields: [
      f(
        "matrix",
        "Matriz de coeficientes",
        "2,1;1,-1",
        "Separa columnas con comas y filas con ;. Matrices \\(2\\times2\\) o \\(3\\times3\\).",
      ),
      f(
        "vector",
        "Términos independientes",
        "7,2",
        "Un valor por ecuación, separados por comas.",
      ),
    ],
    theory:
      "Un sistema lineal se escribe \\(A\\mathbf{x}=\\mathbf{b}\\). La eliminación de Gauss transforma su matriz ampliada mediante operaciones que conservan las soluciones. Un pivote en cada columna permite obtener una solución única; una fila nula o incompatible requiere analizar el rango.",
    example:
      "\\(2x+y=7\\) y \\(x-y=2\\) dan \\(3x=9\\) al sumar las ecuaciones. Por tanto \\(x=3\\) e \\(y=1\\).",
    caution:
      "Esta herramienta calcula soluciones únicas. Los sistemas singulares se identifican y no se presentan como si tuvieran una única respuesta.",
  },
  {
    slug: "inecuaciones",
    title: "Inecuaciones lineales",
    category: "Álgebra",
    symbol: "≤",
    description: "Resuelve desigualdades y expresa la solución en intervalos.",
    fields: [
      f("a", "Coeficiente a", "-2"),
      f("b", "Término b", "6"),
      choice("relation", "Relación con cero", "≤", ["<", "≤", ">", "≥"]),
    ],
    theory:
      "Una inecuación \\(ax+b\\le0\\) se resuelve aislando x. Al dividir entre un número negativo, el sentido de la desigualdad se invierte. Los signos estrictos excluyen el extremo, mientras \\(\\le\\) y \\(\\ge\\) lo incluyen.",
    example:
      "\\(-2x+6\\le0\\) implica \\(-2x\\le-6\\). Al dividir entre −2 cambiamos el sentido: \\(x\\ge3\\). El intervalo es \\([3,+\\infty)\\).",
    caution:
      "No olvides invertir el signo cuando el coeficiente a es negativo. Esta herramienta trata inecuaciones lineales de una variable.",
  },
  {
    slug: "numeros-complejos",
    title: "Números complejos",
    category: "Álgebra",
    symbol: "a+bi",
    description: "Suma, multiplica o divide complejos y calcula su módulo.",
    fields: [
      f("a", "Parte real de \\(z_1\\)", "3"),
      f("b", "Parte imaginaria de \\(z_1\\)", "4"),
      f("c", "Parte real de \\(z_2\\)", "1"),
      f("d", "Parte imaginaria de \\(z_2\\)", "-2"),
      choice("operation", "Operación", "Multiplicar", [
        "Sumar",
        "Restar",
        "Multiplicar",
        "Dividir",
      ]),
    ],
    theory:
      "Un número complejo \\(z=a+bi\\) combina una parte real y una imaginaria, con \\(i^2=-1\\). Su módulo es \\(\\sqrt{a^2+b^2}\\). Para dividir complejos se multiplica numerador y denominador por el conjugado del denominador.",
    example:
      "\\((3+4i)(1-2i)=3-6i+4i-8i^2=11-2i\\). El módulo de \\(3+4i\\) es 5.",
    caution:
      "No se puede dividir entre \\(0+0i\\). Las partes real e imaginaria deben ser números finitos.",
  },
  {
    slug: "matrices",
    title: "Matrices y determinantes",
    category: "Álgebra",
    symbol: "[A]",
    description: "Calcula determinante, transpuesta e inversa de matrices.",
    fields: [
      f(
        "matrix",
        "Matriz cuadrada",
        "2,1;3,4",
        "Admite \\(2\\times2\\) y \\(3\\times3\\). Columnas con comas; filas con punto y coma.",
      ),
    ],
    theory:
      "El determinante indica si una matriz cuadrada tiene inversa: \\(\\det(A)\\ne0\\) es la condición de invertibilidad. En una matriz \\(2\\times2\\), \\(\\det(A)=ad-bc\\). La transpuesta intercambia filas y columnas.",
    example:
      "Para \\(A=\\begin{pmatrix}2&1\\\\3&4\\end{pmatrix}\\), \\(\\det(A)=8-3=5\\). Su inversa es \\(\\frac15\\begin{pmatrix}4&-1\\\\-3&2\\end{pmatrix}\\). Multiplicar A por esa inversa produce la identidad.",
    caution:
      "Las matrices con determinante cero no tienen inversa. Cerca de la singularidad, el cálculo numérico puede perder precisión.",
  },
  {
    slug: "potencias-radicales",
    title: "Potencias y radicales",
    category: "Álgebra",
    symbol: "ⁿ√x",
    description:
      "Explora potencias y raíces reales, incluyendo raíces impares.",
    fields: [
      f("base", "Base o radicando", "27"),
      f("exponent", "Exponente o índice", "3"),
      choice("operation", "Operación", "Raíz", ["Potencia", "Raíz"]),
    ],
    theory:
      "La potencia \\(a^n\\) multiplica la base por sí misma n veces cuando n es entero positivo. La raíz de índice n busca un número cuyo exponente n produce el radicando. Las raíces pares reales requieren radicando no negativo.",
    example:
      "La raíz cúbica de 27 es 3 porque \\(3^3=27\\). La raíz cúbica de −8 es −2, mientras la raíz cuadrada de −8 no es real.",
    caution:
      "Para raíces, el índice debe ser un entero positivo. Esta herramienta trabaja en los números reales; no define \\(0^0\\).",
  },
  {
    slug: "logaritmos",
    title: "Logaritmos",
    category: "Álgebra",
    symbol: "log",
    description: "Calcula logaritmos en cualquier base real válida.",
    fields: [f("value", "Argumento", "1000"), f("base", "Base", "10")],
    theory:
      "\\(\\log_b(a)\\) responde qué exponente necesita b para producir a. Se calcula mediante el cambio de base: \\(\\frac{\\ln(a)}{\\ln(b)}\\). En los reales, a debe ser positivo, b positivo y \\(b\\ne1\\).",
    example: "\\(\\log_{10}(1000)=3\\) porque \\(10^3=1000\\). En base 2, \\(\\log_2(8)=3\\).",
    caution:
      "Un logaritmo real no acepta argumentos cero o negativos. La base 1 no permite definir una función logarítmica.",
  },
  {
    slug: "derivadas",
    title: "Derivadas",
    category: "Cálculo",
    symbol: "d/dx",
    description:
      "Deriva funciones y explora su tasa de cambio hasta orden tres.",
    fields: [
      f(
        "expression",
        "Función \\(f(x)\\)",
        "x^3 - 3x",
        "Admite \\(x^n\\), \\(\\sin(x)\\), \\(\\cos(x)\\), \\(\\tan(x)\\), \\(e^x\\), \\(\\ln(x)\\) y \\(\\sqrt{x}\\). Ángulos en radianes.",
      ),
      choice("order", "Orden de derivación", "1", ["1", "2", "3"]),
    ],
    theory:
      "La derivada describe la tasa de cambio local de una función y la pendiente de su recta tangente. Se combinan reglas de suma, potencia, producto, cociente y cadena. Derivar otra vez mide cómo cambia esa tasa.",
    example:
      "Si \\(f(x)=x^3-3x\\), entonces \\(f'(x)=3x^2-3\\). Sus puntos estacionarios están en \\(x=\\pm1\\); \\(f''(x)=6x\\) permite distinguir máximo y mínimo.",
    caution:
      "Se deriva respecto a x. El resultado simbólico debe interpretarse en el dominio de la función original, incluso si una simplificación oculta restricciones.",
  },
  {
    slug: "integrales",
    title: "Integrales",
    category: "Cálculo",
    symbol: "∫",
    description:
      "Encuentra primitivas y evalúa integrales definidas compatibles.",
    fields: [
      f(
        "expression",
        "Integrando \\(f(x)\\)",
        "3x^2 + 2x",
        "Polinomios desarrollados, potencias de \\(x\\), \\(\\frac1x\\), \\(\\sin(ax+b)\\), \\(\\cos(ax+b)\\), \\(e^{ax+b}\\) y sumas.",
      ),
      choice("mode", "Tipo de integral", "Indefinida", [
        "Indefinida",
        "Definida",
      ]),
      f("lower", "Límite inferior", "0"),
      f("upper", "Límite superior", "2"),
    ],
    theory:
      "Una primitiva F satisface \\(F'=f\\). La integral indefinida agrupa todas las primitivas como \\(F(x)+C\\). En un intervalo donde f es continua, el teorema fundamental permite calcular la integral definida como \\(F(b)-F(a)\\).",
    example:
      "\\(\\int(3x^2+2x)\\,dx=x^3+x^2+C\\). Entre 0 y 2, el resultado es \\((8+4)-0=12\\).",
    caution:
      "El motor admite las familias indicadas, no cualquier integral simbólica. Rechaza integrales impropias, singularidades y expresiones fuera de su alcance. El resultado definido es área con signo.",
  },
  {
    slug: "limites",
    title: "Explorador de límites",
    category: "Cálculo",
    symbol: "lim",
    description: "Compara valores por la izquierda y derecha de un punto.",
    fields: [
      f("expression", "Función \\(f(x)\\)", "sin(x)/x"),
      f("point", "Punto de aproximación", "0"),
    ],
    theory:
      "Un límite describe el valor al que se aproxima \\(f(x)\\) cuando x se acerca a un punto, aunque f no esté definida allí. Para que exista un límite bilateral, los límites laterales deben existir y coincidir.",
    example:
      "\\(\\frac{\\sin(x)}{x}\\) no está definida en \\(x=0\\), pero sus valores se acercan a 1 por ambos lados. La tabla numérica ilustra esta aproximación; una demostración requiere un argumento analítico.",
    caution:
      "Esta herramienta ofrece una tabla exploratoria, no una prueba ni una garantía de existencia. Oscilaciones y cancelación numérica pueden engañar a un muestreo finito.",
  },
  {
    slug: "ecuaciones-diferenciales",
    title: "Ecuaciones diferenciales",
    category: "Cálculo",
    symbol: "y′",
    description:
      "Aproxima problemas de valor inicial con Runge–Kutta de orden 4.",
    fields: [
      f(
        "expression",
        "Ecuación \\(y'=f(x,y)\\)",
        "x + y",
        "Funciones de x e y. Solo EDO explícitas de primer orden.",
      ),
      f("x0", "Valor inicial \\(x_0\\)", "0"),
      f("y0", "Valor inicial \\(y_0\\)", "1"),
      f("end", "Valor final de x", "2"),
      f("steps", "Número de pasos", "100"),
    ],
    theory:
      "Un problema de valor inicial especifica \\(y'=f(x,y)\\) junto con \\(y(x_0)=y_0\\). Runge–Kutta de cuarto orden combina cuatro estimaciones de pendiente por paso para aproximar la trayectoria de la solución.",
    example:
      "Para \\(y'=y\\), \\(y(0)=1\\), la solución exacta es \\(e^x\\). Con pasos pequeños, RK4 aproxima \\(y(1)\\approx2.71828\\). Reducir el tamaño del paso ayuda a comprobar la estabilidad.",
    caution:
      "Es una aproximación con paso fijo, sin cota de error garantizada. No resuelve automáticamente EDO rígidas, implícitas, de orden superior ni problemas con singularidades.",
  },
  {
    slug: "graficador",
    title: "Gráficas de funciones",
    category: "Cálculo",
    symbol: "f(x)",
    description: "Dibuja una función y examina sus valores en un intervalo.",
    fields: [
      f("expression", "Función \\(f(x)\\)", "sin(x) + x/3"),
      f("min", "Desde x", "-10"),
      f("max", "Hasta x", "10"),
    ],
    theory:
      "La gráfica de una función está formada por los pares \\((x,f(x))\\). Permite observar tendencias, raíces y cambios de signo. El trazado se construye muestreando puntos del intervalo y separando saltos visibles.",
    example:
      "\\(f(x)=\\sin(x)+\\frac{x}{3}\\) combina una oscilación de amplitud 1 con una tendencia lineal. Ampliar o reducir el intervalo cambia la parte de la curva visible.",
    caution:
      "Una gráfica muestreada puede omitir detalles estrechos o discontinuidades. No sirve por sí sola como prueba de continuidad, raíces o asíntotas.",
  },
  {
    slug: "sucesiones",
    title: "Sucesiones y series",
    category: "Álgebra",
    symbol: "Σ",
    description: "Calcula el término n y la suma de progresiones.",
    fields: [
      choice("type", "Tipo", "Aritmética", ["Aritmética", "Geométrica"]),
      f("first", "Primer término \\(a_1\\)", "2"),
      f("ratio", "Diferencia d o razón r", "3"),
      f("n", "Número de términos n", "10"),
    ],
    theory:
      "En una progresión aritmética, \\(a_n=a_1+(n-1)d\\) y \\(S_n=\\frac{n(a_1+a_n)}{2}\\). En una geométrica, \\(a_n=a_1r^{n-1}\\) y \\(S_n=a_1\\frac{1-r^n}{1-r}\\) para \\(r\\ne1\\). Si \\(r=1\\), \\(S_n=na_1\\).",
    example:
      "Con \\(a_1=2\\), \\(d=3\\) y \\(n=10\\), el último término es 29 y la suma es \\(\\frac{10(2+29)}{2}=155\\).",
    caution:
      "n debe ser un entero positivo. Las potencias grandes pueden exceder el rango numérico; esto no implica que la sucesión matemática deje de existir.",
  },
  {
    slug: "trigonometria",
    title: "Trigonometría",
    category: "Geometría",
    symbol: "sin θ",
    description: "Calcula seno, coseno, tangente y convierte ángulos.",
    fields: [
      f("angle", "Ángulo", "30"),
      choice("unit", "Unidad", "Grados", ["Grados", "Radianes"]),
    ],
    theory:
      "Seno y coseno son las coordenadas vertical y horizontal en la circunferencia unitaria. La tangente es \\(\\frac{\\sin\\theta}{\\cos\\theta}\\), cuando el denominador es distinto de cero. Una vuelta equivale a \\(360^\\circ\\) o \\(2\\pi\\) radianes.",
    example:
      "Para \\(30^\\circ\\), \\(\\sin(30^\\circ)=\\frac12\\), \\(\\cos(30^\\circ)=\\frac{\\sqrt3}{2}\\) y \\(\\tan(30^\\circ)=\\frac1{\\sqrt3}\\). El mismo ángulo equivale a \\(\\frac\\pi6\\) radianes.",
    caution:
      "La tangente no está definida en \\(90^\\circ+k\\cdot180^\\circ\\). Revisa siempre si tu ángulo está en grados o radianes.",
  },
  {
    slug: "triangulos",
    title: "Triángulos",
    category: "Geometría",
    symbol: "△",
    description: "Obtén área, perímetro y ángulos a partir de tres lados.",
    fields: [
      f("a", "Lado a", "3"),
      f("b", "Lado b", "4"),
      f("c", "Lado c", "5"),
    ],
    theory:
      "Tres lados forman un triángulo si son positivos y cada uno es menor que la suma de los otros dos. Con semiperímetro s, la fórmula de Herón da \\(A=\\sqrt{s(s-a)(s-b)(s-c)}\\). La ley de cosenos permite calcular los ángulos.",
    example:
      "El triángulo de lados 3, 4 y 5 tiene perímetro 12, semiperímetro 6 y área \\(\\sqrt{6\\cdot3\\cdot2\\cdot1}=6\\). El ángulo opuesto al lado 5 es recto.",
    caution:
      "Los lados deben usar la misma unidad. Los triángulos degenerados, como 1, 2 y 3, no tienen un área positiva y se rechazan.",
  },
  {
    slug: "geometria",
    title: "Áreas y volúmenes",
    category: "Geometría",
    symbol: "πr²",
    description: "Calcula medidas de círculos, esferas, cilindros y conos.",
    fields: [
      choice("shape", "Figura", "Círculo", [
        "Círculo",
        "Esfera",
        "Cilindro",
        "Cono",
      ]),
      f("radius", "Radio r", "3"),
      f("height", "Altura h (cilindro o cono)", "5"),
    ],
    theory:
      "El área del círculo es \\(\\pi r^2\\) y su longitud de borde \\(2\\pi r\\). La esfera tiene volumen \\(\\frac{4\\pi r^3}{3}\\). Un cilindro de altura h tiene volumen \\(\\pi r^2h\\), mientras un cono de igual base y altura ocupa un tercio.",
    example:
      "Un cilindro de radio 3 y altura 5 tiene volumen \\(\\pi\\cdot9\\cdot5=45\\pi\\approx141.372\\) unidades cúbicas.",
    caution:
      "Radio y altura deben ser positivos y estar en la misma unidad. El área usa unidades cuadradas; el volumen, cúbicas.",
  },
  {
    slug: "vectores",
    title: "Vectores",
    category: "Geometría",
    symbol: "u·v",
    description:
      "Calcula suma, producto escalar, normas y ángulo entre vectores.",
    fields: [
      f("u", "Vector u", "1,2,3"),
      f(
        "v",
        "Vector v",
        "3,2,1",
        "Dos o tres componentes, separadas por comas.",
      ),
    ],
    theory:
      "El producto escalar \\(u\\cdot v\\) es la suma de los productos de componentes correspondientes. También satisface \\(u\\cdot v=\\lVert u\\rVert\\lVert v\\rVert\\cos\\theta\\), lo que permite hallar el ángulo. En tres dimensiones, el producto vectorial produce un vector perpendicular a ambos.",
    example:
      "\\(u=(1,2,3)\\) y \\(v=(3,2,1)\\) tienen producto escalar 10. Sus normas son \\(\\sqrt{14}\\), por lo que \\(\\cos\\theta=\\frac{10}{14}\\).",
    caution:
      "Ambos vectores deben tener igual dimensión. El ángulo con el vector cero no está definido.",
  },
  {
    slug: "geometria-analitica",
    title: "Geometría analítica",
    category: "Geometría",
    symbol: "(x,y)",
    description: "Obtén la recta, distancia y punto medio entre dos puntos.",
    fields: [
      f("x1", "Coordenada \\(x_1\\)", "1"),
      f("y1", "Coordenada \\(y_1\\)", "2"),
      f("x2", "Coordenada \\(x_2\\)", "5"),
      f("y2", "Coordenada \\(y_2\\)", "6"),
    ],
    theory:
      "La distancia entre dos puntos es \\(\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\). El punto medio promedia cada coordenada. Si \\(x_2\\ne x_1\\), la pendiente es \\(\\frac{y_2-y_1}{x_2-x_1}\\); si \\(x_2=x_1\\), la recta es vertical.",
    example:
      "Entre \\((1,2)\\) y \\((5,6)\\), la distancia es \\(\\sqrt{32}\\), el punto medio es \\((3,4)\\) y la recta es \\(y=x+1\\).",
    caution:
      "Dos puntos idénticos no determinan una recta única. Una recta vertical no tiene pendiente finita.",
  },
  {
    slug: "conjuntos",
    title: "Operaciones con conjuntos",
    category: "Matemática discreta",
    symbol: "A∪B",
    description:
      "Explora unión, intersección, diferencias y producto cartesiano.",
    fields: [
      f("a", "Conjunto A", "1,2,3,4"),
      f(
        "b",
        "Conjunto B",
        "3,4,5,6",
        "Elementos separados por comas. Se eliminan duplicados.",
      ),
    ],
    theory:
      "La unión reúne los elementos de ambos conjuntos. La intersección conserva los comunes. \\(A\\setminus B\\) contiene los que pertenecen a A pero no a B. La diferencia simétrica contiene los que están en exactamente uno de los conjuntos.",
    example:
      "Si \\(A=\\{1,2,3,4\\}\\) y \\(B=\\{3,4,5,6\\}\\), \\(A\\cap B=\\{3,4\\}\\) y \\(A\\cup B=\\{1,2,3,4,5,6\\}\\). El orden y las repeticiones no cambian un conjunto.",
    caution:
      "Se comparan etiquetas de texto exactas, distinguiendo mayúsculas. Por ejemplo, 01 y 1 son elementos distintos. Deja el campo vacío para representar \\(\\varnothing\\).",
  },
  {
    slug: "combinatoria",
    title: "Combinatoria",
    category: "Matemática discreta",
    symbol: "nCr",
    description:
      "Cuenta combinaciones, variaciones y permutaciones sin repetición.",
    fields: [
      f("n", "Número de elementos n", "10"),
      f("r", "Elementos elegidos r", "3"),
    ],
    theory:
      "Las combinaciones \\(\\binom nr=\\frac{n!}{r!(n-r)!}\\) cuentan selecciones donde el orden no importa. Las variaciones \\(V(n,r)=\\frac{n!}{(n-r)!}\\) sí distinguen el orden. Las permutaciones ordenan todos los elementos: \\(n!\\).",
    example:
      "Elegir 3 personas de un grupo de 10 produce \\(\\binom{10}{3}=120\\) grupos. Asignar tres cargos diferentes produce \\(V(10,3)=720\\) resultados.",
    caution:
      "Se trabaja sin repetición y con enteros \\(0\\le r\\le n\\le100\\). Los resultados enteros se calculan exactamente con BigInt.",
  },
  {
    slug: "teoria-numeros",
    title: "Teoría de números",
    category: "Matemática discreta",
    symbol: "mcd",
    description:
      "Calcula máximo común divisor, mínimo común múltiplo y factores.",
    fields: [f("a", "Entero a", "84"), f("b", "Entero b", "120")],
    theory:
      "El algoritmo de Euclides usa \\(\\gcd(a,b)=\\gcd(b,a\\bmod b)\\) hasta obtener resto cero. El mínimo común múltiplo satisface \\(\\operatorname{mcm}(a,b)=\\frac{|ab|}{\\gcd(a,b)}\\) para valores no nulos.",
    example: "\\(84=2^2\\cdot3\\cdot7\\) y \\(120=2^3\\cdot3\\cdot5\\). Su mcd es 12 y su mcm es 840.",
    caution:
      "Introduce enteros positivos de hasta un millón. La factorización se realiza por divisiones sucesivas.",
  },
  {
    slug: "probabilidad",
    title: "Distribución binomial",
    category: "Estadística",
    symbol: "P(X=k)",
    description: "Calcula probabilidades de éxitos en ensayos independientes.",
    fields: [
      f("n", "Número de ensayos n", "10"),
      f("k", "Número de éxitos k", "3"),
      f("p", "Probabilidad de éxito p", "0.5", "Un valor entre 0 y 1."),
    ],
    theory:
      "Una variable binomial cuenta éxitos en n ensayos independientes con probabilidad constante p. \\(P(X=k)=\\binom nk p^k(1-p)^{n-k}\\). Su media es np y su varianza \\(np(1-p)\\).",
    example:
      "Al lanzar una moneda equilibrada 10 veces, la probabilidad de exactamente 3 caras es \\(\\frac{\\binom{10}{3}}{2^{10}}=\\frac{120}{1024}=0.1171875\\).",
    caution:
      "No uses el modelo cuando los ensayos sean dependientes o la probabilidad cambie. n y k deben ser enteros, con \\(0\\le k\\le n\\le200\\).",
  },
  {
    slug: "estadistica",
    title: "Estadística descriptiva",
    category: "Estadística",
    symbol: "σ",
    description: "Analiza media, mediana, dispersión y extremos de tus datos.",
    fields: [
      f(
        "data",
        "Datos",
        "4,7,7,9,13",
        "Hasta 500 números separados por comas.",
      ),
      choice("type", "Tipo de varianza", "Poblacional", [
        "Poblacional",
        "Muestral",
      ]),
    ],
    theory:
      "La media resume el centro aritmético de los datos y la mediana su posición central ordenada. La varianza promedia las desviaciones cuadráticas. Para estimar la varianza poblacional desde una muestra se divide entre \\(n-1\\), en lugar de n.",
    example:
      "En 4, 7, 7, 9, 13, la media es 8, la mediana 7 y la varianza poblacional 8.8. La desviación estándar es \\(\\sqrt{8.8}\\approx2.96648\\).",
    caution:
      "La varianza muestral necesita al menos dos datos. La media es sensible a valores extremos y no describe por sí sola toda la distribución.",
  },
  {
    slug: "regresion-lineal",
    title: "Regresión lineal",
    category: "Estadística",
    symbol: "ŷ",
    description: "Ajusta una recta por mínimos cuadrados y examina el ajuste.",
    fields: [
      f("x", "Valores de x", "1,2,3,4,5"),
      f("y", "Valores de y", "2,4,5,4,5"),
    ],
    theory:
      "La regresión lineal ajusta \\(\\hat y=mx+b\\) minimizando la suma de errores verticales al cuadrado. La pendiente es la covariación dividida por la variación de x. \\(R^2\\) compara el error del ajuste con la variación total de y.",
    example:
      "Con \\(x=(1,2,3,4,5)\\) e \\(y=(2,4,5,4,5)\\) se obtiene \\(\\hat y=0.6x+2.2\\) y \\(R^2=0.6\\).",
    caution:
      "Correlación no implica causalidad. Necesitas al menos dos pares con distintos valores de x; extrapolar fuera del intervalo observado puede ser poco fiable.",
  },
];
export const bySlug = (slug: string) => catalog.find((t) => t.slug === slug);
