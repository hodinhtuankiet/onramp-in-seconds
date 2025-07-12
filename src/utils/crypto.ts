export const generateRandomString = (length: number = 16): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return result
}

/**
 * Generate UUID v4
 */
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * Simple hash function
 */
export const simpleHash = (str: string): string => {
    let hash = 0
    if (str.length === 0) return hash.toString()

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }

    return hash.toString()
}

/**
 * Encode to Base64
 */
export const encodeBase64 = (str: string): string => {
    try {
        return btoa(unescape(encodeURIComponent(str)))
    } catch (error) {
        console.error('Base64 encoding error:', error)
        return str
    }
}

/**
 * Decode from Base64
 */
export const decodeBase64 = (str: string): string => {
    try {
        return decodeURIComponent(escape(atob(str)))
    } catch (error) {
        console.error('Base64 decoding error:', error)
        return str
    }
}

/**
 * Generate QR code data URL
 */
export const generateQRCodeData = (data: string): string => {
    // This would normally use a QR code library
    // For now, return a placeholder
    return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="white"/>
      <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" fill="black" font-size="12">
        QR: ${data.slice(0, 20)}...
      </text>
    </svg>
  `)}`
}

/**
 * Mask sensitive data
 */
export const maskString = (
    str: string,
    visibleStart: number = 4,
    visibleEnd: number = 4,
    maskChar: string = '*'
): string => {
    if (str.length <= visibleStart + visibleEnd) {
        return str
    }

    const start = str.slice(0, visibleStart)
    const end = str.slice(-visibleEnd)
    const maskLength = str.length - visibleStart - visibleEnd
    const mask = maskChar.repeat(maskLength)

    return `${start}${mask}${end}`
}