import React, { useState } from 'react';
import styles from './BuyerDashboard.module.css';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';
import ProducersPage from './ProducersPage';
import CheckoutPage from './CheckoutPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReceiptPage from './ReceiptPage';
import PurchaseHistoryPage from './PurchaseHistoryPage';
import TrackingPage from './TrackingPage';

const BuyerDashboard = ({ username, onLogout }) => {
  const [activePage, setActivePage] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);


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

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
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
            onCheckout={() => setActivePage('checkout')}
            onUpdateQuantity={handleUpdateQuantity}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            onConfirmPurchase={(buyerInfo) => {
              const newOrder = {
                id: purchaseHistory.length + 1,
                date: new Date().toLocaleDateString(),
                buyer: buyerInfo,
                items: cartItems,
                total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
                status: buyerInfo.deliveryMethod === 'envio' ? 'Pendiente de envío' : 'Listo para recojo',
              };
              setPurchaseHistory([...purchaseHistory, newOrder]);
              setLastOrder(newOrder);
              setCartItems([]);
              setActivePage('receipt');
              toast.success('✅ ¡Compra realizada con éxito!', {
                position: 'top-right',
                autoClose: 3000,
              });
            }}
            onBack={() => setActivePage('cart')}
          />
        );
      case 'receipt':
        return (
          <ReceiptPage
            order={lastOrder}
            onBackToStore={() => setActivePage('products')}
            onGoToHistory={() => setActivePage('history')}
            onGoToTracking={() => setActivePage('tracking')}
          />
        );
      case 'history':
        return <PurchaseHistoryPage history={purchaseHistory} />;
      case 'tracking':
        const deliveryOrders = purchaseHistory.filter(o => o.buyer.deliveryMethod === 'envio');
        return ( <TrackingPage orders={deliveryOrders} onGoToHistory={() => setActivePage('history')} /> );
      default:
        return <ProductsPage onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <>
      <div className={styles.dashboard}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>TAYTAMUNA</div>
          <div className={styles.user}>👤 {username}</div>
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
            <button onClick={() => setActivePage('history')} className={activePage === 'history' ? styles.active : ''}>
              📜 Historial
            </button>
            <button onClick={() => setActivePage('tracking')} className={activePage === 'tracking' ? styles.active : ''}>
              🚚 Seguimiento
            </button>
          </nav>
          <button onClick={onLogout} className={styles.logout}>🔓 Cerrar sesión</button>
        </aside>
        <main className={styles.mainContent}>
          {renderPage()}
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default BuyerDashboard;
