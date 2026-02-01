import { ShortLink } from '@/modules/short-link/schemas/ShortLink'
import { patchShortLink } from '@/modules/short-link/services/ShortLink'
import { Errors } from '@/shared/types/errors'

export const updateShortLink = async (
  id: string,
  values: ShortLink
): Promise<
  | { ok: true; slug: string }
  | { ok: false; errors: Errors<ShortLink>[]; status: number }
> => {
  const response = await patchShortLink(id, values)

  const json = await response.json()

  if (!response.ok) {
    const errors: Errors<ShortLink>[] = json.errors || []

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
