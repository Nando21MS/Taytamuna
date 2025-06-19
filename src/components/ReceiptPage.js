import React, { useRef } from 'react';
import styles from './ReceiptPage.module.css';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from '@emailjs/browser';
import { ToastContainer } from 'react-toastify';

const ReceiptPage = ({ order, onBackToStore, onGoToHistory }) => {
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
    pdf.save(`comprobante_pedido_${order.id}.pdf`);
    toast.success('📄 PDF descargado con éxito', { position: 'top-right' });
  };

  const handleSendEmail = () => {
    const orderDetails = order.items
      .map(item => `${item.name} x${item.quantity} - S/. ${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');

    const templateParams = {
      name: order.buyer.name,
      email: order.buyer.email,
      address: order.buyer.address,
      delivery_method: order.buyer.deliveryMethod === 'recojo' ? 'Recojo en almacén' : 'Envío programado',
      order_details: orderDetails,
      total: order.total.toFixed(2),
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
    <div className={styles.receiptContainer}>
      <div ref={receiptRef} className={styles.receiptBox}>
        <h2 className={styles.title}>🧾 Comprobante de compra</h2>
        <p><strong>Pedido:</strong> #{order.id}</p>
        <p><strong>Fecha:</strong> {order.date}</p>
        <hr />
        <h3>🧑 Datos del comprador</h3>
        <p><strong>Nombre:</strong> {order.buyer.name}</p>
        <p><strong>Email:</strong> {order.buyer.email}</p>
        <p><strong>Dirección:</strong> {order.buyer.address}</p>
        <p><strong>Entrega:</strong> {order.buyer.deliveryMethod === 'recojo' ? 'Recojo en almacén' : 'Envío programado'}</p>
        <hr />
        <h3>📦 Productos adquiridos</h3>
        <ul>
          {order.items.map(item => (
            <li key={item.id}>
              {item.name} x{item.quantity} - S/. {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className={styles.total}>💰 Total: S/. {order.total.toFixed(2)}</p>
      </div>

      <div className={styles.buttons}>
        <button onClick={onBackToStore}>🏪 Volver a tienda</button>
        <button onClick={onGoToHistory}>📜 Ver historial</button>
        <button onClick={handleDownloadPDF}>⬇ Descargar PDF</button>
        <button onClick={handleSendEmail}>📧 Enviar por correo</button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default ReceiptPage;