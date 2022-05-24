import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

export default function PersonalExternoCooperante() {
    const dataPersonalExternoCooperante = [
        {
            id: 1,
            rol: "Tutor/Asesor",
            nombres: "Jose Hurtado",
            entidad: "Ediloja",
        },


        {
            id: 2,
            rol: "Participación",
            nombres: "David Rojas",
            entidad: "Solca Loja",
        }
    ];

    const [data, setData] = useState(dataPersonalExternoCooperante);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);



    const [personalExternoCooperanteSeleccionado, setPersonalExternoCooperanteSeleccionado] = useState({
        id: '',
        rol: '',
        nombres: '',
        entidad: ''
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
        console.log(personalExternoCooperanteSeleccionado);
    }

    const editar = () => {
        var dataNueva = data;
        dataNueva.map(personal => {
            if (personal.id === personalExternoCooperanteSeleccionado.id) {
                personal.rol = personalExternoCooperanteSeleccionado.rol;
                personal.nombres = personalExternoCooperanteSeleccionado.nombres;
                personal.entidad = personalExternoCooperanteSeleccionado.entidad;
            }
        })
        setData(dataNueva);
        setModalEditar(false);
    }

    const eliminar = () => {
        setData(data.filter(personal => personal.id !== personalExternoCooperanteSeleccionado.id));
        setModalEliminar(false);
    }

    const abrirModalInsertar = () => {
        setPersonalExternoCooperanteSeleccionado(null);
        setModalInsertar(true);

    }

    const insertar = () => {
        var valorInsertar = personalExternoCooperanteSeleccionado;
        valorInsertar.id = data[data.length - 1].id + 1;
        var dataNueva = data;
        dataNueva.push(valorInsertar);
        setData(dataNueva);
        setModalInsertar(false);
    }

    return (
        <div>
            <h2>
                Personal Externo Cooperante
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
                        <th>Nombres Completos</th>
                        <th>Entidad</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map(elemento => (
                        <tr>
                            <td>{elemento.id}</td>
                            <td>{elemento.rol}</td>
                            <td>{elemento.nombres}</td>
                            <td>{elemento.entidad}</td>
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
                            Externo Cooperante
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
                            value={personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.id}
                        />
                        <br />

                 

                        <label htmlFor="rol">ROL</label>
                        <br />
                        <select
                            id="rol"
                            value={personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.rol}
                            onChange={handleChange}
                            name="rol"
                            // className="select-css"
                            className='form-control'

                        >
                            <option value="Tutor/ Asesor">Tutor/ Asesor</option>
                            <option value="Participación">Participación</option>

                        </select>
{/* 
                        <label>
                            ROL
                        </label>
                        <input
                            className='form-control'
                            type="text"
                            name="rol"
                            value={personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.rol}
                            onChange={handleChange}
                        />
                        < br /> */}

                        <label>
                            Nombres Completos
                        </label>

                        <input
                            className='form-control'
                            type="text"
                            name="nombres"
                            value={personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.nombres}
                            onChange={handleChange}
                        />
                        <br />

                        <label>
                            Entidad
                        </label>

                        <input
                            className='form-control'
                            type="text"
                            name="entidad"
                            value={personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.entidad}
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
                    {personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.rol}
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
                            Insertar nuevo registro <br /> Personal Externo Cooperante
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
                        <label htmlFor="rol">ROL</label>
                        <br />
                        <select
                            id="rol"
                            value={personalExternoCooperanteSeleccionado && personalExternoCooperanteSeleccionado.rol}
                            onChange={handleChange}
                            name="rol"
                            // className="select-css"
                            className='form-control'

                        >
                            <option value="Tutor/ Asesor">Tutor/ Asesor</option>
                            <option value="Participación">Participación</option>

                        </select>


                        <label>Nombres Completos</label>
                        <input
                            className='form-control'
                            type="text"
                            name="nombres"
                            value={personalExternoCooperanteSeleccionado ? personalExternoCooperanteSeleccionado.nombres : ''}
                            onChange={handleChange}

                        />
                        <br />

                        <label>
                            Entidad
                        </label>
                        <input
                            className='form-control'
                            type="text"
                            name="entidad"
                            value={personalExternoCooperanteSeleccionado ? personalExternoCooperanteSeleccionado.entidad : ''}
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
            */