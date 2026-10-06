import { solve, expression, sample, type Inputs } from './math-engine';
type Request={kind?:'solve';slug:string;values:Inputs}|{kind:'sample';sources:string[];min:number;max:number};
self.onmessage=(event:MessageEvent<Request>)=>{
 try{const request=event.data;if(request.kind==='sample'){
  if(!Number.isFinite(request.min)||!Number.isFinite(request.max)||request.max<=request.min||request.sources.length>2)throw new Error('Intervalo de gráfica no válido.');
  self.postMessage({samples:request.sources.map(source=>sample(expression(source,["x"],true),request.min,request.max))});
 }else self.postMessage({result:solve(request.slug,request.values)});
 }catch(error){self.postMessage({error:error instanceof Error?error.message:'No se pudo completar el cálculo.'});}
};
