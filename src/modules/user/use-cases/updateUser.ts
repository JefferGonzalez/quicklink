import { User } from '@/modules/user/schemas/User'
import { patchUserProfile } from '@/modules/user/services/User'
import { Errors } from '@/shared/types/errors'

export const updateUser = async (
  values: User
): Promise<
  { ok: true } | { ok: false; errors: Errors<User>[]; status: number }
> => {
  const response = await patchUserProfile(values)

  const json = await response.json()

  if (!response.ok) {
    const errors: Errors<User>[] = json.errors || []

    return {
      ok: false,
      errors,
      status: response.status
    }
  }

  return {
    ok: true
  }
}
