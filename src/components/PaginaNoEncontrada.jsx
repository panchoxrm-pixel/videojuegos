import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default PaginaNoEncontrada;