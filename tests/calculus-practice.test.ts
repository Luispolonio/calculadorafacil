import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'mathjs';
import katex from 'katex';
import { generateExercise } from '../lib/practice';
import { expression } from '../lib/math-engine';
import { normalizeExpression } from '../lib/expression-input';
for(const topic of ['derivadas','integrales'] as const)test(`${topic}: variedad real, soluciones numéricas y LaTeX`,()=>{
 for(const level of ['Inicial','Intermedio','Avanzado'] as const){
  const families=new Set<string>(),statements=new Set<string>(),points=new Set<number>();
  for(let i=0;i<24;i++){
   const exercise=generateExercise(topic,level),v=exercise.verification!;
   families.add(exercise.family!);statements.add(exercise.latex!);
   assert.ok(exercise.workedSteps!.length>=7);assert.ok(v);
   for(const latex of [exercise.latex,...exercise.workedSteps!.map(s=>s.latex)].filter(Boolean))assert.doesNotThrow(()=>katex.renderToString(latex!,{throwOnError:true}));
   const f=parse(v.source).compile();const evaluate=(x:number)=>Number(f.evaluate({x}));
   let expected:number;
   if(topic==='derivadas'){
    const x=v.point!,h=v.order===2?1e-3:1e-5;points.add(x);
    expected=v.order===2?(evaluate(x+h)-2*evaluate(x)+evaluate(x-h))/(h*h):(evaluate(x+h)-evaluate(x-h))/(2*h);
    assert.ok(Math.abs(Number(exercise.correct)-expected)<1e-3*Math.max(1,Math.abs(expected)),`${exercise.latex}: ${expected}`);
   }else{
    const lo=v.lower!,hi=v.upper!,count=4000,h=(hi-lo)/count;
    let sum=evaluate(lo)+evaluate(hi);for(let j=1;j<count;j++)sum+=(j%2?4:2)*evaluate(lo+j*h);
    expected=sum*h/3;
    assert.ok(Math.abs(Number(exercise.correct)-expected)<2e-5*Math.max(1,Math.abs(expected)),`${exercise.latex}: ${expected}`);
    points.add(lo);points.add(hi);
   }
  }
  assert.ok(families.size>1,level);assert.ok(statements.size>=20,level);assert.ok(points.size>=4,level);
 }
});
test('La entrada LaTeX conserva el significado al pasar al motor',async()=>{
 const {convertLatexToAsciiMath}=await import('mathlive/ssr');
 for(const [latex,expected] of [[String.raw`\frac{2x}{3}`,2],[String.raw`\sqrt{x+1}`,2],[String.raw`5(3+5)`,40],[String.raw`\ln(e)`,1],[String.raw`2x(x+1)`,24]] as const){
  const source=normalizeExpression(convertLatexToAsciiMath(latex));assert.ok(Math.abs(expression(source).evaluate({x:3})-expected)<1e-10,source);
 }
});
