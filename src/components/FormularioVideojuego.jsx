import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './FormularioVideojuego.css';

const hoyISO = () => new Date().toISOString().split("T")[0];

function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();

    // Verificamos si hay datos de edición pasados por el estado de la ruta
    const juegoAEditar = location.state?.juego || null;

    // Estados para cada campo del formulario
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(false);
    const [progreso, setProgreso] = useState(0);

    // Estado de errores de validación
    const [errores, setErrores] = useState({});

    // Si estamos editando, precargamos los datos
    useEffect(() => {
        if (juegoAEditar) {
            setTitulo(juegoAEditar.titulo);
            setGenero(juegoAEditar.genero);
            setPlataforma(juegoAEditar.plataforma);
            setLanzamiento(juegoAEditar.lanzamiento);
            setFechaLanzamiento(juegoAEditar.fechaLanzamiento || "");
            setSinopsis(juegoAEditar.sinopsis || "");
            setCalificacion(juegoAEditar.calificacion ?? "");
            setPrecio(juegoAEditar.precio);
            setDisponible(juegoAEditar.disponible);
            setProgreso(juegoAEditar.progreso);
        }
    }, [juegoAEditar]);

    // Validaciones reactivas de negocio
    const validarFormulario = () => {
        const erroresActivos = {};

        if (!titulo.trim()) {
            erroresActivos.titulo = "El título no puede estar vacío ni contener solo espacios.";
        }

        if (calificacion === "" || Number(calificacion) < 1 || Number(calificacion) > 100) {
            erroresActivos.calificacion = "La calificación debe ser un número entre 1 y 100.";
        }

        if (!sinopsis.trim() || sinopsis.trim().length < 10) {
            erroresActivos.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
        } else if (sinopsis.trim().length > 250) {
            erroresActivos.sinopsis = "La sinopsis no puede superar los 250 caracteres.";
        }

        if (!fechaLanzamiento) {
            erroresActivos.fechaLanzamiento = "Debes seleccionar una fecha de lanzamiento.";
        } else if (fechaLanzamiento > hoyISO()) {
            erroresActivos.fechaLanzamiento = "La fecha de lanzamiento no puede ser futura.";
        }

        return erroresActivos;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const erroresActivos = validarFormulario();
        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }
        setErrores({});

        const juego = {
            id: juegoAEditar ? juegoAEditar.id : Date.now(),
            titulo: titulo.trim(),
            genero,
            plataforma,
            lanzamiento: Number(lanzamiento),
            fechaLanzamiento,
            sinopsis: sinopsis.trim(),
            calificacion: Number(calificacion),
            precio: Number(precio),
            disponible,
            progreso: Number(progreso)
        };
        onGuardar(juego);
        navigate("/");
    };

    return (
        <form className="formulario-videojuego" onSubmit={handleSubmit} noValidate>
            <h2>{juegoAEditar ? "Editar Videojuego" : "Nuevo Videojuego"}</h2>

            <div className="campo">
                <label>Título:
                    <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </label>
                {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
            </div>

            <div className="campo">
                <label>Género:
                    <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
                        <option value="">Seleccione...</option>
                        <option value="Accion">Acción</option>
                        <option value="RPG">RPG</option>
                    </select>
                </label>
            </div>

            <div className="campo">
                <label>Plataforma:
                    <input type="text" value={plataforma} onChange={(e) => setPlataforma(e.target.value)} required />
                </label>
            </div>

            <div className="campo">
                <label>Año de lanzamiento:
                    <input
                        type="number"
                        value={lanzamiento}
                        onChange={(e) => setLanzamiento(e.target.value)}
                        min="1970"
                        max={new Date().getFullYear()}
                        required
                    />
                </label>
            </div>

            <div className="campo">
                <label>Fecha de lanzamiento:
                    <input
                        type="date"
                        value={fechaLanzamiento}
                        onChange={(e) => setFechaLanzamiento(e.target.value)}
                        max={hoyISO()}
                        required
                    />
                </label>
                {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
            </div>

            <div className="campo">
                <label>Sinopsis:
                    <textarea
                        value={sinopsis}
                        onChange={(e) => setSinopsis(e.target.value)}
                        minLength="10"
                        maxLength="250"
                        rows="4"
                        required
                    />
                </label>
                <span className="contador-caracteres">{sinopsis.length}/250</span>
                {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
            </div>

            <div className="campo">
                <label>Calificación de la crítica (1-100):
                    <input
                        type="number"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        min="1"
                        max="100"
                        required
                    />
                </label>
                {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
            </div>

            <div className="campo">
                <label>Precio:
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </label>
            </div>

            <div className="campo campo-checkbox">
                <label>
                    <input type="checkbox" checked={disponible} onChange={(e) => setDisponible(e.target.checked)} />
                    Disponible
                </label>
            </div>

            <div className="campo">
                <label>Progreso: {Math.round(progreso * 100)}%
                    <input
                        type="range"
                        value={progreso}
                        onChange={(e) => setProgreso(e.target.value)}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                </label>
            </div>

            <button type="submit">Guardar</button>
        </form>
    );
}

export default FormularioVideojuego;
