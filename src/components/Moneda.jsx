function Moneda({ nombre, cantidad, clase }) {
  return (
    <div className="moneda">
      <span className={`moneda-circulo ${clase}`}></span>
      <span className="moneda-cantidad">{cantidad}</span>
      <span className="moneda-nombre">{nombre}</span>
    </div>
  )
}

export default Moneda