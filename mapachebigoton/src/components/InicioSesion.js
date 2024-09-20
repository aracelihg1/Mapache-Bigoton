import React, { useState } from 'react';
import './InicioSesion.css';

const InicioSesion = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Recuperar email del localStorage
    const storedEmail = localStorage.getItem('userEmail');

    // Verificar si las credenciales son correctas
    if (email === storedEmail && localStorage.getItem('userPassword') === password) {
      onLogin(email, password);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Barbería: Mapache Bigotón</h1>
      </header>
      <main className="main-content">
        <div className="form-container">
          <h2>Inicio de Sesión</h2>
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
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Iniciar Sesión</button>
            <p>¿No tienes cuenta? <a href="/signup">Crea una aquí</a></p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InicioSesion;
