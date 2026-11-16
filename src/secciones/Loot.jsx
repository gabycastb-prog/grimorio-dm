import { useEffect, useState } from 'react'
import { obtenerLista, obtenerDetalle, urlImagen } from '../services/dndApi'
import {
  numeroAleatorio,
  obtenerNivel,
  nombreNivel,
  generarMonedas,
  cantidadObjetos,
  valorEnOro,
} from '../utils/botin'
import Tarjeta from '../components/Tarjeta'
import Estadistica from '../components/Estadistica'
import Moneda from '../components/Moneda'

function Loot() {
  const [desafio, setDesafio] = useState(1)
  const [comunes, setComunes] = useState([])
  const [magicos, setMagicos] = useState([])
  const [monedas, setMonedas] = useState(null)
  const [objetos, setObjetos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    obtenerLista('equipment')
      .then((lista) => setComunes(lista))
      .catch((e) => setError(e.message))
    obtenerLista('magic-items')
      .then((lista) => setMagicos(lista))
      .catch((e) => setError(e.message))
  }, [])

  const nivel = obtenerNivel(desafio)
  const listasListas = comunes.length > 0 && magicos.length > 0

  async function generarBotin() {
    setCargando(true)
    setError(null)
    setObjetos([])
    setMonedas(generarMonedas(nivel))

    try {
      const cantidad = cantidadObjetos(nivel)
      const nuevos = []

      for (let i = 0; i < cantidad.comunes; i++) {
        const elegido = comunes[numeroAleatorio(0, comunes.length - 1)]
        const detalle = await obtenerDetalle(elegido.url)
        nuevos.push(detalle)
      }

      for (let i = 0; i < cantidad.magicos; i++) {
        const elegido = magicos[numeroAleatorio(0, magicos.length - 1)]
        const detalle = await obtenerDetalle(elegido.url)
        nuevos.push(detalle)
      }

      setObjetos(nuevos)
    } catch (e) {
      setError(e.message)
    }

    setCargando(false)
  }

  return (
    <section className="seccion">
      <h2>Generador de botín</h2>
      <p>Escoge el nivel de desafío del monstruo derrotado y genera la recompensa.</p>

      <div className="control-desafio">
        <label htmlFor="desafio">
          Nivel de Desafío: <strong>{desafio}</strong>
        </label>
        <input
          id="desafio"
          type="range"
          min="0"
          max="30"
          value={desafio}
          onChange={(e) => setDesafio(Number(e.target.value))}
        />
        <p className="nivel-etiqueta">{nombreNivel(nivel)}</p>
      </div>

      <button
        className="boton-principal"
        onClick={generarBotin}
        disabled={cargando || !listasListas}
      >
        {cargando ? 'Abriendo el cofre...' : 'Generar botín'}
      </button>

      {!listasListas && !error && <p className="mensaje">Cargando objetos de la API...</p>}
      {error && <p className="mensaje error">{error}</p>}

      {monedas && (
        <>
          <h3 className="subtitulo-botin">Monedas</h3>
          <div className="monedas">
            <Moneda nombre="Cobre" cantidad={monedas.cobre} clase="cobre" />
            <Moneda nombre="Plata" cantidad={monedas.plata} clase="plata" />
            <Moneda nombre="Oro" cantidad={monedas.oro} clase="oro" />
            <Moneda nombre="Platino" cantidad={monedas.platino} clase="platino" />
          </div>
          <p className="total-oro">
            Valor total: <strong>{valorEnOro(monedas)} piezas de oro</strong>
          </p>
        </>
      )}

      {objetos.length > 0 && <h3 className="subtitulo-botin">Objetos</h3>}

      <div className="cuadricula botin">
        {objetos.map((objeto, posicion) => (
          <Tarjeta
            key={posicion}
            titulo={objeto.name}
            subtitulo={objeto.equipment_category.name}
            imagen={urlImagen(objeto.image)}
          >
            {objeto.rarity ? (
              <Estadistica etiqueta="Rareza" valor={objeto.rarity.name} />
            ) : (
              <Estadistica etiqueta="Valor" valor={`${objeto.cost.quantity} ${objeto.cost.unit}`} />
            )}
            <Estadistica etiqueta="Tipo" valor={objeto.rarity ? 'Mágico' : 'Común'} />
            <Estadistica etiqueta="Peso" valor={objeto.weight ? `${objeto.weight} lb` : '-'} />
          </Tarjeta>
        ))}
      </div>
    </section>
  )
}

export default Loot