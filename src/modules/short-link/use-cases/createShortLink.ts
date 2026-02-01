import { ShortLink } from '@/modules/short-link/schemas/ShortLink'
import { postShortLink } from '@/modules/short-link/services/ShortLink'
import { Errors } from '@/shared/types/errors'

export const createShortLink = async (
  values: ShortLink
): Promise<
  | { ok: true; slug: string }
  | { ok: false; errors: Errors<ShortLink>[]; status: number }
> => {
  const response = await postShortLink(values)

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
