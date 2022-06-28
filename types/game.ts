import { Room } from './room'

export interface Game {
  id?: number
  difficulty: string
  category: string
  mode: string
  roomId: Room['id']
  createdAt?: Date
}
