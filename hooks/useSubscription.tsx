import { useEffect, useState } from 'react'

// Realtime
import io, { Socket } from 'socket.io-client'
import { ClienteToServerEvents } from 'types/realtime'
import { REALTIME_SERVER } from 'config/game'
import { Profile } from 'types/user'

let socket: Socket<ClienteToServerEvents> | null = null

const useSubscription = (participant: Profile, roomId: string | undefined) => {
  const [listParticipants, setListParticipants] = useState<Profile[]>([])

  useEffect(() => {
    const socketData = {
      user: participant,
      room: roomId
    }
    socket = io(REALTIME_SERVER, {
      extraHeaders: {
        'x-data': JSON.stringify(socketData)
      }
    })
  }, [])

  useEffect(() => {
    if (!socket) return

    // Listening for upcoming participants
    socket.on('newParticipantJoined', (newParticipant: Profile) => {
      // console.log(`Listen for new participant: ${JSON.stringify(newParticipant)}`)
      setListParticipants((prevParticipants) => [...prevParticipants, newParticipant])
    })

    // Listening for participants are connected
    socket.on('sendParticipants', (participantsConnected: Profile[]) => {
      // console.log(`Participants already connected: ${participantsConnected}`)
      const currentParticipant = { ...participant }
      setListParticipants([currentParticipant, ...participantsConnected])
    })

    socket.on('participantLeft', (participantDisconnected: Profile) => {
      setListParticipants((prevParticipants) =>
        prevParticipants.filter((par) => par.userId !== participantDisconnected.userId)
      )
    })

    return () => {
      socket?.off('newParticipantJoined')
      socket?.off('sendParticipants')
      socket?.off('participantLeft')
      socket?.disconnect()
    }
  }, [])

  return {
    listParticipants
  }
}

export default useSubscription
