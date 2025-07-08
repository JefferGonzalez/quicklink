import { getLogout } from '@/modules/user/services/User'

export const signOut = async () => {
  const response = await getLogout()

  return {
    ok: response.ok
  }
}
