import { API_URL } from '@/Config'
import { Profile } from '@/schemas/Profile'

export const getUser = () => {
  return fetch(`${API_URL}/api/users/profile`, {
    credentials: 'include'
  })
}

export const updateUserProfile = (data: Profile) => {
  return fetch(`${API_URL}/api/users/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })
}

export const signOut = () => {
  return fetch(`${API_URL}/auth/logout`, {
    credentials: 'include'
  })
}
