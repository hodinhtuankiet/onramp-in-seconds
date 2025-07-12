import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'

interface ApiResponse<T = any> {
    data: T
    message?: string
    success: boolean
    status: number
}

class AxiosClient {
    private instance: AxiosInstance

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.lazian.com',
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })

        this.setupInterceptors()
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Add auth token if available
                const token = this.getAuthToken()
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                if (import.meta.env.DEV) {
                    console.log('API Request:', {
                        method: config.method?.toUpperCase(),
                        url: config.url,
                        data: config.data,
                        headers: config.headers
                    })
                }

                return config
            },
            (error: AxiosError) => {
                console.error('Request Error:', error)
                return Promise.reject(error)
            }
        )

        // Response interceptor
        this.instance.interceptors.response.use(
            (response: AxiosResponse<ApiResponse>) => {
                if (import.meta.env.DEV) {
                    console.log('API Response:', {
                        status: response.status,
                        data: response.data,
                        url: response.config.url
                    })
                }

                return response
            },
            (error: AxiosError<ApiResponse>) => {
                if (error.response) {
                    const { status, data } = error.response

                    if (status === 401) {
                        this.clearAuthToken()
                        console.warn('Unauthorized - Token cleared')
                    }

                    console.error('API Error:', {
                        status,
                        message: data?.message,
                        url: error.config?.url
                    })

                    return Promise.reject({
                        status,
                        message: data?.message || 'An error occurred',
                        data: data?.data
                    })
                } else if (error.request) {
                    // Network error
                    console.error('Network Error:', error.message)
                    return Promise.reject({
                        status: 0,
                        message: 'Network error - please check your connection',
                        data: null
                    })
                } else {
                    console.error('Unknown Error:', error.message)
                    return Promise.reject({
                        status: 0,
                        message: error.message || 'An unknown error occurred',
                        data: null
                    })
                }
            }
        )
    }

    private getAuthToken(): string | null {
        return localStorage.getItem('auth_token')
    }

    private clearAuthToken(): void {
        localStorage.removeItem('auth_token')
    }

    // Public methods
    setAuthToken(token: string): void {
        localStorage.setItem('auth_token', token)
    }

    get<T = any>(url: string, config = {}): Promise<AxiosResponse<ApiResponse<T>>> {
        return this.instance.get(url, config)
    }

    post<T = any>(url: string, data = {}, config = {}): Promise<AxiosResponse<ApiResponse<T>>> {
        return this.instance.post(url, data, config)
    }

    put<T = any>(url: string, data = {}, config = {}): Promise<AxiosResponse<ApiResponse<T>>> {
        return this.instance.put(url, data, config)
    }

    patch<T = any>(url: string, data = {}, config = {}): Promise<AxiosResponse<ApiResponse<T>>> {
        return this.instance.patch(url, data, config)
    }

    delete<T = any>(url: string, config = {}): Promise<AxiosResponse<ApiResponse<T>>> {
        return this.instance.delete(url, config)
    }
}

const axiosClient = new AxiosClient()
export default axiosClient