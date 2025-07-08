import type { SlugEntity } from '@/modules/slug/entities/Slug'

interface Info {
  pages: number
}

export interface SlugsResponse {
  data: SlugEntity[]
  info: Info
}
