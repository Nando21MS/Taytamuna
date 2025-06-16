import React from 'react';
import styles from './HomePage.module.css';

const HomePage = ({ onNavigate }) => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Bienvenido a Taytamuna</h1>
      <p className={styles.description}>
        Conecta directamente con los productores rurales y apoya el comercio justo de productos agrícolas frescos y sostenibles.
      </p>
      <button className={styles.shopButton} onClick={() => onNavigate('products')}>
        Explorar Productos
      </button>
    </div>
  );
};

export default HomePage;
