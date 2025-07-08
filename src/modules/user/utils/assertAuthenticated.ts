import { UserEntity } from '@/modules/user/entities/User'

export function assertAuthenticated(
  user: UserEntity | undefined
): asserts user is UserEntity {
  if (!user) {
    throw new Error('Security error: user is unexpectedly unauthenticated')
  }
}
