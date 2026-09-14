export type Localized = [string, string];

export type CalculatorGuide = {
  overview: Localized[];
  uses: Localized[];
  interpretation: Localized;
  pitfalls: Localized[];
  faqs: { question: Localized; answer: Localized }[];
  methodology: Localized;
  reference?: { label: string; url: string };
};

export const calculatorGuides: Record<string, CalculatorGuide> = {
  porcentaje: {
    overview: [
      ["Un porcentaje expresa una parte de cada cien. Esta representación permite comparar cantidades de tamaños distintos con una misma escala: 20% significa 20 de cada 100, sin importar si hablamos de dólares, estudiantes o kilómetros.", "A percentage expresses a part out of one hundred. It lets you compare quantities of different sizes on the same scale: 20% means 20 out of every 100, whether the subject is dollars, students, or kilometres."],
      ["La calculadora principal obtiene una fracción porcentual de una cantidad. En las herramientas avanzadas también puedes encontrar el porcentaje que representa una cifra, calcular aumentos y reducciones, comparar variaciones y recuperar el valor original antes de un cambio.", "The main calculator finds a percentage of an amount. The advanced tools also let you find what percentage one number represents, calculate increases and decreases, compare changes, and recover the original value before a change."],
    ],
    uses: [["Comprobar impuestos, propinas o comisiones.", "Check taxes, tips, or commissions."], ["Medir una subida o caída entre dos valores.", "Measure an increase or decrease between two values."], ["Comparar proporciones aunque los totales sean diferentes.", "Compare proportions even when totals differ."]],
    interpretation: ["El resultado conserva la unidad de la cantidad inicial. Si calculas 15% de $80, el resultado es $12. Un aumento del 15% no es 15: debes sumar esos $12 al valor inicial para obtener $92.", "The result keeps the unit of the original amount. If you calculate 15% of $80, the result is $12. A 15% increase is not 15: add the $12 to the starting value to obtain $92."],
    pitfalls: [["Confundir porcentaje con puntos porcentuales.", "Confusing percentages with percentage points."], ["Aplicar sucesivamente dos cambios como si se sumaran.", "Treating successive changes as if they simply added."], ["Redondear demasiado pronto en cálculos monetarios.", "Rounding too early in monetary calculations."]],
    faqs: [
      { question: ["¿Un aumento de 20% y una reducción de 20% se cancelan?", "Do a 20% increase and a 20% decrease cancel out?"], answer: ["No. Si 100 sube a 120 y luego baja 20%, termina en 96 porque el segundo porcentaje se aplica sobre una base distinta.", "No. If 100 rises to 120 and then falls 20%, it ends at 96 because the second percentage uses a different base."] },
      { question: ["¿Qué son los puntos porcentuales?", "What are percentage points?"], answer: ["Son la diferencia directa entre dos porcentajes. Pasar de 30% a 35% son 5 puntos porcentuales, pero un aumento relativo de 16,67%.", "They are the direct difference between two percentages. Moving from 30% to 35% is 5 percentage points, but a 16.67% relative increase."] },
    ],
    methodology: ["Usamos aritmética decimal y mostramos la fórmula aplicada. Los resultados no incluyen reglas fiscales o comerciales particulares.", "We use decimal arithmetic and show the applied formula. Results do not include jurisdiction-specific tax or commercial rules."],
  },
  promedio: {
    overview: [
      ["La media aritmética resume un conjunto de datos en un solo valor. Se obtiene sumando todas las observaciones y dividiendo entre su cantidad. Es útil cuando cada dato tiene la misma importancia.", "The arithmetic mean summarises a data set in one value. It is calculated by adding all observations and dividing by their count. It is useful when every value has equal importance."],
      ["Una media no describe por sí sola toda la distribución. Por eso mostramos también suma, mínimo, máximo y cantidad de datos, y ofrecemos cálculos de mediana, rango, varianza y promedio ponderado.", "A mean alone does not describe the full distribution. That is why we also show the sum, minimum, maximum, and count, with advanced calculations for median, range, variance, and weighted average."],
    ],
    uses: [["Resumir calificaciones o mediciones repetidas.", "Summarise grades or repeated measurements."], ["Comparar el rendimiento de varios periodos.", "Compare performance across periods."], ["Detectar si valores extremos alteran el resultado.", "Check whether outliers distort the result."]],
    interpretation: ["La media siempre queda entre el mínimo y el máximo, pero puede no coincidir con ningún dato real. Si hay valores muy extremos, compara también la mediana, que suele representar mejor el centro del conjunto.", "The mean always falls between the minimum and maximum, but may not equal any observed value. If there are extreme values, compare it with the median, which may better represent the centre."],
    pitfalls: [["Mezclar datos con unidades diferentes.", "Mixing values with different units."], ["Ignorar pesos cuando algunas notas valen más.", "Ignoring weights when some grades count more."], ["Interpretar la media como garantía para cada individuo.", "Treating the mean as a guarantee for every individual."]],
    faqs: [
      { question: ["¿Cuándo uso un promedio ponderado?", "When should I use a weighted average?"], answer: ["Cuando los valores no tienen la misma importancia, por ejemplo una tarea de 20% y un examen de 80%.", "When values do not have equal importance, such as an assignment worth 20% and an exam worth 80%."] },
      { question: ["¿Se pueden incluir números negativos?", "Can negative numbers be included?"], answer: ["Sí. Sepáralos por comas; forman parte de la suma igual que cualquier otro valor.", "Yes. Separate them with commas; they contribute to the sum like any other value."] },
    ],
    methodology: ["La herramienta elimina entradas vacías, conserva valores finitos y calcula la media sobre el número real de observaciones válidas.", "The tool removes empty entries, keeps finite values, and calculates the mean using the actual count of valid observations."],
  },
  "regla-de-tres": {
    overview: [
      ["La regla de tres resuelve una proporción cuando conoces tres valores y buscas el cuarto. En una relación directa, si una cantidad aumenta, la otra lo hace en la misma proporción.", "The rule of three solves a proportion when three values are known and the fourth is missing. In a direct relationship, when one quantity increases, the other increases by the same proportion."],
      ["Antes de usarla debes comprobar que la relación sea realmente proporcional. Un taxi puede tener una tarifa fija más un precio por kilómetro; en ese caso el coste no crece desde cero y una regla de tres simple daría una respuesta incorrecta.", "Before using it, confirm that the relationship is truly proportional. A taxi may charge a fixed fee plus a price per kilometre; then cost does not grow from zero and a simple proportion would be wrong."],
    ],
    uses: [["Escalar ingredientes de una receta.", "Scale ingredients in a recipe."], ["Convertir precio por cantidad.", "Convert price by quantity."], ["Ajustar medidas de planos o mezclas.", "Adjust measurements in plans or mixtures."]],
    interpretation: ["La fórmula X = (B × C) ÷ A mantiene constante la razón B/A. Las unidades de A y C deben corresponder entre sí; la respuesta tendrá la misma unidad que B.", "The formula X = (B × C) ÷ A keeps the ratio B/A constant. A and C must use corresponding units; the answer has the same unit as B."],
    pitfalls: [["Usarla con una relación inversa sin cambiar el planteamiento.", "Using it for an inverse relationship without changing the setup."], ["Colocar valores equivalentes en columnas distintas.", "Putting corresponding values in different columns."], ["Dividir entre cero o mezclar unidades.", "Dividing by zero or mixing units."]],
    faqs: [
      { question: ["¿Cómo sé si es directa o inversa?", "How do I know whether it is direct or inverse?"], answer: ["Es directa si ambas cantidades aumentan juntas; es inversa si una aumenta mientras la otra disminuye proporcionalmente.", "It is direct if both quantities increase together; it is inverse if one increases while the other decreases proportionally."] },
      { question: ["¿Puedo trabajar con decimales?", "Can I use decimals?"], answer: ["Sí, siempre que todos los valores representen magnitudes compatibles.", "Yes, provided all values represent compatible quantities."] },
    ],
    methodology: ["Validamos que el divisor no sea cero y aplicamos la proporción indicada sin asumir impuestos, costes fijos ni redondeos comerciales.", "We verify that the divisor is not zero and apply the stated proportion without assuming taxes, fixed costs, or commercial rounding."],
  },
  "calculadora-notas": {
    overview: [
      ["Esta calculadora estima la calificación necesaria en una evaluación pendiente para alcanzar un promedio objetivo. Separa el curso en dos partes: el trabajo ya evaluado y el examen final con su peso porcentual.", "This calculator estimates the score needed on a remaining assessment to reach a target average. It separates the course into completed work and the final exam with its percentage weight."],
      ["El resultado depende de que el promedio actual represente correctamente toda la parte completada. Si tu institución redondea, descarta la nota más baja o usa categorías con pesos distintos, debes incorporar primero esas reglas.", "The result assumes the current average correctly represents all completed work. If your institution rounds, drops the lowest score, or weights categories differently, apply those rules first."],
    ],
    uses: [["Planificar una meta realista para el examen final.", "Plan a realistic target for the final exam."], ["Evaluar distintos escenarios de ponderación.", "Evaluate different weighting scenarios."], ["Comprobar si un objetivo aún es matemáticamente alcanzable.", "Check whether a target is still mathematically achievable."]],
    interpretation: ["Si el resultado supera la nota máxima de tu escala, el objetivo no puede alcanzarse solo con esa evaluación. Si es negativo, ya superaste el objetivo incluso obteniendo cero, salvo que existan reglas mínimas obligatorias.", "If the result exceeds the maximum score on your scale, the target cannot be reached through that assessment alone. A negative result means the target is already secured even with zero, unless minimum-score rules apply."],
    pitfalls: [["Introducir 40 en vez de 0,40 en una fórmula manual.", "Entering 40 instead of 0.40 in a manual formula."], ["Mezclar escalas de 10, 20 y 100 puntos.", "Mixing 10-, 20-, and 100-point scales."], ["Olvidar requisitos de asistencia o nota mínima.", "Forgetting attendance or minimum-score requirements."]],
    faqs: [
      { question: ["¿Sirve para cualquier escala?", "Does it work with any grading scale?"], answer: ["Sí, si promedio actual, objetivo y resultado usan la misma escala.", "Yes, if the current average, target, and result all use the same scale."] },
      { question: ["¿El resultado garantiza que aprobaré?", "Does the result guarantee that I will pass?"], answer: ["No; es una estimación matemática. Confirma la política oficial de evaluación con tu institución.", "No; it is a mathematical estimate. Confirm the official grading policy with your institution."] },
    ],
    methodology: ["Resolvemos la ecuación objetivo = actual × peso completado + nota final × peso final. No aplicamos reglas académicas externas.", "We solve target = current × completed weight + final score × final weight. We do not apply external academic rules."],
  },
  prestamo: {
    overview: [
      ["La calculadora estima la cuota constante de un préstamo amortizable. Cada pago cubre primero los intereses del saldo pendiente y después reduce capital; por eso al inicio suele pagarse más interés que al final.", "This calculator estimates the fixed payment on an amortising loan. Each payment covers interest on the outstanding balance and then reduces principal, so early payments usually contain more interest than later ones."],
      ["La tasa introducida se convierte en tasa mensual y el plazo en número de cuotas. El resultado muestra cuota, total estimado e intereses, pero no añade seguros, comisiones, impuestos ni cargos por mora.", "The entered annual rate is converted to a monthly rate and the term to a number of payments. The result shows payment, estimated total, and interest, but excludes insurance, fees, taxes, and late charges."],
    ],
    uses: [["Comparar plazos para una misma cantidad.", "Compare terms for the same amount."], ["Estimar el coste total antes de pedir crédito.", "Estimate total cost before borrowing."], ["Explorar el efecto de una tasa más baja.", "Explore the effect of a lower rate."]],
    interpretation: ["Una cuota menor no siempre significa un préstamo más barato: al ampliar el plazo puedes pagar más intereses totales. Compara siempre cuota, total pagado y coste adicional.", "A lower payment does not always mean a cheaper loan: a longer term can produce more total interest. Always compare the payment, total paid, and added cost."],
    pitfalls: [["Confundir tasa nominal con tasa efectiva o APR.", "Confusing nominal rate with effective rate or APR."], ["No incluir comisiones obligatorias.", "Leaving out mandatory fees."], ["Suponer que todas las entidades redondean igual.", "Assuming every lender rounds the same way."]],
    faqs: [
      { question: ["¿Por qué la oferta del banco puede ser distinta?", "Why can a lender's quote differ?"], answer: ["Puede incluir seguros, comisiones, otra frecuencia de pago o una tasa efectiva diferente.", "It may include insurance, fees, another payment frequency, or a different effective rate."] },
      { question: ["¿Qué ocurre con tasa cero?", "What happens at a zero rate?"], answer: ["El capital se divide entre el número de cuotas, sin intereses estimados.", "Principal is divided by the number of payments, with no estimated interest."] },
    ],
    methodology: ["Aplicamos la fórmula estándar de anualidad vencida con pagos mensuales iguales. Es una simulación educativa, no una oferta financiera.", "We apply the standard ordinary-annuity formula with equal monthly payments. This is an educational estimate, not a financial offer."],
    reference: { label: "Consumer Financial Protection Bureau — Understand your loan options", url: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" },
  },
  "interes-compuesto": {
    overview: [
      ["El interés compuesto añade cada rendimiento al capital para que también genere rendimientos futuros. La combinación de tiempo, tasa y aportes periódicos puede producir una diferencia considerable frente al interés simple.", "Compound interest adds each return to principal so it can earn future returns as well. The combination of time, rate, and recurring contributions can produce a substantial difference compared with simple interest."],
      ["Nuestra proyección supone una tasa constante, capitalización mensual y aportes al final de cada mes. Los mercados reales fluctúan, por lo que el valor mostrado es un escenario matemático y no una predicción.", "Our projection assumes a constant rate, monthly compounding, and contributions at the end of each month. Real markets fluctuate, so the displayed value is a mathematical scenario rather than a forecast."],
    ],
    uses: [["Comparar ahorrar hoy frente a empezar más tarde.", "Compare saving today with starting later."], ["Medir el efecto de aportes mensuales.", "Measure the effect of monthly contributions."], ["Separar capital aportado de crecimiento estimado.", "Separate contributed principal from estimated growth."]],
    interpretation: ["El valor futuro incluye tu capital y el rendimiento calculado. La diferencia entre valor futuro y aportado es interés estimado, no una ganancia garantizada ni ajustada por impuestos, inflación o comisiones.", "Future value includes principal and calculated growth. The difference between future value and contributions is estimated interest, not a guaranteed return or one adjusted for taxes, inflation, or fees."],
    pitfalls: [["Tratar una rentabilidad histórica como garantía.", "Treating historical returns as guaranteed."], ["Ignorar inflación, impuestos y costes.", "Ignoring inflation, taxes, and costs."], ["Comparar tasas con distinta frecuencia de capitalización.", "Comparing rates with different compounding frequencies."]],
    faqs: [
      { question: ["¿Los aportes se hacen al inicio o al final del mes?", "Are contributions made at the start or end of each month?"], answer: ["Esta herramienta los considera al final de cada mes, una anualidad vencida.", "This tool treats them as end-of-month contributions, an ordinary annuity."] },
      { question: ["¿Incluye inflación?", "Does it include inflation?"], answer: ["La proyección principal no. Usa la herramienta de tasa real para comparar crecimiento e inflación.", "The main projection does not. Use the real-rate tool to compare growth and inflation."] },
    ],
    methodology: ["Combinamos el valor futuro del capital inicial con el valor futuro de una serie de aportes mensuales. No ofrecemos asesoramiento de inversión.", "We combine the future value of starting principal with the future value of monthly contributions. We do not provide investment advice."],
    reference: { label: "Investor.gov — Compound Interest Calculator", url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
  },
  edad: {
    overview: [
      ["La edad civil cuenta años completos desde la fecha de nacimiento hasta la fecha actual. No basta con dividir los días entre 365 porque existen años bisiestos y meses de distinta duración.", "Civil age counts completed calendar years from the birth date to today. Dividing days by 365 is not sufficient because leap years and months have different lengths."],
      ["La herramienta compara mes y día para saber si el cumpleaños de este año ya ocurrió. También muestra días vividos aproximados como una medida separada.", "The tool compares month and day to determine whether this year's birthday has occurred. It also displays approximate days lived as a separate measure."],
    ],
    uses: [["Comprobar años cumplidos en una fecha.", "Check completed years on a date."], ["Calcular días aproximados desde el nacimiento.", "Calculate approximate days since birth."], ["Planificar aniversarios y requisitos por edad.", "Plan anniversaries and age-based requirements."]],
    interpretation: ["Los años mostrados son años completos. El total de días depende de la zona horaria y de cómo se trate la hora dentro de cada fecha; para trámites oficiales prevalecen las reglas de la autoridad correspondiente.", "Displayed years are completed years. Total days can depend on time zone and date-time handling; rules from the relevant authority prevail for official procedures."],
    pitfalls: [["Introducir una fecha futura.", "Entering a future date."], ["Usar días aproximados como edad legal.", "Using approximate days as legal age."], ["Olvidar diferencias de zona horaria cerca de medianoche.", "Forgetting time-zone differences near midnight."]],
    faqs: [
      { question: ["¿Cómo se trata el 29 de febrero?", "How is February 29 handled?"], answer: ["La edad anual sigue el calendario del dispositivo; algunas jurisdicciones consideran el 28 de febrero y otras el 1 de marzo en años no bisiestos.", "Annual age follows the device calendar; some jurisdictions use February 28 and others March 1 in non-leap years."] },
      { question: ["¿La edad calculada sirve para un trámite?", "Can the calculated age be used officially?"], answer: ["Úsala como referencia y confirma siempre la norma y fecha de corte del trámite.", "Use it as a reference and always confirm the procedure's rule and cutoff date."] },
    ],
    methodology: ["Calculamos años completos por calendario y días transcurridos mediante marcas de tiempo locales. No determinamos mayoría de edad legal.", "We calculate completed calendar years and elapsed days using local timestamps. We do not determine legal adulthood."],
  },
  "diferencia-fechas": {
    overview: [
      ["La diferencia entre fechas puede expresarse como días transcurridos o como unidades de calendario. Un mes no tiene una duración fija: puede contener 28, 29, 30 o 31 días.", "The difference between dates can be expressed as elapsed days or calendar units. A month has no fixed length: it can contain 28, 29, 30, or 31 days."],
      ["La calculadora principal obtiene días absolutos y sus equivalencias en semanas y horas. Para plazos laborales o contractuales debes distinguir entre días naturales y hábiles.", "The main calculator finds absolute elapsed days and equivalents in weeks and hours. For employment or contractual deadlines, distinguish calendar days from business days."],
    ],
    uses: [["Medir la duración de un proyecto o viaje.", "Measure a project or trip duration."], ["Contar tiempo entre eventos.", "Count time between events."], ["Estimar semanas u horas de un periodo.", "Estimate weeks or hours in a period."]],
    interpretation: ["El resultado usa la diferencia absoluta, por lo que intercambiar las fechas no cambia el número. Si necesitas saber si un plazo está vencido, también debes conservar el orden cronológico.", "The result uses the absolute difference, so swapping dates does not change the number. To determine whether a deadline has passed, you must also preserve chronological order."],
    pitfalls: [["Confundir días transcurridos con fechas incluidas.", "Confusing elapsed days with inclusive dates."], ["Asumir que todos los meses equivalen a 30 días.", "Assuming every month equals 30 days."], ["Ignorar festivos al contar días laborables.", "Ignoring holidays when counting business days."]],
    faqs: [
      { question: ["¿Se cuentan ambas fechas?", "Are both dates counted?"], answer: ["La diferencia estándar cuenta el tiempo entre ellas. Para un conteo inclusivo de días, suma uno al resultado.", "The standard difference counts the time between them. Add one for an inclusive day count."] },
      { question: ["¿Incluye días festivos?", "Does it include holidays?"], answer: ["La diferencia principal incluye todos los días. Los festivos dependen del país y no se descuentan automáticamente.", "The main difference includes every day. Holidays depend on the country and are not removed automatically."] },
    ],
    methodology: ["Normalizamos las fechas y dividimos la diferencia temporal entre 86.400.000 milisegundos. Los cambios horarios pueden requerir reglas especiales en cálculos con horas exactas.", "We normalise dates and divide the time difference by 86,400,000 milliseconds. Daylight-saving changes may require special rules for exact-hour calculations."],
  },
  descuento: {
    overview: [
      ["Un descuento reduce el precio original en una proporción determinada. Primero se calcula el ahorro y después se resta del precio de referencia; el porcentaje no es una cantidad monetaria por sí mismo.", "A discount reduces the original price by a stated proportion. Savings are calculated first and then subtracted from the reference price; the percentage is not a monetary amount by itself."],
      ["La herramienta sirve para descuentos simples y escenarios combinados. Dos descuentos sucesivos se aplican uno después del otro y no deben sumarse directamente.", "The tool supports simple discounts and combined scenarios. Two successive discounts are applied one after the other and should not be added directly."],
    ],
    uses: [["Comparar promociones de distintas tiendas.", "Compare promotions from different shops."], ["Calcular ahorro y precio final.", "Calculate savings and final price."], ["Comprobar descuentos sucesivos o con impuestos.", "Check successive discounts or tax scenarios."]],
    interpretation: ["Para un precio de $120 con 25% de descuento, ahorras $30 y pagas $90 antes de impuestos o cargos adicionales. Verifica siempre qué precio usa el comercio como base.", "For a $120 price with a 25% discount, you save $30 and pay $90 before taxes or extra charges. Always verify which price the merchant uses as the base."],
    pitfalls: [["Sumar descuentos consecutivos.", "Adding consecutive discounts."], ["Aplicar impuestos sobre una base incorrecta.", "Applying tax to the wrong base."], ["Comparar porcentajes sin comparar precios iniciales.", "Comparing percentages without comparing starting prices."]],
    faqs: [
      { question: ["¿30% más 20% equivale a 50%?", "Does 30% plus 20% equal 50%?"], answer: ["No si son sucesivos: queda 70% y después 80% de ese valor, equivalente a pagar 56% y ahorrar 44%.", "Not when successive: 70% remains, then 80% of that amount, meaning you pay 56% and save 44%."] },
      { question: ["¿Incluye impuestos?", "Does it include tax?"], answer: ["El cálculo principal no. Confirma si el impuesto se aplica antes o después del descuento según la normativa local.", "The main calculation does not. Confirm whether tax is applied before or after the discount under local rules."] },
    ],
    methodology: ["Calculamos ahorro = precio × porcentaje/100 y precio final = precio − ahorro. No verificamos la autenticidad de promociones comerciales.", "We calculate savings = price × percentage/100 and final price = price − savings. We do not verify the authenticity of commercial promotions."],
  },
  convertir: {
    overview: [
      ["Convertir una longitud consiste en expresar la misma distancia con otra unidad. El valor numérico cambia, pero la magnitud física permanece igual.", "Converting length means expressing the same distance in another unit. The number changes, but the physical quantity remains the same."],
      ["La herramienta principal toma kilómetros y muestra metros, millas, pies y centímetros. Las operaciones avanzadas incluyen otras conversiones; usa siempre el tipo de magnitud correcto y no mezcles longitud con área o volumen.", "The main tool takes kilometres and displays metres, miles, feet, and centimetres. Advanced operations include other conversions; always use the correct quantity type and do not mix length with area or volume."],
    ],
    uses: [["Interpretar distancias de otro sistema de unidades.", "Interpret distances from another unit system."], ["Preparar medidas técnicas o cotidianas.", "Prepare technical or everyday measurements."], ["Comprobar equivalencias antes de redondear.", "Check equivalents before rounding."]],
    interpretation: ["Un kilómetro equivale exactamente a 1.000 metros y aproximadamente a 0,621371 millas. Las conversiones mostradas con decimales pueden estar redondeadas para facilitar su lectura.", "One kilometre equals exactly 1,000 metres and approximately 0.621371 miles. Decimal conversions may be rounded for readability."],
    pitfalls: [["Confundir milla terrestre con milla náutica.", "Confusing statute miles with nautical miles."], ["Aplicar un factor lineal a superficies o volúmenes.", "Applying a linear factor to area or volume."], ["Redondear antes de terminar una cadena de conversiones.", "Rounding before completing a conversion chain."]],
    faqs: [
      { question: ["¿Por qué algunos resultados tienen muchos decimales?", "Why do some results have many decimals?"], answer: ["Porque ciertos factores entre sistemas no producen decimales finitos. Conservamos precisión y redondeamos solo la presentación.", "Some factors between systems do not produce finite decimals. We preserve precision and round only the display."] },
      { question: ["¿Puedo convertir áreas con estos factores?", "Can I convert areas with these factors?"], answer: ["No directamente: para área debes elevar el factor al cuadrado y para volumen al cubo.", "Not directly: for area square the factor, and for volume cube it."] },
    ],
    methodology: ["Empleamos factores de conversión constantes del Sistema Internacional y equivalencias publicadas por NIST.", "We use constant conversion factors from the International System and equivalences published by NIST."],
    reference: { label: "NIST — SI Units", url: "https://www.nist.gov/pml/owm/si-units" },
  },
};
