"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Languages } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
type Section = { heading: [string, string]; body: [string, string] };
const pages: Record<
  string,
  { title: [string, string]; intro: [string, string]; sections: Section[] }
> = {
  "sobre-nosotros": {
    title: ["Sobre CalculadoraFácil", "About CalculadoraFácil"],
    intro: [
      "Creamos herramientas claras para resolver cálculos cotidianos sin registros ni pasos innecesarios.",
      "We create clear tools for everyday calculations without accounts or unnecessary steps.",
    ],
    sections: [
      {
        heading: ["Nuestra misión", "Our mission"],
        body: [
          "Ayudar a estudiantes, familias y profesionales a entender sus cálculos, mostrando resultados, fórmulas y ejemplos prácticos.",
          "Help students, families and professionals understand their calculations through results, formulas and practical examples.",
        ],
      },
      {
        heading: ["Alcance de las herramientas", "Scope of our tools"],
        body: [
          "Los resultados son informativos y orientativos. No sustituyen asesoramiento financiero, médico, fiscal, académico o legal profesional.",
          "Results are informational estimates and do not replace professional financial, medical, tax, academic or legal advice.",
        ],
      },
    ],
  },
  contacto: {
    title: ["Contacto", "Contact"],
    intro: [
      "Queremos conocer tus dudas, sugerencias y reportes de errores.",
      "We welcome your questions, suggestions and error reports.",
    ],
    sections: [
      {
        heading: ["Cómo contactarnos", "How to contact us"],
        body: [
          "Escríbenos a contacto@calculadorafacil.dev. Incluye el nombre de la calculadora y los valores usados si deseas reportar un resultado incorrecto.",
          "Email us at contacto@calculadorafacil.dev. Include the calculator name and values used when reporting an incorrect result.",
        ],
      },
      {
        heading: ["Tiempo de respuesta", "Response time"],
        body: [
          "Revisamos los mensajes periódicamente, aunque no podemos garantizar una respuesta inmediata.",
          "We review messages regularly, although we cannot guarantee an immediate response.",
        ],
      },
    ],
  },
  privacidad: {
    title: ["Política de privacidad", "Privacy policy"],
    intro: [
      "Esta política explica qué información utiliza CalculadoraFácil y con qué finalidad.",
      "This policy explains what information CalculadoraFácil uses and why.",
    ],
    sections: [
      {
        heading: [
          "Datos introducidos en calculadoras",
          "Calculator input data",
        ],
        body: [
          "Los cálculos se realizan localmente en tu navegador. No enviamos ni almacenamos los valores que introduces en los formularios.",
          "Calculations run locally in your browser. We do not send or store the values entered in forms.",
        ],
      },
      {
        heading: ["Preferencias locales", "Local preferences"],
        body: [
          "Guardamos la preferencia de idioma en el almacenamiento local del navegador. Puedes eliminarla borrando los datos del sitio.",
          "We store your language preference in browser local storage. You can remove it by clearing site data.",
        ],
      },
      {
        heading: ["Servicios futuros", "Future services"],
        body: [
          "Si incorporamos analítica o publicidad, actualizaremos esta política y mostraremos los controles de consentimiento aplicables antes de activarlos.",
          "If analytics or advertising are introduced, we will update this policy and provide applicable consent controls before activation.",
        ],
      },
    ],
  },
  cookies: {
    title: ["Política de cookies", "Cookie policy"],
    intro: [
      "Actualmente CalculadoraFácil no utiliza cookies publicitarias ni de seguimiento.",
      "CalculadoraFácil currently does not use advertising or tracking cookies.",
    ],
    sections: [
      {
        heading: ["Almacenamiento necesario", "Necessary storage"],
        body: [
          "La preferencia de idioma se conserva mediante localStorage para mantener tu selección entre visitas.",
          "Your language preference is stored using localStorage so your choice persists between visits.",
        ],
      },
      {
        heading: ["Cambios futuros", "Future changes"],
        body: [
          "Antes de habilitar servicios que requieran cookies no esenciales, añadiremos un mecanismo de consentimiento y actualizaremos esta página.",
          "Before enabling services that require non-essential cookies, we will add consent controls and update this page.",
        ],
      },
    ],
  },
  terminos: {
    title: ["Términos y condiciones", "Terms and conditions"],
    intro: [
      "Al utilizar el sitio aceptas las condiciones descritas a continuación.",
      "By using this site, you accept the terms described below.",
    ],
    sections: [
      {
        heading: ["Uso permitido", "Permitted use"],
        body: [
          "Puedes utilizar gratuitamente las herramientas para fines personales, educativos o profesionales legítimos.",
          "You may use the tools free of charge for legitimate personal, educational or professional purposes.",
        ],
      },
      {
        heading: ["Exactitud y responsabilidad", "Accuracy and liability"],
        body: [
          "Trabajamos para mantener fórmulas correctas, pero los resultados son estimaciones. Debes verificar los datos y consultar a un profesional antes de tomar decisiones importantes.",
          "We work to keep formulas accurate, but results are estimates. Verify the data and consult a professional before important decisions.",
        ],
      },
      {
        heading: ["Disponibilidad", "Availability"],
        body: [
          "El servicio puede cambiar, suspenderse o presentar errores sin previo aviso.",
          "The service may change, be suspended or experience errors without prior notice.",
        ],
      },
    ],
  },
  "aviso-legal": {
    title: ["Aviso legal", "Legal notice"],
    intro: [
      "Información general sobre el uso y responsabilidad de CalculadoraFácil.",
      "General information about the use and responsibility of CalculadoraFácil.",
    ],
    sections: [
      {
        heading: ["Naturaleza informativa", "Informational nature"],
        body: [
          "El contenido del sitio tiene fines informativos y educativos. Las calculadoras financieras no constituyen una oferta de crédito o inversión.",
          "Site content is informational and educational. Financial calculators are not an offer of credit or investment.",
        ],
      },
      {
        heading: ["Propiedad intelectual", "Intellectual property"],
        body: [
          "La marca, el diseño y el contenido original pertenecen a CalculadoraFácil, salvo que se indique lo contrario.",
          "The brand, design and original content belong to CalculadoraFácil unless otherwise stated.",
        ],
      },
    ],
  },
};
export const legalSlugs = Object.keys(pages);
export default function LegalContent({ page }: { page: string }) {
  const { language, toggle } = useLanguage(),
    en = language === "en",
    data = pages[page];
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
          {en ? "Back home" : "Volver al inicio"}
        </Link>
        <button className="language-button" onClick={toggle}>
          <Languages />
          <span>{en ? "EN" : "ES"}</span>
        </button>
      </header>
      <main className="legal-page">
        <span className="kicker">
          {en ? "Legal information" : "Información legal"}
        </span>
        <h1>{data.title[en ? 1 : 0]}</h1>
        <p className="legal-intro">{data.intro[en ? 1 : 0]}</p>
        {data.sections.map((section) => (
          <section key={section.heading[0]}>
            <h2>{section.heading[en ? 1 : 0]}</h2>
            <p>{section.body[en ? 1 : 0]}</p>
          </section>
        ))}
        <p className="legal-updated">
          {en
            ? "Last updated: August 29, 2026"
            : "Última actualización: 29 de agosto de 2026"}
        </p>
      </main>
    </div>
  );
}
