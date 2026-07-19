import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <span>Tienda de Videojuegos</span>
      <div className="navbar-links">
        <Link to="/">Lista de Videojuegos</Link>
        <Link to="/nuevo">Nuevo Videojuego</Link>
      </div>
    </nav>
  );
}

export default Navbar;