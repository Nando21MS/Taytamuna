import React from 'react';
import styles from './CartPage.module.css';
import { getProductImage } from '../utils/getProductImage';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartPage = ({ cartItems, onRemoveFromCart, onCheckout, onUpdateQuantity }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2>🛒 Tu carrito</h2>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map(item => (
              <li key={item.id} className={styles.cartItem}>
                <img src={getProductImage(item.name)} alt={item.name} className={styles.cartImage} />
                <div className={styles.cartInfo}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.price}>S/. {(item.price * item.quantity).toFixed(2)}</span>
                  <div className={styles.quantityControls}>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}><FaMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}><FaPlus /></button>
                  </div>
                </div>
                <button onClick={() => onRemoveFromCart(item.id)} className={styles.removeBtn}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.total}>Total: S/. {total.toFixed(2)}</div>
          <button className={styles.checkoutBtn} onClick={onCheckout}>Finalizar compra</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
