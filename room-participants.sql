CREATE TABLE "RoomParticipants" (
  id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  participantId uuid REFERENCES auth.users (id) ON DELETE CASCADE,
  roomId int REFERENCES public."Room" (id) ON DELETE CASCADE,
  createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NOT NULL
)