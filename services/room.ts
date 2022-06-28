import { supabase } from 'services'
import { Room } from 'types/room'

export const saveRoom = async (room: Room) => {
  const { data, error } = await supabase.from<Room>('Room').insert(room)
  if (error) {
    console.log(error)
    return null
  }
  return data
}
