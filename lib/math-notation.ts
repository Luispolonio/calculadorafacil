// Convert the limited plain notation used in generated exercises, not arbitrary TeX.
export function notation(text:string):string {
 return text.replace(/−/g,'-').replace(/·/g,'\\cdot ').replace(/×/g,'\\times ').replace(/÷/g,'\\div ').replace(/π/g,'\\pi ').replace(/∞/g,'\\infty ').replace(/≤/g,'\\le ').replace(/≥/g,'\\ge ').replace(/≠/g,'\\ne ').replace(/≈/g,'\\approx ').replace(/∩/g,'\\cap ').replace(/∪/g,'\\cup ').replace(/∅/g,'\\varnothing ').replace(/²/g,'^{2}').replace(/³/g,'^{3}').replace(/′/g,"'").replace(/θ/g,'\\theta ').replace(/\b(?:sen|sin)\(/g,'\\sin(').replace(/\^(\d+)/g,'^{$1}').replace(/_(\d+)/g,'_{$1}');
}
export function exerciseMath(question:string):{text:string;latex?:string} {
 const patterns=[/^Resuelve (.+)\. ¿Cuánto vale x\?$/, /^Resuelve (.+)\.$/, /^Si f\(x\) = (.+), ¿cuál es f′\(1\)\?$/, /^Calcula el producto escalar de u = (.+) y v = (.+)\.$/];
 let match=question.match(patterns[0]); if(match)return{text:'Resuelve la ecuación. ¿Cuánto vale x?',latex:notation(match[1])};
 match=question.match(patterns[1]);if(match)return{text:'Resuelve la desigualdad.',latex:notation(match[1])};
 match=question.match(patterns[2]);if(match)return{text:'Deriva la función y evalúa su derivada en x = 1.',latex:`f(x)=${notation(match[1])},\\qquad f'(1)=?`};
 match=question.match(/^Calcula la integral de (.+) entre (.+) y (.+)\.$/);if(match)return{text:'Calcula la siguiente integral definida.',latex:`\\int_{${match[2]}}^{${match[3]}} ${notation(match[1])}\\,dx`};
 match=question.match(/^¿Cuál es la raíz (menor|mayor) de (.+)\?$/);if(match)return{text:`¿Cuál es la raíz ${match[1]} de esta ecuación?`,latex:notation(match[2])};
 match=question.match(/^Calcula lim cuando x → (.+) de \(x² − (.+)\) \/ \(x − (.+)\)\.$/);if(match)return{text:'Calcula el límite.',latex:`\\lim_{x\\to ${match[1]}}\\frac{x^2-${match[2]}}{x-${match[3]}}`};
 match=question.match(/^A = (.+) y B = (.+)\. ¿Cuál es A ∩ B\?$/);if(match)return{text:'¿Cuál es la intersección de estos conjuntos?',latex:`A=${notation(match[1]).replaceAll('{','\\{').replaceAll('}','\\}')},\\quad B=${notation(match[2]).replaceAll('{','\\{').replaceAll('}','\\}')}`};
 match=question.match(/^Calcula el determinante de la matriz \[\[(.+), (.+)\], \[(.+), (.+)\]\]\.$/);if(match)return{text:'Calcula el determinante de esta matriz.',latex:`A=\\begin{pmatrix}${match[1]}&${match[2]}\\\\${match[3]}&${match[4]}\\end{pmatrix}`};
 match=question.match(/^Calcula log en base (.+) de (.+)\.$/);if(match)return{text:'Calcula el logaritmo.',latex:`\\log_{${match[1]}}(${match[2]})`};
 match=question.match(/^¿Cuál es la raíz cúbica real de (.+)\?$/);if(match)return{text:'Calcula la raíz cúbica real.',latex:`\\sqrt[3]{${match[1]}}`};
 match=question.match(/^¿Cuánto vale sen\((.+)°\)\?$/);if(match)return{text:'Calcula el seno de este ángulo.',latex:`\\sin(${match[1]}^\\circ)`};
 match=question.match(patterns[3]);if(match)return{text:'Calcula el producto escalar de estos vectores.',latex:`u=${notation(match[1])},\\quad v=${notation(match[2])}`};
 return{text:question};
}

// Presentation for controlled exercise templates. Word boundaries keep prose intact.
export function practiceProse(text:string):string {
 const atom=String.raw`(?:(?:Área|base|altura|det|mcd|sin|cos|sen|[abcdknmpruvxyABCFS]+)[₀₁₂ₙ²³′]*\([^()]*\)|\([^()]*\)|[−-]?\d+(?:\.\d+)?|(?:Área|base|altura|det|mcd|sin|cos|sen|[abcdknmpruvxyABCFS]+)[₀₁₂ₙ²³′]*)`;
 const formula=new RegExp(String.raw`(?<![\p{L}\d])${atom}(?:(?:\s*[+−=≥≤≠·*/^]\s*)${atom}|[²³]|${atom})*(?![\p{L}\d])`,'gu');
 return text.replace(formula,match=>{
  if(!/[+−=≥≤≠·*/^²³₀₁₂ₙ(]/.test(match))return match;
  const latex=notation(match).replace(/₁/g,'_1').replace(/₂/g,'_2').replace(/ₙ/g,'_n').replace(/°/g,'^\\circ').replace(/Área/g,'A').replace(/\b(base|altura)\b/g,(_,word:string)=>`\\text{${word}}`).replace(/\bmcd\(/g,'\\gcd(').replace(/\bdet\b/g,'\\det');
  return `\\(${latex}\\)`;
 });
}
