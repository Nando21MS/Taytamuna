import React, { useState } from 'react';
import styles from './BuyerDashboard.module.css';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';
import ProducersPage from './ProducersPage';

const BuyerDashboard = ({ username, onLogout }) => {
  const [activePage, setActivePage] = useState('products');
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    alert('¡Gracias por tu compra!');
    setCartItems([]);
    setActivePage('products');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'products':
        return <ProductsPage onAddToCart={handleAddToCart} />;
      case 'producers':
        return <ProducersPage />;
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        );
      default:
        return <ProductsPage onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.user}>
          <span>👤 {username}</span>
        </div>
        <nav className={styles.nav}>
          <button onClick={() => setActivePage('products')} className={activePage === 'products' ? styles.active : ''}>
            🧺 Productos
          </button>
          <button onClick={() => setActivePage('producers')} className={activePage === 'producers' ? styles.active : ''}>
            👨‍🌾 Productores
          </button>
          <button onClick={() => setActivePage('cart')} className={activePage === 'cart' ? styles.active : ''}>
            🛒 Carrito ({cartItems.length})
          </button>
        </nav>

        {/* Botón de cerrar sesión al fondo */}
        <button onClick={onLogout} className={styles.logout}>
          🔓 Cerrar sesión
        </button>
      </aside>
      <main className={styles.mainContent}>
        {renderPage()}
      </main>
    </div>
  );
};

export default BuyerDashboard;
