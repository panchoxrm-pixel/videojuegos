import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Verificamos si hay datos de edición pasados por el estado de la ruta
    const juegoAEditar = location.state?.juego || null;

    // Estados para cada campo del formulario
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(false);

    // Si estamos editando, precargamos los datos
    useEffect(() => {
        if (juegoAEditar) {
            setTitulo(juegoAEditar.titulo);
            setGenero(juegoAEditar.genero);
            setPlataforma(juegoAEditar.plataforma);
            setPrecio(juegoAEditar.precio);
            setDisponible(juegoAEditar.disponible);
        }
    }, [juegoAEditar]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const juego = {
            id: juegoAEditar ? juegoAEditar.id : Date.now(),
            titulo,
            genero,
            plataforma,
            precio: Number(precio),
            disponible,
            progreso: juegoAEditar ? juegoAEditar.progreso : 0
        };
        onGuardar(juego);
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{juegoAEditar ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>
            
            <label>Título: 
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </label>

            <label>Género: 
                <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                    <option value="">Seleccione...</option>
                    <option value="Accion">Acción</option>
                    <option value="RPG">RPG</option>
                </select>
            </label>

            <label>Disponible: 
                <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
            </label>

            <button type="submit">Guardar</button>
        </form>
    );
}

export default FormularioVideojuego;