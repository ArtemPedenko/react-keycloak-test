import axios from 'axios'
import { refreshToken } from './auth.service'
import { useAuth } from '../context/AuthContext.jsx'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use(
  config => {
    const { accessToken } = useAuth()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    const currentPath = window.location.pathname

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { access_token } = await refreshToken()
        const { setAccessToken } = useAuth()
        setAccessToken(access_token)

        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      } catch (refreshError) {
        if (currentPath.startsWith('/profile')) {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
