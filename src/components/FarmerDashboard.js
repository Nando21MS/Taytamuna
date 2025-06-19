// CONTINUACIÓN COMPLETA DEL CÓDIGO FarmerDashboard.jsx

import React, { useState, useEffect } from 'react';
import styles from './FarmerDashboard.module.css';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductImage } from '../utils/getProductImage';

const FarmerDashboard = ({ username, onLogout }) => {
  const [view, setView] = useState('misProductos');

  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: 'Restaurante Verde', producto: 'Papa Nativa', cantidad: 50, fecha: '2025‑06‑16', estado: 'Pendiente' },
    { id: 2, cliente: 'Colegio Sostenible', producto: 'Camote Amarillo', cantidad: 30, fecha: '2025‑06‑15', estado: 'En camino' }
  ]);

  const [filtro, setFiltro] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState({ name: '', price: '', stock: '', image: '', file: null });
  const [editandoProducto, setEditandoProducto] = useState(null);

  useEffect(() => {
    if (view === 'agregar') setNuevoProducto({ name: '', price: '', stock: '', image: '', file: null });
  }, [view]);

  const handleFileToDataURL = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    const crearProducto = (imgSrc) => {
      const prod = {
        id: Date.now(),
        name: nuevoProducto.name,
        price: parseFloat(nuevoProducto.price),
        stock: parseInt(nuevoProducto.stock, 10),
        image: imgSrc || getProductImage(nuevoProducto.name)
      };
      setProductos([...productos, prod]);
      toast.success('✅ Producto agregado', { position: 'top-right', autoClose: 2500 });
      setView('misProductos');
    };

    if (nuevoProducto.file) {
      handleFileToDataURL(nuevoProducto.file, crearProducto);
    } else {
      crearProducto(nuevoProducto.image.trim() || null);
    }
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(productos.filter(p => p.id !== id));
        toast.success('🗑️ Producto eliminado', { position: 'top-right', autoClose: 2500 });
      }
    });
  };

  const handleActualizar = (e) => {
    e.preventDefault();
    const actualizarProducto = (imgSrc) => {
      setProductos(productos.map(p =>
        p.id === editandoProducto.id
          ? { ...editandoProducto, price: parseFloat(editandoProducto.price), stock: parseInt(editandoProducto.stock, 10), image: imgSrc }
          : p
      ));
      setEditandoProducto(null);
      toast.success('✏️ Producto actualizado', { position: 'top-right', autoClose: 2500 });
    };

    if (editandoProducto.file) {
      handleFileToDataURL(editandoProducto.file, actualizarProducto);
    } else {
      actualizarProducto(editandoProducto.image || getProductImage(editandoProducto.name));
    }
  };

  const avanzarEstadoPedido = (id) => {
    setPedidos(pedidos.map(p => {
      if (p.id !== id) return p;
      const next = p.estado === 'Pendiente' ? 'En camino' : 'Entregado';
      toast.info(`📦 Pedido ahora "${next}"`, { position: 'top-right', autoClose: 2500 });
      return { ...p, estado: next };
    }));
  };

  const renderContenido = () => {
    switch (view) {
      case 'misProductos':
        const filtrados = productos.filter(p => p.name.toLowerCase().includes(filtro.toLowerCase()));
        const stockTotal = productos.reduce((s, p) => s + p.stock, 0);
        return (
          <div className={styles.section}>
            <h2>📦 Mis Productos</h2>
            <input className={styles.inputBuscar} placeholder="🔍 Buscar producto" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
            <p>Total productos: {filtrados.length} | Stock total: {stockTotal} kg</p>
            {filtrados.length === 0 ? <p>No se encontraron productos.</p> : (
              <ul className={styles.productList}>
                {filtrados.map(p => (
                  <li key={p.id} className={styles.productItem}>
                    <img src={p.image} alt={p.name} className={styles.imagePreview} />
                    <div>
                      <strong>{p.name}</strong><br />💰 S/ {p.price.toFixed(2)} / kg<br />📦 {p.stock} kg
                    </div>
                    <div className={styles.actions}>
                      <button className={styles.edit} onClick={() => setEditandoProducto(p)}>✏️</button>
                      <button className={styles.delete} onClick={() => handleEliminar(p.id)}>🗑️</button>
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
                <div className={styles.inputGroup}><span>🌾</span>
                  <input value={nuevoProducto.name} onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })} placeholder="Nombre" required />
                </div>
                <div className={styles.inputGroup}><span>💰</span>
                  <input type="number" step="0.01" value={nuevoProducto.price} onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })} placeholder="Precio por kg" required />
                </div>
                <div className={styles.inputGroup}><span>📦</span>
                  <input type="number" value={nuevoProducto.stock} onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} placeholder="Stock (kg)" required />
                </div>
                <div className={styles.inputGroup}><span>🖼️</span>
                  <input type="text" value={nuevoProducto.image} onChange={(e) => setNuevoProducto({ ...nuevoProducto, image: e.target.value, file: null })} placeholder="URL de imagen (opcional)" />
                </div>
                <label className={styles.customFileUpload}>
                  📁 Seleccionar imagen
                  <input type="file" accept="image/*" onChange={(e) => setNuevoProducto({ ...nuevoProducto, file: e.target.files[0], image: '' })} />
                </label>
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
                <span>👤 Cliente</span><span>🛒 Producto</span><span>📦 Cantidad</span><span>📅 Fecha</span><span>📍 Estado</span>
              </div>
              {pedidos.map(p => (
                <div key={p.id} className={styles.pedidoRow}>
                  <span>{p.cliente}</span>
                  <span>{p.producto}</span>
                  <span>{p.cantidad} kg</span>
                  <span>{p.fecha}</span>
                  <span>
                    <span className={`${styles.estado} ${p.estado === 'Pendiente' ? styles.estadoPendiente : p.estado === 'En camino' ? styles.estadoEnCamino : styles.estadoEntregado}`}>
                      {p.estado}
                    </span>
                    {p.estado !== 'Entregado' && (
                      <button className={styles.btnEstado} onClick={() => avanzarEstadoPedido(p.id)}>Avanzar</button>
                    )}
                  </span>
                </div>
              ))}
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
        <div className={styles.logo}>TAYTAMUNA</div>
        <div className={styles.user}>👨‍🌾 {username}</div>
        <nav className={styles.nav}>
          <button onClick={() => setView('misProductos')} className={view === 'misProductos' ? styles.active : ''}>📦 Mis Productos</button>
          <button onClick={() => setView('agregar')} className={view === 'agregar' ? styles.active : ''}>➕ Agregar</button>
          <button onClick={() => setView('pedidos')} className={view === 'pedidos' ? styles.active : ''}>📬 Pedidos</button>
        </nav>
        <button className={styles.logout} onClick={onLogout}>🔓 Cerrar sesión</button>
      </aside>
      <main className={styles.mainContent}>
        {renderContenido()}
        {editandoProducto && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>✏️ Editar Producto</h3>
              <form onSubmit={handleActualizar} className={styles.formStyled}>
                <div className={styles.inputGroup}><span>🌾</span>
                  <input value={editandoProducto.name} onChange={(e) => setEditandoProducto({ ...editandoProducto, name: e.target.value })} required />
                </div>
                <div className={styles.inputGroup}><span>💰</span>
                  <input type="number" step="0.01" value={editandoProducto.price} onChange={(e) => setEditandoProducto({ ...editandoProducto, price: e.target.value })} required />
                </div>
                <div className={styles.inputGroup}><span>📦</span>
                  <input type="number" value={editandoProducto.stock} onChange={(e) => setEditandoProducto({ ...editandoProducto, stock: e.target.value })} required />
                </div>
                <div className={styles.inputGroup}><span>🖼️</span>
                  <input type="text" value={editandoProducto.image || ''} onChange={(e) => setEditandoProducto({ ...editandoProducto, image: e.target.value, file: null })} placeholder="URL (opcional)" />
                </div>
                <label className={styles.customFileUpload}>
                  📁 Seleccionar nueva imagen
                  <input type="file" accept="image/*" onChange={(e) => setEditandoProducto({ ...editandoProducto, file: e.target.files[0], image: '' })} />
                </label>
                <div className={styles.modalActions}>
                  <button className={styles.btnAgregar} type="submit">Actualizar</button>
                  <button type="button" onClick={() => setEditandoProducto(null)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
      </main>
    </div>
  );
};

export default FarmerDashboard;