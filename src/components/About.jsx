import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import "./about.css";

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const techSectionRef = useRef(null);
  const timeSectionRef = useRef(null);
  const wakatimeSectionRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.6 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.5 });
  // La sección crece al apilar las tarjetas en móvil; basta con que empiece a entrar.
  const techInView = useInView(techSectionRef, { once: true, amount: "some" });
  const timeInView = useInView(timeSectionRef, { once: true, amount: 0.4 });
  const wakatimeInView = useInView(wakatimeSectionRef, { once: true, amount: 0.4 });

  // Scroll progress para efectos parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Efectos parallax con spring para suavidad
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
      icon: "",
      technologies: [
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      ]
    },
    {
      title: "Backend",
      icon: "",
      technologies: [
        { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ]
    },
    {
      title: "Frameworks y librerías Frontend",
      icon: "",
      technologies: [
        { name: "Astro", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg" },
        { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      ]
    },
    {
      title: "Frameworks Backend",
      icon: "",
      technologies: [
        { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
        { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      ]
    },
    {
      title: "Bases de datos",
      icon: "",
      technologies: [
        { name: "Oracle Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "SQL Server", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      ]
    },
    {
      title: "Herramientas, Contenedores y Entornos",
      icon: "",
      technologies: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "WebLogic" },
        { name: "Jaspersoft" },
        { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
        { name: "Mamp & Xampp", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mamp/mamp-original.svg" },
      ]
    },
    {
      title: "En proceso de Aprendizaje",
      icon: "",
      technologies: [
        { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
      ]
    }
  ];

  return (
    <section className="about" id="sobre-mi" ref={sectionRef}>
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
              alt="Nelson Sandoval - Desarrollador Web Jr."
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
              Desarrollador Web Jr.
            </motion.h2>
          </div>

          {/* Descripción */}
          <motion.div 
            className="about-description"
            variants={itemVariants}
          >
            <p>
              Soy <strong>programador Jr.</strong> con experiencia en desarrollo
              web, tanto en interfaces frontend como en lógica backend y bases
              de datos. Me interesa
              entender cada necesidad y convertirla en una solución clara,
              funcional y fácil de mantener.
            </p>
            <p>
              Combino experiencia profesional con proyectos propios para seguir
              ampliando mis conocimientos. Disfruto resolver problemas, aprender
              nuevas herramientas y elegir las tecnologías según lo que necesita
              cada proyecto.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Stack Tecnológico con animaciones avanzadas */}
      <motion.div 
        id="tech-section"
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
                className={`tech-category ${category.title === "En proceso de Aprendizaje" ? "learning-category" : ""}`}
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
                        {tech.logo && <img
                          src={tech.logo} 
                          alt={tech.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />}
                        <div className="tech-fallback" aria-hidden="true" style={{ display: tech.logo ? 'none' : 'flex' }}>
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
            Tiempo de Desarrollo (2026)
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

      {/* Sección de Wakatime con animaciones sofisticadas */}
      <motion.div 
        className="wakatime-section"
        ref={wakatimeSectionRef}
        initial={{ opacity: 0, y: 120, scale: 0.9 }}
        animate={wakatimeInView ? { opacity: 1, y: 0, scale: 1 } : {}}
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
            animate={wakatimeInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Actividad en Wakatime
          </motion.h3>
          
          <motion.div 
            className="wakatime-container"
            initial={{ 
              opacity: 0, 
              y: 80, 
              scale: 0.8,
              rotateY: 30
            }}
            animate={wakatimeInView ? { 
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
              href="https://wakatime.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="wakatime-link"
            >
              <motion.img 
                alt="Wakatime Badge" 
                src="https://wakatime.com/badge/user/cf255026-0033-42d2-a693-81d9535e3df8.svg"
                className="wakatime-badge"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              />
            </a>
            <p className="wakatime-description">
              Mi actividad de codificación rastreada en tiempo real
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
