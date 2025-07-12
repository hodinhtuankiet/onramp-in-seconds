/**
 * Capitalize first letter
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Convert to title case
 */
export const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
}

/**
 * Convert to camelCase
 */
export const toCamelCase = (str: string): string => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Convert to kebab-case
 */
export const toKebabCase = (str: string): string => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Truncate string
 */
export const truncate = (
    str: string,
    length: number,
    suffix: string = '...'
): string => {
    if (str.length <= length) return str
    return str.slice(0, length - suffix.length) + suffix
}

/**
 * Remove HTML tags
 */
export const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, '')
}

/**
 * Extract initials from name
 */
export const getInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2)
}

/**
 * Generate slug from string
 */
export const generateSlug = (str: string): string => {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Count words in string
 */
export const countWords = (str: string): number => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Escape HTML characters
 */
export const escapeHtml = (str: string): string => {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
}

/**
 * Remove extra whitespace
 */
export const normalizeWhitespace = (str: string): string => {
    return str.replace(/\s+/g, ' ').trim()
}