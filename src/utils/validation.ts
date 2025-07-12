import { REGEX_PATTERNS } from './constants'

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
    return REGEX_PATTERNS.EMAIL.test(email)
}

export const isValidPhone = (phone: string): boolean => {
    return REGEX_PATTERNS.PHONE.test(phone)
}

/**
 * Validate wallet address
 */
export const isValidWalletAddress = (address: string): boolean => {
    return REGEX_PATTERNS.WALLET_ADDRESS.test(address)
}

export const isValidAmount = (amount: string | number): boolean => {
    const amountStr = amount.toString()
    if (!REGEX_PATTERNS.AMOUNT.test(amountStr)) return false

    const num = parseFloat(amountStr)
    return num > 0 && num <= 1000000 // Max 1M
}

export const validatePassword = (password: string): {
    isValid: boolean
    errors: string[]
} => {
    const errors: string[] = []

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long')
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter')
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter')
    }

    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number')
    }

    if (!/[!@#$%^&*]/.test(password)) {
        errors.push('Password must contain at least one special character (!@#$%^&*)')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
    if (typeof value === 'string') {
        return value.trim().length > 0
    }
    return value !== null && value !== undefined
}

/**
 * Validate URL
 */
export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}
export const isValidCreditCard = (cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\s/g, '')

    if (!/^\d+$/.test(cleaned)) return false
    if (cleaned.length < 13 || cleaned.length > 19) return false

    // Luhn algorithm
    let sum = 0
    let shouldDouble = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i], 10)

        if (shouldDouble) {
            digit *= 2
            if (digit > 9) digit -= 9
        }

        sum += digit
        shouldDouble = !shouldDouble
    }

    return sum % 10 === 0
}