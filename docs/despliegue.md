# Preparación para GitHub y Cloudflare Pages

El proyecto exporta archivos estáticos. Configuración del proyecto conectado a GitHub:

- Comando de instalación: `npm ci` (si Cloudflare solicita uno).
- Comando de compilación: **`npm run build`**, no `npx next build`: el script previo copia Python y las fuentes del editor matemático.
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
