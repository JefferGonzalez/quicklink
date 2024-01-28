import { API_URL } from '@/Config'
import { UrlSlug } from '@/schemas/UrlSlug'

export const getSlugs = () => {
  return fetch(`${API_URL}/api/slugs`, {
    credentials: 'include'
  })
}

export const getSlug = (id: string) => {
  return fetch(`${API_URL}/api/slugs/${id}`, {
    credentials: 'include'
  })
}

export const createSlug = (slug: UrlSlug) => {
  return fetch(`${API_URL}/api/slugs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(slug),
    credentials: 'include'
  })
}

export const updateSlug = (slugId: string, slug: UrlSlug) => {
  return fetch(`${API_URL}/api/slugs/${slugId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(slug),
    credentials: 'include'
  })
}

export const deleteSlug = (id: string) => {
  return fetch(`${API_URL}/api/slugs/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}
