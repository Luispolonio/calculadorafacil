import { parse, derivative } from 'mathjs';
import { explainResult } from './math-lessons';
import type { ExplanationStep } from './math-engine';
import type { Exercise, Difficulty } from './practice';
const random=(min:number,max:number)=>Math.floor(Math.random()*(max-min+1))+min;
const pick=<T>(values:T[])=>values[random(0,values.length-1)];
const tex=(source:string)=>parse(source).toTex({parenthesis:'auto',implicit:'hide'});
const number=(n:number)=>Number(n.toFixed(5)).toString();
const step=(title:string,explanation:string,latex?:string):ExplanationStep=>({title,explanation,latex});
function options(answer:number,candidates:number[]){
 const correct=number(answer),all=new Set([correct]);
 for(const candidate of candidates)if(Number.isFinite(candidate)&&all.size<4)all.add(number(candidate));
 while(all.size<4){const delta=pick([-1,1])*random(1,9)*Math.max(.1,Math.abs(answer)*.08);all.add(number(answer+delta));}
 const values=[...all];for(let i=values.length-1;i>0;i--){const j=random(0,i);[values[i],values[j]]=[values[j],values[i]];}
 return {correct,options:values};
}
export function calculusExercise(topic:'derivadas'|'integrales',difficulty:Difficulty):Exercise{
 const a=random(2,5)*pick([-1,1]),b=random(1,5),c=random(-5,5),n=random(2,difficulty==='Avanzado'?5:4);
 if(topic==='derivadas'){
  const families=difficulty==='Inicial'?['polinomio','potencia-compuesta']:difficulty==='Intermedio'?['producto','cociente','cadena-trigonometrica','exponencial']:['segundo-orden','logaritmo-compuesto','cociente-compuesto','exponente-variable','producto-trigonometrico'];
  const family=pick(families);let source='',order=1,point=pick([-3,-2,-.5,.5,1.5,2,3,4]);
  switch(family){
   case 'polinomio':source=`(${a})x^${n}+${b}x^2+(${c})x`;break;
   case 'potencia-compuesta':source=`((${a})x+${b})^${n}+(${c})x`;break;
   case 'producto':source=`(x^2+${b})*sin((${a})x)`;break;
   case 'cociente':source=`((${a})x^3+${b})/(x^2+${b})`;break;
   case 'cadena-trigonometrica':source=`sin((${a})x^2+${b})`;break;
   case 'exponencial':source=`x^2*exp((${a})x)`;point=pick([-.5,.5,1.5]);break;
   case 'segundo-orden':source=`(x^2+${b}x)*exp(x)`;order=2;break;
   case 'logaritmo-compuesto':source=`log(${b}x^2+${b})*sin(x)`;break;
   case 'cociente-compuesto':source=`sin((${a})x)/(x^2+${b})`;order=pick([1,2]);break;
   case 'exponente-variable':source=`x^x+(${a})*log(x)`;point=pick([.5,1.5,2,3,4]);break;
   default:source=`sin((${a})x)*cos(${b}x)`;order=2;
  }
  let derived=parse(source);for(let i=0;i<order;i++)derived=derivative(derived,'x');
  const answer=Number(derived.evaluate({x:point}));
  const explained=explainResult(topic,{expression:source,order:String(order)},{answer:String(answer),details:[],steps:[]});
  const workedSteps=[...explained.workedSteps!,step('Sustituir el punto solicitado',`Después de derivar ${order===1?'una vez':'dos veces'}, sustituimos la variable por ${point}. No sustituimos antes de derivar, porque convertiríamos la función en una constante.`,String.raw`f^{(${order})}(${point})=\left.${derived.toTex()}\right|_{x=${point}}`),step('Evaluar y redondear al final','Conservamos precisión durante las operaciones. Compara con las opciones redondeadas a cinco decimales; los ángulos se interpretan en radianes.',String.raw`f^{(${order})}(${point})\approx ${number(answer)}`)];
  return {topic,question:`Calcula la derivada de orden ${order} y evalúala en el punto indicado. Redondea a cinco decimales.`,latex:String.raw`f(x)=${tex(source)},\qquad f^{(${order})}(${point})=?`,...options(answer,[-answer,Number(parse(source).evaluate({x:point})),answer+point]),explanation:`Aplica las reglas de derivación antes de sustituir x = ${point}. El valor de orden ${order} es aproximadamente ${number(answer)}.`,workedSteps,family,verification:{source,point,order}};
 }
 const families=difficulty==='Inicial'?['polinomio','sustitucion-lineal']:difficulty==='Intermedio'?['sustitucion-cuadratica','logaritmica','por-partes','exponencial-lineal']:['partes-repetidas','sustitucion-potencia','trigonometrica-cuadrada','fracciones-parciales','producto-exponencial'];
 const family=pick(families);let source='',primitive='',method:ExplanationStep[]=[];
 const k=random(2,5),lower=random(difficulty==='Inicial'?-3:0,3),upper=lower+random(1,4);
 switch(family){
  case 'polinomio':
   source=`(${a})x^${n}+${b}x+(${c})`;primitive=`(${a})x^${n+1}/${n+1}+${b}x^2/2+(${c})x`;
   method=[step('Separar los términos','La integral es lineal. Integramos cada potencia conservando sus coeficientes y signos.',String.raw`\int (u+v+w)\,dx=\int u\,dx+\int v\,dx+\int w\,dx`),step('Aplicar la regla de potencia','Sumamos uno al exponente y dividimos por ese nuevo exponente. Una constante se multiplica por la variable.',String.raw`\int x^m\,dx=\frac{x^{m+1}}{m+1}\quad(m\ne-1)`)];break;
  case 'sustitucion-lineal':
   source=`(${k}x+${b})^${n}`;primitive=`(${k}x+${b})^${n+1}/(${k}*${n+1})`;
   method=[step('Elegir la sustitución','El argumento de la potencia es lineal. Lo usamos como nueva variable para convertir el integrando en una potencia simple.',String.raw`u=${k}x+${b},\qquad du=${k}\,dx`),step('Cambiar el diferencial e integrar','Dividimos por el coeficiente que apareció en du. Olvidar este factor produce una primitiva incorrecta.',String.raw`\int u^{${n}}\frac{du}{${k}}=\frac{u^{${n+1}}}{${k}(${n+1})}`)];break;
  case 'sustitucion-cuadratica':
   source=`${2*k}x*cos(${k}x^2+${b})`;primitive=`sin(${k}x^2+${b})`;
   method=[step('Reconocer una derivada interior','El factor exterior coincide con la derivada del argumento del coseno. Esto permite una sustitución directa.',String.raw`u=${k}x^2+${b},\quad du=${2*k}x\,dx`),step('Integrar en la nueva variable','Al reemplazar el producto exterior por du, solo queda integrar coseno. Después deshacemos la sustitución.',String.raw`\int\cos u\,du=\sin u`)];break;
  case 'logaritmica':
   source=`${2*k}x/(${k}x^2+${b})`;primitive=`log(${k}x^2+${b})`;
   method=[step('Comparar numerador y denominador','El numerador es la derivada del denominador. Como el denominador es positivo, su logaritmo real está definido en todo el intervalo.',String.raw`u=${k}x^2+${b}>0,\quad du=${2*k}x\,dx`),step('Aplicar la primitiva logarítmica','La sustitución convierte la expresión en uno sobre la variable. La positividad permite escribir logaritmo sin valor absoluto aquí.',String.raw`\int\frac{du}{u}=\ln u`)];break;
  case 'por-partes':
   source=`x*exp(${k}x)`;primitive=`exp(${k}x)*(x/${k}-1/${k*k})`;
   method=[step('Elegir las partes','Derivar x lo simplifica; integrar la exponencial mantiene su forma. Esa combinación reduce la dificultad de la integral restante.',String.raw`u=x,\quad dv=e^{${k}x}dx,\quad du=dx,\quad v=\frac{e^{${k}x}}{${k}}`),step('Aplicar integración por partes','Restamos la integral de v du al producto uv. Integramos la exponencial restante una segunda vez.',String.raw`\int u\,dv=uv-\int v\,du=\frac{xe^{${k}x}}{${k}}-\frac{e^{${k}x}}{${k*k}}`)];break;
  case 'exponencial-lineal':
   source=`${b}*exp(${k}x+${c})`;primitive=`${b}*exp(${k}x+${c})/${k}`;
   method=[step('Conservar el factor exterior','La constante multiplica toda la integral. La derivada del exponente es otra constante y debemos compensarla.',String.raw`u=${k}x+(${c}),\quad du=${k}dx`),step('Integrar y volver a la variable original','La primitiva de la exponencial en u es la misma exponencial. Dividimos por la pendiente de la sustitución.',String.raw`\frac{${b}}{${k}}\int e^u du=\frac{${b}}{${k}}e^u`)];break;
  case 'partes-repetidas':
   source=`${b}x^2*exp(x)`;primitive=`${b}*exp(x)*(x^2-2x+2)`;
   method=[step('Primera integración por partes','Elegimos la potencia como u para reducir su grado. Conservamos el coeficiente exterior durante todo el procedimiento.',String.raw`\int x^2e^x dx=x^2e^x-2\int xe^x dx`),step('Repetir sobre la integral restante','La nueva integral aún es un producto. Una segunda aplicación deja una exponencial elemental.',String.raw`\int xe^x dx=xe^x-e^x`),step('Reunir los términos','Sustituimos la segunda primitiva en la primera, distribuimos el signo negativo y recuperamos el coeficiente original.',String.raw`F(x)=${b}e^x(x^2-2x+2)`)];break;
  case 'sustitucion-potencia':
   source=`${2*k}x*(${k}x^2+${b})^${n}`;primitive=`(${k}x^2+${b})^${n+1}/${n+1}`;
   method=[step('Detectar el patrón de la cadena inversa','El factor lineal es exactamente la derivada de la expresión elevada a una potencia. No hace falta expandir todo el polinomio.',String.raw`u=${k}x^2+${b},\quad du=${2*k}x\,dx`),step('Integrar la potencia en u','La sustitución absorbe todo el factor exterior. Aplicamos la regla de potencia y después devolvemos u a su expresión en x.',String.raw`\int u^{${n}}du=\frac{u^{${n+1}}}{${n+1}}`)];break;
  case 'trigonometrica-cuadrada':
   source=`${b}*sin(${k}x)^2`;primitive=`${b}*(x/2-sin(${2*k}x)/${4*k})`;
   method=[step('Reducir la potencia con una identidad','La identidad del ángulo doble transforma el cuadrado de seno en una constante menos un coseno. Integrar el cuadrado como si fuera seno sería incorrecto.',String.raw`\sin^2(${k}x)=\frac{1-\cos(${2*k}x)}2`),step('Integrar ambos términos','Integramos la constante y el coseno por separado, dividiendo por la frecuencia del argumento en el segundo término.',String.raw`F(x)=${b}\left(\frac x2-\frac{\sin(${2*k}x)}{${4*k}}\right)`)];break;
  case 'fracciones-parciales':
   source=`1/((x+${b})*(x+${b+k}))`;primitive=`(log(x+${b})-log(x+${b+k}))/${k}`;
   method=[step('Separar los factores lineales','Buscamos constantes que permitan descomponer la fracción. Al llevar los términos al mismo denominador, los términos con x se cancelan.',String.raw`\frac1{(x+${b})(x+${b+k})}=\frac1{${k}}\left(\frac1{x+${b}}-\frac1{x+${b+k}}\right)`),step('Integrar cada fracción','Cada denominador tiene derivada uno. Sus primitivas son logaritmos; los argumentos son positivos en el intervalo elegido.',String.raw`F(x)=\frac{\ln(x+${b})-\ln(x+${b+k})}{${k}}`)];break;
  default:
   source=`exp(x)*sin(${k}x)`;primitive=`exp(x)*(sin(${k}x)-${k}*cos(${k}x))/${1+k*k}`;
   method=[step('Aplicar partes una primera vez','Llamamos I a la integral. Elegimos seno para derivar y exponencial para integrar; aparece una integral auxiliar J con coseno.',String.raw`I=e^x\sin(${k}x)-${k}J,\quad J=\int e^x\cos(${k}x)dx`),step('Aplicar partes a la integral auxiliar','Al derivar el coseno surge un seno con signo negativo. La integral original reaparece y podemos despejarla algebraicamente.',String.raw`J=e^x\cos(${k}x)+${k}I`),step('Reunir y despejar I','Sustituimos J, llevamos las copias de I al mismo miembro y dividimos entre su coeficiente.',String.raw`(1+${k*k})I=e^x\left(\sin(${k}x)-${k}\cos(${k}x)\right)`)];
 }
 // Keep exponential exercises within a numerically comfortable interval.
 const hi=family.includes('exponencial')||family==='por-partes'?Math.min(upper,lower+1):upper;
 const F=parse(primitive),fa=Number(F.evaluate({x:lower})),fb=Number(F.evaluate({x:hi})),answer=fb-fa;
 const workedSteps=[step('Identificar la integral y su dominio','Leemos la función y los dos extremos antes de elegir el método. En el intervalo de este ejercicio, el integrando es real y continuo.',String.raw`\int_{${lower}}^{${hi}}${tex(source)}\,dx`),...method,step('Escribir la primitiva completa','Volvemos a x y reunimos los factores. La constante de integración se cancelará al restar los valores en los dos extremos.',String.raw`F(x)=${tex(primitive)}`),step('Comprobar derivando','La derivada de esta primitiva debe devolver el integrando. Esta comprobación detecta signos incorrectos y factores olvidados de la regla de la cadena.',String.raw`F'(x)=${tex(source)}`),step('Evaluar el extremo superior','Sustituimos el extremo superior en la primitiva completa, no en el integrando.',String.raw`F(${hi})\approx${number(fb)}`),step('Evaluar el extremo inferior','Sustituimos el extremo inferior incluso cuando es cero: una primitiva puede no anularse allí.',String.raw`F(${lower})\approx${number(fa)}`),step('Restar antes de redondear','Aplicamos el teorema fundamental usando superior menos inferior. Las opciones se redondean a cinco decimales; los valores intermedios mostrados también son aproximaciones.',String.raw`\int_{${lower}}^{${hi}}${tex(source)}\,dx=F(${hi})-F(${lower})\approx${number(answer)}`)];
 return {topic,question:'Calcula esta integral definida. Elige el valor redondeado a cinco decimales.',latex:String.raw`\int_{${lower}}^{${hi}}${tex(source)}\,dx`,...options(answer,[-answer,fb,fb+fa]),explanation:`Usa el método indicado en el desarrollo, encuentra una primitiva y calcula F(${hi})−F(${lower}). El resultado es aproximadamente ${number(answer)}.`,workedSteps,family,verification:{source,primitive,lower,upper:hi}};
}
