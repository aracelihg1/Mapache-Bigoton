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

  useEffect(() => {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const citaSeleccionada = citas[index];
    if (citaSeleccionada) {
      setCliente(citaSeleccionada.cliente);
      setServicio(citaSeleccionada.servicio);
      setFecha(citaSeleccionada.cita.fecha);
      setHora(citaSeleccionada.cita.hora);
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
        };

        const citas = JSON.parse(localStorage.getItem('citas')) || [];
        citas[index] = citaActualizada;
        localStorage.setItem('citas', JSON.stringify(citas));

        toast.success('Actualizado correctamente');
        setCliente({ nombre: '', telefono: '' });
        setServicio({ descripcion: '', costo: '' });
        setFecha('');
        setHora('');
      }
    });
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Editar Cita</h1>
      </header>
      <main className="main-content">
        <div className="form-container">
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
                  value={fecha}
                  onChange={handleChangeCita}
                  required
                />
              </label>
              <label>
                Hora:
                <input
                  type="time"
                  name="hora"
                  value={hora}
                  onChange={handleChangeCita}
                  required
                />
              </label>
            </fieldset>

            <button type="submit">Guardar Cambios</button>
          </form>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default EditarCita;
