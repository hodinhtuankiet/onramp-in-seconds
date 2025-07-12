/**
 * Format number as currency
 */
export const formatCurrency = (
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount)
}

/**
 * Format number with commas
 */
export const formatNumber = (
    value: number,
    decimals: number = 2
): string => {
    return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    })
}

/**
 * Format wallet address
 */
export const formatWalletAddress = (
    address: string,
    prefixLength: number = 8,
    suffixLength: number = 8
): string => {
    if (!address) return ''
    if (address.length <= prefixLength + suffixLength) return address

    return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
}

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Format percentage
 */
export const formatPercentage = (
    value: number,
    decimals: number = 2
): string => {
    return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Format crypto amount
 */
export const formatCryptoAmount = (
    amount: number,
    symbol: string,
    decimals: number = 6
): string => {
    return `${amount.toFixed(decimals)} ${symbol}`
}

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`
    }

    return phone
}