import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import "./footer.css";

export default function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  // Efectos parallax
  const yBackground = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), {
    stiffness: 100,
    damping: 30
  });

  const yText = useSpring(useTransform(scrollYProgress, [0, 1], [0, 50]), {
    stiffness: 80,
    damping: 25
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.8]);

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
      y: 50,
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
        damping: 15
      }
    }
  };

  const brandVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 60,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    })
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8 + index * 0.1,
        type: "spring",
        stiffness: 150,
        damping: 10
      }
    })
  };

  return (
    <footer className="footer" ref={footerRef}>
      {/* Background parallax */}
      <motion.div 
        className="footer-background"
        style={{ y: yBackground, opacity }}
      >
        <div className="footer-gradient" />
        <motion.div 
          className="footer-pattern"
          style={{ y: yText }}
        />
      </motion.div>

      <div className="footer-container">
        <motion.div
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand gigante 
          <motion.div 
            className="footer-brand"
            ref={brandRef}
            variants={brandVariants}
          >
            <motion.h1 
              className="brand-text"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <span className="brand-letter">S</span>
              <span className="brand-letter">A</span>
              <span className="brand-letter">N</span>
              <span className="brand-letter">D</span>
              <span className="brand-letter">O</span>
            </motion.h1>
          </motion.div>
          */}
        </motion.div>

        {/* Footer bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="footer-bottom-content">
            <motion.p 
              className="copyright"
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              © {new Date().getFullYear()} Nelson Dev. Todos los derechos reservados.
            </motion.p>
            
            <div className="footer-meta">
              <motion.span 
                className="location"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                San Salvador, El Salvador GMT-6
              </motion.span>
              <motion.span 
                className="status"
                animate={{
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Disponible para proyectos
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}