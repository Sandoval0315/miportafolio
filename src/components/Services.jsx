import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import './services.css';

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const processRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.8 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.3 });
  const processInView = useInView(processRef, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Efectos parallax suaves con spring
  const yBackground = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]), {
    stiffness: 100,
    damping: 30
  });
  const yGeometric1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), {
    stiffness: 120,
    damping: 25
  });
  const yGeometric2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 80,
    damping: 35
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  // Detectar tema
  useEffect(() => {
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setDarkMode(savedTheme === 'dark');
    };

    initTheme();

    const handleThemeChange = (event) => {
      setDarkMode(event.detail.theme === 'dark');
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  // Datos de servicios
  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      name: "Desarrollo Web",
      description: "Sitios web modernos, rápidos y optimizados con las últimas tecnologías. Desde landing pages hasta aplicaciones web complejas.",
      features: [
        "Diseño responsive",
        "Optimización SEO",
        "Performance optimizada",
        "Mantenimiento incluido"
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      name: "UI/UX Design",
      description: "Interfaces intuitivas y experiencias de usuario excepcionales. Diseño centrado en el usuario con metodologías probadas.",
      features: [
        "Research de usuarios",
        "Wireframes y prototipos",
        "Design systems",
        "Testing de usabilidad"
      ]
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/>
          <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
      ),
      name: "Backend Development",
      description: "APIs robustas y escalables. Arquitecturas backend sólidas con bases de datos optimizadas y seguridad implementada.",
      features: [
        "APIs RESTful",
        "Bases de datos",
        "Seguridad avanzada",
        "Escalabilidad"
      ]
    }
  ];

  // Proceso de trabajo
  const processSteps = [
    {
      number: "01",
      title: "Descubrimiento",
      description: "Entendemos tus necesidades, objetivos y audiencia objetivo."
    },
    {
      number: "02", 
      title: "Estrategia",
      description: "Desarrollamos una estrategia personalizada y roadmap del proyecto."
    },
    {
      number: "03",
      title: "Desarrollo",
      description: "Implementamos la solución con las mejores prácticas y tecnologías."
    },
    {
      number: "04",
      title: "Lanzamiento",
      description: "Desplegamos el proyecto y brindamos soporte continuo."
    }
  ];

  // Variantes de animación
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
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: 15
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    })
  };

  const processVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="services-section" id="servicios" ref={sectionRef}>
      {/* Background con parallax */}
      <motion.div
        className="services-background"
        style={{ y: yBackground, opacity }}
      >
        <div className="services-grid-bg" />
        
        <motion.div
          className="services-geometric geometric-1"
          style={{ y: yGeometric1 }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="services-geometric geometric-2"
          style={{ y: yGeometric2 }}
          animate={{
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="services-geometric geometric-3"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="services-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="services-header"
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.span
            className="services-label"
            variants={itemVariants}
          >
            Servicios
          </motion.span>
          
          <motion.h2
            className="services-title"
            variants={itemVariants}
          >
            Soluciones digitales completas
          </motion.h2>
          
          <motion.p
            className="services-description"
            variants={itemVariants}
          >
            Transformo ideas en experiencias digitales excepcionales que conectan 
            con tu audiencia y hacen crecer tu negocio.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={cardsRef}
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              custom={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="service-icon"
                whileHover={{
                  scale: 1.05,
                  transition: { 
                    duration: 0.2,
                    ease: "easeOut"
                  }
                }}
              >
                {service.icon}
              </motion.div>
              
              <div className="service-content">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="service-feature"
                      initial={{ opacity: 0, x: -20 }}
                      animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: index * 0.2 + featureIndex * 0.1 + 0.5,
                        duration: 0.4
                      }}
                    >
                      <div className="feature-check" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.a
                  href="#contacto"
                  className="service-cta"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  Más información
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div
          ref={processRef}
          className="process-section"
          initial={{ opacity: 0, y: 100 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h3
            className="process-title"
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Mi proceso de trabajo
          </motion.h3>
          
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="process-step"
                custom={index}
                variants={processVariants}
                initial="hidden"
                animate={processInView ? "visible" : "hidden"}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="step-number"
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {step.number}
                </motion.div>
                
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}