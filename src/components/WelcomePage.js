import React from 'react';
import styles from './WelcomePage.module.css';
import { FaSignInAlt, FaUserPlus, FaLeaf, FaBullseye, FaEye } from 'react-icons/fa';

const WelcomePage = ({ onNavigate }) => {
  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.navbar}>
        <div className={styles.navLogo}>🌱 TAYTAMUNA</div>
      </header>

      {/* BANNER CON IMAGEN */}
      <section className={styles.banner}>
        <div className={styles.bannerOverlay}>
          <h1>Conectando el campo con compradores conscientes</h1>
          <p>Un puente entre pequeños productores y consumidores responsables</p>
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

      {/* SECCIONES ANIMADAS */}
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

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>&copy; 2025 TAYTAMUNA. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;
