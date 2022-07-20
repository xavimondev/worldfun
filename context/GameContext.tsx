import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { supabase } from 'services'
import { savePreferencesGame } from 'services/game'
import { getRoomByCode, saveRoom } from 'services/room'
import { getTotalParticipantsByRoom, saveParticipant } from 'services/room-participant'
import { Room } from 'types/room'
import { useStep } from './StepContext'

// Socket
import io, { Socket } from 'socket.io-client'

const REALTIME_SERVER = process.env.REALTIME_SERVER || 'http://localhost:4000'
const socket = io(REALTIME_SERVER)

type GameState = {
  room: Room
  setRoom: Dispatch<SetStateAction<Room>>
  checkRoomExists: (code: string) => Promise<Room | undefined>
  socket: Socket
}

const GameContext = createContext<GameState | undefined>(undefined)

type Props = {
  children: JSX.Element
}

const roomInitialValue = {
  name: '',
  code: ''
}

export const GameProvider = ({ children }: Props) => {
  const [room, setRoom] = useState<Room>(roomInitialValue)
  const { preferences } = useStep()

  const checkRoomExists = async (code: string) => {
    const result = await getRoomByCode(code)
    if (!result) return

    if (result.length === 0) {
      saveRoomOnDatabase()
      return
    }

    const roomFound = result[0]

    const { id: roomId } = roomFound

    const totalCurrentParticipants = await getTotalParticipantsByRoom(roomId)

    if (totalCurrentParticipants && totalCurrentParticipants < 2)
      await saveParticipantOnDatabase(roomId)

    return roomFound
  }

  const saveRoomOnDatabase = async () => {
    if (room) {
      const { code, name } = room
      const data: Room = {
        code,
        name
      }
      const result = await saveRoom(data)
      if (result) {
        const { id } = result[0]
        await savePreferencesGameOnDatabase(id)
        await saveParticipantOnDatabase(id)
      }
    }
  }

  const savePreferencesGameOnDatabase = async (roomId: Room['id']) => {
    const { categoryName, mode, difficulty } = preferences
    const gamePreferences = {
      difficulty,
      category: categoryName,
      mode,
      roomId
    }
    // Save preferences of database
    await savePreferencesGame(gamePreferences)
  }

  const saveParticipantOnDatabase = async (roomId: Room['id']) => {
    const participantId = supabase.auth.user()?.id
    // It's unlikely that in this part participantId is null
    await saveParticipant(participantId!, roomId)
  }

  const valuesContext = {
    room,
    setRoom,
    checkRoomExists,
    socket
  }
  return <GameContext.Provider value={valuesContext}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (context === undefined) throw new Error('useGame must be used within a GameProvider')
  return context
}
