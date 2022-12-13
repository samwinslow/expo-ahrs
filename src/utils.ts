export const sind = (deg: number) => Math.sin(deg * Math.PI / 180)
export const cosd = (deg: number) => Math.cos(deg * Math.PI / 180)
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}
