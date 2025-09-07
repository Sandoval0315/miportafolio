import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import "./navbar.css";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const { scrollY } = useScroll();
  
  // Gestión del scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      
      if (scrollY !== lastScrollY && Math.abs(scrollY - lastScrollY) > 5) {
        setHidden(direction === "down" && scrollY > 100);
        setScrolled(scrollY > 20);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, []);

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

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  // Variantes de animación simples
  const navVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.1, ease: "easeOut" }
    }
  };

  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.3 + i * 0.1,
        ease: "easeOut"
      }
    })
  };

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const sidebarItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" }
    })
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.2 } }
  };

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#contacto", label: "Contacto" }
  ];

  const SunIcon = () => (
    <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );

  const MoonIcon = () => (
    <svg className="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  return (
    <>
      {/* Navbar principal */}
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        variants={navVariants}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
      >
        <div className="nav-container">
          {/* Logo */}
          <motion.div 
            className="nav-logo"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover={{ scale: 1.02 }}
          >
            <span className="logo-text"><strong>Mi</strong>Portfolio</span>
          </motion.div>

          {/* Navegación (solo desktop) */}
          <div className="nav-center">
            <div className="nav-links">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  className="nav-link-wrapper"
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  custom={i}
                  whileHover={{ y: -2 }}
                >
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                  <div className="nav-dot" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Hamburger (solo móvil) */}
          <motion.button 
            className="nav-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`hamburger-line ${sidebarOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${sidebarOpen ? 'active' : ''}`}></span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Sidebar móvil */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="sidebar-overlay"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="mobile-sidebar"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Header del sidebar */}
              <div className="sidebar-header">
                <div className="sidebar-logo">Navegación</div>
                <motion.button 
                  className="sidebar-close"
                  onClick={() => setSidebarOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </motion.button>
              </div>

              {/* Navegación */}
              <nav className="sidebar-nav">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="sidebar-link"
                    variants={sidebarItemVariants}
                    initial="closed"
                    animate="open"
                    custom={i}
                    onClick={handleLinkClick}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="sidebar-link-dot" />
                    {link.label}
                  </motion.a>
                ))}

                {/* Toggle de tema en sidebar */}
                <motion.div
                  className="sidebar-theme-toggle"
                  variants={sidebarItemVariants}
                  initial="closed"
                  animate="open"
                  custom={navLinks.length}
                  onClick={toggleTheme}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="sidebar-link-dot" />
                  <span className="sidebar-theme-label">
                    {darkMode ? "Modo claro" : "Modo oscuro"}
                  </span>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}