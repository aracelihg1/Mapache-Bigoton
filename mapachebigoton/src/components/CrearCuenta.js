import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CrearCuenta.css';

const CrearCuenta = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar los datos previos al cargar el componente
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de las contraseñas
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.'
      });
      return;
    }

    // Comprueba si ya existe una cuenta
    if (localStorage.getItem('userEmail')) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe una cuenta con este correo electrónico.'
      });
      return;
    }

    // Guarda los datos en localStorage
    localStorage.setItem('userEmail', email.trim());
    localStorage.setItem('userPassword', password.trim());

    // Mostrar SweetAlert de cuenta creada
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada',
      text: 'Tu cuenta ha sido creada exitosamente.'
    });

    // Llama a onSignup si es necesario
    if (onSignup) {
      onSignup(email, password);
    }

    // Redirige al usuario a la página de inicio de sesión
    navigate('/');
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Crear cuenta</h1>
      </header>
      <main className="main-content">
        <div className="form-container">
          <h2>Crear Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Correo Electrónico:
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Contraseña:
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirmar Contraseña:
              <input
                type="password"
                placeholder="Confirma tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Crear Cuenta</button>
            <p>¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a></p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CrearCuenta;
