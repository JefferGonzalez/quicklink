import { type UrlSlug } from '@/schemas/UrlSlug'
export interface User {
  name: string
  username: string
  photo: string
}

interface Errors {
  message: string
  path?: [keyof UrlSlug]
}

export interface Response {
  data?: UrlSlug
  errors: Errors[]
}
