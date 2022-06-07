import { Flex, Text } from '@chakra-ui/react'

import { RoomLoaderAnimateIc } from 'components/Icons'
import HeaderSeo from 'components/Seo/HeaderSeo'

type Props = {
  roomName: string
}

const RoomLoader = ({ roomName }: Props) => {
  return (
    <>
      <HeaderSeo
        title={`Setting up ${roomName} room`}
        content={`Please wait a few seconds while we connect you to ${roomName}`}
      />
      <Flex minH='100vh' align='center' justify='center' direction='column' gap={4}>
        <Text
          fontSize={{
            base: 'xl',
            md: '4xl'
          }}
          fontWeight='bold'
        >
          Connecting to the room
        </Text>
        <Text
          color='red.400'
          fontSize={{
            base: 'md',
            md: '2xl'
          }}
        >
          {roomName}
        </Text>
        <RoomLoaderAnimateIc width='100px' height='100px' />
      </Flex>
    </>
  )
}

export default RoomLoader
