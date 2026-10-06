import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de privacidad de EDGE XI",
  description:
    "Información sobre la recopilación, uso, conservación y eliminación de datos en la aplicación EDGE XI.",
  alternates: { canonical: "/privacidad/edgexi" },
  robots: { index: true, follow: true },
};

export default function EdgeXiPrivacyPage() {
  return (
    <div className="legal-site">
      <header className="calc-header">
        <Link className="brand" href="/">
          <Image
            className="brand-logo"
            src="/calculadora-facil-logo.png"
            alt="CalculadoraFácil"
            width={180}
            height={60}
            priority
          />
        </Link>
        <Link className="back-home" href="/">
          <ArrowLeft />
          Volver al inicio
        </Link>
      </header>

      <main id="contenido" className="legal-page edge-privacy-page">
        <span className="kicker">
          <ShieldCheck /> Privacidad de la aplicación
        </span>
        <h1>Política de privacidad de EDGE XI</h1>
        <p className="legal-intro">
          Esta política explica qué datos utiliza EDGE XI, para qué se utilizan,
          con quién pueden compartirse y cómo puedes solicitar su eliminación.
        </p>

        <section>
          <h2>Responsable y alcance</h2>
          <p>
            EDGE XI es una aplicación de análisis estadístico de partidos de
            fútbol publicada por CalculadoraFácil. Esta política se aplica a la
            aplicación móvil EDGE XI y a sus servicios asociados.
          </p>
        </section>

        <section>
          <h2>Datos que podemos tratar</h2>
          <ul>
            <li>
              <strong>Cuenta:</strong> dirección de correo electrónico, nombre
              proporcionado e identificador interno de usuario.
            </li>
            <li>
              <strong>Suscripción:</strong> estado del plan Premium,
              identificadores de producto y referencias de compra. EDGE XI no
              recibe ni almacena los datos completos de tu tarjeta bancaria.
            </li>
            <li>
              <strong>Notificaciones:</strong> token de notificación,
              plataforma del dispositivo e identificador de usuario cuando has
              iniciado sesión.
            </li>
            <li>
              <strong>Publicidad:</strong> el SDK de Google Mobile Ads puede
              utilizar el identificador de publicidad, información básica del
              dispositivo e interacciones con anuncios, según tus controles de
              privacidad de Android y Google.
            </li>
            <li>
              <strong>Asistente de IA:</strong> selecciones deportivas, nombres
              de partidos o jugadores y la pregunta que decidas enviar. No
              incluyas información personal sensible en tus consultas.
            </li>
            <li>
              <strong>Información técnica:</strong> dirección IP, fecha y hora
              de solicitudes, versión de la aplicación y registros necesarios
              para seguridad, prevención de abusos y diagnóstico de errores.
            </li>
          </ul>
        </section>

        <section>
          <h2>Finalidades</h2>
          <ul>
            <li>Crear y mantener tu cuenta.</li>
            <li>Mostrar predicciones, estadísticas y resultados deportivos.</li>
            <li>Gestionar el acceso Premium y restaurar compras.</li>
            <li>Responder las consultas enviadas al asistente de IA.</li>
            <li>Enviar notificaciones que hayas autorizado.</li>
            <li>Mostrar anuncios y medir su funcionamiento.</li>
            <li>Proteger la aplicación, prevenir fraude y corregir errores.</li>
          </ul>
        </section>

        <section>
          <h2>Proveedores de servicio</h2>
          <p>
            Para operar la aplicación podemos compartir únicamente los datos
            necesarios con Supabase (cuentas y base de datos), RevenueCat y
            Google Play (suscripciones), Google Mobile Ads (publicidad), Expo
            (notificaciones), Groq (procesamiento de consultas de IA) y
            API-Football (información deportiva). Cada proveedor trata los
            datos conforme a sus propias condiciones y políticas de privacidad.
            No vendemos tus datos personales.
          </p>
        </section>

        <section>
          <h2>Conservación y seguridad</h2>
          <p>
            Conservamos los datos de la cuenta mientras permanezca activa y los
            registros técnicos durante el tiempo razonablemente necesario para
            prestar y proteger el servicio. Determinados registros de compras o
            seguridad pueden conservarse cuando exista una obligación legal o
            sean necesarios para prevenir fraude. Aplicamos controles técnicos
            y organizativos razonables, aunque ningún sistema puede garantizar
            seguridad absoluta.
          </p>
        </section>

        <section id="eliminacion">
          <h2>Eliminación de cuenta y datos</h2>
          <p>
            Puedes solicitar la eliminación de tu cuenta enviando un correo
            desde la dirección registrada a{" "}
            <a href="mailto:contacto@calculadorafacil.dev?subject=Eliminar%20cuenta%20EDGE%20XI">
              contacto@calculadorafacil.dev
            </a>{" "}
            con el asunto <strong>“Eliminar cuenta EDGE XI”</strong>. Tras
            verificar la solicitud, eliminaremos la cuenta, el perfil y los
            tokens de notificación asociados. Las referencias que debamos
            conservar por obligaciones legales, resolución de disputas o
            prevención de fraude se limitarán a esos fines y se eliminarán al
            finalizar el periodo aplicable.
          </p>
        </section>

        <section>
          <h2>Tus opciones</h2>
          <p>
            Puedes desactivar las notificaciones y limitar o restablecer el ID
            de publicidad desde los ajustes de Android. También puedes solicitar
            acceso, corrección o eliminación de tus datos escribiendo a nuestro
            correo de contacto. La cancelación de Premium se gestiona desde las
            suscripciones de Google Play y conserva el acceso hasta finalizar el
            periodo pagado.
          </p>
        </section>

        <section>
          <h2>Cambios y contacto</h2>
          <p>
            Podemos actualizar esta política cuando cambien las funciones o los
            proveedores de EDGE XI. Publicaremos la versión vigente en esta
            misma URL. Para dudas de privacidad, escribe a{" "}
            <a href="mailto:contacto@calculadorafacil.dev">
              contacto@calculadorafacil.dev
            </a>
            .
          </p>
        </section>

        <p className="legal-updated">
          Última actualización: 15 de septiembre de 2026
        </p>
      </main>
    </div>
  );
}
