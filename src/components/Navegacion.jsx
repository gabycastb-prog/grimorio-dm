function Navegacion({ seccionActiva, cambiarSeccion }) {
  return (
    <nav className="navegacion">
      <button
        className={seccionActiva === 'bestiario' ? 'activo' : ''}
        onClick={() => cambiarSeccion('bestiario')}
      >
        Bestiario
      </button>
      <button
        className={seccionActiva === 'loot' ? 'activo' : ''}
        onClick={() => cambiarSeccion('loot')}
      >
        Botín
      </button>
      <button
        className={seccionActiva === 'dados' ? 'activo' : ''}
        onClick={() => cambiarSeccion('dados')}
      >
        Dados
      </button>
    </nav>
  )
}

export default Navegacion