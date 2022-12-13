export const degToRad = (deg: number) => deg * Math.PI / 180
export const sind = (deg: number) => Math.sin(degToRad(deg))
export const cosd = (deg: number) => Math.cos(degToRad(deg))
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}
