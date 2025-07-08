import { SlugEntity } from '@/modules/slug/entities/Slug'
import {
  getSlug,
  getSlugs,
  getSlugWithAuth
} from '@/modules/slug/services/Slug'
import { SlugsResponse } from '@/modules/slug/types/response'

export const getAllSlugs = async (
  page = 0
): Promise<
  { ok: true; data: SlugsResponse } | { ok: false; status: number }
> => {
  const response = await getSlugs(page)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const data: SlugsResponse = await response.json()

  return {
    ok: true,
    data
  }
}

export const getSlugById = async (
  id: string
): Promise<{ ok: true; data: SlugEntity } | { ok: false; status: number }> => {
  const response = await getSlugWithAuth(id)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const json = await response.json()

  return {
    ok: true,
    data: json.data as SlugEntity
  }
}

export const getURLBySlug = async (
  id: string
): Promise<{ ok: true; data: SlugEntity } | { ok: false; status: number }> => {
  const response = await getSlug(id)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const json = await response.json()

  return {
    ok: true,
    data: json.data as SlugEntity
  }
}
