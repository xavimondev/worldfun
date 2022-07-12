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

export const getTotalParticipantsByRoom = async (roomId: Room['id']) => {
  const { count, error } = await supabase
    .from<RoomParticipant>('RoomParticipants')
    .select('participantId', { count: 'exact' })
    .eq('roomId', roomId)

  if (error) {
    console.error(error)
    return null
  }
  return count
}

export const getParticipantsByRoom = async (roomId: Room['id'], participantId: string) => {
  const { data, error } = await supabase.rpc('getParticipantsByRoom', {
    room_id: roomId,
    participant_id: participantId
  })
  if (error) {
    console.error(error)
    return null
  }
  return data
}
