import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, getUserInfo } from '../services/auth.service'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('1234')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setAccessToken, setUserInfo } = useAuth()

  const from = location.state?.from?.pathname || '/profile'

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { access_token } = await login(username, password)
      setAccessToken(access_token)

      const userInfo = await getUserInfo(access_token)
      setUserInfo(userInfo)

      // navigate('/profile')
      navigate(from, { replace: true }) // Возвращаем пользователя
    } catch (error) {
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
