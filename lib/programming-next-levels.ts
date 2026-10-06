import type { CodeLesson } from './programming-lessons';
export const nextLevelLessons:CodeLesson[]=[
  {
    "tier": "Intermedio",
    "slug": "comprensiones",
    "title": "Comprensiones y filtros",
    "level": "01 · Comprensiones y filtros",
    "description": "Transforma una colección conservando solo los datos que cumplen una condición.",
    "concepts": [
      {
        "title": "Separar selección y transformación",
        "text": "Primero decide qué elementos cumplen la condición; después transforma esos elementos. Invertir estos pasos puede cambiar el resultado."
      },
      {
        "title": "Construir una lista nueva",
        "text": "Una comprensión reúne expresión, recorrido y condición. Equivale a un for con un if y append; no modifica la lista original.",
        "code": "cuadrados = [n * n for n in datos if n > 0]"
      },
      {
        "title": "Conservar el orden",
        "text": "El resultado mantiene el orden de los datos admitidos, incluidos los repetidos. Una colección vacía produce otra vacía."
      }
    ],
    "task": "Devuelve los cuadrados de los enteros pares de valores, en el orden original. Incluye el cero y los negativos pares.",
    "signature": "resolver(valores)",
    "starter": "def resolver(valores):\n    # Construye tu solución\n    pass\n",
    "hint": "Comprueba n % 2 == 0 y eleva al cuadrado solamente los valores que pasen el filtro.",
    "solution": "def resolver(valores):\n    return [n * n for n in valores if n % 2 == 0]\n",
    "tests": [
      {
        "args": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          4,
          16
        ],
        "reason": "Filtra antes de transformar."
      },
      {
        "args": [
          [
            -4,
            -3,
            0,
            2
          ]
        ],
        "expected": [
          16,
          0,
          4
        ],
        "reason": "Negativos pares y cero."
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "reason": "Lista vacía."
      },
      {
        "args": [
          [
            2,
            2
          ]
        ],
        "expected": [
          4,
          4
        ],
        "reason": "Conserva repeticiones."
      },
      {
        "args": [
          [
            1,
            3,
            5
          ]
        ],
        "expected": [],
        "reason": "Ningún elemento cumple."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "conjuntos-orden",
    "title": "Conjuntos y duplicados",
    "level": "02 · Conjuntos y duplicados",
    "description": "Combina una búsqueda rápida con una salida que conserva el orden.",
    "concepts": [
      {
        "title": "Pertenencia sin repetición",
        "text": "Un set almacena elementos únicos. La operación in comprueba pertenencia en tiempo esperado constante; su orden no es el orden de inserción de la lista.",
        "code": "vistos = set()\nvistos.add(4)\nprint(4 in vistos)"
      },
      {
        "title": "Dos estructuras, dos responsabilidades",
        "text": "Usa un conjunto para recordar lo visto y una lista para construir la salida. Añade un valor a ambas estructuras solo la primera vez que aparezca."
      },
      {
        "title": "Evitar ordenar por accidente",
        "text": "sorted(set(valores)) elimina duplicados, pero cambia el orden. El contrato pide conservar la primera aparición."
      }
    ],
    "task": "Elimina enteros duplicados conservando el orden de su primera aparición. Devuelve una lista.",
    "signature": "resolver(valores)",
    "starter": "def resolver(valores):\n    # Construye tu solución\n    pass\n",
    "hint": "Recorre una sola vez; un set recuerda qué enteros ya agregaste a la lista resultado.",
    "solution": "def resolver(valores):\n    vistos = set()\n    resultado = []\n    for valor in valores:\n        if valor not in vistos:\n            vistos.add(valor)\n            resultado.append(valor)\n    return resultado\n",
    "tests": [
      {
        "args": [
          [
            3,
            1,
            3,
            2,
            1
          ]
        ],
        "expected": [
          3,
          1,
          2
        ],
        "reason": "Primera aparición."
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "reason": "Sin elementos."
      },
      {
        "args": [
          [
            0,
            0,
            -1,
            0
          ]
        ],
        "expected": [
          0,
          -1
        ],
        "reason": "Cero y negativos."
      },
      {
        "args": [
          [
            5,
            4,
            3
          ]
        ],
        "expected": [
          5,
          4,
          3
        ],
        "reason": "No ordenes la salida."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "matrices-python",
    "title": "Matrices y bucles anidados",
    "level": "03 · Matrices y bucles anidados",
    "description": "Relaciona índices de filas y columnas al transformar una matriz.",
    "concepts": [
      {
        "title": "Una lista de filas",
        "text": "Una matriz rectangular es una lista de listas de igual longitud. matriz[i][j] accede a la fila i y columna j."
      },
      {
        "title": "Intercambiar dimensiones",
        "text": "La transpuesta convierte cada columna original en una fila. Si hay m filas y n columnas, la salida tiene n filas y m columnas.",
        "code": "salida = [[matriz[i][j] for i in range(filas)]\n          for j in range(columnas)]"
      },
      {
        "title": "Crear filas independientes",
        "text": "Evita [[0] * n] * m para datos que cambiarás: sus filas comparten la misma lista. Construye cada fila por separado."
      }
    ],
    "task": "Devuelve la transpuesta de una matriz rectangular de números. Para [] o una matriz de filas vacías, devuelve [].",
    "signature": "resolver(matriz)",
    "starter": "def resolver(matriz):\n    # Construye tu solución\n    pass\n",
    "hint": "El bucle exterior recorre columnas; el interior reúne esa columna en cada fila.",
    "solution": "def resolver(matriz):\n    if not matriz:\n        return []\n    return [[fila[j] for fila in matriz] for j in range(len(matriz[0]))]\n",
    "tests": [
      {
        "args": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ]
          ]
        ],
        "expected": [
          [
            1,
            4
          ],
          [
            2,
            5
          ],
          [
            3,
            6
          ]
        ],
        "reason": "Matriz no cuadrada."
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "reason": "Matriz vacía."
      },
      {
        "args": [
          [
            [],
            []
          ]
        ],
        "expected": [],
        "reason": "Cero columnas."
      },
      {
        "args": [
          [
            [
              7
            ],
            [
              8
            ]
          ]
        ],
        "expected": [
          [
            7,
            8
          ]
        ],
        "reason": "Una sola columna."
      },
      {
        "args": [
          [
            [
              1,
              2
            ]
          ]
        ],
        "expected": [
          [
            1
          ],
          [
            2
          ]
        ],
        "reason": "Una sola fila."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "busqueda-binaria",
    "title": "Búsqueda binaria",
    "level": "04 · Búsqueda binaria",
    "description": "Reduce a la mitad una zona de búsqueda manteniendo un invariante.",
    "concepts": [
      {
        "title": "Requisito: datos ordenados",
        "text": "La búsqueda binaria necesita una lista ordenada. Comparar con el elemento central permite descartar una mitad; en una lista arbitraria esa deducción no es válida."
      },
      {
        "title": "Mantener un intervalo candidato",
        "text": "Usa un intervalo semiabierto [izquierda, derecha). Si el valor central es menor que el objetivo, avanza izquierda a medio+1; en otro caso, reduce derecha a medio.",
        "code": "medio = (izquierda + derecha) // 2"
      },
      {
        "title": "Encontrar la primera coincidencia",
        "text": "Continuar hacia la izquierda al encontrar igualdad localiza la primera aparición. Al terminar verifica que el índice exista y que el valor coincida. El tiempo es O(log n)."
      }
    ],
    "task": "En una lista de enteros ordenada de menor a mayor, devuelve el índice de la primera aparición de objetivo, o -1 si no está.",
    "signature": "resolver(valores, objetivo)",
    "starter": "def resolver(valores, objetivo):\n    # Construye tu solución\n    pass\n",
    "hint": "Busca el primer índice cuyo valor no sea menor que objetivo, y después confirma la igualdad.",
    "solution": "def resolver(valores, objetivo):\n    izquierda, derecha = 0, len(valores)\n    while izquierda < derecha:\n        medio = (izquierda + derecha) // 2\n        if valores[medio] < objetivo:\n            izquierda = medio + 1\n        else:\n            derecha = medio\n    return izquierda if izquierda < len(valores) and valores[izquierda] == objetivo else -1\n",
    "tests": [
      {
        "args": [
          [
            1,
            3,
            5,
            7
          ],
          5
        ],
        "expected": 2,
        "reason": "Elemento interior."
      },
      {
        "args": [
          [
            1,
            2,
            2,
            2,
            4
          ],
          2
        ],
        "expected": 1,
        "reason": "Primera de varias coincidencias."
      },
      {
        "args": [
          [],
          4
        ],
        "expected": -1,
        "reason": "Lista vacía."
      },
      {
        "args": [
          [
            3
          ],
          2
        ],
        "expected": -1,
        "reason": "Ausente por debajo."
      },
      {
        "args": [
          [
            3
          ],
          4
        ],
        "expected": -1,
        "reason": "Ausente por encima."
      },
      {
        "args": [
          [
            -5,
            -2,
            0
          ],
          -5
        ],
        "expected": 0,
        "reason": "Extremo izquierdo."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "excepciones",
    "title": "Validación y excepciones",
    "level": "05 · Validación y excepciones",
    "description": "Distingue un dato válido de un error de conversión.",
    "concepts": [
      {
        "title": "Errores esperables",
        "text": "Una entrada textual puede no representar un entero. int acepta espacios exteriores y un signo; rechaza decimales escritos como 3.5 y cadenas vacías.",
        "code": "numero = int(\" -12 \")"
      },
      {
        "title": "Capturar solo el error previsto",
        "text": "Rodea la conversión con try y captura ValueError. Un except sin tipo ocultaría fallos de programación que merecen investigarse.",
        "code": "try:\n    valor = int(texto)\nexcept ValueError:\n    valor = None"
      },
      {
        "title": "Usar una señal inequívoca",
        "text": "Devolver cero ante un error confundiría una conversión válida de 0 con un fallo. None representa aquí que no se pudo convertir."
      }
    ],
    "task": "Convierte texto a entero con las reglas de int de Python. Si la cadena no representa un entero válido, devuelve None. La entrada siempre será una cadena.",
    "signature": "resolver(texto)",
    "starter": "def resolver(texto):\n    # Construye tu solución\n    pass\n",
    "hint": "El except ValueError debe devolver None, no el texto \"None\".",
    "solution": "def resolver(texto):\n    try:\n        return int(texto)\n    except ValueError:\n        return None\n",
    "tests": [
      {
        "args": [
          "42"
        ],
        "expected": 42,
        "reason": "Entero válido."
      },
      {
        "args": [
          " -7 "
        ],
        "expected": -7,
        "reason": "Espacios y signo."
      },
      {
        "args": [
          "0"
        ],
        "expected": 0,
        "reason": "Cero no es un error."
      },
      {
        "args": [
          "3.5"
        ],
        "expected": null,
        "reason": "No es un entero escrito."
      },
      {
        "args": [
          ""
        ],
        "expected": null,
        "reason": "Texto vacío."
      },
      {
        "args": [
          "hola"
        ],
        "expected": null,
        "reason": "Texto no numérico."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "ordenacion-claves",
    "title": "Ordenación por varias claves",
    "level": "06 · Ordenación por varias claves",
    "description": "Expresa prioridades de ordenación mediante tuplas.",
    "concepts": [
      {
        "title": "Ordenar sin modificar la entrada",
        "text": "sorted devuelve una lista nueva. El método sort cambia la lista sobre la que se llama. Elige según el contrato."
      },
      {
        "title": "Prioridades de izquierda a derecha",
        "text": "La clave puede ser una tupla. Python compara primero su primera componente y usa las siguientes para romper empates.",
        "code": "ordenados = sorted(datos, key=lambda p: (-p[\"puntos\"], p[\"nombre\"]))"
      },
      {
        "title": "Descendente y ascendente a la vez",
        "text": "Negar un puntaje numérico invierte su prioridad. El nombre se mantiene ascendente. La ordenación es estable cuando las claves completas coinciden."
      }
    ],
    "task": "Recibe registros con nombre (texto) y puntos (entero). Devuelve la lista de nombres ordenada por puntos de mayor a menor y, en empates, por nombre ascendente según Python.",
    "signature": "resolver(registros)",
    "starter": "def resolver(registros):\n    # Construye tu solución\n    pass\n",
    "hint": "La clave (-puntos, nombre) combina las dos prioridades solicitadas.",
    "solution": "def resolver(registros):\n    ordenados = sorted(registros, key=lambda r: (-r[\"puntos\"], r[\"nombre\"]))\n    return [r[\"nombre\"] for r in ordenados]\n",
    "tests": [
      {
        "args": [
          [
            {
              "nombre": "Luis",
              "puntos": 5
            },
            {
              "nombre": "Ana",
              "puntos": 8
            },
            {
              "nombre": "Eva",
              "puntos": 5
            }
          ]
        ],
        "expected": [
          "Ana",
          "Eva",
          "Luis"
        ],
        "reason": "Desempate por nombre."
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "reason": "Lista vacía."
      },
      {
        "args": [
          [
            {
              "nombre": "B",
              "puntos": -2
            },
            {
              "nombre": "A",
              "puntos": -1
            }
          ]
        ],
        "expected": [
          "A",
          "B"
        ],
        "reason": "Puntajes negativos."
      },
      {
        "args": [
          [
            {
              "nombre": "X",
              "puntos": 0
            }
          ]
        ],
        "expected": [
          "X"
        ],
        "reason": "Un registro."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "recursion",
    "title": "Recursión y caso base",
    "level": "07 · Recursión y caso base",
    "description": "Resuelve una estructura anidada reduciéndola a partes más pequeñas.",
    "concepts": [
      {
        "title": "Definir el caso base",
        "text": "Si el elemento es un entero, su contribución es ese mismo entero. No se vuelve a llamar a la función: este caso detiene el descenso."
      },
      {
        "title": "Descomponer una lista",
        "text": "Si el elemento es una lista, resuelve cada componente y suma sus resultados. Cada llamada recibe una parte menor de la estructura.",
        "code": "total = 0\nfor parte in elemento:\n    total += resolver(parte)"
      },
      {
        "title": "Entender la pila",
        "text": "Cada llamada espera el resultado de sus hijas. El espacio depende de la profundidad y Python limita la recursión; aquí las entradas tienen profundidad máxima de 30."
      }
    ],
    "task": "Devuelve la suma de todos los enteros de una estructura que puede ser un entero o una lista anidada de enteros y listas. No hay booleanos ni ciclos.",
    "signature": "resolver(elemento)",
    "starter": "def resolver(elemento):\n    # Construye tu solución\n    pass\n",
    "hint": "Distingue int de list. La suma de una lista vacía es cero.",
    "solution": "def resolver(elemento):\n    if isinstance(elemento, int):\n        return elemento\n    return sum(resolver(parte) for parte in elemento)\n",
    "tests": [
      {
        "args": [
          3
        ],
        "expected": 3,
        "reason": "Caso base."
      },
      {
        "args": [
          [
            1,
            [
              2,
              3
            ],
            [],
            [
              4,
              [
                5
              ]
            ]
          ]
        ],
        "expected": 15,
        "reason": "Varios niveles."
      },
      {
        "args": [
          []
        ],
        "expected": 0,
        "reason": "Lista vacía."
      },
      {
        "args": [
          [
            [
              -3
            ],
            2,
            [
              1,
              -4
            ]
          ]
        ],
        "expected": -4,
        "reason": "Negativos y cancelación."
      },
      {
        "args": [
          [
            [
              [
                7
              ]
            ]
          ]
        ],
        "expected": 7,
        "reason": "Descenso hasta el entero."
      }
    ]
  },
  {
    "tier": "Intermedio",
    "slug": "objetos",
    "title": "Clases, estado y métodos",
    "level": "08 · Clases, estado y métodos",
    "description": "Encapsula reglas de actualización en un objeto.",
    "concepts": [
      {
        "title": "Estado de una instancia",
        "text": "Una clase define datos y operaciones relacionados. __init__ recibe el estado inicial; self permite acceder a los datos de esa instancia.",
        "code": "class Cuenta:\n    def __init__(self, saldo):\n        self.saldo = saldo"
      },
      {
        "title": "Métodos con reglas",
        "text": "Un retiro solo debe modificar el saldo si hay fondos. Comprobar antes de restar mantiene el invariante saldo >= 0."
      },
      {
        "title": "Separar el modelo de la entrada",
        "text": "La función resolver puede crear una Cuenta y traducir las operaciones recibidas a llamadas a sus métodos. Esto facilita probar las reglas sin interfaz."
      }
    ],
    "task": "Simula una cuenta con saldo inicial entero no negativo. Cada operación es [\"depositar\", cantidad] o [\"retirar\", cantidad], con cantidad no negativa. Ignora retiros que superen el saldo. Devuelve el saldo final. Practica usando una clase auxiliar.",
    "signature": "resolver(saldo, operaciones)",
    "starter": "def resolver(saldo, operaciones):\n    # Construye tu solución\n    pass\n",
    "hint": "Guarda saldo en self.saldo y protege la resta con una condición.",
    "solution": "class Cuenta:\n    def __init__(self, saldo):\n        self.saldo = saldo\n    def depositar(self, cantidad):\n        self.saldo += cantidad\n    def retirar(self, cantidad):\n        if cantidad <= self.saldo:\n            self.saldo -= cantidad\n\ndef resolver(saldo, operaciones):\n    cuenta = Cuenta(saldo)\n    for tipo, cantidad in operaciones:\n        if tipo == \"depositar\":\n            cuenta.depositar(cantidad)\n        else:\n            cuenta.retirar(cantidad)\n    return cuenta.saldo\n",
    "tests": [
      {
        "args": [
          10,
          [
            [
              "depositar",
              5
            ],
            [
              "retirar",
              8
            ]
          ]
        ],
        "expected": 7,
        "reason": "Actualizaciones sucesivas."
      },
      {
        "args": [
          5,
          [
            [
              "retirar",
              6
            ]
          ]
        ],
        "expected": 5,
        "reason": "Retiro rechazado."
      },
      {
        "args": [
          0,
          [
            [
              "depositar",
              3
            ],
            [
              "retirar",
              3
            ]
          ]
        ],
        "expected": 0,
        "reason": "Retiro de todo el saldo."
      },
      {
        "args": [
          4,
          []
        ],
        "expected": 4,
        "reason": "Sin operaciones."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "merge-sort",
    "title": "Divide y vencerás: merge sort",
    "level": "01 · Divide y vencerás: merge sort",
    "description": "Divide un problema y combina soluciones conservando el orden.",
    "concepts": [
      {
        "title": "Dividir hasta el caso base",
        "text": "Una lista con cero o un elemento ya está ordenada. Divide las demás por la mitad y ordena cada mitad recursivamente."
      },
      {
        "title": "Combinar con dos índices",
        "text": "Compara el primer elemento pendiente de cada mitad, incorpora el menor y avanza solo ese índice. Al agotarse una mitad, añade lo que quede de la otra.",
        "code": "while i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        salida.append(a[i]); i += 1\n    else:\n        salida.append(b[j]); j += 1"
      },
      {
        "title": "Coste del algoritmo",
        "text": "Cada nivel combina n elementos y hay log n niveles: O(n log n) en tiempo. Esta versión construye listas auxiliares; no ordena in situ. Las pruebas verifican la salida, no prohíben sorted."
      }
    ],
    "task": "Devuelve una lista ordenada ascendentemente conservando todos los enteros y sus repeticiones. Implementa merge sort para practicar el método.",
    "signature": "resolver(valores)",
    "starter": "def resolver(valores):\n    # Construye tu solución\n    pass\n",
    "hint": "Escribe primero la mezcla de dos listas ya ordenadas; después añade la división recursiva.",
    "solution": "def resolver(valores):\n    if len(valores) <= 1:\n        return valores[:]\n    m = len(valores) // 2\n    a, b = resolver(valores[:m]), resolver(valores[m:])\n    i = j = 0\n    salida = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            salida.append(a[i]); i += 1\n        else:\n            salida.append(b[j]); j += 1\n    return salida + a[i:] + b[j:]\n",
    "tests": [
      {
        "args": [
          [
            4,
            1,
            3,
            2
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4
        ],
        "reason": "Orden arbitrario."
      },
      {
        "args": [
          []
        ],
        "expected": [],
        "reason": "Caso vacío."
      },
      {
        "args": [
          [
            2,
            2,
            -1,
            0
          ]
        ],
        "expected": [
          -1,
          0,
          2,
          2
        ],
        "reason": "Conserva duplicados."
      },
      {
        "args": [
          [
            5
          ]
        ],
        "expected": [
          5
        ],
        "reason": "Caso base."
      },
      {
        "args": [
          [
            5,
            4,
            3,
            2,
            1
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4,
          5
        ],
        "reason": "Orden inverso."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "dos-punteros",
    "title": "Dos punteros e invariantes",
    "level": "02 · Dos punteros e invariantes",
    "description": "Descarta candidatos sin recorrer todas las parejas.",
    "concepts": [
      {
        "title": "Aprovechar el orden",
        "text": "En una lista ordenada, el menor y el mayor delimitan una suma. Si es demasiado pequeña, mover el extremo derecho hacia dentro solo la reduciría; debes mover el izquierdo."
      },
      {
        "title": "Mantener índices diferentes",
        "text": "La condición izquierda < derecha impide reutilizar el mismo elemento. Dos valores iguales pueden formar una pareja si están en posiciones distintas."
      },
      {
        "title": "Justificar cada descarte",
        "text": "Si la suma es demasiado grande, descarta el extremo derecho. Cada paso elimina una posición: tiempo O(n) y espacio adicional O(1)."
      }
    ],
    "task": "En una lista ordenada de enteros, determina si existen dos posiciones distintas cuyos valores sumen objetivo. Devuelve un booleano.",
    "signature": "resolver(valores, objetivo)",
    "starter": "def resolver(valores, objetivo):\n    # Construye tu solución\n    pass\n",
    "hint": "Comienza en los dos extremos y mueve solo el lado que puede acercar la suma al objetivo.",
    "solution": "def resolver(valores, objetivo):\n    i, j = 0, len(valores) - 1\n    while i < j:\n        suma = valores[i] + valores[j]\n        if suma == objetivo:\n            return True\n        if suma < objetivo:\n            i += 1\n        else:\n            j -= 1\n    return False\n",
    "tests": [
      {
        "args": [
          [
            1,
            2,
            4,
            7
          ],
          9
        ],
        "expected": true,
        "reason": "Pareja interior y extremo."
      },
      {
        "args": [
          [
            3
          ],
          6
        ],
        "expected": false,
        "reason": "No reutilices una posición."
      },
      {
        "args": [
          [
            3,
            3
          ],
          6
        ],
        "expected": true,
        "reason": "Dos posiciones iguales."
      },
      {
        "args": [
          [],
          0
        ],
        "expected": false,
        "reason": "No hay pareja."
      },
      {
        "args": [
          [
            -5,
            -1,
            2,
            8
          ],
          3
        ],
        "expected": true,
        "reason": "Signos distintos."
      },
      {
        "args": [
          [
            1,
            2,
            3
          ],
          8
        ],
        "expected": false,
        "reason": "Objetivo imposible."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "bfs",
    "title": "Grafos: búsqueda en anchura",
    "level": "03 · Grafos: búsqueda en anchura",
    "description": "Encuentra distancias mínimas cuando todas las aristas cuestan lo mismo.",
    "concepts": [
      {
        "title": "Representar vecinos",
        "text": "El grafo es una lista de listas: grafo[u] contiene los vértices a los que u tiene una arista. Los vértices se numeran desde cero y las aristas son dirigidas."
      },
      {
        "title": "Explorar por capas",
        "text": "Una cola FIFO procesa primero los vértices más cercanos. Marca un vértice cuando lo encolas para no insertarlo varias veces.",
        "code": "from collections import deque\ncola = deque([inicio])\nu = cola.popleft()"
      },
      {
        "title": "Interpretar la primera visita",
        "text": "Con aristas de coste uno, la primera distancia asignada es mínima. BFS cuesta O(V+E); no sirve directamente para pesos diferentes."
      }
    ],
    "task": "Devuelve el número mínimo de aristas desde inicio hasta fin en un grafo dirigido sin pesos. Devuelve -1 si no hay camino. El grafo tiene al menos un vértice y ambos índices son válidos.",
    "signature": "resolver(grafo, inicio, fin)",
    "starter": "def resolver(grafo, inicio, fin):\n    # Construye tu solución\n    pass\n",
    "hint": "Guarda distancia por vértice; -1 indica que todavía no fue visitado.",
    "solution": "from collections import deque\n\ndef resolver(grafo, inicio, fin):\n    dist = [-1] * len(grafo)\n    dist[inicio] = 0\n    cola = deque([inicio])\n    while cola:\n        u = cola.popleft()\n        if u == fin:\n            return dist[u]\n        for v in grafo[u]:\n            if dist[v] == -1:\n                dist[v] = dist[u] + 1\n                cola.append(v)\n    return -1\n",
    "tests": [
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              3
            ],
            [
              3
            ],
            []
          ],
          0,
          3
        ],
        "expected": 2,
        "reason": "Dos caminos mínimos."
      },
      {
        "args": [
          [
            [
              1
            ],
            [],
            []
          ],
          0,
          2
        ],
        "expected": -1,
        "reason": "Vértice aislado."
      },
      {
        "args": [
          [
            []
          ],
          0,
          0
        ],
        "expected": 0,
        "reason": "Inicio igual al destino."
      },
      {
        "args": [
          [
            [
              1
            ],
            [
              0,
              2
            ],
            []
          ],
          0,
          2
        ],
        "expected": 2,
        "reason": "Ciclo sin visitas infinitas."
      },
      {
        "args": [
          [
            [
              1
            ],
            []
          ],
          1,
          0
        ],
        "expected": -1,
        "reason": "Respeta la dirección."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "dfs-ciclos",
    "title": "Grafos: detectar ciclos",
    "level": "04 · Grafos: detectar ciclos",
    "description": "Distingue nodos pendientes de nodos cuyo recorrido ya terminó.",
    "concepts": [
      {
        "title": "Tres estados de visita",
        "text": "Usa 0 para no visitado, 1 para activo en la pila recursiva y 2 para terminado. Un simple conjunto de visitados no distingue un ciclo de dos caminos que llegan al mismo nodo."
      },
      {
        "title": "Reconocer una arista de retorno",
        "text": "Si desde un nodo activo llegas a otro nodo activo, cierras un camino dirigido: existe un ciclo. Llegar a un nodo terminado no basta para afirmarlo."
      },
      {
        "title": "Recorrer todas las componentes",
        "text": "Inicia DFS en cada nodo no visitado para revisar también zonas desconectadas. La profundidad está limitada por el tamaño del grafo; aquí hay hasta 100 vértices."
      }
    ],
    "task": "Devuelve True si un grafo dirigido contiene algún ciclo, incluido un lazo de un vértice a sí mismo. grafo[u] enumera vecinos con índices válidos. [] no tiene ciclos.",
    "signature": "resolver(grafo)",
    "starter": "def resolver(grafo):\n    # Construye tu solución\n    pass\n",
    "hint": "Marca activo antes de explorar vecinos y terminado al salir de la función.",
    "solution": "def resolver(grafo):\n    estado = [0] * len(grafo)\n    def visitar(u):\n        estado[u] = 1\n        for v in grafo[u]:\n            if estado[v] == 1:\n                return True\n            if estado[v] == 0 and visitar(v):\n                return True\n        estado[u] = 2\n        return False\n    return any(estado[u] == 0 and visitar(u) for u in range(len(grafo)))\n",
    "tests": [
      {
        "args": [
          [
            [
              1
            ],
            [
              2
            ],
            [
              0
            ]
          ]
        ],
        "expected": true,
        "reason": "Ciclo de tres vértices."
      },
      {
        "args": [
          [
            [
              1,
              2
            ],
            [
              3
            ],
            [
              3
            ],
            []
          ]
        ],
        "expected": false,
        "reason": "Convergencia no implica ciclo."
      },
      {
        "args": [
          [
            [
              0
            ]
          ]
        ],
        "expected": true,
        "reason": "Lazo propio."
      },
      {
        "args": [
          []
        ],
        "expected": false,
        "reason": "Grafo vacío."
      },
      {
        "args": [
          [
            [],
            [
              2
            ],
            [
              1
            ]
          ]
        ],
        "expected": true,
        "reason": "Ciclo en otra componente."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "monedas-dp",
    "title": "Programación dinámica: monedas",
    "level": "05 · Programación dinámica: monedas",
    "description": "Reutiliza soluciones de importes menores y detecta lo imposible.",
    "concepts": [
      {
        "title": "Definir el estado",
        "text": "dp[s] representa el mínimo de monedas para formar exactamente s. Inicializa dp[0] en cero; el resto comienza como inalcanzable."
      },
      {
        "title": "Construir una transición",
        "text": "Si usas una moneda c al final, necesitas una solución para s-c. Entre todas las monedas válidas toma el mínimo de dp[s-c]+1.",
        "code": "dp[s] = min(dp[s], dp[s - moneda] + 1)"
      },
      {
        "title": "Evitar una decisión codiciosa",
        "text": "Elegir siempre la moneda mayor puede fallar: con [1,3,4], formar 6 exige dos monedas de 3, no 4+1+1. El coste de esta tabla es O(importe × tipos)."
      }
    ],
    "task": "Con monedas de valores enteros positivos, reutilizables sin límite, devuelve el mínimo número necesario para formar importe (entero entre 0 y 1000). Si es imposible, devuelve -1.",
    "signature": "resolver(monedas, importe)",
    "starter": "def resolver(monedas, importe):\n    # Construye tu solución\n    pass\n",
    "hint": "Llena los importes de menor a mayor para que dp[s-c] ya esté resuelto.",
    "solution": "def resolver(monedas, importe):\n    dp = [importe + 1] * (importe + 1)\n    dp[0] = 0\n    for s in range(1, importe + 1):\n        for moneda in monedas:\n            if moneda <= s:\n                dp[s] = min(dp[s], dp[s - moneda] + 1)\n    return dp[importe] if dp[importe] <= importe else -1\n",
    "tests": [
      {
        "args": [
          [
            1,
            3,
            4
          ],
          6
        ],
        "expected": 2,
        "reason": "Contraejemplo del enfoque codicioso."
      },
      {
        "args": [
          [
            2
          ],
          3
        ],
        "expected": -1,
        "reason": "Importe imposible."
      },
      {
        "args": [
          [],
          0
        ],
        "expected": 0,
        "reason": "No se necesita ninguna moneda."
      },
      {
        "args": [
          [],
          5
        ],
        "expected": -1,
        "reason": "Sin monedas disponibles."
      },
      {
        "args": [
          [
            5,
            2
          ],
          11
        ],
        "expected": 4,
        "reason": "Combina denominaciones."
      },
      {
        "args": [
          [
            2,
            2,
            3
          ],
          7
        ],
        "expected": 3,
        "reason": "Denominaciones repetidas."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "mochila",
    "title": "Mochila 0/1",
    "level": "06 · Mochila 0/1",
    "description": "Controla qué estados pueden reutilizarse al actualizar una tabla.",
    "concepts": [
      {
        "title": "Elegir o descartar",
        "text": "Cada objeto puede aparecer como máximo una vez. Para una capacidad c, compara no usar el objeto con usarlo y sumar su valor a la mejor solución de capacidad c-peso."
      },
      {
        "title": "Actualizar de derecha a izquierda",
        "text": "Al usar una tabla de una dimensión, recorre capacidades en descenso. Si avanzaras, podrías reutilizar el mismo objeto varias veces dentro de su propia iteración.",
        "code": "for c in range(capacidad, peso - 1, -1):\n    dp[c] = max(dp[c], dp[c - peso] + valor)"
      },
      {
        "title": "Distinguir valor y ocupación",
        "text": "No es obligatorio llenar la mochila. Solo importa maximizar el valor sin exceder la capacidad. Esta solución cuesta O(objetos × capacidad)."
      }
    ],
    "task": "Cada objeto es [peso, valor], con peso entero positivo y valor entero no negativo. Devuelve el valor máximo sin exceder capacidad (0 a 500); cada objeto se usa una vez como máximo.",
    "signature": "resolver(objetos, capacidad)",
    "starter": "def resolver(objetos, capacidad):\n    # Construye tu solución\n    pass\n",
    "hint": "El bucle exterior recorre objetos y el interior recorre capacidades en descenso.",
    "solution": "def resolver(objetos, capacidad):\n    dp = [0] * (capacidad + 1)\n    for peso, valor in objetos:\n        for c in range(capacidad, peso - 1, -1):\n            dp[c] = max(dp[c], dp[c - peso] + valor)\n    return dp[capacidad]\n",
    "tests": [
      {
        "args": [
          [
            [
              2,
              3
            ],
            [
              3,
              4
            ],
            [
              4,
              5
            ]
          ],
          5
        ],
        "expected": 7,
        "reason": "Combina los dos primeros."
      },
      {
        "args": [
          [
            [
              2,
              3
            ]
          ],
          4
        ],
        "expected": 3,
        "reason": "No reutilices el objeto."
      },
      {
        "args": [
          [],
          8
        ],
        "expected": 0,
        "reason": "Sin objetos."
      },
      {
        "args": [
          [
            [
              1,
              9
            ]
          ],
          0
        ],
        "expected": 0,
        "reason": "Capacidad cero."
      },
      {
        "args": [
          [
            [
              6,
              20
            ],
            [
              2,
              4
            ]
          ],
          3
        ],
        "expected": 4,
        "reason": "Descarta lo que no cabe."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "heap",
    "title": "Cola de prioridad y frecuencias",
    "level": "07 · Cola de prioridad y frecuencias",
    "description": "Combina conteo, prioridades y una regla de desempate.",
    "concepts": [
      {
        "title": "Contar antes de ordenar",
        "text": "Construye un diccionario de frecuencias. El problema no ordena todas las apariciones, sino los valores distintos según su cantidad."
      },
      {
        "title": "Definir una prioridad total",
        "text": "La pareja (-frecuencia, valor) pone primero la frecuencia mayor y después el entero menor. heapq implementa un montículo mínimo.",
        "code": "from heapq import heapify, heappop\nheap = [(-cantidad, valor) for valor, cantidad in frecuencias.items()]\nheapify(heap)"
      },
      {
        "title": "Extraer solo lo necesario",
        "text": "Construir el montículo cuesta O(m), con m valores distintos; extraer k resultados cuesta O(k log m). Si k supera m, entrega todos."
      }
    ],
    "task": "Devuelve los k enteros distintos más frecuentes, ordenados por frecuencia descendente y por valor ascendente en empates. k es no negativo. Si faltan valores distintos, devuelve los disponibles.",
    "signature": "resolver(valores, k)",
    "starter": "def resolver(valores, k):\n    # Construye tu solución\n    pass\n",
    "hint": "Cuenta primero; usa prioridades (-cantidad, valor) para que heapq respete ambos criterios.",
    "solution": "from collections import Counter\nfrom heapq import heapify, heappop\n\ndef resolver(valores, k):\n    heap = [(-cantidad, valor) for valor, cantidad in Counter(valores).items()]\n    heapify(heap)\n    return [heappop(heap)[1] for _ in range(min(k, len(heap)))]\n",
    "tests": [
      {
        "args": [
          [
            3,
            3,
            2,
            2,
            1
          ],
          2
        ],
        "expected": [
          2,
          3
        ],
        "reason": "Empate por entero menor."
      },
      {
        "args": [
          [
            5,
            5,
            1
          ],
          5
        ],
        "expected": [
          5,
          1
        ],
        "reason": "k supera los distintos."
      },
      {
        "args": [
          [],
          3
        ],
        "expected": [],
        "reason": "Sin datos."
      },
      {
        "args": [
          [
            1,
            2
          ],
          0
        ],
        "expected": [],
        "reason": "No se pide ningún valor."
      },
      {
        "args": [
          [
            -1,
            -2,
            -1,
            -2
          ],
          2
        ],
        "expected": [
          -2,
          -1
        ],
        "reason": "Empate entre negativos."
      }
    ]
  },
  {
    "tier": "Avanzado",
    "slug": "dijkstra",
    "title": "Dijkstra y caminos mínimos",
    "level": "08 · Dijkstra y caminos mínimos",
    "description": "Actualiza distancias y procesa primero la mejor candidata.",
    "concepts": [
      {
        "title": "Requisito: pesos no negativos",
        "text": "Dijkstra se apoya en que ampliar un camino no reduce su coste. No lo uses con pesos negativos. El grafo es dirigido y cada arista se representa por [destino, peso]."
      },
      {
        "title": "Relajar una arista",
        "text": "Si distancia[u]+peso mejora la distancia conocida a v, guarda esa mejora y añádela a una cola de prioridad. Un nodo puede aparecer varias veces con costes anteriores."
      },
      {
        "title": "Descartar entradas obsoletas",
        "text": "Al extraer (coste,u), ignóralo si coste ya no coincide con la mejor distancia de u. Esto evita repetir trabajo sobre candidatos superados.",
        "code": "if coste != dist[u]:\n    continue"
      }
    ],
    "task": "Devuelve el coste mínimo desde inicio hasta fin. grafo[u] contiene pares [v, peso] con índices válidos y pesos enteros no negativos. Devuelve -1 si no hay camino. El grafo no está vacío.",
    "signature": "resolver(grafo, inicio, fin)",
    "starter": "def resolver(grafo, inicio, fin):\n    # Construye tu solución\n    pass\n",
    "hint": "Usa un heap mínimo de (coste, vértice), inicializa con (0, inicio) y relaja solo mejoras.",
    "solution": "from heapq import heappush, heappop\n\ndef resolver(grafo, inicio, fin):\n    dist = [float(\"inf\")] * len(grafo)\n    dist[inicio] = 0\n    cola = [(0, inicio)]\n    while cola:\n        coste, u = heappop(cola)\n        if coste != dist[u]:\n            continue\n        if u == fin:\n            return coste\n        for v, peso in grafo[u]:\n            nuevo = coste + peso\n            if nuevo < dist[v]:\n                dist[v] = nuevo\n                heappush(cola, (nuevo, v))\n    return -1\n",
    "tests": [
      {
        "args": [
          [
            [
              [
                1,
                8
              ],
              [
                2,
                2
              ]
            ],
            [
              [
                3,
                1
              ]
            ],
            [
              [
                1,
                1
              ],
              [
                3,
                9
              ]
            ],
            []
          ],
          0,
          3
        ],
        "expected": 4,
        "reason": "Un camino indirecto es mejor."
      },
      {
        "args": [
          [
            [
              [
                1,
                0
              ]
            ],
            []
          ],
          0,
          1
        ],
        "expected": 0,
        "reason": "Arista de coste cero."
      },
      {
        "args": [
          [
            [],
            []
          ],
          0,
          1
        ],
        "expected": -1,
        "reason": "Sin camino."
      },
      {
        "args": [
          [
            []
          ],
          0,
          0
        ],
        "expected": 0,
        "reason": "No hace falta desplazarse."
      },
      {
        "args": [
          [
            [
              [
                1,
                2
              ]
            ],
            [
              [
                0,
                2
              ],
              [
                2,
                3
              ]
            ],
            []
          ],
          0,
          2
        ],
        "expected": 5,
        "reason": "Un ciclo no debe bloquear el algoritmo."
      }
    ]
  }
];
