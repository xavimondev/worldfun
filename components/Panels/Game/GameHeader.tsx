import { Heading } from '@chakra-ui/react'

type Props = {
  roomName: string
}

const GameHeader = ({ roomName }: Props) => {
  return (
    <>
      <Heading
        fontWeight='bold'
        fontSize={{
          base: 'xl',
          md: '2xl',
          lg: '3xl'
        }}
      >
        {roomName}
      </Heading>
    </>
  )
}

export default GameHeader
