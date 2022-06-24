import { Flex, Heading, IconButton, Tooltip } from '@chakra-ui/react'

import { CopyToClipboardIc } from 'components/Icons'

type Props = {
  roomName: string
  copyCode: VoidFunction
}

const GameHeader = ({ roomName, copyCode }: Props) => {
  return (
    <>
      <Flex direction='row' gap={2} alignItems='center'>
        <Tooltip label='Copy code'>
          <IconButton
            aria-label='Copy code'
            fontWeight='semibold'
            background='transparent'
            icon={<CopyToClipboardIc />}
            onClick={copyCode}
          />
        </Tooltip>
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
      </Flex>
    </>
  )
}

export default GameHeader
