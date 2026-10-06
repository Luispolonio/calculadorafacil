import { test } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { expression, solve } from '../lib/math-engine';
import { insertMath } from '../lib/expression-input';
import { catalog } from '../lib/catalog';
import { generateExercise } from '../lib/practice';
import { practiceProse, exerciseMath } from '../lib/math-notation';
test('Multiplicación implícita en números, variables, paréntesis y funciones',()=>{
 for(const [source,expected] of [['2x',6],['2x(x+1)',24],['ln(e)',1],['sen(pi/2)',1],['5(3+5)',40],['x(x+1)',12],['(x+1)(x-1)',8],['2sin(pi/2)',2],['3x²+2x',33]] as const)assert.ok(Math.abs(expression(source).evaluate({x:3})-expected)<1e-10,source);
 assert.equal(solve('integrales',{expression:'3x^2+2x',mode:'Definida',lower:'0',upper:'2'}).answer,'12');
 assert.match(solve('derivadas',{expression:'x(x+1)',order:'1'}).answer,/2/);
 assert.throws(()=>expression('x; import(2)'));
});
test('Botones insertan en el cursor y preservan el significado de una selección',()=>{
 assert.deepEqual(insertMath('2x + 1',0,2,'(',')^2','x'),{value:'(2x)^2 + 1',start:1,end:3});
 assert.equal(insertMath('2 + ',4,4,'sqrt(',')','x').value,'2 + sqrt(x)');
 assert.equal(expression(insertMath('x+1',0,3,'(',')^2','x').value).evaluate({x:2}),9);
});
function verify(text:string){for(const match of text.matchAll(/\\\(([\s\S]*?)\\\)/g))assert.doesNotThrow(()=>katex.renderToString(match[1],{throwOnError:true,strict:'error'}),match[1]);}
test('Cada ejemplo y todas las fórmulas de las ayudas del catálogo tienen LaTeX válido',()=>{
 for(const tool of catalog){assert.match(tool.example,/\\\(/,tool.slug);for(const text of [tool.theory,tool.example,tool.caution,...tool.fields.flatMap(f=>[f.label,f.help||''])])verify(text);}
});
test('Notación válida en todas las familias de práctica y dificultades',()=>{
 for(const tool of catalog)for(const level of ['Inicial','Intermedio','Avanzado'] as const)for(let i=0;i<10;i++){
  const e=generateExercise(tool.slug,level);verify(practiceProse(e.question));verify(practiceProse(e.explanation));const display=exerciseMath(e.question);if(display.latex)assert.doesNotThrow(()=>katex.renderToString(display.latex!,{throwOnError:true,strict:'error'}));
 }
 assert.equal(practiceProse('Al dividir entre −3, invierte el signo.'),'Al dividir entre \\(-3\\), invierte el signo.');
});
