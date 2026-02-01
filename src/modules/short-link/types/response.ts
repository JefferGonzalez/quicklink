import type { ShortLinkEntity } from '@/modules/short-link/entities/ShortLink'

interface Info {
  pages: number
}

export interface ShortLinksResponse {
  data: ShortLinkEntity[]
  info: Info
}
