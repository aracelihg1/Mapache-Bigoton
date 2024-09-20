import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const CrearCita = () => {
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [servicio, setServicio] = useState({ descripcion: '', costo: '' });
  const [cita, setCita] = useState({ fecha: '', hora: '' });
  const navigate = useNavigate(); // Inicializar useNavigate

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
    const citaData = { cliente, servicio, cita };
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.push(citaData);
    localStorage.setItem('citas', JSON.stringify(citas));
    alert('Cita creada con éxito!');
    navigate('/ver-citas'); // Redirigir a la página de "Ver Citas"
  };

  return (
    <div className="crear-cita-container">
      <h1>Crear Cita</h1>
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

        <button type="submit">Guardar Cita</button>
      </form>
    </div>
  );
};

export default CrearCita;
