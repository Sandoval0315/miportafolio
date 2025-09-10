import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import './contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const backgroundRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.3 });
  const mapInView = useInView(mapRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Efectos parallax mejorados
  const yBackground = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), {
    stiffness: 100,
    damping: 30
  });

  const yFloating1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 80,
    damping: 25
  });

  const yFloating2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), {
    stiffness: 60,
    damping: 20
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error enviando formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Información de contacto
  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect width="20" height="16" x="2" y="4" rx="2"/>
          <path d="m22 7-10 5L2 7"/>
        </svg>
      ),
      title: "Email",
      info: "hello@nelson.dev"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: "Teléfono",
      info: "+503 1234-5678"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: "Ubicación",
      info: "San Salvador, El Salvador"
    }
  ];

  // Variantes de animación mejoradas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        type: "spring",
        stiffness: 60,
        damping: 20
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
        damping: 15
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -80, rotateY: -10 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 60,
        damping: 20
      }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 80, rotateY: 10 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 60,
        damping: 20
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    })
  };

  return (
    <section className="contact-section" id="contacto" ref={sectionRef}>
      {/* Background mejorado con parallax */}
      <motion.div
        className="contact-background"
        style={{ y: yBackground, opacity, scale }}
        ref={backgroundRef}
      >
        <motion.div 
          className="contact-gradient"
          style={{ y: yFloating1 }}
        />
        <motion.div 
          className="contact-grid-pattern"
          style={{ y: yFloating2 }}
        />
        <div className="contact-floating-elements">
          <motion.div 
            className="floating-element floating-element-1"
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="floating-element floating-element-2"
            animate={{
              y: [0, 25, 0],
              x: [0, -10, 0],
              rotate: [0, -3, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="floating-element floating-element-3"
            animate={{
              y: [0, -15, 0],
              x: [0, 8, 0],
              rotate: [0, 2, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </motion.div>

      <div className="contact-container">
        {/* Header mejorado */}
        <motion.div
          ref={headerRef}
          className="contact-header"
          variants={containerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <motion.div
            className="contact-label-wrapper"
            variants={itemVariants}
          >
            <span className="contact-label">Contacto</span>
            <div className="contact-label-line" />
          </motion.div>
          
          <motion.h2
            ref={titleRef}
            className="contact-title"
            variants={titleVariants}
          >
            Construyamos algo{" "}
            <span className="title-highlight">extraordinario</span>{" "}
            juntos
          </motion.h2>
          
          <motion.p
            className="contact-description"
            variants={itemVariants}
          >
            ¿Tienes una idea que quieres convertir en realidad digital? 
            Me especializo en crear experiencias web únicas y funcionales. 
            Conversemos sobre tu próximo proyecto.
          </motion.p>
        </motion.div>

        {/* Content reorganizado */}
        <div className="contact-content">
          {/* Formulario principal */}
          <motion.div
            ref={formRef}
            className="contact-form-section"
            variants={formVariants}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
          >
            <div className="form-header">
              <h3>Envíame un mensaje</h3>
              <p>Te responderé en menos de 24 horas</p>
            </div>

            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              whileHover={{
                y: -4,
                transition: { duration: 0.3 }
              }}
            >
              {/* Mensaje de éxito */}
              {submitSuccess && (
                <motion.div
                  className="success-message"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                >
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"/>
                      <circle cx="12" cy="12" r="9"/>
                    </svg>
                  </div>
                  <span>¡Mensaje enviado exitosamente!</span>
                </motion.div>
              )}

              <div className="form-row">
                <motion.div
                  className="form-group"
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate={formInView ? "visible" : "hidden"}
                >
                  <label className="form-label">Nombre completo</label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{
                      scale: 1.02,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                  />
                </motion.div>

                <motion.div
                  className="form-group"
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate={formInView ? "visible" : "hidden"}
                >
                  <label className="form-label">Email</label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    whileFocus={{
                      scale: 1.02,
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                className="form-group"
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
              >
                <label className="form-label">Asunto</label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                />
              </motion.div>

              <motion.div
                className="form-group"
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate={formInView ? "visible" : "hidden"}
              >
                <label className="form-label">Mensaje</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="5"
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  whileFocus={{
                    scale: 1.02,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                />
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
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="button-loading">
                    <div className="loading-spinner">
                      <div className="spinner-ring"></div>
                    </div>
                    Enviando...
                  </span>
                ) : (
                  <span className="button-text">
                    Enviar Mensaje
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                    </svg>
                  </span>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Información de contacto compacta */}
          <motion.div
            ref={infoRef}
            className="contact-info-section"
            variants={infoVariants}
            initial="hidden"
            animate={infoInView ? "visible" : "hidden"}
          >
            <div className="info-header">
              <h3>Otros métodos</h3>
              <p>Opciones rápidas de contacto</p>
            </div>

            <div className="contact-info-grid">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="info-card-compact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    className="info-icon-compact"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="info-content-compact">
                    <h4>{item.title}</h4>
                    <p>{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Google Maps abajo */}
        <motion.div
          ref={mapRef}
          className="map-section"
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          animate={mapInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 1,
            delay: 0.3,
            type: "spring",
            stiffness: 60
          }}
          whileHover={{
            y: -6,
            transition: { duration: 0.3 }
          }}
        >
          <div className="map-header">
            <h3>Ubicación</h3>
            <p>Dónde me encuentro</p>
          </div>
          
          <div className="map-container">
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
              <div className="map-overlay-content">
                <h5>San Salvador</h5>
                <p>El Salvador, Centroamérica</p>
                <div className="map-overlay-badge">GMT-6</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}