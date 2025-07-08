import { Slug } from '@/modules/slug/schemas/Slug'
import { postFreeSlug, postSlug } from '@/modules/slug/services/Slug'
import { Errors } from '@/shared/types/errors'

export const createSlug = async (
  values: Slug
): Promise<
  | { ok: true; slug: string }
  | { ok: false; errors: Errors<Slug>[]; status: number }
> => {
  const response = await postSlug(values)

  const json = await response.json()

  if (!response.ok) {
    const errors: Errors<Slug>[] = json.errors || []

    return {
      ok: false,
      errors,
      status: response.status
    }
  }

  return {
    ok: true,
    slug: values.slug
  }
}

export const createFreeSlug = async (
  values: Slug
): Promise<
  | { ok: true; slug: string }
  | { ok: false; errors: Errors<Slug>[]; status: number }
> => {
  const response = await postFreeSlug(values)

  const json = await response.json()

  if (!response.ok) {
    const errors: Errors<Slug>[] = json.errors || []

    return {
      ok: false,
      errors,
      status: response.status
    }
  }

  return {
    ok: true,
    slug: values.slug
  }
}
