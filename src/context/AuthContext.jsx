import React, { createContext, useState, useContext, useEffect } from 'react'
import { refreshToken, getUserInfo } from '../services/auth.service'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Проверяем наличие refresh token в куках
        const refreshTokenExists = document.cookie
          .split('; ')
          .some(row => row.startsWith('refreshToken='))

        if (refreshTokenExists) {
          // Получаем новый access token
          const { access_token } = await refreshToken()
          setAccessToken(access_token)

          // Получаем информацию о пользователе
          const userInfo = await getUserInfo(access_token)
          setUserInfo(userInfo)
        }
      } catch (error) {
        console.error('Authentication initialization failed:', error)
        // Можно добавить редирект на страницу логина при ошибке
        // window.location.href = '/login'
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  if (loading) {
    return <div>Loading...</div> // или ваш компонент загрузки
  }

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
