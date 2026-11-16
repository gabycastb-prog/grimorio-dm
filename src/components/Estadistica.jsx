function Estadistica({ etiqueta, valor }) {
  return (
    <div className="estadistica">
      <span className="estadistica-valor">{valor}</span>
      <span className="estadistica-etiqueta">{etiqueta}</span>
    </div>
  )
}

export default Estadistica