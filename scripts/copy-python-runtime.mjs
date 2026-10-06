import { copyFile, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
const require=createRequire(import.meta.url);
const root=dirname(require.resolve('pyodide/package.json'));
const target=new URL('../public/python-runtime/',import.meta.url);
await mkdir(target,{recursive:true});
for(const file of ['pyodide.js','pyodide.asm.js','pyodide.asm.wasm','python_stdlib.zip','pyodide-lock.json'])await copyFile(join(root,file),new URL(file,target));
console.log('Python listo: recursos locales de Pyodide 0.27.7.');
