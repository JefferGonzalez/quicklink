import { deleteShortLink } from '@/modules/short-link/services/ShortLink'

export const removeShortLink = async (
  id: string
): Promise<{ ok: true } | { ok: false; status: number }> => {
  const response = await deleteShortLink(id)

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
