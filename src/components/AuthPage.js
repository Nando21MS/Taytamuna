import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaArrowLeft } from 'react-icons/fa';
import styles from './AuthPage.module.css';

const AuthPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const credentials = [
      { user: 'productor1', pass: '123456' },
      { user: 'comprador1', pass: '789123' }
    ];

    const match = credentials.find(c => c.user === username && c.pass === password);

    if (!match) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }

    setError('');
    onLogin(username.trim(), password.trim());
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/registro'; // Cambia esta ruta según tu estructura
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <button className={styles.backBtn} onClick={handleBack}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} />
          Volver al inicio
        </button>

        <h2>TAYTAMUNA 🌿</h2>
        <p>Inicia sesión como <strong>Productor</strong> o <strong>Comprador mayorista</strong></p>

        {error && <div className={styles.alert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className={styles.loginBtn}>
            <FaSignInAlt style={{ marginRight: '0.5rem' }} />
            Ingresar
          </button>
        </form>

        <p className={styles.registerLink}>
          ¿No tienes cuenta?{' '}
          <span onClick={handleRegisterRedirect}>Regístrate</span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
