/**
 * Detect user agent information
 */
export const getUserAgent = () => {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine
  }
}

/**
 * Detect if mobile device
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Detect if tablet device
 */
export const isTablet = (): boolean => {
  return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent)
}

/**
 * Detect if desktop device
 */
export const isDesktop = (): boolean => {
  return !isMobile() && !isTablet()
}

/**
 * Detect if iOS device
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

/**
 * Detect if Android device
 */
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent)
}

/**
 * Get screen size information
 */
export const getScreenInfo = () => {
  return {
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    pixelRatio: window.devicePixelRatio || 1
  }
}

/**
 * Get viewport size
 */
export const getViewportSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

/**
 * Check if device supports touch
 */
export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Check if device supports Face ID/Touch ID
 */
export const supportsBiometrics = (): boolean => {
  return 'credentials' in navigator && 'create' in navigator.credentials
}

/**
 * Detect browser type
 */
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase()

  if (userAgent.includes('chrome')) return 'Chrome'
  if (userAgent.includes('firefox')) return 'Firefox'
  if (userAgent.includes('safari')) return 'Safari'
  if (userAgent.includes('edge')) return 'Edge'
  if (userAgent.includes('opera')) return 'Opera'

  return 'Unknown'
}