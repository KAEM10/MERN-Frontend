import React, { Component } from 'react'; // Importa React y Component desde la biblioteca 'react'
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para la navegación

export default class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Barra de navegación con estilo oscuro */}
                <div className="container"> {/* Contenedor para alinear el contenido de la barra de navegación */}
                    <Link className="navbar-brand" to="/"> {/* Enlace al inicio de la aplicación */}
                        NotesApp {/* Texto de marca de la barra de navegación */}
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span> {/* Icono del botón de alternancia para dispositivos móviles */}
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav"> {/* Contenido colapsable de la barra de navegación */}
                        <ul className="navbar-nav ms-auto"> {/* Lista de elementos de la barra de navegación alineados a la derecha */}
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Notes</Link> {/* Enlace a la lista de notas */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Create Notes</Link> {/* Enlace para crear una nueva nota */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">Create User</Link> {/* Enlace para crear un nuevo usuario */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
