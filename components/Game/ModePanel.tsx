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

import { useStep } from 'context/StepContext'
import { NextIc } from 'components/Icons'

export const MotionBox = motion<BoxProps>(Box)

const ModePanel = () => {
  const { step, showPanelDifficulty } = useStep()
  const { mode } = step
  if (!mode) return null

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
          <RadioGroup name='mode' id='mode'>
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
          onClick={showPanelDifficulty}
        >
          NEXT
        </Button>
      </MotionBox>
    </AnimatePresence>
  )
}

export default ModePanel
