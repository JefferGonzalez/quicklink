import { type UrlSlug } from '@/schemas/UrlSlug'

export interface Slug extends UrlSlug {
  id: string
  created_at: string
}

export interface Info {
  pages: number
}

export interface User {
  name: string
  username: string
  photo: string
}

interface Errors<T> {
  message: string
  path?: [keyof T]
}

export interface Response {
  data?: Slug
  errors: Errors[]
}

export interface Data {
  slugs: Slug[]
  info: Info
}
