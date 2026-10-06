# CalculadoraFácil · Laboratorio de matemáticas

Aplicación Next.js con exportación estática. Incluye 26 herramientas de álgebra, cálculo, geometría, matemática discreta y estadística, además de sesiones de práctica con ejercicios aleatorios de los 26 temas y 28 lecciones interactivas en tres niveles de programación en Python.

## Desarrollo

Node.js 22.16+ (también verificado con Node 24).

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

La compilación genera `out/`. El motor matemático se carga en un Web Worker al resolver, con un límite de tiempo de 10 segundos; los cálculos no se envían a un servidor. Las páginas y guías se generan como HTML estático.

## Estructura

- `lib/catalog.ts`: definición de herramientas, campos, ejemplos y explicaciones.
- `lib/math-engine.ts`: validación y resolución; mathjs para raíces, derivadas y álgebra lineal.
- `lib/math.worker.ts`: ejecución fuera del hilo principal.
- `lib/practice.ts`: generador de ejercicios y opciones.
- `components/math-workspace.tsx`: formularios, estados y resultados.
- `components/expression-input.tsx`: editor MathLive con LaTeX dentro del campo, botones y navegación entre casillas.
- `lib/expression-input.ts`: normalización compartida para multiplicación implícita, exponentes Unicode y alias `ln`/`sen`.
- `components/function-plot.tsx`: Plotly con desplazamiento, zoom, coordenadas y remuestreo en Worker.
- `lib/math-lessons.ts`: desarrollo explicado y fórmulas LaTeX de los 26 temas.
- `components/math-formula.tsx`: KaTeX con MathML accesible.
- `components/programming-lab.tsx`: lecciones, editor CodeMirror y pruebas de código.
- `public/python-worker.js`: Python real con Pyodide en Worker, salida limitada y ejecución cancelable.
- `components/practice-lab.tsx`: sesiones de diez preguntas, corrección y revisión final.
- `tests/`: casos matemáticos, propiedades del generador, renderizado LaTeX y soluciones Python de referencia.

Los scripts `predev` y `prebuild` copian los recursos de Pyodide a `public/python-runtime/` desde la dependencia fijada en el lockfile. Son archivos generados e ignorados por Git; la exportación `out/` los incluye. Python y Plotly se cargan solo al necesitarlos. Python dispone de 60 segundos para inicializarse y 8 segundos por ejecución; puede detenerse sin bloquear la interfaz. Los borradores y el progreso de programación se conservan en memoria durante la visita. No se admiten entradas interactivas con `input()`; los retos reciben parámetros. Las pruebas comprueban casos concretos, no demuestran corrección universal.

## Alcance matemático

- Ecuaciones polinómicas hasta grado 3: raíces distintas aproximadas, reales y complejas; tratamiento de grados degenerados.
- Sistemas y matrices 2×2 o 3×3; se rechazan soluciones únicas numéricamente no fiables.
- Derivadas simbólicas respecto de x, hasta orden 3; expresiones validadas con lista de operaciones permitidas.
- Integrales simbólicas de constantes, potencias de x, sumas, factores constantes, 1/x y sin/cos/exp de argumentos lineales. Evaluación definida por primitiva para intervalos admitidos. No es un CAS de integración general.
- EDO explícitas de primer orden: RK4 de paso fijo, sin cota de error garantizada. No es un solver de EDO rígidas.
- Límites: exploración numérica lateral, sin afirmación automática de existencia.
- Gráficas: muestreo y separación heurística de saltos; no garantizan detectar todas las discontinuidades.
- Práctica: derivadas e integrales usan familias de métodos distintas por nivel y datos variables. Las derivadas alternan puntos y, en avanzado, órdenes; las integrales varían sus límites e incluyen sustitución, partes, identidades y fracciones parciales. Los otros temas varían sus datos según plantillas. La puntuación no acredita nivel académico. Los resultados de sesión se mantienen solo mientras esté montada la página.

## Identidad visual y tipografías

Marfil, tinta y terracota. Fraunces y Manrope se alojan localmente bajo SIL OFL; ModeNine incluye su aviso de distribución. Las licencias están en `public/fonts/`.

Sorean no está incluida: el archivo suministrado indica uso personal. Se puede sustituir la fuente de títulos cuando se confirme una licencia comercial apta para web.

La guía UI UX Pro Max se consultó como referencia de jerarquía, formularios, foco, diseño responsive y accesibilidad, sin instalarla globalmente. Ver `docs/redesign.md`.

## Migración

Las diez rutas de calculadoras cotidianas anteriores dejan de generarse y desaparecen del sitemap; el código antiguo se conserva sin enlazar para facilitar una recuperación. Una página 404 orienta hacia el nuevo catálogo. No se redirigen páginas financieras a matemáticas sin equivalencia. La política de EDGE XI conserva su ruta y contenido.

No se ha publicado ni solicitado una nueva revisión de AdSense. La aprobación depende de la revisión de Google; consulta el motivo exacto de rechazo antes de reenviar el sitio.

Las ayudas, guías y ejemplos del catálogo marcan sus fórmulas con delimitadores `\\(` y `\\)` para renderizarlas mediante `MathText`. Las entradas son campos matemáticos visuales; MathLive serializa la fórmula a una expresión validada antes del cálculo. Sus fuentes se copian localmente durante prebuild. No se requiere asterisco para multiplicaciones implícitas; se recomienda agrupar denominadores con paréntesis.
