import React, { Component } from 'react'; // Importa React y Component desde la biblioteca 'react'
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP

export default class CreateUser extends Component {

    state = {
        users: [], // Array para almacenar la lista de usuarios
        username: '' // Estado para el nombre de usuario en el formulario
    }

    async componentDidMount() { // Método del ciclo de vida de React que se ejecuta después de que el componente se monta en el DOM
        this.getUsers(); // Obtiene la lista de usuarios al cargar el componente
    }

    getUsers = async () => { // Función asincrónica para obtener la lista de usuarios del servidor
        const res = await axios.get('http://localhost:4000/api/users'); // Hace una solicitud GET al servidor para obtener la lista de usuarios
        this.setState({ users: res.data }); // Actualiza el estado con la lista de usuarios obtenida del servidor
    }

    onChangeUserName = (e) => { // Maneja el cambio en el campo de entrada del nombre de usuario
        this.setState({
            username: e.target.value // Actualiza el estado con el valor del campo de entrada
        })
    }

    onSubmit = async e => { // Función asincrónica para manejar el envío del formulario de creación de usuario
        e.preventDefault(); // Evita que el formulario se envíe automáticamente
        await axios.post('http://localhost:4000/api/users', { // Hace una solicitud POST al servidor para crear un nuevo usuario
            username: this.state.username // Envía el nombre de usuario del estado
        })
        this.setState({ username: '' }); // Reinicia el estado del nombre de usuario después de crearlo
        this.getUsers(); // Vuelve a obtener la lista de usuarios después de crear uno nuevo
    }

    deleteUser = async (id) => { // Función asincrónica para eliminar un usuario
        await axios.delete(`http://localhost:4000/api/users/${id}`); // Hace una solicitud DELETE al servidor para eliminar un usuario por su ID
        this.getUsers(); // Vuelve a obtener la lista de usuarios después de eliminar uno
    }

    render() {
        return (
            <div className="row"> {/* Crea una fila para mostrar el formulario de creación de usuario y la lista de usuarios */}
                <div className="col-md-4"> {/* Columna para el formulario de creación de usuario */}
                    <div className="card card-body"> {/* Tarjeta que contiene el formulario de creación de usuario */}
                        <h3>Create New User</h3> {/* Título del formulario */}
                        <form onSubmit={this.onSubmit}> {/* Formulario para crear un nuevo usuario */}
                            <div className="form-group mb-3"> {/* Grupo de formulario para el campo de entrada del nombre de usuario */}
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={this.onChangeUserName} /> {/* Campo de entrada del nombre de usuario con enlace bidireccional al estado */}
                            </div>
                            <button type="submit" className="btn btn-primary mb-3"> {/* Botón para enviar el formulario */}
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8"> {/* Columna para mostrar la lista de usuarios */}
                    <ul className="list-group"> {/* Lista de usuarios */}
                        {
                            this.state.users.map(user => // Mapea sobre la lista de usuarios y muestra cada usuario como un elemento de lista
                                <li 
                                    className="list-group-item list-group-item-action" 
                                    key={user._id} 
                                    onDoubleClick={() => this.deleteUser(user._id)} // Maneja el doble clic en un usuario para eliminarlo
                                    >
                                    {user.username}
                                </li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
