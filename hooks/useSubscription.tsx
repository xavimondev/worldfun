import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from 'services'
import { searchProfileByUserId } from 'services/profile'

const useSubscription = () => {
  const [listParticipants, setListParticipants] = useState<any[]>([])

  useEffect(() => {
    const handleInsertSubscription = async (payload: SupabaseRealtimePayload<any>) => {
      const { new: newParticipant } = payload
      const { participantId } = newParticipant
      const profileUser = await searchProfileByUserId(participantId)
      if (profileUser) {
        const [infoParticipant] = profileUser
        console.log('New participant joined the room', infoParticipant)
        setListParticipants((prevParticipants) => [...prevParticipants, infoParticipant])
      }
    }

    const subscription = supabase
      .from('RoomParticipants')
      .on('INSERT', handleInsertSubscription)
      .subscribe((status: string) => {
        console.log(status)
      })

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  return {
    listParticipants,
    setListParticipants
  }
}

export default useSubscription
