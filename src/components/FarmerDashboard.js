// src/components/FarmerDashboard.jsx
import React from 'react';

const FarmerDashboard = ({ user }) => {
  return (
    <div>
      <h2>Bienvenido, {user.name}</h2>
      <p>Este es tu panel como <strong>Productor Agrícola</strong>.</p>
      <p>Aquí podrás gestionar tus productos, publicaciones y ventas (próximamente).</p>
    </div>
  );
};

export default FarmerDashboard;
