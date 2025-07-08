import { deleteSlug } from '@/modules/slug/services/Slug'

export const removeSlug = async (
  id: string
): Promise<{ ok: true } | { ok: false; status: number }> => {
  const response = await deleteSlug(id)

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  return {
    ok: true
  }
}
