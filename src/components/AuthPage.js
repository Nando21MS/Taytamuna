// src/components/AuthPage.jsx
import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const AuthPage = ({ onLogin }) => {
  const [role, setRole] = useState('buyer');
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = { ...form, role };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  const handleSocialLogin = (provider) => {
    const user = {
      name: provider === 'google' ? 'Usuario Google' : 'Usuario Facebook',
      email: provider === 'google' ? 'google@example.com' : 'facebook@example.com',
      role,
    };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <h2>{isRegister ? 'Regístrate' : 'Inicia sesión'}</h2>
        <div className={styles.roleSelector}>
          <label>
            <input
              type="radio"
              value="buyer"
              checked={role === 'buyer'}
              onChange={() => setRole('buyer')}
            /> Comprador
          </label>
          <label>
            <input
              type="radio"
              value="producer"
              checked={role === 'producer'}
              onChange={() => setRole('producer')}
            /> Productor
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            {isRegister ? 'Registrarse' : 'Iniciar sesión'}
          </button>
        </form>

        <div className={styles.socialButtons}>
          <button onClick={() => handleSocialLogin('google')} className={`${styles.socialBtn} ${styles.google}`}>
            <FontAwesomeIcon icon={faGoogle} /> Continuar con Google
          </button>
        </div>

        <p>
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button className={styles.toggle} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
