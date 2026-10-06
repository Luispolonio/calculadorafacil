import { cp, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=dirname(fileURLToPath(import.meta.resolve('mathlive')));
const target=new URL('../public/mathlive-fonts/',import.meta.url);
await mkdir(target,{recursive:true});await cp(join(root,'fonts'),target,{recursive:true});
console.log('Fuentes del editor matemático listas para alojamiento local.');
