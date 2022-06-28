import { useState } from 'react'
import {
  Radio,
  RadioGroup,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Button,
  BoxProps
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { useGame } from 'context/GameContext'
import { useStep } from 'context/StepContext'
import { NextIc } from 'components/Icons'
import InputRoomName from 'components/InputRoomName'

export const MotionBox = motion<BoxProps>(Box)

const ModePanel = () => {
  const [roomName, setRoomName] = useState('')
  const [gameMode, setGameMode] = useState('alone')
  const { step, showPanelDifficulty, setPreferences } = useStep()
  const { setRoom } = useGame()
  const { mode } = step
  if (!mode) return null

  const getRoomNameLenghtWithoutSpaces = () => {
    return roomName.replaceAll(' ', '').length
  }

  const handleModeChange = () => {
    const isFieldAllow = getRoomNameLenghtWithoutSpaces() > 4
    if (isFieldAllow) {
      setRoom((prevValue) => ({ ...prevValue, name: roomName }))
      showPanelDifficulty()
      setPreferences((prevPreferences: any) => ({ ...prevPreferences, mode: gameMode }))
    }
  }

  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        width={{
          base: 'full',
          md: '500px'
        }}
      >
        <InputRoomName
          roomName={roomName}
          setRoomName={setRoomName}
          getRoomNameLenghtWithoutSpaces={getRoomNameLenghtWithoutSpaces}
        />
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
            Choose Mode
          </FormLabel>
          <RadioGroup name='mode' id='mode' onChange={setGameMode} value={gameMode}>
            <HStack spacing='34px'>
              <Radio size='lg' value='alone'>
                Alone
              </Radio>
              <Radio size='lg' value='multiplayer'>
                Multiplayer
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button
          w='auto'
          bg='blue.400'
          color='white'
          rightIcon={<NextIc />}
          float='right'
          isDisabled={getRoomNameLenghtWithoutSpaces() < 4}
          onClick={handleModeChange}
        >
          NEXT
        </Button>
      </MotionBox>
    </AnimatePresence>
  )
}

export default ModePanel
