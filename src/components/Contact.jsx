import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import './contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.8 });
  const formInView = useInView(formRef, { once: true, amount: 0.4 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.4 });
  const mapInView = useInView(mapRef, { once: true, amount: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yBackground = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), {
    stiffness: 100,
    damping: 30
  });

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

  // Manejar cambios en formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío (aquí integrarías con tu backend)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    alert('¡Mensaje enviado exitosamente!');
  };

  // Información de contacto
  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: "Email",
      info: "hello@nelson.dev"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: "Teléfono",
      info: "+503 1234-5678"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: "Ubicación",
      info: "San Salvador, El Salvador"
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

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="contact-section" id="contacto" ref={sectionRef}>
      {/* Background con parallax */}
      <motion.div
        className="contact-background"
        style={{ y: yBackground }}
      >
        <div className="contact-gradient" />
        <div className="contact-grid-pattern" />
      </motion.div>

      <div className="contact-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="contact-header"
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.span
            className="contact-label"
            variants={itemVariants}
          >
            Contacto
          </motion.span>
          
          <motion.h2
            className="contact-title"
            variants={itemVariants}
          >
            Trabajemos juntos
          </motion.h2>
          
          <motion.p
            className="contact-description"
            variants={itemVariants}
          >
            ¿Tienes un proyecto en mente? Me encantaría conocer tus ideas y 
            ayudarte a convertirlas en realidad digital.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="contact-content">
          {/* Formulario */}
          <motion.div
            ref={formRef}
            className="contact-form-wrapper"
            variants={formVariants}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
          >
            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="form-group floating"
                custom={0}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
              >
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder=" "
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />
                <label className="form-label">Nombre completo</label>
              </motion.div>

              <motion.div
                className="form-group floating"
                custom={1}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
              >
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder=" "
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />
                <label className="form-label">Email</label>
              </motion.div>

              <motion.div
                className="form-group floating"
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
              >
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder=" "
                  required
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />
                <label className="form-label">Asunto</label>
              </motion.div>

              <motion.div
                className="form-group floating"
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
              >
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder=" "
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />
                <label className="form-label">Mensaje</label>
              </motion.div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            ref={infoRef}
            className="contact-info"
            variants={infoVariants}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="info-card"
              whileHover={{
                y: -6,
                transition: { duration: 0.3 }
              }}
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="info-item"
                  initial={{ opacity: 0, x: 30 }}
                  animate={infoInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    x: 8,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    className="info-icon"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="info-content">
                    <h4>{item.title}</h4>
                    <p>{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Google Maps */}
            <motion.div
              ref={mapRef}
              className="map-container"
              initial={{ opacity: 0, y: 50 }}
              animate={mapInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 }
              }}
            >
              <iframe
                className="google-map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3875.9365852803203!2d-89.20694390419273!3d13.722289112127495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1ses-419!2ssv!4v1757288919187!5m2!1ses-419!2ssv"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación en San Salvador, El Salvador"
              />
              
              <motion.div
                className="map-overlay"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={mapInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                  type: "spring"
                }}
              >
                <h5>San Salvador</h5>
                <p>El Salvador</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}