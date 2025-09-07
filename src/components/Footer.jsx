import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h2>MiPortafolio</h2>
          <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>

        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#portafolio">Portafolio</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="footer-socials">
          <a href="https://github.com/" target="_blank" rel="noreferrer">🐙</a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">💼</a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">🐦</a>
        </div>

      </div>
    </footer>
  );
}
