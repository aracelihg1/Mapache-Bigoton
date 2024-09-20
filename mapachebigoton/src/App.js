import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ConsultaCitas from './components/ConsultaCitas';
import CrearCita from './components/CrearCita';
import CrearCuenta from './components/CrearCuenta';
import GestorClientes from './components/GestorClientes';
import InicioSesion from './components/InicioSesion';
import MenuPrincipal from './components/MenuPrincipal';
import EditarCita from './components/EditarCita';

import './styles.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Usuario o contraseña incorrectos.');
    }
  };

  const handleSignup = (email, password) => {
    if (users.find(user => user.email === email)) {
      alert('El usuario ya existe.');
      return;
    }
    setUsers([...users, { email, password }]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="background-image">
        <Routes>
          {/* Rutas para usuarios autenticados */}
          {isAuthenticated ? (
            <>
              <Route path="/menu-principal" element={<MenuPrincipal onLogout={handleLogout} />} />
              <Route path="/gestor-clientes" element={<GestorClientes />} />
              <Route path="/consulta-citas" element={<ConsultaCitas />} />
              <Route path="/crear-cita" element={<CrearCita />} />
              <Route path="/editar-cita/:index" element={<EditarCita />} />
              <Route path="*" element={<Navigate to="/menu-principal" />} />
            </>
          ) : (
            <>
              {/* Rutas para usuarios no autenticados */}
              <Route path="/" element={<InicioSesion onLogin={handleLogin} error={loginError} />} />
              <Route path="/signup" element={<CrearCuenta onSignup={handleSignup} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
