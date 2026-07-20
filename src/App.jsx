import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion';
import data from './data/videojuegos';

// Componente para manejar la navegación interna
function AppRoutes({ videojuegos, setVideojuegos, mostrarToast }) {
  const navigate = useNavigate();

  const eliminarVideojuego = (id) => {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
    mostrarToast("Videojuego eliminado correctamente");
  };

  const editarVideojuego = (juego) => {
    navigate("/editar", { state: { juego } });
  };

  const guardarVideojuego = (nuevoJuego) => {
    const existe = videojuegos.find(j => j.id === nuevoJuego.id);
    if (existe) {
      setVideojuegos(videojuegos.map(j => j.id === nuevoJuego.id ? nuevoJuego : j));
      mostrarToast("Videojuego actualizado correctamente");
    } else {
      setVideojuegos([...videojuegos, nuevoJuego]);
      mostrarToast("Videojuego agregado correctamente");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminarVideojuego} onEditar={editarVideojuego} />} />
      <Route path="/nuevo" element={<FormularioVideojuego onGuardar={guardarVideojuego} />} />
      <Route path="/editar" element={<FormularioVideojuego onGuardar={guardarVideojuego} />} />
      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  );
}

function App() {
  // Lectura perezosa: intenta cargar desde LocalStorage antes de usar los datos por defecto
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });

  const [toast, setToast] = useState(null);

  // Escritura automática: cada cambio en videojuegos se persiste en LocalStorage
  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  const mostrarToast = (mensaje) => {
    setToast(null);
    // Reinicia el componente para que la animación de entrada se vuelva a disparar
    setTimeout(() => setToast(mensaje), 0);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <h1>Tienda de Videojuegos</h1>
        <AppRoutes videojuegos={videojuegos} setVideojuegos={setVideojuegos} mostrarToast={mostrarToast} />
      </div>
      <AlertaNotificacion mensaje={toast} onClose={() => setToast(null)} />
    </BrowserRouter>
  );
}

export default App;
