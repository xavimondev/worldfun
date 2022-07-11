import { User } from '@supabase/supabase-js'

export interface Profile {
  id?: string
  userId: User['id']
  fullName: string
  email: string
  avatar: string
  createdAt?: Date
}
