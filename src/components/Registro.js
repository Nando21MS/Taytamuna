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
  FaCheckCircle,
  FaGoogle,
  FaUserTag,
  FaArrowLeft
} from 'react-icons/fa';

import styles from './Registro.module.css';

const Registro = () => {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const departamentos = [
    'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco',
    'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto',
    'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ruc' && value.length > 11) return;
    if (name === 'celular' && value.length > 9) return;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9_]{4,15}$/.test(formData.usuario || '')) {
      newErrors.usuario = 'El nombre de usuario debe tener entre 4 y 15 caracteres, solo letras, números o guiones bajos.';
    }
    if (!/^[0-9]{11}$/.test(formData.ruc || '')) {
      newErrors.ruc = 'El RUC debe tener exactamente 11 dígitos.';
    }
    if (!/^[\w\s.-]+$/.test(formData.razon || '')) {
      newErrors.razon = 'Razón Social solo puede contener letras, números, puntos o guiones.';
    }
    if (!/^[0-9]{9}$/.test(formData.celular || '')) {
      newErrors.celular = 'El celular debe contener exactamente 9 dígitos.';
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(formData.password || '')) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres e incluir letras y números.';
    }
    if (formData.password !== formData.confirm) {
      newErrors.confirm = 'Las contraseñas no coinciden.';
    }
    if (tipoUsuario === 'productor' && !formData.categoria) {
      newErrors.categoria = 'Seleccione una categoría válida.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Datos enviados:', formData);
      setSuccess(true);
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  const handleLoginRedirect = () => {
    window.location.href = '/auth';
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <button className={styles.backBtn} onClick={handleBack}>
          <FaArrowLeft style={{ marginRight: '0.5rem' }} />
          Volver al inicio
        </button>

        <h2 className={styles.title}>Registro de Usuario</h2>

        {success && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3 className={styles.modalTitle}>✅ ¡Registro Exitoso!</h3>
              <p className={styles.modalText}>Hola {formData.razon}, tu cuenta fue creada con éxito. Inicia sesión para comenzar.</p>
              <button className={styles.modalBtn} onClick={handleLoginRedirect}>
                <FaCheckCircle /> Iniciar sesión
              </button>
            </div>
          </div>
        )}

        {!success && (
          <>
            <div className={styles.inputGroup}>
              <FaUserTag className={styles.icon} />
              <select
                name="tipoUsuario"
                onChange={(e) => setTipoUsuario(e.target.value)}
                value={tipoUsuario}
                className={styles.selectField}
                required
              >
                <option value="">Seleccione tipo de usuario</option>
                <option value="consumidor">Consumidor</option>
                <option value="productor">Productor</option>
              </select>
            </div>

            {tipoUsuario && (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <FaUser className={styles.icon} />
                  <input
                    type="text"
                    name="usuario"
                    placeholder="Nombre de Usuario"
                    onChange={handleInputChange}
                    value={formData.usuario || ''}
                    className={styles.inputField}
                    required
                  />
                  {errors.usuario && <span className={styles.error}>{errors.usuario}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <FaIndustry className={styles.icon} />
                  <input
                    type="text"
                    name="ruc"
                    placeholder="RUC"
                    onChange={handleInputChange}
                    value={formData.ruc || ''}
                    className={styles.inputField}
                    required
                  />
                  {errors.ruc && <span className={styles.error}>{errors.ruc}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <FaUser className={styles.icon} />
                  <input
                    type="text"
                    name="razon"
                    placeholder="Razón Social"
                    onChange={handleInputChange}
                    value={formData.razon || ''}
                    className={styles.inputField}
                    required
                  />
                  {errors.razon && <span className={styles.error}>{errors.razon}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <select
                    name="departamento"
                    onChange={handleInputChange}
                    value={formData.departamento || ''}
                    className={styles.selectField}
                    required
                  >
                    <option value="">Seleccione Departamento</option>
                    {departamentos.map((dep) => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <FaPhone className={styles.icon} />
                  <input
                    type="tel"
                    name="celular"
                    placeholder="Celular"
                    onChange={handleInputChange}
                    value={formData.celular || ''}
                    className={styles.inputField}
                    required
                  />
                  {errors.celular && <span className={styles.error}>{errors.celular}</span>}
                </div>

                {tipoUsuario === 'productor' && (
                  <div className={styles.inputGroup}>
                    <FaSeedling className={styles.icon} />
                    <select
                      name="categoria"
                      onChange={handleInputChange}
                      value={formData.categoria || ''}
                      className={styles.selectField}
                      required
                    >
                      <option value="">Seleccione su categoría</option>
                      <option value="frutas">Frutas</option>
                      <option value="tuberculos">Tubérculos</option>
                      <option value="granos">Granos</option>
                    </select>
                    {errors.categoria && <span className={styles.error}>{errors.categoria}</span>}
                  </div>
                )}

                <div className={styles.inputGroup}>
                  <FaEnvelope className={styles.icon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    onChange={handleInputChange}
                    value={formData.email || ''}
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
                    value={formData.password || ''}
                    className={styles.inputField}
                    required
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <FaLock className={styles.icon} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm"
                    placeholder="Confirmar contraseña"
                    onChange={handleInputChange}
                    value={formData.confirm || ''}
                    className={styles.inputField}
                    required
                  />
                  <span
                    className={styles.eyeIcon}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.confirm && <span className={styles.error}>{errors.confirm}</span>}
                </div>

                <div className={styles.centerBtn}>
                  <button
                    type="button"
                    onClick={() => alert('Funcionalidad de Google aún no implementada')}
                    className={styles.googleBtn}
                  >
                    <FaGoogle /> Registrarse con Google
                  </button>

                  <button type="submit" className={styles.button}>
                    <FaCheckCircle /> Registrarse
                  </button>
                </div>

                <p className={styles.registerLink}>
                  ¿Ya tienes cuenta?{' '}
                  <span onClick={handleLoginRedirect}>Inicia sesión</span>
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Registro;
