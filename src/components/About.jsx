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
              experiencias digitales modernas y eficientes. Me apasiona escribir 
              código limpio y construir aplicaciones que realmente importen.
            </p>
            <p>
              Con experiencia en desarrollo frontend y backend, me enfoco en 
              soluciones escalables utilizando las tecnologías más actuales.
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
            Stack Tecnológico
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
    </section>
  );
}