import React, { useState } from 'react';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';
import OrdersPage from './OrdersPage';
import styles from './BuyerDashboard.module.css';
import { useLocalStorage } from '../utils/storage';

const BuyerDashboard = ({ username, onLogout }) => {
  const [view, setView] = useState('products');
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      return existing
        ? prev.map(p =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} agregado al carrito.`);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('¡Pedido realizado con éxito!');
    setCartItems([]);
    setView('orders');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2>Bienvenido, {username} 👤</h2>
        <nav>
          <button onClick={() => setView('products')}>Catálogo</button>
          <button onClick={() => setView('cart')}>Carrito ({cartItems.length})</button>
          <button onClick={() => setView('orders')}>Mis Pedidos</button>
          <button onClick={onLogout}>Cerrar sesión</button>
        </nav>
      </header>
      <main className={styles.main}>
        {view === 'products' && <ProductsPage onAddToCart={handleAddToCart} />}
        {view === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        )}
        {view === 'orders' && <OrdersPage />}
      </main>
    </div>
  );
};

export default BuyerDashboard;
