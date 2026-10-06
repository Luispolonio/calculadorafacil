export async function celebrate(){
 if(typeof window==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const {default:confetti}=await import('canvas-confetti');
 void confetti({particleCount:75,spread:75,startVelocity:28,origin:{y:.68},colors:['#b93e1f','#3c5c42','#e3ad42','#f6f5f0'],ticks:130,disableForReducedMotion:true,scalar:.9});
}
