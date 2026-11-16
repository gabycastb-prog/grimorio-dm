export function numeroAleatorio(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
}

export function obtenerNivel(desafio) {
  if (desafio <= 4) {
    return 1
  }
  if (desafio <= 10) {
    return 2
  }
  if (desafio <= 16) {
    return 3
  }
  return 4
}

export function nombreNivel(nivel) {
  if (nivel === 1) {
    return 'Botín menor'
  }
  if (nivel === 2) {
    return 'Botín moderado'
  }
  if (nivel === 3) {
    return 'Botín mayor'
  }
  return 'Botín legendario'
}

export function generarMonedas(nivel) {
  if (nivel === 1) {
    return {
      cobre: numeroAleatorio(10, 100),
      plata: numeroAleatorio(5, 50),
      oro: numeroAleatorio(0, 10),
      platino: 0,
    }
  }
  if (nivel === 2) {
    return {
      cobre: 0,
      plata: numeroAleatorio(20, 200),
      oro: numeroAleatorio(20, 150),
      platino: numeroAleatorio(0, 10),
    }
  }
  if (nivel === 3) {
    return {
      cobre: 0,
      plata: 0,
      oro: numeroAleatorio(100, 800),
      platino: numeroAleatorio(10, 80),
    }
  }
  return {
    cobre: 0,
    plata: 0,
    oro: numeroAleatorio(500, 3000),
    platino: numeroAleatorio(50, 500),
  }
}

export function cantidadObjetos(nivel) {
  if (nivel === 1) {
    return { comunes: 1, magicos: 0 }
  }
  if (nivel === 2) {
    return { comunes: 1, magicos: 1 }
  }
  if (nivel === 3) {
    return { comunes: 1, magicos: 2 }
  }
  return { comunes: 0, magicos: 4 }
}

export function valorEnOro(monedas) {
  const total = monedas.oro + monedas.platino * 10 + monedas.plata / 10 + monedas.cobre / 100
  return Math.round(total * 100) / 100
}