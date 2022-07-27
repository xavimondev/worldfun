import { useGame } from 'context/GameContext'
import { useEffect } from 'react'

const useRoom = (roomCode: string) => {
  const { checkRoomExists, setRoom } = useGame()

  useEffect(() => {
    checkRoomExists(roomCode).then((room) => {
      setRoom(room)
    })
  }, [])
}

export default useRoom
