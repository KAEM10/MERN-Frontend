import React, { Component } from 'react'; // Importa React y Component desde la biblioteca 'react'
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import { format } from 'timeago.js'; // Importa la función format de 'timeago.js' para formatear fechas
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para la navegación

export default class NotesList extends Component {

    state = {
        notes: [] // Estado inicial con un array vacío para almacenar las notas
    }
    

    componentDidMount(){ // Método del ciclo de vida de React que se ejecuta después de que el componente se monta en el DOM
        this.getNotes(); // Llama a la función getNotes para obtener las notas
    }

    getNotes = async () =>{ // Función asincrónica para obtener las notas del servidor
        const res = await axios.get('http://localhost:4000/api/notes'); // Hace una solicitud GET al servidor para obtener las notas
        this.setState({notes: res.data}); // Actualiza el estado con las notas obtenidas del servidor
    }

    deleteNote = async (noteId) =>{ // Función asincrónica para eliminar una nota
        await axios.delete(`http://localhost:4000/api/notes/${noteId}`); // Hace una solicitud DELETE al servidor para eliminar la nota con el ID proporcionado
        this.getNotes(); // Vuelve a obtener las notas después de eliminar la nota
    }

    render() {
        return (
            <div className="row"> {/* Crea una fila para mostrar las notas */}
                {
                    this.state.notes.map(note => ( // Mapea sobre el array de notas en el estado y renderiza cada nota como un componente de tarjeta
                        <div className="col-md-4 p-2" key={note._id}> {/* Cada nota se muestra en una columna de ancho medio */}
                            <div className="card"> {/* Tarjeta que contiene los detalles de la nota */}
                                <div className="card-header d-flex justify-content-between"> {/* Encabezado de la tarjeta con un título y un botón de edición */}
                                    <h5>{note.title}</h5> {/* Título de la nota */}
                                    <Link className="btn btn-secondary" to={`/edit/${note._id}`}> {/* Botón de edición que redirige a la página de edición de la nota */}
                                        Edit
                                    </Link>
                                </div>
                                <div className="card-body"> {/* Cuerpo de la tarjeta con el contenido, autor y fecha de la nota */}
                                    <p>{note.content}</p> {/* Contenido de la nota */}
                                    <p>{note.author}</p> {/* Autor de la nota */}
                                    <p>{format(note.date)}</p> {/* Fecha formateada de la nota utilizando 'timeago.js' */}
                                </div>

                                <div className="card-footer"> {/* Pie de la tarjeta con un botón para eliminar la nota */}
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
