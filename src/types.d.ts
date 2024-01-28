import { type UrlSlug } from '@/schemas/UrlSlug'

export interface Slug extends UrlSlug {
  id: string
  created_at: string
}

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
  data?: Slug
  errors: Errors[]
}
