/**
 * Clamp number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Round to specified decimal places
 */
export const roundTo = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Generate random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

/**
 * Generate random integer between min and max (inclusive)
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Check if number is in range
 */
export const inRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max
}

/**
 * Calculate percentage
 */
export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Linear interpolation
 */
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor
}

/**
 * Map value from one range to another
 */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * Check if number is even
 */
export const isEven = (num: number): boolean => {
  return num % 2 === 0
}

/**
 * Check if number is odd
 */
export const isOdd = (num: number): boolean => {
  return num % 2 !== 0
}

/**
 * Convert bytes to human readable format
 */
export const bytesToSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'

  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}