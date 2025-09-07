import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Gestión del tema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme === 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  return (
    <motion.button
      className="floating-theme-toggle"
      onClick={toggleTheme}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.1,
        rotate: 180,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
      title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
        background: darkMode 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        boxShadow: darkMode
          ? '0 8px 32px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 255, 255, 0.05)'
          : '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        outline: 'none'
      }}
    >
      <motion.div
        style={{
          width: '22px',
          height: '22px',
          color: darkMode ? '#fff' : '#000',
          opacity: 0.8,
          transition: 'all 0.3s ease'
        }}
        whileHover={{ opacity: 1 }}
        animate={{ 
          rotate: darkMode ? 0 : 360,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </motion.div>

      <style jsx>{`
        .floating-theme-toggle:hover {
          transform: scale(1.1);
          box-shadow: ${darkMode
            ? '0 12px 40px rgba(255, 255, 255, 0.15), 0 6px 16px rgba(255, 255, 255, 0.08)'
            : '0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 16px rgba(0, 0, 0, 0.08)'
          } !important;
        }
        
        .floating-theme-toggle:focus {
          outline: 2px solid ${darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .floating-theme-toggle {
            bottom: 1.5rem !important;
            right: 1.5rem !important;
            width: 48px !important;
            height: 48px !important;
          }
        }

        @media (max-width: 480px) {
          .floating-theme-toggle {
            bottom: 1rem !important;
            right: 1rem !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </motion.button>
  );
};

export default FloatingThemeToggle;