import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './portafolio.css';

export default function Portafolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yCards = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scaleCards = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  // Datos de los proyectos con múltiples imágenes
  const projects = [
    {
      id: 1,
      name: "PoliHome",
      description: "Plataforma integral de gestión inmobiliaria que conecta propietarios, inquilinos y administradores.",
      shortDescription: "Sistema web de venta y gestion de muebles ",
      images: [
        "/images/polihome.png",
        "/images/polihome.png",
        "/images/polihome.png"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveUrl: "https://polihome.com",
      githubUrl: "https://github.com/usuario/polihome"
    },
    {
      id: 2,
      name: "SS Imports",
      description: "Sistema ficticio de gestión de importaciones y exportaciones",
      shortDescription: "Sistema de importaciones",
      images: [
        "/images/912shots_so.png",
        "/images/912shots_so.png",
        "/images/912shots_so.png"
      ],
      technologies: ["Astro","React", "JavaScript"],
      liveUrl: "https://ssimports.com",
      githubUrl: "https://github.com/usuario/ssimports"
    },
    {
      id: 3,
      name: "HealthSyncs",
      description: "Aplicación móvil para el seguimiento de hábitos y logros de los usuarios.",
      shortDescription: "App fitness",
      images: [
        "/images/ecotracker.jpg",
        "/images/ecotracker.jpg",
        "/images/ecotracker.jpg"
      ],
      technologies: ["Kotlin", "Java", "Oracle", "Andriod Studio"],
      liveUrl: "https://ecotracker.app",
      githubUrl: "https://github.com/usuario/ecotracker"
    }
  ];

  return (
    <>
      <section className="portfolio-section" id="portafolio" ref={sectionRef}>
        {/* Elementos de fondo con parallax */}
        <motion.div
          className="portfolio-background"
          style={{ y: yBackground }}
        >
          <div className="bg-element bg-element-1"></div>
          <div className="bg-element bg-element-2"></div>
          <div className="bg-element bg-element-3"></div>
        </motion.div>

        <div className="portfolio-container">
          {/* Header mejorado */}
          <motion.div
            className="portfolio-header"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.span
              className="portfolio-subtitle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Portfolio
            </motion.span>
            <motion.h2
              className="portfolio-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Proyectos Destacados
            </motion.h2>
            <motion.p
              className="portfolio-description"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Selección de proyectos que demuestran experiencia en desarrollo full-stack
            </motion.p>
          </motion.div>

          {/* Grid de proyectos con parallax */}
          <motion.div
            className="projects-grid"
            style={{ y: yCards, scale: scaleCards }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 100, rotateX: 20 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  y: -15,
                  rotateY: 5,
                  transition: { duration: 0.4 }
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Imagen del proyecto con zoom */}
                <div className="project-image-wrapper">
                  <motion.img 
                    src={project.images[0]} 
                    alt={project.name}
                    className="project-image"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/500x300/f5f5f5/000000?text=${project.name}`;
                    }}
                  />
                  
                  {/* Overlay con hint */}
                  <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="overlay-content">
                      <span className="view-more-text">Ver más detalles</span>
                      <svg className="expand-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M15 3h6v6M14 10l7-7M10 14l7-7" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Contenido de la card */}
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-type">{project.shortDescription}</span>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  {/* Tecnologías */}
                  <div className="tech-stack">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {/* Botones de acción */}
                  <div className="project-actions">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver Proyecto
                    </motion.a>
                    
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-code"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>

                {/* Efecto decorativo minimalista */}
                <div className="card-accent"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal para mostrar más imágenes */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>

              <div className="modal-header">
                <h3>{selectedProject.name}</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="modal-images">
                {selectedProject.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${selectedProject.name} - Vista ${index + 1}`}
                    className="modal-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x250/f5f5f5/000000?text=Vista ${index + 1}`;
                    }}
                  />
                ))}
              </div>

              <div className="modal-tech">
                <h4>Tecnologías utilizadas:</h4>
                <div className="modal-tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="modal-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a 
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-primary"
                >
                  Ver Proyecto Live
                </a>
                <a 
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-secondary"
                >
                  Ver Código
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}