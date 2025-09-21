import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import "./about.css";

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const techSectionRef = useRef(null);
  const timeSectionRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.6 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.5 });
  const techInView = useInView(techSectionRef, { once: true, amount: 0.3 });
  const timeInView = useInView(timeSectionRef, { once: true, amount: 0.4 });

  // Scroll progress para efectos parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Efectos parallax con spring para suavidad
  const yBackground = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30
  });

  const yImageParallax = useSpring(useTransform(scrollYProgress, [0, 1], [50, -100]), {
    stiffness: 120,
    damping: 25
  });

  const yContentParallax = useSpring(useTransform(scrollYProgress, [0, 1], [30, -80]), {
    stiffness: 80,
    damping: 35
  });

  const yTechParallax = useSpring(useTransform(scrollYProgress, [0, 1], [80, -120]), {
    stiffness: 90,
    damping: 30
  });

  const opacityFade = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);

  // Variantes de animación avanzadas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: 45
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const techCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      rotateX: 30,
      scale: 0.8
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    })
  };

  const techItemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.6,
      y: 50
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 10
      }
    })
  };

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
      {/* Background con efectos de flotación */}
      <motion.div
        className="about-background"
        style={{ y: yBackground, opacity: opacityFade }}
      >
        <motion.div
          className="about-geometric about-geometric-1"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 0.8, 1],
            x: [-10, 10, -10],
            y: [-15, 15, -15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="about-geometric about-geometric-2"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="about-geometric about-geometric-3"
          animate={{
            rotate: [0, -360],
            scale: [0.8, 1.1, 0.9, 1.2, 0.8],
            x: [20, -10, 25, -15, 20],
            y: [10, -20, 30, -10, 10]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="about-container">
        
        {/* Imagen Profile con animaciones avanzadas */}
        <motion.div 
          className="about-image-section"
          ref={imageRef}
          style={{ y: yImageParallax }}
          variants={imageVariants}
          initial="hidden"
          animate={imageInView ? "visible" : "hidden"}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.4 }
          }}
        >
          <div className="image-container">
            <img 
              src="/images/me2.jpg" 
              alt="Nelson - Desarrollador Fullstack" 
              className="about-img"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/320x320/cccccc/666666?text=Profile";
              }}
            />
          </div>
        </motion.div>

        {/* Contenido Principal con parallax avanzado */}
        <motion.div 
          className="about-content"
          ref={contentRef}
          style={{ y: yContentParallax }}
          variants={containerVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
        >
          
          {/* Header */}
          <div className="about-header">
            <motion.span
              className="about-subtitle"
              variants={itemVariants}
            >
              Sobre mí
            </motion.span>
            <motion.h2 
              className="about-title"
              variants={itemVariants}
            >
              Desarrollador Full-Stack
            </motion.h2>
          </div>

          {/* Descripción */}
          <motion.div 
            className="about-description"
            variants={itemVariants}
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

        </motion.div>
      </div>

      {/* Stack Tecnológico con animaciones avanzadas */}
      <motion.div 
        className="tech-section"
        ref={techSectionRef}
        style={{ y: yTechParallax }}
        initial={{ opacity: 0, y: 100 }}
        animate={techInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="tech-container">
          <motion.h3 
            className="tech-title"
            initial={{ opacity: 0, y: 50 }}
            animate={techInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Stack Tecnológico
          </motion.h3>
          <motion.div 
            className="tech-categories"
            variants={containerVariants}
            initial="hidden"
            animate={techInView ? "visible" : "hidden"}
          >
            {techCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="tech-category"
                custom={categoryIndex}
                variants={techCardVariants}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                  rotateX: -5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="category-header">
                  <h4 className="category-title">{category.title}</h4>
                </div>
                
                <div className="tech-grid">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div 
                      key={tech.name} 
                      className="tech-item"
                      custom={techIndex}
                      variants={techItemVariants}
                      initial="hidden"
                      animate={techInView ? "visible" : "hidden"}
                      whileHover={{
                        scale: 1.15,
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Sección de Tiempo con animaciones sofisticadas */}
      <motion.div 
        className="time-section"
        ref={timeSectionRef}
        initial={{ opacity: 0, y: 120, scale: 0.9 }}
        animate={timeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ 
          duration: 1, 
          delay: 0.2,
          type: "spring",
          stiffness: 80,
          damping: 15
        }}
      >
        <div className="tech-container">
          <motion.h3 
            className="tech-title"
            initial={{ opacity: 0, y: 60, rotateX: 45 }}
            animate={timeInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tiempo de Desarrollo
          </motion.h3>
          
          <motion.div 
            className="codetime-container"
            initial={{ 
              opacity: 0, 
              y: 80, 
              scale: 0.8,
              rotateY: 30
            }}
            animate={timeInView ? { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateY: 0
            } : {}}
            transition={{ 
              duration: 1.2, 
              delay: 0.6,
              type: "spring",
              stiffness: 70,
              damping: 12
            }}
            whileHover={{
              scale: 1.08,
              y: -12,
              rotateY: -5,
              transition: { duration: 0.4 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="https://codetime.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="codetime-link"
            >
              <motion.img 
                alt="CodeTime Badge" 
                src="https://shields.jannchie.com/endpoint?style=for-the-badge&color=222&url=https%3A%2F%2Fapi.codetime.dev%2Fv3%2Fusers%2Fshield%3Fuid%3D34517"
                className="codetime-badge"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              />
            </a>
            <p className="codetime-description">
              Tiempo total dedicado al desarrollo y programación
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}