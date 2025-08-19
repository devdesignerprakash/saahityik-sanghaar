import axios from 'axios'
import { toast } from 'react-toastify'

const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

// Request interceptor
http.interceptors.request.use(
    (config) => {
        // Get token from localStorage or sessionStorage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        
        // If token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token.trim()}`
        }
        
        return config
    },
    (error) => {
        // Handle request error
        return Promise.reject(error)
    }
)

// Response interceptor
http.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response) {
            // Server responded with a status code that falls out of the range of 2xx
            const { status, data } = error.response
            
            switch (status) {
                case 401:
                    // Unauthorized - token might be invalid or expired
                    toast.error('Session expired. Please log in again.')
                    // Clear token from storage
                    localStorage.removeItem('authToken')
                    sessionStorage.removeItem('authToken')
                    // Redirect to login page
                    window.location.href = '/login'
                    break
                case 403:
                    // Forbidden - user doesn't have permission
                    toast.error('You do not have permission to perform this action.')
                    break
                case 404:
                    // Not found
                    toast.error('Requested resource not found.')
                    break
                case 500:
                    // Internal server error
                    toast.error('Internal server error. Please try again later.')
                    break
                default:
                    // Other errors
                    toast.error(data?.message || 'An error occurred. Please try again.')
                    break
            }
        } else if (error.request) {
            // The request was made but no response was received
            toast.error('Network error. Please check your connection.')
        } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('An error occurred. Please try again.')
        }
        
        return Promise.reject(error)
    }
)

export default http
