import React from 'react'; // Importa la biblioteca React
import ReactDOM from 'react-dom/client'; // Importa el método ReactDOM.createRoot para renderizar la aplicación
import './index.css'; // Importa el archivo CSS para estilos globales
import App from './App'; // Importa el componente principal de la aplicación

const root = ReactDOM.createRoot(document.getElementById('root')); // Crea un punto de entrada en el DOM para renderizar la aplicación
root.render( // Renderiza la aplicación dentro del punto de entrada
  <React.StrictMode> {/* Modo estricto para detectar problemas potenciales en la aplicación */}
    <App /> {/* Renderiza el componente principal de la aplicación */}
  </React.StrictMode>
);
