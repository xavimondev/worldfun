import { Profile } from './user'

export interface ClienteToServerEvents {
  sendParticipants: (participants: Array<Profile>) => void
  newParticipantJoined: (participant: Profile) => void
  participantLeft: (participant: Profile) => void
}
