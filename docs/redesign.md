# Reestructuración matemática

Fecha: 5 de octubre de 2026.

## Decisiones de producto

Transformar un directorio de calculadoras cotidianas en una herramienta de estudio: resolver → comprender → practicar. Cada una de las 26 páginas tiene entradas funcionales, método, ejemplo propio, alcance y enlace de práctica. No se presentan herramientas ficticias ni estadísticas de usuarios inventadas.

La práctica admite todos los temas, mezcla por área, tres dificultades, diez preguntas, corrección inmediata, bloqueo de segunda puntuación y revisión final. Los ejercicios son plantillas parametrizadas; no cubren todos los subtemas ni constituyen una evaluación de dominio.

## Referencia de diseño solicitada

Repositorio: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Se leyó su SKILL.md y se ejecutaron búsquedas de sistema visual (`education mathematics tool editorial`) y de implementación Next.js (`forms accessibility client components`). Recomendó minimalismo suizo, jerarquía clara y componentes cliente concentrados en interacción. Se tomó como referencia, no como autoridad sobre el proyecto. Se adaptó la paleta a marfil / tinta / terracota y las fuentes a los materiales y restricciones del usuario.

Se implementan foco visible, etiquetas de formulario, navegación por teclado, reduced-motion, botones con estado, filtros con estado accesible, errores explícitos, textos alternativos en SVG y tablas de datos. Revisar capturas y pruebas responsive antes de publicar nuevas variantes.

## AdSense

No se ha recibido aún el mensaje exacto de rechazo. No se atribuye una causa sin esa evidencia. Las guías oficiales recomiendan contenido original, utilidad, navegación clara y buena experiencia; la complejidad matemática y el rediseño no garantizan aprobación.

- https://support.google.com/adsense/answer/7299563?hl=es
- https://support.google.com/adsense/answer/12176698?hl=es

Antes de reenviar: contrastar el rechazo exacto con lo publicado, revisar la información real del responsable y el contacto, verificar el acceso público, las políticas aplicables y los enlaces. No se añadió publicidad nueva ni se cambió la cuenta de AdSense.

## Fuentes matemáticas y motor

- https://mathjs.org/docs/reference/functions/derivative.html
- https://mathjs.org/docs/reference/functions/polynomialRoot.html
- https://openstax.org/details/books/calculus-volume-1
- https://openstax.org/details/books/precalculus-2e
- https://openstax.org/details/books/introductory-statistics-2e

Las explicaciones de las páginas son originales; los enlaces sirven para profundizar. Los métodos numéricos se anuncian como aproximaciones y las integrales no soportadas se rechazan explícitamente.

## Ampliación didáctica e interactiva

KaTeX presenta los resultados y los pasos con fracciones, integrales, matrices y símbolos accesibles mediante MathML. El desarrollo explica la transformación, su motivo y la sustitución numérica; derivadas compuestas recorren sus reglas y RK4 muestra sus cuatro pendientes, además de la tabla de iteraciones.

Plotly permite desplazar los ejes, ampliar y leer coordenadas numéricas. Las funciones explícitas se remuestrean al cambiar x. Las trayectorias de EDO no se extrapolan. El trazado sigue siendo una aproximación por puntos y la detección de discontinuidades es heurística.

El nivel básico de programación incluye doce lecciones: variables, operadores, condicionales, lógica booleana, for, while, listas, cadenas, funciones, diccionarios, búsqueda y depuración. CodeMirror edita Python; Pyodide autoalojado ejecuta en un Worker cancelable. Cada reto tiene explicación, pista, solución y varios casos, incluidos ceros, negativos o colecciones vacías según su contrato.

Los aciertos activan confeti respetando la preferencia de movimiento reducido. El ancho máximo crece a 1680 px con márgenes laterales menores y adaptación móvil.

La ruta completa de programación tiene 28 lecciones: 12 básicas, 8 intermedias y 8 avanzadas. Los niveles añaden estructuras, búsqueda binaria, excepciones, recursión, clases, divide y vencerás, dos punteros, grafos, programación dinámica, montículos y Dijkstra.

Las entradas de funciones usan MathLive para editar directamente fracciones y exponentes. Las prácticas de cálculo eligen familias diferentes por nivel, puntos y límites variables, y muestran un desarrollo razonado. Son generadores de familias controladas, no una promesa de generar cualquier problema matemático posible. Las respuestas se verifican mediante diferencias finitas e integración numérica independiente en pruebas.
