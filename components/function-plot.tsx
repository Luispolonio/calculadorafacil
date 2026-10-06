'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Hand, Home, ZoomIn, ZoomOut } from 'lucide-react';
import type * as Plotly from 'plotly.js';
import type { Plot, Point } from '@/lib/math-engine';
type Range=[number,number];
type PlotHandle=Plotly.PlotlyHTMLElement & {layout:Partial<Plotly.Layout>};
export default function FunctionPlot({plot,compact=false}:{plot:Plot;compact?:boolean}){
 const element=useRef<HTMLDivElement>(null),handle=useRef<PlotHandle|null>(null),library=useRef<typeof Plotly|null>(null),resample=useRef<Worker|null>(null),delay=useRef<ReturnType<typeof setTimeout>|null>(null),deadline=useRef<ReturnType<typeof setTimeout>|null>(null),ranges=useRef<{x:Range;y:Range}>({x:[-6,6],y:[-6,6]});
 const [status,setStatus]=useState('Cargando gráfica interactiva…'),[error,setError]=useState('');
 useEffect(()=>{
  let active=true;const container=element.current;if(!container)return;
  const xs=plot.points.map(p=>p.x),original:Range=[Math.min(...xs),Math.max(...xs)];
  const traces=(points:Point[],label:string,secondary=false):Plotly.Data=>({x:points.map(p=>p.x),y:points.map(p=>p.y),type:'scatter',mode:'lines',name:label,connectgaps:false,line:{color:secondary?'#3c5c42':'#b93e1f',width:2.5,dash:secondary?'dash':'solid',simplify:false},hovertemplate:'x = %{x:.8g}<br>y = %{y:.8g}<extra>%{fullData.name}</extra>'});
  function requestSamples(min:number,max:number){
   if(!plot.sources||!active||!Number.isFinite(min)||!Number.isFinite(max)||max<=min)return;
   if(Math.max(Math.abs(min),Math.abs(max))>1e10||max-min<1e-10){setError('Ese intervalo es demasiado extremo para el muestreo numérico. Restablece la vista o usa un intervalo más moderado.');return;}
   resample.current?.terminate();if(deadline.current)clearTimeout(deadline.current);
   const w=new Worker(new URL('../lib/math.worker.ts',import.meta.url));resample.current=w;setStatus('Calculando los valores del nuevo intervalo…');setError('');
   deadline.current=setTimeout(()=>{w.terminate();if(active){setStatus('');setError('El muestreo tardó demasiado. Reduce el intervalo.');}},8000);
   w.onmessage=async(event:MessageEvent<{samples?:Point[][];error?:string}>)=>{if(deadline.current)clearTimeout(deadline.current);w.terminate();if(!active)return;if(event.data.error){setError(event.data.error);setStatus('');return;}if(event.data.samples&&library.current&&handle.current){await library.current.restyle(handle.current,{x:event.data.samples.map(s=>s.map(p=>p.x)),y:event.data.samples.map(s=>s.map(p=>p.y))});if(active)setStatus('Valores recalculados en el intervalo visible.');}};
   w.onerror=()=>{w.terminate();if(deadline.current)clearTimeout(deadline.current);if(active){setStatus('');setError('No se pudo recalcular la curva. Prueba a restablecer la vista.');}};
   w.postMessage({kind:'sample',sources:plot.sources,min,max});
  }
  const observer=new ResizeObserver(()=>{if(active&&container.isConnected&&container.getBoundingClientRect().width>0&&handle.current&&library.current)void Promise.resolve(library.current.Plots.resize(handle.current)).catch(()=>{});});
  import('plotly.js-basic-dist-min').then(async module=>{
   if(!active)return;const P=module.default;library.current=P;
   const graph=await P.newPlot(container,[traces(plot.points,plot.label),...(plot.secondary?[traces(plot.secondary,plot.secondaryLabel||'Segunda curva',true)]:[])],{autosize:true,height:compact?280:430,margin:{l:compact?42:58,r:20,t:compact?12:30,b:48},paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'Arial, sans-serif',color:'#4f5948',size:12},xaxis:{title:{text:'x'},range:original,gridcolor:'#e1e5d8',zerolinecolor:'#7f8d72',zerolinewidth:1.5,showspikes:true,spikemode:'across',spikecolor:'#8c9580',fixedrange:false},yaxis:{title:{text:plot.label.startsWith('Solución')?'y':'f(x)'},gridcolor:'#e1e5d8',zerolinecolor:'#7f8d72',zerolinewidth:1.5,showspikes:true,spikemode:'across',fixedrange:false},dragmode:'pan',hovermode:'closest',showlegend:false,hoverlabel:{bgcolor:'#242622',font:{color:'#fff',size:13}},uirevision:'math-view'},{responsive:true,scrollZoom:!compact,displaylogo:false,displayModeBar:!compact,modeBarButtonsToRemove:['select2d','lasso2d'],toImageButtonOptions:{format:'svg',filename:'calculadorafacil-grafica'}});
   if(!active){P.purge(container);return;}handle.current=graph as PlotHandle;observer.observe(container);setStatus('');
   graph.on('plotly_relayout',(event)=>{
    const x=graph.layout.xaxis?.range as Range|undefined,y=graph.layout.yaxis?.range as Range|undefined;if(x&&y)ranges.current={x:[...x],y:[...y]};
    if(event['xaxis.range[0]']!==undefined||event['xaxis.range']!==undefined){const current=graph.layout.xaxis?.range as Range|undefined;if(current){if(delay.current)clearTimeout(delay.current);delay.current=setTimeout(()=>requestSamples(current[0],current[1]),180);}}
   });
   const initialX=graph.layout.xaxis?.range as Range|undefined,initialY=graph.layout.yaxis?.range as Range|undefined;if(initialX&&initialY)ranges.current={x:[...initialX],y:[...initialY]};
  }).catch(()=>{if(active){setStatus('');setError('No se pudo cargar la gráfica. Puedes consultar los valores en la tabla.');}});
  return()=>{active=false;observer.disconnect();resample.current?.terminate();if(delay.current)clearTimeout(delay.current);if(deadline.current)clearTimeout(deadline.current);if(library.current)library.current.purge(container);handle.current=null;};
 },[plot,compact]);
 function move(action:string){const P=library.current,g=handle.current;if(!P||!g)return;let x=[...ranges.current.x] as Range,y=[...ranges.current.y] as Range;const dx=x[1]-x[0],dy=y[1]-y[0];
  if(action==='reset'){const original:Range=[Math.min(...plot.points.map(p=>p.x)),Math.max(...plot.points.map(p=>p.x))];void P.restyle(g,{x:[plot.points.map(p=>p.x),...(plot.secondary?[plot.secondary.map(p=>p.x)]:[])],y:[plot.points.map(p=>p.y),...(plot.secondary?[plot.secondary.map(p=>p.y)]:[])]});void P.relayout(g,{'xaxis.range':original,'yaxis.autorange':true});return;}
  if(action==='in'||action==='out'){const factor=action==='in'?.7:1.4,mx=(x[0]+x[1])/2,my=(y[0]+y[1])/2;x=[mx-dx*factor/2,mx+dx*factor/2];y=[my-dy*factor/2,my+dy*factor/2];}
  if(action==='left')x=[x[0]-dx*.25,x[1]-dx*.25];if(action==='right')x=[x[0]+dx*.25,x[1]+dx*.25];if(action==='up')y=[y[0]+dy*.25,y[1]+dy*.25];if(action==='down')y=[y[0]-dy*.25,y[1]-dy*.25];void P.relayout(g,{'xaxis.range':x,'yaxis.range':y});
 }
 return <figure className={`function-plot interactive-plot ${compact?'compact':''}`}>
 {!compact&&<div className="plot-controls" aria-label="Controles de la gráfica">{[{key:'in',label:'Acercar',icon:ZoomIn},{key:'out',label:'Alejar',icon:ZoomOut},{key:'left',label:'Mover a la izquierda',icon:ArrowLeft},{key:'right',label:'Mover a la derecha',icon:ArrowRight},{key:'up',label:'Mover hacia arriba',icon:ArrowUp},{key:'down',label:'Mover hacia abajo',icon:ArrowDown},{key:'reset',label:'Restablecer vista',icon:Home}].map(c=><button type="button" key={c.key} onClick={()=>move(c.key)} aria-label={c.label} title={c.label}><c.icon size={17}/></button>)}<span><Hand size={15}/> Arrastra para explorar</span></div>}
 <div ref={element} className="plotly-host" role="region" aria-label={`Gráfica interactiva de ${plot.label}`} tabIndex={0} onKeyDown={e=>{const actions:Record<string,string>={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down','+':'in','-':'out',Home:'reset'};if(actions[e.key]){e.preventDefault();move(actions[e.key]);}}}/>
 <figcaption><span><i/>{plot.label}</span>{plot.secondaryLabel&&<span><i className="secondary"/>{plot.secondaryLabel}</span>}</figcaption>
 <div className="plot-status" role="status">{error||status}</div>
 {!compact&&<><p className="plot-help">Arrastra para desplazar los ejes; usa la rueda o los botones para acercarte. Pasa el cursor sobre la curva para leer valores numéricos aproximados. El muestreo puede omitir detalles muy pequeños; amplía el intervalo de interés. Con el teclado: flechas, +, − y Home. {plot.sources?'La función se recalcula al cambiar el intervalo de x.':'Esta trayectoria muestra únicamente los puntos calculados en el intervalo original; no se extrapolan valores.'}</p><details className="plot-data"><summary>Valores calculados del intervalo original ({plot.points.length} puntos)</summary><div className="table-scroll bounded-table"><table><thead><tr><th>x</th><th>{plot.label}</th>{plot.secondary&&<th>{plot.secondaryLabel}</th>}</tr></thead><tbody>{plot.points.map((p,i)=><tr key={i}><td>{Number(p.x.toPrecision(9))}</td><td>{p.y===null?'No definido / discontinuidad':Number(p.y.toPrecision(9))}</td>{plot.secondary&&<td>{plot.secondary[i]?.y==null?'No definido / discontinuidad':Number(plot.secondary[i].y!.toPrecision(9))}</td>}</tr>)}</tbody></table></div></details></>}
 </figure>;
}
