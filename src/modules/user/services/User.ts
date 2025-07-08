import { API_URL } from '@/Config'
import { User } from '@/modules/user/schemas/User'

export const getUserProfile = () => {
  return fetch(`${API_URL}/users/profile`, {
    credentials: 'include'
  })
}

export const patchUserProfile = (data: User) => {
  return fetch(`${API_URL}/users/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })
}

export const deleteUserProfile = () => {
  return fetch(`${API_URL}/users/profile`, {
    method: 'DELETE',
    credentials: 'include'
  })
}

export const getLogout = () => {
  return fetch(`${API_URL}/auth/logout`, {
    credentials: 'include'
  })
}
