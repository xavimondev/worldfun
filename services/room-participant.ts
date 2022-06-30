import { RoomParticipant } from 'types/room-participant'
import { User } from '@supabase/supabase-js'
import { supabase } from 'services'
import { Room } from 'types/room'

/**
 *
 * @param participantId - Represents current user logged in
 * @param roomId - Represents room where users is going to play
 */
export const saveParticipant = async (participantId: User['id'], roomId: Room['id']) => {
  const { data, error } = await supabase
    .from<RoomParticipant>('RoomParticipants')
    .insert({ participantId, roomId })

  if (error) {
    console.error(error)
    return null
  }
  return data
}
