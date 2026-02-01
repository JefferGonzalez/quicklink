import { AuthUser } from '@/shared/types/auth'

export function assertAuthenticated(
  user: AuthUser | undefined
): asserts user is AuthUser {
  if (!user) {
    throw new Error('Security error: user is unexpectedly unauthenticated')
  }
}
