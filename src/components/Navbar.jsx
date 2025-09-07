import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import "./navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 100], [0, -100]);
  
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

  const navVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4 + i * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    hover: {
      y: -3,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#portafolio", label: "Portafolio" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        variants={navVariants}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <span className="logo-text"><strong>Mi</strong>Portfolio</span>
          </motion.div>

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
                  whileHover="hover"
                >
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                  <motion.div
                    className="nav-dot"
                    initial="initial"
                    whileHover="animate"
                    exit="exit"
                    variants={dotVariants}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button 
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={`hamburger-line ${open ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${open ? 'active' : ''}`}></span>
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mobile-menu-bg" />
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="mobile-link"
                  variants={mobileItemVariants}
                  onClick={() => setOpen(false)}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mobile-link-dot">●</span>
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Los estilos van en navbar.css separado */}
    </>
  );
}