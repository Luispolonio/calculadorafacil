import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
export function Brand() {
  return (
    <Link href="/" className="lab-brand" aria-label="CalculadoraFácil, inicio">
      <span className="brand-symbol" aria-hidden="true">
        ƒ
      </span>
      <span>
        calculadora<span className="brand-light">fácil</span>
        <small>LABORATORIO DE MATEMÁTICAS</small>
      </span>
    </Link>
  );
}
export function Header() {
  return (
    <header className="lab-header">
      <div className="header-inner">
        <Brand />
        <nav aria-label="Navegación principal">
          <Link href="/#herramientas">Herramientas</Link>
          <Link href="/programacion">Programación</Link>
          <Link href="/practica" className="nav-practice">
            Modo práctica <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="lab-footer">
      <div className="footer-top">
        <Brand />
        <p>
          Entender el proceso.
          <br />
          Encontrar la respuesta.
        </p>
        <Link href="/practica">
          Ponlo a prueba <MoveRight size={20} />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} CalculadoraFácil · Hecho para aprender.
        </span>
        <nav aria-label="Información del sitio">
          <Link href="/legal/sobre-nosotros">Acerca de</Link>
          <Link href="/legal/contacto">Contacto</Link>
          <Link href="/legal/privacidad">Privacidad</Link>
          <Link href="/legal/cookies">Cookies</Link>
          <Link href="/legal/terminos">Términos</Link>
          <Link href="/legal/aviso-legal">Aviso legal</Link>
        </nav>
      </div>
    </footer>
  );
}
