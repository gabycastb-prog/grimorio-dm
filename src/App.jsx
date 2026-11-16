import { useState } from 'react'
import Navegacion from './components/Navegacion'
import Bestiario from './secciones/Bestiario'
import Loot from './secciones/Loot'
import Dados from './secciones/Dados'
import './App.css'

function App() {
  const [seccion, setSeccion] = useState('bestiario')

  return (
    <div className="app">
      <header className="encabezado">
        <h1>Grimorio del DM</h1>
        <p>Herramientas para tus partidas de D&amp;D 5e</p>
      </header>

      <Navegacion seccionActiva={seccion} cambiarSeccion={setSeccion} />

      <main>
        {seccion === 'bestiario' && <Bestiario />}
        {seccion === 'loot' && <Loot />}
        {seccion === 'dados' && <Dados />}
      </main>
      <footer className="pie">
        <p>Datos obtenidos de la D&amp;D 5e API</p>
        <p>Hecho por Hanna Castaño</p>
      </footer>
    </div>
  )
}

export default App