import { type ShortLink } from '@/modules/short-link/schemas/ShortLink'

export interface ShortLinkEntity extends ShortLink {
  id: string
  created_at: string
}
