const URL_BASE = 'https://www.dnd5eapi.co'

export async function obtenerMonstruos() {
  const respuesta = await fetch(`${URL_BASE}/api/monsters`)
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar la lista de monstruos')
  }
  const datos = await respuesta.json()
  return datos.results
}

export async function obtenerMonstruo(indice) {
  const respuesta = await fetch(`${URL_BASE}/api/monsters/${indice}`)
  if (!respuesta.ok) {
    throw new Error('No se pudo cargar el monstruo')
  }
  return respuesta.json()
}

export function urlImagen(ruta) {
  if (!ruta) {
    return null
  }
  return `${URL_BASE}${ruta}`
}