import { RoomParticipant } from 'types/room-participant'
import { RealtimeSubscription, User } from '@supabase/supabase-js'
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

let clientRealTime: RealtimeSubscription

export const listenNewParticipants = () => {
  clientRealTime = supabase
    .from('RoomParticipants')
    .on('INSERT', (payload) => {
      console.log('Change received!', payload)
    })
    .subscribe()
  // return clientRealTime
}

export const removeSubscription = async () => {
  if (clientRealTime) {
    await supabase.removeSubscription(clientRealTime)
  }
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
