import { supabase } from 'services'
import { Room } from 'types/room'

export const saveRoom = async (room: Room) => {
  const { data, error } = await supabase.from('Room').insert(room, { returning: 'minimal' })
  if (error) {
    console.log(error)
    return null
  }
  return data
}
