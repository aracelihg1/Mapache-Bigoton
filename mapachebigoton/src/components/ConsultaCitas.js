import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsultaCitas.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ConsultaCitas = () => {
  const [citas, setCitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCitas = JSON.parse(localStorage.getItem('citas')) || [];
    setCitas(storedCitas);
  }, []);

  // Función para eliminar una cita
  const handleEliminar = (index) => {
    Swal.fire({
      title: '¿Seguro que deseas eliminar?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCitas = citas.filter((_, i) => i !== index);
        setCitas(updatedCitas);
        localStorage.setItem('citas', JSON.stringify(updatedCitas));
        toast.success('Eliminado exitosamente');
      }
    });
  };

  // Función para actualizar una cita
  const handleActualizar = (index) => {
    navigate(`/editar-cita/${index}`);
  };

  return (
    <div className="consulta-citas-container">
      <header5>
        <h1>Consulta de Citas</h1>
      </header5>
      <div className="citas-table">
        <h2>Datos de las Citas</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Descripción del Servicio</th>
              <th>Costo</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita, index) => (
              <tr key={index}>
                <td>{cita.cliente.nombre}</td>
                <td>{cita.cliente.telefono}</td>
                <td>{cita.servicio.descripcion}</td>
                <td>{cita.servicio.costo}</td>
                <td>{cita.cita.fecha}</td>
                <td>{cita.cita.hora}</td>
                <td>
                  <button onClick={() => handleActualizar(index)}>Actualizar</button>
                  <button onClick={() => handleEliminar(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer>
        <p>&copy; 2024 Barbería Mapache Bigotón. Todos los derechos reservados.</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default ConsultaCitas;