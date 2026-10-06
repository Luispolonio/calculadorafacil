'use client';
import { useEffect, useRef, useState } from 'react';
import type { MathfieldElement } from 'mathlive';
import MathFormula from './math-formula';
import { normalizeExpression } from '@/lib/expression-input';
const keys = [
 {label:'Elevar al cuadrado',latex:'x^2',insert:'(#0)^2'},
 {label:'Elevar a una potencia',latex:'x^n',insert:'(#0)^{#?}'},
 {label:'Raíz cuadrada',latex:'\\sqrt{x}',insert:'\\sqrt{#0}'},
 {label:'Fracción',latex:'\\frac{a}{b}',insert:'\\frac{#0}{#?}'},
 {label:'Paréntesis',latex:'(\\ )',insert:'\\left(#0\\right)'},
 {label:'Seno',latex:'\\sin',insert:'\\sin\\left(#0\\right)'},
 {label:'Coseno',latex:'\\cos',insert:'\\cos\\left(#0\\right)'},
 {label:'Tangente',latex:'\\tan',insert:'\\tan\\left(#0\\right)'},
 {label:'Logaritmo natural',latex:'\\ln',insert:'\\ln\\left(#0\\right)'},
 {label:'Exponencial',latex:'e^x',insert:'e^{#0}'},
 {label:'Pi',latex:'\\pi',insert:'\\pi'},
];
export default function ExpressionInput({value,onChange,helpId}:{value:string;onChange:(value:string)=>void;helpId?:string}) {
 const host=useRef<HTMLDivElement>(null),field=useRef<MathfieldElement|null>(null),callback=useRef(onChange),lastSent=useRef(value),initial=useRef({value,helpId});
 const [ready,setReady]=useState(false),[loadError,setLoadError]=useState('');
 useEffect(()=>{callback.current=onChange;},[onChange]);
 useEffect(()=>{
  let active=true;const container=host.current;let cleanup=()=>{};
  import('mathlive').then(({MathfieldElement,convertAsciiMathToLatex})=>{
   if(!active||!container)return;
   MathfieldElement.fontsDirectory='/mathlive-fonts';MathfieldElement.soundsDirectory=null;MathfieldElement.computeEngine=null;
   const mf=new MathfieldElement();field.current=mf;mf.id='field-expression';mf.mathVirtualKeyboardPolicy='manual';mf.smartFence=true;mf.placeholder='f(x)';
   mf.setAttribute('aria-label','Expresión matemática');mf.setAttribute('aria-describedby',[initial.current.helpId,'expression-syntax'].filter(Boolean).join(' '));
   mf.setValue(convertAsciiMathToLatex(normalizeExpression(initial.current.value)),{silenceNotifications:true});
   const changed=()=>{const source=normalizeExpression(mf.getValue('ascii-math'));lastSent.current=source;callback.current(source);};
   const submit=(event:KeyboardEvent)=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();event.stopPropagation();container.closest('form')?.requestSubmit();}};
   mf.addEventListener('input',changed);mf.addEventListener('keydown',submit,true);container.replaceChildren(mf);setReady(true);
   cleanup=()=>{mf.removeEventListener('input',changed);mf.removeEventListener('keydown',submit,true);mf.remove();field.current=null;};
  }).catch(()=>{if(active)setLoadError('No se pudo cargar el editor matemático. Recarga la página para intentarlo de nuevo.');});
  return()=>{active=false;cleanup();};
 },[]);
 useEffect(()=>{
  if(!ready||value===lastSent.current)return;
  let active=true;import('mathlive').then(({convertAsciiMathToLatex})=>{if(active&&field.current){field.current.setValue(convertAsciiMathToLatex(normalizeExpression(value)),{silenceNotifications:true});lastSent.current=value;}});
  return()=>{active=false;};
 },[value,ready]);
 function insert(latex:string){field.current?.insert(latex,{selectionMode:'placeholder',focus:true,feedback:false});}
 return <div className="expression-editor visual-math-editor"><div ref={host} className="mathlive-host"/>{!ready&&!loadError&&<div className="math-editor-loading">Preparando el editor matemático…</div>}{loadError&&<p role="alert">{loadError}</p>}
 <div className="math-keyboard" role="group" aria-label="Insertar operación matemática">{keys.map(key=><button disabled={!ready} key={key.label} type="button" title={key.label} aria-label={key.label} onClick={()=>insert(key.insert)}><MathFormula latex={key.latex}/></button>)}</div>
 <small id="expression-syntax">Escribe directamente en la fórmula: <MathFormula latex="2x"/> y <MathFormula latex="5(3+5)"/> multiplican sin asterisco. Usa los botones para fracciones y potencias; Tab avanza entre sus casillas y las flechas mueven el cursor. Intro resuelve.</small>
 {value.length>160&&<small role="alert">La expresión supera el límite de 160 caracteres. Simplifícala antes de resolver.</small>}
 </div>;
}
