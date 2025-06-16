import React, { useState } from 'react';
import styles from './AuthPage.module.css';

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username.trim(), password.trim());
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2>AgroConecta 🌿</h2>
        <p>Inicia sesión como <strong>Productor</strong> o <strong>Comprador mayorista</strong></p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        <div className={styles.tips}>
          <p>👉 <strong>Productor:</strong> productor1 / 123456</p>
          <p>👉 <strong>Comprador:</strong> comprador1 / 789123</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
