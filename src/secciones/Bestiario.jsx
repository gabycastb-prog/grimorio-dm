import { useEffect, useState } from 'react'
import { obtenerMonstruos, obtenerMonstruo, urlImagen } from '../services/dndApi'
import Tarjeta from '../components/Tarjeta'
import Estadistica from '../components/Estadistica'
import { formatearDesafio } from '../utils/formato'

function Bestiario() {
  const [monstruos, setMonstruos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [enemigos, setEnemigos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [agregando, setAgregando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    obtenerMonstruos()
      .then((lista) => setMonstruos(lista))
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false))
  }, [])

  async function agregarEnemigo(indice) {
    setAgregando(true)
    setError(null)
    try {
      const datos = await obtenerMonstruo(indice)
      setEnemigos([...enemigos, datos])
    } catch (e) {
      setError(e.message)
    }
    setAgregando(false)
  }

  function quitarEnemigo(posicion) {
    setEnemigos(enemigos.filter((enemigo, i) => i !== posicion))
  }

  const filtrados = monstruos.filter((monstruo) =>
    monstruo.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <section className="seccion">
      <h2>Bestiario</h2>
      <p>Busca un monstruo y tócalo para agregarlo a la partida.</p>

      <input
        className="buscador"
        type="text"
        placeholder="Buscar monstruo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando && <p className="mensaje">Cargando monstruos...</p>}
      {error && <p className="mensaje error">{error}</p>}

      {!cargando && (
        <>
          <p className="contador">{filtrados.length} monstruos encontrados</p>
          <div className="lista-monstruos">
            {filtrados.map((monstruo) => (
              <button
                key={monstruo.index}
                className="boton-monstruo"
                onClick={() => agregarEnemigo(monstruo.index)}
                disabled={agregando}
              >
                <span>{monstruo.name}</span>
                <span className="mas">+</span>
              </button>
            ))}
          </div>
        </>
      )}

      <div className="encabezado-partida">
        <h3>Enemigos de la partida ({enemigos.length})</h3>
        {enemigos.length > 0 && (
          <button className="boton-limpiar" onClick={() => setEnemigos([])}>
            Limpiar
          </button>
        )}
      </div>

      {agregando && <p className="mensaje">Invocando monstruo...</p>}

      {enemigos.length === 0 && !agregando && (
        <p className="mensaje">Todavía no hay enemigos en la partida.</p>
      )}

      <div className="cuadricula">
        {enemigos.map((enemigo, posicion) => (
          <Tarjeta
            key={posicion}
            titulo={enemigo.name}
            subtitulo={`${enemigo.size} ${enemigo.type}`}
            imagen={urlImagen(enemigo.image)}
            alQuitar={() => quitarEnemigo(posicion)}
          >
            <Estadistica etiqueta="Clase de Armadura" valor={enemigo.armor_class[0].value} />
            <Estadistica etiqueta="Puntos de Golpe" valor={enemigo.hit_points} />
            <Estadistica etiqueta="Nivel de Desafío" valor={formatearDesafio(enemigo.challenge_rating)} />
          </Tarjeta>
        ))}
      </div>
    </section>
  )
}

export default Bestiario