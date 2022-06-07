import { useRouter } from 'next/router'
import { IconButton } from '@chakra-ui/react'

import { ExitIc } from 'components/Icons'

const ExitGameButton = () => {
  const router = useRouter()

  const handleExit = () => {
    router.push('/')
  }

  return (
    <IconButton
      aria-label='Exit game'
      icon={<ExitIc />}
      size='lg'
      backgroundColor='red.500'
      variant='solid'
      onClick={handleExit}
    />
  )
}

export default ExitGameButton
