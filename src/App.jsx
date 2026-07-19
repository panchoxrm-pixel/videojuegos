import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import data from './data/videojuegos';

// Componente para manejar la navegación interna
function AppRoutes({ videojuegos, setVideojuegos }) {
  const navigate = useNavigate();

  const eliminarVideojuego = (id) => {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
  };

  const editarVideojuego = (juego) => {
    navigate("/editar", { state: { juego } });
  };

  const guardarVideojuego = (nuevoJuego) => {
    const existe = videojuegos.find(j => j.id === nuevoJuego.id);
    if (existe) {
      setVideojuegos(videojuegos.map(j => j.id === nuevoJuego.id ? nuevoJuego : j));
    } else {
      setVideojuegos([...videojuegos, nuevoJuego]);
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
  const [videojuegos, setVideojuegos] = useState(data);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <h1>Tienda de Videojuegos</h1>
        <AppRoutes videojuegos={videojuegos} setVideojuegos={setVideojuegos} />
      </div>
    </BrowserRouter>
  );
}

export default App;