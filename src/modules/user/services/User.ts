import { User } from '@/modules/user/schemas/User'
import { authClient } from '@/shared/lib/authClient'

export const updateUser = async (values: User) => {
  const { error } = await authClient.updateUser(values)

  if (error) return { ok: false, error: error.message }

  return { ok: true }
}

export const deleteAccount = async () => {
  const { error } = await authClient.deleteUser()

  if (error) return { ok: false, error: error.message }

  return { ok: true }
}
