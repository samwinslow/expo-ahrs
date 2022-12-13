export const degToRad = (deg: number) => deg * Math.PI / 180
export const radToDeg = (rad: number) => rad * 180 / Math.PI
export const sind = (deg: number) => Math.sin(degToRad(deg))
export const cosd = (deg: number) => Math.cos(degToRad(deg))

export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export const minmax = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)
export const roundToNearestMultiple = (value: number, multiple: number) =>
  Math.round(value / multiple) * multiple
export const formatDegrees = (value: number) =>
  `${Math.round(value)}`.padStart(3, '0')
export const formatFeet = (value: number) => {
  const feet = `${value.toFixed(0).padStart(5, '0')}`
  return `${feet.slice(0, 2)} ${feet.slice(2)}`
}
