import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./about.css";

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Tecnologías organizadas por categorías
  const techCategories = [
    {
      title: "Frontend",
      icon: "🎨",
      technologies: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Astro", logo: "https://astro.build/assets/press/astro-icon-light-gradient.svg" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
      ]
    },
    {
      title: "Backend",
      icon: "⚙️",
      technologies: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
        { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
        { name: "Vite", logo: "https://vitejs.dev/logo.svg" }
      ]
    },
    {
      title: "Base de Datos",
      icon: "🗄️",
      technologies: [
        { name: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
        { name: "SQL Server", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
      ]
    },
    {
      title: "Herramientas",
      icon: "🛠️",
      technologies: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" }
      ]
    }
  ];

  return (
    <section className="about" id="sobre-mi" ref={sectionRef}>
      <div className="about-container">
        
        {/* Imagen Profile */}
        <div className="about-image-section">
          <div className="image-container">
            <img 
              src="/images/profile.jpg" 
              alt="Nelson - Desarrollador Fullstack" 
              className="about-img"
              onError={(e) => {
                // Fallback si la imagen no carga
                e.target.src = "https://via.placeholder.com/320x320/cccccc/666666?text=Profile";
              }}
            />
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="about-content">
          
          {/* Header */}
          <div className="about-header">
            <motion.span
              className="about-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Sobre mí
            </motion.span>
            <motion.h2 
              className="about-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Desarrollador Full-Stack
            </motion.h2>
          </div>

          {/* Descripción */}
          <motion.div 
            className="about-description"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              Soy un <strong>desarrollador Fullstack</strong> especializado en crear 
              experiencias visuales modernas y eficientes. Me apasiona diseñar
              interfaces intuitivas y funcionales que mejoren la interacción del usuario.
            </p>
            <p>
              Con experiencia en desarrollo frontend y backend, me enfoco en 
              crear una experiencia de usuario fluida y atractiva,
              prestando atención a cada detalle del diseño y la funcionalidad.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Stack Tecnológico */}
      <div className="tech-section">
        <div className="tech-container">
          <motion.h3 
            className="tech-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Tecnologías aprendidas
          </motion.h3>
          <div className="tech-categories">
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="tech-category"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + categoryIndex * 0.1
                }}
              >
                <div className="category-header">
                  <h4 className="category-title">{category.title}</h4>
                </div>
                
                <div className="tech-grid">
                  {category.technologies.map((tech) => (
                    <div key={tech.name} className="tech-item">
                      <div className="tech-logo">
                        <img 
                          src={tech.logo} 
                          alt={tech.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="tech-fallback" style={{ display: 'none' }}>
                          {tech.name.charAt(0)}
                        </div>
                      </div>
                      <span className="tech-name">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Tiempo con CodeTime Badge */}
      <div className="time-section">
        <div className="tech-container">
          <motion.h3 
            className="tech-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Tiempo de Desarrollo
          </motion.h3>
          
          <motion.div 
            className="codetime-container"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a 
              href="https://codetime.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="codetime-link"
            >
              <img 
                alt="CodeTime Badge" 
                src="https://shields.jannchie.com/endpoint?style=for-the-badge&color=222&url=https%3A%2F%2Fapi.codetime.dev%2Fv3%2Fusers%2Fshield%3Fuid%3D34517"
                className="codetime-badge"
              />
            </a>
            <p className="codetime-description">
              Tiempo total dedicado al desarrollo y programación (desde septiembre 2025)
             </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}