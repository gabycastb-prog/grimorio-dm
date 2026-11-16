function BotonDado({ caras, seleccionado, alSeleccionar }) {
  return (
    <button
      className={seleccionado ? 'boton-dado activo' : 'boton-dado'}
      onClick={() => alSeleccionar(caras)}
    >
      <span className="boton-dado-forma">{caras}</span>
      <span className="boton-dado-nombre">d{caras}</span>
    </button>
  )
}

export default BotonDado