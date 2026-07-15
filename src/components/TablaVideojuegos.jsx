import './TablaVideojuegos.css';

function TablaVideojuegos({ videojuegos }) {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;