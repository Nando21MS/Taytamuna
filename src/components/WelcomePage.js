import React from 'react';
import styles from './WelcomePage.module.css';

const WelcomePage = ({ onNavigateToLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.logo}>🌱 AgroConecta</h1>
        <p className={styles.slogan}>Conectando el campo con compradores conscientes</p>

        <section className={styles.section}>
          <h2>¿Qué es AgroConecta?</h2>
          <p>
            AgroConecta es una plataforma web que permite a pequeños productores rurales vender directamente sus productos agrícolas
            a compradores institucionales o colectivos urbanos bajo un enfoque de comercio justo.
          </p>
        </section>

        <section className={styles.section}>
          <h2>🎯 Misión</h2>
          <p>
            Mejorar los ingresos de pequeños productores rurales conectándolos directamente con compradores responsables, eliminando intermediarios.
          </p>
        </section>

        <section className={styles.section}>
          <h2>🌟 Visión</h2>
          <p>
            Ser la plataforma líder en Perú que promueve la venta directa responsable de productos agrícolas al por mayor, fortaleciendo la economía rural.
          </p>
        </section>

        <div className={styles.actions}>
          <button className={styles.loginBtn} onClick={() => onNavigateToLogin('login')}>
            Iniciar Sesión
          </button>
          <button className={styles.registerBtn} onClick={() => onNavigateToLogin('register')}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
