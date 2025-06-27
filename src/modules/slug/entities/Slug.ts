import { type Slug } from '@/modules/slug/schemas/Slug'

export interface SlugEntity extends Slug {
  id: string
  created_at: string
}
