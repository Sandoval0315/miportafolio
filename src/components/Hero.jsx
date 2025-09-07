import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Hero() {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax más suave y controlado
  const yBackground = useTransform(scrollY, [0, 1000], [0, -300]);
  const yContent = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  // Roles que se van rotando
  const roles = ["Frontend Developer", "UI/UX Designer", "Problem Solver"];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    // Mouse parallax suave
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    // Rotación de roles
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(roleInterval);
    };
  }, []);

  return (
    <section 
      className="hero-section" 
      ref={heroRef}
      style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)',
      }}
    >
      {/* Fondo con patrón geométrico y parallax */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          y: yBackground,
          zIndex: 1,
        }}
      >
        {/* Patrón de puntos */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
            animation: 'patternMove 20s linear infinite',
          }}
        />
        
        {/* Elementos geométricos flotantes */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01))',
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: '150px',
            height: '150px',
            background: 'rgba(0,0,0,0.02)',
            transform: 'rotate(45deg)',
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
          }}
        />
        
        <motion.div
          style={{
            position: 'absolute',
            bottom: '30%',
            left: '20%',
            width: '100px',
            height: '100px',
            borderRadius: '20px',
            background: 'rgba(0,0,0,0.02)',
            x: mousePosition.x * 0.8,
            y: mousePosition.y * 0.8,
          }}
        />
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '700px',
          padding: '0 2rem',
          y: yContent,
          opacity,
          scale,
        }}
      >
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '2rem' }}
        >
          <motion.h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '200',
              color: '#000',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: '0.9',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Hola, soy{' '}
            <motion.span
              style={{
                fontWeight: '600',
                background: 'linear-gradient(135deg, #000 0%, #333 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Nelson
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Subtítulo rotativo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentRole}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                color: '#666',
                margin: 0,
                fontWeight: '300',
                letterSpacing: '0.01em',
              }}
            >
              {roles[currentRole]}
            </motion.p>
          </AnimatePresence>
          
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
              width: '2px',
              height: '1.5rem',
              backgroundColor: '#000',
              marginLeft: '8px',
            }}
          />
        </motion.div>

        {/* Breve descripción */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#888',
            maxWidth: '500px',
            margin: '0 auto 3rem',
            lineHeight: '1.6',
            fontWeight: '300',
          }}
        >
          Creo experiencias digitales elegantes y funcionales con atención al detalle
        </motion.p>

        {/* Botones CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <motion.a
            href="#portafolio"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              backgroundColor: '#000',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '400',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Ver mi trabajo
            <motion.span
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.a>
          
          <motion.a
            href="#contacto"
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              backgroundColor: 'rgba(0,0,0,0.05)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '400',
              border: '1px solid rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          >
            Contacto
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: 'rgba(0,0,0,0.4)',
          zIndex: 10,
        }}
      >
        <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: '300',
          letterSpacing: '0.1em' 
        }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '1px',
            height: '2rem',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
          }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
}