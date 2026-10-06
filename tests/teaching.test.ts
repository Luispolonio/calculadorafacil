import { test } from 'node:test';
import assert from 'node:assert/strict';
import katex from 'katex';
import { parse, derivative } from 'mathjs';
import { catalog } from '../lib/catalog';
import { solve, sample } from '../lib/math-engine';
import { codeLessons } from '../lib/programming-lessons';
import { spawnSync } from 'node:child_process';
for(const tool of catalog)test(`Explicación y LaTeX válidos: ${tool.title}`,()=>{
 const values=Object.fromEntries(tool.fields.map(f=>[f.key,f.value]));
 const result=solve(tool.slug,values);
 assert.ok(result.workedSteps&&result.workedSteps.length>=4,tool.slug);
 for(const step of result.workedSteps){assert.ok(step.title.length>4);assert.ok(step.explanation.length>30);if(step.latex)assert.doesNotThrow(()=>katex.renderToString(step.latex!,{throwOnError:true}),`${tool.slug}: ${step.latex}`);}
 if(result.latex)assert.doesNotThrow(()=>katex.renderToString(result.latex!,{throwOnError:true}),result.latex);
});
test('LaTeX de ramas complejas, cúbicas, integrales y derivadas compuestas',()=>{
 const cases:[string,Record<string,string>][]=[['ecuaciones-cuadraticas',{a:'1',b:'0',c:'1'}],['ecuaciones-cuadraticas',{a:'1',b:'-2',c:'1'}],['ecuaciones-cubicas',{a:'1',b:'0',c:'0',d:'-8'}],['ecuaciones-cubicas',{a:'1',b:'0',c:'-3',d:'2'}],['integrales',{expression:'sin(2*x)+x^-1',mode:'Indefinida'}],['integrales',{expression:'x^0.5',mode:'Definida',lower:'0',upper:'4'}],['derivadas',{expression:'sin(x^2)/(1+x)',order:'1'}],['derivadas',{expression:'x^x',order:'1'}]];
 for(const[slug,values]of cases){const result=solve(slug,values);for(const step of result.workedSteps||[])if(step.latex)assert.doesNotThrow(()=>katex.renderToString(step.latex!,{throwOnError:true}),step.latex);if(result.latex)assert.doesNotThrow(()=>katex.renderToString(result.latex!,{throwOnError:true}),result.latex);}
});
for(const lesson of codeLessons)test(`Python de referencia: ${lesson.title}`,()=>{
 const script=`import json\nnamespace={}\nexec(${JSON.stringify(lesson.solution)},namespace)\ncases=json.loads(${JSON.stringify(JSON.stringify(lesson.tests))})\nfor c in cases:\n    actual=namespace['resolver'](*c['args'])\n    assert actual == c['expected'], (actual,c['expected'])\n    if isinstance(c['expected'],bool):\n        assert isinstance(actual,bool)\n`;
 const result=spawnSync('python3',['-c',script],{encoding:'utf8',timeout:4000});assert.equal(result.status,0,result.stderr);
});
test('Los puntos trazados son evaluaciones de la función, no coordenadas decorativas',()=>{
 const node=parse('x^2 - 5*x + 6');for(const point of sample(node,-3,8)){if(point.y!==null)assert.ok(Math.abs(point.y-node.evaluate({x:point.x}))<1e-9);}
 const derived=derivative('sin(x)','x');for(const point of sample(derived,-4,4))if(point.y!==null)assert.ok(Math.abs(point.y-Math.cos(point.x))<1e-9);
});

test('El muestreo interrumpe una asíntota que cae entre dos puntos',()=>{
 const points=sample(parse('1/(x-0.013)'),-1,1);assert.ok(points.some(p=>p.y===null));
 const smooth=sample(parse('100000000000*x'),-1,1);assert.ok(smooth.every(p=>p.y!==null));assert.equal(smooth.at(-1)?.y,100000000000);
});

test('Las explicaciones conservan escalas pequeñas y símbolos estadísticos',()=>{
 const system=solve('sistemas-lineales',{matrix:'1e-15,0;0,1e-15',vector:'2e-15,3e-15'});
 assert.match(system.latex!,/x=2/);assert.match(system.latex!,/y=3/);
 const stats=solve('estadistica',{data:'1,2,3',type:'Poblacional'});
 assert.ok(stats.workedSteps?.some(s=>s.latex?.includes('\\sigma^2')));
 const quadratic=solve('ecuaciones-cuadraticas',{a:'1',b:'100000000',c:'1'});
 assert.ok(!quadratic.latex?.includes('x_1=0,'));
});
