import {
  Radio,
  RadioGroup,
  HStack,
  Box,
  FormControl,
  FormLabel,
  Button,
  BoxProps,
  Flex
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { useStep } from 'context/StepContext'
import { NextIc, PreviousIc } from 'components/Icons'

export const MotionBox = motion<BoxProps>(Box)

const DifficultyPanel = () => {
  const { step, showPanelCategory, showPanelMode } = useStep()
  const { difficulty } = step
  // console.log(mode)
  if (!difficulty) return null

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
            Choose Difficulty
          </FormLabel>
          <RadioGroup name='difficulty' id='difficulty'>
            <HStack spacing='34px'>
              <Radio size='lg' value='easy'>
                Easy
              </Radio>
              <Radio size='lg' value='medium'>
                Medium
              </Radio>
              <Radio size='lg' value='hard'>
                Hard
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Flex direction='row' justifyContent='space-between'>
          <Button
            w='auto'
            bg='blue.400'
            color='white'
            leftIcon={<PreviousIc />}
            onClick={showPanelMode}
          >
            PREVIOUS
          </Button>
          <Button
            w='auto'
            bg='blue.400'
            color='white'
            rightIcon={<NextIc />}
            onClick={showPanelCategory}
          >
            NEXT
          </Button>
        </Flex>
      </MotionBox>
    </AnimatePresence>
  )
}

export default DifficultyPanel
