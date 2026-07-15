import './App.css';
import TablaVideojuegos from './components/TablaVideojuegos';
import data from './data/videojuegos';

function App() {
  return (
    <div className="App">
      <h1>Tienda de Videojuegos</h1>
      <TablaVideojuegos videojuegos={data} />
    </div>
  );
}

export default App;