import React, { useState, useEffect } from 'react';
import styles from './WelcomePage.module.css';
import { FaSignInAlt, FaUserPlus, FaLeaf, FaBullseye, FaEye, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const WelcomePage = ({ onNavigate }) => {
  const testimonios = [
    {
      nombre: 'Juana Quispe',
      comentario: 'Gracias a Taytamuna, ahora vendo directamente mis productos sin intermediarios.',
      puntaje: 5,
      foto: 'https://portal.andina.pe/EDPfotografia3/Thumbnail/2019/07/06/000598665W.jpg'
    },
    {
      nombre: 'Pedro Mamani',
      comentario: 'He mejorado mis ingresos y puedo planificar mejor mi producción.',
      puntaje: 4,
      foto: 'https://ayudaenaccion.org.pe/uploads/2022/06/Productor-de-palta-2-1-scaled.jpg'
    },
    {
      nombre: 'Lucía Ramos',
      comentario: 'Me siento valorada como productora rural. Gran iniciativa.',
      puntaje: 5,
      foto: 'https://i0.wp.com/cepes.org.pe/wp-content/uploads/2021/11/000810594W.jpg?fit=1800%2C1200&ssl=1'
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonios.length]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonios.length);
  };

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.navLogo}>🌱 TAYTAMUNA</div>
      </header>

      {/* BANNER CON IMAGEN */}
      {/* BANNER CON IMAGEN */}
      <section className={styles.banner} style={{
        backgroundImage: "url('https://img.freepik.com/foto-gratis/vista-fotorrealista-mujer-cosechando-jardin-ecologico-sostenible_23-2151462962.jpg?semt=ais_hybrid&w=740')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff'
      }}>
        <div className={styles.bannerOverlay} style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#fff' }}>Conectando el campo con compradores conscientes</h1>
          <p style={{ color: '#eee' }}>Un puente entre pequeños productores y consumidores responsables</p>
        </div>
      </section>

      {/* BOTONES CON ICONOS */}
      <div className={styles.actions}>
        <button className={styles.loginBtn} onClick={() => onNavigate('auth')}>
          <FaSignInAlt className={styles.icon} />
          Ya tengo cuenta, ingresar
        </button>
        <button className={styles.registerBtn} onClick={() => onNavigate('registro')}>
          <FaUserPlus className={styles.icon} />
          Soy nuevo, registrarme
        </button>
      </div>

      {/* SECCIONES INFORMATIVAS */}
      <main className={styles.content}>
        <section className={`${styles.section} ${styles.reveal}`}>
          <h2><FaLeaf className={styles.sectionIcon} /> ¿Qué es TAYTAMUNA?</h2>
          <p>
            Una plataforma que permite a pequeños productores rurales vender directamente sus productos agrícolas
            a compradores institucionales o colectivos urbanos bajo un enfoque de comercio justo.
          </p>
        </section>

        <section className={`${styles.section} ${styles.reveal}`}>
          <h2><FaBullseye className={styles.sectionIcon} /> Misión</h2>
          <p>
            Mejorar los ingresos de pequeños productores rurales conectándolos directamente con compradores responsables, eliminando intermediarios.
          </p>
        </section>

        <section className={`${styles.section} ${styles.reveal}`}>
          <h2><FaEye className={styles.sectionIcon} /> Visión</h2>
          <p>
            Ser la plataforma líder en Perú que promueve la venta directa responsable de productos agrícolas al por mayor, fortaleciendo la economía rural.
          </p>
        </section>
      </main>

      {/* SECCIÓN DE TESTIMONIOS */}
      <section className={`${styles.testimonialSection} ${styles.reveal}`}>
        <h2><FaStar className={styles.sectionIcon} /> Opiniones de Agricultores</h2>
        <div className={styles.sliderContainer}>
          <button className={styles.sliderArrow} onClick={handlePrev}><FaChevronLeft /></button>
          <div className={styles.testimonialCard}>
            <img src={testimonios[current].foto} alt={`Foto de ${testimonios[current].nombre}`} className={styles.testimonialImage} />
            <h3>{testimonios[current].nombre}</h3>
            <p className={styles.comment}>{testimonios[current].comentario}</p>
            <div className={styles.rating}>
              {[...Array(testimonios[current].puntaje)].map((_, i) => <FaStar key={i} color="#FFD700" />)}
            </div>
          </div>
          <button className={styles.sliderArrow} onClick={handleNext}><FaChevronRight /></button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>&copy; 2025 TAYTAMUNA. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
