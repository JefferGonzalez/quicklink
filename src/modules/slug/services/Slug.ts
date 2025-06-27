import { API_URL } from '@/Config'
import { Slug } from '@/modules/slug/schemas/Slug'

export const getSlugs = (page = 0) => {
  const url = new URL(`${API_URL}/slugs`)

  if (page > 0) {
    url.searchParams.append('page', page.toString())
  }

  return fetch(url, {
    credentials: 'include'
  })
}

export const getSlug = (id: string) => {
  return fetch(`${API_URL}/slugs/${id}`, {
    credentials: 'include'
  })
}

export const createSlug = (slug: Slug) => {
  return fetch(`${API_URL}/slugs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(slug),
    credentials: 'include'
  })
}

export const updateSlug = (slugId: string, slug: Slug) => {
  return fetch(`${API_URL}/slugs/${slugId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(slug),
    credentials: 'include'
  })
}

export const deleteSlug = (id: string) => {
  return fetch(`${API_URL}/slugs/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}
