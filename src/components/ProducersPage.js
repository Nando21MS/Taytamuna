import React from 'react';
import styles from './ProducersPage.module.css';

const producers = [
  { id: 1, name: 'Cooperativa Andina', location: 'Cusco', description: 'Productores de papa, maíz y quinua.' },
  { id: 2, name: 'EcoCampo Perú', location: 'Ayacucho', description: 'Productos orgánicos certificados de altura.' },
  { id: 3, name: 'Red Agro Rural', location: 'Cajamarca', description: 'Frutas y verduras frescas de comunidades locales.' },
];

const ProducersPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>👨‍🌾 Productores rurales</h2>
      <div className={styles.producersGrid}>
        {producers.map(producer => (
          <div key={producer.id} className={styles.producerCard}>
            <div className={styles.cardHeader}>
              <h3>{producer.name}</h3>
              <p className={styles.location}>📍 {producer.location}</p>
            </div>
            <p className={styles.description}>{producer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProducersPage;
