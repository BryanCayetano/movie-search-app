import React from 'react';
import MovieSearch from './MovieSearch'; // Importa el componente MovieSearch desde su ruta correcta
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <MovieSearch />
      </header>
    </div>
  );
}

export default App;
