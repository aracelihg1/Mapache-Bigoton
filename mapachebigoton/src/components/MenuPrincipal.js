import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import './MenuPrincipal.css';

const MenuPrincipal = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout(); 
        navigate('/inicio-sesion'); 
      }
    });
  };

  return (
    <div className="panel-container">
      <header3>
        <h1>Barbería: El Mapache Bigotón</h1>
        <button className="logout-button" onClick={handleLogoutClick}>Cerrar sesión</button>
      </header3>
      <div className="panel-buttons">
        <button onClick={() => navigate('/gestor-clientes')}>Gestor de Clientes</button>
        <button onClick={() => navigate('/consulta-citas')}>Consultar Citas</button>
      </div>

      <footer>
        <p>&copy; 2024 Barbería Mapache Bigotón. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MenuPrincipal;
