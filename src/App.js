import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import PersonalExternoCooperante from './Components/PersonalExternoCooperante';
import PersonalExternoContratar from './Components/PersonalExternoContratar';

function App() {
  const dataPersonal = [
    {
      id: 1,
      rol: "Dirección",
      tipo: "Docente a tiempo completo",
      senescyt: "SI",
      identificacion: 1102365993,
      nombres: "Luis Granda",
      horasSemanales: "00",
      horasTotales: "00"
    },


    { id: 2, rol: "Co-Dirección", tipo: "Docente a tiempo completo", senescyt: "SI", identificacion: 1499332590, nombres: "Charlie Cárdemas", horasSemanales: "00", horasTotales: "00" },
    { id: 3, rol: "Participación", tipo: "Técnico Docente", senescyt: "SI", identificacion: 1121354698, nombres: "Maximo Décimo", horasSemanales: "00", horasTotales: "00" },
    { id: 4, rol: "Participación", tipo: "Estudiante", senescyt: "NO", identificacion: 1101258746, nombres: "Marie Curie", horasSemanales: "00", horasTotales: "00" },

  ];

  const [data, setData] = useState(dataPersonal);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);



  const [personalSeleccionado, setPersonalSeleccionado] = useState({
    id: '',
    rol: '',
    tipo: '',
    senescyt: '',
    identificacion: '',
    nombres: '',
    horasSemanales: '',
    horasTotales: ''
  });

  const seleccionarPersonal = (elemento, caso) => {
    setPersonalSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setPersonalSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(personalSeleccionado);
  }

  const editar = () => {
    var dataNueva = data;
    dataNueva.map(personal => {
      if (personal.id === personalSeleccionado.id) {
        personal.rol = personalSeleccionado.rol;
        personal.tipo = personalSeleccionado.tipo;
        personal.senescyt = personalSeleccionado.senescyt;
        personal.identificacion = personalSeleccionado.identificacion;
        personal.nombres = personalSeleccionado.nombres;
        personal.horasSemanales = personalSeleccionado.horasSemanales;
        personal.horasTotales = personalSeleccionado.horasTotales;

      }
    })
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(personal => personal.id !== personalSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    setPersonalSeleccionado(null);
    setModalInsertar(true);

  }

  const insertar = () => {
    var valorInsertar = personalSeleccionado;
    valorInsertar.id = data[data.length - 1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }
  return (
    <div className="App">
      <h2>
        Personal Interno
      </h2>
      <br />
      <button
        className='btn btn-success'
        onClick={() => abrirModalInsertar()}
      >
        Insertar
      </button>
      <br />
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Nro.</th>
            <th>ROL</th>
            <th>TIPO</th>
            <th>Investigadores Acreditados <br /> SENESCYT</th>
            <th>Identificación</th>
            <th>Nombres y Apellidos</th>
            <th>Horas Semanales <br />de Participación</th>
            <th>Total Horas <br /> Participación  <br />en el Proyecto</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {data.map(elemento => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.rol}</td>
              <td>{elemento.tipo}</td>
              <td>{elemento.senescyt}</td>
              <td>{elemento.identificacion}</td>
              <td>{elemento.nombres}</td>
              <td>{elemento.horasSemanales}</td>
              <td>{elemento.horasTotales}</td>

              <td>
                <button className='btn btn-primary' onClick={() => seleccionarPersonal(elemento, 'Editar')}>Editar</button>
                <button className='btn btn-danger' onClick={() => seleccionarPersonal(elemento, 'Eliminar')}>Eliminar</button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>
              Editar Personal
            </h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID</label>
            <input
              className='form-control'
              readOnly
              type="text"
              name='id'
              value={personalSeleccionado && personalSeleccionado.id}
            />
            <br />


            <label htmlFor='rol'>
              ROL
            </label>

            <select
              id="rol"
              value={personalSeleccionado ? personalSeleccionado.rol : ''}
              onChange={handleChange}
              name="rol"
              className="form-control"
            >
              <option value="Dirección">Dirección</option>
              <option value="Co-Dirección">Co-Dirección</option>
              <option value="Participación">Participación</option>
            </select>
            < br />

            <label htmlFor='tipo'>
              TIPO
            </label>

            <select
              id="tipo"
              value={personalSeleccionado ? personalSeleccionado.tipo : ''}
              onChange={handleChange}
              name="tipo"
              className="form-control"
            >
              <option value="Docente a tiempo Completo">Docente a tiempo Completo</option>
              <option value="Técnico Docente">Técnico Docente</option>
              <option value="Estudiante">Estudiante</option>
            </select>
            <br />

            <label htmlFor='senescyt'>
              Investigadores Acreditados <br />
              SENESCYT
            </label>

            <select
              id="senescyt"
              value={personalSeleccionado ? personalSeleccionado.senescyt : ''}
              onChange={handleChange}
              name="senescyt"
              className="form-control"
            >
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>

            <br />

            <label>
              Identificación
            </label>

            <input
              className='form-control'
              type="number"
              min={0}
              name="identificacion"
              value={personalSeleccionado && personalSeleccionado.identificacion}
              onChange={handleChange}
            />
            <br />

            <label>
              Nombres y Apellidos
            </label>

            <input
              className='form-control'
              type="text"
              name="nombres"
              value={personalSeleccionado && personalSeleccionado.nombres}
              onChange={handleChange}
            />
            <br />

            <label>
              Horas Semanales <br />
              de Participación
            </label>

            <input
              className='form-control'
              type="number"
              min={0}
              name="horasSemanales"
              value={personalSeleccionado && personalSeleccionado.horasSemanales}
              onChange={handleChange}
            />
            <br />

            <label>
              Total Horas <br />
              Participación <br />
              en el Proyecto.
            </label>

            <input
              className='form-control'
              type="number"
              min={0}
              name="horasTotales"
              value={personalSeleccionado && personalSeleccionado.horasTotales}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className='btn btn-primary' onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className='btn btn-danger'
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody >
          ¿Estás seguro que deseas eliminar el registro seleccionado?
          {personalSeleccionado && personalSeleccionado.rol}
        </ModalBody>
        <ModalFooter>
          <button
            className='btn btn-danger'
            onClick={() => eliminar()}
          >
            Sí
          </button>
          <button
            className='btn btn-secondary'
            onClick={() => setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>
              Insertar nuevo registro <br /> Personal Interno
            </h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>
              ID
            </label>
            <input
              className='form-control'
              readOnly
              type="text"
              name="id"
              value={data[data.length - 1].id + 1}
            />

            <br />
            <label htmlFor='rol'>
              ROL
            </label>

            <select
              id="rol"
              value={personalSeleccionado ? personalSeleccionado.rol : ''}
              onChange={handleChange}
              name="rol"
              className="form-control"
            >
              <option value="Dirección">Dirección</option>
              <option value="Co-Dirección">Co-Dirección</option>
              <option value="Participación">Participación</option>
            </select>
            <br />

            <label htmlFor='tipo'>
              TIPO
            </label>

            <select
              id="tipo"
              value={personalSeleccionado ? personalSeleccionado.tipo : ''}
              onChange={handleChange}
              name="tipo"
              className="form-control"
            >
              <option value="Docente a tiempo Completo">Docente a tiempo Completo</option>
              <option value="Técnico Docente">Técnico Docente</option>
              <option value="Estudiante">Estudiante</option>
            </select>

            <br />

            <label htmlFor='senescyt'>
              Investigadores Acreditados <br />
              SENESCYT
            </label>

            <select
              id="senescyt"
              value={personalSeleccionado ? personalSeleccionado.senescyt : ''}
              onChange={handleChange}
              name="senescyt"
              className="form-control"
            >
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>


            <br />
            <label>Identificación</label>
            <input
              className='form-control'
              type="number"
              min={0}
              name="identificacion"
              value={personalSeleccionado ? personalSeleccionado.identificacion : ''}
              onChange={handleChange}

            />
            <br />

            <label>Nombres y Apellidos</label>
            <input
              className='form-control'
              type="text"
              name="nombres"
              value={personalSeleccionado ? personalSeleccionado.nombres : ''}
              onChange={handleChange}

            />
            <br />

            <label>
              Horas Semanales <br />
              de Participación
            </label>
            <input
              className='form-control'
              type="number"
              min={0}
              name="horasSemanales"
              value={personalSeleccionado ? personalSeleccionado.horasSemanales : ''}
              onChange={handleChange}

            />
            <br />

            <label>
              Total Horas <br />
              Participación <br />
              en el Proyecto.
            </label>
            <input
              className='form-control'
              type="number"
              min={0}
              name="horasTotales"
              value={personalSeleccionado ? personalSeleccionado.horasTotales : ''}
              onChange={handleChange}

            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className='btn btn-primary'
            onClick={() => insertar()}
          >
            Insertar
          </button>
          <button
            className='btn btn-danger'
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      <br />
      <PersonalExternoCooperante />
      <PersonalExternoContratar />

    </div>
  );
}

export default App;

/*
                <label htmlFor="facultad">Facultad</label>
                <br />
                <select
                    id="facultad"
                    value={formData.facultad}
                    onChange={handleChange}
                    name="facultad"
                    className="select-css"
                >
                    <option value="Ciencias Económicas y Empresariales">Ciencias Económicas y Empresariales</option>
                    <option value="Ciencias de la Salud">Ciencias de la Salud</option>
                    <option value="Ciencias Exactas y Naturales">Ciencias Exactas y Naturales</option>
                    <option value="Ingenierías y Arquitectura">Ingenierías y Arquitectura</option>
                    <option value="Ciencias Sociales, Educación y Humanidades">Ciencias Sociales, Educación y Humanidades</option>

                </select>
                <br /> 
                 */