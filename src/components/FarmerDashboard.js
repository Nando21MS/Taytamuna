import React, { useState } from 'react';
import styles from './FarmerDashboard.module.css';

const FarmerDashboard = ({ username, onLogout }) => {
  const [view, setView] = useState('misProductos');
  const [productos, setProductos] = useState([
    { id: 1, name: 'Papa Nativa', price: 2.5, stock: 100 },
    { id: 2, name: 'Camote Amarillo', price: 2.0, stock: 80 },
  ]);

  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const handleAgregar = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      name: nuevoProducto.name,
      price: parseFloat(nuevoProducto.price),
      stock: parseInt(nuevoProducto.stock)
    };
    setProductos([...productos, nuevo]);
    setNuevoProducto({ name: '', price: '', stock: '' });
    alert('Producto agregado correctamente');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h2>Panel del Productor - {username} 👩‍🌾</h2>
        <nav>
          <button onClick={() => setView('misProductos')}>Mis Productos</button>
          <button onClick={() => setView('agregar')}>Agregar Producto</button>
          <button onClick={() => setView('pedidos')}>Pedidos Recibidos</button>
          <button onClick={onLogout}>Cerrar sesión</button>
        </nav>
      </header>

      <main className={styles.main}>
        {view === 'misProductos' && (
          <div>
            <h3>Mis Productos</h3>
            <ul>
              {productos.map((p) => (
                <li key={p.id}>
                  🥬 {p.name} - S/ {p.price.toFixed(2)} x kg - Stock: {p.stock} kg
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === 'agregar' && (
          <div>
            <h3>Agregar nuevo producto</h3>
            <form onSubmit={handleAgregar} className={styles.form}>
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nuevoProducto.name}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Precio por kilo (S/)"
                value={nuevoProducto.price}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Stock disponible (kg)"
                value={nuevoProducto.stock}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                required
              />
              <button type="submit">Agregar</button>
            </form>
          </div>
        )}

        {view === 'pedidos' && (
          <div>
            <h3>Pedidos Recibidos</h3>
            <p>📦 (Simulación) Aquí se mostrarán los pedidos recibidos de los compradores.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerDashboard;
