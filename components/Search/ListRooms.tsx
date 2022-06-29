import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import { Room } from 'types/room'

type RoomProps = {
  room: Room
}

const Room = ({ room }: RoomProps) => {
  const { code, name } = room
  return (
    <ListItem
      padding='4px 10px'
      color='gray.200'
      fontSize='0.9rem'
      _hover={{
        background: '#2D3748',
        borderRadius: '8px'
      }}
    >
      {code} - {name}
    </ListItem>
  )
}

type Props = {
  listRooms: Room[]
}

const ListRooms = ({ listRooms }: Props) => {
  console.log(listRooms)
  return (
    <Box backgroundColor='#181b29' width='100%' borderBottomRadius={5} zIndex={9}>
      {listRooms.length > 0 && (
        <UnorderedList paddingY={4} paddingX={2} spacing={2} styleType='none'>
          {listRooms.map((room) => (
            <Room room={room} />
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

export default ListRooms
