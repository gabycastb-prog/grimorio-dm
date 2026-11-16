function Tarjeta({ titulo, subtitulo, imagen, children, alQuitar }) {
  return (
    <article className="tarjeta">
      {imagen ? (
        <img className="tarjeta-imagen" src={imagen} alt={titulo} />
      ) : (
        <div className="tarjeta-sin-imagen">
          <span>{titulo.charAt(0)}</span>
        </div>
      )}
      <div className="tarjeta-cuerpo">
        <h3>{titulo}</h3>
        {subtitulo && <p className="tarjeta-subtitulo">{subtitulo}</p>}
        <div className="tarjeta-datos">{children}</div>
        {alQuitar && (
          <button className="boton-quitar" onClick={alQuitar}>
            Quitar
          </button>
        )}
      </div>
    </article>
  )
}

export default Tarjeta