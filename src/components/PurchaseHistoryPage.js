import React from 'react';
import styles from './PurchaseHistoryPage.module.css';

const PurchaseHistoryPage = ({ history }) => {
  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.title}>📜 Historial de compras</h2>
      {history.length === 0 ? (
        <p>No has realizado ninguna compra aún.</p>
      ) : (
        history.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <h3>🧾 Pedido #{order.id} - {order.date}</h3>
            <p><strong>Nombre:</strong> {order.buyer.name}</p>
            <p><strong>Método de entrega:</strong> {order.buyer.deliveryMethod}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} x{item.quantity} - S/. {(item.price * item.quantity).toFixed(2)}</li>
              ))}
            </ul>
            <p className={styles.total}>Total: S/. {order.total.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseHistoryPage;
