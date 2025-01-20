import axios from 'axios'
import { KEYCLOAK_CONFIG } from '../config/keycloak.config'

const getTokenEndpoint = () =>
  `${KEYCLOAK_CONFIG.url}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`

const getUserInfoEndpoint = () =>
  `${KEYCLOAK_CONFIG.url}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/userinfo`

export const login = async (username, password) => {
  const params = new URLSearchParams()
  params.append('client_id', KEYCLOAK_CONFIG.clientId)
  params.append('grant_type', 'password')
  params.append('username', username)
  params.append('password', password)
  params.append('scope', 'openid profile')

  const response = await axios.post(getTokenEndpoint(), params)

  // Сохраняем refresh token в httpOnly cookie
  document.cookie = `refreshToken=${response.data.refresh_token}; path=/; secure; samesite=strict;`

  return response.data
}

export const refreshToken = async () => {
  const refreshToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('refreshToken='))
    ?.split('=')[1]

  if (!refreshToken) {
    throw new Error('No refresh token found')
  }

  const params = new URLSearchParams()
  params.append('client_id', KEYCLOAK_CONFIG.clientId)
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', refreshToken)

  const response = await axios.post(getTokenEndpoint(), params)

  document.cookie = `refreshToken=${response.data.refresh_token}; path=/;`

  return response.data
}

export const getUserInfo = async accessToken => {
  const response = await axios.get(getUserInfoEndpoint(), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}
