import { Slug } from '@/modules/slug/schemas/Slug';
import { patchSlug } from '@/modules/slug/services/Slug';
import { Errors } from '@/shared/types/errors';

export const updateSlug = async (
  id: string,
  values: Slug
): Promise<
  | { ok: true; slug: string }
  | { ok: false; errors: Errors<Slug>[]; status: number }
> => {
  const response = await patchSlug(id, values)

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
