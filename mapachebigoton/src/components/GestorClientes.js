import React, { useState } from 'react';
import './GestorClientes.css';
import { ToastContainer, toast } from 'react-toastify'; // Importa ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Importa estilos de Toast
import Swal from 'sweetalert2'; // Importa SweetAlert2


const GestorClientes = () => {
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [servicio, setServicio] = useState({ descripcion: '', costo: '' });
  const [cita, setCita] = useState({ fecha: '', hora: '' });
  const [personal, setPersonal] = useState('');

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleChangeServicio = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const handleChangeCita = (e) => {
    setCita({ ...cita, [e.target.name]: e.target.value });
  };

  const handleChangePersonal = (e) => {
    setPersonal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const costo = parseFloat(servicio.costo);
    if (isNaN(costo) || costo <= 0) {
      toast.error('Por favor ingrese un valor válido para el costo.'); // Mensaje de error
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Deseas guardar los datos de la cita.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas.push({ cliente, servicio: { ...servicio, costo }, cita, personal });
        localStorage.setItem('citas', JSON.stringify(citas));

        // Limpiar el formulario después de guardar los datos
        setCliente({ nombre: '', telefono: '' });
        setServicio({ descripcion: '', costo: '' });
        setCita({ fecha: '', hora: '' });
        setPersonal('');

        toast.success('Datos guardados exitosamente'); // Mensaje de éxito
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
          <legend>Personal</legend>
          <label>
            Personal que atenderá:
            <div className="custom-select">
              <select value={personal} onChange={handleChangePersonal} required>
                <option value="">Seleccione un personal</option>
                <option value="Amado Francisco Méndez">Amado Francisco Méndez</option>
                <option value="Araceli Hernández García">Araceli Hernández García</option>
                <option value="Yahir Hernández Jiménez">Yahir Hernández Jiménez</option>
              </select>
            </div>
          </label>
        </fieldset>

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
              min="0"
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
      <ToastContainer /> {/* Asegúrate de que esté aquí */}
    </div>
  );
};

export default GestorClientes;
