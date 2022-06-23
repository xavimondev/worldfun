import React, { Dispatch, SetStateAction } from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { CheckIc } from 'components/Icons'

type Props = {
  roomName: string
  setRoomName: Dispatch<SetStateAction<string>>
  getRoomNameLenghtWithoutSpaces: () => number
}

const InputRoomName = ({ roomName, setRoomName, getRoomNameLenghtWithoutSpaces }: Props) => {
  return (
    <FormControl mb='48px'>
      <FormLabel
        as='legend'
        fontWeight='bold'
        fontSize={{
          base: '2xl',
          md: '5xl'
        }}
        color='blue.400'
        mb={8}
      >
        Room's name
      </FormLabel>
      <InputGroup>
        <Input
          placeholder='Please enter the rooms name'
          name='roomName'
          value={roomName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => setRoomName(e.currentTarget.value)}
        />
        {getRoomNameLenghtWithoutSpaces() > 4 && (
          <InputRightElement children={<CheckIc color='#38A169' width={25} height={25} />} />
        )}
      </InputGroup>
    </FormControl>
  )
}

export default InputRoomName
