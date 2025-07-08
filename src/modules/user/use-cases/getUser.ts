import { UserEntity } from '@/modules/user/entities/User'
import { getUserProfile } from '@/modules/user/services/User'

export const loadUserProfile = async (): Promise<
  { ok: true; data: UserEntity } | { ok: false; status: number }
> => {
  const response = await getUserProfile()

  if (!response.ok) {
    return {
      ok: false,
      status: response.status
    }
  }

  const json = await response.json()

  return {
    ok: true,
    data: json.data as UserEntity
  }
}
