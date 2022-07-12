import { useEffect, useState } from 'react'
import { supabase } from 'services'
import { searchProfileByUserId } from 'services/profile'

const useSubscription = () => {
  const [listParticipants, setListParticipants] = useState<any[]>([])

  useEffect(() => {
    const subscription = supabase
      .from('RoomParticipants')
      .on('INSERT', async (payload) => {
        const { new: newParticipant } = payload
        const { participantId } = newParticipant
        const profileUser = await searchProfileByUserId(participantId)
        if (profileUser) {
          const [infoParticipant] = profileUser

          console.log('New participant joined the room', infoParticipant)
          setListParticipants((prevParticipants) => [...prevParticipants, infoParticipant])
        }
      })
      .subscribe()

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
