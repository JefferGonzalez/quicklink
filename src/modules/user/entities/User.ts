import { User } from '@/modules/user/schemas/User'

export interface UserEntity extends User {
  photo: string
}
