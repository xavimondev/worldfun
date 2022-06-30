import { User } from '@supabase/supabase-js'
import { Room } from './room'

export interface RoomParticipant {
  id?: number
  participantId: User['id']
  roomId: Room['id']
  createdAt?: Date
}
