import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProducersPage from './components/ProducersPage';
import CartPage from './components/CartPage';
import AuthPage from './components/AuthPage';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import { useLocalStorage } from './utils/storage';
import styles from './App.module.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const handleNavigate = (page) => setCurrentPage(page);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage(userData.role === 'producer' ? 'farmer-dashboard' : 'buyer-dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('home');
  };

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

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleCheckout = () => {
    alert('🎉 Gracias por tu compra. ¡Tu pedido ha sido procesado con éxito!');
    setCartItems([]);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
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
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'auth':
        return <AuthPage onLogin={handleLogin} />;
      case 'farmer-dashboard':
        return <FarmerDashboard user={user} />;
      case 'buyer-dashboard':
        return <BuyerDashboard user={user} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={styles.appWrapper}>
      <LayoutHeader onNavigate={handleNavigate} cartCount={cartItems.length} />
      <main className={styles.mainContent}>
        <div className={styles.pageWrapper}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
