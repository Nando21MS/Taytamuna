import React, { useState, useEffect } from 'react';
import styles from './FarmerDashboard.module.css';
import Swal from 'sweetalert2';

const FarmerDashboard = ({ username, onLogout }) => {
  const [view, setView] = useState('misProductos');
  const [productos, setProductos] = useState([
    { id: 1, name: 'Papa Nativa', price: 2.5, stock: 100 },
    { id: 2, name: 'Camote Amarillo', price: 2.0, stock: 80 },
  ]);
  const [nuevoProducto, setNuevoProducto] = useState({ name: '', price: '', stock: '' });
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [notificacion, setNotificacion] = useState(null);

  useEffect(() => {
    if (view === 'agregar') {
      setNuevoProducto({ name: '', price: '', stock: '' });
    }
  }, [view]);

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      name: nuevoProducto.name,
      price: parseFloat(nuevoProducto.price),
      stock: parseInt(nuevoProducto.stock),
    };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ name: '', price: '', stock: '' });
    mostrarNotificacion('✅ Producto agregado correctamente');
    setView('misProductos');
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter(p => p.id !== id));
        mostrarNotificacion('🗑️ Producto eliminado');
      }
    });
  };

  const handleEditar = (producto) => {
    setEditandoProducto(producto);
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    setProductos(productos.map(p =>
      p.id === editandoProducto.id
        ? {
            ...editandoProducto,
            price: parseFloat(editandoProducto.price),
            stock: parseInt(editandoProducto.stock),
          }
        : p
    ));
    setEditandoProducto(null);
    mostrarNotificacion('✏️ Producto actualizado correctamente');
  };

  const cerrarModal = () => {
    setEditandoProducto(null);
  };

  const renderContenido = () => {
    switch (view) {
      case 'misProductos':
        return (
          <div className={styles.section}>
            <h2>📦 Mis Productos</h2>
            {productos.length === 0 ? (
              <p>No tienes productos registrados aún.</p>
            ) : (
              <ul className={styles.productList}>
                {productos.map((p) => (
                  <li key={p.id} className={styles.productItem}>
                    <div>
                      <strong>{p.name}</strong><br />
                      💰 S/ {p.price.toFixed(2)} x kg<br />
                      📦 Stock: {p.stock} kg
                    </div>
                    <div className={styles.actions}>
                      <button onClick={() => handleEditar(p)} className={styles.edit}>✏️</button>
                      <button onClick={() => handleEliminar(p.id)} className={styles.delete}>🗑️</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'agregar':
        return (
          <div className={styles.sectionCentered}>
            <div className={styles.card}>
              <h2>➕ Agregar Producto</h2>
              <form onSubmit={handleAgregar} className={styles.formStyled}>
                <div className={styles.inputGroup}>
                  <span>🌾</span>
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nuevoProducto.name}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>💰</span>
                  <input
                    type="number"
                    placeholder="Precio por kilo (S/.)"
                    value={nuevoProducto.price}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>📦</span>
                  <input
                    type="number"
                    placeholder="Stock disponible (kg)"
                    value={nuevoProducto.stock}
                    onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                    required
                  />
                </div>
                <button className={styles.btnAgregar} type="submit">Agregar Producto</button>
              </form>
            </div>
          </div>
        );
      case 'pedidos':
        return (
          <div className={styles.section}>
            <h2>📬 Pedidos Recibidos</h2>
            <div className={styles.pedidosTable}>
              <div className={styles.pedidoHeader}>
                <span>👤 Cliente</span>
                <span>🛒 Producto</span>
                <span>📦 Cantidad</span>
                <span>📅 Fecha</span>
              </div>
              <div className={styles.pedidoRow}>
                <span>Restaurante Verde</span>
                <span>Papa Nativa</span>
                <span>50 kg</span>
                <span>2025-06-16</span>
              </div>
              <div className={styles.pedidoRow}>
                <span>Colegio Sostenible</span>
                <span>Camote Amarillo</span>
                <span>30 kg</span>
                <span>2025-06-15</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <div className={styles.user}>👨‍🌾 {username}</div>
        <nav className={styles.nav}>
          <button onClick={() => setView('misProductos')} className={view === 'misProductos' ? styles.active : ''}>📦 Mis Productos</button>
          <button onClick={() => setView('agregar')} className={view === 'agregar' ? styles.active : ''}>➕ Agregar Producto</button>
          <button onClick={() => setView('pedidos')} className={view === 'pedidos' ? styles.active : ''}>📬 Pedidos</button>
        </nav>
        <button onClick={onLogout} className={styles.logout}>🔓 Cerrar sesión</button>
      </aside>
      <main className={styles.mainContent}>
        {renderContenido()}
        {editandoProducto && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>✏️ Editar Producto</h3>
              <form onSubmit={handleActualizar} className={styles.formStyled}>
                <div className={styles.inputGroup}>
                  <span>🌾</span>
                  <input
                    type="text"
                    value={editandoProducto.name}
                    onChange={(e) => setEditandoProducto({ ...editandoProducto, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>💰</span>
                  <input
                    type="number"
                    value={editandoProducto.price}
                    onChange={(e) => setEditandoProducto({ ...editandoProducto, price: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <span>📦</span>
                  <input
                    type="number"
                    value={editandoProducto.stock}
                    onChange={(e) => setEditandoProducto({ ...editandoProducto, stock: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.btnAgregar} type="submit">Actualizar</button>
                  <button type="button" onClick={cerrarModal}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {notificacion && (
          <div className={`${styles.toastTop} ${styles[notificacion.tipo]}`}>
            {notificacion.mensaje}
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerDashboard;
