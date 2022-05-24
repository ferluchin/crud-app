
import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

export default function PersonalExternoContratar() {
  const dataPersonalExternoCooperante = [
    {
      id: 1,
      perfilRequerido: "Perfil de asistente",
      funcion: "Asistente",
      principalesActividades: "Asistencia en actividades de investigacion",
      tiempoContratacionMeses: "6",
      numeroPersonas: "3"
    },


    {
      id: 2,
      perfilRequerido: "Participación",
      funcion: "David Rojas",
      principalesActividades: "Solca Loja",
      tiempoContratacionMeses: "5",
      numeroPersonas: "2"
    },


    {
      id: 3,
      perfilRequerido: "Analista de datos",
      funcion: "Analista",
      principalesActividades: "Analisis de datos UTPL",
      tiempoContratacionMeses: "4",
      numeroPersonas: "1"
    }
  ];

  const [data, setData] = useState(dataPersonalExternoCooperante);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);



  const [personalExternoContratarSeleccionado, setPersonalExternoCooperanteSeleccionado] = useState({
    id: '',
    perfilRequerido: '',
    funcion: '',
    principalesActividades: ''
  });

  const seleccionarPersonal = (elemento, caso) => {
    setPersonalExternoCooperanteSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setPersonalExternoCooperanteSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(personalExternoContratarSeleccionado);
  }

  const editar = () => {
    var dataNueva = data;
    dataNueva.map(personal => {
      if (personal.id === personalExternoContratarSeleccionado.id) {
        personal.perfilRequerido = personalExternoContratarSeleccionado.perfilRequerido;
        personal.funcion = personalExternoContratarSeleccionado.funcion;
        personal.principalesActividades = personalExternoContratarSeleccionado.principalesActividades;
        personal.tiempoContratacionMeses = personalExternoContratarSeleccionado.tiempoContratacionMeses;
        personal.numeroPersonas = personalExternoContratarSeleccionado.numeroPersonas;

      }
    })
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(personal => personal.id !== personalExternoContratarSeleccionado.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    setPersonalExternoCooperanteSeleccionado(null);
    setModalInsertar(true);

  }

  const insertar = () => {
    var valorInsertar = personalExternoContratarSeleccionado;
    valorInsertar.id = data[data.length - 1].id + 1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }

  return (
    <div>
      <h2>
        Personal Externo A Contratar
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
            <th>Perfil Requerido</th>
            <th>Función</th>
            <th>Principales Actividades <br />a Desarrollar</th>
            <th>Tiempo Contratación <br /> Meses</th>
            <th>Número de personas <br /> a contratar</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {data.map(elemento => (
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.perfilRequerido}</td>
              <td>{elemento.funcion}</td>
              <td>{elemento.principalesActividades}</td>
              <td>{elemento.tiempoContratacionMeses}</td>
              <td>{elemento.numeroPersonas}</td>

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
              Editar Personal <br />
              Externo A Contratar
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
              value={personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.id}
            />
            <br />


            <label>
              Perfil Requerido
            </label>
            <input
              className='form-control'
              type="text"
              name="perfilRequerido"
              value={personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.perfilRequerido}
              onChange={handleChange}
            />
            < br />

            <label htmlFor="funcion">Función</label>
            <br />
            <select
              id="funcion"
              value={personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.funcion}
              onChange={handleChange}
              name="funcion"
              // className="select-css"
              className='form-control'

            >
              <option value="ASISTENTE">ASISTENTE</option>
              <option value="TÉCNICO">TÉCNICO</option>
              <option value="ANALISTA">ANALISTA</option>
              <option value="CONSULTOR-ESPECIALISTA">CONSULTOR-ESPECIALISTA</option>

            </select>
            
            {/* <label>
              Función
            </label>

            <input
              className='form-control'
              type="text"
              name="funcion"
              value={personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.funcion}
              onChange={handleChange}
            /> */}
            <br />

            <label >
              Principales actividades a desarrollar
            </label>

            <input
              className='form-control'
              type="text"
              name="principalesActividades"
              value={personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.principalesActividades}
              onChange={handleChange}
            />
            <br />

            <label>
              Tiempo de Contratación (Meses)
            </label>

            <input
              className='form-control'
              type="number"
              min={0}
              name="tiempoContratacionMeses"
              value={personalExternoContratarSeleccionado
                && personalExternoContratarSeleccionado.tiempoContratacionMeses}
              onChange={handleChange}
            />
            <br />

            <label>
              Número de personas a Contratar
            </label>

            <input
              className='form-control'
              type="number"
              min={0}
              name="numeroPersonas"
              value={personalExternoContratarSeleccionado
                && personalExternoContratarSeleccionado.numeroPersonas}
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
          {personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.perfilRequerido}
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
              Insertar nuevo registro <br /> Personal Externo a Contratar
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
            <label>
              Perfil Requerido
            </label>
            <input
              className='form-control'
              type="text"
              name="perfilRequerido"
              value={personalExternoContratarSeleccionado ?
                personalExternoContratarSeleccionado.perfilRequerido : ''}
              onChange={handleChange}
            />

            < br />

            <label htmlFor="funcion">Función</label>
            <br />
            <select
              id="funcion"
              value={personalExternoContratarSeleccionado && personalExternoContratarSeleccionado.funcion}
              onChange={handleChange}
              name="funcion"
              // className="select-css"
              className='form-control'

            >
              <option value="ASISTENTE">ASISTENTE</option>
              <option value="TÉCNICO">TÉCNICO</option>
              <option value="ANALISTA">ANALISTA</option>
              <option value="CONSULTOR-ESPECIALISTA">CONSULTOR-ESPECIALISTA</option>

            </select>
            {/* <br />

            <label>Función</label>
            <input
              className='form-control'
              type="text"
              name="funcion"
              value={personalExternoContratarSeleccionado ?
                personalExternoContratarSeleccionado.funcion : ''}
              onChange={handleChange}

            /> */}
            <br />

            <label>
              Principales Actividades a desarrollar
            </label>
            <input
              className='form-control'
              type="text"
              name="principalesActividades"
              value={personalExternoContratarSeleccionado ?
                personalExternoContratarSeleccionado.principalesActividades : ''}
              onChange={handleChange}

            />
            <br />

            <label>
              Tiempo de Contratación (Meses)
            </label>
            <input
              className='form-control'
              type="number"
              min={0}
              name="tiempoContratacionMeses"
              value={personalExternoContratarSeleccionado ?
                personalExternoContratarSeleccionado.tiempoContratacionMeses : ''}
              onChange={handleChange}

            />
            <br />

            <label>
              Número de Personas a Contratar
            </label>
            <input
              className='form-control'
              type="number"
              min={0}
              name="numeroPersonas"
              value={personalExternoContratarSeleccionado ?
                personalExternoContratarSeleccionado.numeroPersonas : ''}
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
    </div>
  )
}

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