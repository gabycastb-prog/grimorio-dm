export function formatearDesafio(valor) {
  if (valor === 0.125) {
    return '1/8'
  }
  if (valor === 0.25) {
    return '1/4'
  }
  if (valor === 0.5) {
    return '1/2'
  }
  return valor
}