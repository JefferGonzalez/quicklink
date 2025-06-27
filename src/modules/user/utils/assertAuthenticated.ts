import { User } from '@/modules/user/entities/User'

export function assertAuthenticated(
  user: User | undefined
): asserts user is User {
  if (!user) {
    throw new Error('Security error: user is unexpectedly unauthenticated')
  }
}
