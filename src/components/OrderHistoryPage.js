import React from 'react';
import styles from './OrderHistoryPage.module.css';

const OrderHistoryPage = ({ orders }) => {
  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.title}>📦 Mis pedidos</h2>
      {orders.length === 0 ? (
        <p className={styles.empty}>No tienes pedidos registrados aún.</p>
      ) : (
        <ul className={styles.orderList}>
          {orders.map((order, index) => (
            <li key={index} className={styles.orderCard}>
              <h3>🧾 Pedido #{index + 1}</h3>
              <p><strong>Estado:</strong> <span className={styles.status}>{order.status}</span></p>
              <p><strong>Fecha:</strong> {order.date}</p>
              <p><strong>Total:</strong> S/. {order.total.toFixed(2)}</p>
              <ul className={styles.productList}>
                {order.items.map((item) => (
                  <li key={item.id} className={styles.productItem}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>S/. {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
