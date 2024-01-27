import { API_URL } from '@/Config'

export const getUser = () => {
  return fetch(`${API_URL}/api/users/profile`, {
    credentials: 'include'
  })
}

export const signOut = () => {
  return fetch(`${API_URL}/auth/logout`, {
    credentials: 'include'
  })
}
