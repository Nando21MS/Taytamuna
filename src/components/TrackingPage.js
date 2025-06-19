// src/components/TrackingPage.jsx
import React, { useRef } from 'react';
import styles from './TrackingPage.module.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';

const TrackingPage = ({ orders, onGoToHistory }) => {
  const receiptRef = useRef();

  const handleDownloadPDF = async () => {
    const input = receiptRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = 280;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight > pageHeight ? pageHeight : imgHeight);
    pdf.save(`comprobante_pedido_${orders.id}.pdf`);
    toast.success('📄 PDF descargado con éxito', { position: 'top-right' });
  };

  const handleSendEmail = () => {
    const orderDetails = orders.items
      .map(item => `${item.name} x${item.quantity} - S/. ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const templateParams = {
      name: orders.buyer.name,
      email: orders.buyer.email,
      address: orders.buyer.address,
      delivery_method: orders.buyer.deliveryMethod === 'recojo' ? 'Recojo en almacén' : 'Envío programado',
      order_details: orderDetails,
      total: orders.total.toFixed(2),
    };

    emailjs
      .send('service_015q65k', 'template_nxxccf7', templateParams, 'Q07qukCV5oVqRnut5')
      .then(() => {
        toast.success('📧 Comprobante enviado correctamente', { position: 'top-right' });
      })
      .catch(error => {
        console.error('Error al enviar el correo:', error);
        toast.error('❌ Error al enviar el comprobante', { position: 'top-right' });
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🚚 Seguimiento de tus envíos</h2>

      {orders.length === 0 ? (
        <p>No tienes pedidos con envío programado.</p>
      ) : (
       orders?.filter(Boolean).map((order) => (  // 🔁 AQUÍ definimos la variable `order`
          <div key={order.id} className={styles.receiptBox}>
            <p><strong>Pedido:</strong> #{order.id}</p>
            <p><strong>Fecha:</strong> {order.date}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Destino:</strong> {order.buyer.address}</p>

            <div className={styles.trackingSection}>
              <h4>Progreso:</h4>
              <div className={styles.timeline}>
                <div className={`${styles.step} ${styles.active}`}>📦 Pedido recibido</div>
                <div className={styles.step}>🚚 En camino</div>
                <div className={styles.step}>📍 Llegó a tu ciudad</div>
                <div className={styles.step}>✅ Entregado</div>
              </div>
            </div>
          </div>
        ))
      )}

      <div className={styles.buttons}>
        <button onClick={onGoToHistory}>📜 Ver historial</button>
      </div>
    </div>
  );
};

export default TrackingPage;
