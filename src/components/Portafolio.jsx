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

  // Parallax effects mejorados y más suaves
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yCards = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scaleCards = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 1.05]);
  const opacityCards = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.8]);

  // Datos de los proyectos mejorados
  const projects = [
    {
      id: 1,
      name: "PoliHome",
      description: "Sistema web para gestion de pedidos, productos y ventas para la marca Politorno Centroamerica ",
      shortDescription: "Sistema eccommerce de Politorno",
      images: [
        "/images/polihome.png",
        "/images/polihome3.png",
        "/images/polihome4.png",
        "/images/polihome2.png"
      ],
      technologies: ["MongoDB", "Express", "React", "Node.js"],
      liveUrl: "https://poli-home-ph.vercel.app",
      githubUrl: "https://github.com/grrdquinta/Polihome"
    },
    {
      id: 2,
      name: "En proceso",
      description: "Landing page informativa para SS Imports, una empresa dedicada a facilitar importaciones y exportaciones con servicios personalizados y soluciones logísticas eficientes.",
      shortDescription: "Sistema de importaciones y exportaciones",
      images: [
        "/images/ss1.png",
        "/images/ss2.png",
        "/images/ss3.png"
      ],
      technologies: ["Astro", "React", "JavaScript", ],
      liveUrl: "https://ssimportss.vercel.app",
      githubUrl: "https://github.com/Sandoval0315/ssimports"
    },
    {
      id: 3,
      name: "HealthSyncs",
      description: "Aplicación móvil para gestión de salud personal que sincroniza datos de múltiples dispositivos y ofrece recordatorios de medicación, seguimiento de síntomas y análisis de tendencias.",
      shortDescription: "Aplicación móvil de seguimiento de salud",
      images: [
        "/images/heal1.png",
        "/images/heal2.png",
        "/images/heal3.png"
          ],
          technologies: ["Kotlin", "Java", "Oracle"],
          liveUrl: "https://github.com/Sandoval0315/EXPO.git",
          githubUrl: "https://github.com/Sandoval0315/EXPO.git" 
    }
  ];

  // Variantes de animación para las cards
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotateX: 15
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }),
    hover: {
      y: -12,
      scale: 1.02,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Variantes para las tecnologías
  const techVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 20 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.1,
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <section className="portfolio-section" id="portafolio" ref={sectionRef}>
        {/* Elementos de fondo con parallax mejorado */}
        <motion.div
          className="portfolio-background"
          style={{ y: yBackground }}
        >
          <motion.div 
            className="bg-element bg-element-1"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="bg-element bg-element-2"
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="bg-element bg-element-3"
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        <div className="portfolio-container">
          {/* Header con animaciones mejoradas */}
          <motion.div
            className="portfolio-header"
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.span
              className="portfolio-subtitle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            >
              Portfolio
            </motion.span>
            <motion.h2
              className="portfolio-title"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              Proyectos Destacados
            </motion.h2>
            <motion.p
              className="portfolio-description"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6, type: "spring" }}
            >
              Selección de proyectos que demuestran experiencia en desarrollo web y móvil,
            </motion.p>
          </motion.div>

          {/* Grid de proyectos con animaciones y parallax mejorados */}
          <motion.div
            className="projects-grid"
            style={{ 
              y: yCards, 
              scale: scaleCards,
              opacity: opacityCards
            }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Imagen del proyecto con animaciones mejoradas */}
                <div className="project-image-wrapper">
                  <motion.img 
                    src={project.images[0]} 
                    alt={project.name}
                    className="project-image"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                    whileHover={{ 
                      scale: 1.08,
                      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
                    }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x220/f8f9fa/6c757d?text=${project.name.replace(' ', '%20')}`;
                    }}
                  />
                  
                  {/* Overlay con animaciones mejoradas */}
                  <motion.div
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: 1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="overlay-content"
                      initial={{ y: 30, scale: 0.8 }}
                      whileHover={{ 
                        y: 0, 
                        scale: 1,
                        transition: { 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }
                      }}
                    >
                      <span className="view-more-text">Ver más detalles</span>
                      <motion.svg 
                        className="expand-icon" 
                        viewBox="0 0 24 24" 
                        fill="none"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <path d="M15 3h6v6M14 10l7-7M10 14l7-7" stroke="currentColor" strokeWidth="2"/>
                      </motion.svg>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Contenido de la card */}
                <div className="project-content">
                  <motion.div
                    className="project-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                  >
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-type">{project.shortDescription}</span>
                  </motion.div>
                  
                  <motion.p
                    className="project-description"
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {/* Tecnologías con animaciones */}
                  <motion.div
                    className="tech-stack"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 + 1.2 }}
                  >
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="tech-tag"
                        custom={idx}
                        variants={techVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 4 && (
                      <motion.span
                        className="tech-tag"
                        custom={4}
                        variants={techVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        style={{ 
                          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.08) 100%)',
                          fontWeight: 700
                        }}
                      >
                        +{project.technologies.length - 4}
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Botones de acción con animaciones */}
                  <motion.div
                    className="project-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 1.4 }}
                  >
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)"
                      }}
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
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.svg 
                        className="github-icon" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        whileHover={{ 
                          rotate: 360,
                          transition: { duration: 0.6 }
                        }}
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </motion.svg>
                    </motion.a>
                  </motion.div>
                </div>

                {/* Efecto decorativo animado */}
                <motion.div 
                  className="card-accent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal mejorado con animaciones fluidas */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ 
                scale: 0.7, 
                opacity: 0, 
                y: 100,
                rotateX: 15
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                rotateX: 0
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0, 
                y: 50,
                rotateX: -10
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.6
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 90,
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </motion.button>

              <motion.div 
                className="modal-header"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h3>{selectedProject.name}</h3>
                <p>{selectedProject.description}</p>
              </motion.div>

              <motion.div 
                className="modal-images"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {selectedProject.images.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${selectedProject.name} - Vista ${index + 1}`}
                    className="modal-image"
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: 0.4 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x220/f8f9fa/6c757d?text=Vista%20${index + 1}`;
                    }}
                  />
                ))}
              </motion.div>

              <motion.div 
                className="modal-tech"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h4>Tecnologías utilizadas:</h4>
                <div className="modal-tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="modal-tech-tag"
                      initial={{ opacity: 0, scale: 0.5, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.05,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="modal-actions"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.a 
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-primary"
                  whileHover={{ 
                    scale: 1.02,
                    y: -3,
                    boxShadow: "0 12px 25px rgba(0, 0, 0, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Proyecto Live
                </motion.a>
                <motion.a 
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-secondary"
                  whileHover={{ 
                    scale: 1.02,
                    y: -3,
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Código
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}