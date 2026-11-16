/** Proyección ortográfica simple de 3D a 2D para figuras: girar (yaw, pitch) y descartar la profundidad. */

export type Vec3 = [number, number, number]

/**
 * Gira el punto `yaw` grados alrededor del eje vertical (z) y `pitch` grados alrededor del eje
 * horizontal de la pantalla, y devuelve [x, y] de pantalla (y hacia arriba) y la profundidad.
 */
export function project3(p: Vec3, yawDeg: number, pitchDeg: number): { x: number; y: number; depth: number } {
  const yaw = (yawDeg * Math.PI) / 180
  const pitch = (pitchDeg * Math.PI) / 180
  // Rotación alrededor de z
  const x1 = p[0] * Math.cos(yaw) - p[1] * Math.sin(yaw)
  const y1 = p[0] * Math.sin(yaw) + p[1] * Math.cos(yaw)
  const z1 = p[2]
  // Inclinación: el eje y1 se aleja del observador, z sube en pantalla
  const yScreen = z1 * Math.cos(pitch) - y1 * Math.sin(pitch)
  const depth = z1 * Math.sin(pitch) + y1 * Math.cos(pitch)
  return { x: x1, y: yScreen, depth }
}

export const add3 = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const scale3 = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s]
export const dot3 = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
