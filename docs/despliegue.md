# Preparación para GitHub y Cloudflare Pages

El proyecto exporta archivos estáticos. Configuración del proyecto conectado a GitHub:

- Comando de instalación: `npm ci` (si Cloudflare solicita uno).
- Comando de compilación: **`npm run build`**. También se admite `npx next build`: la configuración de Next prepara Python y las fuentes de MathLive antes de compilar, sin depender de los hooks de npm.
- Directorio de salida: **`out`**.
- Node: **24.12.0**, mediante `.nvmrc` o `NODE_VERSION`.
- Preset compatible: Next.js (Static HTML Export). No requiere un servidor Node ni adaptador de Workers.

El despliegue automático depende de que el repositorio y la rama de producción ya estén conectados al proyecto correcto de Cloudflare Pages. No se ha modificado esa conexión desde este trabajo.

Antes de subir: `npm ci`, `npm test`, `npm run lint`, `npm run build`. Las pruebas de programación usan `python3`. Se versionan los archivos fuente y `package-lock.json`; los recursos generados de Python, fuentes de MathLive, `.next/` y `out/` no se suben a Git.

## Después del despliegue

1. Probar el dominio real: calculadora, editor matemático, prácticas y Python; confirmar que las fuentes, los Workers y los archivos WASM no devuelven 404.
2. Verificar `https://calculadorafacil.dev/robots.txt` y `https://calculadorafacil.dev/sitemap.xml`, así como los canonical. Si cambia el dominio, actualizar el origen en los metadatos y el sitemap antes de publicar.
3. Abrir la propiedad del dominio en Google Search Console, comprobar su verificación, enviar el sitemap y revisar URLs representativas. La indexación no es instantánea ni está garantizada por enviar el sitemap.
4. Revisar cobertura, errores y contenido publicado antes de solicitar otra revisión de AdSense. Contrastar el motivo exacto del rechazo; un cambio de diseño o de temática no garantiza aprobación.

Este documento prepara los pasos posteriores: no afirma que se haya publicado, enviado el sitemap o solicitado la revisión de AdSense.

Referencia oficial de alojamiento: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

## Verificación del 6 de octubre de 2026

- Producción devolvía HTTP 404 y HTML para `/python-runtime/pyodide.js`; también faltaba una fuente de MathLive. La configuración de Next ahora prepara ambos recursos incluso al ejecutar `npx next build` directamente.
- Compilación comprobada apartando previamente las dos carpetas generadas: la exportación recuperó los cinco archivos de Python y las veinte fuentes de MathLive, idénticos a las dependencias instaladas. Lint correcto.
- Las 36 URLs del sitemap público respondieron HTTP 200 tras redirecciones, con canonical y sin meta noindex. Robots permite el rastreo. El sitemap local ahora enlaza las URLs finales con barra.
- Se volvió a enviar `https://calculadorafacil.dev/sitemap.xml` en la propiedad de dominio de Search Console. Google mostró «Se ha enviado el sitemap correctamente». La cifra de 18 páginas descubiertas correspondía todavía a la lectura anterior del 21 de septiembre; no es el resultado del envío nuevo.
- Pendiente: subir estos cambios y desplegar la corrección del runtime. El envío a Google no equivale a indexación garantizada ni a aprobación de AdSense.
