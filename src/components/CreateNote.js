import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect desde la biblioteca 'react'
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import Datepicker from 'react-datepicker'; // Importa Datepicker de 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'; // Importa estilos CSS para Datepicker
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate de 'react-router-dom' para acceder a los parámetros de la URL y navegar entre páginas

function CreateNote() {
    const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
    const [userSelected, setUserSelected] = useState(''); // Estado para el usuario seleccionado en el formulario
    const [title, setTitle] = useState(''); // Estado para el título de la nota
    const [content, setContent] = useState(''); // Estado para el contenido de la nota
    const [date, setDate] = useState(new Date()); // Estado para la fecha de la nota, inicializado con la fecha actual
    const [editing, setEditing] = useState(false); // Estado para indicar si se está editando una nota existente
    const [id, setId] = useState(''); // Estado para almacenar el ID de la nota en edición

    const params = useParams(); // Obtiene los parámetros de la URL
    const navigate = useNavigate(); // Obtiene la función de navegación

    useEffect(() => { // Hook de efecto que se ejecuta al montar el componente y cada vez que params.id cambia
        async function fetchData() { // Función asincrónica para obtener los datos necesarios
            const usersRes = await axios.get('http://localhost:4000/api/users'); // Obtiene la lista de usuarios del servidor
            setUsers(usersRes.data.map(user => user.username)); // Actualiza el estado con los nombres de usuario obtenidos del servidor
            setUserSelected(usersRes.data[0].username); // Establece el primer usuario de la lista como el usuario seleccionado por defecto

            if (params.id) { // Si hay un parámetro de ID en la URL
                setEditing(true); // Establece el estado de edición en verdadero
                setId(params.id); // Establece el ID de la nota en edición
                const noteRes = await axios.get(`http://localhost:4000/api/notes/${params.id}`); // Obtiene la nota correspondiente al ID de la URL
                setTitle(noteRes.data.title); // Establece el título de la nota
                setContent(noteRes.data.content); // Establece el contenido de la nota
                setDate(new Date(noteRes.data.date)); // Establece la fecha de la nota
                setUserSelected(noteRes.data.author); // Establece el autor de la nota
            }
        }
        fetchData(); // Llama a la función fetchData para obtener los datos necesarios
    }, [params.id]); // Ejecuta el efecto cada vez que params.id cambia

    const onSubmit = async (e) => { // Función para manejar el envío del formulario
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        const newNote = { title, content, date, author: userSelected }; // Crea un objeto con los datos de la nueva nota

        if (editing) { // Si se está editando una nota existente
            await axios.put(`http://localhost:4000/api/notes/${id}`, newNote); // Actualiza la nota existente en el servidor
        } else { // Si se está creando una nueva nota
            await axios.post('http://localhost:4000/api/notes', newNote); // Crea una nueva nota en el servidor
        }

        navigate('/'); // Navega de vuelta a la página principal después de enviar el formulario
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Create a Note</h4>

                {/* SELECT USER */}
                <div className="form-group mb-3">
                    <select 
                        className="form-control"
                        name="userSelected"
                        onChange={(e) => setUserSelected(e.target.value)}
                        value={userSelected}
                    >
                        {users.map(user => 
                            <option key={user} value={user}>
                                {user}
                            </option>
                        )}
                    </select>
                </div>

                <div className="form-group mb-3">
                    <input 
                        type="text" 
                        className='form-control' 
                        placeholder='Title'
                        name='title'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <textarea 
                        name="content"
                        className='form-control'
                        placeholder='Content'
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <Datepicker 
                        className='form-control'
                        selected={date}
                        onChange={date => setDate(date)}
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <button type='submit' className='btn btn-primary mb-3'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateNote;
