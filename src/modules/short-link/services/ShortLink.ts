import { API_URL } from '@/Config'
import { ShortLink } from '@/modules/short-link/schemas/ShortLink'

export const getShortLinks = (page = 1) => {
  const url = new URL(`${API_URL}/short-links`)

  if (page > 0) {
    url.searchParams.append('page', page.toString())
  }

  return fetch(url, {
    credentials: 'include'
  })
}

export const getShortLinkById = (id: string) => {
  return fetch(`${API_URL}/short-links/${id}`, {
    credentials: 'include'
  })
}

export const getShortLinkBySlug = (slug: string) => {
  return fetch(`${API_URL}/short-links/slug/${slug}`)
}

export const postShortLink = (shortLink: ShortLink) => {
  return fetch(`${API_URL}/short-links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shortLink),
    credentials: 'include'
  })
}

export const patchShortLink = (id: string, shortLink: ShortLink) => {
  return fetch(`${API_URL}/short-links/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shortLink),
    credentials: 'include'
  })
}

export const deleteShortLink = (id: string) => {
  return fetch(`${API_URL}/short-links/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
}
