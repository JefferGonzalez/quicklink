import { deleteUserProfile } from '@/modules/user/services/User'

export const deleteAccount = async (): Promise<{
  ok: boolean
  status: number
}> => {
  const response = await deleteUserProfile()

  return {
    ok: response.ok,
    status: response.status
  }
}
