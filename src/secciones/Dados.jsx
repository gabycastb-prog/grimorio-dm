import { useState } from 'react'
import BotonDado from '../components/BotonDado'
import { numeroAleatorio } from '../utils/botin'

const TIPOS_DADO = [4, 6, 8, 10, 12, 20, 100]

function Dados() {
  const [dado, setDado] = useState(20)
  const [cantidad, setCantidad] = useState(1)
  const [tiradas, setTiradas] = useState([])
  const [total, setTotal] = useState(null)
  const [lanzamiento, setLanzamiento] = useState(0)
  const [historial, setHistorial] = useState([])

  function cambiarCantidad(valor) {
    const nueva = cantidad + valor
    if (nueva >= 1 && nueva <= 10) {
      setCantidad(nueva)
    }
  }

  function lanzar() {
    const resultados = []
    let suma = 0

    for (let i = 0; i < cantidad; i++) {
      const valor = numeroAleatorio(1, dado)
      resultados.push(valor)
      suma = suma + valor
    }

    setTiradas(resultados)
    setTotal(suma)
    setLanzamiento(lanzamiento + 1)

    const nuevaEntrada = { tirada: `${cantidad}d${dado}`, total: suma }
    setHistorial([nuevaEntrada, ...historial].slice(0, 8))
  }

  const esCritico = dado === 20 && cantidad === 1 && total === 20
  const esPifia = dado === 20 && cantidad === 1 && total === 1

  let claseResultado = 'resultado-numero'
  if (esCritico) {
    claseResultado = 'resultado-numero critico'
  }
  if (esPifia) {
    claseResultado = 'resultado-numero pifia'
  }

  return (
    <section className="seccion">
      <h2>Bandeja de dados</h2>
      <p>Escoge el dado, cuántos quieres lanzar y prueba tu suerte.</p>

      <div className="dados-grid">
        {TIPOS_DADO.map((caras) => (
          <BotonDado
            key={caras}
            caras={caras}
            seleccionado={dado === caras}
            alSeleccionar={setDado}
          />
        ))}
      </div>

      <div className="control-cantidad">
        <button onClick={() => cambiarCantidad(-1)} disabled={cantidad === 1}>
          -
        </button>
        <span>{cantidad}</span>
        <button onClick={() => cambiarCantidad(1)} disabled={cantidad === 10}>
          +
        </button>
      </div>

      <button className="boton-principal" onClick={lanzar}>
        Lanzar {cantidad}d{dado}
      </button>

      <div className="bandeja">
        {total === null ? (
          <p className="mensaje">La bandeja está esperando tu primer lanzamiento.</p>
        ) : (
          <>
            <span key={lanzamiento} className={claseResultado}>
              {total}
            </span>
            {esCritico && <p className="aviso-critico">¡Crítico!</p>}
            {esPifia && <p className="aviso-pifia">Pifia</p>}
            {tiradas.length > 1 && <p className="detalle-tiradas">{tiradas.join(' + ')}</p>}
          </>
        )}
      </div>

      {historial.length > 0 && (
        <>
          <h3 className="subtitulo-botin">Historial</h3>
          <ul className="historial">
            {historial.map((entrada, posicion) => (
              <li key={posicion}>
                <span>{entrada.tirada}</span>
                <strong>{entrada.total}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Dados