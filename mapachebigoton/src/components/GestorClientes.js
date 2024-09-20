import React, { useState } from 'react';
import './GestorClientes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Importamos SweetAlert

const GestorClientes = () => {
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [servicio, setServicio] = useState({ descripcion: '', costo: '' });
  const [cita, setCita] = useState({ fecha: '', hora: '' });

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleChangeServicio = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleChangeCita = (e) => {
    setCita({ ...cita, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Confirmar acción de guardar
    Swal.fire({
      title: '¿Seguro que deseas guardar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Convertir costo a número y manejar posibles errores
        const costo = parseFloat(servicio.costo);
        if (isNaN(costo)) {
          toast.error('Por favor ingrese un valor válido para el costo.');
          return;
        }

        // Guardar los datos en localStorage
        const citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.push({ cliente, servicio: { ...servicio, costo }, cita });
        localStorage.setItem('citas', JSON.stringify(citas));

        // Mostrar mensaje de confirmación
        toast.success('Los datos se guardaron correctamente.');

        // Limpiar el formulario después de guardar
        setCliente({ nombre: '', telefono: '' });
        setServicio({ descripcion: '', costo: '' });
        setCita({ fecha: '', hora: '' });
      }
    });
  };

  return (
    <div className="gestor-clientes-container">
      <header4>
        <h1>Gestión de Citas</h1>
      </header4>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Cliente</legend>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChangeCliente}
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              type="tel"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChangeCliente}
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Servicio</legend>
          <label>
            Descripción:
            <input
              type="text"
              name="descripcion"
              value={servicio.descripcion}
              onChange={handleChangeServicio}
              required
            />
          </label>
          <label>
            Costo:
            <input
              type="number"
              name="costo"
              value={servicio.costo}
              onChange={handleChangeServicio}
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Cita</legend>
          <label>
            Fecha:
            <input
              type="date"
              name="fecha"
              value={cita.fecha}
              onChange={handleChangeCita}
              required
            />
          </label>
          <label>
            Hora:
            <input
              type="time"
              name="hora"
              value={cita.hora}
              onChange={handleChangeCita}
              required
            />
          </label>
        </fieldset>

        <button type="submit">Guardar Datos</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default GestorClientes;
