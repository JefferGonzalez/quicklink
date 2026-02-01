import { API_URL } from '@/Config'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  basePath: '/auth',
  baseURL: API_URL
})
