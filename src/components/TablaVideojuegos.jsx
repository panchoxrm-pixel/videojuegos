import './TablaVideojuegos.css';

// 1. Recibimos las funciones onEliminar y onEditar como props
function TablaVideojuegos({ videojuegos, onEliminar, onEditar }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Lanzamiento</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso</th>
            <th>Acciones</th> {/* 2. Nueva columna de acciones */}
          </tr>
        </thead>
        <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.titulo}</td>
              <td>{juego.genero}</td>
              <td>{juego.plataforma}</td>
              <td>{juego.lanzamiento}</td>
              <td>${juego.precio}</td>
              <td>{juego.disponible ? "Sí" : "No"}</td>
              <td>
                <progress value={juego.progreso} max="1" />
              </td>
              <td>
                {/* 3. Botones que llaman a las funciones del padre */}
                <button onClick={() => onEditar(juego)}>Editar</button>
                <button onClick={() => onEliminar(juego.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;