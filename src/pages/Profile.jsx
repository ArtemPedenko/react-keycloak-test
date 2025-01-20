import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'

const Profile = () => {
  const { userInfo } = useAuth()

  if (!userInfo) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userInfo.preferred_username}</p>
      <p>Email: {userInfo.email}</p>
      <p>Roles: {userInfo.realm_access?.roles.join(', ')}</p>
    </div>
  )
}

export default Profile
