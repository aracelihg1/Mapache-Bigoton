import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EditarCita.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const EditarCita = () => {
  const { index } = useParams();
  const [cliente, setCliente] = useState({ nombre: '', telefono: '' });
  const [servicio, setServicio] = useState({ descripcion: '', costo: '' });
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personal, setPersonal] = useState('');

  useEffect(() => {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const citaSeleccionada = citas[index];
    if (citaSeleccionada) {
      setCliente(citaSeleccionada.cliente);
      setServicio(citaSeleccionada.servicio);
      setFecha(citaSeleccionada.cita.fecha);
      setHora(citaSeleccionada.cita.hora);
      setPersonal(citaSeleccionada.personal);
    }
  }, [index]);

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleChangeServicio = (e) => {
    const { name, value } = e.target;
    setServicio({
      ...servicio,
      [name]: value,
    });
  };

  const handleChangeCita = (e) => {
    const { name, value } = e.target;
    if (name === 'fecha') {
      setFecha(value);
    } else if (name === 'hora') {
      setHora(value);
    }
  };

  const handleChangePersonal = (e) => {
    setPersonal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: '¿Seguro que deseas actualizar los datos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const citaActualizada = {
          cliente,
          servicio: { ...servicio, costo: parseFloat(servicio.costo) },
          cita: { fecha, hora },
          personal,
        };

        const citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas[index] = citaActualizada;
        localStorage.setItem('citas', JSON.stringify(citas));

        toast.success('Actualizado correctamente');
        setCliente({ nombre: '', telefono: '' });
        setServicio({ descripcion: '', costo: '' });
        setFecha('');
        setHora('');
        setPersonal('');
      }
    });
  };

  return (
    <div className="editar-cita-container">
      <header className="editar-cita-header">
        <h1>Editar Cita</h1>
      </header>
      <main className="editar-cita-main">
        <div className="editar-cita-form-container">
          <form className="editar-cita-form" onSubmit={handleSubmit}>
            {/* Sección de Personal */}
            <fieldset className="editar-cita-fieldset">
              <legend className="editar-cita-legend">Personal</legend>
              <label className="editar-cita-label">
                Personal que atenderá:
                <select 
                  className="editar-cita-select" 
                  value={personal} 
                  onChange={handleChangePersonal} 
                  required
                >
                  <option value="">Seleccione un personal</option>
                  <option value="Amado Francisco Méndez">Amado Francisco Méndez</option>
                  <option value="Araceli Hernández García">Araceli Hernández García</option>
                  <option value="Yahir Hernández Jiménez">Yahir Hernández Jiménez</option>
                </select>
              </label>
            </fieldset>

            <fieldset className="editar-cita-fieldset">
              <legend className="editar-cita-legend">Cliente</legend>
              <label className="editar-cita-label">
                Nombre:
                <input
                  className="editar-cita-input"
                  type="text"
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleChangeCliente}
                  required
                />
              </label>
              <label className="editar-cita-label">
                Teléfono:
                <input
                  className="editar-cita-input"
                  type="tel"
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleChangeCliente}
                  required
                />
              </label>
            </fieldset>

            <fieldset className="editar-cita-fieldset">
              <legend className="editar-cita-legend">Servicio</legend>
              <label className="editar-cita-label">
                Descripción:
                <input
                  className="editar-cita-input"
                  type="text"
                  name="descripcion"
                  value={servicio.descripcion}
                  onChange={handleChangeServicio}
                  required
                />
              </label>
              <label className="editar-cita-label">
                Costo:
                <input
                  className="editar-cita-input"
                  type="number"
                  name="costo"
                  value={servicio.costo}
                  onChange={handleChangeServicio}
                  required
                />
              </label>
            </fieldset>

            <fieldset className="editar-cita-fieldset">
              <legend className="editar-cita-legend">Cita</legend>
              <label className="editar-cita-label">
                Fecha:
                <input
                  className="editar-cita-input"
                  type="date"
                  name="fecha"
                  value={fecha}
                  onChange={handleChangeCita}
                  required
                />
              </label>
              <label className="editar-cita-label">
                Hora:
                <input
                  className="editar-cita-input"
                  type="time"
                  name="hora"
                  value={hora}
                  onChange={handleChangeCita}
                  required
                />
              </label>
            </fieldset>

            <button className="editar-cita-button" type="submit">Guardar Cambios</button>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default EditarCita;
