import { API_URL } from '@/Config'

export const getSlugs = () => {
  return fetch(`${API_URL}/api/slugs`, {
    credentials: 'include'
  })
}
