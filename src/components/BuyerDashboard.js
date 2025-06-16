// src/components/BuyerDashboard.jsx
import React from 'react';

const BuyerDashboard = ({ user }) => {
  return (
    <div>
      <h2>Hola, {user.name}</h2>
      <p>Este es tu espacio como <strong>Comprador</strong>.</p>
      <p>Explora productos y realiza compras directamente a los productores rurales.</p>
    </div>
  );
};

export default BuyerDashboard;
