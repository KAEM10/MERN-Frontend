import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa componentes de react-router-dom para manejar enrutamiento en la aplicación
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap

import Navigation from './components/Navigation'; // Importa el componente de navegación
import NotesList from './components/NotesList'; // Importa el componente de lista de notas
import CreateNote from './components/CreateNote'; // Importa el componente de creación de nota
import CreateUser from './components/CreateUser'; // Importa el componente de creación de usuario

function App() {
  return (
    <Router> {/* Inicia el enrutador de la aplicación */}
      <Navigation /> {/* Muestra el componente de navegación en la parte superior de la aplicación */}

      <div className="container p-4"> {/* Contenedor principal de la aplicación */}
        <Routes> {/* Define las rutas de la aplicación */}
          <Route path="/" exact element={<NotesList />}></Route> {/* Ruta para mostrar la lista de notas */}
          <Route path="/edit/:id" element={<CreateNote />}></Route> {/* Ruta para editar una nota específica */}
          <Route path="/create" element={<CreateNote />}></Route> {/* Ruta para crear una nueva nota */}
          <Route path="/user" element={<CreateUser />}></Route> {/* Ruta para crear un nuevo usuario */}
        </Routes>
      </div>

    </Router>
  );
}

export default App; // Exporta el componente principal de la aplicación
