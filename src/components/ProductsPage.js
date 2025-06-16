import React, { useState } from 'react';
import styles from './ProductsPage.module.css';
import { getProductImage } from '../utils/getProductImage';

const allProducts = [
  { id: 1, name: 'Papa andina', category: 'tubérculos', price: 3.50, provider: 'Cooperativa Andina' },
  { id: 2, name: 'Maíz morado', category: 'granos', price: 2.20, provider: 'Red Agro Rural' },
  { id: 3, name: 'Camote', category: 'tubérculos', price: 2.80, provider: 'Cooperativa Andina' },
  { id: 4, name: 'Fresa orgánica', category: 'frutas', price: 2.50, provider: 'EcoCampo Perú' },
  { id: 5, name: 'Mango kent', category: 'frutas', price: 3.20, provider: 'EcoCampo Perú' },
  { id: 6, name: 'Lentejas verdes', category: 'granos', price: 1.90, provider: 'Red Agro Rural' },
  // Agrega más si lo deseas
];

const ProductsPage = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 4;

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const openProductModal = (product) => setSelectedProduct(product);
  const closeProductModal = () => setSelectedProduct(null);

  return (
    <div className={styles.productsContainer}>
      <h2 className={styles.title}>🧺 Productos disponibles</h2>

      {/* Buscador y filtros */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          <option value="todos">Todas las categorías</option>
          <option value="frutas">Frutas</option>
          <option value="tubérculos">Tubérculos</option>
          <option value="granos">Granos</option>
        </select>
      </div>

      {/* Grid de productos */}
      <div className={styles.productGrid}>
        {currentProducts.length === 0 ? (
          <p className={styles.noResults}>No se encontraron productos.</p>
        ) : (
          currentProducts.map(product => (
            <div key={product.id} className={styles.card} onClick={() => openProductModal(product)}>
              <img src={getProductImage(product.name)} alt={product.name} className={styles.image} />
              <h3>{product.name}</h3>
              <p className={styles.price}>S/. {product.price.toFixed(2)}</p>
              <p className={styles.provider}>Proveedor: {product.provider}</p>
              <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} className={styles.addButton}>
                🛒 Agregar al carrito
              </button>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.active : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal de detalle */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={closeProductModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={getProductImage(selectedProduct.name)} alt={selectedProduct.name} />
            <h3>{selectedProduct.name}</h3>
            <p><strong>Categoría:</strong> {selectedProduct.category}</p>
            <p><strong>Precio:</strong> S/. {selectedProduct.price.toFixed(2)}</p>
            <p><strong>Proveedor:</strong> {selectedProduct.provider}</p>
            <button onClick={() => { onAddToCart(selectedProduct); closeProductModal(); }} className={styles.addButton}>
              🛒 Agregar al carrito
            </button>
            <button onClick={closeProductModal} className={styles.closeBtn}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;