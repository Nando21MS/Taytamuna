// src/components/CheckoutPage.jsx
import React, { useState } from 'react';
import styles from './CheckoutPage.module.css';
import { toast } from 'react-toastify';

const CheckoutPage = ({ cartItems, onConfirmPurchase, onBack }) => {
  const [buyerInfo, setBuyerInfo] = useState({ name: '', email: '', address: '', deliveryMethod: 'recojo' });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    if (!buyerInfo.name || !buyerInfo.email || !buyerInfo.address) {
      toast.error('Por favor, completa todos los campos.', { position: 'top-right' });
      return;
    }
    onConfirmPurchase(buyerInfo);
  };

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutTitle}>🧾 Finalizar compra</h2>

      <div className={styles.section}>
        <h3>📦 Resumen del pedido</h3>
        <ul className={styles.cartList}>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} x{item.quantity} - S/. {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className={styles.total}>Total: <strong>S/. {total.toFixed(2)}</strong></p>
      </div>

      <div className={styles.section}>
        <h3>🧑 Datos del comprador</h3>
        <input className={styles.inputField}  type="text" name="name" placeholder="Nombre completo" value={buyerInfo.name} onChange={handleChange} />
        <input className={styles.inputField}  type="email" name="email" placeholder="Correo electrónico" value={buyerInfo.email} onChange={handleChange} />
        <input className={styles.inputField}  type="text" name="address" placeholder="Dirección de entrega" value={buyerInfo.address} onChange={handleChange} />
      </div>

      <div className={styles.section}>
        <h3>🚚 Método de entrega</h3>
        <select className={styles.selectField} name="deliveryMethod" value={buyerInfo.deliveryMethod} onChange={handleChange}>
          <option value="recojo">Recojo en almacén</option>
          <option value="envio">Envío programado</option>
        </select>
      </div>

      <div className={styles.buttons}>
        <button className={styles.backBtn} onClick={onBack}>⬅ Volver</button>
        <button className={styles.confirmBtn} onClick={handleConfirm}>✅ Confirmar compra</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
