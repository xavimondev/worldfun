import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { supabase } from 'services'
import { savePreferencesGame } from 'services/game'
import { saveRoom } from 'services/room'
import { saveParticipant } from 'services/room-participant'
import { Room } from 'types/room'
import { useStep } from './StepContext'

type GameState = {
  room: Room
  setRoom: Dispatch<SetStateAction<Room>>
  saveRoomOnDatabase: () => Promise<void>
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
    saveRoomOnDatabase
  }
  return <GameContext.Provider value={valuesContext}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (context === undefined) throw new Error('useGame must be used within a GameProvider')
  return context
}
