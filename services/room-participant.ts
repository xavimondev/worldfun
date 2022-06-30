import { RoomParticipant } from 'types/room-participant'
import { RealtimeSubscription, User } from '@supabase/supabase-js'
import { supabase } from 'services'
import { Room } from 'types/room'
import { SupabaseRealtimeClient } from '@supabase/supabase-js/dist/module/lib/SupabaseRealtimeClient'

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
  console.log(clientRealTime)
  // return clientRealTime
}

export const removeSubscription = () => supabase.removeSubscription(clientRealTime)