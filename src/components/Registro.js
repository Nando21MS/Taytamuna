import React, { useState } from 'react';
import {
  FaUser,
  FaIndustry,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSeedling,
  FaUserPlus,
  FaLeaf,
  FaArrowRight,
  FaCheckCircle,
  FaGoogle
} from 'react-icons/fa';

import styles from './Registro.module.css';

const Registro = () => {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTipoChange = (tipo) => {
    setTipoUsuario(tipo);
    setStep(1);
    setFormData({});
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Registro de Usuario</h2>

        {!tipoUsuario && (
          <div className={styles.buttonGroup}>
            <button onClick={() => handleTipoChange('consumidor')} className={styles.button}>
              <FaUserPlus />
              Consumidor
            </button>
            <button onClick={() => handleTipoChange('productor')} className={styles.button}>
              <FaLeaf />
              Productor
            </button>
          </div>
        )}

        {tipoUsuario && (
          <form onSubmit={handleSubmit} className={styles.form}>
            {step === 1 && (
              <>
                <div className={styles.inputGroup}>
                  <FaIndustry className={styles.icon} />
                  <input
                    type="text"
                    name="ruc"
                    placeholder="RUC"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaUser className={styles.icon} />
                  <input
                    type="text"
                    name="razon"
                    placeholder="Razón Social"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <input
                    type="text"
                    name="departamento"
                    placeholder="Departamento"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaPhone className={styles.icon} />
                  <input
                    type="tel"
                    name="celular"
                    placeholder="Celular"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                </div>

                {tipoUsuario === 'productor' && (
                  <div className={styles.inputGroup}>
                    <FaSeedling className={styles.icon} />
                    <select
                      name="categoria"
                      onChange={handleInputChange}
                      className={styles.selectField}
                      required
                    >
                      <option value="">Seleccione su categoría</option>
                      <option value="frutas">Frutas</option>
                      <option value="tuberculos">Tubérculos</option>
                      <option value="granos">Granos</option>
                    </select>
                  </div>
                )}

                <button type="button" onClick={handleNext} className={styles.button}>
                  <FaArrowRight />
                  Siguiente
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className={styles.inputGroup}>
                  <FaEnvelope className={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <FaLock className={styles.icon} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className={styles.inputGroup}>
                  <FaLock className={styles.icon} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Confirmar contraseña"
                    onChange={handleInputChange}
                    className={styles.inputField}
                    required
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className={styles.googleBtnContainer}>
                  <button
                    type="button"
                    onClick={() => alert('Funcionalidad de Google aún no implementada')}
                    className={styles.googleBtn}
                  >
                    <FaGoogle />
                    <span>Registrarse con Google</span>
                  </button>
                </div>

                <button type="submit" className={styles.button}>
                  <FaCheckCircle />
                  Registrarse
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Registro;
