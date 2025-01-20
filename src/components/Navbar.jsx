import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { userInfo, accessToken } = useAuth()
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => console.log(userInfo)}>log user info</button>
      <button onClick={() => console.log(accessToken)}>log access token</button>
      <button onClick={() => navigate('/login')}>login</button>
      <button onClick={() => navigate('/profile')}>profile</button>
    </div>
  )
}

export default Profile
