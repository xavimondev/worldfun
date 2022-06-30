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

export const filterRoomsByCode = async (code: string) => {
  const { data, error } = await supabase
    .from<Room>('Room')
    .select('id,name,code')
    .ilike('code', `%${code}%`)

  if (error) {
    console.log(error)
    return null
  }
  return data
}

export const getRoomByCode = async (code: string) => {
  const { data, error } = await supabase.from<Room>('Room').select('id,name,code').eq('code', code)

  if (error) {
    console.log(error)
    return null
  }
  return data
}
