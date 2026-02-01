import { ShortLinkEntity } from '@/modules/short-link/entities/ShortLink'
import {
  getShortLinkById as getShortLink,
  getShortLinkBySlug,
  getShortLinks
} from '@/modules/short-link/services/ShortLink'
import { ShortLinksResponse } from '@/modules/short-link/types/response'

export const getAllShortLinks = async (
  page = 0
): Promise<
  { ok: true; data: ShortLinksResponse } | { ok: false; status: number }
> => {
  const response = await getShortLinks(page)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const data: ShortLinksResponse = await response.json()

  return {
    ok: true,
    data
  }
}

export const getShortLinkById = async (
  id: string
): Promise<
  { ok: true; data: ShortLinkEntity } | { ok: false; status: number }
> => {
  const response = await getShortLink(id)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const json = await response.json()

  return {
    ok: true,
    data: json.data as ShortLinkEntity
  }
}

export const getURLBySlug = async (
  slug: string
): Promise<
  { ok: true; data: ShortLinkEntity } | { ok: false; status: number }
> => {
  const response = await getShortLinkBySlug(slug)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const json = await response.json()

  return {
    ok: true,
    data: json.data as ShortLinkEntity
  }
}
