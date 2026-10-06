import katex from 'katex';
export default function MathFormula({latex,display=false,className=''}:{latex:string;display?:boolean;className?:string}) {
 const html=katex.renderToString(latex,{displayMode:display,throwOnError:false,strict:'ignore',trust:false,output:'htmlAndMathml',maxExpand:200,maxSize:20});
 return <span className={`math-formula ${display?'math-display':''} ${className}`} dangerouslySetInnerHTML={{__html:html}}/>;
}
export function MathText({text}:{text:string}){
 const segments=text.split(/(\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$)/g);
 return <>{segments.map((part,i)=>part.startsWith('\\(')?<MathFormula key={i} latex={part.slice(2,-2)}/>:part.startsWith('$$')?<MathFormula key={i} latex={part.slice(2,-2)} display/>:part)}</>;
}
