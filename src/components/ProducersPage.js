import React from 'react';
import styles from './ProducersPage.module.css';
import { FaMapMarkerAlt, FaSeedling } from 'react-icons/fa';

const producers = [
  {
    id: 1,
    name: 'Cooperativa Andina',
    location: 'Cusco',
    description: 'Productores de papa, maíz y quinua.',
  },
  {
    id: 2,
    name: 'EcoCampo Perú',
    location: 'Ayacucho',
    description: 'Productos orgánicos certificados de altura.',
  },
  {
    id: 3,
    name: 'Red Agro Rural',
    location: 'Cajamarca',
    description: 'Frutas y verduras frescas de comunidades locales.',
  },
];

const ProducersPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🌾 Conoce a nuestros Productores</h2>
      <p className={styles.subtitle}>Aliados rurales que cultivan con responsabilidad y compromiso social</p>

      <div className={styles.producersGrid}>
        {producers.map((producer) => (
          <div key={producer.id} className={styles.producerCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.name}><FaSeedling /> {producer.name}</h3>
              <p className={styles.location}><FaMapMarkerAlt /> {producer.location}</p>
            </div>
            <p className={styles.description}>{producer.description}</p>
            <span className={styles.badge}>Certificado</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducersPage;
