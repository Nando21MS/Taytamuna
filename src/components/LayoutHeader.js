import React from 'react';
import styles from './LayoutHeader.module.css';

const LayoutHeader = ({ onNavigate, cartCount, user, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => onNavigate('home')}>
        🌱 Taytamuna
      </div>
      <nav className={styles.navLinks}>
        <button onClick={() => onNavigate('home')}>Inicio</button>
        <button onClick={() => onNavigate('products')}>Productos</button>
        <button onClick={() => onNavigate('producers')}>Productores</button>
        <button onClick={() => onNavigate('cart')}>
          🛒 Carrito {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>
        {user ? (
          <>
            <span className={styles.username}>👋 {user.name}</span>
            <button onClick={onLogout}>Cerrar sesión</button>
          </>
        ) : (
          <button onClick={() => onNavigate('auth')}>Iniciar sesión</button>
        )}
      </nav>
    </header>
  );
};

export default LayoutHeader;
